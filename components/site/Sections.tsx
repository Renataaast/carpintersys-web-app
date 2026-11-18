"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { usePerfil } from "./PerfilProvider";
import { MagneticLink, SectionLabel, WhatsAppIcon } from "./ui";
import { waLink } from "@/lib/whatsapp";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } } };

const MATERIALES = [
  { nombre: "Madera maciza", descripcion: "Madera seleccionada de la más alta calidad para piezas duraderas.", imagen: "/images/taller/materiales-maderas-1.jpeg" },
  { nombre: "Laminados", descripcion: "Acabados laminados resistentes y de bajo mantenimiento.", imagen: "/images/taller/materiales-laminados-1.jpeg" },
  { nombre: "Paneles MDF/triplay", descripcion: "Paneles de ingeniería ideales para closets y muebles modulares.", imagen: "/images/taller/materiales-paneles-1.jpeg" },
  { nombre: "Triplay", descripcion: "Láminas de triplay estructural para proyectos de gran formato.", imagen: "/images/taller/materiales-paneles-2.jpeg" },
  { nombre: "Barnices y acabados", descripcion: "Barnices y pinturas que protegen y resaltan la veta natural.", imagen: "/images/taller/materiales-acabados-barnices-1.jpeg" },
  { nombre: "Acabados finos", descripcion: "Selección de acabados para un resultado profesional y duradero.", imagen: "/images/taller/materiales-acabados-barnices-2.jpeg" },
];

export function Materials() {
  return (
    <section id="materiales" className="py-24 lg:py-32 px-6 bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel number="04" label="Calidad real" />
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Materiales y acabados</h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">Trabajamos solo con materiales de calidad, directo desde nuestro taller.</p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {MATERIALES.map((m) => (
            <motion.div
              key={m.nombre}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl bg-[var(--background)] border border-[var(--border)] h-56 transition-shadow hover:shadow-lg"
            >
              <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ clipPath: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, scale: { duration: 0.3 } }}
                className="absolute inset-0"
              >
                <Image src={m.imagen} alt={m.nombre} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-lg mb-1 text-white">{m.nombre}</h3>
                <p className="text-white/80 text-sm sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">{m.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function About() {
  const perfil = usePerfil();
  return (
    <section id="nosotros" className="py-24 px-6 bg-[var(--background)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        <div className="relative overflow-hidden h-80 lg:h-[28rem] rounded-2xl border border-[var(--border)]">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/images/taller/taller-detalle-trabajo-1.jpeg"
              alt="Artesano trabajando una pieza de madera en el taller"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
        <div>
          <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">Quiénes somos</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Hecho por manos expertas</h2>
          <p className="text-[var(--muted)] text-lg leading-relaxed mb-4">
            En {perfil.nombre} somos un taller de carpintería artesanal en {perfil.ciudad.split(",")[0]} dedicado a transformar la
            madera en piezas únicas. Cada mueble que sale de nuestras manos lleva años de experiencia, dedicación y atención al detalle.
          </p>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            Creemos en el trabajo bien hecho, en la madera de calidad y en construir relaciones de confianza con cada cliente.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

const TESTIMONIOS = [
  { nombre: "María González", texto: "Quedamos encantados con nuestra cocina nueva. El acabado y la atención al detalle superaron lo que esperábamos.", estrellas: 5 },
  { nombre: "Roberto Díaz", texto: "Muy profesionales desde la cotización hasta la instalación. El closet que hicieron es justo lo que necesitábamos.", estrellas: 5 },
  { nombre: "Ana Martínez", texto: "La calidad de la madera y el trabajo terminado se nota a leguas. Recomendados al 100%.", estrellas: 5 },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 lg:py-32 px-6 bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel number="05" label="Testimonios" />
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Lo que dicen nuestros clientes</h2>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TESTIMONIOS.map((t) => (
            <motion.div
              key={t.nombre}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-[var(--background)] border border-[var(--border)] p-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex gap-1 text-[var(--accent)]" aria-label={`${t.estrellas} estrellas`}>
                {Array.from({ length: t.estrellas }).map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--foreground)] mt-4 mb-4 leading-relaxed">“{t.texto}”</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {t.nombre.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")}
                </div>
                <p className="font-bold text-[var(--accent)]">{t.nombre}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const FAQS = [
  { pregunta: "¿Cuánto tiempo tarda un proyecto?", respuesta: "Depende del alcance: proyectos pequeños (puertas, muebles sencillos) toman entre 1 y 2 semanas, mientras que cocinas integrales o closets completos pueden tomar de 3 a 5 semanas desde la aprobación del diseño." },
  { pregunta: "¿Dan garantía?", respuesta: "Sí, todos nuestros trabajos incluyen garantía de fabricación contra defectos de materiales y mano de obra. El periodo exacto se especifica en tu cotización según el tipo de proyecto." },
  { pregunta: "¿En qué zonas trabajan?", respuesta: "Atendemos principalmente Ciudad Juárez y municipios aledaños, con posibilidad de envío e instalación en otras partes de la república según el proyecto." },
  { pregunta: "¿Cómo es el proceso de pago?", respuesta: "Normalmente solicitamos un anticipo para iniciar la fabricación (cubre materiales) y el resto se liquida contra entrega e instalación. Aceptamos efectivo y transferencia." },
  { pregunta: "¿Puedo ver mi mueble antes de la entrega final?", respuesta: "Claro, te mantenemos al tanto del avance con fotos durante la fabricación y, si el proyecto lo permite, puedes visitar el taller para revisar tu pieza antes de la instalación final." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 px-6 bg-[var(--surface-2)]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">Preguntas frecuentes</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">¿Tienes dudas?</h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">Aquí respondemos las preguntas más comunes sobre nuestro proceso de trabajo.</p>
        </div>
        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.pregunta} className="border border-[var(--border)] rounded-2xl bg-[var(--background)] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[var(--foreground)]">{f.pregunta}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-7 h-7 rounded-full bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center text-lg font-bold"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[var(--muted)] leading-relaxed">{f.respuesta}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  const { telefono } = usePerfil();
  return (
    <section className="py-20 lg:py-32 px-6 bg-[var(--accent-dark)] text-white text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Hagamos realidad tu próximo proyecto</h2>
        <p className="text-white/80 mb-8 leading-relaxed">
          Escríbenos hoy mismo y recibe una cotización sin compromiso para tu mueble, cocina o closet a la medida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticLink
            href={waLink(telefono)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-white hover:text-[var(--accent-dark)] text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Contactar por WhatsApp
          </MagneticLink>
          <MagneticLink
            href="/cotizar"
            className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Solicitar cotización
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
