import React from "react";
import Image, { StaticImageData } from "next/image";

type TabProps = {
  tabProps: {
    title: string;
    description: string;
    imageUrl: StaticImageData;
  };
};

function SupportingTab({ tabProps }: TabProps) {
  return (
    <div className="p-[3px] relative mt-2 w-[18rem] sm:w-[24rem] lg:w-[28rem]">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-2xl" />
      <div className="p-4 flex flex-col bg-gradient-to-b from-black to-slate-800  relative group justify-center items-center w-full h-full rounded-2xl">
        <div className="flex items-center flex-col">
          <Image
            className="w-16 h-16"
            alt={tabProps.title + " image"}
            src={tabProps.imageUrl}
          />
          <h3
            className="text-xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-2xl pb-2 font-semibold"
          >
            {tabProps.title}
          </h3>
        </div>
        <p>{tabProps.description}</p>
      </div>
    </div>
  );
}

export default SupportingTab;
