# Plantilla «Pizzería y comida para llevar» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **vivo**.
Todo en castellano de España, frases cortas, sin jerga. Nada de arquitectura técnica en los textos de la web.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga, lo tipa y normaliza las listas (`platos`, `ofertas`, `items` con `url`); no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = rojo tomate, acento = amarillo, fondo = blanco roto, texto = casi negro). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…); los derivados (`--oscuro` de la cabecera, el pie y las bandas negras, `--claro` de los tiques y el formulario, `--primario-oscuro`) salen con `color-mix` en `src/styles/global.css`. El diseño aguanta que el cliente cambie los cuatro (el texto sobre el primario es blanco: el primario debe ser oscuro o saturado).
- **Tipografías y aspecto**: `src/styles/global.css`. Títulos en condensada pesada del sistema (`Impact` y similares, mayúsculas, `font-synthesis: none`); texto en la sans del sistema; letra de máquina para la validez de las ofertas y las notas. Sin fuentes externas.
- **Motivos**: mantel de cuadros (`.mantel` franja y `.cuadros` fondo), sombras duras desplazadas (`--sombra`), cinta roja inclinada bajo la portada (`.cinta`), pegatina en estrella (`.pegatina`) y tiques con borde dentado (`.tique`).
- **Imágenes**: en `public/`. Fotos en `public/fotos/` (se generan a partir de `fotos.json`); si una foto de `/fotos/` falta, `Imagen.astro` muestra `/placeholders/<mismo nombre>.svg`. En `site.yaml` van con ruta absoluta (`/fotos/hero.jpg`). Personas: siempre `/placeholders/persona.svg`, nunca caras generadas.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = sello redondo con una porción + nombre en texto.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis). El pie trae también la barra fija de móvil «Llamar / WhatsApp» (sale con `contacto.telefono` o `contacto.whatsapp`).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`. Todas son bandas a todo el ancho.
- `hero` → `src/components/secciones/hero.astro` (portada partida: negro con el título gigante | foto a sangre con corte en diagonal; cinta inclinada con `items`)
- `carta` → `carta.astro` (una banda por categoría, alternando claro y negro)
- `pedidos` → `pedidos.astro` (banda roja «Pide ahora» con las vías de pedido)
- `ofertas` → `ofertas.astro` (banda negra con tiques)
- `sobre` → `sobre.astro` (foto a sangre | texto, y franja de fotos de borde a borde)
- `zonas` → `zonas.astro` (horario sobre negro | zonas de reparto sobre mantel de cuadros)
- `opiniones` → `opiniones.astro` (banda amarilla, la primera opinión enorme)
- `preguntas` → `preguntas.astro` (acordeón `details/summary`; sin preguntas no se pinta)
- `contacto` → `contacto.astro` (vías sobre rojo | formulario sobre claro)
- `texto` → `texto.astro` (apartado genérico para `tipo: texto`)

## Campos propios de esta plantilla (además del esquema común)
- `hero`: `cta` y `cta_secundario` (sin `cta` el botón llama; sin `cta_secundario` lleva al mapa); `etiqueta` = texto corto de la pegatina sobre la foto; `items` = detalles cortos (solo `titulo`) en la cinta roja.
- `carta.platos` [{nombre, texto, precio, categoria, destacado, imagen}]: se agrupan por `categoria` en el orden en que aparecen (con dos o más categorías sale un índice de enlaces). Con `imagen`, ficha con foto 4:3 y precio en etiqueta roja; sin ella, ficha de texto con filete rojo. `precio` SIEMPRE como cadena (`"9,50 €"`); vacío = sin precio. `destacado: true` pone la marca amarilla (texto en `carta.marca_destacado`).
- `pedidos.items` [{titulo, texto, icono, url}]: vías de pedido. `url`: `tel:…`, `https://wa.me/…` o la página de una aplicación de reparto (opcional). Iconos que usa: `telefono`, `whatsapp`, `moto` (también hay `bolsa`, `pizza`, `fuego`, `ticket`). Sin `items`, salen solas las vías de `contacto` (teléfono y WhatsApp). `nota`: pedido mínimo, gastos de envío…
- `ofertas.ofertas` [{titulo, texto, precio, validez}]: `precio` como cadena («11,90 €», «-50 %»), `validez` en texto libre. Sin ofertas ni texto, la sección no se pinta.
- `sobre`: `texto` largo (párrafos separados por una línea en blanco), `imagen` vertical, `declaracion` (frase corta), `items` (puntos fuertes numerados: `titulo` + `texto`) y `galeria` (franja de hasta 6 fotos cuadradas).
- `zonas`: `horario` [{dia, horas}] (sin él, `contacto.horario`) e `items` [{titulo, texto}] = barrios o pueblos de reparto y sus condiciones. Los `titulo` de las zonas salen en el JSON-LD como `areaServed`.
- `opiniones.testimonios` [{texto, autor, nota}]: `nota` opcional (de dónde viene). Sin estrellas ni puntuaciones.

## Reglas para órdenes
1. **Activar o quitar una sección**: `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, platos, precios, ofertas, horarios, zonas, fotos**: solo en `site.yaml`. Si un texto contiene comas o «: » dentro de `{ … }`, entre comillas. Precios siempre entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Para agrupar platos usa `categoria`; para varios datos, una cadena. Máximo 24 elementos por lista.
5. **Nunca inventes** precios, ofertas, cifras ni opiniones: si el cliente no los da, déjalos vacíos (los componentes lo soportan).
6. **Página nueva**: `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
7. **Apartado nuevo**: `secciones.<id>` en `site.yaml` con `tipo:` = `texto`, `carta`, `ofertas`, `pedidos`, `zonas`, `opiniones`, `preguntas`… `src/pages/index.astro` lo recoge solo; no lo toques.
8. **No tocar** `src/pages/index.astro`, `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base (canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio y de las preguntas, robots, sitemap y llms.txt) y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro`, sin JavaScript nuevo (solo el de cerrar el menú móvil), 16 px de margen lateral del texto en móvil, fotos y fondos de borde a borde, sin scroll horizontal a 375 px, botones de 44 px de alto como mínimo. `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
10. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.
