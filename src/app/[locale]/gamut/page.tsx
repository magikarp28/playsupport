import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { defaultLocale, locales, type AppLocale } from "../../../../i18n";
import GamutTool from "@/components/gamut/GamutTool";

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
    namespace: "GamutPage.metadata",
  });

  return buildLocalizedMetadata({
    locale,
    path: "/gamut",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    keywords:
      locale === "de"
        ? [
            "gamut maske",
            "farbschema miniaturen",
            "farben mischen acryl",
            "farbkreis malerei",
            "miniaturen bemalen farben",
          ]
        : [
            "gamut mask",
            "miniature painting color scheme",
            "paint color wheel",
            "mixing acrylic paint",
            "james gurney gamut",
            "limited palette",
          ],
  });
}

async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "GamutPage" });

  const cards = [
    { title: t("aboutTitle"), text: t("aboutText") },
    { title: t("maskTitle"), text: t("maskText") },
    { title: t("valueTitle"), text: t("valueText") },
    { title: t("paletteTitle"), text: t("paletteText") },
  ];

  return (
    <section
      id="Gamut"
      className="w-full text-center h-fit flex flex-col justify-center items-center text-white z-10 min-h-[calc(100vh-120px)]"
    >
      <div className="w-full bg-gradient-to-b from-black to-slate-900 flex flex-col items-center px-3">
        <div className="max-w-7xl w-full mt-32">
          <h1
            className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
          >
            {t("title")}
          </h1>
          <p className="max-w-screen-xl text-lg mx-auto">{t("intro")}</p>
          <div className="mt-10 mb-16">
            <GamutTool />
          </div>
        </div>
      </div>
      <div className="w-full bg-gradient-to-b from-slate-900 to-black flex flex-col items-center px-3">
        <div className="max-w-7xl w-full mt-20 mb-16 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-slate-800/30 rounded-lg border border-slate-700 p-5"
              >
                <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 pb-2">
                  {card.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
