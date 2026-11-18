"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { SERVICIOS_COTIZACION } from "@/lib/data";
import { CheckIcon, Spinner } from "./ui";
import { usePerfil } from "./PerfilProvider";
import { waLink } from "@/lib/whatsapp";

type Campos = { nombre: string; telefono: string; email: string; servicio: string; descripcion: string };
type Errores = Partial<Record<keyof Campos, string>>;

const VACIO: Campos = { nombre: "", telefono: "", email: "", servicio: "", descripcion: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validar(c: Campos): Errores {
  const e: Errores = {};
  if (c.nombre.trim().length < 2) e.nombre = "Escribe tu nombre (mínimo 2 caracteres).";
  const digitos = c.telefono.replace(/\D/g, "");
  if (digitos.length < 10 || digitos.length > 15) e.telefono = "Escribe un teléfono válido de al menos 10 dígitos.";
  if (!EMAIL_RE.test(c.email.trim())) e.email = "Escribe un correo electrónico válido.";
  if (!c.servicio) e.servicio = "Selecciona el servicio que te interesa.";
  if (c.descripcion.length > 2000) e.descripcion = "La descripción no puede superar 2000 caracteres.";
  return e;
}

const inputBase =
  "w-full bg-[var(--surface)] border rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors";

function matchServicio(s?: string) {
  if (!s) return "";
  const t = s.toLowerCase();
  if (SERVICIOS_COTIZACION.includes(s)) return s;
  if (t.includes("cocina")) return "Cocina integral";
  if (t.includes("closet") || t.includes("clóset")) return "Closet a la medida";
  if (t.includes("puerta") || t.includes("ventana")) return "Puerta o ventana";
  if (t.includes("sala")) return "Mueble de sala";
  if (t.includes("comedor")) return "Comedor";
  return "Otro";
}

export default function QuoteForm({ servicioInicial, title = "Solicitar cotización" }: { servicioInicial?: string; title?: string }) {
  const { telefono } = usePerfil();
  const [campos, setCampos] = useState<Campos>({ ...VACIO, servicio: matchServicio(servicioInicial) });
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampos((c) => ({ ...c, [name]: value }));
    if (errores[name as keyof Campos]) setErrores((er) => ({ ...er, [name]: undefined }));
    if (estado === "success" || estado === "error") setEstado("idle");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er = validar(campos);
    setErrores(er);
    if (Object.keys(er).length) return;

    const supabase = getSupabase();
    if (!supabase) {
      setEstado("error");
      return;
    }
    setEstado("loading");
    const { error } = await supabase.from("cotizaciones").insert([
      {
        nombre: campos.nombre.trim(),
        telefono: campos.telefono.trim(),
        email: campos.email.trim().toLowerCase(),
        servicio: campos.servicio,
        descripcion: campos.descripcion.trim() || null,
      },
    ]);
    if (error) {
      setEstado("error");
    } else {
      setEstado("success");
      setCampos(VACIO);
    }
  };

  const field = (name: keyof Campos) => ({
    id: `cot-${name}`,
    name,
    value: campos[name],
    onChange,
    "aria-invalid": Boolean(errores[name]),
    "aria-describedby": errores[name] ? `cot-${name}-err` : undefined,
    className: `${inputBase} ${errores[name] ? "border-red-400" : "border-[var(--border)]"}`,
  });

  const Err = ({ name }: { name: keyof Campos }) =>
    errores[name] ? (
      <p id={`cot-${name}-err`} className="text-xs text-red-600 mt-1">
        {errores[name]}
      </p>
    ) : null;

  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold mb-6">{title}</h3>

      {estado === "success" && (
        <div role="status" className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-4 flex items-center gap-3">
          <CheckIcon className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-semibold">¡Solicitud enviada!</p>
            <p className="text-sm">Te contactaremos pronto para darte tu cotización.</p>
          </div>
        </div>
      )}
      {estado === "error" && (
        <div role="alert" className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-4 text-sm">
          Hubo un error al enviar.{" "}
          <a href={waLink(telefono)} target="_blank" rel="noopener noreferrer" className="underline font-medium">
            Contáctanos por WhatsApp.
          </a>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cot-nombre" className="block text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
              Nombre *
            </label>
            <input type="text" autoComplete="name" placeholder="Tu nombre" maxLength={120} {...field("nombre")} />
            <Err name="nombre" />
          </div>
          <div>
            <label htmlFor="cot-telefono" className="block text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
              Teléfono *
            </label>
            <input type="tel" autoComplete="tel" placeholder="Tu teléfono" maxLength={30} {...field("telefono")} />
            <Err name="telefono" />
          </div>
        </div>
        <div>
          <label htmlFor="cot-email" className="block text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
            Correo electrónico *
          </label>
          <input type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" maxLength={160} {...field("email")} />
          <Err name="email" />
        </div>
        <div>
          <label htmlFor="cot-servicio" className="block text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
            Servicio de interés *
          </label>
          <select {...field("servicio")}>
            <option value="">Selecciona un servicio</option>
            {SERVICIOS_COTIZACION.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <Err name="servicio" />
        </div>
        <div>
          <label htmlFor="cot-descripcion" className="block text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
            Descripción del proyecto
          </label>
          <textarea rows={4} placeholder="Cuéntanos qué tienes en mente..." maxLength={2000} {...field("descripcion")} className={`${field("descripcion").className} resize-none`} />
          <Err name="descripcion" />
        </div>
        <button
          type="submit"
          disabled={estado === "loading"}
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors text-sm tracking-wide flex items-center justify-center gap-2"
        >
          {estado === "loading" ? (
            <>
              <Spinner />
              Enviando...
            </>
          ) : (
            "Enviar solicitud"
          )}
        </button>
      </form>
    </div>
  );
}
