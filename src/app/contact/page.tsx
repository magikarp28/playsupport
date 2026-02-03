import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  metadataBase: new URL("https://playsupport.art"),
  title: "Contact – PlaySupport miniature painting & 3D print presupporting",
  description:
    "Contact PlaySupport for miniature painting, 3D print presupporting, commissions, pricing, or any questions. Reach us via email or the contact form.",
  applicationName: "PlaySupport",
  keywords: [
    "contact",
    "miniature painting contact",
    "commission inquiry",
    "miniature painting quote",
  ],
  alternates: {
    canonical: "https://playsupport.art/contact",
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
    url: "https://playsupport.art/contact",
    siteName: "PlaySupport.art",
    title: "Contact – PlaySupport",
    description:
      "Get in touch with PlaySupport for miniature painting, 3D print presupporting, commissions, and more.",
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
    h-fit flex flex-col justify-center items-center text-white bg-gradient-to-b from-black via-slate-900 to-black z-10 min-h-[calc(100vh-120px)]"
    >
      <div className="w-full max-w-screen-md mt-28 flex flex-col justify-center items-center gap-2 px-3">
        <h1
          className="text-4xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
        >
          Contact us
        </h1>
        <p className="max-w-screen-xl">
          You can also ask for a commision, pricing info or any other question
          you have in mind at
        </p>
        <p>
          <a href="mailto:playsuppminis@gmail.com" className="underline">
            playsuppminis@gmail.com
          </a>
        </p>
        <ContactForm />
      </div>
    </section>
  );
}

export default page;
