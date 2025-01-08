"use client";
import React from "react";
import SupportingTab from "./supporting-tab";
import { SupportTabsData } from "@/app/lib/data";

function Supportperks() {
  return (
    <div className="mb-10 w-full flex flex-wrap justify-center items-center max-w-screen-2xl mt-10 ">
      <div className="w-full flex gap-5 justify-center flex-wrap items-stretch">
        <SupportingTab tabProps={SupportTabsData[0]} />
        <SupportingTab tabProps={SupportTabsData[1]} />
        <SupportingTab tabProps={SupportTabsData[2]} />
      </div>
    </div>
  );
}

export default Supportperks;
