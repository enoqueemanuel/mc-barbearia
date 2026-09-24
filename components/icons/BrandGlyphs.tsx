/**
 * Lucide não inclui logotipos de marca. Estes dois glifos (WhatsApp e
 * Instagram) são desenhados à mão para uso pontual em links de contato;
 * todo o restante dos ícones do site usa Lucide.
 */

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.04 4C9.4 4 4 9.37 4 16c0 2.24.62 4.34 1.7 6.14L4 28l6.03-1.66A11.9 11.9 0 0 0 16.04 28C22.68 28 28 22.63 28 16S22.68 4 16.04 4Zm0 21.7c-1.98 0-3.83-.58-5.38-1.58l-.39-.24-3.58.98.96-3.5-.25-.4a9.6 9.6 0 0 1-1.5-5.16c0-5.36 4.4-9.72 9.75-9.72 5.36 0 9.72 4.36 9.72 9.72s-4.36 9.9-9.33 9.9Zm5.27-7.28c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.14-1.23-.45-2.33-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.08-.15-.65-1.57-.9-2.15-.24-.57-.48-.5-.65-.5-.17 0-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.16 2.95.15.19 2 3.06 4.85 4.29.68.29 1.2.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.7 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );
}

export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Robô simpático para o botão do chat: cabeça arredondada, olhos grandes. */
export function RobotGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3.6" cy="8.6" r="1.15" />
      <circle cx="20.4" cy="8.6" r="1.15" />
      <rect x="5" y="3" width="14" height="11" rx="5.5" />
      <circle cx="9.1" cy="8.7" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="14.9" cy="8.7" r="1.6" fill="currentColor" stroke="none" />
      <path d="M9.4 12c.7.75 1.7 1.15 2.6 1.15s1.9-.4 2.6-1.15" />
      <rect x="8" y="15.6" width="8" height="5.4" rx="2.2" />
      <path d="M8 17.7 6.1 19.4M16 17.7l1.9 1.7" />
    </svg>
  );
}
