"use client";

import { useEffect } from "react";

/**
 * O navegador tenta restaurar a posição de scroll ao recarregar a página.
 * Aqui a gente desliga isso e força o topo — exceto quando a URL já tem
 * uma âncora (#servicos etc.), que deve continuar rolando até ela.
 */
export function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
