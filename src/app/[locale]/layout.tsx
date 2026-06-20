import type { Metadata } from "next";
import "../globals.css";
import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import ActiveSectionContextProvider from "@/components/context/active-section-context";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../../i18n";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { seoBaseMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...seoBaseMetadata,
  title: "PlaySupport",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Miniature Painting Commissions",
  provider: {
    "@type": "Organization",
    name: "PlaySupport",
    url: "https://www.playsupport.art",
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "AdministrativeArea", name: "European Union" },
  ],
  description:
    "Professional online miniature painting commissions and resin pre-supports for tabletop gaming.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className="!scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <div className="text-gray-950 relative max-w-[100%] overflow-x-hidden">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              <ActiveSectionContextProvider>
                <Header />
                <main>{children}</main>
                <Footer />
              </ActiveSectionContextProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
