// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
/** Elemento genérico. `url` (opcional) lo usan las vías de pedido: teléfono, WhatsApp o una plataforma de reparto. */
export interface Item { titulo: string; texto: string; icono: string; imagen: string; url: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión. `nota` es opcional (de dónde viene: «Google», «TripAdvisor»…). */
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/** Plato de la carta. `categoria` agrupa (en el orden en que aparece); `precio` siempre como cadena («12,50 €»); `imagen` opcional. */
export interface Plato { nombre: string; texto: string; precio: string; categoria: string; destacado: boolean; imagen: string }
/** Oferta o promoción: `precio` como cadena («2 × 18 €»), `validez` en texto libre («Martes y miércoles»). */
export interface Oferta { titulo: string; texto: string; precio: string; validez: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  /** carta */
  platos: Plato[];
  marca_destacado?: string;
  /** ofertas */
  ofertas: Oferta[];
  /** hero: pegatina sobre la foto */
  etiqueta?: string;
  /** sobre */
  declaracion?: string;
  /** pedidos y ofertas */
  nota?: string;
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v).trim());

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    items: lista<Crudo>(s.items)
      .filter((i) => typeof i === 'object' && (texto(i.titulo) || texto(i.texto)))
      .map((i) => ({ ...i, titulo: texto(i.titulo), texto: texto(i.texto), icono: texto(i.icono), imagen: texto(i.imagen), url: texto(i.url) })),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios).filter((t) => texto(t.texto)) as Testimonio[],
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario)
      .filter((h) => texto(h.dia) || texto(h.horas))
      .map((h) => ({ dia: texto(h.dia), horas: texto(h.horas) })),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    platos: lista<Crudo>(s.platos)
      .filter((p) => texto(p.nombre))
      .map((p) => ({
        nombre: texto(p.nombre),
        texto: texto(p.texto),
        precio: texto(p.precio),
        categoria: texto(p.categoria),
        destacado: p.destacado === true,
        imagen: texto(p.imagen),
      })),
    ofertas: lista<Crudo>(s.ofertas)
      .filter((o) => texto(o.titulo))
      .map((o) => ({ titulo: texto(o.titulo), texto: texto(o.texto), precio: texto(o.precio), validez: texto(o.validez) })),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi pizzería',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#d62b1f', acento: '#ffc93c', fondo: '#fffdf8', texto: '#161210', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'Restaurant',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Agrupa una lista por un campo escalar (p. ej. `categoria`), respetando el orden en que aparece cada grupo. */
export function agrupar<T>(items: T[], campo: (x: T) => string | undefined): { grupo: string; items: T[] }[] {
  const grupos: { grupo: string; items: T[] }[] = [];
  for (const it of items) {
    const g = (campo(it) ?? '').trim();
    let destino = grupos.find((x) => x.grupo === g);
    if (!destino) grupos.push((destino = { grupo: g, items: [] }));
    destino.items.push(it);
  }
  return grupos;
}

/** Ancla a partir de un texto («Pizzas al horno» → «pizzas-al-horno»). */
export const ancla = (t: string) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'grupo';

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** ¿Enlace a otra web? (se abre en pestaña nueva). */
export const externo = (u?: string) => !!u && /^https?:/i.test(u);
/** Atributos para un enlace: pestaña nueva si va a otra web. */
export const destino = (u?: string) => (externo(u) ? { rel: 'noopener', target: '_blank' } : {});
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** Líneas sueltas de un texto. */
export const lineas = (t?: string) => (t ? t.split(/\n/).map((p) => p.trim()).filter(Boolean) : []);
