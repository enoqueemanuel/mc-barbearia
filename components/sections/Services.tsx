import { services } from "@/data/services";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceRow } from "@/components/ui/ServiceRow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/booking";

const popularServices = services.filter((service) => service.popular);
const otherServices = services.filter((service) => !service.popular);

export function Services() {
  return (
    <section id="servicos" className="bg-canvas py-24 sm:py-32 lg:py-36">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Serviços"
            eyebrowIndex="03"
            title="Feito sob medida para o seu estilo."
          />
          <Reveal className="shrink-0">
            <Button href="/#todos-servicos" variant="ghost">
              Ver Todos os Serviços
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 md:grid-cols-3">
          {popularServices.map((service, i) => (
            <ServiceRow key={service.slug} service={service} index={i} />
          ))}
        </div>

        <div id="todos-servicos" className="mt-10 scroll-mt-28">
          <ServicesCarousel services={otherServices} />
        </div>

        <div className="mt-10 flex justify-end">
          <Button href={bookingHref()} external size="lg">Consultar agenda</Button>
        </div>
      </Container>
    </section>
  );
}
