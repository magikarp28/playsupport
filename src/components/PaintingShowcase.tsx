import Image from "next/image";
import React from "react";
import { PaintingShowcaseData } from "@/app/lib/data";
import clsx from "clsx";

const BackgroundGradients = [
  "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #462611 78%)",
  "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
  "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
];

function PaintingShowcase() {
  return (
    <div className="w-full grid auto-rows-[22rem] md:auto-rows-[25rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto my-5 relative px-5 md:px-0">
      {PaintingShowcaseData.map((item, index) => (
        <div
          key={index}
          className={clsx(
            "relative rounded-xl",
            item.colspan === 1
              ? "col-span-1 md:col-span-1"
              : "col-span-1 md:col-span-2"
          )}
          style={{
            backgroundImage: BackgroundGradients[item.level - 1],
          }}
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
        </div>
      ))}
    </div>
  );
}

export default PaintingShowcase;
