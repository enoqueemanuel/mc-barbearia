"use client";

import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppGlyph } from "@/components/icons/BrandGlyphs";
import { whatsappHref } from "@/lib/whatsapp";
import { useScrollHeader } from "@/hooks/useScrollHeader";

export function WhatsAppButton() {
  const visible = useScrollHeader(600);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappHref("Olá! Vim pelo site e quero agendar um horário.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar no WhatsApp"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="group fixed bottom-24 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-xl border border-accent/40 bg-panel text-accent shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-colors hover:border-accent hover:bg-accent hover:text-canvas xl:flex"
        >
          <span
            className="absolute inset-0 -z-10 rounded-xl bg-accent/30 motion-reduce:animate-none [animation:ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]"
            aria-hidden="true"
          />
          <WhatsAppGlyph className="h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
