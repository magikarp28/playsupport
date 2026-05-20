import type { Metadata } from "next";
import "./globals.css";
import { seoBaseMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...seoBaseMetadata,
  title: "PlaySupport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children as React.ReactElement;
}
