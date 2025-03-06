import React from "react";
import Image from "next/image";
import { useLanguage } from "../providers/language-provider";

const Logo = () => {
   const { language } = useLanguage();

  return (
    <div className="flex items-center gap-2 cursor-pointer md:cursor-default">
      <Image src="/pta-logo-nobg.png" alt="logo" width={42} height={24} />
      <div className="text-sm font-bold text-[14px]">{language == "en" ? "YGGG Llantrisant PTA": "YGGG Llantrisant CRhA"}</div>
    </div>
  );
};

export default Logo;
