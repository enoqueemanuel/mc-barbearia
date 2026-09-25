import { barbershop } from "@/data/barbershop";
import { handleAction } from "@/lib/chat/actions";
import { whatsappHref } from "@/lib/whatsapp";
import type { ChatApiMessage, ChatMessage } from "@/lib/chat/types";

type Reply = Pick<ChatMessage, "content" | "quickActions" | "cta">;
const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const has = (text: string, expression: RegExp) => expression.test(text);

function findService(text: string) {
  const names = [...barbershop.services].sort((a, b) => b.name.length - a.name.length);
  const exact = names.find((s) => (` ${text} `).includes(` ${normalize(s.name)} `));
  if (has(text, /\b(corte|cabelo|cortar)\b/) && has(text, /\bbarba\b/)) return names.find((s) => s.slug === "corte-barba");
  if (has(text, /\b(corte|cabelo|cortar)\b/) && has(text, /limpeza.*pele/)) return names.find((s) => s.slug === "corte-limpeza-de-pele");
  if (exact) return exact;
  const aliases: [RegExp, string][] = [
    [/\b(cabelo|cortar|cortar cabelo|degrade|fade|corte infantil)\b/, "corte"],
    [/\b(barba|barbear)\b/, "barba"], [/\b(sobrancelha|sombrancelha)\b/, "sobrancelha"],
    [/\b(desenho|freestyle)\b/, "freestyle"], [/limpeza.*pele/, "limpeza-de-pele"],
    [/\b(nariz|nasal)\b/, "depilacao-nasal"],
  ];
  const alias = aliases.find(([pattern]) => pattern.test(text));
  return alias ? names.find((s) => s.slug === alias[1]) : undefined;
}

