const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");
const { Color, mix } = require("spectral.js");

const filename = path.resolve(__dirname, "../src/lib/gamut.ts");
const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const gamutModule = new Module(filename, module);
gamutModule.filename = filename;
gamutModule.paths = Module._nodeModulePaths(path.dirname(filename));
gamutModule._compile(compiled, filename);
const { buildMixPreviews, convexHull, mixTriangleColor, paintMixPalette, triangleWeights } =
  gamutModule.exports;

const vertices = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
const colors = [new Color("#FF0000"), new Color("#00FF00"), new Color("#0000FF")];

test("triangle weights identify corners, edges, interior and invalid points", () => {
  assert.deepEqual(triangleWeights(vertices[0], vertices), [1, 0, 0]);
  assert.deepEqual(triangleWeights(vertices[1], vertices), [0, 1, 0]);
  assert.deepEqual(triangleWeights(vertices[2], vertices), [0, 0, 1]);
  assert.deepEqual(triangleWeights({ x: 0.5, y: 0 }, vertices), [0.5, 0.5, 0]);
  assert.equal(triangleWeights({ x: 1, y: 1 }, vertices), null);
  assert.equal(triangleWeights({ x: 0, y: 0 }, [vertices[0], vertices[0], vertices[1]]), null);
  const weights = triangleWeights({ x: 0.25, y: 0.25 }, vertices);
  assert.deepEqual(weights, [0.5, 0.25, 0.25]);
  assert.equal(mixTriangleColor(colors, weights), mix([colors[0], 0.5], [colors[1], 0.25], [colors[2], 0.25]).toString().toUpperCase());
});

test("all triangle edges match the corresponding pairwise mixing previews", () => {
  const hexes = ["#FF0000", "#00FF00", "#0000FF"];
  for (const [a, b] of [[0, 1], [1, 2], [2, 0]]) {
    const ramp = paintMixPalette(hexes[a], hexes[b], 9);
    for (let i = 0; i < ramp.length; i++) {
      const t = i / 8;
      const point = {
        x: vertices[a].x * (1 - t) + vertices[b].x * t,
        y: vertices[a].y * (1 - t) + vertices[b].y * t,
      };
      assert.equal(mixTriangleColor(colors, triangleWeights(point, vertices)), ramp[i]);
    }
  }
  assert.equal(paintMixPalette(hexes[0], hexes[1], 9)[4], "#834B17");
});

