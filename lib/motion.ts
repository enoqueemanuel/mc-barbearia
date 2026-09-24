import type { Variants } from "framer-motion";

export const easePremium = [0.22, 1, 0.36, 1] as const;

export const premiumTransition = { duration: 0.55, ease: easePremium };

// Os alvos das variants ficam livres de "transition" de propósito: o
// componente que as consome decide a transição (permite compor delay/
// duration por instância sem o valor da variant ser sobrescrito).
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1 },
};

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
