import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/privacypolicy"],
    },
    sitemap: "https://playsupport.art/sitemap.xml",
    host: "https://playsupport.art",
  };
}
