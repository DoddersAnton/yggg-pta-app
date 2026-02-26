"use client";

import { motion } from "framer-motion";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type MotionCardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
  delay?: number;
};

const animationProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  whileHover: { y: -6 },
};

export function MotionCard({ as = "article", delay = 0, className, children, ...props }: MotionCardProps) {
  const sharedProps = {
    ...animationProps,
    transition: { duration: 0.45, delay },
    className: cn("rounded-xl border bg-white p-6 shadow-sm", className),
    ...props,
  };

  if (as === "div") {
    return <motion.div {...sharedProps}>{children}</motion.div>;
  }

  if (as === "section") {
    return <motion.section {...sharedProps}>{children}</motion.section>;
  }

  return <motion.article {...sharedProps}>{children}</motion.article>;
}
