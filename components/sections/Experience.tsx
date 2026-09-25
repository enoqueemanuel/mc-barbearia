import Image from "next/image";
import { CoffeeSteam } from "@/components/ui/CoffeeSteam";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";
import { photoTreatment, photoVignetteSoft, photoVignetteStrong } from "@/lib/styles";

export function Experience() {
  return (
    <section id="experiencia" className="relative overflow-hidden bg-canvas py-20 sm:py-28 lg:py-32">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-5">
            <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/ambiente-quadros.jpg"
                alt="Quadros do ambiente da MC Barbearia: foco, disciplina e execução"
                fill
                quality={90}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className={`object-cover ${photoTreatment}`}
              />
              <div className={photoVignetteStrong} />
            </Reveal>

            <Reveal
              delay={0.15}
              className="absolute -bottom-8 -right-8 hidden aspect-[5/4] w-1/2 overflow-hidden rounded-2xl border-4 border-canvas lg:block"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/gallery/detalhes-ferramentas.jpg"
                  alt="Tesouras e pente profissionais de barbeiro"
                  fill
                  quality={90}
                  sizes="25vw"
                  className={`object-cover ${photoTreatment}`}
                />
                <div className={photoVignetteSoft} />
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <SectionLabel index="02">Experiência MC</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance mt-4 font-display text-display-lg font-semibold text-ink">
                Não é só um corte.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
                Café quentinho, ambiente pensado em cada detalhe e barbeiros que
                tratam sua imagem como ela já é: uma assinatura.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-8 max-w-lg">
              <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/images/gallery/ambiente-cafe.jpg"
                  alt="Cantinho do café com cafeteira e garrafas térmicas da MC Barbearia"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={`object-cover ${photoTreatment}`}
                />
                <CoffeeSteam />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
