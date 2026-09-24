import { barbershop } from "@/data/barbershop";
import { bookingHref } from "@/lib/booking";
import { whatsappHref } from "@/lib/whatsapp";
import type { ChatCta, ChatMessage, QuickAction } from "@/lib/chat/types";

type BotReply = Pick<ChatMessage, "content" | "quickActions" | "cta">;

const BACK_TO_START: QuickAction = { id: "root", label: "Voltar ao início" };

const ROOT_ACTIONS: QuickAction[] = [
  { id: "agendar", label: "Agendar horário" },
  { id: "servicos", label: "Serviços e valores" },
  { id: "planos", label: "Planos" },
  { id: "equipe", label: "Conhecer a equipe" },
  { id: "horarios", label: "Horários" },
  { id: "localizacao", label: "Como chegar" },
  { id: "whatsapp", label: "Falar no WhatsApp" },
];

export const UNKNOWN_REPLY =
  "Não tenho essa informação disponível no momento. Posso te direcionar para nossa equipe no WhatsApp.";

const BOOKING_REPLY =
  "Você pode consultar os horários disponíveis em tempo real pelo nosso sistema de agendamento.";

export function welcomeReply(): BotReply {
  return {
    content:
      "Olá! 👋 Sou o assistente da MC Barbearia.\n\nPosso te ajudar com serviços, valores, horários, planos ou agendamento.",
    quickActions: ROOT_ACTIONS,
  };
}

function bookingCta(): ChatCta {
  return { label: "Ver Horários Disponíveis", href: bookingHref(), external: true };
}

function serviceQuickActions(): QuickAction[] {
  return [
    ...barbershop.services.slice(0, 5).map((s) => ({ id: `servico:${s.slug}`, label: s.name })),
    { id: "servicos:todos", label: "Ver todos" },
  ];
}

function planSummary(): string {
  return barbershop.plans
    .map((p) => `${p.name} — ${p.price}${p.period}\n${p.benefits.slice(0, 3).join(" · ")}`)
    .join("\n\n");
}

/** Roteamento de uma ação de botão (quick action) para a resposta do bot.
 * Tudo aqui vem de /data/barbershop.ts — nada é inventado. */
export function handleAction(actionId: string): BotReply {
  if (actionId === "agendar") {
    return {
      content: BOOKING_REPLY,
      cta: bookingCta(),
      quickActions: [BACK_TO_START],
    };
  }

  if (actionId === "servicos") {
    return {
      content: "Qual serviço você quer consultar?",
      quickActions: serviceQuickActions(),
    };
  }

  if (actionId === "servicos:todos") {
    return {
      content: "Você confere a lista completa, com todos os preços e tempos, na página de serviços.",
      cta: { label: "Ver Todos os Serviços", href: "/servicos" },
      quickActions: [BACK_TO_START],
    };
  }

  if (actionId.startsWith("servico:")) {
    const slug = actionId.replace("servico:", "");
    const service = barbershop.services.find((s) => s.slug === slug);
    if (!service) return { content: UNKNOWN_REPLY, quickActions: [BACK_TO_START] };
    return {
      content: `${service.name}\n${service.description}\n\n${service.price} · ${service.duration}`,
      cta: {
        label: "Agendar Este Serviço",
        href: whatsappHref(`Olá! Vim pelo chat do site e quero agendar: ${service.name}.`),
        external: true,
      },
      quickActions: [{ id: "servicos", label: "Ver outros serviços" }, BACK_TO_START],
    };
  }

  if (actionId === "planos") {
    return {
      content: planSummary(),
      cta: { label: "Ver Planos", href: "/planos" },
      quickActions: [BACK_TO_START],
    };
  }

  if (actionId === "equipe") {
    return {
      content: "Quer agendar com qual profissional?",
      quickActions: [
        ...barbershop.barbers.map((b) => ({ id: `equipe:${b.slug}`, label: b.shortName })),
        BACK_TO_START,
      ],
    };
  }

  if (actionId.startsWith("equipe:")) {
    const slug = actionId.replace("equipe:", "");
    const barber = barbershop.barbers.find((b) => b.slug === slug);
    if (!barber) return { content: UNKNOWN_REPLY, quickActions: [BACK_TO_START] };
    return {
      content: `${barber.name}\n${barber.role}`,
      cta: {
        label: `Agendar com ${barber.shortName}`,
        href: whatsappHref(`Olá! Vim pelo chat do site e quero agendar com ${barber.shortName}.`),
        external: true,
      },
      quickActions: [{ id: "equipe", label: "Ver outros profissionais" }, BACK_TO_START],
    };
  }

  if (actionId === "horarios") {
    return {
      content: barbershop.openingHoursSummary,
      quickActions: [BACK_TO_START],
    };
  }

  if (actionId === "localizacao") {
    return {
      content: barbershop.address.full,
      cta: { label: "Ver Rota", href: barbershop.googleMapsDirectionsUrl, external: true },
      quickActions: [BACK_TO_START],
    };
  }

  if (actionId === "whatsapp") {
    return {
      content: "Prefere falar com nossa equipe?",
      cta: {
        label: "Chamar no WhatsApp",
        href: whatsappHref("Olá! Vim pelo site da MC Barbearia e gostaria de atendimento."),
        external: true,
      },
      quickActions: [BACK_TO_START],
    };
  }

  return welcomeReply();
}

const BOOKING_KEYWORDS = [
  "agendar",
  "agenda",
  "marcar",
  "marca",
  "horário disponível",
  "horario disponivel",
  "tem horário",
  "tem horario",
  "vaga",
  "vaga hoje",
];

/** Frases como "quero agendar" ou "marcar com Matheus" caem direto na
 * resposta de agendamento — nunca na IA, nunca inventando disponibilidade. */
export function matchesBookingIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return BOOKING_KEYWORDS.some((keyword) => lower.includes(keyword));
}

export function bookingIntentReply(): BotReply {
  return {
    content: BOOKING_REPLY,
    cta: bookingCta(),
    quickActions: [BACK_TO_START],
  };
}
