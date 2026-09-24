"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { RobotGlyph } from "@/components/icons/BrandGlyphs";

export function ChatNudge({ show, onOpen, onDismiss }: { show: boolean; onOpen: () => void; onDismiss: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[9.5rem] right-4 z-[65] w-64 rounded-2xl border border-accent/40 bg-panel p-4 pr-8 shadow-[0_20px_45px_rgba(0,0,0,0.5)] sm:bottom-24 sm:right-6"
        >
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Fechar aviso do assistente"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center text-ink-muted transition-colors hover:text-accent"
          >
            <X className="h-4 w-4" />
          </button>

          <button type="button" onClick={onOpen} className="flex items-start gap-3 text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-canvas text-accent">
              <RobotGlyph className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">Ficou alguma dúvida?</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                Tire suas dúvidas e encontre o link da nossa agenda.
              </span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
