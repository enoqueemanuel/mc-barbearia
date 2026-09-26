import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({
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
        "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em]",
        light ? "text-canvas/60" : "text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
