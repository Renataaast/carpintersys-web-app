-- =========================================================
-- CarpinterSys · Carpintería Morales
-- Esquema de base de datos para Supabase.
-- Ejecuta este archivo completo en Supabase > SQL Editor.
-- =========================================================

-- ---------- Tablas ----------
create table if not exists public.perfil (
  id uuid primary key default gen_random_uuid(),
  nombre text not null default 'Carpintería Morales',
  descripcion text,
  telefono text,
  email text,
  ciudad text,
  hero_titulo text,
  hero_subtitulo text,
  anos_experiencia integer default 15,
  proyectos_completados integer default 500,
  updated_at timestamptz default now()
);

create table if not exists public.cotizaciones (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null check (char_length(nombre) between 2 and 120),
  telefono text not null check (char_length(telefono) between 7 and 30),
  email text check (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  servicio text not null,
  descripcion text check (descripcion is null or char_length(descripcion) <= 2000),
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'en proceso', 'completado', 'cancelado'))
);

create table if not exists public.servicios (
  id uuid primary key default gen_random_uuid(),
  icono text default '🪵',
  titulo text not null,
  descripcion text,
  precio text not null default 'Desde cotización',
  features text[] not null default '{}',
  imagen text,
  activo boolean not null default true,
  orden integer not null default 0
);

create table if not exists public.portfolio (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  categoria text not null default 'Muebles',
  descripcion text,
  imagen_url text not null,
  activo boolean not null default true,
  orden integer not null default 0
);

-- ---------- Seguridad (RLS) ----------
alter table public.perfil       enable row level security;
alter table public.cotizaciones enable row level security;
alter table public.servicios    enable row level security;
alter table public.portfolio    enable row level security;

-- Público: lectura del perfil y del contenido activo
drop policy if exists "perfil lectura publica" on public.perfil;
create policy "perfil lectura publica" on public.perfil for select using (true);

drop policy if exists "servicios lectura publica" on public.servicios;
create policy "servicios lectura publica" on public.servicios for select using (activo or auth.role() = 'authenticated');

drop policy if exists "portfolio lectura publica" on public.portfolio;
create policy "portfolio lectura publica" on public.portfolio for select using (activo or auth.role() = 'authenticated');

-- Público: solo puede CREAR cotizaciones (siempre como "pendiente")
drop policy if exists "cotizaciones insertar publico" on public.cotizaciones;
create policy "cotizaciones insertar publico" on public.cotizaciones
  for insert to anon, authenticated with check (estado = 'pendiente');

-- Administradores (usuarios autenticados en Supabase Auth): acceso total
drop policy if exists "perfil admin" on public.perfil;
create policy "perfil admin" on public.perfil for all to authenticated using (true) with check (true);

drop policy if exists "cotizaciones admin" on public.cotizaciones;
create policy "cotizaciones admin" on public.cotizaciones for all to authenticated using (true) with check (true);

drop policy if exists "servicios admin" on public.servicios;
create policy "servicios admin" on public.servicios for all to authenticated using (true) with check (true);

drop policy if exists "portfolio admin" on public.portfolio;
create policy "portfolio admin" on public.portfolio for all to authenticated using (true) with check (true);

-- ---------- Almacenamiento de imágenes ----------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "portfolio imagenes lectura" on storage.objects;
create policy "portfolio imagenes lectura" on storage.objects
  for select using (bucket_id = 'portfolio');

drop policy if exists "portfolio imagenes admin" on storage.objects;
create policy "portfolio imagenes admin" on storage.objects
  for all to authenticated using (bucket_id = 'portfolio') with check (bucket_id = 'portfolio');

-- ---------- Datos iniciales (contenido del sitio original) ----------
insert into public.perfil (nombre, descripcion, telefono, email, ciudad, hero_titulo, hero_subtitulo, anos_experiencia, proyectos_completados)
select 'Carpintería Morales',
       'Artesanía en madera con más de 15 años de experiencia.',
       '19159776252',
       'contacto@carpinteriafm.mx',
       'Ciudad Juárez, Chihuahua, México',
       'Transformamos la madera en arte para tu hogar',
       'Más de 15 años creando muebles únicos, puertas, closets y cocinas con la mejor madera.',
       15, 500
