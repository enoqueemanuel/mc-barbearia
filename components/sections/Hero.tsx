import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";
import { bookingHref } from "@/lib/booking";
import { BrandWatermark } from "@/components/ui/BrandWatermark";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden bg-canvas pt-32 sm:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <LiquidEffectAnimation imageSrc="/images/gallery/equipe-dupla.jpg" className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/65 via-canvas/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/20" />
      </div>
      <Container className="relative">
        <div className="pb-8 lg:pb-10">
          <Reveal className="max-w-3xl">
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
          <BrandWatermark />
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line-strong py-5 text-xs text-ink-muted"><span>Cabelo, barba e cuidado nos detalhes.</span><a href="#localizacao" className="transition-colors hover:text-accent">Progresso · Blumenau ↗</a></div>
      </Container>
    </section>
  );
}
