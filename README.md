# Café Alegra · Rediseño web

Demo del rediseño del sitio de **Café Alegra**.

## Contenido

- Demo del sitio: 21 páginas HTML estáticas (inicio, tienda, café de trigo, café de especialidad, ficha de producto, packs, set descubrimiento, nosotros, café para tu negocio, blog, cobertura, contacto, seguimiento, acceso, carrito, complementos, términos, privacidad, 404 y guía de marca).

## Principios del proyecto

- **No se reprograma lo existente:** WooCommerce, Transbank y Blue Express mantienen su configuración. Solo cambia lo visual.
- **Trabajo en staging:** respaldo previo y copia de pruebas; se publica solo con aprobación del cliente.
- **Editable sin programar:** Elementor para páginas, WooCommerce para productos, precios y packs, y editor de WordPress para el blog.
- **Entrega:** dos rondas de revisión (diseño/estructura y sitio completo), pruebas en escritorio y móvil, SEO acordado y capacitación.

## SEO y rendimiento

Imágenes WebP, carga diferida, CSS/JS minificados, sitemap, robots, canonical y datos estructurados. Se verifica con Lighthouse/PageSpeed, Google Search Console y la prueba de resultados enriquecidos.

## Estructura del demo

```
index.html, tienda.html, ...   páginas
assets/css/styles.css          estilos
assets/js/                     lógica (main.js, products.js)
assets/img/                    imágenes WebP
sitemap.xml, robots.txt        SEO
```
