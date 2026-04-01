"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MotionCardProps = {
  as?: "article" | "div" | "section";
  delay?: number;
  className?: string;
  children: ReactNode;
};

const animationProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  whileHover: { x: -3, y: -3 },
};

export function MotionCard({ as = "article", delay = 0, className, children }: MotionCardProps) {
  const sharedProps = {
    ...animationProps,
    transition: { duration: 0.4, delay },
    className: cn("border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000]", className),
  };

  if (as === "div") {
    return <motion.div {...sharedProps}>{children}</motion.div>;
  }

  if (as === "section") {
    return <motion.section {...sharedProps}>{children}</motion.section>;
  }

  return <motion.article {...sharedProps}>{children}</motion.article>;
}
