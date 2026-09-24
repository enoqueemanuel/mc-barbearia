"use client";

import { useEffect, useState } from "react";
import { ChatButton } from "@/components/chat/ChatButton";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatNudge } from "@/components/chat/ChatNudge";

const NUDGE_SEEN_KEY = "mc-chat-nudge-seen";
const NUDGE_DELAY_MS = 7000;
const NUDGE_AUTO_HIDE_MS = 10000;

export function Chat() {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(NUDGE_SEEN_KEY) === "1";
    } catch {
      // sessionStorage indisponível — segue sem o aviso, sem quebrar o chat.
    }
    if (seen) return;

    const showTimer = window.setTimeout(() => {
      setShowNudge(true);
      try {
        sessionStorage.setItem(NUDGE_SEEN_KEY, "1");
      } catch {
        // ignora
      }
    }, NUDGE_DELAY_MS);

    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showNudge) return;
    const hideTimer = window.setTimeout(() => setShowNudge(false), NUDGE_AUTO_HIDE_MS);
    return () => window.clearTimeout(hideTimer);
  }, [showNudge]);

  function openChat() {
    setShowNudge(false);
    setOpen(true);
  }

  return (
    <>
      <ChatNudge show={showNudge && !open} onOpen={openChat} onDismiss={() => setShowNudge(false)} />
      <ChatButton open={open} onToggle={() => (open ? setOpen(false) : openChat())} />
      <ChatWindow open={open} onClose={() => setOpen(false)} />
    </>
  );
}
