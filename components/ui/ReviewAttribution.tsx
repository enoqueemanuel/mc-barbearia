import type { Testimonial } from "@/types/content";

export function ReviewAttribution({ card }: { card: Testimonial }) {
  return (
    <div className="mt-5">
      <p className="font-display text-sm font-semibold text-ink">
        {card.authorUrl ? (
          <a href={card.authorUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline hover:decoration-accent">
            {card.name}
          </a>
        ) : card.name}
      </p>
      <p className="mt-1 text-xs text-ink-muted">
        via <span translate="no" className="whitespace-nowrap">{card.source}</span>
      </p>
    </div>
  );
}
