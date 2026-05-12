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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ActiveSectionContextProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ActiveSectionContextProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
