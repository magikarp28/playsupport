import PaintingProcess from "@/components/PaintingProcess";
import PaintingTiers from "@/components/PaintingTiers";
import PricingTable from "@/components/PricingTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://playsupport.art"),
  title: "Miniature Painting Service – PlaySupport",
  description:
    "Professional miniature painting for wargaming, DnD, board games, and display pieces. Explore our painting tiers and pricing. Based in the EU.",
  applicationName: "PlaySupport",
  keywords: [
    "miniature painting",
    "wargaming miniatures",
    "Warhammer painting",
    "board game miniature painting",
    "commission painting",
    "painting service",
  ],
  alternates: {
    canonical: "https://playsupport.art/painting",
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
    url: "https://playsupport.art/painting",
    siteName: "PlaySupport.art",
    title: "Miniature Painting Service – PlaySupport",
    description:
      "Commission painting for miniatures: Warhammer, DnD, board games, and more. See our tiers and pricing.",
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
      id="Painting"
      className="w-full text-center 
    h-fit flex flex-col justify-center items-center text-white z-10 min-h-[calc(100vh-120px)]"
    >
      <div className="w-full bg-gradient-to-b from-black to-slate-900 flex flex-col items-center px-3">
        <div className="max-w-7xl w-full mt-32">
          <h1
            className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
          >
            Miniature painting service
          </h1>
          <p className="max-w-screen-xl text-lg">
            In our commision painting service paint all kinds of miniatures,
            from wargaming figures like Warhammer to Dungeons & Dragons, board
            games, and display pieces.
          </p>
          <h4
            className="text-lg bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-xl font-semibold"
          >
            Take a look at our painting tiers and pricing, we the results and
            value speak for themselves!
          </h4>
          <PaintingTiers />
        </div>
      </div>
      <div className="w-full bg-gradient-to-b from-slate-900 to-black flex flex-col items-center">
        <div className="max-w-[85%] md:max-w-screen-xl w-full mt-20 flex flex-col items-center ">
          <PaintingProcess />
          <PricingTable />
          <p className="text-xs md:text-sm mt-2 mb-2">
            Estimated miniature painting price ranges by category and painting
            tier. Exact quote depends on model complexity and requests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3  max-w-5xl">
            <p className="text-xs md:text-sm flex items-center justify-center p-2 bg-slate-800/30 rounded-lg border border-slate-700">
              <span>
                <span className="font-semibold">Non-EU:</span> Customer
                responsible for potential additional import fees and customs.
              </span>
            </p>
            <p className="text-xs md:text-sm flex items-start gap-2 bg-slate-800/30 p-2 rounded-lg border border-slate-700">
              <span>
                <span className="font-semibold">EU:</span> VAT free! No
                additional fees in Germany, Austria, Denmark, France,
                Netherlands, Belgium, etc.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
