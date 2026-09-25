/**
 * Fonte única dos dados do negócio e das integrações externas. Tudo
 * marcado "placeholder" ou `null` abaixo deve ser confirmado com o
 * cliente antes de publicar em produção — nenhum valor aqui foi
 * inventado para preencher espaço.
 */
export const siteConfig = {
  brandName: "MC Barbearia",
  legalName: "Barbearia Macedo",
  tagline: "As máquinas fazem o corte. As pessoas fazem a barbearia.",
  description:
    "Barbearia premium em Blumenau, SC. Corte, barba e cuidado masculino com técnica, ambiente e atendimento de alto nível.",
  url: "https://mc-barbearia.vercel.app",

  phoneDisplay: "(47) 98462-7509",
  /** Sobrescrevível via NEXT_PUBLIC_WHATSAPP_NUMBER (só dígitos, com DDI 55). */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5547984627509",

  /**
   * URL do sistema externo de agendamento (ex.: agendas.link, Trinks,
   * Booksy). Configurada via NEXT_PUBLIC_BOOKING_URL. Quando ausente, os
   * CTAs de agendamento caem no WhatsApp automaticamente (ver lib/booking.ts).
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,

  email: "contato@mcbarbearia.com.br",

  address: {
    street: "Rua Santa Maria",
    number: "10",
    neighborhood: "Progresso",
    city: "Blumenau",
    state: "SC",
    postalCode: "89027-201",
    country: "BR",
    full: "R. Santa Maria, 10 - Progresso, Blumenau - SC, 89027-201",
  },

  /**
   * Latitude/longitude reais para o JSON-LD (schema.org geo). Não
   * preenchido para não inventar coordenada. Para pegar o valor real:
   * abra o local no Google Maps, clique com o botão direito no pino e
   * copie os números que aparecem no topo do menu.
   */
  geo: {
    latitude: null as number | null,
    longitude: null as number | null,
  },

  logoUrl: "https://mc-barbearia.vercel.app/brand-logo.png",

  social: {
    instagram: "https://www.instagram.com/barbeariamacedo.m/",
    instagramHandle: "@barbeariamacedo.m",
    googleProfile: "https://share.google/O92kISXaAnz7CHQp6",
  },

  /** Link "Ver no Google Maps" / prova social, construído a partir do endereço real. */
  googleMapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Barbearia+Macedo+Rua+Santa+Maria+10+Progresso+Blumenau+SC",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=R.+Santa+Maria%2C+10+-+Progresso%2C+Blumenau+-+SC%2C+89027-201",
  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=R.+Santa+Maria,+10+-+Progresso,+Blumenau+-+SC,+89027-201&output=embed",

  hours: [
    { day: "Segunda", value: "09:00 – 20:00" },
    { day: "Terça", value: "09:00 – 20:00" },
    { day: "Quarta", value: "09:00 – 20:00" },
    { day: "Quinta", value: "09:00 – 20:00" },
    { day: "Sexta", value: "09:00 – 20:00" },
    { day: "Sábado", value: "09:00 – 18:00" },
    { day: "Domingo", value: "Fechado" },
  ],
  hoursIsPlaceholder: true,
  hoursShort: "Segunda a Sábado",

  foundedYear: 2023,

  /** Formato usado no JSON-LD (schema.org openingHours). */
  openingHoursSpecification: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
    { days: ["Saturday"], opens: "09:00", closes: "18:00" },
  ],
};

export function isOpenNow(date: Date = new Date()): { open: boolean; label: string } {
  const local = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const part = (type: string) => local.find((value) => value.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(part("weekday"));
  const minutes = Number(part("hour")) * 60 + Number(part("minute"));

  if (day === 0) return { open: false, label: "Fechado hoje — abre segunda às 09:00" };

  const isSaturday = day === 6;
  const opens = 9 * 60;
  const closes = isSaturday ? 18 * 60 : 20 * 60;

  if (minutes < opens) return { open: false, label: `Abre hoje às 09:00` };
  if (minutes >= closes) return { open: false, label: isSaturday ? "Fechado — abre segunda às 09:00" : "Fechado — abre amanhã às 09:00" };
  return { open: true, label: `Aberto agora — fecha às ${isSaturday ? "18:00" : "20:00"}` };
}
