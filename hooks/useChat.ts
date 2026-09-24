"use client";

import { useCallback, useEffect, useState } from "react";
import { welcomeReply, handleAction, matchesBookingIntent, bookingIntentReply } from "@/lib/chat/actions";
import type { ChatApiMessage, ChatMessage } from "@/lib/chat/types";

const STORAGE_KEY = "mc-chat-history";
const MAX_INPUT_LENGTH = 500;

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function firstMessage(): ChatMessage {
  return { id: makeId(), role: "assistant", ...welcomeReply() };
}

// Lazy initializer: roda uma única vez na montagem, sem exigir um efeito
// separado nem um setState pós-montagem (a janela do chat só é revelada
// depois disso, então não há risco de mismatch entre servidor e cliente).
function loadInitialMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [firstMessage()];
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // sessionStorage indisponível (aba privada, etc.) — segue sem persistência.
  }
  return [firstMessage()];
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadInitialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (messages.length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignora falha de storage silenciosamente
    }
  }, [messages]);

  const pushBotReply = useCallback((reply: Omit<ChatMessage, "id" | "role">, delayMs = 550) => {
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: makeId(), role: "assistant", ...reply }]);
    }, delayMs);
  }, []);

  const sendQuickAction = useCallback(
    (actionId: string, label: string) => {
      if (actionId !== "root") {
        setMessages((prev) => [...prev, { id: makeId(), role: "user", content: label }]);
      }
      const reply = handleAction(actionId);
      pushBotReply(reply, actionId === "root" ? 150 : 550);
    },
    [pushBotReply],
  );

  const sendUserMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim().slice(0, MAX_INPUT_LENGTH);
      if (!text || isTyping) return;

      const userMessage: ChatMessage = { id: makeId(), role: "user", content: text };
      setMessages((prev) => [...prev, userMessage]);

      if (matchesBookingIntent(text)) {
        pushBotReply(bookingIntentReply());
        return;
      }

      setIsTyping(true);
      try {
        const history: ChatApiMessage[] = [...messages, userMessage]
          .filter((m) => !m.quickActions && !m.cta)
          .slice(-10)
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: history.length > 0 ? history : [{ role: "user", content: text }] }),
        });
        const data = (await res.json()) as { reply?: string };
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content: data.reply || "Não entendi. Pode reformular?",
            quickActions: [{ id: "root", label: "Voltar ao início" }],
          },
        ]);
      } catch {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content: "Estamos com instabilidade agora. Posso te direcionar para nossa equipe no WhatsApp.",
            quickActions: [{ id: "whatsapp", label: "Falar no WhatsApp" }, { id: "root", label: "Voltar ao início" }],
          },
        ]);
      }
    },
    [isTyping, messages, pushBotReply],
  );

  const resetConversation = useCallback(() => {
    const fresh = [firstMessage()];
    setMessages(fresh);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // ignora
    }
  }, []);

  return { messages, isTyping, sendQuickAction, sendUserMessage, resetConversation };
}
