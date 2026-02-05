import PlaysuppButton from "@/components/PlaysuppButton";
import Supportperks from "@/components/support-perks";
import { HiOutlineDownload } from "react-icons/hi";
import type { Metadata } from "next";
import image from "@/../public/images/paintShowcase/Rendered ant supported.png";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL("https://playsupport.art"),
  title: "Miniature 3D Print Presupport Service – PlaySupport",
  description:
    "Professional manual pre supports for resin 3d printed miniatures and 3D models.",
  applicationName: "PlaySupport",
  keywords: [
    "3d print supports",
    "miniature presupport",
    "resin 3d printing",
    "manual 3D print supports",
    "miniatures",
  ],
  alternates: {
    canonical: "https://playsupport.art/supporting",
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
    url: "https://playsupport.art/supporting",
    siteName: "PlaySupport.art",
    title: "Miniature 3D Print Presupport Service – PlaySupport",
    description:
      "Professional manual pre supports for your resin 3d printed miniatures and 3D models.",
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

function page() {
  return (
    <section
      id="Contact"
      className="w-full text-center h-fit flex flex-col justify-center items-center text-white z-10 bg-gradient-to-b from-black via-slate-900 to-black min-h-[calc(100vh-120px)]"
    >
      <div className="w-full max-w-screen-xl mt-20 md:mt-28 flex flex-col px-4 sm:px-6 lg:px-8 justify-center items-center gap-8 md:gap-12">
        <div className="flex flex-col lg:flex-row w-full items-center gap-8 md:gap-12">
          <div className="lg:basis-1/2 w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl bg-clip-text text-transparent
              bg-gradient-to-b from-white to-slate-400 font-bold leading-tight max-w-2xl"
            >
              Miniature pre support service
            </h1>

            <div className="space-y-4 max-w-2xl">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                We provide professional manual supports service for your
                warhammer-like, DnD or any other miniatures or 3D models, made
                with Lychee Plus software, allowing us to make optimal results
                for resin 3D printing.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Let us handle the creation of supports so you can focus your
                craft and make the best possible miniatures
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                You can download a free sample below to see the quality of our
                work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <PlaysuppButton
                text="Free miniature"
                href="https://www.datocms-assets.com/160411/1769697786-ant-diplomat-v3.zip"
                icon={HiOutlineDownload}
              />
              <PlaysuppButton text="Get a Free Quote" href="/contact" />
            </div>
          </div>

          <div className="lg:basis-1/2 w-full flex justify-end items-center">
            <Image
              src={image}
              alt="miniature 3d print supporting"
              className="w-full max-w-xs md:max-w-sm h-auto"
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 400px, (min-width: 768px) 350px, 90vw"
              priority
            />
          </div>
        </div>

        <div className="w-full">
          <Supportperks />
        </div>
      </div>
    </section>
  );
}

export default page;
