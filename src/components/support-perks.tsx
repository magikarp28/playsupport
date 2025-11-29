"use client";
import React from "react";
import SupportingTab from "./supporting-tab";
import { SupportTabsData } from "@/app/lib/data";

function Supportperks() {
  return (
    <div className="mb-10 w-full flex flex-wrap justify-center items-center max-w-screen-2xl mt-10 ">
      <div className="w-full flex gap-5 justify-center flex-wrap items-stretch">
        {SupportTabsData.map((tab, index) => (
          <SupportingTab
            key={index}
            title={tab.title}
            description={tab.description}
            imageUrl={tab.imageUrl}
            video={tab.video}
          />
        ))}
      </div>
    </div>
  );
}

export default Supportperks;
