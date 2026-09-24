import { navItems } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/icons/BrandGlyphs";
import { whatsappHref } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <Reveal>
            <p className="font-display text-2xl font-semibold text-ink">
              MC <span className="text-accent">Barbearia</span>
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
              {siteConfig.legalName}
            </p>
            <p className="mt-4 max-w-xs text-sm text-ink-muted">{siteConfig.tagline}</p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da MC Barbearia"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramGlyph className="h-5 w-5" />
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da MC Barbearia"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <WhatsAppGlyph className="h-5 w-5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">Navegação</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-premium group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">Contato</p>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              <li>{siteConfig.phoneDisplay}</li>
              <li>{siteConfig.address.full}</li>
              <li>{siteConfig.social.instagramHandle}</li>
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">Horário</p>
            <ul className="mt-5 space-y-2 text-sm text-ink-muted">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span>{h.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} MC Barbearia. Todos os direitos reservados.</p>
          <p>Blumenau, SC</p>
        </div>
      </Container>
    </footer>
  );
}
