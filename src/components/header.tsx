"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { links } from "@/app/lib/data";
import Link from "next/link";
import clsx from "clsx";
import LogoImg from "@/../public/PlaySupportLogoFinal.svg";
import Image from "next/image";
import { useActiveSection } from "@/components/context/active-section-context";
import { BsInstagram } from "react-icons/bs";

function Header() {
  const { activeSection, setActiveSection, setDisableHeader, disableHeader } =
    useActiveSection();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (disableHeader) {
      timeoutId = setTimeout(() => {
        setDisableHeader(false);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [disableHeader]);
  return (
    <header className="z-[999] absolute ">
      <nav
        className="fixed  left-1/2 w-full sm:w-[40rem] sm:bg-transparent bg-opacity-80 -translate-x-1/2 sm:rounded-full
                  flex items-center justify-between sm:gap-2 bg-slate-800 overflow-hidden min-h-[5rem] sm:backdrop-blur-none "
      >
        <Link
          className="sm:w-16 sm:h-16 bg-gradient-to-r p-1 from-rose-600 to-fuchsia-600  
        sm:flex justify-center items-center relative bg-black rounded-full  hidden"
          onClick={() => {
            setActiveSection("home");
            setDisableHeader(true);
          }}
          href={"#home"}
        >
          <Image
            className="w-full h-full bg-black rounded-full"
            src={LogoImg}
            alt="Logo Image"
          />
        </Link>
        <ul className="relative flex flex-wrap items-center justify-center sm:justify-between text-center gap-3 w-[36rem] sm:bg-slate-800  sm:bg-opacity-80 py-4 px-4 sm:px-6 rounded-full">
          {links.map((link) => (
            <Link
              className={clsx("text-gray-50 px-2 py-1 relative z-20 ", {
                "text-gray-950": activeSection === link.name,
              })}
              key={"link" + link.hash}
              href={link.hash}
              onClick={() => {
                setActiveSection(link.name);
                setDisableHeader(true);
              }}
            >
              {link.name}
              {link.name === activeSection && (
                <motion.span
                  className="bg-gray-100 rounded-full absolute inset-0 -z-10"
                  layoutId="activeSection"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                ></motion.span>
              )}
            </Link>
          ))}
          <Link
            href={"https://www.instagram.com/playsupport/"}
            className="text-white"
            target="_blank"
          >
            <BsInstagram className="text-lg" />
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
