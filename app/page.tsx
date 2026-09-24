import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { WhyUs } from "@/components/sections/WhyUs";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { Location } from "@/components/sections/Location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <Services />
      <Team />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <FinalCta />
      <Location />
    </>
  );
}
