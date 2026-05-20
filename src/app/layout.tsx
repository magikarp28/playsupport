import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { seoBaseMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...seoBaseMetadata,
  title: "PlaySupport",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const locale = h.get("x-next-intl-locale") ?? "en";

  return (
    <html
      lang={locale}
      className="!scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
