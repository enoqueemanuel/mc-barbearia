import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  eyebrowIndex,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  eyebrowIndex?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          <SectionLabel index={eyebrowIndex}>{eyebrow}</SectionLabel>
        </Reveal>
      )}
      <Reveal delay={0.1}>
      <h2 className="text-balance mt-4 font-display text-display-lg font-medium text-ink">
        {title}
      </h2>
      </Reveal>
      {description && <Reveal delay={0.2}><p className="mt-5 text-lg leading-relaxed text-ink-muted">{description}</p></Reveal>}
    </div>
  );
}
