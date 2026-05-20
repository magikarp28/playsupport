import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
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
    namespace: "ContactPage.metadata",
  });

  return buildLocalizedMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    keywords:
      locale === "de"
        ? ["kontakt", "miniaturbemalung kontakt", "auftragsanfrage", "angebot"]
        : [
            "contact",
            "miniature painting contact",
            "commission inquiry",
            "miniature painting quote",
          ],
  });
}

async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return (
    <section
      id="Contact"
      className="w-full text-center 
    h-fit flex flex-col justify-center items-center text-white bg-gradient-to-b from-black via-slate-900 to-black z-10 min-h-[calc(100vh-120px)]"
    >
      <div className="w-full max-w-screen-md mt-32 flex flex-col justify-center items-center gap-2 px-3">
        <h1
          className="text-4xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
        >
          {t("title")}
        </h1>
        <p className="max-w-screen-xl">{t("subtitle")}</p>
        <p>
          <a href="mailto:playsuppminis@gmail.com" className="underline">
            playsuppminis@gmail.com
          </a>
        </p>
        <ContactForm />
      </div>
    </section>
  );
}

export default Page;
