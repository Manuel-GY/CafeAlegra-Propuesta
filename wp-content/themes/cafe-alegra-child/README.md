# Café Alegra Child

Tema hijo inicial para preparar la adaptación del demo a un WordPress de pruebas con Elementor y WooCommerce.

## Tema padre provisional

El encabezado `Template: hello-elementor` apunta al tema padre Hello Elementor. El WordPress de pruebas aún no está disponible para confirmar el tema instalado. Antes de instalar, verificar el nombre de carpeta del tema padre; si no es `hello-elementor`, cambiar `Template` en `style.css` por el slug correcto y validar con esa versión.

## Incluido

- Soporte de tema para WooCommerce; no se sobrescriben plantillas ni se modifica el checkout, Transbank o Blue Express.
- Tokens de color y tipografía de la propuesta, estilos acotados para títulos, botones de Elementor y botones de WooCommerce.
- No carga `assets/js/main.js` ni `assets/js/products.js`: esos archivos simulan carrito, pago, seguimiento, acceso y formularios y no deben operar en la tienda real.

## Instalación en pruebas

1. Confirmar el tema padre y las versiones de WordPress, PHP, Elementor/Elementor Pro y WooCommerce.
2. Respaldar el sitio y activar primero el tema padre.
3. Comprimir la carpeta `cafe-alegra-child` y subirla en **Apariencia → Temas → Añadir nuevo → Subir tema**; activar solo en staging.
4. Crear/ajustar páginas con Elementor y productos/packs con WooCommerce. El CSS incluido establece una base visual, no importa automáticamente el HTML estático como contenido editable.
5. Probar carrito, checkout y despacho con las integraciones de staging disponibles. No usar cobros reales ni cambiar configuración de producción.

La migración de las 21 páginas y la validación de integración requieren el acceso al WordPress de pruebas y contenidos aprobados por Café Alegra.
