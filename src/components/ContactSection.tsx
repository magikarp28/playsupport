"use client";
import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useActiveSection } from "./context/active-section-context";

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    console.log("isInView", isInView);
    if (isInView) {
      setActiveSection("contact");
    }
  }, [isInView]);
  return (
    <section
      ref={ref}
      id="contact"
      className="w-full bg-black 
    h-fit flex flex-col justify-center gap-2 items-center text-white px-3"
    ></section>
  );
}

export default ContactSection;
