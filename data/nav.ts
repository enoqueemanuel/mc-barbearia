import type { NavItem } from "@/types/content";

// Âncoras com "/#" (não só "#") para funcionar a partir de qualquer
// página (/servicos, /planos), não só da Home.
export const navItems: NavItem[] = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Equipe", href: "/#equipe" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Planos", href: "/planos" },
  { label: "Galeria", href: "/#galeria" },
  { label: "Contato", href: "/#localizacao" },
];
