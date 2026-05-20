import React from "react";
import Image from "next/image";
import image from "@/../public/images/paintShowcase/Chaos Lord on Daemonic Mount.webp";
import image2 from "@/../public/images/paintShowcase/imperial fist.webp";
import HeroText from "./HeroText";
import DesktopVortex from "./DesktopVortex";

function Hero() {
  return (
    <section
      id="Home"
      aria-labelledby="home-heading"
      className="w-screen h-fit relative overflow-hidden flex justify-center items-center z-20 bg-gradient-to-r from-rose-950 to-slate-950"
    >
      <div
        className="absolute inset-0 z-0 block md:hidden"
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
        aria-hidden="true"
      />
      <div className="absolute top-10 left-20 transform w-[12rem] h-24 blur-[8rem] sm:w-[38rem] sm:h-56 bg-rose-800 z-10 sm:blur-[14rem]" />
      <div className="absolute top-10 right-20 transform w-[12rem] h-24 blur-[8rem] sm:w-[38rem] sm:h-56 bg-sky-800 z-10 sm:blur-[14rem]" />
      <div className="flex flex-row flex-wrap items-stretch pt-32 2xl:pt-10 px-4 md:px-16 text-center pb-10 w-full max-w-screen z-10 justify-between">
        <div className="hidden md:basis-1/3 2xl:flex justify-center md:justify-start mb-6 md:mb-0 h-full self-end">
          <Image
            src={image2}
            alt="Chaos Lord on Daemonic Mount painted miniature"
            className="w-full max-w-[70%] h-auto max-h-[100%]"
            sizes="(min-width: 1280px) 500px,(min-width: 768px) 350px,90vw"
            fetchPriority="high"
            loading="eager"
          />
        </div>
        <HeroText />
        <div className="hidden md:basis-1/3 md:flex justify-end md:justify-end mb-6 md:mb-0">
          <Image
            src={image}
            alt="Imperial fist captain painted miniature"
            className="w-full max-w-[90%] xl:max-w-[65%] h-auto max-h-[100%]"
            sizes="(min-width: 1280px) 500px,(min-width: 768px) 350px,90vw"
            fetchPriority="high"
            loading="eager"
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <DesktopVortex />
      </div>
    </section>
  );
}

export default Hero;

/*<InfiniteMovingCards
items={images}
className="overflow-hidden z-10 mt-5 sm:mt-0"
speed="fast"
/>*/
