# CarpinterSys · Plan

1. ✅ Recuperar diseño, textos e imágenes del sitio original (colores, Geist + Fraunces, animaciones).
2. ✅ Sitio público: Inicio, Servicios, Portafolio, Nosotros, Contacto, Solicitar cotización (`app/(site)`).
3. ✅ Formulario de cotización con validación, confirmación y guardado en Supabase (`cotizaciones`).
4. ✅ Esquema Supabase con RLS y datos iniciales (`supabase/schema.sql`); protección de `/admin/*` en `proxy.ts`.
5. ⏳ Panel de administración (`app/admin`): login (`/admin/login`), layout con barra lateral, cotizaciones con cambio de estado, CRUD de portfolio (subida al bucket `portfolio`), CRUD de servicios, edición de perfil del negocio. El diseño exacto está documentado en AGENTS.md.
6. ⏳ Revisión responsive y de accesibilidad final.
