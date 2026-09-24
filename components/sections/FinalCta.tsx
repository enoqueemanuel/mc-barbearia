import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/booking";
import { photoTreatment } from "@/lib/styles";

export function FinalCta() {
  return (
    <section id="cta-final" className="relative overflow-hidden bg-canvas py-36 sm:py-48">
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/marco-ferramentas.jpg"
          alt="Marco Macedo, dono da MC Barbearia, com ferramentas de barbeiro"
          fill
          quality={90}
          sizes="100vw"
          className={`object-cover object-[50%_25%] ${photoTreatment}`}
        />
        <div className="absolute inset-0 bg-canvas/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/55 to-canvas/65" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[120%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-3xl"
        />
      </div>

      <Container className="relative z-10 text-center">
        <Reveal>
          <h2 className="text-balance mx-auto max-w-3xl font-display text-display-xl font-semibold text-ink">
            Seu próximo corte começa aqui.
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <Button href={bookingHref()} external size="lg">
            Agendar Meu Horário
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
