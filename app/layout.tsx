import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { siteConfig } from "@/data/site";
import { buildHairSalonSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { Chat } from "@/components/chat/Chat";
import { Analytics } from "@/components/Analytics";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["500", "600", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

const titleFull = "MC Barbearia - Premium";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: { icon: [{ url: "/brand-logo.svg", type: "image/svg+xml" }] },
  title: {
    default: titleFull,
    template: `%s — ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  keywords: [
    "barbearia em Blumenau",
    "barbeiro em Blumenau",
    "corte masculino Blumenau",
    "barba Blumenau",
    "MC Barbearia",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.brandName,
    title: titleFull,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: titleFull,
    description: siteConfig.description,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = await buildHairSalonSchema();

  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${jakarta.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:text-canvas"
        >
          Pular para o conteúdo
        </a>
        <ScrollToTop />
        <ScrollProgress />
        <MotionConfig reducedMotion="user">
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
          <MobileStickyCta />
          <Chat />
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  );
}
