export type Perfil = {
  id?: string;
  nombre: string;
  descripcion: string;
  telefono: string;
  email: string;
  ciudad: string;
  hero_titulo: string;
  hero_subtitulo: string;
  anos_experiencia: number;
  proyectos_completados: number;
};

export type Proyecto = {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  imagen_url: string;
  activo: boolean;
  orden: number;
};

export type Servicio = {
  id: string;
  icono: string;
  titulo: string;
  descripcion: string;
  precio: string;
  features: string[];
  imagen: string | null;
  activo: boolean;
  orden: number;
};

export type EstadoCotizacion = "pendiente" | "en proceso" | "completado" | "cancelado";

export type Cotizacion = {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string;
  email: string | null;
  servicio: string;
  descripcion: string | null;
  estado: EstadoCotizacion;
};

export const PERFIL_DEFAULT: Perfil = {
  nombre: "Carpintería Morales",
  descripcion: "Artesanía en madera con más de 15 años de experiencia.",
  telefono: "19159776252",
  email: "contacto@carpinteriafm.mx",
  ciudad: "Ciudad Juárez, Chihuahua, México",
  hero_titulo: "Transformamos la madera en arte para tu hogar",
  hero_subtitulo:
    "Más de 15 años creando muebles únicos, puertas, closets y cocinas con la mejor madera.",
  anos_experiencia: 15,
  proyectos_completados: 500,
};

export const CATEGORIAS_PORTFOLIO = [
  "Todos",
  "Cocinas",
  "Closets",
  "Muebles",
  "Puertas",
  "Salas",
  "Baños",
  "Recámaras",
  "Bar",
];

export const SERVICIOS_COTIZACION = [
  "Cocina integral",
  "Closet a la medida",
  "Puerta o ventana",
  "Mueble de sala",
  "Comedor",
  "Proyecto comercial",
  "Otro",
];

export const SERVICIOS_DEFAULT: Servicio[] = [
  {
    id: "fallback-cocinas",
    icono: "🍳",
    titulo: "Cocinas integrales",
    descripcion:
      "Diseñamos y fabricamos cocinas a la medida, con isla, cubierta y acabados que combinan funcionalidad y estilo.",
    precio: "Desde cotización",
    features: ["Diseño a medida", "Instalación incluida", "Garantía de fabricación"],
    imagen: "/images/stock/servicio-cocinas-1.jpeg",
    activo: true,
    orden: 1,
  },
  {
    id: "fallback-closets",
    icono: "🚪",
    titulo: "Closets a la medida",
    descripcion:
      "Aprovechamos cada espacio con closets funcionales, organizadores internos y acabados en madera o laminado.",
    precio: "Desde cotización",
    features: ["Aprovechamiento de espacio", "Organizadores internos", "Acabados personalizados"],
    imagen: "/images/stock/servicio-closets-1.jpeg",
    activo: true,
    orden: 2,
  },
  {
    id: "fallback-muebles",
    icono: "🪑",
    titulo: "Muebles personalizados",
    descripcion:
      "Gabinetes, muebles de baño, mesas y piezas únicas fabricadas y terminadas a mano en nuestro taller.",
    precio: "Desde cotización",
    features: ["Piezas únicas", "Madera y acabados reales", "Hecho a mano"],
    imagen: "/images/taller/portfolio-bano-mueble-3.jpeg",
    activo: true,
    orden: 3,
  },
  {
    id: "fallback-puertas",
    icono: "🪵",
    titulo: "Puertas y ventanas de madera",
    descripcion:
      "Fabricamos e instalamos puertas de madera maciza con el ajuste y acabado perfectos para tu espacio.",
    precio: "Desde cotización",
    features: ["Madera seleccionada", "Ajuste perfecto", "Instalación incluida"],
    imagen: "/images/taller/taller-detalle-trabajo-1.jpeg",
    activo: true,
    orden: 4,
  },
  {
    id: "fallback-salas",
    icono: "🛋️",
    titulo: "Muebles de sala",
    descripcion:
      "Centros de entretenimiento, mesas de centro y muebles modulares con diseño cálido y moderno.",
    precio: "Desde cotización",
    features: ["Diseño moderno", "Materiales de calidad", "Entrega e instalación"],
    imagen: "/images/stock/servicio-salas-1.jpeg",
    activo: true,
    orden: 5,
  },
];

