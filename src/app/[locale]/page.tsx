import ContactSection from "@/components/ContactSection";
import Hero from "@/components/hero";
import TestemonialsSection from "@/components/TestemonialsSection";
import PaintingHome from "@/components/PaintingHome";
import SupportingHome from "@/components/supportingHome";
import MiniGallery from "@/components/MiniGallery";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { defaultLocale, locales, type AppLocale } from "../../../i18n";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: AppLocale = hasLocale(locales, rawLocale)
    ? rawLocale
    : defaultLocale;
  const t = await getTranslations({ locale, namespace: "Hero" });

  return buildLocalizedMetadata({
    locale,
    path: "/",
    title: `${t("brand")} - Miniature painting and resin 3D print pre-support service`,
    description: t("intro") + " " + t("location"),
    keywords:
      locale === "de"
        ? [
            "miniaturbemalung",
            "miniaturen bemalen lassen",
            "resin 3d druck supports",
            "warhammer bemalservice",
          ]
        : [
            "miniature painting",
            "3d printing",
            "resin printing",
            "presupporting",
          ],
  });
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "MiniGallery" });

  return (
    <main className="max-w-[100vw] text-white">
      <Hero />
      <PaintingHome />
      <SupportingHome />
      <MiniGallery
        title={t("title")}
        cta={t("cta")}
        galleryHref={locale === "en" ? "/gallery" : `/${locale}/gallery`}
      />
      <TestemonialsSection />
      <ContactSection />
    </main>
  );
}
