export type ChatRole = "user" | "assistant";

export type QuickAction = {
  id: string;
  label: string;
};

export type ChatCta = {
  label: string;
  href: string;
  external?: boolean;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  quickActions?: QuickAction[];
  cta?: ChatCta;
};

/** Formato enviado para /api/chat — só o essencial, sem os campos de UI. */
export type ChatApiMessage = {
  role: ChatRole;
  content: string;
};
