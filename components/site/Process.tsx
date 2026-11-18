"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SectionLabel } from "./ui";

const PASOS = [
  { numero: 1, titulo: "Consulta y medidas", descripcion: "Visitamos tu espacio, tomamos medidas exactas y entendemos tu visión del proyecto." },
  { numero: 2, titulo: "Diseño y cotización", descripcion: "Preparamos una propuesta de diseño con materiales, acabados y costos claros." },
  { numero: 3, titulo: "Fabricación artesanal", descripcion: "Construimos cada pieza en nuestro taller con herramienta de precisión y madera de calidad." },
  { numero: 4, titulo: "Instalación y entrega", descripcion: "Instalamos tu mueble con cuidado y revisamos contigo cada detalle del resultado final." },
];

export default function Process() {
  return (
    <section id="proceso" className="py-24 lg:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel number="03" label="Cómo trabajamos" />
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Nuestro proceso</h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">De la idea a la entrega, un proceso claro y artesanal en cada paso.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:hidden">
          {PASOS.map((p, i) => (
            <motion.div
              key={p.numero}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 * i }}
              className="flex flex-col items-center text-center px-2"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-white font-bold text-xl flex items-center justify-center mb-4">{p.numero}</div>
              <h3 className="font-bold text-lg mb-2">{p.titulo}</h3>
              <p className="text-[var(--muted)] text-sm">{p.descripcion}</p>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[var(--border)]" />
          <div className="flex flex-col gap-16">
            {PASOS.map((p, i) => {
              const left = i % 2 === 0;
              const text = (
                <div className={left ? "text-right pr-10" : "text-left pl-10"}>
                  <h3 className="font-bold text-xl mb-2">{p.titulo}</h3>
                  <p className="text-[var(--muted)] text-sm">{p.descripcion}</p>
                </div>
              );
              return (
                <motion.div
                  key={p.numero}
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative grid grid-cols-2 gap-10 items-center"
                >
                  {left ? (
                    <>
                      {text}
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      {text}
                    </>
                  )}
                  <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[var(--accent)] text-white font-serif font-bold text-2xl flex items-center justify-center border-4 border-[var(--surface)] shadow-md z-10">
                    {p.numero}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const ETAPAS = [
  { etiqueta: "01 · Preparación", titulo: "Preparación", descripcion: "Organizamos herramienta, medidas y materiales antes de empezar a trabajar la pieza.", imagen: "/images/taller/taller-banco-trabajo-1.jpeg" },
  { etiqueta: "02 · Fabricación", titulo: "Fabricación", descripcion: "Cada corte, ensamble y acabado se hace a mano con atención al detalle en nuestro taller.", imagen: "/images/taller/taller-detalle-trabajo-1.jpeg" },
  { etiqueta: "03 · Resultado final", titulo: "Resultado final", descripcion: "El mueble terminado, instalado y listo para ser parte de tu espacio.", imagen: "/images/taller/portfolio-bano-mueble-1.jpeg" },
];

export function ProcessVisual() {
  return (
    <section id="proceso-visual" className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">De principio a fin</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Así nace cada mueble</h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">Un vistazo al recorrido real de un proyecto, desde el taller hasta tu hogar.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ETAPAS.map((e, i) => (
            <motion.div
              key={e.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 * i }}
              className="group relative rounded-2xl overflow-hidden border border-[var(--border)]"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.div
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 * i }}
                  className="absolute inset-0"
                >
                  <Image
                    src={e.imagen}
                    alt={`${e.titulo} de un mueble de carpintería`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  {e.etiqueta}
                </span>
              </div>
              <div className="p-5 bg-[var(--surface)]">
                <h3 className="font-bold text-lg mb-1">{e.titulo}</h3>
                <p className="text-[var(--muted)] text-sm">{e.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
