"use client";

import { usePerfil } from "./PerfilProvider";
import QuoteForm from "./QuoteForm";
import { WhatsAppIcon } from "./ui";
import { waLink } from "@/lib/whatsapp";

export default function Contact() {
  const perfil = usePerfil();
  const items = [
    {
      label: "WhatsApp",
      value: `+${perfil.telefono.replace(/\D/g, "")}`,
      href: waLink(perfil.telefono),
      color: "text-green-500",
      icon: <WhatsAppIcon className="w-5 h-5" />,
    },
    {
      label: "Correo",
      value: perfil.email,
      href: `mailto:${perfil.email}`,
      color: "text-[var(--accent)]",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Ubicación",
      value: perfil.ciudad,
      href: `https://maps.google.com/?q=${encodeURIComponent(perfil.ciudad)}`,
      color: "text-[var(--accent)]",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ].filter((i) => i.value);

  return (
    <section id="contacto" className="py-24 px-6 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[var(--accent)] text-sm font-semibold uppercase tracking-widest">Hablemos</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">¿Listo para tu próximo proyecto?</h2>
            <p className="text-[var(--muted)] mb-8 leading-relaxed">
              Cuéntanos tu idea y te damos una cotización sin costo. Trabajamos en toda la república con envío a domicilio.
            </p>
            <div className="space-y-4">
              {items.map((i) => (
                <a
                  key={i.label}
                  href={i.href}
                  target={i.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className={`${i.color} bg-[var(--surface-2)] p-3 rounded-xl border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors`}>
                    {i.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--muted)] uppercase tracking-wide">{i.label}</div>
                    <div className="text-[var(--foreground)] font-medium group-hover:text-[var(--accent)] transition-colors break-words">{i.value}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--border)] h-64">
              <iframe
                src="https://maps.google.com/maps?q=Ciudad+Juarez,Chihuahua&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación en el mapa"
                aria-label="Mapa de ubicación en Ciudad Juárez, Chihuahua"
              />
            </div>
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
