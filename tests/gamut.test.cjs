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
