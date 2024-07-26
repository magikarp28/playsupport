"use client";
import React from "react";
import { useInView } from "framer-motion";
import { useActiveSection } from "./context/active-section-context";

function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full bg-black 
    h-fit flex flex-col justify-center gap-2 items-center text-white px-3"
    ></section>
  );
}

export default ContactSection;
