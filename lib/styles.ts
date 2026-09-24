/**
 * Tratamento fotográfico único do site: leve, quase invisível, para a foto
 * nunca perder nitidez ou qualidade. Nada de brightness/saturação agressivos
 * (isso lia como foto de baixa qualidade). O que funde a foto no fundo
 * grafite é a vinheta nas bordas, não um filtro sobre a imagem inteira.
 */
export const photoTreatment = "contrast-105";

/** Vinheta sutil, só nas bordas do quadro — usar em fotos grandes/full-bleed. */
export const photoVignetteStrong =
  "pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_30px_var(--color-canvas)]";

/** Vinheta bem discreta — usar em cards menores (equipe, galeria). */
export const photoVignetteSoft =
  "pointer-events-none absolute inset-0 shadow-[inset_0_0_50px_10px_var(--color-canvas)]";
