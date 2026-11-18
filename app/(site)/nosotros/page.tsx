import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import { About, CtaBanner, Faq, Testimonials } from "@/components/site/Sections";
import { ProcessVisual } from "@/components/site/Process";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce a Carpintería Morales, taller artesanal de muebles a la medida en Ciudad Juárez, Chihuahua.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quiénes somos"
        title="Carpintería artesanal con atención personalizada"
        subtitle="Fabricamos cada mueble a la medida, cuidando cada detalle desde la primera visita hasta la instalación."
        image="/images/taller/taller-detalle-trabajo-1.jpeg"
      />
      <About />
      <ProcessVisual />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </>
  );
}
