import { Color } from "spectral.js";
import {
  convexHull,
  mixTriangleColor,
  pointColorHex,
  pointXY,
  triangleWeights,
  type WheelPoint,
  type XY,
} from "@/lib/gamut";

/** Renders the selected triangle in mixing-weight space, not HSL space. */
export function renderMixTriangle(
  points: WheelPoint[],
  value: number,
  size: number,
): HTMLCanvasElement {
  if (points.length !== 3 || convexHull(points).length !== 3) {
    throw new Error("A mixing triangle requires three non-collinear paints");
  }
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create the mixing triangle canvas");

  const positions = points.map(pointXY);
  const minX = Math.min(...positions.map((p) => p.x));
  const maxX = Math.max(...positions.map((p) => p.x));
  const minY = Math.min(...positions.map((p) => p.y));
  const maxY = Math.max(...positions.map((p) => p.y));
  const margin = size * 0.075;
  const scale = (size - margin * 2) / Math.max(maxX - minX, maxY - minY);
  const project = (p: XY): XY => ({
    x: size / 2 + (p.x - (minX + maxX) / 2) * scale,
    y: size / 2 + (p.y - (minY + maxY) / 2) * scale,
  });
  const vertices: [XY, XY, XY] = [
    project(positions[0]),
    project(positions[1]),
    project(positions[2]),
  ];
  const colors: [Color, Color, Color] = [
    new Color(pointColorHex(points[0], value)),
    new Color(pointColorHex(points[1], value)),
    new Color(pointColorHex(points[2], value)),
  ];

  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const weights = triangleWeights({ x: x + 0.5, y: y + 0.5 }, vertices);
      if (!weights) continue;
      const rgb = parseInt(mixTriangleColor(colors, weights).slice(1), 16);
      const i = (y * size + x) * 4;
      image.data[i] = (rgb >> 16) & 255;
      image.data[i + 1] = (rgb >> 8) & 255;
      image.data[i + 2] = rgb & 255;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  ctx.lineTo(vertices[1].x, vertices[1].y);
  ctx.lineTo(vertices[2].x, vertices[2].y);
  ctx.closePath();
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = Math.max(1, size * 0.004);
  ctx.stroke();
  vertices.forEach((p, i) => {
    const radius = size * 0.025;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = pointColorHex(points[i], value);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1, size * 0.006);
    ctx.stroke();
    ctx.font = `700 ${size * 0.025}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = Math.max(2, size * 0.009);
    ctx.strokeText(String(i + 1), p.x, p.y);
    ctx.fillText(String(i + 1), p.x, p.y);
  });
  return canvas;
}
