"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BrandWatermark } from "@/components/ui/BrandWatermark";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig, isOpenNow } from "@/data/site";
import { bookingHref } from "@/lib/booking";
import { fadeUp, premiumTransition } from "@/lib/motion";
import { photoTreatment } from "@/lib/styles";

const headlineLines = ["Seu estilo.", "Nossa assinatura."];

// Framer Motion, nesta versão, não propaga initial/animate de pai para
// filho de forma confiável: cada elemento anima com initial/animate
// próprios, e o cascateamento é feito com um delay calculado à mão.
const heroStagger = 0.09;
const heroDelayStart = 0.15;
function heroDelay(index: number) {
  return heroDelayStart + index * heroStagger;
}

export function Hero() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    function sync() {
      setStatus(isOpenNow());
    }
    sync();
    const id = setInterval(sync, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-canvas pb-20 pt-32 sm:pb-24 lg:items-center"
    >
      <div className="absolute inset-0">
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.16 }}
          transition={{ duration: 22, ease: "linear" }}
        >
          <Image
            src="/images/gallery/equipe-dupla.jpg"
            alt="Barbeiros da MC Barbearia trabalhando no ambiente da barbearia"
            fill
            priority
            quality={90}
            sizes="100vw"
            className={`object-cover object-[60%_15%] ${photoTreatment}`}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/75 to-canvas/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/90 via-canvas/35 to-transparent lg:via-canvas/50" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_40px_var(--color-canvas)]" />
      </div>

      <Container className="relative">
        <div className="max-w-4xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ ...premiumTransition, delay: heroDelay(0) }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              MACEDO Barbearia — <span className="whitespace-nowrap">Blumenau, SC</span>
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-display-2xl font-semibold text-ink">
            {headlineLines.map((line, i) => (
              <motion.span
                key={line}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ ...premiumTransition, delay: heroDelay(i + 1) }}
                className="text-balance block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ ...premiumTransition, delay: heroDelay(3) }}
            className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-ink-muted"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ ...premiumTransition, delay: heroDelay(4) }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button href={bookingHref()} external size="lg">
              Agendar Horário
            </Button>
            <Button href="#servicos" variant="ghost" size="lg">
              Conhecer Serviços
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ ...premiumTransition, delay: heroDelay(5) }}
            className="mt-12 flex flex-col gap-y-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2"
          >
            <span>{siteConfig.hoursShort}</span>
            <span className="hidden text-line-strong sm:inline" aria-hidden="true">•</span>
            <span>Blumenau • SC</span>
            <span className="hidden text-line-strong sm:inline" aria-hidden="true">•</span>
            <span>Desde {siteConfig.foundedYear}</span>
            {status && !siteConfig.hoursIsPlaceholder && (
              <>
                <span className="hidden text-line-strong sm:inline" aria-hidden="true">•</span>
                <span className={status.open ? "text-accent" : "text-ink-muted"}>{status.label}</span>
              </>
            )}
          </motion.div>
        </div>
        <BrandWatermark />
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce text-ink-muted" />
      </motion.div>
    </section>
  );
}
