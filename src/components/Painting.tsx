"use client";
import React, { useEffect, useRef, useState } from "react";
import { useActiveSection } from "./context/active-section-context";
import { useInView } from "framer-motion";
import PaintingShowcase from "./PaintingShowcase";
import useIsMobile from "@/lib/useIsMobile";

function Painting() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: isMobile ? 0.1 : 1 });
  const { setActiveSection, disableHeader } = useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("painting");
    }
  }, [isInView]);
  return (
    <section
      id="painting"
      className="w-full bg-gradient-to-b text-center from-black to-slate-950  
    h-fit flex flex-col justify-center gap-2 items-center text-white px-3 z-10"
    >
      <h2
        className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
      >
        Army and display painting miniatures
      </h2>
      <p className="max-w-screen-xl text-lg">
        We paint any kind of miniatures from tabletop games like warhammer to
        dungeons and dragons or display pieces.
      </p>
      <p className="max-w-screen-xl text-lg">
        Have a look at the gallery of commision painted minis with over 2
        decades of miniature painting experience and countless national and
        international painting awards between our 2 painters!
      </p>
      <div className="max-w-screen-xl text-lg">
        We offer 3 standard quality tiers:
        <p
          className="inline text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background:
              "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #5a3116 78%)",
            WebkitBackgroundClip: "text",
          }}
        >
          Bronze
        </p>
        ,{" "}
        <p
          className="inline text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background:
              "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
            WebkitBackgroundClip: "text",
          }}
        >
          Silver
        </p>{" "}
        and{" "}
        <p
          className="inline text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background:
              "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
            WebkitBackgroundClip: "text",
          }}
        >
          Gold
        </p>
      </div>
      <div className="w-full" ref={ref}>
        <PaintingShowcase />
      </div>
    </section>
  );
}

export default Painting;
