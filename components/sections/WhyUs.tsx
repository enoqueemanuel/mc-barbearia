import Image from "next/image";
import { differentiators } from "@/data/differentiators";
import { team } from "@/data/team";
import { services } from "@/data/services";
import type { Stat } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndexedRow } from "@/components/ui/IndexedRow";
import { StatNumber } from "@/components/ui/StatNumber";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function WhyUs() {
  const stats: Stat[] = [
    { value: String(team.length), label: "profissionais na equipe" },
    { value: String(services.length), label: "serviços oferecidos" },
  ];

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

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <Reveal className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line lg:aspect-[4/3]">
            <Image
              src="/images/gallery/bancada-tesouras.jpg"
              alt="Tesouras profissionais organizadas na bancada da MC Barbearia"
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="object-cover contrast-105"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          {differentiators.map((item) => (
            <IndexedRow key={item.index} index={item.index}>
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
            </IndexedRow>
          ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
