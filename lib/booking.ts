import { siteConfig } from "@/data/site";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Destino do CTA genérico "Agendar Horário": o sistema de agendamento
 * externo quando configurado (NEXT_PUBLIC_BOOKING_URL), com o WhatsApp
 * como retorno automático enquanto não houver um configurado.
 */
export function bookingHref(): string {
  return siteConfig.bookingUrl || whatsappHref("Olá! Vim pelo site e quero agendar um horário.");
}
