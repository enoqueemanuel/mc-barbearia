import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 2xl:px-16", className)}>
      {children}
    </div>
  );
}
