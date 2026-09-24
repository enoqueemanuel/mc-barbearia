"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/types/content";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const open = index !== null;
  useLockBodyScroll(open);
  const containerRef = useFocusTrap(open);

  useEffect(() => {
    if (!open || index === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(((index as number) + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate(((index as number) - 1 + items.length) % items.length);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, index, items.length, onClose, onNavigate]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas/95 p-4 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de fotos em tela cheia"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar galeria"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + items.length) % items.length);
            }}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>

          <motion.div
            key={index}
            className="relative aspect-[4/5] max-h-[85vh] w-full max-w-4xl sm:aspect-[16/10]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[index].src}
              alt={items[index].alt}
              fill
              sizes="(min-width: 640px) 80vw, 100vw"
              className="object-contain"
            />
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % items.length);
            }}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
