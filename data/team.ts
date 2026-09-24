import type { TeamMember } from "@/types/content";

/**
 * Fotos e bios reais, confirmadas pelo cliente. `role` é um resumo curto
 * feito a partir da bio de cada um, para o rótulo mono acima do nome.
 */
export const team: TeamMember[] = [
  {
    slug: "marco-macedo",
    name: "Marco Macedo",
    shortName: "Marco",
    role: "Agilidade e liderança",
    bio: "Conhecido pela agilidade e qualidade nos cortes, mesmo nos dias mais movimentados. Tem experiência em liderança e sabe manter o padrão do trabalho em qualquer situação.",
    image: "/images/team/marco-macedo.jpg",
    imageAlt: "Retrato de Marco Macedo, barbeiro da MC Barbearia",
    imageWidth: 1572,
    imageHeight: 2048,
  },
  {
    slug: "matheus-araujo",
    name: "Matheus Araújo",
    shortName: "Matheus",
    role: "Degradê e freestyle",
    bio: "Especialista em degradê e tesoura, com destaque para freestyle e desenhos no corte. Tem facilidade em entender o estilo de cada cliente e transformar a ideia em um visual personalizado.",
    image: "/images/team/matheus-araujo.jpg",
    imageAlt: "Retrato de Matheus Araújo, barbeiro da MC Barbearia",
    imageWidth: 1058,
    imageHeight: 1487,
  },
  {
    slug: "rai-santos",
    name: "Raí Santos",
    shortName: "Raí",
    role: "Degradês e cortes infantis",
    bio: "Especialista em degradês como Mid Fade e Low Fade, sempre buscando precisão nos detalhes. Seu atendimento é cuidadoso e tem um ótimo jeito para trabalhar com cortes infantis.",
    image: "/images/team/rai-santos.jpg",
    imageAlt: "Retrato de Raí Santos, barbeiro da MC Barbearia",
    imageWidth: 1212,
    imageHeight: 1298,
  },
];
