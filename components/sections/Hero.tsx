import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";
import { bookingHref } from "@/lib/booking";

export function Hero() {
  return (
    <section id="inicio" className="bg-canvas pt-28 sm:pt-32">
      <Container>
        <div className="grid items-center gap-10 pb-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-14">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">MACEDO Barbearia · Blumenau, SC</p>
            <h1 className="mt-7 font-display text-[clamp(3.6rem,6.5vw,6.8rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              Seu estilo.<br /><span className="italic text-accent">Nossa</span><br />assinatura.
            </h1>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg">{siteConfig.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href={bookingHref()} external size="lg">Agendar horário</Button>
              <a href="#servicos" className="py-3 text-sm underline decoration-line-strong underline-offset-8 transition-colors hover:text-accent">Ver serviços</a>
            </div>
            <p className="mt-5 text-xs text-ink-muted">Escolha seu barbeiro e horário na agenda online.</p>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image src="/images/gallery/equipe-dupla.jpg" alt="Marco e Matheus na barbearia, trabalhando com suas ferramentas" fill priority quality={90} sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/80 to-transparent pt-16">
                <Image src="/brand-logo.png" alt="MC Macedo — desde 2023" width={512} height={512} className="w-44 opacity-90 mix-blend-screen sm:w-52" />
              </div>
            </div>
            <p className="mt-3 flex justify-between gap-4 text-[11px] uppercase tracking-[0.12em] text-ink-muted"><span>Gente que entende de corte.</span><span>Desde {siteConfig.foundedYear}</span></p>
          </Reveal>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line-strong py-5 text-xs text-ink-muted"><span>Cabelo, barba e cuidado nos detalhes.</span><a href="#localizacao" className="transition-colors hover:text-accent">Progresso · Blumenau ↗</a></div>
      </Container>
    </section>
  );
}
