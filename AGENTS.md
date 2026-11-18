# AGENTS.md

Recreación fiel de https://carpinteriainteligente.netlify.app (marca original "Carpintería FM" → ahora "Carpintería Morales"/CarpinterSys). No rediseñar. Ver **PLAN.md** para lo pendiente.

## Estructura
- `app/(site)/` páginas públicas con layout compartido (Navbar, Footer, splash, cursor, WhatsApp flotante).
- `components/site/` secciones; textos e interacciones copiados del bundle original.
- `lib/data.ts` tipos + contenido por defecto (fallback si Supabase no responde/está vacío).
- `lib/supabase/client.ts` `getSupabase()` devuelve null si faltan variables de entorno.
- `proxy.ts` (middleware Next 16) protege `/admin/*` salvo `/admin/login`.
- `supabase/schema.sql` tablas `perfil`, `cotizaciones`, `servicios`, `portfolio`, RLS y bucket `portfolio`.

## Convenciones
- Colores vía variables CSS (`var(--accent)` etc. en `globals.css`); títulos h1–h3 en Fraunces.
- En inicio el menú usa anclas; en otras páginas, rutas.
- Datos de contacto, testimonios y cifras son reales (confirmado por la dueña/dueño del negocio).

## Panel admin (por construir, replicar original)
Layout: sidebar fija `w-64` (móvil: barra superior con tabs) con Cotizaciones `/admin`, Portfolio, Servicios, Perfil del negocio, "Ver sitio", "Cerrar sesión". Login con `signInWithPassword`, tarjeta sobre degradado `accent-dark → accent → surface`. Cotizaciones: 4 tarjetas de totales, filtros por estado, botón WhatsApp y select de estado. Portfolio/Servicios: grid de tarjetas con Editar/Ocultar/Eliminar y modal. Perfil: nombre, descripción, teléfono, correo, ciudad, hero_titulo, hero_subtitulo, años, proyectos.
