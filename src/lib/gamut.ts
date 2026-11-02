import { Color, mix, palette } from "spectral.js";

/**
 * Geometry of the painter's gamut wheel.
 *
 * The wheel uses the Yurmby arrangement (James Gurney): additive primaries
 * (R/G/B) and subtractive primaries (C/M/Y) are interleaved, which matches
 * HSL hue angles exactly. Yellow (60°) sits at the top of the wheel and hues
 * run clockwise through orange -> red -> magenta -> blue -> cyan -> green.
 * Chroma falls off toward the center, which is neutral gray.
 */

export interface WheelPoint {
  id: string;
  /** HSL hue 0-360 (60 = yellow at top of the wheel). */
  hue: number;
  /** 0 = wheel center (neutral gray), 1 = fully saturated rim. */
  chroma: number;
}

/** HSL hue -> screen angle in degrees, clockwise from 12 o'clock. */
export function hueToScreenAngle(hue: number): number {
  return (((60 - hue) % 360) + 360) % 360;
}

/** Screen angle in degrees (clockwise from 12 o'clock) -> HSL hue. */
export function screenAngleToHue(angle: number): number {
  return (((60 - angle) % 360) + 360) % 360;
}

/** Point position in unit-circle coordinates (y axis pointing down). */
export function pointXY(p: WheelPoint): { x: number; y: number } {
  const rad = (hueToScreenAngle(p.hue) * Math.PI) / 180;
  return { x: p.chroma * Math.sin(rad), y: -p.chroma * Math.cos(rad) };
}

/** Unit-circle coordinates (y down) -> hue/chroma on the wheel. */
export function xyToHueChroma(
  x: number,
  y: number,
): { hue: number; chroma: number } {
  const chroma = Math.min(1, Math.hypot(x, y));
  const angleDeg = (Math.atan2(x, -y) * 180) / Math.PI;
  return { hue: screenAngleToHue((angleDeg + 360) % 360), chroma };
}

/** h: 0-360, s/l: 0-1 -> r/g/b 0-255 */
export function hslToRgb(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
  const hn = (((h % 360) + 360) % 360) / 60;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((hn % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;
  if (hn < 1) [r, g, b] = [c, x, 0];
  else if (hn < 2) [r, g, b] = [x, c, 0];
  else if (hn < 3) [r, g, b] = [0, c, x];
  else if (hn < 4) [r, g, b] = [0, x, c];
  else if (hn < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const to = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

/** Displayed color of a wheel point at the current value (lightness) level. */
export function pointColorHex(p: WheelPoint, value: number): string {
  const [r, g, b] = hslToRgb(p.hue, p.chroma, value);
  return rgbToHex(r, g, b);
}

/**
 * Convex hull (Andrew's monotone chain) of the anchor points in unit-circle
 * space. This is a color-scheme boundary, not a physical mixing gamut.
 * Returns points in winding order, or fewer than 3 when nearly collinear.
 */
export function convexHull(points: WheelPoint[]): WheelPoint[] {
  if (points.length < 3) return [];
  const sorted = [...points].sort((a, b) => {
    const pa = pointXY(a);
    const pb = pointXY(b);
    return pa.x - pb.x || pa.y - pb.y;
  });

  const cross = (
    o: { x: number; y: number },
    a: { x: number; y: number },
    b: { x: number; y: number },
  ) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const build = (pts: WheelPoint[]) => {
    const hull: WheelPoint[] = [];
    for (const p of pts) {
      while (hull.length >= 2) {
        const o = pointXY(hull[hull.length - 2]);
        const a = pointXY(hull[hull.length - 1]);
        if (cross(o, a, pointXY(p)) > 1e-9) break;
        hull.pop();
      }
      hull.push(p);
    }
    return hull;
  };

  const lower = build(sorted);
  const upper = build([...sorted].reverse());
  const hull = [...lower.slice(0, -1), ...upper.slice(0, -1)];
  return hull.length >= 3 ? hull : [];
}

/** The 12 hue stops of the painter's wheel (clockwise from the top). */
export const HUE_STOPS: { hue: number; key: string }[] = [
  { hue: 60, key: "yellow" },
  { hue: 30, key: "orange" },
  { hue: 0, key: "red" },
  { hue: 330, key: "crimson" },
  { hue: 300, key: "magenta" },
  { hue: 270, key: "violet" },
  { hue: 240, key: "blue" },
  { hue: 210, key: "azure" },
  { hue: 180, key: "cyan" },
  { hue: 150, key: "teal" },
  { hue: 120, key: "green" },
  { hue: 90, key: "lime" },
];

/**
 * Estimated paint mixing (Kubelka-Munk via spectral.js). The input colors do
 * not identify the actual pigments used in a physical paint.
 */
export function paintMixPalette(
  hexA: string,
  hexB: string,
  steps: number,
): string[] {
  return palette(new Color(hexA), new Color(hexB), steps).map((c) =>
    c.toString().toUpperCase(),
  );
}

export type TriangleWeights = [number, number, number];
export type XY = { x: number; y: number };

/** Mixing weights corresponding to a position in a non-degenerate triangle. */
export function triangleWeights(
  point: XY,
  vertices: [XY, XY, XY],
): TriangleWeights | null {
  const [a, b, c] = vertices;
  const denominator = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);
  if (Math.abs(denominator) < 1e-9) return null;
  const first = ((b.y - c.y) * (point.x - c.x) + (c.x - b.x) * (point.y - c.y)) / denominator;
  const second = ((c.y - a.y) * (point.x - c.x) + (a.x - c.x) * (point.y - c.y)) / denominator;
  const third = 1 - first - second;
  if (first < -1e-9 || second < -1e-9 || third < -1e-9) return null;
  return [Math.max(0, first), Math.max(0, second), Math.max(0, third)];
}

export function mixTriangleColor(
  colors: [Color, Color, Color],
  weights: TriangleWeights,
): string {
  return mix(
    [colors[0], weights[0]],
    [colors[1], weights[1]],
    [colors[2], weights[2]],
  ).toString().toUpperCase();
}

export interface MixPreview {
  key: string;
  from: number;
  to: number;
  colors: string[];
}

export function buildMixPreviews(points: WheelPoint[], value: number): MixPreview[] {
  const hull = convexHull(points);
  return hull.map((a, i) => {
    const b = hull[(i + 1) % hull.length];
    return {
      key: `${a.id}-${b.id}`,
      from: points.indexOf(a) + 1,
      to: points.indexOf(b) + 1,
      colors: paintMixPalette(pointColorHex(a, value), pointColorHex(b, value), 9),
    };
  });
}
