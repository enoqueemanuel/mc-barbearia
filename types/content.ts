export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  name: string;
  description: string;
  /** Texto de exibição, ex. "R$ 50". Placeholder até o valor real ser confirmado. */
  price: string;
  duration: string;
  /** Um dos serviços mais procurados — ganha destaque visual na lista. */
  popular?: boolean;
};

export type TeamMember = {
  slug: string;
  name: string;
  /** Forma curta do nome, usada em textos como "Agendar com {shortName}". */
  shortName: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  instagram?: string;
};

export type Plan = {
  slug: string;
  name: string;
  price: string;
  period: string;
  description: string;
  benefits: string[];
  rules: string[];
  highlighted?: boolean;
};

export type Testimonial = {
  name: string;
  quote: string;
  source: string;
  authorUrl?: string;
};

export type GalleryCategory =
  | "cortes"
  | "barba"
  | "ambiente"
  | "detalhes"
  | "equipe"
  | "atendimento";

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
};

export type Differentiator = {
  index: string;
  title: string;
  description: string;
};

export type Stat = {
  value: string;
  label: string;
  isPlaceholder?: boolean;
};
