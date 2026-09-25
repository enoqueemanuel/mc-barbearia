"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage as ChatMessageType, QuickAction } from "@/lib/chat/types";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";

export function ChatMessages({
  messages,
  isTyping,
  onSelectAction,
}: {
  messages: ChatMessageType[];
  isTyping: boolean;
  onSelectAction: (action: QuickAction) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-4">
      <div role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversa com o assistente" className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <ChatMessage key={message.id} message={index === messages.length - 1 && !isTyping ? message : { ...message, quickActions: undefined }} onSelectAction={onSelectAction} />
        ))}
        {isTyping && (
          <div className="flex items-start">
            <div className="rounded-xl border border-line-strong bg-panel px-4">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
