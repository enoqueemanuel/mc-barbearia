import type { QuickAction } from "@/lib/chat/types";

export function QuickActions({
  actions,
  onSelect,
}: {
  actions: QuickAction[];
  onSelect: (action: QuickAction) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => onSelect(action)}
          className="rounded-xl border border-line-strong px-3 py-2 text-xs uppercase tracking-[0.06em] text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
