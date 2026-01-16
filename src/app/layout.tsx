import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ActiveSectionContextProvider from "@/components/context/active-section-context";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative max-w-[100%] overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveSectionContextProvider>
            {children}
          </ActiveSectionContextProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
