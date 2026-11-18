import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import Portfolio from "@/components/site/Portfolio";
import { ProcessVisual } from "@/components/site/Process";
import { CtaBanner } from "@/components/site/Sections";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Galería de proyectos realizados por Carpintería Morales: cocinas, closets, baños, bares y más.",
};

export default function PortafolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nuestro trabajo"
        title="Proyectos hechos a la medida"
        subtitle="Cada pieza es única. Conoce algunos de los trabajos que hemos realizado para nuestros clientes."
        image="/images/taller/portfolio-cocina-isla-marmol-1.jpeg"
      />
      <Portfolio />
      <ProcessVisual />
      <CtaBanner />
    </>
  );
}
