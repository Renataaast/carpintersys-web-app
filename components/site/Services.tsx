"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { CheckIcon, SectionLabel } from "./ui";
import { useActiveRows } from "./useActiveRows";
import { SERVICIOS_DEFAULT, type Servicio } from "@/lib/data";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const cfg = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), cfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), cfg);

  return (
    <div style={{ perspective: 1000, touchAction: "pan-y" }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) return;
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Services() {
  const servicios = useActiveRows<Servicio>("servicios", SERVICIOS_DEFAULT);

  return (
    <section id="servicios" className="py-24 lg:py-32 px-6 bg-gradient-to-b from-[var(--background)] to-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel number="02" label="Lo que hacemos" />
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Nuestros servicios</h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Trabajamos con las mejores maderas y materiales para ofrecerte productos duraderos y con acabados impecables.
          </p>
        </div>

        {servicios.length === 0 ? (
          <div className="text-center py-20 text-[var(--muted)]">Próximamente más información sobre nuestros servicios.</div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicios.map((s, i) => (
              <motion.div
                key={s.id}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } }}
                whileHover={{ y: -6 }}
              >
                <TiltCard className="h-full">
                  <div className="group relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-2xl transition-all hover:shadow-xl hover:shadow-[var(--accent)]/10 h-full">
                    <span className="absolute -top-4 right-2 font-serif text-8xl font-bold text-[var(--accent)]/5 select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.imagen && (
                      <div className="relative h-40 overflow-hidden">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative w-full h-full">
                          <Image src={s.imagen} alt={s.titulo} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                        </motion.div>
                      </div>
                    )}
                    <div className="relative p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">{s.titulo}</h3>
                      <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed">{s.descripcion}</p>
                      <ul className="space-y-1 mb-5">
                        {(s.features ?? []).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                            <CheckIcon className="w-4 h-4 text-[var(--accent)] shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                        <span className="text-[var(--accent)] font-bold">{s.precio}</span>
                        <Link
                          href={`/cotizar?servicio=${encodeURIComponent(s.titulo)}`}
                          className="text-xs font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                        >
                          Cotizar →
                        </Link>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
