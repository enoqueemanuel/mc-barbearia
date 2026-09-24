"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/icons/BrandGlyphs";
import { whatsappHref } from "@/lib/whatsapp";

export function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="localizacao" className="bg-canvas py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading eyebrow="Localização" eyebrowIndex="08" title="Venha nos visitar." />

            <div className="mt-8 space-y-5">
              <Reveal className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-ink">{siteConfig.legalName}</p>
                  <p className="text-sm text-ink-muted">{siteConfig.address.full}</p>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-ink">{siteConfig.hoursShort}, 09:00 – 20:00</p>
                  <p className="text-sm text-ink-muted">Sábado até 18:00 · Domingo fechado</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                href={siteConfig.googleMapsDirectionsUrl}
                external
                icon={<Navigation className="h-4 w-4" aria-hidden="true" />}
              >
                Como Chegar
              </Button>
              <Button
                href={whatsappHref("Olá! Vim pelo site e quero falar com a MC Barbearia.")}
                external
                variant="ghost"
                icon={<WhatsAppGlyph className="h-4 w-4" />}
              >
                Chamar no WhatsApp
              </Button>
            </Reveal>
          </div>

          <Reveal
            delay={0.15}
            className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line lg:aspect-auto"
          >
            <div ref={mapRef} className="h-full min-h-80 w-full bg-panel">
              {showMap ? (
                <iframe
                  title="Mapa com a localização da MC Barbearia"
                  src={siteConfig.googleMapsEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-80 w-full grayscale-[40%] contrast-125"
                />
              ) : (
                <div className="flex h-full min-h-80 items-center justify-center text-sm text-ink-muted">
                  Carregando mapa…
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
