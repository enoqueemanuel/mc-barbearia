import { differentiators } from "@/data/differentiators";
import { team } from "@/data/team";
import { services } from "@/data/services";
import { getGoogleReviews } from "@/lib/google-reviews";
import type { Stat } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndexedRow } from "@/components/ui/IndexedRow";
import { StatNumber } from "@/components/ui/StatNumber";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export async function WhyUs() {
  const googleReviews = await getGoogleReviews();
  const hasGoogleStat = !!googleReviews && googleReviews.totalReviews > 0;

  const stats: Stat[] = [
    { value: String(team.length), label: "profissionais na equipe" },
    { value: String(services.length), label: "serviços oferecidos" },
  ];
  if (hasGoogleStat) {
    stats.push({
      value: googleReviews.rating.toFixed(1).replace(".", ","),
      label: "nota real no Google",
    });
  }

  return (
    <section className="bg-panel py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Por que escolher a MC"
          eyebrowIndex="05"
          title="Confiança que se mostra em números."
        />

        <div
          className={cn(
            "mt-10 grid grid-cols-1 gap-8 border-y border-line py-8 sm:grid-cols-2",
            stats.length === 3 && "lg:grid-cols-3",
          )}
        >
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="text-center sm:border-l sm:border-line sm:px-6 sm:first:border-l-0"
            >
              <div className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                <StatNumber value={stat.value} isPlaceholder={stat.isPlaceholder} />
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {differentiators.map((item) => (
            <IndexedRow key={item.index} index={item.index}>
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
            </IndexedRow>
          ))}
        </div>
      </Container>
    </section>
  );
}
