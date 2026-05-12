"use client";
import { motion } from "motion/react";
import { links } from "@/app/lib/data";
import Link from "next/link";
import clsx from "clsx";
import LogoImg from "@/../public/PlaySupportLogoFinal.svg";
import Image from "next/image";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

function Header() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const t = useTranslations("Navigation");

  // Helper function to add locale prefix to paths
  const getLocalizedPath = (path: string) => {
    if (locale === "en") {
      return path;
    }
    return path === "/" ? `/${locale}` : `/${locale}${path}`;
  };

  // Helper function to check if a link is active
  const isActive = (linkPath: string) => {
    const localizedPath = getLocalizedPath(linkPath);
    if (localizedPath === "/" || linkPath === "/") {
      // For root, only match exact root
      return (
        pathname === "/" ||
        pathname === "/en" ||
        (pathname.startsWith("/en/") === false && pathname === "")
      );
    }
    return (
      pathname === localizedPath || pathname.startsWith(localizedPath + "/")
    );
  };

  // Find the active link name for the motion animation
  const activeLink = links.find((link) => isActive(link.link));

  const getLabel = (path: string) => {
    if (path === "/") return t("home");
    if (path === "/painting") return t("painting");
    if (path === "/gallery") return t("gallery");
    if (path === "/supporting") return t("supporting");
    if (path === "/contact") return t("contact");
    return path;
  };

  return (
    <header className="z-[999] absolute ">
      <nav
        className="fixed left-1/2 w-full sm:w-[45rem] sm:bg-transparent bg-opacity-80 -translate-x-1/2 sm:rounded-full
                  flex items-center justify-between sm:gap-2 bg-slate-800 overflow-hidden min-h-[5rem] sm:backdrop-blur-none "
      >
        <Link
          className="sm:w-16 sm:h-16 bg-gradient-to-r p-1 from-rose-600 to-fuchsia-600  
        sm:flex justify-center items-center relative bg-black rounded-full hidden"
          href={getLocalizedPath("/")}
        >
          <Image
            className="w-full h-full bg-black rounded-full"
            src={LogoImg}
            alt="Logo Image"
          />
        </Link>
        <div className="relative flex-1 flex justify-center">
          <ul className="relative flex flex-wrap items-center justify-center sm:justify-between text-center gap-3 sm:bg-slate-800 sm:bg-opacity-80 py-4 px-4 sm:px-6 rounded-full">
            {links.map((link) => (
              <li key={link.link} className="relative">
                <Link
                  className={clsx(
                    "text-gray-50 px-3 py-2 relative z-20 transition-colors duration-300 block",
                  )}
                  href={getLocalizedPath(link.link)}
                >
                  {getLabel(link.link)}
                </Link>

                {isActive(link.link) && (
                  <motion.span
                    className="absolute bg-gradient-to-r from-rose-600 to-fuchsia-600 rounded-full z-10"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    style={{
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                )}
              </li>
            ))}
            <li className="flex">
              <Link
                href="https://www.instagram.com/playsupport/"
                className="text-white hover:text-rose-500 transition-colors block p-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit PlaySupport on Instagram"
              >
                <BsInstagram className="text-lg" />
              </Link>
              <Link
                href="https://www.youtube.com/@PlaySupportMinis"
                className="text-white hover:text-rose-500 transition-colors block p-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit PlaySupport on YouTube"
              >
                <BsYoutube className="text-lg" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
