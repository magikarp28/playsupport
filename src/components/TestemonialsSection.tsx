"use client";
import React, { useEffect, useRef } from "react";
import { useActiveSection } from "./context/active-section-context";
import { useInView } from "framer-motion";
import useIsMobile from "@/lib/useIsMobile";
import { AnimatedTestimonials } from "./ui/AnimatedTestimonials";
import { testemonialsData } from "@/app/lib/data";

function TestemonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref as React.RefObject<Element>, {
    amount: isMobile ? 0.1 : 0.8,
  });
  const { setActiveSection, disableHeader } = useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("Testimonials");
    }
  }, [isInView]);

  return (
    <section
      id="Testimonials"
      className="w-full bg-gradient-to-b text-center from-black to-slate-950  
     flex flex-col justify-center gap-2 items-center text-white px-3 z-10"
      ref={ref}
    >
      <h4
        className="text-lg bg-clip-text text-transparent mt-6
        bg-gradient-to-b from-white to-slate-400 sm:text-2xl font-semibold"
      >
        Testimonials
      </h4>
      <AnimatedTestimonials testimonials={testemonialsData} />
    </section>
  );
}

export default TestemonialsSection;
