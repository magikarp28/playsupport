"use client";

import { LevelImages } from "@/app/lib/data";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BackgroundGradients = [
  "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #462611 78%)",
  "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
  "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
];

const BackgroundColors = ["#b37952", "#8B9FA9", "#e2c78c"];
const fonts = ["font-army", "font-hero", "font-art"];

function PaintingTiers() {
  const t = useTranslations("PaintingTiers");
  const levels = t.raw("levels") as Array<{ title: string; text: string }>;

  return (
    <section className="w-full">
      <div className="mx-auto my-8 grid w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 sm:px-6 md:grid-cols-3 md:gap-6 md:px-0">
        {LevelImages.map((item, index) => (
          <article
            key={index}
            className="relative flex flex-col items-center transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative w-full">
              <Image
                src={item.src}
                alt={levels[index]?.title ?? "Level " + (index + 1)}
                width={1200}
                height={1800}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="h-auto w-full object-contain drop-shadow-2xl"
                priority={index === 1}
              />
            </div>

            <div className="relative z-10 mx-auto -mt-2 w-[72%] md:w-[68%]">
              <div className="relative rounded-2xl bg-gradient-to-br from-white/5 to-white/0 p-5 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full shadow-inner"
                    style={{ backgroundColor: BackgroundColors[index] + "40" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: BackgroundColors[index] }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  <h4
                    className={[
                      "bg-clip-text text-left text-2xl font-bold tracking-tight text-transparent md:text-3xl",
                      fonts[index] || "",
                    ].join(" ")}
                    style={{
                      backgroundImage: BackgroundGradients[index],
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {levels[index]?.title ?? "Level " + (index + 1)}
                  </h4>
                </div>

                <p className="text-left text-sm leading-relaxed text-white/75">
                  {levels[index]?.text}
                </p>

                <div
                  className="absolute bottom-0 left-4 right-4 h-px"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, transparent, " +
                      BackgroundColors[index] +
                      ", transparent)",
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PaintingTiers;
