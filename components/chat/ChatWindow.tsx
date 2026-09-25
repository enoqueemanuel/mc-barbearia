"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { QuickAction } from "@/lib/chat/types";

export function ChatWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { messages, isTyping, sendQuickAction, sendUserMessage, resetConversation } = useChat();
  const containerRef = useFocusTrap(open);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function handleSelectAction(action: QuickAction) {
    sendQuickAction(action.id, action.label);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Assistente virtual da MC Barbearia"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] flex h-[88dvh] flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-canvas shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[75dvh] sm:w-[400px] sm:rounded-2xl"
        >
          <ChatHeader onClose={onClose} onReset={resetConversation} />
          <div className="relative isolate flex min-h-0 flex-1 flex-col" onClickCapture={(event) => {
            const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
            if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            const url = new URL(link.href, window.location.href);
            if (url.origin === window.location.origin && url.hash) onClose();
          }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
              <Image src="/brand-logo.png" alt="" width={512} height={512} sizes="220px" className="h-auto w-[55%] max-w-[220px] opacity-[0.12] mix-blend-screen" />
            </div>
            <ChatMessages messages={messages} isTyping={isTyping} onSelectAction={handleSelectAction} />
          </div>
          <ChatInput disabled={isTyping} onSend={sendUserMessage} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
