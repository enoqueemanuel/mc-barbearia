import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { ServiceRow } from "@/components/ui/ServiceRow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Corte, barba, sobrancelha e cuidados faciais na MC Barbearia em Blumenau, SC. Veja preços e tempo estimado de cada serviço.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <div className="bg-canvas pb-24 pt-40 sm:pt-48">
      <Container>
        <Link
          href="/#servicos"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para a home
        </Link>

        <Reveal>
          <h1 className="mt-8 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
            Serviços
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-muted">
            Cada serviço da {siteConfig.brandName} pensado para o resultado sair na régua, do
            corte ao cuidado facial completo.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-12 lg:grid-cols-2">
          {services.map((service, i) => (
            <ServiceRow key={service.slug} service={service} index={i} headingLevel="h2" />
          ))}
        </div>

        <Reveal className="mt-16">
          <Button href={bookingHref()} external size="lg">
            Agendar Agora
          </Button>
        </Reveal>
      </Container>
    </div>
  );
}
