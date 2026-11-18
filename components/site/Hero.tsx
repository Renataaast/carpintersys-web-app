"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from "motion/react";
import { usePerfil } from "./PerfilProvider";
import { MagneticLink, WhatsAppIcon } from "./ui";
import { waLink } from "@/lib/whatsapp";

function FloatingBadge({ icon, value, label, className, delay }: { icon: string; value: string; label: string; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`absolute z-10 hidden sm:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3"
      >
        <span className="text-2xl">{icon}</span>
        <div>
          <div className="text-white font-bold text-lg leading-none">{value}</div>
          <div className="text-white/70 text-xs mt-1">{label}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");
  const match = value.match(/\d+/);
  const target = match ? parseInt(match[0], 10) : null;
  const suffix = match ? value.replace(match[0], "") : "";
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView || target === null) return;
    const controls = animate(mv, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, target, mv]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-[var(--accent)]">{value ? (target !== null ? `${display}${suffix}` : value) : "★"}</div>
      <div className="text-xs text-gray-200 mt-1">{label}</div>
    </div>
  );
}

function AnimatedTitle({ text, highlight }: { text: string; highlight?: string }) {
  const words = text.split(" ");
  let highlighted: Set<number> | null = null;
  if (highlight) {
    const h = highlight.trim().split(" ");
    const start = words.findIndex((_, i) => h.every((w, j) => words[i + j] === w));
    if (start !== -1) highlighted = new Set(h.map((_, j) => start + j));
  }
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
      className="inline"
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
          className={`inline-block mr-[0.25em] ${highlighted?.has(i) ? "text-[var(--accent)]" : ""}`}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const perfil = usePerfil();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const titulo = perfil.hero_titulo;

  return (
    <section id="inicio" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/taller/taller-banco-trabajo-1.jpeg"
            alt="Banco de trabajo en el taller de Carpintería Morales"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-110"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, transparent 0%, transparent 35%, rgba(0,0,0,0.55) 100%)" }}
      />

      <FloatingBadge icon="🪵" value={`${perfil.anos_experiencia}+ años`} label="de experiencia artesanal" className="top-28 left-6 lg:left-16" delay={0.8} />
      <FloatingBadge icon="✓" value={`${perfil.proyectos_completados}+`} label="proyectos completados" className="bottom-32 right-6 lg:right-16" delay={1.1} />

      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-[var(--accent)]"
            style={{ top: `${5 + 5 * i}%`, left: 0, right: 0, transform: `rotate(${-2 + 0.2 * i}deg)` }}
          />
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-full bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 pb-28">
        <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--accent)]/30 rounded-full px-4 py-1.5 text-sm text-[var(--accent)] font-medium mb-8">
          <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
          Artesanía hecha a la medida
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] mb-6 text-white">
          <AnimatedTitle text={titulo} highlight={titulo.includes("la madera") ? "la madera" : undefined} />
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{perfil.hero_subtitulo}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticLink
            href="#portfolio"
            className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg inline-block"
          >
            Ver mis trabajos
          </MagneticLink>
          <MagneticLink
            href={waLink(perfil.telefono)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/40 hover:border-[var(--accent)] text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
          >
            <WhatsAppIcon className="w-5 h-5 text-green-500" />
            Contactar por WhatsApp
          </MagneticLink>
        </div>
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <Counter value={`${perfil.anos_experiencia}+`} label="Años de experiencia" />
          <Counter value={`${perfil.proyectos_completados}+`} label="Proyectos completados" />
          <Counter value="" label="Clientes que han confiado en nosotros" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    { label: "Respuesta en menos de 24h", paths: ["M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"] },
    {
      label: "Garantía de fabricación",
      paths: [
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      ],
    },
    {
      label: "Entrega e instalación incluida",
      paths: [
        "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z",
        "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1h1m8 0H9m4 0h2m0 0h4.05a1 1 0 00.99-.858l.56-3.924a1 1 0 00-.276-.848l-2.825-2.825A1 1 0 0016.788 8H13v8z",
      ],
    },
  ];
  return (
    <div className="relative z-10 bg-[var(--surface)] border-y border-[var(--border)] py-4 px-6">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
            <span className="text-[var(--accent)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {it.paths.map((d) => (
                  <path key={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                ))}
              </svg>
            </span>
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}
