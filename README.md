# Café Alegra · Propuesta de Rediseño Web y E-commerce

Propuesta integral de rediseño para **Café Alegra** (Tostaduría Artesanal de Rancagua, Chile), estructurada según el documento estratégico acordado con el cliente (*"Plano definitivo de la página web para analizar el jueves con Manuel"*).

Este repositorio contiene la **maqueta navegable completa (HTML5 / CSS3 / Vanilla JS)** y el **tema hijo para WordPress / WooCommerce** (`cafe-alegra-child`) con estilos y hooks compatibles con **Hello Elementor**.

---

## 1. Arquitectura de Navegación: Las 4 Puertas Principales

Desde la página de inicio ([`index.html`](index.html)), el cliente accede inmediatamente a los cuatro ejes del negocio sin fricción:

1. **Nuestra Tienda:** Puerta comercial minorista con arquitectura en 3 categorías estables.
2. **Café para tu Negocio:** Puerta B2B para cafeterías, restaurantes, oficinas y eventos, con formulario de cotización mayorista y asesoría de calibración de molienda y máquinas.
3. **Seguimiento de Pedidos:** Enlace directo de rastreo mediante Blue Express con RUT y número de orden.
4. **Atención al Cliente:** Contacto directo vía WhatsApp (+56 9 7794 2117) y formulario con tiempos de respuesta claros (24 a 48 hrs hábiles).

> **Integración de Marca:** La sección *"Nuestra Casa de Cafés"* se fusionó orgánicamente dentro del Inicio, presentando la historia de la tostaduría en Rancagua, su rescate campesino y sus sellos de calidad.

---

## 2. Catálogo Comercial: Tres Categorías Estables

Se eliminó la denominación *"Familias"* para adoptar una arquitectura comercial limpia y duradera:

### A. Café de Especialidad ([`cafe-de-especialidad.html`](cafe-de-especialidad.html))
- **Cafés de Origen Único (84–85 SCA):** Lotes de altura seleccionados (Guatemala, Bolivia, Colombia). Los países, regiones y microlotes varían por cosecha estacional sin alterar la estructura fija del menú.
- **Colección Praliné / Sabores de Autor:** Fusión de grano arábica con frutos secos tostados (Avellana Chilena, Nuez, Pistacho) y notas gourmet (Cardamomo).
- **Packs Variables de Especialidad:** Cajas de degustación y regalo con orígenes rotativos.

### B. Cafés de Nuestra Tradición ([`cafes-de-tradicion-chilena.html`](cafes-de-tradicion-chilena.html))
- **Café de Higos (Disponible):** Elaborado con higos seleccionados cortados, deshidratados, tostados y molidos. 0% cafeína.
- **Café de Trigo (Estructura lista / En reserva):** Rescate patrimonial de la tradición campesina de la VI Región. Habilitado para preventa/reserva según cosecha.

### C. Complementos Cafeteros ([`complementos.html`](complementos.html))
- Accesorios esenciales para el ritual barista en el hogar: Prensas francesas (acabado cobre), Cafeteras italianas Moka (rojo tradicional), teteras cuello de cisne y filtros reutilizables de acero inoxidable.

---

## 3. Paleta Oficial de Colores y Tokens de Marca

Integrados en las hojas de estilo web ([`assets/css/styles.css`](assets/css/styles.css)) y en el tema hijo de WordPress ([`wp-content/themes/cafe-alegra-child/assets/css/brand.css`](wp-content/themes/cafe-alegra-child/assets/css/brand.css)):

| Color | Código HEX | Aplicación en la Marca |
| :--- | :--- | :--- |
| **Cobrizo** | `#9B552B` | Color maestro de acento, Praliné Nuez y Caramelo, Botones principales |
| **Pistacho** | `#507B2E` | Praliné Pistacho & Amaretto, Categoría Complementos |
| **Avellana (Borgoña)** | `#9C182F` | Praliné Avellana Chilena, Categoría Tradición |
| **Cardamomo** | `#C0CA80` | Praliné Cardamomo Gourmet |
| **Café Huila** | `#443123` | Especialidad Huila / Antioquia |
| **Rojo Huila** | `#BF1818` | Acentos de microlotes colombianos |
| **Espresso Profundo** | `#1B120C` | Tipografía principal y fondos oscuros |
| **Crema Marfil** | `#FDFBF7` | Fondo principal cálido y tarjetas |

---

## 4. Innovaciones de UX y Fichas de Producto

- **Módulo "¿Quieres saber más?" Interactivo:**
  Ubicado en la ficha de producto ([`producto.html`](producto.html)), permanece **oculto por defecto** para mantener la compra ágil. Al pulsar el botón, despliega mediante animación suave la historia del territorio, altitud, varietales, método de beneficio (lavado / secado) y notas de cata, acompañado de un botón claro para regresar a la tienda.
- **Selector de Presentación:** Radios táctiles accesibles para elegir entre *Grano entero* o *Molienda media* (orígenes) y *100 g* o *250 g* (Praliné), recalculando precios en tiempo real sin recargar página.
- **Tarjetas de Producto Compactas:** Diseño armonioso en 3 columnas (`grid g3`), con miniaturas de 200px de altura y bolsas de café a escala natural con sombra suspendida.
- **Barra de Despacho Dinámica:** Calculador interactivo de envío gratis con barra de progreso dorada en el mini-carrito.

---

## 5. Auditoría y Optimización SEO On-Page (Chile)

