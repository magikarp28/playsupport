"use client";

import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { BsDownload, BsTrash3, BsX } from "react-icons/bs";
import {
  HUE_STOPS,
  WheelPoint,
  buildMixPreviews,
  convexHull,
  pointColorHex,
  pointXY,
  xyToHueChroma,
} from "@/lib/gamut";
import {
  buildGamutExport,
  drawGuideRings,
  drawHueLabels,
  drawPoints,
  drawWheelWithMask,
  renderWheelDisc,
} from "./wheelRender";
import { canvasToCmykPdf } from "./cmykPdf";
import MixTriangle from "./MixTriangle";

const MAX_POINTS = 8;
const LABEL_MARGIN = 46; // css px reserved around the disc for hue labels

const nextPointId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `pt-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const DEFAULT_POINTS: Omit<WheelPoint, "id">[] = [
  { hue: 30, chroma: 0.95 }, // dominant orange
  { hue: 0, chroma: 0.4 }, // greyed red
  { hue: 120, chroma: 0.45 }, // greyed green
];

const PRESETS: { key: string; points: Omit<WheelPoint, "id">[] }[] = [
  {
    key: "moody",
    points: DEFAULT_POINTS,
  },
  {
    key: "triad",
    points: [
      { hue: 60, chroma: 1 },
      { hue: 0, chroma: 1 },
      { hue: 240, chroma: 1 },
    ],
  },
  {
    key: "complementary",
    points: [
      { hue: 30, chroma: 1 },
      { hue: 240, chroma: 1 },
      { hue: 270, chroma: 0.25 },
    ],
  },
];

export default function GamutTool() {
  const t = useTranslations("GamutPage");
  const makePoint = useCallback(
    (p: Omit<WheelPoint, "id">): WheelPoint => ({ ...p, id: nextPointId() }),
    [],
  );
  const [points, setPoints] = useState<WheelPoint[]>(() =>
    DEFAULT_POINTS.map(makePoint),
  );
  const randomizeMask = useCallback(() => {
    const rotation = Math.random() * 360;
    setPoints(
      Array.from({ length: 3 }, (_, i) =>
        makePoint({
          hue: (rotation + i * 120 + (Math.random() - 0.5) * 50 + 360) % 360,
          chroma: 0.4 + Math.random() * 0.6,
        }),
      ),
    );
  }, [makePoint, setPoints]);
  const [value, setValue] = useState(0.5);
  const [size, setSize] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragIdRef = useRef<string | null>(null);
  const discCacheRef = useRef<{
    px: number;
    value: number;
    full: HTMLCanvasElement;
  } | null>(null);

  const hull = useMemo(() => convexHull(points), [points]);
  const previews = useMemo(
    () => buildMixPreviews(points, value),
    [points, value],
  );
  const hueLabels = useMemo(
    () => HUE_STOPS.map((s) => t(`hueNames.${s.key}`)),
    [t],
  );

  // Track the available square size.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setSize(Math.max(0, Math.floor(w)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [setIsDragging, setPoints]);

  // Redraw whenever points / value / size / locale change.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size <= 0) return;
    const dpr = Math.min(2.5, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const geom = { cx: size / 2, cy: size / 2, R: size / 2 - LABEL_MARGIN };

    const px = Math.max(64, Math.round(geom.R * 2 * dpr));
    if (
      !discCacheRef.current ||
      discCacheRef.current.px !== px ||
      discCacheRef.current.value !== value
    ) {
      discCacheRef.current = {
        px,
        value,
        full: renderWheelDisc(px, value),
      };
    }
    drawWheelWithMask(ctx, geom, discCacheRef.current.full, hull, isDragging);

    drawGuideRings(ctx, geom);
    drawPoints(ctx, geom, points, value, Math.max(12, geom.R * 0.045));
    drawHueLabels(ctx, geom, hueLabels, Math.max(10, size * 0.02));
  }, [points, value, size, hull, hueLabels, isDragging]);

  const getGeom = useCallback(() => {
    const R = size / 2 - LABEL_MARGIN;
    return { cx: size / 2, cy: size / 2, R };
  }, [size]);

  const eventToUnit = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const geom = getGeom();
    return {
      x: (e.clientX - rect.left - geom.cx) / geom.R,
      y: (e.clientY - rect.top - geom.cy) / geom.R,
    };
  };

  const hitTest = (ux: number, uy: number): WheelPoint | null => {
    const geom = getGeom();
    const hitR = 20 / geom.R; // 20 css px tolerance
    let best: WheelPoint | null = null;
    let bestD = hitR;
    for (const p of points) {
      const { x, y } = pointXY(p);
      const d = Math.hypot(x - ux, y - uy);
      if (d < bestD) {
        best = p;
        bestD = d;
      }
    }
    return best;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (e.button === 2) return; // handled by contextmenu
    const { x, y } = eventToUnit(e);
    const hit = hitTest(x, y);
    if (hit) {
      dragIdRef.current = hit.id;
    } else if (Math.hypot(x, y) <= 1) {
      if (points.length >= MAX_POINTS) return;
      const pt = makePoint(xyToHueChroma(x, y));
      setPoints((prev) => [...prev, pt]);
      dragIdRef.current = pt.id;
    } else {
      return;
    }
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = eventToUnit(e);
    const dragId = dragIdRef.current;
    if (dragId) {
      setPoints((prev) => {
        if (!prev.some((p) => p.id === dragId)) return prev;
        const { hue, chroma } = xyToHueChroma(x, y);
        return prev.map((p) => (p.id === dragId ? { ...p, hue, chroma } : p));
      });
    } else {
      canvas.style.cursor = hitTest(x, y)
        ? "grab"
        : Math.hypot(x, y) <= 1
          ? "crosshair"
          : "default";
    }
  };

  const endDrag = () => {
    dragIdRef.current = null;
    setIsDragging(false);
  };

  const removePoint = useCallback(
    (id: string) => {
      setPoints((prev) => prev.filter((p) => p.id !== id));
      if (dragIdRef.current === id) {
        dragIdRef.current = null;
        setIsDragging(false);
      }
    },
    [setIsDragging, setPoints],
  );

  const onContextMenu = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = eventToUnit(e);
    const hit = hitTest(x, y);
    if (hit) removePoint(hit.id);
  };

  const download = async () => {
    setExportError(false);
    setExporting(true);
    try {
      const canvas = buildGamutExport(points, value, previews, {
        title: t("exportTitle"),
        wheel: t("wheelHeading"),
        triangle: t("triangleHeading"),
        manyPaints: t("manyPaintsHeading"),
        triangleHint: t("triangleExportHint"),
        manyPaintsHint: t("manyPaintsHint"),
        paints: t("paletteHeading"),
        mixes: t("mixesHeading"),
        printHint: t("printHint"),
      });
      const blob = await canvasToCmykPdf(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gamut-mask.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (error) {
      console.error("Failed to export the gamut mask PDF", error);
      setExportError(true);
    } finally {
      setExporting(false);
    }
  };

  const hueNameFor = (hue: number) => {
    let best = HUE_STOPS[0];
    let bestD = 360;
    for (const s of HUE_STOPS) {
      const d = Math.min(Math.abs(s.hue - hue), 360 - Math.abs(s.hue - hue));
      if (d < bestD) {
        best = s;
        bestD = d;
      }
    }
    return t(`hueNames.${best.key}`);
  };

  return (
    <div className="w-full">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Wheel */}
        <div className="flex flex-col items-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
            {t("wheelHeading")}
          </h2>
          <div
            ref={wrapperRef}
            className="relative aspect-square w-full max-w-[620px] select-none"
          >
            <canvas
              ref={canvasRef}
              className="h-full w-full touch-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onContextMenu={onContextMenu}
              onDoubleClick={(e) => {
                const rect = canvasRef.current!.getBoundingClientRect();
                const geom = getGeom();
                const hit = hitTest(
                  (e.clientX - rect.left - geom.cx) / geom.R,
                  (e.clientY - rect.top - geom.cy) / geom.R,
                );
                if (hit) removePoint(hit.id);
              }}
              aria-label={t("wheelAria")}
              role="application"
            />
            {hull.length < 3 && (
              <div className="pointer-events-none absolute inset-x-4 bottom-2 rounded-xl border border-amber-400/40 bg-amber-950/80 px-4 py-2 text-center text-sm text-amber-200">
                {t("needPoints")}
              </div>
            )}
          </div>
          <p className="mt-1 text-center text-sm text-slate-400">
            {t("wheelHint")}
          </p>

          {/* Value slider */}
          <div className="mt-4 w-full max-w-[620px] rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="gamut-value"
                className="text-sm font-semibold text-slate-200"
              >
                {t("valueLabel")}
              </label>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300">
                {Math.round(value * 100)}%
              </span>
            </div>
            <input
              id="gamut-value"
              type="range"
              min={12}
              max={92}
              value={Math.round(value * 100)}
              onChange={(e) => setValue(Number(e.target.value) / 100)}
              className="mt-2 w-full accent-fuchsia-500"
            />
            <div className="mt-1 flex justify-between text-[0.7rem] text-slate-400">
              <span>{t("valueDark")}</span>
              <span>{t("valueMid")}</span>
              <span>{t("valueLight")}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {t("valueHint")}
            </p>
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {t("presetsHeading")}
              </h3>
              <span className="text-xs text-slate-500">
                {points.length}/{MAX_POINTS}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() =>
                    setPoints(preset.points.slice(0, MAX_POINTS).map(makePoint))
                  }
                  className="rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-fuchsia-500 hover:text-white"
                >
                  {t(`presets.${preset.key}`)}
                </button>
              ))}
              <button
                type="button"
                onClick={randomizeMask}
                className="rounded-full border border-fuchsia-500/60 bg-fuchsia-950/40 px-3 py-1.5 text-xs font-medium text-fuchsia-200 transition hover:border-fuchsia-400 hover:text-white"
              >
                {t("randomize")}
              </button>
              <button
                type="button"
                onClick={() => setPoints([])}
                className="rounded-full border border-slate-600 bg-transparent px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-rose-500 hover:text-rose-300"
              >
                <span className="inline-flex items-center gap-1">
                  <BsTrash3 aria-hidden /> {t("clear")}
                </span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              {t("paletteHeading")}
            </h3>
            {points.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">{t("noPaints")}</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {points.map((p, i) => {
                  const hex = pointColorHex(p, value);
                  return (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-800/50 px-3 py-2"
                    >
                      <span
                        className="h-9 w-9 shrink-0 rounded-lg border border-white/20"
                        style={{ backgroundColor: hex }}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-100">
                          {i + 1}. {hueNameFor(p.hue)}
                        </span>
                        <span className="block truncate text-xs text-slate-400">
                          {Math.round(p.chroma * 100)}%
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removePoint(p.id)}
                        aria-label={t("removePaint")}
                        className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-700 hover:text-rose-300"
                      >
                        <BsX className="text-lg" aria-hidden />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={download}
            disabled={hull.length < 3 || exporting}
            className="group relative w-full rounded-full bg-gradient-to-r from-rose-600 to-fuchsia-600 p-[2px] transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition group-hover:bg-transparent group-disabled:bg-slate-950">
              <BsDownload aria-hidden />{" "}
              {exporting ? t("exporting") : t("download")}
            </span>
          </button>
          <p className="text-xs leading-relaxed text-slate-400">
            {t("printHint")}
          </p>
          {exportError && (
            <p role="alert" className="text-sm text-rose-300">
              {t("exportError")}
            </p>
          )}
        </div>
      </div>

      {(points.length > 3 || (points.length === 3 && hull.length === 3)) && (
        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-left sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            {points.length === 3
              ? t("triangleHeading")
              : t("manyPaintsHeading")}
          </h3>
          {points.length === 3 ? (
            <>
              <p className="mt-1 text-sm text-slate-400">{t("triangleHint")}</p>
              <MixTriangle
                points={points}
                value={value}
                isDragging={isDragging}
                label={t("triangleAria")}
              />
              {isDragging && (
                <p className="text-center text-xs text-slate-400">
                  {t("triangleUpdating")}
                </p>
              )}
            </>
          ) : (
            <p className="mt-1 text-sm text-slate-400">{t("manyPaintsHint")}</p>
          )}
        </div>
      )}

      {/* Mixing ramps */}
      {hull.length >= 3 && (
        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            {t("mixesHeading")}
          </h3>
          <p className="mt-1 text-sm text-slate-400">{t("mixesHint")}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {previews.map((preview) => {
              return (
                <div key={preview.key}>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {preview.from} ↔ {preview.to}
                    </span>
                  </div>
                  <div className="flex overflow-hidden rounded-lg border border-white/10">
                    {preview.colors.map((hex, j) => (
                      <div
                        key={j}
                        className="h-9 flex-1"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
