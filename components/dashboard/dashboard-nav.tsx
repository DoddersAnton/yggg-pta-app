"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
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
    <nav className="p-4 overflow-auto mb-4">
      <ul className="flex gap-6 text-xs font-semibold justify-center">
        <AnimatePresence>
          {allLinks.map((link) => (
            <motion.li whileTap={{ scale: 0.95 }} key={link.path}>
              <Link
                className={cn(
                  "flex gap-1 flex-col items-center relative",
                  pathname === link.path && "text-primary"
                )}
                href={link.path}
              >
                {link.icon}
                {language == "cy" ? link.labelWal : link.labelEng}
                {pathname === link.path ? (
                  <motion.div
                    className="h-[2px] w-full rounded-full absolute bg-primary z-0 left-0 -bottom-1"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 35 }}
                  />
                ) : null}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </nav>
  );
}
