import type { Service } from "@/types/content";
import { IndexedRow } from "@/components/ui/IndexedRow";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceRow({
  service,
  index,
  headingLevel: Heading = "h3",
}: {
  service: Service;
  index: number;
  /** A Home está sob um h2 (itens = h3); a página /servicos está sob um h1 (itens = h2). */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Reveal delay={Math.min(index * 0.06, 0.3)}>
      <IndexedRow index={String(index + 1).padStart(2, "0")}>
        <div className="group flex items-baseline justify-between gap-4">
          <div className="min-w-0">
            <Heading className="relative inline-block font-display text-xl text-ink sm:text-2xl">
              {service.name}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100" />
            </Heading>
            <p className="mt-1 max-w-xs text-sm text-ink-muted sm:max-w-sm">{service.description}</p>
          </div>
          <div className="shrink-0 text-right font-mono text-sm text-ink-muted">
            <div className="text-base text-ink">{service.price}</div>
            <div>{service.duration}</div>
          </div>
        </div>
      </IndexedRow>
    </Reveal>
  );
}
