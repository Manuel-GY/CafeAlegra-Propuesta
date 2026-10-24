# Café Alegra · Rediseño web

Demo del rediseño del sitio de **Café Alegra**.

## Contenido

- Demo del sitio: 21 páginas HTML estáticas (inicio, tienda, café de trigo, café de especialidad, ficha de producto, packs, set descubrimiento, nosotros, café para tu negocio, blog, cobertura, contacto, seguimiento, acceso, carrito, complementos, términos, privacidad, 404 y guía de marca).
- Tema hijo inicial para WordPress: `wp-content/themes/cafe-alegra-child/` (ver su README antes de instalar; el tema padre Hello Elementor es provisional hasta confirmar el entorno de pruebas).

## Principios del proyecto

- **No se reprograma lo existente:** WooCommerce, Transbank y Blue Express mantienen su configuración. Solo cambia lo visual.
- **Trabajo en staging:** respaldo previo y copia de pruebas; se publica solo con aprobación del cliente.
- **Editable sin programar:** Elementor para páginas, WooCommerce para productos, precios y packs, y editor de WordPress para el blog.
- **Entrega:** dos rondas de revisión (diseño/estructura y sitio completo), pruebas en escritorio y móvil, SEO acordado y capacitación.

## SEO y rendimiento

**Requisitos por verificar antes de la entrega:** optimización de imágenes y recursos, sitemap, robots, canonical, datos estructurados y mediciones en Lighthouse/PageSpeed. No se presentan como auditados ni aprobados en esta etapa.

## Estado de implementación

- Los cambios de contenido y recorrido realizados hasta ahora corresponden al demo HTML estático.
- El tema hijo es una base visual inicial; no convierte ni importa las páginas HTML en páginas editables de Elementor.
- El catálogo comprable del demo se limita al PDF minorista enviado por el cliente: seis referencias y doce presentaciones. Guatemala ($14.500), Bolivia ($12.000) y Colombia ($13.000) en 250 g, grano o molienda media; tres ensambles Praliné molidos en 100 g ($7.000) y 250 g ($14.000). Valores con IVA incluido, sin ofertas ni cupones añadidos.
- Tienda y categorías muestran una tarjeta por referencia. “Elegir presentación” abre la ficha con dos opciones visibles de grano entero/molienda media para orígenes o 100/250 g para Praliné (solo molido), no un desplegable. Son radios nativos estilizados como botones: grupo con leyenda, estado marcado mediante contraste y ✓, foco visible, flechas para cambiar y Tab para continuar, áreas táctiles de al menos 48 px. Cambiar la selección conserva la cantidad, actualiza precio, información y URL sin recargar; los doce enlaces de variante anteriores siguen funcionando. El carrito identifica formato y molienda. Los filtros se aplican a las variantes antes de agrupar referencias; cada resultado enlaza a una variante coincidente. Relacionados no repite la referencia actual y el quiz respeta grano/molido.
- Las fichas de origen muestran el tueste oficial de las páginas 4–6: Guatemala medio, Bolivia medio suave y Colombia medio intenso. La barra segmentada compara visualmente esos tres perfiles con etiquetas textuales; no representa porcentajes ni una escala técnica/SCA. No se asigna tueste a los ensambles sin fuente confirmada.
- Los perfiles se toman de las fichas de las páginas 4-10 y los precios de la página 11 de `_catálogo Café Alegra Minoristas_FFinal (2.1).pdf`. Las seis imágenes `catalogo-*.png` aíslan las capas originales de bolsa y etiqueta de cada ficha, partiendo de sus máscaras, posiciones y recortes internos del PDF; no se reconstruyeron etiquetas ni se usaron fotos de otros productos. Se eliminaron textos, fondos, ilustraciones y la sombra raster tenue externos al packshot y se normalizaron en lienzos transparentes de 800 × 1000 px, con margen y encuadre completo. Se conservan la silueta suavizada del envase y los granos integrados en la capa original de los ensambles.
- Las imágenes se comparten entre variantes: el PDF no ofrece una foto individual para cada tamaño o molienda. Pueden mostrar un envase distinto al seleccionado (Avellana: 250 g; Nuez y Pistacho: 100 g; orígenes: 250 g con etiqueta de molienda media). La ficha mantiene esta advertencia. La nitidez del texto pequeño está limitada por los raster originales del PDF; el lienzo normalizado no implica fotografía de mayor resolución.
- El resumen de la página 3 y las fichas detalladas discrepan sobre las regiones de Guatemala y Colombia. No se publican esas regiones hasta aclararlas con el cliente.
- Trigo, packs, set de descubrimiento y accesorios quedan fuera de los productos comprables, con sus rutas señaladas como pendientes de catálogo. Esto no significa que el cliente haya descontinuado esas líneas.
- Historia, cobertura, condiciones comerciales y materiales fuera de este PDF siguen pendientes de aprobación. Los valores de envío del simulador no están respaldados por el catálogo y no son condiciones de venta confirmadas.
- La instalación, la compra de prueba, los formularios, Transbank y Blue Express siguen pendientes de acceso al WordPress de staging. No se ha probado ni modificado producción.

## Estructura del demo

```
index.html, tienda.html, ...   páginas
assets/css/styles.css          estilos
assets/js/                     lógica (main.js, products.js)
assets/img/                    imágenes WebP y packshots PNG del catálogo
sitemap.xml, robots.txt        SEO
```

El HTML estático es una demostración navegable. El carrito, el checkout, los formularios, el acceso y el seguimiento son simulados; no se deben usar como integraciones de producción. El tema hijo no carga esos scripts ni reemplaza la configuración existente de WooCommerce, Transbank o Blue Express.