where not exists (select 1 from public.perfil);

insert into public.servicios (icono, titulo, descripcion, precio, features, imagen, orden)
select * from (values
  ('🍳', 'Cocinas integrales', 'Diseñamos y fabricamos cocinas a la medida, con isla, cubierta y acabados que combinan funcionalidad y estilo.', 'Desde cotización', array['Diseño a medida','Instalación incluida','Garantía de fabricación'], '/images/stock/servicio-cocinas-1.jpeg', 1),
  ('🚪', 'Closets a la medida', 'Aprovechamos cada espacio con closets funcionales, organizadores internos y acabados en madera o laminado.', 'Desde cotización', array['Aprovechamiento de espacio','Organizadores internos','Acabados personalizados'], '/images/stock/servicio-closets-1.jpeg', 2),
  ('🪑', 'Muebles personalizados', 'Gabinetes, muebles de baño, mesas y piezas únicas fabricadas y terminadas a mano en nuestro taller.', 'Desde cotización', array['Piezas únicas','Madera y acabados reales','Hecho a mano'], '/images/taller/portfolio-bano-mueble-3.jpeg', 3),
  ('🪵', 'Puertas y ventanas de madera', 'Fabricamos e instalamos puertas de madera maciza con el ajuste y acabado perfectos para tu espacio.', 'Desde cotización', array['Madera seleccionada','Ajuste perfecto','Instalación incluida'], '/images/taller/taller-detalle-trabajo-1.jpeg', 4),
  ('🛋️', 'Muebles de sala', 'Centros de entretenimiento, mesas de centro y muebles modulares con diseño cálido y moderno.', 'Desde cotización', array['Diseño moderno','Materiales de calidad','Entrega e instalación'], '/images/stock/servicio-salas-1.jpeg', 5)
) as v(icono, titulo, descripcion, precio, features, imagen, orden)
where not exists (select 1 from public.servicios);

