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
const tierOffsets = [
  "md:-translate-y-2",
  "md:translate-y-3",
  "md:-translate-y-1",
];

function PaintingTiers() {
  const t = useTranslations("PaintingTiers");
  const levels = t.raw("levels") as Array<{ title: string; text: string }>;

  return (
    <section className="w-full">
      <div className="mx-auto my-8 grid w-full max-w-7xl grid-cols-1 auto-rows-[23rem] gap-6 px-4 sm:px-6 md:grid-cols-3 md:auto-rows-[27rem] md:gap-5 md:px-0">
        {LevelImages.map((item, index) => (
          <article
            key={index}
            className={[
              "relative h-full overflow-hidden rounded-2xl",
              "shadow-[0_18px_45px_-22px_rgba(0,0,0,0.7)]",
              "ring-1 ring-white/15",
              tierOffsets[index] || "",
            ].join(" ")}
            style={{ backgroundImage: BackgroundGradients[index] }}
          >
            <div
              className="absolute left-0 top-0 z-20 h-1.5 w-full opacity-90"
              style={{ backgroundColor: BackgroundColors[index] }}
            />

            <Image
              src={item.src}
              alt={levels[index]?.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded-2xl object-cover p-[0.5rem]"
              priority={index === 1}
            />

            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute inset-x-3 bottom-3 z-30">
              <div className="rounded-xl border border-white/20 bg-black/45 p-3 backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-semibold text-black/80"
                    style={{ backgroundColor: BackgroundColors[index] }}
                  >
                    {index + 1}
                  </span>
                  <h4
                    className={[
                      "text-left text-3xl font-bold text-transparent bg-clip-text",
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

                <p className="text-left text-sm leading-relaxed text-zinc-100/95">
                  {levels[index]?.text}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PaintingTiers;
