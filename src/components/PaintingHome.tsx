"use client";
import Image from "next/image";
import PlaysuppButton from "./PlaysuppButton";
import image from "@/../public/images/paintShowcase/ogroid myrmidon.webp";
import { FaPaintBrush } from "react-icons/fa";
import { GiDivergence, GiSwordman } from "react-icons/gi";
import { MdWorkspacePremium } from "react-icons/md";
import printerIcon from "@/../public/icons/3dPrinter.svg";
import { useLocale, useTranslations } from "next-intl";

function PaintingHome() {
  const t = useTranslations("PaintingHome");
  const locale = useLocale();
  const paintingHref = locale === "de" ? "/de/painting" : "/painting";

  return (
    <section
      className="w-full bg-gradient-to-b from-black to-slate-900 flex justify-center items-center"
      aria-labelledby="miniature-painting-service-heading"
    >
      <div className="w-full max-w-screen-xl flex flex-col-reverse md:flex-row py-6 px-4 md:px-0">
        <div className="md:basis-1/2 flex flex-col justify-center gap-4 mb-6 md:mb-0">
          <h2
            id="miniature-painting-service-heading"
            className="text-3xl bg-clip-text text-transparent
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
          >
            {t("title")}
          </h2>

          {/* First row - full width alternating */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center group justify-between gap-4 bg-slate-800/30 p-4 rounded-lg border-l-4 border-fuchsia-500 hover:bg-slate-800/50 transition-colors">
              <p className="text-md flex-1">
                {t("card1.prefix")}
                <span className="text-fuchsia-300 font-medium">
                  {t("card1.highlight")}
                </span>{" "}
                {t("card1.middle")}
                <span className="text-fuchsia-300 font-medium">
                  {t("card1.middle2")}
                </span>
                ,{t("card1.suffix")}
              </p>
              <FaPaintBrush className="text-fuchsia-500 text-3xl flex-shrink-0 group-hover:scale-110" />
            </div>

            <div className="flex items-center group justify-between gap-4 bg-slate-800/30 p-4 rounded-lg border-r-4 border-rose-500 hover:bg-slate-800/50 transition-colors">
              <p className="text-md flex-1">
                {t("card2.prefix")}
                <span className="text-rose-300 font-medium">
                  {t("card2.highlight")}
                </span>{" "}
                {t("card2.suffix")}
              </p>
              <Image
                src={printerIcon}
                alt="3D Printer Icon"
                className="w-8 h-8 object-contain group-hover:scale-110"
              />
            </div>

            <div className="flex items-center group justify-between gap-4 bg-slate-800/30 p-4 rounded-lg border-l-4 border-fuchsia-500 hover:bg-slate-800/50 transition-colors">
              <p className="text-md flex-1">
                {t("card3.prefix")}
                <span className="text-fuchsia-300 font-medium">
                  {" "}
                  Warhammer
                </span>{" "}
                {t("card3.middle")}
                <span className="text-fuchsia-300 font-medium">
                  {" "}
                  Dungeons & Dragonss
                </span>
                , {t("card3.suffix")}
              </p>
              <GiSwordman className="text-fuchsia-500 text-3xl flex-shrink-0 group-hover:scale-110" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col justify-between gap-3 bg-slate-800/30 p-4 rounded-lg border-r-4 border-rose-500 h-full hover:bg-slate-800/50 transition-colors group">
              <p className="text-sm flex-1">
                <span className="text-rose-300 font-medium block mb-1">
                  {t("card4.title")}
                </span>
                {t("card4.body")}
              </p>
              <div className="flex items-center justify-between mt-2">
                <MdWorkspacePremium className="text-rose-500 text-3xl group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 bg-slate-800/30 p-4 rounded-lg border-l-4 border-fuchsia-500 h-full hover:bg-slate-800/50 transition-colors group">
              <p className="text-sm flex-1">
                <span className="text-fuchsia-300 font-medium block mb-1">
                  {t("card5.title")}
                </span>
                {t("card5.body")}
              </p>
              <div className="flex items-center justify-end mt-2">
                <GiDivergence className="text-fuchsia-500 text-3xl group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-4">
            <PlaysuppButton text={t("cta")} href={paintingHref} />
          </div>
        </div>
        <div className="md:basis-1/2 flex justify-center md:justify-end items-center mb-6 md:mb-0">
          <Image
            src={image}
            alt="Ogroid myrmidon painted miniature"
            className="w-full max-w-[85%] h-auto"
            sizes="(min-width: 1280px) 500px,(min-width: 768px) 350px,90vw"
          />
        </div>
      </div>
    </section>
  );
}

export default PaintingHome;
