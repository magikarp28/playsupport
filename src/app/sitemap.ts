import { MetadataRoute } from "next";
import { locales, type AppLocale } from "../../i18n";
import { languageAlternates, localePath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: `/${string}` | "/"; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/painting", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
    { path: "/supporting", priority: 0.6 },
    { path: "/contact", priority: 0.4 },
  ];

  const now = new Date();

  return routes.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: localePath(locale as AppLocale, path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  );
}
