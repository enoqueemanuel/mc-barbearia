"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navItems } from "@/data/nav";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { bookingHref } from "@/lib/booking";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrollHeader(80);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        scrolled || menuOpen ? "border-line bg-canvas/80 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-20" : "h-24",
          )}
        >
          <Link href="#inicio" className="font-display text-xl font-semibold tracking-tight text-ink">
            MC <span className="text-accent">Barbearia</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-1 font-sans text-sm uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-premium group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href={bookingHref()} external>
              Agendar Horário
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