/** Conversa local: usa o histórico e os dados do site, sem chamadas pagas. */
export function conversationReply(raw: string, history: ChatApiMessage[] = []): Reply {
  const text = normalize(raw);
  const previous = [...history].reverse();
  const lastAssistant = previous.find((m) => m.role === "assistant")?.content ?? "";
  const explicitService = findService(text);
  const priorService = previous.filter((m) => m.role === "user").map((m) => findService(normalize(m.content))).find(Boolean);
  const contextual = has(text, /\b(quanto|valor|preco|demora|duracao|tempo|esse|este|ele|isso|agendar|marcar|quero|pode|sim)\b/);
  const service = explicitService ?? (contextual ? priorService : undefined);
  const barber = barbershop.barbers.find((b) => (` ${text} `).includes(` ${normalize(b.shortName)} `));
  const priorBarber = previous.filter((m) => m.role === "user").map((m) =>
    barbershop.barbers.find((b) => (` ${normalize(m.content)} `).includes(` ${normalize(b.shortName)} `))).find(Boolean);
  const booking = has(text, /\b(agendar|agendamento|marcar|reservar|reserva|vagas?)\b|tem horario|horarios? disponive(?:l|is)|dias? disponive(?:l|is)|horarios? livres?|quem (tem|esta).*disponivel|quais dias.*atende/) ||
    (has(text, /\b(hoje|amanha|as [0-9]|[0-9]+h)\b/) && /agendar|agendamento|horario/.test(normalize(lastAssistant)));
  const affirmative = /^(sim|quero|quero sim|pode ser|pode|isso|bora|vamos|ok)$/.test(text);

  if (has(text, /nao (quero|vou|preciso).*\b(agendar|marcar|reservar)\b/)) return {
    content: "Tudo bem, podemos só tirar suas dúvidas. O que você gostaria de saber?",
  };
  if (has(text, /^(mudar|manter|quero mudar|quero manter)/) && /manter o estilo/.test(lastAssistant)) return {
    content: "Entendi! Conte ao barbeiro o que você gosta no seu cabelo e o que gostaria de mudar. Se tiver uma foto de referência, leve no atendimento para vocês escolherem o corte juntos.",
    quickActions: [{ id: "equipe", label: "Conhecer a equipe" }, { id: "agendar", label: "Ver como agendar" }],
  };
  if (has(text, /\b(recomenda|sugere|combina|indica)\b/)) return {
    content: "Você prefere manter o estilo ou mudar o visual? A equipe pode avaliar seu cabelo e indicar um corte no atendimento. O Matheus trabalha com degradê e freestyle; o Raí também tem experiência com degradês e cortes infantis.",
    quickActions: [{ id: "equipe", label: "Conhecer os barbeiros" }],
  };

  if (has(text, /\b(cancelar|cancelamento|remarcar|reagendar)\b/)) return {
    content: "Para alterar ou cancelar um horário, fale com a equipe. Não consigo modificar reservas por aqui.",
    cta: { label: "Alterar meu agendamento", href: whatsappHref(`Olá! Preciso de ajuda com meu agendamento: ${raw}`), external: true },
  };
  if (has(text, /\b(atendente|humano|whatsapp|zap)\b|falar com (alguem|voces|uma pessoa)/)) return handleAction("whatsapp");
  if (has(text, /\b(pix|cartao|dinheiro|pagamento|estacionamento|estacionar|desconto|promocao)\b/)) return {
    content: "Essa informação ainda não está confirmada aqui. A equipe pode te responder pelo WhatsApp.",
    cta: { label: "Perguntar à equipe", href: whatsappHref(`Olá! Gostaria de saber: ${raw}`), external: true },
  };

  if (booking || (affirmative && /consultar os horários|quer agendar|quer marcar/i.test(lastAssistant))) {
    const professional = barber ?? priorBarber;
    const detail = [service?.name, professional ? `com ${professional.shortName}` : ""].filter(Boolean).join(" ");
    return {
      content: `${detail ? `Para ${detail}, consulte a agenda.` : "Você pode consultar a agenda."} Ainda não tenho acesso aos horários livres por aqui. Escolha o serviço e o profissional diretamente na agenda para ver a disponibilidade. Nenhuma reserva foi feita pelo chat.`,
      cta: handleAction("agendar").cta,
    };
  }

  const parts: string[] = [];
  let cta: Reply["cta"];
  let quickActions: Reply["quickActions"];
  const priorPlan = barbershop.plans.find((p) => normalize(lastAssistant).includes(normalize(p.name)));
  if (has(text, /\b(plano|planos|assinatura|assinaturas|mensalidade|silver|premium)\b/) ||
      (!explicitService && priorPlan && has(text, /\b(quanto|preco|valor|inclui|beneficio|beneficios|fidelidade|regras)\b/))) {
    const namedPlans = barbershop.plans.filter((p) => text.includes(p.slug));
    const generalQuestion = has(text, /\b(planos|assinaturas|ambos|dois|diferenca|comparar)\b/);
    const plan = namedPlans.length === 1 ? namedPlans[0] : namedPlans.length > 1 || generalQuestion ? undefined :
      (barbershop.plans.filter((p) => normalize(lastAssistant).includes(normalize(p.name))).length === 1 ? priorPlan : undefined);
    parts.push(plan ? `${plan.name}: ${plan.price}${plan.period}.\n${plan.benefits.join("\n")}\n\n${plan.rules.join(" · ")}` : handleAction("planos").content);
    cta = { label: "Ver assinaturas", href: "/#planos" };
  } else if (service) {
    const durationOnly = has(text, /\b(demora|duracao|tempo|minutos)\b/) && !has(text, /\b(preco|valor|custa)\b/);
    parts.push(durationOnly
      ? `${service.name}: ${service.duration === "A confirmar" ? "a duração precisa ser confirmada com a equipe" : `o tempo estimado é de ${service.duration}`}.`
      : `${service.name}: ${service.price}. ${service.description}${service.duration === "A confirmar" ? "" : ` Tempo estimado: ${service.duration}.`}`);
    cta = handleAction(`servico:${service.slug}`).cta;
  } else if (has(text, /\b(preco|precos|valor|valores|custa|servico|servicos)\b|quanto (e|fica|cobra)/)) {
    parts.push("Você quer saber de qual serviço? Pode escrever o nome, por exemplo: corte, barba ou corte + barba.");
    quickActions = [{ id: "servico:corte", label: "Corte" }, { id: "servico:barba", label: "Barba" }, { id: "servico:corte-barba", label: "Corte + Barba" }];
  }
  if (barber) {
    parts.push(`${barber.name}: ${barber.bio}`);
    cta = handleAction(`equipe:${barber.slug}`).cta;
  } else if (has(text, /\b(equipe|barbeiro|barbeiros|profissional)\b|quem (corta|atende)/)) {
    parts.push(barbershop.barbers.map((b) => `${b.shortName}: ${b.role}.`).join("\n"));
    quickActions = handleAction("equipe").quickActions?.filter((a) => a.id !== "root");
  }
  if (has(text, /\b(endereco|localizacao|rua|bairro)\b|onde (fica|ficam|voces)|como chegar/)) {
    parts.push(`Estamos na ${barbershop.address.full}.`);
    cta = handleAction("localizacao").cta;
  }
  if (has(text, /\b(abre|abrem|aberto|fechado|fecha|fecham|funcionamento|sabado|domingo)\b|que horas|ate que horas/)) {
    parts.push(`O horário informado no site é: ${barbershop.openingHoursSummary} Para feriados ou disponibilidade de hoje, confirme com a equipe.`);
  }
  if (parts.length) return { content: parts.join("\n\n"), cta, quickActions };
  if (has(text, /^(oi+|ola|opa|e ai|bom dia|boa tarde|boa noite|tudo bem|tudo bom|beleza)\b/)) return {
    content: "Oi! Tudo bem? Me conta o que você está procurando: um corte, cuidar da barba ou tirar alguma dúvida? Pode escrever do seu jeito.",
  };
  if (has(text, /\b(obrigad[oa]|valeu|agradeco)\b/)) return { content: "Por nada! Se surgir outra dúvida, é só me chamar por aqui." };
  if (/^(nao|nao quero|agora nao|depois)$/.test(text)) return { content: "Sem problema! O que mais você gostaria de saber?" };
  if (affirmative) return { content: "Claro! Você quer consultar um serviço ou ver como agendar?", quickActions: [{ id: "servicos", label: "Serviços" }, { id: "agendar", label: "Agendar" }] };
  if (has(text, /\b(recomenda|sugere|combina|estilo|indica)\b/)) return {
    content: "Você prefere manter o estilo ou mudar o visual? A equipe pode avaliar seu cabelo e indicar um corte no atendimento. O Matheus trabalha com degradê e freestyle; o Raí também tem experiência com degradês e cortes infantis.",
    quickActions: [{ id: "equipe", label: "Conhecer os barbeiros" }],
  };
  return {
    content: "Não consegui entender essa parte. Você está falando de um serviço, de um horário ou de outra dúvida sobre a barbearia? Se preferir, posso te passar para a equipe.",
    quickActions: [{ id: "whatsapp", label: "Falar com a equipe" }],
  };
}
