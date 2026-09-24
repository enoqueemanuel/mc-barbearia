import { RotateCcw, X } from "lucide-react";

export function ChatHeader({
  onClose,
  onReset,
}: {
  onClose: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line px-4 py-4">
      <div>
        <p className="font-display text-lg font-semibold text-ink">MC Barbearia</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Assistente virtual · Online
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onReset}
          aria-label="Nova conversa"
          title="Nova conversa"
          className="flex h-9 w-9 items-center justify-center text-ink-muted transition-colors hover:text-accent"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar chat"
          className="flex h-9 w-9 items-center justify-center text-ink-muted transition-colors hover:text-accent"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
