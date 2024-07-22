import React from "react";
import { Vortex } from "./ui/vortex";
import { getGalleryImages } from "@/helpers/galleryImages";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

function Hero() {
  const imageSrcs: string[] = getGalleryImages().map((image) => image.src);
  return (
    <div className="w-screen h-fit relative overflow-hidden bg-black flex justify-center items-center">
      <div className="absolute top-10 left-20 transform w-[12rem] h-24 blur-[8rem]  sm:w-[28rem] sm:h-48 bg-rose-800 z-10 sm:blur-[16rem]" />
      <div className="absolute top-10 right-20 transform w-[12rem] h-24 blur-[8rem] sm:w-[28rem] sm:h-48 bg-sky-800 z-10 sm:blur-[16rem]" />
      <div className="flex flex-row flex-wrap pt-32 text-center pl-2 pb-10 bg-transparent w-full max-w-screen-2xl justify-between z-10">
        <div className="px-5">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 h-20">
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
            <button className="p-[3px] relative mt-7">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-lg" />
              <div className="px-8 py-2 bg-slate-950 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                Get In Touch
              </div>
            </button>
          </div>
        </div>
        <InfiniteMovingCards
          items={imageSrcs}
          className="overflow-hidden z-10"
        />
      </div>
      <Vortex
        backgroundColor="slate-950"
        baseRadius={4}
        rangeY={300}
        particleCount={100}
        baseHue={270}
        className="absolute z-0"
      ></Vortex>
    </div>
  );
}

export default Hero;
