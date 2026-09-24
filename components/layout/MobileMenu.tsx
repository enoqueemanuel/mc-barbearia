"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navItems } from "@/data/nav";
import { Button } from "@/components/ui/Button";
import { bookingHref } from "@/lib/booking";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { fadeUp, premiumTransition } from "@/lib/motion";

// Framer Motion, nesta versão, não propaga initial/animate de pai para
// filho de forma confiável: cada link anima com initial/animate próprios,
// e o cascateamento é feito com um delay calculado à mão.
function navDelay(index: number) {
  return 0.1 + index * 0.06;
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useLockBodyScroll(open);
  const containerRef = useFocusTrap(open);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-canvas lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <span className="font-display text-xl font-semibold text-ink">
              MC <span className="text-accent">Barbearia</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="flex h-11 w-11 items-center justify-center text-ink"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ ...premiumTransition, delay: navDelay(i) }}
                className="border-b border-line py-3 font-display text-2xl text-ink transition-colors hover:text-accent sm:py-4 sm:text-3xl"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="px-6 pb-10"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ ...premiumTransition, delay: 0.4 }}
          >
            <Button href={bookingHref()} external size="lg" className="w-full">
              Agendar Horário
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
