import type { Service } from "@/types/content";
import { IndexedRow } from "@/components/ui/IndexedRow";
import { Reveal } from "@/components/ui/Reveal";
import { ChooseService } from "@/components/ui/ChooseService";

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
        <div className="group service-interaction">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Heading className="relative inline-block font-display text-xl text-ink sm:text-2xl">
              {service.name}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:scale-x-100" />
            </Heading>
            {service.popular && (
              <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                Mais procurado
              </span>
            )}
          </div>
          <p className="mt-1 max-w-md text-sm text-ink-muted">{service.description}</p>
          <ChooseService slug={service.slug} name={service.name} />
        </div>
      </IndexedRow>
    </Reveal>
  );
}
