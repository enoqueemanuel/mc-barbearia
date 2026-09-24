import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Plans } from "@/components/sections/Plans";

export const metadata: Metadata = {
  title: "Assinaturas",
  description: "Assinaturas da MC Barbearia em Blumenau, SC: Silver e Premium.",
  alternates: { canonical: "/planos" },
};

export default function PlanosPage() {
  return (
    <div className="bg-canvas pt-40 sm:pt-48">
      <Container>
        <Link
          href="/#planos"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para a home
        </Link>
      </Container>

      <div className="mt-8">
        <Plans />
      </div>
    </div>
  );
}
