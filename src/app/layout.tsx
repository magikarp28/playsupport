import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ActiveSectionContextProvider from "@/components/context/active-section-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "PlaySupport - Miniature painting and resin 3d print presupporting service",
  description:
    "We offer professional miniature painting service and creating high quality manual supports for 3d printing miniatures in resin. Based in EU.",
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
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-[rem] max-w-[100%] overflow-x-hidden`}
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
      </body>
    </html>
  );
}
