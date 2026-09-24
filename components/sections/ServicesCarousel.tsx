"use client";

import type { CSSProperties } from "react";
import { Scissors } from "lucide-react";
import type { Service } from "@/types/content";
import { ChooseService } from "@/components/ui/ChooseService";

export function ServicesCarousel({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <div className="testimonials-marquee">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">Mais cuidados para você</h3>
      </div>
      <div className="testimonials-marquee-viewport" role="region" aria-label="Outros serviços da barbearia" tabIndex={0}>
        <div className="testimonials-marquee-track" style={{ "--marquee-duration": `${services.length * 9}s` } as CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="testimonials-marquee-group" aria-hidden={copy === 1 ? true : undefined}>
              {services.map((service) => (
                <article key={service.slug} className="testimonials-marquee-card interactive-card flex flex-col rounded-2xl border border-line bg-canvas p-5 sm:p-6">
                  <Scissors size={18} className="text-accent" aria-hidden="true" />
                  <h4 className="mt-3 font-display text-xl text-ink">{service.name}</h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{service.description}</p>
                  <ChooseService slug={service.slug} name={service.name} duplicate={copy === 1} />
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
