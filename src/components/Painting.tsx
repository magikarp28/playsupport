"use client";
import React, { useEffect, useRef } from "react";
import { useActiveSection } from "./context/active-section-context";
import { useInView } from "framer-motion";
import PaintingShowcase from "./PaintingShowcase";

function Painting() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.7 });
  const { setActiveSection, disableHeader } = useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("painting");
    }
  }, [isInView]);
  return (
    <section
      ref={ref}
      id="painting"
      className="w-full bg-gradient-to-b text-center from-slate-950 to-black 
    h-fit flex flex-col justify-center gap-2 items-center text-white px-3"
    >
      <h2
        className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
      >
        Army and display painting miniatures
      </h2>
      <p className="max-w-screen-xl">
        Take a look at our amazing painting skillz gallery lorem ipsum dolor sit
        amet, consectetur adipiscing elit.
      </p>
      <PaintingShowcase />
    </section>
  );
}

export default Painting;
