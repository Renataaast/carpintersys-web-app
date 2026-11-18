import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import { CtaBanner, Materials } from "@/components/site/Sections";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Cocinas integrales, closets, puertas y muebles personalizados fabricados a la medida en Ciudad Juárez.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lo que hacemos"
        title="Muebles a la medida para cada espacio"
        subtitle="Cocinas, closets, puertas, muebles de sala y piezas únicas fabricadas en nuestro taller."
        image="/images/stock/servicio-cocinas-1.jpeg"
      />
      <Services />
      <Process />
      <Materials />
      <CtaBanner />
    </>
  );
}
