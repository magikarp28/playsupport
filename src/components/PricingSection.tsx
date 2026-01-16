"use client";
import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useActiveSection } from "./context/active-section-context";
import useIsMobile from "@/lib/useIsMobile";

const BackgroundGradients = [
  "linear-gradient(to bottom, #b37952 27%, #e0af81 40%, #462611 78%)",
  "linear-gradient(to bottom, #8B9FA9 27%, #d9e5ee 40%, #404c52 78%)",
  "linear-gradient(to bottom, #e2c78c 27%, #fff4d1 40%, #533f15 78%)",
];

const BackgroundColors = ["#c9885e", "#a5bcc7", "#e2c78c"];

function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref as React.RefObject<Element>, {
    amount: isMobile ? 0.1 : 1,
  });
  const { setActiveSection, disableHeader } = useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("Pricing");
    }
  }, [isInView, disableHeader, setActiveSection]);

  const pricing = [
    {
      category: "Small infantry",
      army: "8–14€",
      hero: "12–22€",
      art: "25–60€",
    },
    { category: "Infantry", army: "10–20€", hero: "22–36€", art: "50–150€" },
    {
      category: "Large infantry",
      army: "15–35€",
      hero: "25–50€",
      art: "80–240€",
    },
    {
      category: "Small Walker/Rider/Monster",
      army: "25–60€",
      hero: "40–100€",
      art: "120–300€",
    },
    {
      category: "Walker/Monster/Vehicle",
      army: "60–140€",
      hero: "100–200€",
      art: "200–400€",
    },
    {
      category: "Large Walker/Monster/Vehicle",
      army: "100–200€",
      hero: "150–300€",
      art: "300–600€",
    },
    { category: "Huge Model", army: "180+€", hero: "250+€", art: "500+€" },
  ];

  return (
    <section
      ref={ref}
      id="Pricing"
      className="bg-gradient-to-b bg-slate-950  text-slate-100"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <h2 className="text-3xl font-semibold">Pricing</h2>
            <p className="text-sm text-slate-300 mt-1">
              Estimated miniature painting price ranges by category and paintin
              tier. Exact quote depends on model complexity and requests.
            </p>
          </div>
        </div>

        {/* Desktop table-like grid */}
        <div className="hidden md:block border rounded-lg overflow-hidden shadow-sm bg-slate-900/40">
          <div className="grid grid-cols-4 text-sm font-medium">
            <div className="px-4 py-3 border-r bg-slate-800/30 text-slate-100">
              Category
            </div>
            <div
              className="px-4 py-3 border-r text-center text-white border-t-4"
              style={{
                borderTopColor: BackgroundColors[0],
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              Army Tier
            </div>
            <div
              className="px-4 py-3 border-r text-center text-white border-t-4"
              style={{
                borderTopColor: BackgroundColors[1],
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              Hero Tier
            </div>
            <div
              className="px-4 py-3 text-center text-white border-t-4"
              style={{
                borderTopColor: BackgroundColors[2],
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              Art Tier
            </div>
          </div>

          <div className="divide-y">
            {pricing.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-4 text-sm hover:opacity-95 transition-opacity bg-transparent"
              >
                <div className="px-4 py-3 border-r bg-slate-800/10">
                  {row.category}
                </div>
                <div
                  className="px-4 py-3 border-r text-center text-white border-l-4"
                  style={{
                    borderLeftColor: BackgroundColors[0],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  {row.army}
                </div>
                <div
                  className="px-4 py-3 border-r text-center text-white border-l-4"
                  style={{
                    borderLeftColor: BackgroundColors[1],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  {row.hero}
                </div>
                <div
                  className="px-4 py-3 text-center text-white border-l-4"
                  style={{
                    borderLeftColor: BackgroundColors[2],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  {row.art}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden space-y-4">
          {pricing.map((row, idx) => (
            <div
              key={idx}
              className="rounded-lg p-0 overflow-hidden border bg-slate-900/30"
            >
              <div className="px-4 py-3 bg-slate-800/10 text-slate-100 font-medium">
                {row.category}
              </div>
              <div className="grid grid-cols-3 gap-0 text-xs">
                <div
                  className="p-3 text-center text-white border-t-4"
                  style={{
                    borderTopColor: BackgroundColors[0],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="font-semibold">Army</div>
                  <div className="mt-1">{row.army}</div>
                </div>
                <div
                  className="p-3 text-center text-white border-t-4"
                  style={{
                    borderTopColor: BackgroundColors[1],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="font-semibold">Hero</div>
                  <div className="mt-1">{row.hero}</div>
                </div>
                <div
                  className="p-3 text-center text-white border-t-4"
                  style={{
                    borderTopColor: BackgroundColors[2],
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="font-semibold">Art</div>
                  <div className="mt-1">{row.art}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
