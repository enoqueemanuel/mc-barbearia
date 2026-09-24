import { siteConfig } from "@/data/site";

const DEFAULT_MESSAGE = "Olá! Vim pelo site da MC Barbearia e gostaria de mais informações.";

/** Gera um link wa.me com mensagem pré-definida (uma genérica por padrão,
 * ou uma específica para o contexto do CTA que está chamando). */
export function whatsappHref(message: string = DEFAULT_MESSAGE) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
