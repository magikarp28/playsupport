"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "./background-gradient";
import Image from "next/image";

const BackgroundGradients = [
  "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #462611 78%)",
  "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
  "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
];
const BackgroundColors = ["#c9885e", "#a5bcc7", "#e2c78c"];
const fonts = ["font-army", "font-hero", "font-art"];
const levelNames = ["Army", "Hero", "Art"];

function getTierIndex(tier: string) {
  const idx = levelNames.findIndex(
    (name) => name.toLowerCase() === tier.toLowerCase(),
  );
  return idx !== -1 ? idx : 0;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = false,
  className,
  showTierStyling = false,
}: {
  items: { src: string; alt: string; tier?: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  showTierStyling?: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-screen-xl overflow-hidden",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => {
          let tierIdx = 0;
          if (showTierStyling && item.tier) {
            tierIdx = getTierIndex(item.tier);
          }
          return (
            <li key={"imagesReel" + idx} className="list-none">
              {showTierStyling && item.tier ? (
                <div
                  className={cn(
                    "relative rounded-xl w-[16rem] h-[16rem] sm:w-[26rem] sm:h-[24rem] flex flex-col items-center justify-center cursor-pointer",
                    fonts[tierIdx],
                  )}
                  style={{
                    backgroundImage: BackgroundGradients[tierIdx],
                  }}
                >
                  <Image
                    sizes="(max-width: 768px) 70vw, 500px"
                    src={item.src}
                    alt={item.alt}
                    width={400}
                    height={400}
                    style={{ objectFit: "cover" }}
                    className="rounded-xl  w-full h-full"
                  />
                  <div
                    className="backdrop-blur-sm bg-black/70 absolute bottom-0 left-0 px-2 py-1 overflow-hidden rounded-bl-lg border-4  max-w-[50%] rounded-tr-lg"
                    style={{
                      borderColor: BackgroundColors[tierIdx],
                    }}
                  >
                    <span
                      className={cn(
                        "font-bold bg-clip-text text-transparent text-xl text-left text-white",
                        fonts[tierIdx],
                      )}
                      style={{
                        backgroundImage: BackgroundGradients[tierIdx],
                        WebkitBackgroundClip: "text",
                      }}
                    >
                      {levelNames[tierIdx]}
                    </span>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                      border: `4px solid ${BackgroundColors[tierIdx]}`,
                    }}
                  />
                </div>
              ) : (
                <BackgroundGradient className="w-[16rem] h-[16rem] sm:w-[26rem] sm:h-[24rem]">
                  <Image
                    sizes="(max-width: 768px) 70vw, 500px"
                    src={item.src}
                    alt={item.alt}
                    width={400}
                    height={400}
                    style={{ objectFit: "cover" }}
                    className="rounded-3xl w-full h-full"
                  />
                </BackgroundGradient>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
