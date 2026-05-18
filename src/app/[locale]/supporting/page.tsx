import { getTranslations } from "next-intl/server";
import PlaysuppButton from "@/components/PlaysuppButton";
import Supportperks from "@/components/support-perks";
import { HiOutlineDownload } from "react-icons/hi";
import type { Metadata } from "next";
import image from "@/../public/images/paintShowcase/Rendered ant supported.webp";
import Image from "next/image";
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

  return buildLocalizedMetadata({
    locale,
    path: "/supporting",
    title:
      locale === "de"
        ? "Miniatur 3D-Druck Presupport-Service - PlaySupport"
        : "Miniature 3D Print Presupport Service - PlaySupport",
    description:
      locale === "de"
        ? "Professionelle manuelle Supports fuer resin 3D-gedruckte Miniaturen und 3D-Modelle."
        : "Professional manual pre-supports for resin 3D-printed miniatures and 3D models.",
    keywords:
      locale === "de"
        ? [
            "resin supports",
            "miniatur presupport",
            "3d druck supports",
            "lychee supports",
            "miniaturen",
          ]
        : [
            "3d print supports",
            "miniature presupport",
            "resin 3d printing",
            "manual 3D print supports",
            "miniatures",
          ],
  });
}

async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SupportingPage" });
  const contactHref = locale === "en" ? "/contact" : `/${locale}/contact`;
  return (
    <section
      id="Contact"
      className="w-full text-center h-fit flex flex-col justify-center items-center text-white z-10 bg-gradient-to-b from-black via-slate-900 to-black min-h-[calc(100vh-120px)]"
    >
      <div className="w-full max-w-screen-xl mt-36 md:mt-28 lg:mt-14 flex flex-col px-4 sm:px-6 lg:px-8 justify-center items-center gap-8 md:gap-12">
        <div className="flex flex-col lg:flex-row w-full items-center gap-8 md:gap-12">
          <div className="lg:basis-1/2 w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl bg-clip-text text-transparent
              bg-gradient-to-b from-white to-slate-400 font-bold leading-tight max-w-2xl"
            >
              {t("title")}
            </h1>

            <div className="space-y-4 max-w-2xl">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t("description1")}
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t("description2")}
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t("description3")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <PlaysuppButton
                text={t("buttonFree")}
                href="https://www.datocms-assets.com/160411/1769697786-ant-diplomat-v3.zip"
                icon={HiOutlineDownload}
              />
              <PlaysuppButton text={t("buttonQuote")} href={contactHref} />
            </div>
          </div>

          <div className="lg:basis-1/2 w-full flex justify-end items-center">
            <Image
              src={image}
              alt="miniature 3d print supporting"
              className="w-full max-w-xs md:max-w-sm h-auto"
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 400px, (min-width: 768px) 350px, 90vw"
              priority
            />
          </div>
        </div>

        <div className="w-full">
          <Supportperks />
        </div>
      </div>
    </section>
  );
}

export default Page;
