# CarpinterSys — Carpintería Morales

Sitio web y sistema de gestión de Carpintería Morales (Ciudad Juárez, Chihuahua), muebles personalizados a la medida.

**Tecnologías:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, Supabase (Auth, Postgres, Storage), Netlify.

## Ejecutar localmente
1. `npm install`
2. Copia `.env.example` a `.env.local` y completa `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. En Supabase > SQL Editor ejecuta `supabase/schema.sql`. Crea el usuario administrador en Supabase > Authentication.
4. `npm run dev` (o `netlify dev`).

En Netlify configura las mismas dos variables de entorno.

## Roadmap
Ver [PLAN.md](PLAN.md). Pendiente: panel de administración.
