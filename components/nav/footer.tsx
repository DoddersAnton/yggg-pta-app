"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";

import { useLanguage } from "../providers/language-provider";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="border-t bg-white/90 px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">YGGG PTA</p>
          <p>{language === "cy" ? "Rhif elusen 1136117" : "Charity number 1136117"}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </Link>
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary"
          >
            <Facebook className="h-4 w-4" /> Facebook
          </Link>
          <Link href="mailto:pta@yggg.school" className="inline-flex items-center gap-2 hover:text-primary">
            <Mail className="h-4 w-4" /> {language === "cy" ? "E-bost" : "Email"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
