"use client";

import Link from "next/link";
import { usePerfil } from "./PerfilProvider";
import { BrandName, WhatsAppIcon } from "./ui";
import { waLink } from "@/lib/whatsapp";

const LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Portfolio", href: "/portafolio" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Solicitar cotización", href: "/cotizar" },
];

export default function Footer() {
  const perfil = usePerfil();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <span className="font-bold text-lg block mb-3">
              <BrandName nombre={perfil.nombre} />
            </span>
            <p className="text-[var(--muted)] text-sm leading-relaxed">{perfil.descripcion}</p>
            <p className="text-[var(--muted)] text-xs mt-3">Sitio operado con CarpinterSys.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-[var(--accent)]">Navegación</h4>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--muted)] hover:text-[var(--foreground)] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-[var(--accent)]">Contacto rápido</h4>
            <a
              href={waLink(perfil.telefono, false)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-600 text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp directo
            </a>
            {perfil.email && (
              <a
                href={`mailto:${perfil.email}`}
                className="block mt-3 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {perfil.email}
              </a>
            )}
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--muted)] text-xs">
            © {year} {perfil.nombre}. Todos los derechos reservados.
          </p>
          <p className="text-[var(--muted)] text-xs">{perfil.ciudad}</p>
        </div>
      </div>
    </footer>
  );
}
