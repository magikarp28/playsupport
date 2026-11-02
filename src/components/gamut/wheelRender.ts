import {
  HUE_STOPS,
  MixPreview,
  WheelPoint,
  convexHull,
  hslToRgb,
  hueToScreenAngle,
  pointColorHex,
  pointXY,
} from "@/lib/gamut";
import { renderMixTriangle } from "./triangleRender";

export interface WheelGeometry {
  cx: number;
  cy: number;
  R: number;
}

const FONT_STACK = "InterLocal, Inter, 'Segoe UI', Roboto, sans-serif";

/**
 * Renders the raw wheel disc (hue around, chroma falling toward the neutral
 * gray center) at the given value (HSL lightness 0-1) into an offscreen
 * canvas of `size` device pixels. Cached by the caller.
 */
export function renderWheelDisc(
  size: number,
  value: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const img = ctx.createImageData(size, size);
  const data = img.data;
  const c = size / 2;
  const R = size / 2;

  for (let y = 0; y < size; y++) {
    const dy = y - c + 0.5;
    for (let x = 0; x < size; x++) {
      const dx = x - c + 0.5;
      const r = Math.hypot(dx, dy) / R;
      const idx = (y * size + x) * 4;
      if (r > 1) {
        data[idx + 3] = 0;
        continue;
      }
      const angleDeg = (Math.atan2(dx, -dy) * 180) / Math.PI;
      const hue = (60 - (((angleDeg + 360) % 360) % 360) + 360) % 360;
      const [rr, gg, bb] = hslToRgb(hue, Math.min(1, r), value);
      data[idx] = rr;
      data[idx + 1] = gg;
      data[idx + 2] = bb;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

export function drawGuideRings(
  ctx: CanvasRenderingContext2D,
  geom: WheelGeometry,
) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1;
  for (const f of [0.25, 0.5, 0.75]) {
    ctx.beginPath();
    ctx.arc(geom.cx, geom.cy, geom.R * f, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(geom.cx, geom.cy, geom.R, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

export function drawHueLabels(
  ctx: CanvasRenderingContext2D,
  geom: WheelGeometry,
  labels: string[],
  fontSize: number,
  color = "rgba(226,232,240,0.85)",
) {
  ctx.save();
  ctx.font = `600 ${fontSize}px ${FONT_STACK}`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  HUE_STOPS.forEach((stop, i) => {
    const rad = (hueToScreenAngle(stop.hue) * Math.PI) / 180;
    const rr = geom.R + fontSize * 1.6;
    const x = geom.cx + rr * Math.sin(rad);
    const y = geom.cy - rr * Math.cos(rad);
    ctx.fillText(labels[i] ?? stop.key, x, y);
  });
  ctx.restore();
}

function polygonPath(
  ctx: CanvasRenderingContext2D,
  geom: WheelGeometry,
  hull: WheelPoint[],
) {
  hull.forEach((p, i) => {
    const { x, y } = pointXY(p);
    const px = geom.cx + x * geom.R;
    const py = geom.cy + y * geom.R;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
}

function drawClippedWheel(
  ctx: CanvasRenderingContext2D,
  geom: WheelGeometry,
  full: HTMLCanvasElement,
  hull: WheelPoint[],
) {
  const { cx, cy, R } = geom;
  ctx.save();
  ctx.beginPath();
  polygonPath(ctx, geom, hull);
  ctx.clip();
  ctx.drawImage(full, cx - R, cy - R, R * 2, R * 2);
  ctx.restore();
}

/**
 * Shows the whole wheel while dragging, or clips it to the gamut mask at rest.
 */
export function drawWheelWithMask(
  ctx: CanvasRenderingContext2D,
  geom: WheelGeometry,
  full: HTMLCanvasElement,
  hull: WheelPoint[],
  revealOutsideMask = false,
) {
  const { cx, cy, R } = geom;
  if (hull.length < 3) {
    ctx.drawImage(full, cx - R, cy - R, R * 2, R * 2);
    return;
  }

  if (revealOutsideMask) {
    ctx.drawImage(full, cx - R, cy - R, R * 2, R * 2);
  } else {
    drawClippedWheel(ctx, geom, full, hull);
  }

  ctx.save();
  ctx.beginPath();
  polygonPath(ctx, geom, hull);
  ctx.strokeStyle = "rgba(248,250,252,0.95)";
  ctx.lineWidth = Math.max(2, R * 0.006);
  ctx.shadowColor = "rgba(244,114,182,0.6)";
  ctx.shadowBlur = R * 0.03;
  ctx.stroke();
  ctx.restore();
}

export function drawPoints(
  ctx: CanvasRenderingContext2D,
  geom: WheelGeometry,
  points: WheelPoint[],
  value: number,
  radius: number,
) {
  points.forEach((p, i) => {
    const { x, y } = pointXY(p);
    const px = geom.cx + x * geom.R;
    const py = geom.cy + y * geom.R;
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = pointColorHex(p, value);
    ctx.fill();
    ctx.lineWidth = Math.max(2, radius * 0.22);
    ctx.strokeStyle = "#f8fafc";
    ctx.stroke();
    ctx.fillStyle = "#0f172a";
    // Contrasting number: white text on dark paints, dark text on light ones.
    const [r, g, b] = hslToRgb(p.hue, p.chroma, value);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    ctx.fillStyle = lum > 140 ? "#0f172a" : "#f8fafc";
    ctx.font = `700 ${radius * 0.95}px ${FONT_STACK}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(i + 1), px, py + radius * 0.05);
    ctx.restore();
  });
}

export interface GamutExportLabels {
  title: string;
  wheel: string;
  triangle: string;
  manyPaints: string;
  manyPaintsHint: string;
  paints: string;
  mixes: string;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = word;
    } else {
      line = next;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

/** Composes the masks and displayed mixing previews on an A4 landscape page. */
export function buildGamutExport(
  points: WheelPoint[],
  value: number,
  previews: MixPreview[],
  labels: GamutExportLabels,
): HTMLCanvasElement {
  const W = 1800;
  const H = 1260;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create the export canvas");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  const hull = convexHull(points);
  if (hull.length < 3) throw new Error("Cannot export a gamut mask without a polygon");
  ctx.fillStyle = "#0f172a";
  ctx.font = `700 42px ${FONT_STACK}`;
  ctx.fillText(labels.title, 60, 65);
  ctx.font = `700 28px ${FONT_STACK}`;
  if (points.length === 3) {
    ctx.fillText(`${labels.triangle} (${Math.round(value * 100)}%)`, 60, 125);
    const triangle = renderMixTriangle(points, value, 1050);
    ctx.drawImage(triangle, 40, 150);
    ctx.fillStyle = "#0f172a";
    ctx.font = `700 26px ${FONT_STACK}`;
    ctx.fillText(labels.paints, 1130, 200);
    points.forEach((point, i) => {
      const x = 1130 + i * 205;
      const y = 220;
      ctx.fillStyle = pointColorHex(point, value);
      ctx.fillRect(x, y, 185, 64);
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, 185, 64);
      ctx.fillStyle = "#0f172a";
      ctx.font = `700 20px ${FONT_STACK}`;
      ctx.fillText(`${i + 1}  ${pointColorHex(point, value)}`, x, y + 92);
    });
  } else {
    ctx.fillText(`${labels.wheel} (${Math.round(value * 100)}%)`, 60, 125);
    ctx.fillText(labels.manyPaints, 930, 125);
    const positions = hull.map(pointXY);
    const minX = Math.min(...positions.map((p) => p.x));
    const maxX = Math.max(...positions.map((p) => p.x));
    const minY = Math.min(...positions.map((p) => p.y));
    const maxY = Math.max(...positions.map((p) => p.y));
    const scale = 544 / Math.max(maxX - minX, maxY - minY);
    const geom: WheelGeometry = {
      cx: 450 - ((minX + maxX) / 2) * scale,
      cy: 525 - ((minY + maxY) / 2) * scale,
      R: scale,
    };
    const full = renderWheelDisc(800, value);
    drawClippedWheel(ctx, geom, full, hull);
    ctx.beginPath();
    polygonPath(ctx, geom, hull);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 3;
    ctx.stroke();
    drawPoints(ctx, geom, points, value, 16);

    ctx.font = `22px ${FONT_STACK}`;
    ctx.fillStyle = "#334155";
    wrapText(ctx, labels.manyPaintsHint, 930, 180, 800, 32);
    ctx.fillStyle = "#0f172a";
    ctx.font = `700 26px ${FONT_STACK}`;
    ctx.fillText(labels.paints, 930, 340);
    points.forEach((point, i) => {
      const x = 930 + (i % 4) * 195;
      const y = 380 + Math.floor(i / 4) * 95;
      ctx.fillStyle = pointColorHex(point, value);
      ctx.fillRect(x, y, 65, 65);
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, 65, 65);
      ctx.fillStyle = "#0f172a";
      ctx.font = `700 25px ${FONT_STACK}`;
      ctx.fillText(String(i + 1), x + 78, y + 42);
    });
  }

  ctx.fillStyle = "#0f172a";
  ctx.font = `700 28px ${FONT_STACK}`;
  const isTriangle = points.length === 3;
  ctx.fillText(labels.mixes, isTriangle ? 1130 : 60, isTriangle ? 380 : 880);
  previews.forEach((preview, i) => {
    const x = isTriangle ? 1130 : 60 + (i % 2) * 870;
    const y = isTriangle ? 415 + i * 120 : 905 + Math.floor(i / 2) * 76;
    ctx.fillStyle = "#334155";
    ctx.font = `700 21px ${FONT_STACK}`;
    ctx.fillText(`${preview.from} - ${preview.to}`, x, y + 18);
    const rampWidth = isTriangle ? 610 : 790;
    const width = rampWidth / preview.colors.length;
    preview.colors.forEach((color, j) => {
      ctx.fillStyle = color;
      ctx.fillRect(x + j * width, y + 25, width + 0.5, 35);
    });
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y + 25, rampWidth, 35);
  });

  return canvas;
}
