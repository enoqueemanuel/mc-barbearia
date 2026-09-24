import { NextResponse } from "next/server";
import { barbershop } from "@/data/barbershop";
import { buildSystemPrompt } from "@/lib/chat/prompts";
import { UNKNOWN_REPLY } from "@/lib/chat/actions";
import type { ChatApiMessage } from "@/lib/chat/types";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 800;
const MAX_MESSAGES = 20;
const AI_TIMEOUT_MS = 15_000;
const AI_MODEL = "claude-haiku-4-5-20251001";

// Limitador simples em memória (por instância do servidor). Em produção
// com múltiplas instâncias, trocar por um armazenamento compartilhado
// (ex. Redis/Upstash) — deixado pronto para essa troca.
const requestLog = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(key);
  if (!entry || now > entry.resetAt) {
    requestLog.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

function isValidMessage(m: unknown): m is ChatApiMessage {
  if (typeof m !== "object" || m === null) return false;
  const { role, content } = m as Record<string, unknown>;
  if (role !== "user" && role !== "assistant") return false;
  if (typeof content !== "string") return false;
  if (content.trim().length === 0 || content.length > MAX_MESSAGE_LENGTH) return false;
  return true;
}

export async function POST(request: Request) {
  const clientKey = request.headers.get("x-forwarded-for") ?? "local";
  if (!checkRateLimit(clientKey)) {
    return NextResponse.json(
      { reply: "Muitas mensagens em pouco tempo. Espera um instante e tenta de novo." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ reply: "Não consegui ler essa mensagem." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ reply: "Manda uma mensagem para eu poder ajudar." }, { status: 400 });
  }
  if (messages.length > MAX_MESSAGES || !messages.every(isValidMessage)) {
    return NextResponse.json({ reply: "Essa conversa ficou grande ou inválida demais para eu processar." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: UNKNOWN_REPLY });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: AI_MODEL,
        max_tokens: 400,
        system: buildSystemPrompt(barbershop),
        messages: (messages as ChatApiMessage[]).map((m) => ({ role: m.role, content: m.content })),
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      return NextResponse.json({ reply: UNKNOWN_REPLY });
    }

    const data = (await res.json()) as { content?: { text?: string }[] };
    const reply = data.content?.[0]?.text?.trim();
    return NextResponse.json({ reply: reply || UNKNOWN_REPLY });
  } catch {
    return NextResponse.json({
      reply: "Estamos com instabilidade agora. Posso te direcionar para nossa equipe no WhatsApp.",
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
