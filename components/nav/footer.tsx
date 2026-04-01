"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";

import { useLanguage } from "../providers/language-provider";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-purple-900 border-t-4 border-black px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        {/* Branding */}
        <div>
          <p className="font-black text-white text-xl uppercase tracking-wide mb-1">YGGG PTA</p>
          <p className="text-purple-300 text-sm font-semibold">
            {language === "cy" ? "Rhif elusen 1136117" : "Charity number 1136117"}
          </p>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black font-black text-xs uppercase tracking-wide px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </Link>
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black font-black text-xs uppercase tracking-wide px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <Facebook className="h-4 w-4" /> Facebook
          </Link>
          <Link
            href="mailto:pta@yggg.school"
            className="inline-flex items-center gap-2 bg-yellow-300 text-black font-black text-xs uppercase tracking-wide px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <Mail className="h-4 w-4" /> {language === "cy" ? "E-bost" : "Email"}
          </Link>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="mx-auto max-w-6xl border-t-2 border-purple-700 mt-8 pt-4">
        <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest">
          {language === "cy"
            ? "© 2025 CRhA Ysgol Gymraeg Gelligyfelach. Cedwir pob hawl."
            : "© 2025 Ysgol Gymraeg Gelligyfelach PTA. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
