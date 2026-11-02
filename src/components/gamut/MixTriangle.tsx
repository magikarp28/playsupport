"use client";

import { useEffect, useRef } from "react";
import type { WheelPoint } from "@/lib/gamut";
import { renderMixTriangle } from "./triangleRender";

export default function MixTriangle({
  points,
  value,
  isDragging,
  label,
}: {
  points: WheelPoint[];
  value: number;
  isDragging: boolean;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rendered = renderMixTriangle(points, value, 360);
    canvas.width = rendered.width;
    canvas.height = rendered.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to display the mixing triangle");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(rendered, 0, 0);
  }, [points, value, isDragging]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`mx-auto aspect-square w-full max-w-[440px] ${isDragging ? "opacity-30" : ""}`}
    />
  );
}
