"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { easePremium } from "@/lib/motion";

export function StatNumber({ value, isPlaceholder }: { value: string; isPlaceholder?: boolean }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  const match = value.match(/[\d.,]+/);
  const numeric = match ? parseFloat(match[0].replace(/\./g, "").replace(",", ".")) : null;
  const hasDecimal = match ? match[0].includes(",") : false;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : "";

  useEffect(() => {
    if (!inView || numeric === null || !numberRef.current || isPlaceholder) return;
    const node = numberRef.current;

    const format = (latest: number) =>
      hasDecimal ? latest.toFixed(1).replace(".", ",") : Math.round(latest).toLocaleString("pt-BR");

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      node.textContent = format(numeric);
      return;
    }

    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: easePremium,
      onUpdate(latest) {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, numeric, hasDecimal, isPlaceholder]);

  if (isPlaceholder || numeric === null) {
    return <span ref={containerRef}>{value}</span>;
  }

  return (
    <span ref={containerRef} className="tabular-nums">
      {prefix}
      <span ref={numberRef}>0</span>
      {suffix}
    </span>
  );
}
