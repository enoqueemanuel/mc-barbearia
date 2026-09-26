import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/booking";

export function FinalCta() {
  return (
    <section id="cta-final" className="border-y border-line-strong bg-canvas py-16 sm:py-20">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <Reveal><p className="mb-4 text-xs uppercase tracking-[0.18em] text-ink-muted">A gente se vê na cadeira.</p><h2 className="font-display text-display-lg font-medium">Reserve um tempo<br />para você.</h2></Reveal>
        <Reveal className="max-w-sm"><p className="mb-6 text-sm leading-relaxed text-ink-muted">Consulte os horários disponíveis, escolha seu barbeiro e agende direto pelo aplicativo.</p><Button href={bookingHref()} external size="lg">Agendar meu horário</Button></Reveal>
      </Container>
    </section>
  );
}
