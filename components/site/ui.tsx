"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { WA_ICON_PATHS } from "@/lib/whatsapp";

export function BrandName({ nombre = "Carpintería Morales" }: { nombre?: string }) {
  const parts = nombre.trim().split(" ");
  if (parts.length < 2) return <span className="text-[var(--accent)]">{nombre}</span>;
  return (
    <>
      {parts[0]} <span className="text-[var(--accent)]">{parts.slice(1).join(" ")}</span>
    </>
  );
}

export function SectionLabel({ number, label, className }: { number: string; label: string; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 justify-center ${className ?? ""}`}>
      <span className="font-serif text-[var(--accent)] text-base font-semibold">{number} —</span>
      <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      {WA_ICON_PATHS.map((d) => (
        <path key={d.slice(0, 12)} d={d} />
      ))}
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

const MotionLink = motion.create(Link);

/** Enlace con efecto "magnético" que sigue ligeramente al cursor (como en el sitio original). */
export function MagneticLink({
  href,
  children,
  className,
  target,
  rel,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 300, damping: 20, mass: 0.5 });

  const Comp = href.startsWith("/") ? MotionLink : motion.a;
  return (
    <Comp
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 6);
        my.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 6);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ x, y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function WoodDivider() {
  return (
    <div aria-hidden="true" className="relative w-full h-10 md:h-14 overflow-hidden pointer-events-none select-none">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,30 C150,55 350,5 600,30 C850,55 1050,5 1200,30 L1200,60 L0,60 Z" fill="var(--accent)" opacity="0.06" />
        <path d="M0,36 C150,58 350,14 600,36 C850,58 1050,14 1200,36" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.18" />
        <path d="M0,24 C150,46 350,2 600,24 C850,46 1050,2 1200,24" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.12" />
      </svg>
    </div>
  );
}
