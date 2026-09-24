"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";

const MAX_LENGTH = 500;

export function ChatInput({
  disabled,
  onSend,
}: {
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");

  function submit() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  }

  return (
    <div
      className="flex items-center gap-2 border-t border-line p-3"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, MAX_LENGTH))}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder="Escreva sua mensagem..."
        aria-label="Mensagem para o assistente da MC Barbearia"
        maxLength={MAX_LENGTH}
        className="h-11 flex-1 rounded-xl border border-line-strong bg-canvas px-3 text-sm text-ink placeholder:text-ink-muted focus-visible:border-accent focus-visible:outline-none"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || value.trim().length === 0}
        aria-label="Enviar mensagem"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-canvas transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
