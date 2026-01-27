import Image from "next/image";
import LogoImg from "@/../public/PlaySupportLogoFinal.svg";
import { FaPaintBrush } from "react-icons/fa";
import { Gi3dMeeple } from "react-icons/gi";
import Link from "next/link";

function HeroText() {
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
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 pb-3">
          PlaySupport
        </h1>
        <div className="text-white text-lg md:text-xl max-w-xl mt-6 flex flex-col gap-4">
          <p>
            There is no worse fate for a hobby than it becoming a chore. Our
            lives are filled with enough obligations as it is. We are here to
            support you so that you can focus on playing.
          </p>
          <div className="flex flex-col gap-2">
            <div>
              <p className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300 inline font-bold ">
                Playsupport
              </p>{" "}
              offers you support with:
            </div>
            <ul className="list-none space-y-2 text-lg">
              <li className="ml-2 flex items-start">
                <FaPaintBrush className="inline mr-2 mt-1 text-3xl" />
                Getting your miniatures ready for the tabletop – painting,
                assembling, magnetizing
              </li>
              <li className="ml-2 flex items-start">
                <Gi3dMeeple className="inline mr-2 mt-1 text-3xl" />
                Supporting your 3D miniatures for resin 3D printing so they
                print properly every time
              </li>
            </ul>
          </div>
          <p className="max-w-screen-xl text-base">Based in Croatia, EU.</p>
        </div>
        <div className="w-full flex justify-center">
          <div className="p-[3px] relative mt-7">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full" />
            <Link
              href="#Contact"
              className="px-8 py-2 flex bg-slate-950 rounded-full relative group transition duration-200 text-white hover:bg-transparent"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroText;
