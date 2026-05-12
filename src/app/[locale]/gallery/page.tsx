import { getTranslations } from "next-intl/server";
import PlaySuppGalleryWrapper from "@/components/PlaySuppGalleryWrapper";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { defaultLocale, locales, type AppLocale } from "../../../../i18n";

type GalleryImage = {
  url: string;
};

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

  return buildLocalizedMetadata({
    locale,
    path: "/gallery",
    title:
      locale === "de"
        ? "Galerie bemalter Miniaturen - PlaySupport"
        : "Miniature Painting Gallery - PlaySupport",
    description:
      locale === "de"
        ? "Sieh dir unsere Galerie bemalter Miniaturen an. Beispiele fuer professionelle Miniaturbemalung fuer Warhammer, DnD, Brettspiele und Vitrinenmodelle."
        : "Browse our gallery of painted miniatures. See examples of our professional miniature painting for Warhammer, DnD, board games, and display pieces.",
    keywords:
      locale === "de"
        ? [
            "miniaturbemalung galerie",
            "bemalte miniaturen",
            "warhammer bemalung",
            "dnd miniaturen",
          ]
        : [
            "miniature painting gallery",
            "painted miniatures",
            "Warhammer gallery",
            "DnD miniatures",
          ],
  });
}

async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });
  return (
    <section
      className="w-full text-center 
    h-fit flex flex-col justify-center items-center text-white px-3 z-10 bg-gradient-to-b from-black via-slate-900 to-black min-h-[calc(100vh-120px)]"
    >
      <h1
        className="text-4xl bg-clip-text text-transparent mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold mt-36"
      >
        {t("title")}
      </h1>
      <div className="max-w-screen-xl w-full p-6 rounded-lg shadow-lg">
        <PlaySuppGalleryWrapper />
      </div>
    </section>
  );
}

export default Page;
