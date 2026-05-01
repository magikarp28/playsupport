import { PaintingStep } from "@/app/lib/data";
import Image from "next/image";
import type { CSSProperties } from "react";

type PaintingProcessCardProps = {
  step: PaintingStep;
  index: number;
};

function PaintingProcessCard({ step, index }: PaintingProcessCardProps) {
  const cardStyles = {
    borderColor: `color-mix(in oklab, ${step.color} 30%, transparent)`,
    boxShadow: `0 8px 30px color-mix(in oklab, ${step.color} 12%, transparent)`,
  } satisfies CSSProperties;

  const badgeStyles = {
    borderColor: `color-mix(in oklab, ${step.color} 35%, transparent)`,
    color: `color-mix(in oklab, ${step.color} 65%, white)`,
  } satisfies CSSProperties;

  const dotStyles = {
    backgroundColor: step.color,
  } satisfies CSSProperties;

  const titleStyles = {
    color: `color-mix(in oklab, ${step.color} 78%, white)`,
  } satisfies CSSProperties;

  return (
    <article
      style={cardStyles}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border-2 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 transition-all duration-500 md:flex-row"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl md:aspect-auto md:w-[45%] md:min-h-full md:rounded-none md:rounded-l-3xl">
        <Image
          src={step.ImgSrc}
          alt={`${step.title} miniature`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 b opacity-100" />
        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
          <span
            style={badgeStyles}
            className="inline-flex items-center gap-2 rounded-full border bg-black/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-500 group-hover:translate-x-2"
          >
            <span style={dotStyles} className="h-1.5 w-1.5 rounded-full " />
            Step {index + 1}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col px-3 sm:px-6 py-3 sm:py-4 ">
        <div className="space-y-4">
          <h3 style={titleStyles} className="text-lg sm:text-2xl lg:text-lg">
            {step.title}
          </h3>

          <p className="text-mg leading-relaxed text-slate-300 whitespace-pre-line">
            {step.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default PaintingProcessCard;
