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

const supportedLocales = ["en", "de"] as const;

function Header() {
  const pathname = usePathname();
  const params = useParams();
  const localeParam = (params.locale as string) || "en";
  const locale = supportedLocales.includes(
    localeParam as (typeof supportedLocales)[number],
  )
    ? localeParam
    : "en";
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
      return (
        pathname === `/${locale}` ||
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

  const getPathWithoutLocale = () => {
    if (!pathname) return "/";

    const localePattern = new RegExp(
      `^/(${supportedLocales.join("|")})(?=/|$)`,
    );
    const strippedPath = pathname.replace(localePattern, "");
    return strippedPath === "" ? "/" : strippedPath;
  };

  const getLocaleHref = (targetLocale: string) => {
    const currentPath = getPathWithoutLocale();

    if (targetLocale === "en") {
      return currentPath;
    }

    return currentPath === "/"
      ? `/${targetLocale}`
      : `/${targetLocale}${currentPath}`;
  };

  const getLabel = (path: string) => {
    if (path === "/") return t("home");
    if (path === "/painting") return t("painting");
    if (path === "/gallery") return t("gallery");
    if (path === "/supporting") return t("supporting");
    if (path === "/contact") return t("contact");
    return path;
  };

  return (
    <header className="z-30 absolute">
      <nav
        className="overflow-visible fixed md:top-3 left-1/2 w-full min-w-fit sm:w-[42rem] sm:bg-transparent bg-opacity-80 -translate-x-1/2 sm:rounded-full
                  flex items-center justify-between sm:gap-2 bg-slate-800 min-h-[5rem] sm:backdrop-blur-none "
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
          <ul className="relative flex flex-wrap items-center justify-center sm:justify-between text-center gap-1.5 sm:gap-3 sm:bg-slate-800 sm:bg-opacity-80 py-4 px-4 sm:px-6 rounded-full">
            {links.map((link) => (
              <li key={link.link} className="relative">
                <Link
                  className={clsx(
                    "text-sm sm:text-base text-gray-50 px-3 py-2 relative z-20 transition-colors duration-300 block",
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
            <li>
              <div className="group relative" aria-label="Language switcher">
                <button
                  type="button"
                  className="gap-1 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gray-50"
                  aria-haspopup="listbox"
                >
                  {locale.toUpperCase()}
                  <span className="text-[0.5rem] leading-none">▼</span>
                </button>

                <div className="flex flex-col gap-1 invisible absolute left-1/2 top-full mt-2 min-w-[4.5rem] -translate-x-1/2 translate-y-1 rounded-xl border border-white/10 bg-slate-900/95 p-1 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {supportedLocales.map((targetLocale) => (
                    <Link
                      key={targetLocale}
                      href={getLocaleHref(targetLocale)}
                      className={clsx(
                        "block rounded-lg px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gray-50 transition-colors duration-200",
                        locale === targetLocale
                          ? "bg-rose-600 text-white"
                          : "hover:bg-white/10 hover:text-rose-300",
                      )}
                      aria-current={
                        locale === targetLocale ? "page" : undefined
                      }
                    >
                      {targetLocale.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
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
