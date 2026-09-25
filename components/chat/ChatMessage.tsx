import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ChatMessage as ChatMessageType, QuickAction } from "@/lib/chat/types";
import { QuickActions } from "@/components/chat/QuickActions";
import { fadeUp, premiumTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ChatMessage({
  message,
  onSelectAction,
}: {
  message: ChatMessageType;
  onSelectAction: (action: QuickAction) => void;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeUp}
      transition={premiumTransition}
      className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
    >
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-line break-words rounded-xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-accent text-canvas" : "border border-line-strong bg-panel text-ink",
        )}
      >
        {message.content}
      </div>

      {message.cta && (
        <a
          href={message.cta.href}
          target={message.cta.external ? "_blank" : undefined}
          rel={message.cta.external ? "noopener noreferrer" : undefined}
          className="group mt-2 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-canvas transition-colors hover:bg-accent-hover"
        >
          {message.cta.label}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}

      {message.quickActions && message.quickActions.length > 0 && (
        <QuickActions actions={message.quickActions} onSelect={onSelectAction} />
      )}
    </motion.div>
  );
}
