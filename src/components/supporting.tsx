"use client";
import React, { useRef, useEffect } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import Link from "next/link";
import Supportperks from "./support-perks";
import { useInView } from "motion/react";
import { useActiveSection } from "./context/active-section-context";
import useIsMobile from "@/lib/useIsMobile";

function Supporting() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref as React.RefObject<Element>, {
    amount: isMobile ? 0.2 : 1,
  });
  const { setActiveSection, disableHeader } = useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("Supporting");
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="Supporting"
      className="w-full bg-gradient-to-b text-center from-slate-950 to-black   h-fit flex flex-col justify-center gap-2 items-center text-white px-3"
    >
      <h2
        className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
      >
        Supporting miniatures for resin 3d printing
      </h2>
      <p className="max-w-screen-xl">
        We provide professional manual supports service for your warhammer-like,
        DnD or any other miniatures or 3D models, made with Lychee Pro software,
        allowing us to make optimal results for resin 3D printing.
      </p>
      <p>
        You can download a free sample below to see the quality of our work.
      </p>
      <Link
        className="p-[3px] relative mt-2"
        href="https://drive.google.com/file/d/1gQ1jys31MxcdCZwI0_iRmyEE_07Hnftf/view?usp=drive_link"
      >
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
