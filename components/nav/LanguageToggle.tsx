"use client";

import Image from "next/image";

import { useLanguage } from "../providers/language-provider";

const languageMap = {
  en: {
    short: "EN",
    nextLabel: "CY",
    srText: "Switch language to Welsh",
    flag: "/english-flag.jpg",
  },
  cy: {
    short: "CY",
    nextLabel: "EN",
    srText: "Newid iaith i Saesneg",
    flag: "/welsh-flag.jpg",
  },
} as const;

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const current = languageMap[language];

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 bg-white text-black font-black text-xs uppercase tracking-wide px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
      aria-label={current.srText}
      title={current.srText}
      type="button"
    >
      <Image
        width={16}
        height={16}
        src={current.flag}
        className="h-4 w-4 object-cover border border-black"
        alt="Current language flag"
      />
      <span>{current.short}</span>
      <span className="text-[10px] text-gray-500">→ {current.nextLabel}</span>
    </button>
  );
};

export default LanguageToggle;
