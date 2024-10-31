"use client";
import React, { useEffect, useState, useRef } from "react";
import { Vortex } from "./ui/vortex";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import DesktopVortex from "./DesktopVortex";
import LogoImg from "@/../public/PlaySupportLogoFinal.svg";
import Image from "next/image";
import { getGalleryImages } from "@/helpers/galleryImages";
import { useInView } from "framer-motion";
import { useActiveSection } from "./context/active-section-context";
import useIsMobile from "@/lib/useIsMobile";
import Link from "next/link";

function Hero() {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const images = getGalleryImages();
    setImages(images);
  }, []);

  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: isMobile ? 0.1 : 0.7 });
  const { setActiveSection, disableHeader, setDisableHeader } =
    useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("home");
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="home"
      className="w-screen h-fit relative overflow-hidden bg-black flex justify-center items-center z-20"
    >
      <div className="absolute top-10 left-20 transform w-[12rem] h-24 blur-[8rem] sm:w-[28rem] sm:h-48 bg-rose-800 z-10 sm:blur-[14rem]" />
      <div className="absolute top-10 right-20 transform w-[12rem] h-24 blur-[8rem] sm:w-[28rem] sm:h-48 bg-sky-800 z-10 sm:blur-[14rem]" />
      <div className="flex flex-row flex-wrap pt-24 text-center pl-2 pb-10 bg-transparent w-full max-w-screen-2xl justify-center z-10">
        <div className="mb-4 w-44 h-44 flex justify-center items-center relative bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full overflow-hidden sm:hidden p-[4px]">
          <Image
            className="rounded-full bg-black w-full h-full"
            src={LogoImg}
            alt="Logo Image"
          />
        </div>
        <div className="px-5">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 pb-3">
            PlaySupport
          </h1>
          <p className="text-white text-lg max-w-xl mt-6">
            Welcome to Playsupport, your premier destination for expert
            miniature painting and resin 3D printing services. At Playsupport,
            we bring your gaming visions to life with meticulous attention to
            detail and craftsmanship. Whether you're a tabletop enthusiast
            looking to enhance your collection or a hobbyist seeking custom
            creations, our dedicated team combines artistic expertise with
            cutting-edge technology to deliver stunning results.
          </p>
          <div className="w-full flex justify-center">
            <div className="p-[3px] relative mt-7">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full" />
              <Link
                href="#contact"
                className="px-8 py-2 flex bg-slate-950 rounded-full relative group transition duration-200 text-white hover:bg-transparent"
                onClick={() => {
                  setActiveSection("contact");
                  setDisableHeader(true);
                }}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DesktopVortex />
    </section>
  );
}

export default Hero;

/*
        <InfiniteMovingCards
          items={images}
          className="overflow-hidden z-10 mt-5 sm:mt-0"
        />
*/
