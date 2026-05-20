"use client";
import React, { useState, useEffect } from "react";
import { Vortex } from "./ui/vortex";

const DesktopVortex = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const mediaDesktop = window.matchMedia("(min-width: 1024px)");
    const mediaReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const evaluate = () => {
      const isDesktop = mediaDesktop.matches;
      const reducedMotion = mediaReducedMotion.matches;
      setShouldRender(isDesktop && !reducedMotion);
    };

    evaluate();

    const onDesktopChange = () => evaluate();
    const onMotionChange = () => evaluate();

    mediaDesktop.addEventListener("change", onDesktopChange);
    mediaReducedMotion.addEventListener("change", onMotionChange);

    return () => {
      mediaDesktop.removeEventListener("change", onDesktopChange);
      mediaReducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <Vortex
      backgroundColor="transparent"
      baseRadius={3}
      rangeY={120}
      particleCount={36}
      baseHue={270}
      baseSpeed={0.14}
      rangeSpeed={0.2}
      className="absolute z-0 top-0 left-0 w-full h-full"
    ></Vortex>
  );
};

export default DesktopVortex;
