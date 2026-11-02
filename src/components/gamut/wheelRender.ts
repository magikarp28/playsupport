import {
  HUE_STOPS,
  WheelPoint,
  convexHull,
  hslToRgb,
  hueToScreenAngle,
  pointColorHex,
  pointXY,
} from "@/lib/gamut";

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

/** Composes the printable mask on a white page. */
export function buildGamutExport(
  points: WheelPoint[],
  value: number,
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
  const geom: WheelGeometry = { cx: W / 2, cy: H / 2, R: 540 };
  const full = renderWheelDisc(geom.R * 2, value);
  drawClippedWheel(ctx, geom, full, hull);

  return canvas;
}
