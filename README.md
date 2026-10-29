# Plantilla NoExpertise · Pizzería y comida para llevar

Web a todo color para pizzerías, hamburgueserías y comida para llevar: carta con fotos, pedidos y reparto.

- Sectores: pizzeria, hamburgueseria, comida-rapida, food-truck, kebab, comida-llevar. Estilo: vivo. Plan mínimo: gratis.
- Secciones: hero, carta, pedidos, ofertas, sobre, zonas, opiniones, preguntas, contacto (y `texto` para apartados nuevos).
- Diseño a ancho completo: cabecera negra fija con «Pide ahora», portada partida (título gigante sobre negro | foto del producto a sangre con corte en diagonal y pegatina), cinta roja inclinada, carta en bandas alternas claro/negro con fichas de foto y precio en etiqueta, banda roja «Pide ahora» con mantel de cuadros y tres botones grandes (teléfono, WhatsApp, aplicación de reparto), ofertas en tiques dentados sobre negro, la masa en mitades a sangre con franja de fotos, horario sobre negro | zonas de reparto sobre mantel, opiniones en banda amarilla con una cita enorme, preguntas en acordeón, contacto rojo | formulario y pie negro con el nombre a todo el ancho. En móvil, barra fija «Llamar / WhatsApp».
- Ejemplo: «La Pala», pizzería ficticia en la calle San Fernando de Alicante.
- Campos propios: `hero.etiqueta`; `carta.platos` (nombre, texto, precio, categoria, destacado, imagen) y `carta.marca_destacado`; `pedidos.items` (titulo, texto, icono, url) y `pedidos.nota`; `ofertas.ofertas` (titulo, texto, precio, validez); `sobre.declaracion` y `sobre.galeria`; `zonas.horario` (dia, horas) y `zonas.items` (titulo, texto). Detalle en `CLAUDE.md`; brief de diseño en `DISEÑO.md`.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio (con `areaServed` de las zonas) y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Imágenes de relleno (`public/placeholders/`) dibujadas para esta plantilla, sin licencias de terceros.
