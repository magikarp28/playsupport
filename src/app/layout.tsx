import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ActiveSectionContextProvider from "@/components/context/active-section-context";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import type { WithContext, ProfessionalService } from "schema-dts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://playsupport.art"),
  title:
    "PlaySupport - Miniature painting and resin 3d print presupporting service",
  description:
    "We offer professional miniature painting service and creating high quality manual supports for 3d printing miniatures in resin. Based in EU.",
  applicationName: "PlaySupport",
  keywords: [
    "miniature painting",
    "3d printing",
    "resin printing",
    "presupporting",
  ],
  alternates: {
    canonical: "https://playsupport.art/",
  },
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
  openGraph: {
    type: "website",
    url: "https://playsupport.art/",
    siteName: "PlaySupport.art",
    title: "PlaySupport - Miniature painting & resin 3D print presupporting",
    description:
      "Professional miniature painting and high-quality manual supports for resin 3D printing. Based in the EU.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "PlaySupport",
      },
    ],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const serviceSchema: WithContext<ProfessionalService> = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "PlaySupport",
  url: "https://playsupport.art",
  logo: "https://playsupport.art/android-chrome-512x512.png",
  image: "https://playsupport.art/android-chrome-512x512.png",
  description:
    "PlaySupport offers high-quality miniature painting commissions and resin pre-support services for tabletop gaming and 3D printing.",
  sameAs: [
    "https://www.instagram.com/playsupport/",
    "https://www.youtube.com/@PlaySupportMinis",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Miniature Painting Commissions",
        description:
          "Custom miniature painting commissions for tabletop games like warhammer and display pieces.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Resin Pre-Support Services",
        description:
          "Professional resin pre-supports optimized for reliable 3D printing.",
      },
    },
  ],
};

export default function RootLayout({
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveSectionContextProvider>
            <Header />
            <main className="">{children}</main>
            <Footer />
          </ActiveSectionContextProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
