"use client";

import Image from "next/image";
import LogoImg from "@/../public/PlaySupportLogoFinal.svg";
import { FaPaintBrush } from "react-icons/fa";
import { Gi3dMeeple } from "react-icons/gi";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

function HeroText() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const contactHref = locale === "de" ? "/de/contact" : "/contact";

  return (
    <div className="md:basis-1/3 flex flex-col justify-center items-center">
      <div className="mb-4 w-44 h-44 flex justify-center items-center relative bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full overflow-hidden sm:hidden p-[4px] mt-10">
        <Image
          className="rounded-full bg-black w-full h-full"
          src={LogoImg}
          alt="Logo Image"
        />
      </div>
      <div className="sm:text-left ">
        <h1
          id="home-heading"
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 pb-3"
        >
          PlaySupport
        </h1>
        <div className="text-white text-lg md:text-xl max-w-xl mt-6 flex flex-col gap-4">
          <p>{t("intro")}</p>
          <div className="flex flex-col gap-2">
            <div>
              <p className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300 inline font-bold ">
                {t("brand")}
              </p>{" "}
              {t("supportLead")}
            </div>
            <ul className="list-none space-y-2 text-lg">
              <li className="ml-2 flex items-start">
                <FaPaintBrush className="inline mr-2 mt-1 text-3xl" />
                {t("item1")}
              </li>
              <li className="ml-2 flex items-start">
                <Gi3dMeeple className="inline mr-2 mt-1 text-3xl" />
                {t("item2")}
              </li>
            </ul>
          </div>
          <p className="max-w-screen-xl text-base">{t("location")}</p>
        </div>
        <div className="w-full flex justify-center">
          <div className="p-[3px] relative mt-7">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full" />
            <Link
              href={contactHref}
              className="px-8 py-2 flex bg-slate-950 rounded-full relative group transition duration-200 text-white hover:bg-transparent"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroText;
