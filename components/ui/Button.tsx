import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  /** Desliga a seta padrão que desliza no hover (usada quando `icon` já cobre o espaço). */
  arrow?: boolean;
  "aria-label"?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: undefined;
  type?: undefined;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  external?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl font-sans text-sm font-semibold uppercase tracking-[0.08em] transition-[background-color,color,transform] duration-300 ease-premium focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "cta-shine bg-accent text-canvas hover:bg-accent-hover",
  ghost: "border border-line-strong text-ink hover:border-accent",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-xs",
  lg: "h-12 px-6 text-sm",
};

function ButtonContent({
  children,
  icon,
  arrow,
  fill,
}: {
  children: ReactNode;
  icon?: ReactNode;
  arrow?: boolean;
  fill?: boolean;
}) {
  return (
    <>
      {fill && (
        <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-accent-muted transition-transform duration-300 ease-premium group-hover:scale-x-100" />
      )}
      <span>{children}</span>
      {icon ?? (arrow !== false && (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-premium group-hover:translate-x-1"
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, icon, arrow } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <ButtonContent icon={icon} arrow={arrow} fill={variant === "ghost"}>
      {children}
    </ButtonContent>
  );

  if (props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={props["aria-label"]}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
      aria-label={props["aria-label"]}
    >
      {content}
    </button>
  );
}
