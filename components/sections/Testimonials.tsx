import { Star } from "lucide-react";
import { testimonials as placeholderTestimonials } from "@/data/testimonials";
import { siteConfig } from "@/data/site";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StatNumber } from "@/components/ui/StatNumber";

export async function Testimonials() {
  const googleReviews = await getGoogleReviews();
  const hasLiveReviews = !!googleReviews && googleReviews.totalReviews > 0;

  const cards = hasLiveReviews
    ? googleReviews.positiveReviews.slice(0, 3).map((r) => ({
        name: r.authorName,
        quote: r.text,
        source: "Google",
        rating: r.rating,
        isPlaceholder: false,
      }))
    : placeholderTestimonials;

  return (
    <section className="bg-canvas py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeading eyebrow="Avaliações" eyebrowIndex="07" title="O que dizem sobre a MC." />

          <Reveal className="shrink-0 rounded-2xl border border-line-strong p-6 text-center sm:p-8 lg:w-72">
            <div className="flex justify-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            {hasLiveReviews ? (
              <>
                <div className="mt-4 font-display text-4xl font-semibold text-ink">
                  <StatNumber value={googleReviews.rating.toFixed(1).replace(".", ",")} />
                </div>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                  <StatNumber value={googleReviews.totalReviews.toLocaleString("pt-BR")} /> avaliações
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-ink-muted">
                Veja as avaliações reais dos nossos clientes direto no Google.
              </p>
            )}
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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((testimonial, i) => (
            <Reveal
              key={`${testimonial.name}-${i}`}
              delay={i * 0.1}
              className="rounded-2xl border border-line p-6 transition-transform duration-500 ease-premium hover:-translate-y-1.5 sm:p-8"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: testimonial.rating }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 text-ink-muted">
                {testimonial.isPlaceholder && (
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Exemplo — substituir
                  </span>
                )}
                “{testimonial.quote}”
              </p>
              <p className="mt-6 font-display text-sm text-ink">{testimonial.name}</p>
              <p className="text-xs text-ink-muted">via {testimonial.source}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