test("the 1050-pixel export triangle renders pigment mixes at native resolution", () => {
  const triangleFilename = path.resolve(__dirname, "../src/components/gamut/triangleRender.ts");
  const triangleModule = new Module(triangleFilename, module);
  triangleModule.filename = triangleFilename;
  triangleModule.paths = Module._nodeModulePaths(path.dirname(triangleFilename));
  triangleModule.require = (id) => id === "@/lib/gamut" ? gamutModule.exports : require(id);
  triangleModule._compile(ts.transpileModule(readFileSync(triangleFilename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, triangleFilename);

  let pixels;
  const ctx = {
    createImageData: (width, height) => ({ data: new Uint8ClampedArray(width * height * 4) }),
    putImageData: (image) => { pixels = image.data; },
    beginPath() {}, moveTo() {}, lineTo() {}, closePath() {}, stroke() {},
    arc() {}, fill() {}, strokeText() {}, fillText() {},
  };
  const originalDocument = global.document;
  global.document = { createElement: () => ({ getContext: () => ctx }) };
  try {
    const points = [0, 120, 240].map((hue) => ({ id: String(hue), hue, chroma: 1 }));
    const canvas = triangleModule.exports.renderMixTriangle(points, 0.5, 1050);
    assert.equal(canvas.width, 1050);
    assert.equal(canvas.height, 1050);
    assert.equal(pixels.length, 1050 * 1050 * 4);
    assert.equal(pixels[3], 0);
    const middle = (525 * 1050 + 525) * 4;
    assert.equal(pixels[middle + 3], 255);
    assert.ok(pixels[middle] > 0 || pixels[middle + 1] > 0 || pixels[middle + 2] > 0);
  } finally {
    if (originalDocument === undefined) delete global.document;
    else global.document = originalDocument;
  }
});

test("previews use the mask boundary, including when a fourth paint is inside it", () => {
  const points = [
    { id: "red", hue: 0, chroma: 1 },
    { id: "green", hue: 120, chroma: 1 },
    { id: "blue", hue: 240, chroma: 1 },
    { id: "inside", hue: 60, chroma: 0.1 },
  ];
  assert.equal(convexHull(points).length, 3);
  const previews = buildMixPreviews(points, 0.5);
  assert.equal(previews.length, 3);
  assert.ok(previews.every((preview) => preview.from <= 3 && preview.to <= 3 && preview.colors.length === 9));
});

test("PDF composition enlarges the pigment triangle and retains the multi-paint fallback", () => {
  const wheelFilename = path.resolve(__dirname, "../src/components/gamut/wheelRender.ts");
  const wheelModule = new Module(wheelFilename, module);
  wheelModule.filename = wheelFilename;
  wheelModule.paths = Module._nodeModulePaths(path.dirname(wheelFilename));
  const triangleCalls = [];
  wheelModule.require = (id) => {
    if (id === "@/lib/gamut") return gamutModule.exports;
    if (id === "./triangleRender") {
      return {
        renderMixTriangle(points, value, size) {
          triangleCalls.push({ points, value, size });
          return { width: size, height: size, kind: "triangle" };
        },
      };
    }
    return require(id);
  };
  wheelModule._compile(ts.transpileModule(readFileSync(wheelFilename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, wheelFilename);

  const canvases = [];
  const originalDocument = global.document;
  global.document = {
    createElement() {
      const calls = [];
      const ctx = {
        calls,
        fillRect(...args) { calls.push(["fillRect", ...args]); },
        strokeRect(...args) { calls.push(["strokeRect", ...args]); },
        fillText(...args) { calls.push(["fillText", ...args]); },
        drawImage(...args) { calls.push(["drawImage", ...args]); },
        measureText(text) { return { width: text.length * 10 }; },
        createImageData(width, height) { return { data: new Uint8ClampedArray(width * height * 4) }; },
        putImageData() {},
        save() {}, restore() {}, beginPath() {}, moveTo() {}, lineTo() {},
        closePath() {}, clip() {}, stroke() {}, arc() {}, fill() {},
      };
      const canvas = { width: 0, height: 0, getContext: () => ctx };
      canvases.push(canvas);
      return canvas;
    },
  };
  const labels = {
    title: "title", wheel: "wheel", triangle: "triangle", manyPaints: "many paints",
    manyPaintsHint: "many paints hint", paints: "paints", mixes: "mixes",
  };
  const points = Array.from({ length: 8 }, (_, i) => ({
    id: String(i), hue: i * 45, chroma: 1,
  }));
  try {
    const three = points.slice(0, 3);
    const triangleCanvas = wheelModule.exports.buildGamutExport(
      three, 0.5, buildMixPreviews(three, 0.5), labels,
    );
    const calls = triangleCanvas.getContext("2d").calls;
    assert.equal(triangleCanvas.width, 1800);
    assert.equal(triangleCanvas.height, 1260);
    assert.equal(triangleCalls.length, 1);
    assert.equal(triangleCalls[0].size, 1050);
    const images = calls.filter((call) => call[0] === "drawImage");
    assert.equal(images.length, 1);
    assert.deepEqual(images[0].slice(2), [40, 150]);
    assert.equal(images[0][1].kind, "triangle");
    const text = calls.filter((call) => call[0] === "fillText").map((call) => call[1]);
    assert.ok(text.includes("triangle (50%)"));
    assert.ok(!text.some((line) => line.startsWith("wheel")));
    assert.equal(calls.filter((call) => call[0] === "strokeRect").length, 3);

    const multiCanvas = wheelModule.exports.buildGamutExport(
      points, 0.5, buildMixPreviews(points, 0.5), labels,
    );
    const multiCalls = multiCanvas.getContext("2d").calls;
    assert.equal(triangleCalls.length, 1);
    assert.ok(multiCalls.some((call) => call[0] === "fillText" && call[1] === "wheel (50%)"));
    assert.ok(multiCalls.some((call) => call[0] === "drawImage"));
    const ramps = multiCalls.filter((call) => call[0] === "strokeRect" && call[3] === 790);
    assert.equal(ramps.length, 8);
    assert.ok(ramps.every((call) => call[2] + call[4] <= multiCanvas.height));
  } finally {
    if (originalDocument === undefined) delete global.document;
    else global.document = originalDocument;
  }
});
