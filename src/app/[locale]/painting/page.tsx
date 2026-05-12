import { getTranslations } from "next-intl/server";
import PaintingProcess from "@/components/PaintingProcess";
import PaintingTiers from "@/components/PaintingTiers";
import PricingTable from "@/components/PricingTable";
import { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { defaultLocale, locales, type AppLocale } from "../../../../i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: AppLocale = hasLocale(locales, rawLocale)
    ? rawLocale
    : defaultLocale;
  const t = await getTranslations({
    locale,
    namespace: "PaintingPage.metadata",
  });

  return buildLocalizedMetadata({
    locale,
    path: "/painting",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    keywords:
      locale === "de"
        ? [
            "miniaturbemalung",
            "auftragsbemalung",
            "warhammer bemalen lassen",
            "dnd miniaturen bemalen",
            "bemalservice",
          ]
        : [
            "miniature painting",
            "wargaming miniatures",
            "Warhammer painting",
            "board game miniature painting",
            "commission painting",
            "painting service",
          ],
  });
}

async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PaintingPage" });
  return (
    <section
      id="Painting"
      className="w-full text-center 
    h-fit flex flex-col justify-center items-center text-white z-10 min-h-[calc(100vh-120px)]"
    >
      <div className="w-full bg-gradient-to-b from-black to-slate-900 flex flex-col items-center px-3">
        <div className="max-w-7xl w-full mt-32">
          <h1
            className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
          >
            {t("title")}
          </h1>
          <p className="max-w-screen-xl text-lg">{t("intro")}</p>
          <h4
            className="text-lg bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-xl font-semibold"
          >
            {t("tiersLead")}
          </h4>
          <PaintingTiers />
        </div>
      </div>
      <div className="w-full bg-gradient-to-b from-slate-900 to-black flex flex-col items-center">
        <div className="max-w-[85%] md:max-w-screen-xl w-full mt-20 flex flex-col items-center ">
          <PaintingProcess />
          <PricingTable />
          <p className="text-xs md:text-sm mt-2 mb-2">{t("priceNote")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3  max-w-5xl">
            <p className="text-xs md:text-sm flex items-center justify-center p-2 bg-slate-800/30 rounded-lg border border-slate-700">
              <span>
                <span className="font-semibold">Non-EU:</span> {t("nonEu")}
              </span>
            </p>
            <p className="text-xs md:text-sm flex items-start gap-2 bg-slate-800/30 p-2 rounded-lg border border-slate-700">
              <span>
                <span className="font-semibold">EU:</span> {t("eu")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
