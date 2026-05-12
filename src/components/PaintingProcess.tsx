"use client";

import { paintingSteps } from "@/app/lib/data";
import PlaysuppButton from "./PlaysuppButton";
import PaintingProcessCard from "./PaintingProcessCard";
import { useLocale, useTranslations } from "next-intl";

function PaintingProcess() {
  const t = useTranslations("PaintingProcess2");
  const locale = useLocale();
  const steps = t.raw("steps") as Array<{ title: string; description: string }>;

  return (
    <section className="w-full py-2 ">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">
          {t("flowLabel")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-4 text-md leading-7 text-slate-300">{t("intro")}</p>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:auto-rows-fr w-full  min-h-10">
        {paintingSteps.map((step, index) => (
          <PaintingProcessCard
            step={{
              ...step,
              title: steps[index]?.title ?? step.title,
              description: steps[index]?.description ?? step.description,
            }}
            index={index}
            stepLabel={t("stepLabel")}
            key={`${step.title}-${step.ImgSrc}`}
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-300 sm:text-base">{t("outro")}</p>
      <div className="flex flex-col items-center">
        <PlaysuppButton
          text={t("cta")}
          href={locale === "en" ? "/contact" : `/${locale}/contact`}
        />
      </div>
    </section>
  );
}

export default PaintingProcess;
