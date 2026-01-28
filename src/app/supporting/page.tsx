import PlaysuppButton from "@/components/PlaysuppButton";
import Supportperks from "@/components/support-perks";
import Link from "next/link";
import { HiOutlineDownload } from "react-icons/hi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://playsupport.art"),
  title: "Miniature 3D Print Presupport Service – PlaySupport",
  description:
    "Professional manual supports for your miniatures and 3D models. Get optimal results for resin 3D printing with our Lychee Pro expertise. Free sample available.",
  applicationName: "PlaySupport",
  keywords: [
    "3d print supports",
    "miniature presupport",
    "resin 3d printing",
    "Lychee Pro",
    "manual supports",
    "warhammer",
    "DnD",
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
      "Manual supports for miniatures and 3D models. See our quality with a free sample. Resin 3D printing specialists.",
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
      className="w-full text-center 
    h-fit flex flex-col justify-center items-center text-white z-10 bg-gradient-to-b from-black via-slate-900 to-black min-h-[calc(100vh-120px)]"
    >
      <div className="w-full max-w-screen-2xl mt-28 flex flex-col px-3 justify-center items-center gap-2">
        <h1
          className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
        >
          Miniature pressuport service
        </h1>
        <p className="max-w-screen-xl">
          We provide professional manual supports service for your
          warhammer-like, DnD or any other miniatures or 3D models, made with
          Lychee Pro software, allowing us to make optimal results for resin 3D
          printing.
        </p>
        <p>
          You can download a free sample below to see the quality of our work.
        </p>
        <Link
          className="p-[3px] relative mt-2"
          href="https://drive.google.com/file/d/1gQ1jys31MxcdCZwI0_iRmyEE_07Hnftf/view?usp=drive_link"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full" />
          <div className=" bg-slate-950  relative group transition duration-200 text-white hover:bg-transparent px-3 py-2 rounded-full flex justify-center items-center">
            Free sample
            <HiOutlineDownload className="text-3xl ml-2" />
          </div>
        </Link>
        <Supportperks />
        <PlaysuppButton text="Get a Free Quote" href="/contact" />
      </div>
    </section>
  );
}

export default page;