export const PORTFOLIO_DEFAULT: Proyecto[] = [
  {
    "id": "fallback-mueble-bano-1",
    "titulo": "Mueble de baño a la medida",
    "categoria": "Muebles",
    "descripcion": "Gabinete en acabado wengué con cubierta blanca, lavabo tipo bowl y llave en negro/dorado.",
    "imagen_url": "/images/taller/portfolio-bano-mueble-1.jpeg",
    "activo": true,
    "orden": 1
  },
  {
    "id": "fallback-mueble-bano-2",
    "titulo": "Detalle de acabados y herrajes",
    "categoria": "Muebles",
    "descripcion": "Interior del gabinete con bisagras de cierre suave y organización funcional.",
    "imagen_url": "/images/taller/portfolio-bano-mueble-5.jpeg",
    "activo": true,
    "orden": 2
  },
  {
    "id": "fallback-mueble-bano-3",
    "titulo": "Vista completa del proyecto",
    "categoria": "Muebles",
    "descripcion": "Diseño compacto pensado a la medida del espacio disponible en el baño.",
    "imagen_url": "/images/taller/portfolio-bano-mueble-8.jpeg",
    "activo": true,
    "orden": 3
  },
  {
    "id": "fallback-cocina-integral-1",
    "titulo": "Cocina integral con isla de cuarzo",
    "categoria": "Cocinas",
    "descripcion": "Gabinetes en madera clara y blanco, isla con cubierta de cuarzo y parrilla de gas empotrada.",
    "imagen_url": "/images/taller/portfolio-cocina-integral-1.jpeg",
    "activo": true,
    "orden": 4
  },
  {
    "id": "fallback-cocina-isla-marmol-1",
    "titulo": "Isla de cocina con cubierta de mármol",
    "categoria": "Cocinas",
    "descripcion": "Isla central en acabado gris con cubierta de mármol, ideal para desayunador y servicio.",
    "imagen_url": "/images/taller/portfolio-cocina-isla-marmol-1.jpeg",
    "activo": true,
    "orden": 5
  },
  {
    "id": "fallback-cocina-integral-2",
    "titulo": "Cocina integral en acabado grafito",
    "categoria": "Cocinas",
    "descripcion": "Gabinetes altos y bajos en acabado grafito con cubierta blanca y campana extractora.",
    "imagen_url": "/images/taller/portfolio-cocina-integral-2.jpeg",
    "activo": true,
    "orden": 6
  },
  {
    "id": "fallback-closet-medida-1",
    "titulo": "Clóset a la medida con cajones y barras",
    "categoria": "Closets",
    "descripcion": "Armario en acabado grafito con barra de ropa doble, entrepaños y cajonera.",
    "imagen_url": "/images/taller/portfolio-closet-medida-1.jpeg",
    "activo": true,
    "orden": 7
  },
  {
    "id": "fallback-bar-escalera-1",
    "titulo": "Bar empotrado bajo escalera",
    "categoria": "Muebles",
    "descripcion": "Aprovechamiento del espacio bajo escalera con cava de vinos, enfriador de bebidas y dispensador de agua.",
    "imagen_url": "/images/taller/portfolio-bar-escalera-1.jpeg",
    "activo": true,
    "orden": 8
  },
  {
    "id": "fallback-cabecera-recamara-1",
    "titulo": "Cabecera de recámara con tablilla de madera",
    "categoria": "Muebles",
    "descripcion": "Cabecera tapizada con panel de tablilla en dos tonos y burós flotantes a los lados.",
    "imagen_url": "/images/taller/portfolio-cabecera-recamara-1.jpeg",
    "activo": true,
    "orden": 9
  },
  {
    "id": "fallback-muro-tv-marmol-1",
    "titulo": "Centro de entretenimiento con mármol y tablilla",
    "categoria": "Muebles",
    "descripcion": "Muro de TV con panel de tablilla negra, inserto de mármol veteado y repisas laterales.",
    "imagen_url": "/images/taller/portfolio-muro-tv-marmol-1.jpeg",
    "activo": true,
    "orden": 10
  },
  {
    "id": "fallback-muro-tv-madera-1",
    "titulo": "Mueble de TV flotante en madera clara",
    "categoria": "Muebles",
    "descripcion": "Panel para TV en madera clara con repisa flotante y espacio para equipo de audio.",
    "imagen_url": "/images/taller/portfolio-muro-tv-madera-1.jpeg",
    "activo": true,
    "orden": 11
  },
  {
    "id": "fallback-bano-vanity-1",
    "titulo": "Mueble de baño con lavabo tipo bowl",
    "categoria": "Muebles",
    "descripcion": "Tocador flotante en acabado oscuro con cubierta de cuarzo blanco, lavabo bowl y llave negro/dorado.",
    "imagen_url": "/images/taller/portfolio-bano-vanity-1.jpeg",
    "activo": true,
    "orden": 12
  },
  {
    "id": "fallback-sala-tablilla-1",
    "titulo": "Muro decorativo de tablilla de madera en sala",
    "categoria": "Salas",
    "descripcion": "Panel de tablilla de madera de piso a techo como acento decorativo en sala principal.",
    "imagen_url": "/images/taller/portfolio-sala-tablilla-1.jpeg",
    "activo": true,
    "orden": 13
  },
  {
    "id": "fallback-closet-medida-2",
    "titulo": "Clóset con puertas corredizas",
    "categoria": "Closets",
    "descripcion": "Diseño a la medida con puertas corredizas, entrepaños ajustables y cajonera central.",
    "imagen_url": "/images/taller/portfolio-closet-medida-2.jpeg",
    "activo": true,
    "orden": 14
  },
  {
    "id": "fallback-closet-medida-3",
    "titulo": "Clóset en acabado madera natural",
    "categoria": "Closets",
    "descripcion": "Armario con barra de ropa, zapatera y entrepaños en acabado madera natural.",
    "imagen_url": "/images/taller/portfolio-closet-medida-3.jpeg",
    "activo": true,
    "orden": 15
  },
  {
    "id": "fallback-cocina-isla-marmol-2",
    "titulo": "Isla de cocina con cubierta de mármol",
    "categoria": "Cocinas",
    "descripcion": "Isla central con cubierta de mármol veteado y gabinetes en acabado mate.",
    "imagen_url": "/images/taller/portfolio-cocina-isla-marmol-2.jpeg",
    "activo": true,
    "orden": 16
  },
  {
    "id": "fallback-cocina-isla-marmol-3",
    "titulo": "Cocina con isla y cubierta de mármol",
    "categoria": "Cocinas",
    "descripcion": "Diseño integral con isla central, cubierta de mármol y acabados en tonos neutros.",
    "imagen_url": "/images/taller/portfolio-cocina-isla-marmol-3.jpeg",
    "activo": true,
    "orden": 17
  },
  {
    "id": "fallback-cocina-integral-3",
    "titulo": "Cocina integral a la medida",
    "categoria": "Cocinas",
    "descripcion": "Gabinetes altos y bajos con cubierta blanca y herrajes de cierre suave.",
    "imagen_url": "/images/taller/portfolio-cocina-integral-3.jpeg",
    "activo": true,
    "orden": 18
  },
  {
    "id": "fallback-muro-tv-marmol-2",
    "titulo": "Muro de TV con inserto de mármol",
    "categoria": "Muebles",
    "descripcion": "Centro de entretenimiento con panel de tablilla y mármol veteado como acento central.",
    "imagen_url": "/images/taller/portfolio-muro-tv-marmol-2.jpeg",
    "activo": true,
    "orden": 19
  },
  {
    "id": "fallback-muro-tv-madera-2",
    "titulo": "Mueble de TV flotante en madera",
    "categoria": "Muebles",
    "descripcion": "Panel flotante en madera clara con repisas laterales y espacio para equipo de audio.",
    "imagen_url": "/images/taller/portfolio-muro-tv-madera-2.jpeg",
    "activo": true,
    "orden": 20
  },
  {
    "id": "fallback-entrada-flotante-1",
    "titulo": "Mueble de entrada flotante",
    "categoria": "Muebles",
    "descripcion": "Mueble flotante a la medida para recibidor, con cajones y acabado en madera.",
    "imagen_url": "/images/taller/portfolio-entrada-flotante-1.jpeg",
    "activo": true,
    "orden": 21
  },
  {
    "id": "fallback-bar-isla-1",
    "titulo": "Bar con isla a la medida",
    "categoria": "Bar",
    "descripcion": "Isla de bar con cubierta de mármol, enfriador de bebidas y repisas para copas.",
    "imagen_url": "/images/taller/portfolio-bar-isla-1.jpeg",
    "activo": true,
    "orden": 22
  },
  {
    "id": "fallback-bar-estanteria-1",
    "titulo": "Estantería de bar a la medida",
    "categoria": "Bar",
    "descripcion": "Estantería empotrada con iluminación para exhibir botellas y copas.",
    "imagen_url": "/images/taller/portfolio-bar-estanteria-1.jpeg",
    "activo": true,
    "orden": 23
  },
  {
    "id": "fallback-recamara-cabecera-1",
    "titulo": "Cabecera de recámara a la medida",
    "categoria": "Recámaras",
    "descripcion": "Cabecera con panel de tablilla de madera y burós flotantes integrados.",
    "imagen_url": "/images/taller/portfolio-recamara-cabecera-1.jpeg",
    "activo": true,
    "orden": 24
  },
  {
    "id": "fallback-bano-gabinete-1",
    "titulo": "Gabinete de baño a la medida",
    "categoria": "Baños",
    "descripcion": "Gabinete en acabado oscuro con organización interior y cierre de amortiguación.",
    "imagen_url": "/images/taller/portfolio-bano-gabinete-1.jpeg",
    "activo": true,
    "orden": 25
  },
  {
    "id": "fallback-despensa-negra-1",
    "titulo": "Despensa en acabado negro",
    "categoria": "Muebles",
    "descripcion": "Despensa a la medida en acabado negro mate con entrepaños ajustables.",
    "imagen_url": "/images/taller/portfolio-despensa-negra-1.jpeg",
    "activo": true,
    "orden": 26
  },
  {
    "id": "fallback-escalera-madera-1",
    "titulo": "Detalle de escalera en madera",
    "categoria": "Muebles",
    "descripcion": "Escalera con huellas de madera natural y acabado artesanal a la medida.",
    "imagen_url": "/images/taller/portfolio-escalera-madera-1.jpeg",
    "activo": true,
    "orden": 27
  }
];
