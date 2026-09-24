"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { RobotGlyph } from "@/components/icons/BrandGlyphs";

export function ChatButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Fechar assistente da MC Barbearia" : "Fale com a MC"}
      aria-expanded={open}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="group fixed bottom-24 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-xl border border-accent/40 bg-panel text-accent shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-colors hover:border-accent hover:bg-accent hover:text-canvas sm:bottom-6 sm:right-6"
    >
      {!open && (
        <span
          className="absolute inset-0 -z-10 rounded-xl bg-accent/30 motion-reduce:animate-none [animation:ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]"
          aria-hidden="true"
        />
      )}
      {open ? <X className="h-6 w-6" /> : <RobotGlyph className="h-7 w-7" />}
      {!open && (
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl border border-line-strong bg-canvas px-3 py-1.5 text-xs text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Fale com a MC
        </span>
      )}
    </motion.button>
  );
}
