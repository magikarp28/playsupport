import type { Metadata } from "next";
import { defaultLocale, type AppLocale, locales } from "../../i18n";

const BASE_URL = "https://playsupport.art";

const localePath = (locale: AppLocale, path: `/${string}` | "/") => {
  const normalized = path === "/" ? "" : path;
  return locale === defaultLocale
    ? `${BASE_URL}${normalized}`
    : `${BASE_URL}/${locale}${normalized}`;
};

const languageAlternates = (path: `/${string}` | "/") => {
  const alternates = Object.fromEntries(
    locales.map((locale) => [locale, localePath(locale, path)]),
  ) as Record<AppLocale, string>;

  return {
    ...alternates,
    "x-default": localePath(defaultLocale, path),
  };
};

type LocalizedMetadataInput = {
  locale: AppLocale;
  path: `/${string}` | "/";
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
};

export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
}: LocalizedMetadataInput): Metadata {
  const url = localePath(locale, path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      siteName: "PlaySupport.art",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [
        {
          url: "/android-chrome-512x512.png",
          width: 1200,
          height: 630,
          alt: "PlaySupport",
        },
      ],
      locale,
    },
  };
}

export const seoBaseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: "PlaySupport",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export { BASE_URL, localePath, languageAlternates };
