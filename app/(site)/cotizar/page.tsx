import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import QuoteForm from "@/components/site/QuoteForm";
import { TrustBar } from "@/components/site/Hero";

export const metadata: Metadata = {
  title: "Solicitar cotización",
  description: "Solicita una cotización sin costo para tu cocina, closet, puerta o mueble a la medida.",
};

const PASOS = [
  { n: 1, t: "Envía tu solicitud", d: "Cuéntanos qué necesitas y cómo contactarte." },
  { n: 2, t: "Te contactamos", d: "Respondemos en menos de 24 horas para resolver dudas y agendar medidas." },
  { n: 3, t: "Recibe tu propuesta", d: "Te enviamos diseño, materiales, acabados y costos claros." },
];

export default async function CotizarPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const { servicio } = await searchParams;
  return (
    <>
      <PageHeader
        eyebrow="Cotización sin costo"
        title="Solicitar cotización"
        subtitle="Completa el formulario y te contactaremos pronto con una propuesta para tu proyecto."
        image="/images/taller/portfolio-closet-medida-1.jpeg"
      />
      <TrustBar />
      <section className="py-20 px-6 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2">
            <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">Cómo funciona</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-8">Tu proyecto, paso a paso</h2>
            <ol className="space-y-6">
              {PASOS.map((p) => (
                <li key={p.n} className="flex gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-[var(--accent)] text-white font-serif font-bold flex items-center justify-center">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-bold">{p.t}</h3>
                    <p className="text-[var(--muted)] text-sm">{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="md:col-span-3">
            <QuoteForm key={servicio ?? ""} servicioInicial={servicio} />
          </div>
        </div>
      </section>
    </>
  );
}
