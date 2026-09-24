"use client";

import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types/content";
import { ReviewAttribution } from "@/components/ui/ReviewAttribution";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

export function TestimonialsCarousel({ cards }: { cards: Testimonial[] }) {
  if (cards.length === 0) return null;

  return (
    <div className="testimonials-marquee mt-12 sm:mt-16">
      <div className="testimonials-marquee-viewport" role="region" aria-label="Depoimentos dos clientes" tabIndex={0}>
        <div
          className="testimonials-marquee-track"
          style={{ "--marquee-duration": `${cards.length * 9}s` } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="testimonials-marquee-group" aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined}>
              {cards.map((testimonial) => (
                <article key={testimonial.name} className="testimonials-marquee-card flex flex-col rounded-2xl border border-line bg-canvas p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1.5 text-accent" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <span title="Publicado no Google" role="img" aria-label="Publicado no Google" className="shrink-0">
                    <GoogleIcon className="h-5 w-5" />
                  </span>
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">“{testimonial.quote}”</blockquote>
                  <ReviewAttribution card={testimonial} />
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
