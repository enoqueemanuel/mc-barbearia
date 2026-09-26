import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  return (
    <section className="border-y border-line bg-panel py-12 sm:py-16">
      <Container className="grid items-center gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <Reveal className="relative aspect-[16/9] overflow-hidden"><Image src="/images/gallery/bancada-tesouras.jpg" alt="As ferramentas usadas no dia a dia da barbearia" fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" /></Reveal>
        <Reveal><p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Nos detalhes, a diferença.</p><h2 className="mt-4 max-w-xl font-display text-3xl font-medium leading-tight sm:text-4xl">Uma boa conversa antes.<br />Um acabamento bem cuidado depois.</h2><p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-muted">Seu estilo orienta o trabalho. Corte, barba e sobrancelha: escolha os cuidados que fazem sentido para você.</p></Reveal>
      </Container>
    </section>
  );
}
