"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export default function EventsHeading() {
  const { language } = useLanguage();

  return (
    <section className="mb-10 space-y-4">
      <span className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 shadow-[3px_3px_0px_0px_#000]">
        {language === "cy" ? "Digwyddiadau" : "Events"}
      </span>
      <h1 className="text-5xl font-black text-black leading-tight">
        {language === "cy" ? "Dyma beth sy'n dod i fyny" : "Here's what's coming up"}
      </h1>
      <p className="text-base md:text-lg text-gray-800 max-w-3xl border-l-4 border-purple-500 pl-4">
        {language === "cy"
          ? "Porwch ein digwyddiadau CRhA i ddod, o weithgareddau teuluol i nosweithiau codi arian, a chadwch eich lle."
          : "Browse our upcoming PTA events, from family activities to fundraising nights, and reserve your place."}
      </p>
      <Link
        href="/dashboard"
        className="inline-block bg-purple-700 text-white font-black text-xs uppercase tracking-wide px-5 py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
      >
        {language === "cy" ? "Fy Nigwyddiadau" : "My Events"}
      </Link>
    </section>
  );
}
