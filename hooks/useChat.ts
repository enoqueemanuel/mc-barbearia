"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { welcomeReply, handleAction } from "@/lib/chat/actions";
import { conversationReply } from "@/lib/chat/conversation";
import type { ChatMessage } from "@/lib/chat/types";

const STORAGE_KEY = "mc-chat-history";
const makeId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const firstMessage = (): ChatMessage => ({ id: makeId(), role: "assistant", ...welcomeReply() });

function loadInitialMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [firstMessage()];
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (Array.isArray(saved) && saved.length && saved.every((m) =>
      m && typeof m.id === "string" && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")) {
      return saved.slice(-60);
    }
  } catch { /* armazenamento indisponível */ }
  return [firstMessage()];
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadInitialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const historyRef = useRef(messages);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch { /* armazenamento indisponível */ }
  }, [messages]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const append = useCallback((message: ChatMessage) => {
    historyRef.current = [...historyRef.current, message].slice(-60);
    setMessages(historyRef.current);
  }, []);

  const reply = useCallback((response: Omit<ChatMessage, "id" | "role">) => {
    busy.current = true;
    setIsTyping(true);
    timer.current = setTimeout(() => {
      append({ id: makeId(), role: "assistant", ...response });
      busy.current = false;
      timer.current = null;
      setIsTyping(false);
    }, 250);
  }, [append]);

  const sendQuickAction = useCallback((actionId: string, label: string) => {
    if (busy.current) return;
    if (actionId !== "root") append({ id: makeId(), role: "user", content: label });
    reply(handleAction(actionId));
  }, [append, reply]);

  const sendUserMessage = useCallback((rawText: string) => {
    const text = rawText.trim().slice(0, 500);
    if (!text || busy.current) return;
    const response = conversationReply(text, historyRef.current.slice(-20));
    append({ id: makeId(), role: "user", content: text });
    reply(response);
  }, [append, reply]);

  const resetConversation = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    busy.current = false;
    setIsTyping(false);
    historyRef.current = [firstMessage()];
    setMessages(historyRef.current);
  }, []);

  return { messages, isTyping, sendQuickAction, sendUserMessage, resetConversation };
}
