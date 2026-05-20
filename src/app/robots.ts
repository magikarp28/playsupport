import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/privacypolicy", "/de/privacypolicy"],
    },
    sitemap: "https://www.playsupport.art/sitemap.xml",
    host: "https://www.playsupport.art",
  };
}
