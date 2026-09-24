"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/nav";

export function useActiveSection() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navItems.map((item) => document.getElementById(item.href.split("#")[1]))
      .filter((element): element is HTMLElement => element !== null);
    let frame = 0;
    function update() {
      frame = 0;
      const threshold = Math.min(window.innerHeight * 0.35, 260);
      const section = sections.filter((element) => element.getBoundingClientRect().top <= threshold)
        .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];
      setActive(section ? `/#${section.id}` : "/#inicio");
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);
  return pathname === "/" ? active : "";
}
