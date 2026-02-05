import React from "react";
import LogoImg from "@/../public/PlaySupportLogoFinal.svg";
import Image from "next/image";

function Footer() {
  return (
    <footer className="w-full bg-black pt-6 ">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={LogoImg}
                  alt="PlaySupport Logo"
                  width={32}
                  height={32}
                  priority
                  className="rounded-lg"
                />
                <div className="absolute inset-0 rounded-lg border border-gray-700/50 pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold tracking-tight">
                  PlaySupport
                </span>
                <span className="text-gray-400 text-sm">Since 2024</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 max-w-xl">
            <div className="text-center lg:text-right">
              <p className="text-gray-300 text-sm leading-relaxed">
                Playsupport, obrt za usluge i proizvodnju vl. Filip Knezović
                <br />
                Zagreb, Gradišće 9 C
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between">
          <p className="text-gray-400 text-xs font-medium px-3 py-1">
            © 2026 PlaySupport. All rights reserved.
          </p>
          <a
            href="/privacypolicy"
            className="text-gray-400 text-xs font-medium px-3 py-1"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
