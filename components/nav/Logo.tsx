import React from "react";
import Image from "next/image";
import { useLanguage } from "../providers/language-provider";
import { cn } from "@/lib/utils";

const Logo = ({ textClassName }: { textClassName?: string }) => {
  const { language } = useLanguage();

  return (
    <div className="flex items-center gap-2 cursor-pointer md:cursor-default">
      <Image src="/pta-logo-nobg.png" alt="logo" width={42} height={24} />
      <div className={cn("text-sm font-black text-[14px] uppercase tracking-wide", textClassName ?? "text-white")}>
        {language == "en" ? "YGGG Llantrisant PTA" : "YGGG Llantrisant CRhA"}
      </div>
    </div>
  );
};

export default Logo;
