import React from "react";
import { LevelImages } from "@/app/lib/data";
import Image from "next/image";

const BackgroundGradients = [
  "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #462611 78%)",
  "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
  "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
];

const BackgroundColors = ["#b37952", "#8B9FA9", "#e2c78c"];

const fonts = ["font-army", "font-hero", "font-art"];

function PaintingTiers() {
  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full grid auto-rows-[22rem] md:auto-rows-[25rem] grid-cols-1 md:grid-cols-3 gap-4 mx-auto my-5 relative px-5 md:px-0">
        {LevelImages.map((item, index) => (
          <div
            className="relative rounded-xl"
            key={index}
            style={{
              backgroundImage: BackgroundGradients[index],
            }}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill={true}
              sizes="(max-width: 768px) 70vw, 60vw"
              style={{ objectFit: "cover" }}
              className="rounded-xl p-[0.5rem]"
              priority={index === 1}
            />
            <div
              className={`backdrop-blur-sm bg-black/30 absolute bottom-2 left-2 px-2 py-1 overflow-hidden border-r-4 border-t-4 border-[${BackgroundColors[index]}] max-w-[50%] rounded-tr-lg`}
              style={{
                borderColor: BackgroundColors[index],
              }}
            >
              <h4
                className={`font-bold bg-clip-text text-transparent text-3xl text-left  ${fonts[index]}`}
                style={{
                  backgroundImage: BackgroundGradients[index],
                  WebkitBackgroundClip: "text",
                }}
              >
                {item.title || `Level ${index + 1}`}
              </h4>
              <p className="text-left">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaintingTiers;

/*
        <p
          className="inline text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background:
              "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #5a3116 78%)",
            WebkitBackgroundClip: "text",
          }}
        >
          Bronze
        </p>
        ,{" "}
        <p
          className="inline text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background:
              "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
            WebkitBackgroundClip: "text",
          }}
        >
          Silver
        </p>{" "}
        and{" "}
        <p
          className="inline text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background:
              "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
            WebkitBackgroundClip: "text",
          }}
        >
          Gold
        </p>
*/
