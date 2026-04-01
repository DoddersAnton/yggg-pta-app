"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "../providers/language-provider";

export default function DashboardNav({
  allLinks,
}: {
  allLinks: {
    labelEng: string;
    labelWal: string;
    path: string;
    icon: JSX.Element;
  }[];
}) {
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <nav className="bg-white border-b-2 border-black shadow-[0_4px_0px_0px_#000]">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex overflow-x-auto">
          {allLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path} className="shrink-0">
                <Link
                  href={link.path}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3.5 text-xs font-black uppercase tracking-wide border-r-2 border-black transition-colors",
                    isActive
                      ? "bg-purple-700 text-white"
                      : "text-gray-700 hover:bg-purple-50"
                  )}
                >
                  {link.icon}
                  {language === "cy" ? link.labelWal : link.labelEng}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
