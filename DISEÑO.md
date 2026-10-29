# Pizzería y comida para llevar: brief de diseño

Plantilla `pizzeria-comida-rapida` creada el 29/10/2026 a partir de `restaurante` con `php artisan plantillas:nueva` y
rediseñada entera (fila 7 del brief de la tanda «a ancho completo»). Este fichero se queda en el repo: es lo que lee
quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: pizzerías, hamburgueserías, kebabs, food trucks y locales de comida para llevar o a domicilio. Su
  cliente entra con hambre y el móvil en la mano: quiere ver la carta con fotos y precios, saber si están abiertos y
  si le llevan a su barrio, y pedir ya.
- **Qué tiene que conseguir la web**: el pedido. Acciones: «Pide ahora» (cabecera, portada y banda roja), «Llamar» y
  «WhatsApp» en una barra fija de móvil, y enlace opcional a una aplicación de reparto.
- **Tono y estilo** (`estilo: vivo`): directo, con hambre, de barrio. Sí: rótulos de pizzería, manteles de cuadros,
  tiques de comanda, cajas de cartón, cartelería en mayúsculas. No: la elegancia oscura de `restaurante`, el café
  redondeado y mostaza de `cafeteria-brunch` ni la «caja centrada con tarjetas blancas».
- **Ancho completo**: todas las secciones son bandas de borde a borde; fotos a sangre (portada, mitad de «la masa»,
  franja de fotos sin márgenes); contenido hasta 90 rem con 16 px de margen lateral en móvil y 2 rem desde tableta.

## Concepto visual

- **Paleta de ejemplo**: primario `#d62b1f` (rojo tomate), acento `#ffc93c` (amarillo queso, solo en detalles y en la
  banda de opiniones), fondo `#fffdf8` (blanco roto), texto `#161210` (casi negro). Derivados con `color-mix`:
  `--oscuro` (cabecera, bandas negras y pie), `--claro` (tiques y formulario), `--primario-oscuro`. Texto blanco
  sobre el primario (contraste AA con el rojo del ejemplo).
- **Tipografía**: condensada pesada del sistema para títulos (`Impact`, `Haettenschweiler`, `Arial Narrow Bold`,
  `sans-serif-condensed` en Android), siempre en mayúsculas y sin negrita sintética (`font-synthesis: none`); portada
  de 3 rem en móvil a 7,75 rem en escritorio. Texto en la sans del sistema; letra de máquina (`ui-monospace`) en la
  validez de las ofertas y las notas. Antetítulos en mayúsculas espaciadas con raya de 4 px.
- **Forma**: esquinas rectas; botones de color pleno con **sombra dura desplazada** (`--sombra`: negra sobre claro,
  amarilla sobre negro, negra sobre rojo); **mantel de cuadros** (franja `.mantel` arriba de la banda roja y del pie,
  fondo `.cuadros` en las zonas); **cinta roja inclinada** (-1,6°) con los detalles bajo la portada; **pegatina**
  amarilla en estrella sobre la foto; **tiques** con borde dentado (máscara CSS) algo torcidos; filetes negros gruesos.
- **Ritmo de bandas**: portada negro|foto → cinta roja → carta (cabecera clara, categorías alternas claro/negro) →
  pide ahora (rojo) → ofertas (negro) → la masa (foto|claro) + franja de fotos → horario (negro) | zonas (mantel) →
  opiniones (amarillo) → preguntas (claro) → contacto (rojo|claro) → pie negro con mantel.

## Apartados (en orden)

1. `hero`: portada partida (11fr | 9fr, mínimo 92svh menos la cabecera en escritorio; en móvil, foto arriba con corte
   inclinado). Antetítulo, título gigante, texto, dos botones, `etiqueta` en pegatina, `items` en la cinta.
2. `carta`: titular a lo ancho (título | texto) con índice de categorías; cada `categoria` de `platos` es una banda
   con su título y raya roja; fichas en 1/2/3/4 columnas (560/900/1200 px): con foto, precio en etiqueta roja sobre la
   foto y marca amarilla si es `destacado`; sin foto, filete rojo y precio a la derecha.
3. `pedidos`: banda roja con mantel, título enorme (hasta 9,5 rem) y las vías (`items` con `url`) como bloques
   blancos con icono en círculo rojo, sombra negra y flecha; `nota` en letra de máquina. Sin `items`, las de contacto.
4. `ofertas`: banda negra con `ofertas` en tiques (validez arriba, título, texto, precio grande en rojo abajo).
5. `sobre`: foto vertical a sangre a la izquierda; antetítulo, título, `declaracion` en rojo, párrafos y `items`
   numerados (01, 02…) con filete negro; debajo `galeria` como franja de cuadrados (2 columnas en móvil, hasta 6).
6. `zonas`: mitad negra con `horario` en tabla grande; mitad de mantel con `items` (zonas) en placas blancas con
   sombra negra y una placa con la dirección, «Cómo llegar» y teléfono. Sin zonas ni contacto, una sola banda negra.
7. `opiniones`: banda amarilla; la primera opinión en mayúsculas condensadas enormes con comilla roja gigante; las
   demás en dos columnas.
8. `preguntas`: titular fijo a la izquierda en escritorio; acordeón con «+» en cuadrado rojo.
9. `contacto`: mitad roja con titular y vías (teléfono, WhatsApp, email, dirección) en círculos blancos; mitad clara
   con el formulario `mailto`.
- `texto` (genérico): banda amarilla muy clara; con foto, mitades a sangre texto|foto.
- Pie: mantel, nombre en rojo a todo el ancho (hasta 13 rem), eslogan, cuatro columnas (horario, dónde estamos,
  pedidos, menú y redes), aviso legal y marca NoExpertise. Barra fija «Llamar / WhatsApp» por debajo de 900 px.

## Fotos

13 fotos en `fotos.json` (portada 1:1 con la pizza saliendo del horno, 7 platos 4:3, horno 3:4 y 4 cuadradas para la
franja: masa, ingredientes, caja de reparto y el local), sin texto legible, sin logotipos y sin personas.

## Qué no hacer

- Volver al hero de foto con velo de `restaurante` o al 50/50 mostaza de `cafeteria-brunch`.
- Tarjetas blancas con sombra suave y esquinas redondeadas en una columna estrecha.
- Precios o cifras escritos en los componentes: todo sale de `site.yaml` y, sin dato, no se pinta.
