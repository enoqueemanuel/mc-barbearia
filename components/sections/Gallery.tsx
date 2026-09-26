"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { galleryItems } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { photoTreatment } from "@/lib/styles";

// Só é montado depois do primeiro clique: tira o código do modal do
// bundle inicial da Galeria.
const Lightbox = dynamic(() => import("@/components/ui/Lightbox").then((m) => m.Lightbox), {
  ssr: false,
});

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  function openAt(index: number) {
    setLightboxLoaded(true);
    setOpenIndex(index);
  }

  return (
    <section id="galeria" className="bg-canvas py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Galeria"
          eyebrowIndex="06"
          title="Cortes, ambiente e o dia a dia da casa."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <Reveal key={item.src} delay={(index % 3) * 0.08}>
              <button
                type="button"
                onClick={() => openAt(index)}
                className="group relative block w-full overflow-hidden bg-panel focus-visible:outline-2 focus-visible:outline-accent"
                style={{ aspectRatio: "4 / 5" }}
                aria-label={`Ampliar foto: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03] ${photoTreatment}`}
                />
                <div className="absolute inset-0 bg-canvas/0 transition-colors duration-500 group-hover:bg-canvas/20" />
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {lightboxLoaded && (
        <Lightbox
          items={galleryItems}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={(next) => setOpenIndex(next)}
        />
      )}
    </section>
  );
}
