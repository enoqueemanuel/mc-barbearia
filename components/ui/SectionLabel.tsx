import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  className,
  light,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]",
        light ? "text-canvas/60" : "text-accent",
        className,
      )}
    >
      {index && <span className={light ? "text-canvas/40" : "text-ink-muted"}>{index}</span>}
      {children}
    </span>
  );
}
