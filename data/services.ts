import type { Service } from "@/types/content";

/**
 * Preços e tempos são exemplos (placeholder) para o layout ficar completo.
 * Troque pelos valores reais quando o cliente confirmar a tabela de preços.
 * A Home destaca os mais procurados e exibe os demais em autorrolagem.
 * A rota /servicos também mantém a lista para acesso direto.
 */
export const services: Service[] = [
  {
    slug: "corte",
    name: "Corte",
    description: "Corte com acabamento na navalha, lavagem e finalização.",
    price: "R$ 30–35",
    duration: "40 min",
    popular: true,
  },
  {
    slug: "barba",
    name: "Barba",
    description: "Modelagem completa com toalha quente e produtos de barbearia.",
    price: "R$ 30–35",
    duration: "30 min",
    popular: true,
  },
  {
    slug: "corte-barba",
    name: "Corte + Barba",
    description: "O combo completo: cabelo e barba na mesma sessão.",
    price: "R$ 55–65",
    duration: "60 min",
  },
  {
    slug: "sobrancelha",
    name: "Sobrancelha",
    description: "Design e alinhamento na navalha.",
    price: "R$ 20",
    duration: "15 min",
  },
  {
    slug: "freestyle",
    name: "Freestyle",
    description: "Desenhos e acabamentos personalizados no degradê.",
    price: "R$ 30",
    duration: "20 min",
  },
  {
    slug: "limpeza-de-pele",
    name: "Limpeza de Pele",
    description: "Limpeza profunda para renovar a pele do rosto.",
    price: "R$ 60",
    duration: "40 min",
    popular: true,
  },
  {
    slug: "mascara-black",
    name: "Máscara Black",
    description: "Máscara detox para desintoxicar e iluminar a pele.",
    price: "R$ 25",
    duration: "15 min",
  },
  {
    slug: "corte-limpeza-de-pele",
    name: "Corte + Limpeza de Pele",
    description: "O combo completo: corte e limpeza profunda na mesma sessão.",
    price: "R$ 85",
    duration: "A confirmar",
  },
  {
    slug: "esfoliacao-facial",
    name: "Esfoliação Facial",
    description: "Remove células mortas e prepara a pele para os cuidados.",
    price: "R$ 35",
    duration: "20 min",
  },
  {
    slug: "depilacao-nasal",
    name: "Depilação Nasal",
    description: "Remoção rápida e higiênica dos pelos do nariz.",
    price: "R$ 15",
    duration: "10 min",
  },
];

/**
 * Principais, mostrados na Home — lidera com os mais procurados (Corte,
 * Barba, Limpeza de Pele), depois completa com mais 2 para fechar 5.
 */
const featuredSlugs = ["corte", "barba", "limpeza-de-pele", "corte-barba", "sobrancelha"];
export const featuredServices = featuredSlugs
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is Service => s !== undefined);
