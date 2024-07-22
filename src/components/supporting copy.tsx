import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { HiOutlineDownload } from "react-icons/hi";
import Link from "next/link";

function Supporting() {
  return (
    <div className="bg-gradient-to-b from-black to-slate-950 h-fit flex justify-center items-center">
      <div
        className="w-full 
    flex flex-row flex-wrap justify-between gap-20 p-5 overflow-hidden items-center
    max-w-screen-2xl
    "
      >
        <div className="max-w-[95%] w-[40rem] h-auto">
          <BackgroundGradient className="w-full h-full">
            <video
              className="object-cover rounded-3xl w-full"
              controls={false}
              muted
              autoPlay
              loop
              src="/videos/supporting.mp4"
            />
          </BackgroundGradient>
        </div>

        <div className="text-center flex justify-center flex-col items-center">
          <h2
            className="text-2xl bg-clip-text text-transparent 
        bg-gradient-to-b from-white to-slate-400 sm:text-3xl pb-2 font-semibold"
          >
            Supporting miniatures for resin 3d printing
          </h2>
          <p className="text-white text-lg max-w-xl mt-6">
            I'm supporting your 3d models for resin 3d printing. I can support
            all kinds of models and miniatures. The price will depend on the
            size and complexity but is generally 4-7$ per 28/32mm normal 28mm
            size miniature. Please contact me and send me the models you need me
            to support so I can give you the best offer I can. All the supports
            are added manually in lychee pro. If requested I will hollow your
            model.
          </p>
          <p className="text-white text-lg max-w-xl mt-6">
            Here is free supported miniature sample bro.
          </p>

          <Link className="p-[3px] relative mt-4 " href="#download">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full" />
            <div className=" bg-slate-950  relative group transition duration-200 text-white hover:bg-transparent px-3 py-2 rounded-full flex justify-center items-center">
              Free sample
              <HiOutlineDownload className="text-3xl ml-2" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Supporting;
