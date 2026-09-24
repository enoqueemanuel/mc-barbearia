import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { plans } from "@/data/plans";
import { team } from "@/data/team";

/**
 * Única fonte de dados comerciais para o chatbot (e qualquer outra coisa
 * que precise "conhecer" o negócio). Reaproveita os arquivos de dados que
 * já existem — não duplica nada, só organiza no formato que o chat consome.
 */
export const barbershop = {
  name: siteConfig.brandName,
  legalName: siteConfig.legalName,
  address: siteConfig.address,
  whatsappNumber: siteConfig.whatsappNumber,
  instagram: siteConfig.social.instagram,
  bookingUrl: siteConfig.bookingUrl,
  googleMapsDirectionsUrl: siteConfig.googleMapsDirectionsUrl,
  openingHoursSummary: `${siteConfig.hoursShort}, 09:00–20:00 (sábado até 18:00). Domingo fechado.`,
  hours: siteConfig.hours,
  services,
  plans,
  barbers: team,
} as const;

export type Barbershop = typeof barbershop;
