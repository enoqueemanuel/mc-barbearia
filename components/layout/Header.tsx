"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navItems } from "@/data/nav";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { bookingHref } from "@/lib/booking";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrollHeader(80);
  const activeSection = useActiveSection();
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
          <Link
            href="/#inicio"
            onClick={(event) => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              if (window.location.pathname !== "/") return;
              event.preventDefault();
              window.history.replaceState(window.history.state, "", "/#inicio");
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              });
            }}
            className="font-display text-xl font-semibold tracking-tight text-ink"
          >
            MACEDO <span className="text-accent">Barbearia</span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.href ? "location" : undefined}
                className={cn("group relative py-1 font-sans text-sm uppercase tracking-[0.08em] transition-colors hover:text-ink", activeSection === item.href ? "text-accent" : "text-ink-muted")}
              >
                {item.label}
                <span className={cn("absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-premium group-hover:scale-x-100", activeSection === item.href ? "scale-x-100" : "scale-x-0")} />
              </a>
            ))}
          </nav>

          <div className="hidden xl:block">
            <Button href={bookingHref()} external>
              Agendar Horário
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center text-ink xl:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
