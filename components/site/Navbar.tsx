"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { BrandName, MagneticLink } from "./ui";
import { useActiveSection } from "./useActiveSection";

const NAV = [
  { label: "Inicio", route: "/", anchor: "#inicio" },
  { label: "Portfolio", route: "/portafolio", anchor: "#portfolio" },
  { label: "Servicios", route: "/servicios", anchor: "#servicios" },
  { label: "Nosotros", route: "/nosotros", anchor: "#nosotros" },
  { label: "Proceso", route: "/servicios#proceso", anchor: "#proceso" },
  { label: "Contacto", route: "/contacto", anchor: "#contacto" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeSection = useActiveSection(isHome ? NAV.map((n) => n.anchor) : []);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  // En inicio se navega por anclas (como el original); en las demás páginas por rutas.
  const items = NAV.map((n) => ({
    label: n.label,
    href: isHome ? n.anchor : n.route,
    active: isHome ? activeSection === n.anchor : pathname === n.route,
  }));

  const mobileMenu = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden fixed inset-0 z-[200] bg-[var(--accent-dark)] flex flex-col"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
            <span className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <Image src="/icon.png" alt="Carpintería Morales" width={28} height={28} className="rounded-md" />
              <BrandName />
            </span>
            <button
              className="text-white p-2.5 -mr-2.5 flex items-center justify-center min-w-11 min-h-11"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            className="flex-1 flex flex-col items-center justify-center gap-6 px-6 overflow-y-auto py-10"
          >
            {items.map((item) => (
              <motion.div key={item.label} variants={itemVariants}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-2xl font-serif font-bold tracking-wide transition-colors ${
                    item.active ? "text-[var(--accent)]" : "text-white hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants} className="mt-4">
              <Link
                href="/cotizar"
                onClick={() => setOpen(false)}
                className="block bg-[var(--accent)] text-white text-center font-bold px-8 py-3 rounded-full border-2 border-white/20"
              >
                Cotizar proyecto
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/60 hover:text-[var(--accent)] transition-colors uppercase tracking-widest"
              >
                Admin
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/70 backdrop-blur-md border-b border-[var(--border)]">
        <motion.div
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          initial={{ height: 64 }}
          animate={{ height: scrolled ? 56 : 64 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Link href={isHome ? "#inicio" : "/"} className="flex items-center gap-2 group">
            <Image src="/icon.png" alt="Carpintería Morales" width={32} height={32} className="rounded-md" />
            <span className="font-bold text-lg tracking-wide text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              <BrandName />
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative pb-1 text-sm font-medium tracking-wide uppercase transition-colors ${
                  item.active ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--accent)]"
                }`}
              >
                {item.label}
                {item.active && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[var(--accent)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors uppercase tracking-wide"
            >
              Admin
            </Link>
            <MagneticLink
              href="/cotizar"
              className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-sm font-bold px-5 py-2 rounded-full border-2 border-[var(--accent-dark)] transition-colors shadow-sm inline-block whitespace-nowrap"
            >
              Cotizar proyecto
            </MagneticLink>
          </div>

          <button
            className="md:hidden text-[var(--foreground)] p-2.5 -mr-2.5 flex items-center justify-center min-w-11 min-h-11"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </motion.div>
      </nav>
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
