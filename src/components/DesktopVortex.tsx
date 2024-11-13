"use client";
import React, { useState, useEffect } from "react";
import { Vortex } from "./ui/vortex";

const DesktopVortex = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      // Assuming 1024px as the breakpoint for desktop devices
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Check on mount
    checkIfDesktop();

    // Add event listener
    window.addEventListener("resize", checkIfDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  if (!isDesktop) {
    return null;
  }

  return (
    <Vortex
      backgroundColor="slate-950"
      baseRadius={4}
      rangeY={160}
      particleCount={80}
      baseHue={270}
      baseSpeed={0.2}
      rangeSpeed={0.4}
      className="absolute z-0 top-0 left-0 w-full h-full"
    ></Vortex>
  );
};

export default DesktopVortex;
