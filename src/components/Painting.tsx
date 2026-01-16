"use client";
import React, { useEffect, useRef, useState } from "react";
import { useActiveSection } from "./context/active-section-context";
import { useInView } from "framer-motion";
import PaintingShowcase from "./PaintingShowcase";
import useIsMobile from "@/lib/useIsMobile";
import PaintingTiers from "./PaintingTiers";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";

function Painting() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref as React.RefObject<Element>, {
    amount: isMobile ? 0.1 : 0.3,
  });
  const { setActiveSection, disableHeader } = useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("Painting");
    }
  }, [isInView]);
  return (
    <section
      id="Painting"
      className="w-full  bg-gradient-to-b text-center from-black to-slate-950  
    h-fit flex flex-col justify-center gap-2 items-center text-white px-3 z-10"
      ref={ref}
    >
      <div className="max-w-7xl">
        <h2
          className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
        >
          Army and display painting miniatures
        </h2>
        <p className="max-w-screen-xl text-lg">
          We paint all kinds of miniatures, from wargaming figures like
          Warhammer to Dungeons & Dragons, board games, and display pieces.
        </p>
        <h4
          className="text-lg bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-2xl font-semibold"
        >
          All three of our painting tiers offer great looking miniatures!
        </h4>
        <PaintingTiers />
        <h4
          className="text-lg bg-clip-text text-transparent mt-4
        bg-gradient-to-b from-white to-slate-400 sm:text-2xl font-semibold"
        >
          Gallery
        </h4>
        <div className="flex gap-2 items-center justify-center">
          <p className="max-w-screen-xl text-md">
            For more images including our personal competiotion painting work
            check our
          </p>
          <Link
            href={"https://www.instagram.com/playsupport/"}
            className="text-white"
            target="_blank"
          >
            <BsInstagram className="text-lg" />
          </Link>
          <p>page.</p>
        </div>

        <PaintingShowcase />
      </div>
    </section>
  );
}

export default Painting;
