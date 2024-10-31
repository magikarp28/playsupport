"use client";
import React, { useRef, useEffect } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import Link from "next/link";
import Supportperks from "./support-perks";
import { useInView } from "framer-motion";
import { useActiveSection } from "./context/active-section-context";
import useIsMobile from "@/lib/useIsMobile";

function Supporting() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: isMobile ? 0.1 : 0.7 });
  const { setActiveSection, disableHeader } = useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("supporting");
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="supporting"
      className="w-full bg-gradient-to-b text-center from-slate-950 to-black   h-fit flex flex-col justify-center gap-2 items-center text-white px-3"
    >
      <h2
        className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
      >
        Supporting miniatures for resin 3d printing
      </h2>
      <p className="max-w-screen-xl">
        We provide professional manual supports for your warhammer, DnD or any
        other miniatures or 3D models, made with Lychee Pro software, allowing
        us to make optimal results for resin 3D printing.
      </p>
      <p>
        You can download a free sample below to see the quality of our work.
      </p>
      <Link className="p-[3px] relative mt-2" href="#download">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full" />
        <div className=" bg-slate-950  relative group transition duration-200 text-white hover:bg-transparent px-3 py-2 rounded-full flex justify-center items-center">
          Free sample
          <HiOutlineDownload className="text-3xl ml-2" />
        </div>
      </Link>
      <Supportperks />
    </section>
  );
}

export default Supporting;