insert into public.portfolio (titulo, categoria, descripcion, imagen_url, activo, orden)
select * from (values
  ('Mueble de baño a la medida', 'Muebles', 'Gabinete en acabado wengué con cubierta blanca, lavabo tipo bowl y llave en negro/dorado.', '/images/taller/portfolio-bano-mueble-1.jpeg', true, 1),
  ('Detalle de acabados y herrajes', 'Muebles', 'Interior del gabinete con bisagras de cierre suave y organización funcional.', '/images/taller/portfolio-bano-mueble-5.jpeg', true, 2),
  ('Vista completa del proyecto', 'Muebles', 'Diseño compacto pensado a la medida del espacio disponible en el baño.', '/images/taller/portfolio-bano-mueble-8.jpeg', true, 3),
  ('Cocina integral con isla de cuarzo', 'Cocinas', 'Gabinetes en madera clara y blanco, isla con cubierta de cuarzo y parrilla de gas empotrada.', '/images/taller/portfolio-cocina-integral-1.jpeg', true, 4),
  ('Isla de cocina con cubierta de mármol', 'Cocinas', 'Isla central en acabado gris con cubierta de mármol, ideal para desayunador y servicio.', '/images/taller/portfolio-cocina-isla-marmol-1.jpeg', true, 5),
  ('Cocina integral en acabado grafito', 'Cocinas', 'Gabinetes altos y bajos en acabado grafito con cubierta blanca y campana extractora.', '/images/taller/portfolio-cocina-integral-2.jpeg', true, 6),
  ('Clóset a la medida con cajones y barras', 'Closets', 'Armario en acabado grafito con barra de ropa doble, entrepaños y cajonera.', '/images/taller/portfolio-closet-medida-1.jpeg', true, 7),
  ('Bar empotrado bajo escalera', 'Muebles', 'Aprovechamiento del espacio bajo escalera con cava de vinos, enfriador de bebidas y dispensador de agua.', '/images/taller/portfolio-bar-escalera-1.jpeg', true, 8),
  ('Cabecera de recámara con tablilla de madera', 'Muebles', 'Cabecera tapizada con panel de tablilla en dos tonos y burós flotantes a los lados.', '/images/taller/portfolio-cabecera-recamara-1.jpeg', true, 9),
  ('Centro de entretenimiento con mármol y tablilla', 'Muebles', 'Muro de TV con panel de tablilla negra, inserto de mármol veteado y repisas laterales.', '/images/taller/portfolio-muro-tv-marmol-1.jpeg', true, 10),
  ('Mueble de TV flotante en madera clara', 'Muebles', 'Panel para TV en madera clara con repisa flotante y espacio para equipo de audio.', '/images/taller/portfolio-muro-tv-madera-1.jpeg', true, 11),
  ('Mueble de baño con lavabo tipo bowl', 'Muebles', 'Tocador flotante en acabado oscuro con cubierta de cuarzo blanco, lavabo bowl y llave negro/dorado.', '/images/taller/portfolio-bano-vanity-1.jpeg', true, 12),
  ('Muro decorativo de tablilla de madera en sala', 'Salas', 'Panel de tablilla de madera de piso a techo como acento decorativo en sala principal.', '/images/taller/portfolio-sala-tablilla-1.jpeg', true, 13),
  ('Clóset con puertas corredizas', 'Closets', 'Diseño a la medida con puertas corredizas, entrepaños ajustables y cajonera central.', '/images/taller/portfolio-closet-medida-2.jpeg', true, 14),
  ('Clóset en acabado madera natural', 'Closets', 'Armario con barra de ropa, zapatera y entrepaños en acabado madera natural.', '/images/taller/portfolio-closet-medida-3.jpeg', true, 15),
  ('Isla de cocina con cubierta de mármol', 'Cocinas', 'Isla central con cubierta de mármol veteado y gabinetes en acabado mate.', '/images/taller/portfolio-cocina-isla-marmol-2.jpeg', true, 16),
  ('Cocina con isla y cubierta de mármol', 'Cocinas', 'Diseño integral con isla central, cubierta de mármol y acabados en tonos neutros.', '/images/taller/portfolio-cocina-isla-marmol-3.jpeg', true, 17),
  ('Cocina integral a la medida', 'Cocinas', 'Gabinetes altos y bajos con cubierta blanca y herrajes de cierre suave.', '/images/taller/portfolio-cocina-integral-3.jpeg', true, 18),
  ('Muro de TV con inserto de mármol', 'Muebles', 'Centro de entretenimiento con panel de tablilla y mármol veteado como acento central.', '/images/taller/portfolio-muro-tv-marmol-2.jpeg', true, 19),
  ('Mueble de TV flotante en madera', 'Muebles', 'Panel flotante en madera clara con repisas laterales y espacio para equipo de audio.', '/images/taller/portfolio-muro-tv-madera-2.jpeg', true, 20),
  ('Mueble de entrada flotante', 'Muebles', 'Mueble flotante a la medida para recibidor, con cajones y acabado en madera.', '/images/taller/portfolio-entrada-flotante-1.jpeg', true, 21),
  ('Bar con isla a la medida', 'Bar', 'Isla de bar con cubierta de mármol, enfriador de bebidas y repisas para copas.', '/images/taller/portfolio-bar-isla-1.jpeg', true, 22),
  ('Estantería de bar a la medida', 'Bar', 'Estantería empotrada con iluminación para exhibir botellas y copas.', '/images/taller/portfolio-bar-estanteria-1.jpeg', true, 23),
  ('Cabecera de recámara a la medida', 'Recámaras', 'Cabecera con panel de tablilla de madera y burós flotantes integrados.', '/images/taller/portfolio-recamara-cabecera-1.jpeg', true, 24),
  ('Gabinete de baño a la medida', 'Baños', 'Gabinete en acabado oscuro con organización interior y cierre de amortiguación.', '/images/taller/portfolio-bano-gabinete-1.jpeg', true, 25),
  ('Despensa en acabado negro', 'Muebles', 'Despensa a la medida en acabado negro mate con entrepaños ajustables.', '/images/taller/portfolio-despensa-negra-1.jpeg', true, 26),
  ('Detalle de escalera en madera', 'Muebles', 'Escalera con huellas de madera natural y acabado artesanal a la medida.', '/images/taller/portfolio-escalera-madera-1.jpeg', true, 27)
) as v(titulo, categoria, descripcion, imagen_url, activo, orden)
where not exists (select 1 from public.portfolio);
