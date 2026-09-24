import { barbershop } from "@/data/barbershop";
import { bookingHref } from "@/lib/booking";
import { whatsappHref } from "@/lib/whatsapp";
import type { ChatCta, ChatMessage, QuickAction } from "@/lib/chat/types";

type BotReply = Pick<ChatMessage, "content" | "quickActions" | "cta">;

const BACK_TO_START: QuickAction = { id: "root", label: "Voltar ao início" };

const ROOT_ACTIONS: QuickAction[] = [
  { id: "agendar", label: "Agendar horário" },
  { id: "servicos", label: "Serviços e valores" },
  { id: "planos", label: "Assinaturas" },
  { id: "equipe", label: "Conhecer a equipe" },
  { id: "horarios", label: "Horários" },
  { id: "localizacao", label: "Como chegar" },
  { id: "whatsapp", label: "Falar no WhatsApp" },
];

export const UNKNOWN_REPLY =
  "Não tenho essa informação disponível no momento. Posso te direcionar para nossa equipe no WhatsApp.";

const BOOKING_REPLY =
  "Ainda não consigo consultar os horários livres por aqui. Na agenda você escolhe o serviço, o barbeiro e vê os dias e horários disponíveis.";

export function welcomeReply(): BotReply {
  return {
    content:
      "Oi! 👋 Sou o assistente da Macedo Barbearia. Pode escrever sua dúvida: te ajudo com cortes, barba, valores e como agendar. O que você está procurando?",
    quickActions: ROOT_ACTIONS.slice(0, 3),
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
      content: barbershop.services.map((s) => `${s.name}: ${s.price}`).join("\n") + "\n\nQual deles você quer conhecer melhor?",
      cta: { label: "Ver Todos os Serviços", href: "/#todos-servicos" },
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
        label: "Consultar na agenda",
        href: bookingHref(),
        external: true,
      },
      quickActions: [{ id: "servicos", label: "Ver outros serviços" }, BACK_TO_START],
    };
  }

  if (actionId === "planos") {
    return {
      content: planSummary(),
      cta: { label: "Ver Assinaturas", href: "/#planos" },
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
        label: "Consultar na agenda",
        href: bookingHref(),
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

const PLAN_KEYWORDS = ["assinatura", "plano", "mensalidade", "pacote mensal"];

const SERVICE_KEYWORDS = [
  "serviço",
  "servico",
  "preço",
  "preco",
  "valor",
  "quanto custa",
  "quanto é",
  "quanto fica",
  "quanto cobra",
  "tabela de preço",
  "tabela de preco",
];

const TEAM_KEYWORDS = [
  "equipe",
  "barbeiro",
  "profissional",
  "quem corta",
  "quem atende",
  "quem faz",
];

const LOCATION_KEYWORDS = [
  "endereço",
  "endereco",
  "localização",
  "localizacao",
  "onde fica",
  "onde vocês",
  "onde voces",
  "como chegar",
  "no mapa",
  "qual rua",
];

const HOURS_KEYWORDS = [
  "horário de funcionamento",
  "horario de funcionamento",
  "que horas",
  "abrem",
  "fecham",
  "funciona",
  "está aberto",
  "esta aberto",
];

const HUMAN_KEYWORDS = [
  "falar com atendente",
  "falar com alguém",
  "falar com alguem",
  "atendente",
  "humano",
  "pessoa real",
  "falar com vocês",
  "falar com voces",
];

function textIncludesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

/** Tenta casar uma mensagem livre com uma das ações determinísticas já
 * existentes — primeiro por serviço/barbeiro citado pelo nome (resposta mais
 * precisa), depois por assunto geral. Reaproveita handleAction() para nunca
 * duplicar texto nem inventar informação; só cai na IA (ou no fallback) se
 * nada aqui bater. */
export function matchLocalIntent(text: string): BotReply | null {
  const lower = text.toLowerCase();

  const service = barbershop.services.find((s) => lower.includes(s.name.toLowerCase()));
  if (service) return handleAction(`servico:${service.slug}`);

  const barber = barbershop.barbers.find((b) => lower.includes(b.shortName.toLowerCase()));
  if (barber) return handleAction(`equipe:${barber.slug}`);

  if (textIncludesAny(lower, PLAN_KEYWORDS)) return handleAction("planos");
  if (textIncludesAny(lower, SERVICE_KEYWORDS)) return handleAction("servicos");
  if (textIncludesAny(lower, TEAM_KEYWORDS)) return handleAction("equipe");
  if (textIncludesAny(lower, LOCATION_KEYWORDS)) return handleAction("localizacao");
  if (textIncludesAny(lower, HOURS_KEYWORDS)) return handleAction("horarios");
  if (textIncludesAny(lower, HUMAN_KEYWORDS)) return handleAction("whatsapp");

  return null;
}
