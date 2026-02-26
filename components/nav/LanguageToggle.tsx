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
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-2.5 py-1.5 text-xs font-semibold leading-none shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
      aria-label={current.srText}
      title={current.srText}
      type="button"
    >
      <Image
        width={18}
        height={18}
        src={current.flag}
        className="h-[18px] w-[18px] rounded-full object-cover"
        alt="Current language flag"
      />
      <span>{current.short}</span>
      <span className="text-[10px] text-muted-foreground">→ {current.nextLabel}</span>
    </button>
  );
};

export default LanguageToggle;
