import type { NavItem } from "@/types/content";

// Âncoras com "/#" (não só "#") para funcionar a partir de qualquer
// página (/servicos, /planos), não só da Home.
export const navItems: NavItem[] = [
  { label: "Início", href: "/#inicio" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Equipe", href: "/#equipe" },
  { label: "Galeria", href: "/#galeria" },
  { label: "Assinaturas", href: "/#planos" },
  { label: "Contato", href: "/#localizacao" },
];
