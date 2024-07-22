"use client";
import Image from "next/image";
import React from "react";
import psImg from "@/app/media/PS logo 350w.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsInstagram } from "react-icons/bs";

export default function Intro() {
  return (
    <section id="home" className="mb-28 sm:mb-0 scroll-mt-96">
      <div className="w-full flex justify-center items-center">
        <div className="relative flex items-center flex-col">
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              type: "tween",
            }}
          >
            <Image
              priority={true}
              quality={95}
              className="w-24 h-24 rounded-full object-cover border-[0.2rem] border-white shadow-lg"
              src={psImg}
              alt="pslogo"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 mt-4 px-4 text-2xl font-medium leading-[1.5] text-center"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.4,
              type: "tween",
            }}
            className="flex flex-col items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row"
          >
            <Link
              className="flex items-center bg-gray-900 text-white px-7 py-3 
              rounded-full outline-none focus:scale-105 hover:bg-black hover:scale-110 
              active:scale-105 transition-all duration-200 ease-in-out
              group"
              href="#contact"
            >
              Contact me here{" "}
              <BsArrowRight className="ml-1 opacity-80 group-hover:translate-x-1 transition-all duration-700" />
            </Link>
            <a
              className="flex items-center bg-white text-black px-7 py-3 rounded-full cursor-pointer
              focus:scale-10 hover:scale-110
              active:scale-105 transition-all duration-200 ease-in-out
            "
            >
              Download pricing
            </a>
            <a
              href="https://www.instagram.com/playsupport/"
              className="flex items-center bg-white text-black p-3 rounded-full cursor-pointer
                focus:scale-1 hover:scale-110 
                active:scale-105 transition-all duration-200 ease-in-out
              "
            >
              <BsInstagram />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
