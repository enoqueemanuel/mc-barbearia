import { plans } from "@/data/plans";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/booking";
import { cn } from "@/lib/utils";

export function Plans() {
  return (
    <section id="planos" className="relative isolate overflow-hidden bg-panel py-20 sm:py-28 lg:py-32">
      <Container className="relative">
        <SectionHeading
          eyebrow="Assinaturas"
          eyebrowIndex="08"
          title="Seu estilo sempre em dia, todo mês."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {plans.map((plan) => (
            <Reveal
              key={plan.slug}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-transform duration-500 ease-premium hover:-translate-y-1.5 sm:p-10",
                plan.highlighted ? "border-accent bg-canvas" : "border-line-strong bg-canvas/40",
              )}
            >
              {plan.highlighted && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
                />
              )}
              {plan.highlighted && (
                <span className="relative mb-4 self-end font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  Mais Escolhido
                </span>
              )}

              <h3 className="font-display text-2xl text-ink">{plan.name}</h3>
              <p className="mt-3 text-sm text-ink-muted">{plan.description}</p>

              <div className="mt-8 flex flex-wrap items-baseline gap-1">
                <span className="whitespace-nowrap font-display text-4xl font-semibold text-ink sm:text-5xl">{plan.price}</span>
                <span className="font-mono text-sm text-ink-muted">{plan.period}</span>
              </div>

              <ul className="mt-8 flex-1 space-y-4">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-0.5 text-accent">—</span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button
                href={bookingHref()}
                external
                variant={plan.highlighted ? "primary" : "ghost"}
                size="lg"
                className="mt-10 w-full"
              >
                Assinar {plan.name.replace("Assinatura ", "")}
              </Button>

              {plan.rules.length > 0 && (
                <p className="mt-4 text-center text-xs text-ink-muted">{plan.rules.join(" · ")}</p>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
