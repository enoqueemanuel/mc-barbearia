import type { Plan } from "@/types/content";

/** Valores e benefícios são placeholders. Ajustar com os planos reais do cliente. */
export const plans: Plan[] = [
  {
    slug: "silver",
    name: "Plano Silver",
    price: "R$ 129",
    period: "/mês",
    description: "Para quem quer manter o corte sempre em dia, sem pensar em agenda.",
    benefits: [
      "2 cortes por mês",
      "10% de desconto em produtos",
      "Prioridade no agendamento",
    ],
    rules: ["Fidelidade mínima de 3 meses", "Cortes não acumulam para o mês seguinte"],
  },
  {
    slug: "premium",
    name: "Plano Premium",
    price: "R$ 199",
    period: "/mês",
    description: "A experiência completa da MC, todo mês, sem limites de corte.",
    benefits: [
      "Cortes ilimitados",
      "Barba inclusa em cada visita",
      "Bebida de cortesia",
      "Acesso antecipado a promoções",
    ],
    rules: ["Fidelidade mínima de 3 meses", "Uso pessoal e intransferível"],
    highlighted: true,
  },
];
