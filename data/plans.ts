import type { Plan } from "@/types/content";

/** Serviços e valores informados pela barbearia. */
export const plans: Plan[] = [
  {
    slug: "silver",
    name: "Assinatura Silver",
    price: "R$ 89,90",
    period: "/mês",
    description: "Para quem quer manter o corte sempre em dia, sem pensar em agenda.",
    benefits: [
      "Corte de cabelo",
      "Sobrancelha",
      "De segunda a quinta-feira",
    ],
    rules: ["Uso pessoal e intransferível"],
  },
  {
    slug: "premium",
    name: "Assinatura Premium",
    price: "R$ 129,90",
    period: "/mês",
    description: "Corte, barba e sobrancelha para cuidar do seu estilo todo mês.",
    benefits: [
      "Corte de cabelo",
      "Sobrancelha",
      "Barba",
      "De segunda a quinta-feira",
    ],
    rules: ["Uso pessoal e intransferível"],
    highlighted: true,
  },
];
