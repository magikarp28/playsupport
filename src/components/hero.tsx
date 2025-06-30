"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import InfiniteMovingCards from "./ui/infinite-moving-cards";
import LogoImg from "@/../public/PlaySupportLogoFinal.svg";
import Image from "next/image";
import { getGalleryImages } from "@/helpers/galleryImages";
import { useInView } from "framer-motion";
import { useActiveSection } from "./context/active-section-context";
import useIsMobile from "@/lib/useIsMobile";
import Link from "next/link";
import { FaPaintBrush } from "react-icons/fa";
import { Gi3dMeeple } from "react-icons/gi";
import image from "@/../public/images/paintShowcase/lizard.png";
import { AuroraBackground } from "./ui/aurora-background";

function Hero() {
  const [images, setImages] = useState<string[]>([]);
  const DesktopVortex = React.lazy(() => import("./DesktopVortex"));
  useEffect(() => {
    const images = getGalleryImages();
    setImages(images);
  }, []);

  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: isMobile ? 0.1 : 0.6 });
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
        <div className="px-5 sm:text-left">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 pb-3">
            PlaySupport
          </h1>
          <div className="text-white text-lg md:text-xl max-w-xl mt-6 flex flex-col gap-4">
            <p>
              There is no worse fate for a hobby than it becoming a chore. Our
              lives are filled with enough obligations as it is. We are here to
              support you so that you can focus on playing.
            </p>
            <div className="flex flex-col gap-2">
              <div>
                <div className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300 inline font-bold ">
                  Playsupport
                </div>{" "}
                offers you support with:
              </div>
              <ul className="list-none space-y-2 text-lg">
                <li className="ml-2 flex items-start">
                  <FaPaintBrush className="inline mr-2 mt-1 text-3xl" />
                  Getting your miniatures ready for the tabletop – painting,
                  assembling, magnetizing
                </li>
                <li className="ml-2 flex items-start">
                  <Gi3dMeeple className="inline mr-2 mt-1 text-3xl" />
                  Supporting your 3D miniatures for resin 3D printing so they
                  print properly every time
                </li>
              </ul>
            </div>
          </div>
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
        {!isMobile && (
          <div className="p-[3px] relative w-full max-w-[450px] h-full overflow-hidden flex justify-center items-center">
            <AuroraBackground className="rounded-2xl w-full h-full overflow-hidden ">
              <div className="w-full h-full flex justify-center items-center">
                <Image src={image} alt="showcaseImage" className="w" priority />
              </div>
            </AuroraBackground>
          </div>
        )}
      </div>
      <Suspense>
        <DesktopVortex />
      </Suspense>
    </section>
  );
}

export default Hero;

/*<InfiniteMovingCards
items={images}
className="overflow-hidden z-10 mt-5 sm:mt-0"
speed="fast"
/>*/
