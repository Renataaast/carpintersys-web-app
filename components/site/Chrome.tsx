"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { usePerfil } from "./PerfilProvider";
import { BrandName, WhatsAppIcon } from "./ui";
import { useActiveSection } from "./useActiveSection";
import { waLink } from "@/lib/whatsapp";

export function Splash() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[var(--accent-dark)]"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide"
          >
            <BrandName />
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--accent)] origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(my, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      mx.set(e.clientX - 6);
      my.set(e.clientY - 6);
    };
    const over = (e: MouseEvent) => (e.target as Element).closest?.("a, button") && setHovering(true);
    const out = (e: MouseEvent) => (e.target as Element).closest?.("a, button") && setHovering(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full bg-[var(--accent)]"
      style={{ x, y }}
      animate={{ width: hovering ? 36 : 12, height: hovering ? 36 : 12, opacity: hovering ? 0.35 : 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] shadow-lg hover:bg-[var(--accent)] hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function WhatsAppFloat() {
  const { telefono } = usePerfil();
  const [hover, setHover] = useState(false);
  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden sm:block absolute right-full mr-3 whitespace-nowrap bg-[var(--background)] text-[var(--foreground)] text-sm font-medium px-4 py-2 rounded-xl shadow-lg border border-[var(--border)]"
          >
            ¿Tienes dudas? Escríbenos
          </motion.div>
        )}
      </AnimatePresence>
      <a
        href={waLink(telefono)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform animate-pulse"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
}

export function NoiseOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-overlay">
      <svg width="100%" height="100%">
        <filter id="noise-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-texture)" />
      </svg>
    </div>
  );
}

const SECTIONS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Materiales", href: "#materiales" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

/** Navegación lateral por puntos (solo en la página de inicio, pantallas grandes). */
export function SideNav() {
  const active = useActiveSection(SECTIONS.map((s) => s.href));
  return (
    <nav
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4"
      aria-label="Navegación de secciones"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.href;
        return (
          <a
            key={s.href}
            href={s.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(s.href)?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label={s.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center justify-center p-1.5"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive ? "w-3 h-3 bg-[var(--accent)]" : "w-2 h-2 bg-[var(--muted)]/50 group-hover:bg-[var(--accent)]/70"
              }`}
            />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-[var(--background)] border border-[var(--border)] px-2 py-1 text-xs text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
