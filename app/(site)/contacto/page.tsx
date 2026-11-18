import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import Contact from "@/components/site/Contact";
import { Faq } from "@/components/site/Sections";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Carpintería Morales por WhatsApp, correo o envía tu consulta desde el formulario.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hablemos"
        title="Contacto"
        subtitle="Escríbenos por WhatsApp, correo o envíanos tu consulta y te respondemos en menos de 24 horas."
        image="/images/taller/taller-banco-trabajo-1.jpeg"
      />
      <Contact />
      <Faq />
    </>
  );
}
