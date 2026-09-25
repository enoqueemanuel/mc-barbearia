import Image from "next/image";
import { team } from "@/data/team";
import type { TeamMember } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramGlyph } from "@/components/icons/BrandGlyphs";
import { bookingHref } from "@/lib/booking";
import { photoTreatment, photoVignetteSoft } from "@/lib/styles";

function TeamCard({ member, delay }: { member: TeamMember; delay: number }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Reveal delay={delay} className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl">
        <Image
          src={member.image}
          alt={member.imageAlt}
          fill
          quality={90}
          sizes="(min-width: 1024px) 30vw, 70vw"
          className={`object-cover transition-transform duration-700 ease-premium hover:scale-[1.02] ${photoTreatment}`}
        />
        <div className={photoVignetteSoft} />
      </Reveal>

      <Reveal delay={delay + 0.15} className="mt-2">
        <h3 className="font-display text-display-md text-ink">{member.name}</h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">{member.role}</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">{member.bio}</p>

        <div className="mt-5 flex items-center justify-center gap-4">
          <Button
            href={bookingHref()}
            external
            variant="ghost"
          >
            Agendar com {member.shortName}
          </Button>
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de ${member.shortName}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <InstagramGlyph className="h-5 w-5" />
            </a>
          )}
        </div>
      </Reveal>
    </div>
  );
}

export function Team() {
  return (
    <section id="equipe" className="bg-canvas py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Equipe MC"
          eyebrowIndex="04"
          title="Conheça quem cuida do seu estilo."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {team.map((member, i) => (
            <TeamCard key={member.slug} member={member} delay={i * 0.12} />
          ))}
        </div>
      </Container>
    </section>
  );
}
