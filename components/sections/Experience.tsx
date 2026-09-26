import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function Experience() {
  return (
    <section id="experiencia" className="bg-[#e9e5db] py-16 text-[#24251f] sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-[#626258]">A casa</p>
            <h2 className="mt-5 font-display text-display-lg font-medium">O corte importa.<br /><span className="italic">A conversa também.</span></h2>
            <p className="mt-6 max-w-md leading-relaxed text-[#626258]">Café quentinho, ambiente pensado em cada detalhe e barbeiros que tratam sua imagem como ela já é: uma assinatura.</p>
            <p className="mt-5 max-w-md leading-relaxed text-[#626258]">Da escolha do corte ao acabamento, o cuidado acontece de perto.</p>
            <a href="#equipe" className="mt-8 inline-block border-b border-[#24251f]/40 pb-2 text-sm font-medium">Conheça quem vai cuidar de você ↗</a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-[1.25fr_1fr] items-end gap-3 sm:gap-5">
              <div className="relative aspect-[3/4] overflow-hidden"><Image src="/images/gallery/ambiente-quadros.jpg" alt="Detalhes do ambiente da Macedo Barbearia" fill sizes="(min-width: 1024px) 30vw, 55vw" className="object-cover" /></div>
              <figure><div className="relative aspect-[3/4] overflow-hidden"><Image src="/images/gallery/ambiente-cafe.jpg" alt="O café da casa, na estação de café da barbearia" fill sizes="(min-width: 1024px) 25vw, 40vw" className="object-cover object-[65%_center]" /></div><figcaption className="mt-3 text-xs italic text-[#626258]">O café faz parte.</figcaption></figure>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
