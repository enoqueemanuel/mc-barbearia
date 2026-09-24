"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, premiumTransition, viewportOnce } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ ...premiumTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
