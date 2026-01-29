import Image from "next/image";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { MdOutlineSpeed } from "react-icons/md";
import image from "@/../public/images/paintShowcase/Rendered ant supported.png";
import supportIcon from "@/../public/icons/SupportedSoldier.svg";
import printerIcon from "@/../public/icons/3dPrinter.svg";
import PlaysuppButton from "./PlaysuppButton";

function SupportingHome() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-900 to-black flex justify-center items-center">
      <div className="w-full max-w-screen-xl flex flex-col-reverse md:flex-row-reverse py-6 px-4 md:px-0">
        <div className="md:basis-1/2 flex flex-col justify-center gap-2 mb-6 md:mb-0">
          <h2
            className="text-2xl bg-clip-text text-transparent mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-3xl pb-2 font-semibold"
          >
            Resin 3D print pre supporting service
          </h2>
          <ul className="w-full max-w-2xl space-y-3 mb-4">
            <li className="flex items-center gap-3 text-left">
              <Image
                src={supportIcon}
                alt="Support Icon"
                className="w-12 h-12"
              />
              <span className="text-lg text-slate-200">
                Reliable supports that won't fail you
              </span>
            </li>
            <li className="flex items-center  gap-3 text-left">
              <AiOutlineSafetyCertificate className="text-5xl text-rose-500" />
              <span className="text-lg text-slate-200">
                Easy to remove with minimal support damage
              </span>
            </li>
            <li className="flex items-center  gap-3 text-left">
              <HiOutlineQuestionMarkCircle className="text-6xl text-rose-500" />
              <span className="text-lg text-slate-200">
                Free troubleshooting and assistance if you need dialing in
                settings or have printer issues
              </span>
            </li>
            <li className="flex items-center  gap-3 text-left">
              <Image
                src={printerIcon}
                alt="Support Icon"
                className="w-11 h-11"
              />
              <span className="text-lg text-slate-200">
                Optional test printing
              </span>
            </li>
            <li className="flex items-center  gap-3 text-left">
              <MdOutlineSpeed className="text-5xl text-rose-500" />
              <span className="text-lg text-slate-200">
                Fast turnaround and fair pricing
              </span>
            </li>
          </ul>
          <div className="w-full flex items-center justify-center">
            <PlaysuppButton
              href="https://www.datocms-assets.com/160411/1769697786-ant-diplomat-v3.zip"
              text="Download Miniature Free"
            />
          </div>
        </div>

        <div className="md:basis-1/2 flex justify-center md:justify-start items-center mb-6 md:mb-0">
          <Image
            src={image}
            alt="miniature 3d print supporting showcase"
            className="w-full max-w-[65%] h-auto"
            sizes="(min-width: 1280px) 500px,(min-width: 768px) 350px,90vw"
          />
        </div>
      </div>
    </section>
  );
}

export default SupportingHome;
