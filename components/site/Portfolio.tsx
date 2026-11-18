"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { SectionLabel } from "./ui";
import { useActiveRows } from "./useActiveRows";
import { CATEGORIAS_PORTFOLIO, PORTFOLIO_DEFAULT, type Proyecto } from "@/lib/data";

export default function Portfolio() {
  const proyectos = useActiveRows<Proyecto>("portfolio", PORTFOLIO_DEFAULT);
  const [categoria, setCategoria] = useState("Todos");
  const [selected, setSelected] = useState<Proyecto | null>(null);
  const visibles = categoria === "Todos" ? proyectos : proyectos.filter((p) => p.categoria === categoria);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="portfolio" className="py-24 lg:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel number="01" label="Nuestro trabajo" />
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Portfolio de proyectos</h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Cada pieza es única. Aquí algunos de los proyectos que hemos realizado para nuestros clientes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIAS_PORTFOLIO.map((c) => (
            <button
              key={c}
              onClick={() => setCategoria(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                categoria === c
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {visibles.length === 0 ? (
          <div className="text-center py-20 text-[var(--muted)]">No hay proyectos en esta categoría aún.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibles.map((p) => (
                <motion.button
                  type="button"
                  layout
                  key={p.id}
                  onClick={() => setSelected(p)}
                  aria-label={`Ver ${p.titulo}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-2xl bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors h-72 text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imagen_url}
                    alt={p.titulo}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/60 backdrop-blur-sm p-5">
                    <span className="text-[var(--accent)] text-xs font-semibold uppercase tracking-widest">{p.categoria}</span>
                    <h3 className="font-bold text-white text-lg mt-1">{p.titulo}</h3>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white font-semibold px-8 py-3 rounded-full transition-all"
          >
            ¿Tienes un proyecto en mente? Cotízalo aquí
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selected.titulo}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[var(--background)] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selected.imagen_url} alt={selected.titulo} className="w-full max-h-[70vh] object-contain bg-black" />
              <div className="p-5">
                <span className="text-[var(--accent)] text-xs font-semibold uppercase tracking-widest">{selected.categoria}</span>
                <h3 className="font-bold text-xl mt-1">{selected.titulo}</h3>
                {selected.descripcion && <p className="text-[var(--muted)] text-sm mt-2">{selected.descripcion}</p>}
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
