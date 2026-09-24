"use client";

import { ArrowUpRight } from "lucide-react";
import { bookingHref } from "@/lib/booking";

export function ChooseService({ name, duplicate = false }: { slug: string; name: string; duplicate?: boolean }) {
  return (
    <a
      href={bookingHref()}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-label={`Consultar ${name} na agenda`}
      className="group/choose mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent"
    >
      Consultar agenda
      <ArrowUpRight size={16} className="transition-transform group-hover/choose:-translate-y-0.5 group-hover/choose:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
    </a>
  );
}