Implementada en los 38 archivos HTML del sitio:
- **Títulos y Meta Descripciones:** Redactados para captar intención de búsqueda transaccional en Google Chile (*"Café de especialidad en grano y molido Chile | Despacho Blue Express"*).
- **Open Graph y Twitter Cards:** Configurados con `og:locale: es_CL`, `og:site_name`, y tarjetas de imagen grande.
- **Datos Estructurados (Schema.org JSON-LD):**
  - `Store` / `Organization` en el Inicio con ubicación en Rancagua, horario y WhatsApp.
  - `CollectionPage` e `ItemList` en Tienda y Café de Especialidad.
  - `Product` con ofertas en CLP, disponibilidad e IVA incluido en las fichas de producto.
  - `Article` en las 5 notas educativas del blog barista.

---

## 6. Estado de Integración con WordPress / WooCommerce

El tema hijo [`wp-content/themes/cafe-alegra-child`](wp-content/themes/cafe-alegra-child) incluye:
- **`brand.css`:** Variables CSS y estilos compatibles con Hello Elementor y el catálogo de WooCommerce.
- **`functions.php`:**
  - Soporte para WooCommerce y temas hijos.
  - Hook `woocommerce_single_product_summary` para renderizar automáticamente la historia y notas desde campos personalizados (ACF).
  - Shortcodes listos para Elementor: `[cafe_alegra_subcat_nav]`, `[cafe_alegra_quality_pillars]`, `[cafe_alegra_praline_palette]`.
- **`GUIA-ELEMENTOR-ESPECIALIDAD.md`:** Manual paso a paso para maquetar contenedores en Elementor Pro.

---

## 7. Lo que Falta para Pasar a Producción (Checklist de Entrega)

Para el paso definitivo al sitio en vivo en WordPress / WooCommerce, se requiere completar los siguientes puntos con el cliente:

### 1. Acceso al Entorno de Staging
- [ ] Obtener credenciales de WP-Admin y acceso SFTP/cPanel del servidor de pruebas de Café Alegra para montar y verificar el tema hijo sin alterar la tienda activa.

### 2. Catálogo y Fotografía de Café de Higos
- [ ] Definir los gramajes finales de venta (ej. 250 g / 500 g).
- [ ] Fijar los precios con IVA incluido.
- [ ] Tomar y procesar la fotografía oficial de la bolsa / packshot de Café de Higos para sustituir la imagen provisional.

### 3. Definición Comercial de Café de Trigo
- [ ] Confirmar fecha estimada de cosecha para habilitar el botón de *"Reserva de Cosecha / Pre-orden"* o mantenerlo como ficha patrimonial informativa.

### 4. Configuración de Despacho (Blue Express)
- [ ] Ingresar la matriz oficial de costos de envío por región/comuna en las zonas de envío de WooCommerce.
- [ ] Confirmar el monto mínimo para envío gratuito (propuesta fijada en $40.000 CLP en el demo).

### 5. Pasarela de Pagos (Transbank Webpay Plus)
- [ ] Verificar la vigencia del plugin de Webpay Plus en WooCommerce y realizar una transacción de prueba en modo staging.

### 6. Campos Personalizados ACF en WooCommerce
- [ ] Crear el grupo de campos para productos con los slugs:
  - `alegra_historia_titulo` (Texto)
  - `alegra_historia_cuerpo` (Área de texto)
  - `alegra_historia_kicker` (Texto corto)

### 7. Verificación Final en Móvil y Escritorio
- [ ] Ronda de revisión visual junto a Manuel en el entorno de staging.
- [ ] Pruebas de velocidad en Google PageSpeed Insights y verificación de indexación en Google Search Console.

---

## 8. Estructura de Archivos del Proyecto

```text
CafeAlegra-Propuesta/
├── index.html                           # Inicio con 4 puertas y "Nuestra Casa de Cafés"
├── tienda.html                          # Tienda general con 3 categorías y filtros
├── cafe-de-especialidad.html            # Catálogo de Especialidad (Orígenes + Praliné)
├── cafes-de-tradicion-chilena.html      # Cafés de Tradición (Higos y Trigo)
├── complementos.html                    # Accesorios y cafeteras para el ritual
├── cafe-para-tu-negocio.html            # Puerta B2B y cotizador mayorista
├── producto.html                        # Ficha de producto con selector y "¿Quieres saber más?"
├── cobertura.html                       # Zonas de despacho Blue Express y políticas
├── seguimiento.html                     # Rastreo de envíos
├── contacto.html                        # Formulario de atención y WhatsApp directo
├── nosotros.html                        # Historia y valores de la tostaduría
├── blog.html                            # Índice de cultura y ritual cafetero
├── articulo-*.html                      # 5 artículos educativos barista
├── assets/
│   ├── css/styles.css                   # Sistema de diseño, tokens de color y layout
│   ├── js/products.js                   # Base de datos local de productos y relatos
│   ├── js/main.js                       # Lógica de carrito, filtros, navegación y micro-interacciones
│   └── img/                             # Packshots transparentes y recursos gráficos
└── wp-content/themes/cafe-alegra-child/ # Tema hijo de WordPress
    ├── style.css                        # Cabecera del tema hijo
    ├── functions.php                    # Hooks ACF, WooCommerce y shortcodes Elementor
    ├── GUIA-ELEMENTOR-ESPECIALIDAD.md   # Guía paso a paso de armado en Elementor
    └── assets/css/brand.css             # Tokens CSS de marca para WordPress
```
