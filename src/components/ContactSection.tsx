"use client";
import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useActiveSection } from "./context/active-section-context";
import ContactForm from "./ContactForm";
import useIsMobile from "@/lib/useIsMobile";

function ContactSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: isMobile ? 0.1 : 0.7 });
  const { setActiveSection, disableHeader } = useActiveSection();

  useEffect(() => {
    if (isInView && !disableHeader) {
      setActiveSection("contact");
    }
  }, [isInView]);
  return (
    <section
      ref={ref}
      id="contact"
      className="w-full bg-black 
    h-fit flex flex-col justify-center gap-2 items-center text-white px-3 text-center"
    >
      <h2
        className="text-3xl bg-clip-text text-transparent mt-4 mb-1
        bg-gradient-to-b from-white to-slate-400 sm:text-4xl pb-2 font-semibold"
      >
        Contact
      </h2>
      <p className="max-w-screen-xl">
        Ask for a commision or any other question you have in mind at
      </p>
      <p>
        <a href="mailto:playsuppminis@gmail.com" className="underline">
          playsuppminis@gmail.com
        </a>
      </p>
      <ContactForm />
    </section>
  );
}

export default ContactSection;
