"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina no topo que preenche conforme o scroll da página avança. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-accent motion-reduce:hidden"
      style={{ scaleX }}
    />
  );
}
