import Hero, { TrustBar } from "@/components/site/Hero";
import Portfolio from "@/components/site/Portfolio";
import Services from "@/components/site/Services";
import Process, { ProcessVisual } from "@/components/site/Process";
import { About, CtaBanner, Faq, Materials, Testimonials } from "@/components/site/Sections";
import Contact from "@/components/site/Contact";
import { SideNav } from "@/components/site/Chrome";
import { WoodDivider } from "@/components/site/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WoodDivider />
      <Portfolio />
      <Services />
      <Process />
      <ProcessVisual />
      <Materials />
      <About />
      <Testimonials />
      <Faq />
      <Contact />
      <CtaBanner />
      <SideNav />
    </>
  );
}
