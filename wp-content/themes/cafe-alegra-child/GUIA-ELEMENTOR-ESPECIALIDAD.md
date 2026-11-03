# Guía de Implementación en WordPress: Café de Especialidad

Esta guía detalla cómo montar la página **Café de Especialidad** (`cafe-de-especialidad.html`) en WordPress usando **Hello Elementor + WooCommerce** y el child theme `cafe-alegra-child`.

---

## 1. Arquitectura de Categorías en WooCommerce

En **Productos > Categorías**, crear la siguiente estructura jerárquica:

- **Café de Especialidad** (Categoría Principal - Slug: `cafe-de-especialidad`)
  - **Cafés de Origen** (Subcategoría - Slug: `origen`)
    - *Productos asignados:* Guatemala, Bolivia, Colombia.
  - **Línea Praliné / Sabores de Autor** (Subcategoría - Slug: `autor`)
    - *Productos asignados:* Avellana, Nuez, Pistacho.
  - **Packs de Especialidad** (Subcategoría - Slug: `packs-especialidad`)

---

## 2. Montaje en Elementor (Paso a Paso)

### Contenedor 1: Hero de Categoría
- **Fondo:** `#1b120c` (Espresso)
- **Migas de pan:** Widget *Breadcrumbs* de Yoast/RankMath o WooCommerce.
- **Kicker:** "Categoría Permanente · 100% Arábica de Altura" (Tipografía: Jost, oro claro `#d9b36a`).
- **Título H1:** "Café de *Especialidad*" (Tipografía: Cormorant Garamond).

### Contenedor 2: Barra Sticky de Subcategorías
- **Posición:** Sticky (Top: 0)
- **Shortcode:** `[cafe_alegra_subcat_nav]`
- Permite al usuario desplazarse con un toque entre *Orígenes*, *Praliné* y *Pilares de Calidad*.

### Contenedor 3: Cafés por Origen Seleccionado
- **Fondo:** Crema claro `#fdfbf7`
- **Encabezado:** "Trazabilidad y Terroir · 84–85 SCA" -> H2: "Cafés por *Origen Seleccionado*".
- **Loop de Productos:**
  - Opción A (Elementor Pro): Widget *Products*, Query: Categoría = `origen`, Columnas: `3`.
  - Opción B (Shortcode nativo): `[products category="origen" columns="3" orderby="menu_order"]`.

### Contenedor 4: Colección Praliné · Sabores de Autor
- **Fondo:** Degradado cálido suave (clase CSS: `sec-praline`).
- **Encabezado:** "Ensambles de Autor · Base Guatemala 85 SCA" -> H2: "Colección Praliné con *Identidad Propia*".
- **Paleta de Etiquetas:** Shortcode `[cafe_alegra_praline_palette]` (inserta los tags `#9B552B`, `#507B2E`, `#9C182F`, `#C0CA80`).
- **Loop de Productos:**
  - `[products category="autor" columns="3"]`.

### Contenedor 5: Tres Pilares de Nuestra Especialidad
- **Fondo:** Crema claro.
- **Shortcode:** `[cafe_alegra_quality_pillars]`.
- **Botón:** "Conocer más sobre territorio y procesos" -> Enlace a `/blog/origen-y-territorio`.

---

## 3. Atributos y Fichas de Producto en WooCommerce
Para cada café:
- **Tipo de producto:** Variable.
- **Atributos:**
  - *Molienda:* Grano entero | Molido Moka | Molido Prensa | Molido Filtro / Espresso.
  - *Formato:* 250 g (para Orígenes) / 100 g y 250 g (para Praliné).
- **Campos personalizados (ACF):**
  - `alegra_historia_titulo`: Título de la historia territorial.
  - `alegra_historia_cuerpo`: Relato del origen, altitud y notas.
  - El botón **"★ ¿Quieres saber más? Conoce su historia y origen"** se renderiza automáticamente en la ficha gracias al hook configurado en `functions.php`.
