import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function IndexedRow({
  index,
  className,
  children,
}: {
  index: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex items-baseline gap-5 border-b border-line py-6 sm:gap-8", className)}>
      <span className="shrink-0 pt-1 font-mono text-sm text-accent">{index}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
