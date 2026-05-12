import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { seoBaseMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

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
    url: "https://playsupport.art",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "United States",
    },
    { "@type": "AdministrativeArea", name: "European Union" },
  ],
  description:
    "Professional online miniature painting commissions and resin pre-supports for tabletop gaming.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="!scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      </head>
      <body
        className={`${inter.className} text-gray-950 relative max-w-[100%] overflow-x-hidden`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
