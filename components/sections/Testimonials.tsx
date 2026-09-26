import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/data/site";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

export function Testimonials() {
  return (
    <section className="bg-canvas py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeading eyebrow="Avaliações" eyebrowIndex="07" title="O que dizem sobre a MC." />
          <Reveal className="shrink-0 border-l border-line-strong pl-5 lg:max-w-64">
            <p className="text-sm text-ink-muted">
              Confira mais avaliações dos nossos clientes no Google.
            </p>
            <a
              href={siteConfig.social.googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs uppercase tracking-[0.15em] text-accent underline underline-offset-4"
            >
              Ver todas as avaliações
            </a>
          </Reveal>
        </div>
        <TestimonialsCarousel cards={testimonials} />
      </Container>
    </section>
  );
}
