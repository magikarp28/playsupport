"use client";
import React, { useEffect, useRef } from "react";
import { useActiveSection } from "./context/active-section-context";
import { useInView } from "framer-motion";

function Painting() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    console.log("isInView", isInView);
    if (isInView) {
      setActiveSection("painting");
    }
  }, [isInView]);
  return (
    <section
      ref={ref}
      id="painting"
      className="w-full bg-gradient-to-b text-center from-slate-950 to-black 
    h-fit flex flex-col justify-center gap-2 items-center text-white px-3"
    ></section>
  );
}

export default Painting;
