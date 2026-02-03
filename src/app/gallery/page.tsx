import PlaySuppGalleryWrapper from "@/components/PlaySuppGalleryWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://playsupport.art"),
  title: "Miniature Painting Gallery – PlaySupport",
  description:
    "Browse our gallery of painted miniatures. See examples of our professional miniature painting for Warhammer, DnD, board games, and display pieces.",
  applicationName: "PlaySupport",
  keywords: [
    "miniature painting gallery",
    "painted miniatures",
    "Warhammer gallery",
    "DnD miniatures",
  ],
  alternates: {
    canonical: "https://playsupport.art/gallery",
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
    url: "https://playsupport.art/gallery",
    siteName: "PlaySupport.art",
    title: "Miniature Painting Gallery – PlaySupport",
    description:
      "Gallery of painted miniatures by PlaySupport. Explore our work for Warhammer, DnD, and more.",
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

type GalleryImage = {
  url: string;
};

function page() {
  return (
    <section
      className="w-full text-center 
    h-fit flex flex-col justify-center items-center text-white px-3 z-10 bg-gradient-to-b from-black via-slate-900 to-black min-h-[calc(100vh-120px)]"
    >
      <h1
        className="text-4xl bg-clip-text text-transparent mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold mt-28"
      >
        Painted miniatures gallery
      </h1>
      <div className="max-w-screen-xl w-full p-6 rounded-lg shadow-lg">
        <PlaySuppGalleryWrapper />
      </div>
    </section>
  );
}

export default page;
