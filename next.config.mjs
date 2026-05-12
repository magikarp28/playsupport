// Import createRequire from the module package
import { createRequire } from "module";
// Use createRequire to simulate CommonJS's require in ESM
const require = createRequire(import.meta.url);

const withVideos = require("next-videos");
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/painting", destination: "/en/painting" },
      { source: "/gallery", destination: "/en/gallery" },
      { source: "/supporting", destination: "/en/supporting" },
      { source: "/contact", destination: "/en/contact" },
      { source: "/privacypolicy", destination: "/en/privacypolicy" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
      },
    ],
  },
};

export default withVideos(withNextIntl(nextConfig));
