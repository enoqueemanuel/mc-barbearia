"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/icons/BrandGlyphs";
import { bookingHref } from "@/lib/booking";
import { siteConfig } from "@/data/site";
import { useScrollHeader } from "@/hooks/useScrollHeader";

export function MobileStickyCta() {
  const pastHero = useScrollHeader(500);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const targets = [document.querySelector("#cta-final"), document.querySelector("footer")].filter(
      (el): el is Element => el !== null,
    );
    if (targets.length === 0) return;

    const states = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) states.set(entry.target, entry.isIntersecting);
        setNearFooter(Array.from(states.values()).some(Boolean));
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !nearFooter;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 p-3 backdrop-blur-md xl:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <Button
            href={bookingHref()}
            external
            size="lg"
            className="w-full"
            icon={siteConfig.bookingUrl ? undefined : <WhatsAppGlyph className="h-4 w-4" />}
          >
            Agendar Horário
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
