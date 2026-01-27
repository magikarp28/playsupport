"use client";
import Image from "next/image";
import React, { useState } from "react";
import { PaintingShowcaseData } from "@/app/lib/data";
import clsx from "clsx";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type CustomSlide = SlideImage & { level: number };

const BackgroundGradients = [
  "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #462611 78%)",
  "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
  "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
];

const BackgroundColors = ["#c9885e", "#a5bcc7", "#e2c78c"];

const fonts = ["font-army", "font-hero", "font-art"];

const levelNames = ["Army", "Hero", "Art"];

function PaintingShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className="w-full grid auto-rows-[22rem] md:auto-rows-[25rem] 
    grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto my-5 relative px-5 md:px-0"
    >
      {PaintingShowcaseData.map((item, index) => (
        <div
          key={index}
          className={clsx(
            "relative rounded-xl cursor-pointer",
            item.colspan === 1
              ? "col-span-1 md:col-span-1"
              : "col-span-1 md:col-span-2"
          )}
          style={{
            backgroundImage: BackgroundGradients[item.level - 1],
          }}
          onClick={() => setOpenIndex(index)}
        >
          <Image
            src={item.Image}
            alt={item.title}
            fill={true}
            sizes="(max-width: 768px) 70vw, 60vw"
            style={{ objectFit: "cover" }}
            className="rounded-xl p-[0.5rem]"
            priority={index === 1}
          />
          <div
            className={`backdrop-blur-sm bg-black/70 absolute bottom-2 left-2 px-2 py-1 overflow-hidden border-r-4 border-t-4 border-[${BackgroundGradients[index]}] max-w-[50%] rounded-tr-lg`}
            style={{
              borderColor: BackgroundColors[item.level - 1],
            }}
          >
            <p
              className={`font-bold bg-clip-text text-transparent text-xl text-left text-white ${
                fonts[item.level - 1]
              }`}
              style={{
                backgroundImage: BackgroundGradients[index],
                WebkitBackgroundClip: "text",
              }}
            >
              {levelNames[item.level - 1]}
            </p>
          </div>
        </div>
      ))}
      {openIndex !== null && (
        <Lightbox
          open={openIndex !== null}
          close={() => setOpenIndex(null)}
          index={openIndex}
          slides={
            PaintingShowcaseData.map((item) => ({
              src: item.Image,
              alt: item.title,
              level: item.level, // pass level here
            })) as CustomSlide[]
          } // <-- type assertion here
          render={{
            slide: ({ slide, rect }) => {
              const customSlide = slide as CustomSlide; // type assertion for access
              return (
                <div className="relative w-full h-full justify-center items-center flex bg-black max-w-full max-h-full">
                  <Image
                    src={customSlide.src}
                    alt={customSlide.alt || "slide image"}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                  <div
                    className={`text-white absolute bottom-2 bg-black/50 px-2 py-1 rounded text-4xl ${
                      fonts[customSlide.level - 1]
                    }  `}
                    style={{ color: BackgroundColors[customSlide.level - 1] }}
                  >
                    {levelNames[customSlide.level - 1]}
                  </div>
                </div>
              );
            },
          }}
        />
      )}
    </div>
  );
}

export default PaintingShowcase;
