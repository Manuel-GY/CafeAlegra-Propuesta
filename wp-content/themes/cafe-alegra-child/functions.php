<?php
/**
 * ============================================================================
 * CAFÉ ALEGRA · TEMA HIJO DE WORDPRESS (GeneratePress Child + Maqueta 1:1)
 * ============================================================================
 * Archivo: functions.php
 * Descripción:
 *   Configuración central del tema hijo para Café Alegra.
 *   Contiene:
 *     1. Inicialización y soporte de características del tema (WooCommerce, HTML5).
 *     2. Encolado de hojas de estilo de marca (brand.css).
 *     3. Auto-configuración de reglas de reescritura en .htaccess.
 *     4. Enrutador fiel 1:1 de la propuesta comercial (/pages/{slug}.html).
 *     5. Sincronización bidireccional dinámica con el catálogo de WooCommerce.
 *     6. Control de encabezados para deshabilitar caché en staging (LiteSpeed).
 *     7. Shortcodes modulares para Elementor y plantillas de especialidad.
 *     8. Experiencia optimizada para productos agotados con contacto a WhatsApp.
 *
 * @package CafeAlegraChild
 * @version 20261111_03
 * ============================================================================
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Seguridad: impedir acceso directo desde el navegador
}

/**
 * ----------------------------------------------------------------------------
 * 1. CONFIGURACIÓN DEL TEMA (Theme Setup)
 * ----------------------------------------------------------------------------
 * Registra soporte nativo para etiquetas de título, miniaturas, logotipo
 * personalizado, marcado semántico HTML5 y compatibilidad con WooCommerce.
 *
 * @return void
 */
function cafe_alegra_child_setup() {
	// Habilitar soporte para la etiqueta <title> administrada por WordPress / SEO
	add_theme_support( 'title-tag' );

	// Habilitar imágenes destacadas en entradas y productos
	add_theme_support( 'post-thumbnails' );

	// Soporte para logotipo personalizado en el personalizador
	add_theme_support( 'custom-logo', array(
		'height'      => 160,
		'width'       => 480,
		'flex-height' => true,
		'flex-width'  => true,
	) );

	// Marcado semántico HTML5 moderno en formularios y galerías
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	) );

	// Declarar soporte oficial para la suite WooCommerce
	add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'cafe_alegra_child_setup' );

/**
 * ----------------------------------------------------------------------------
 * 2. ENCOLADO DE ESTILOS DE LA MARCA (Brand Styles)
 * ----------------------------------------------------------------------------
 * Carga los tokens de diseño y reglas CSS de Café Alegra tras la hoja del tema padre.
 *
 * @return void
 */
function cafe_alegra_child_enqueue_styles() {
	$theme   = wp_get_theme();
	$version = $theme->get( 'Version' );

	wp_enqueue_style(
		'cafe-alegra-child',
		get_stylesheet_directory_uri() . '/assets/css/brand.css',
		array(),
		$version
	);
}
add_action( 'wp_enqueue_scripts', 'cafe_alegra_child_enqueue_styles', 20 );

/**
 * ----------------------------------------------------------------------------
 * 3. CONFIGURACIÓN AUTOMÁTICA DE .HTACCESS PARA SUBDIRECTORIOS
 * ----------------------------------------------------------------------------
 * Asegura que las reglas de mod_rewrite tengan el RewriteBase adecuado cuando
 * el sitio se ejecuta en subcarpetas (ej: /myfreshinstall02/).
 */
add_action( 'init', function() {
	$home_path = trim( (string) wp_parse_url( home_url(), PHP_URL_PATH ), '/' );
	$base      = $home_path ? '/' . $home_path . '/' : '/';
	$file      = ABSPATH . '.htaccess';
	if ( ! file_exists( $file ) || false === strpos( (string) @file_get_contents( $file ), 'RewriteBase ' . $base ) ) {
		$rules = "# BEGIN WordPress\n<IfModule mod_rewrite.c>\nRewriteEngine On\nRewriteBase " . $base . "\nRewriteRule ^index\\.php$ - [L]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . " . $base . "index.php [L]\n</IfModule>\n# END WordPress\n";
		@file_put_contents( $file, $rules );
	}
} );

/**
 * ----------------------------------------------------------------------------
 * 4. RESOLUCIÓN DE SLUGS PARA LA MAQUETA 1:1 (Router de Propuesta)
 * ----------------------------------------------------------------------------
 * Determina cuál plantilla HTML dentro de wp-content/themes/cafe-alegra-child/pages/
 * debe responder a la solicitud actual.
 *
 * @return string|null Nombre del archivo sin extensión, o null si no aplica.
 */
function cafe_alegra_child_resolve_propuesta_slug() {
	$req_uri   = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '/';
	$path      = (string) wp_parse_url( $req_uri, PHP_URL_PATH );
	$path      = trim( $path, '/' );
	$home_path = trim( (string) wp_parse_url( home_url(), PHP_URL_PATH ), '/' );

	// Remover prefijo de instalación en subdirectorio si existe
	if ( ! empty( $home_path ) && 0 === strpos( $path, $home_path ) ) {
		$path = trim( substr( $path, strlen( $home_path ) ), '/' );
	}

	if ( 0 === strpos( $path, 'index.php/' ) ) {
		$path = substr( $path, strlen( 'index.php/' ) );
	}

	// Quitar prefijo 'propuesta' si se está utilizando para previsualización
	if ( 'propuesta' === $path ) {
		$path = '';
	} elseif ( 0 === strpos( $path, 'propuesta/' ) ) {
		$path = substr( $path, strlen( 'propuesta/' ) );
	}

	// Página de inicio
	if ( '' === $path || 'index.html' === $path || 'index.php' === $path ) {
		return 'index';
	}

	// Normalizar extensión .html
	if ( '.html' === substr( $path, -5 ) ) {
		$path = substr( $path, 0, -5 );
	}
	$slug = sanitize_file_name( basename( $path ) );

	$pages_dir = get_stylesheet_directory() . '/pages/';
	if ( $slug && file_exists( $pages_dir . $slug . '.html' ) ) {
		return $slug;
	}

	// Mapeos amigables de slugs de WordPress hacia plantillas de la maqueta
	$aliases = array(
		'inicio'                 => 'index',
		'shop'                   => 'tienda',
		'tienda'                 => 'tienda',
		'mi-cuenta'              => 'acceder',
		'cart'                   => 'carrito',
		'checkout'               => 'carrito',
		'politica-de-privacidad' => 'privacidad',
		'terminos-y-condiciones' => 'terminos',
		'blog-cafe-de-trigo'     => 'articulo-cafe-de-trigo',
		'praline-nuez'           => 'praline-nuez',
		'praline-avellana'       => 'praline-avellana',
		'praline-pistacho'       => 'praline-pistacho',
		'origen-colombia'        => 'origen-colombia',
		'origen-guatemala'       => 'origen-guatemala',
		'origen-bolivia'         => 'origen-bolivia',
	);
	if ( isset( $aliases[ $slug ] ) && file_exists( $pages_dir . $aliases[ $slug ] . '.html' ) ) {
		return $aliases[ $slug ];
	}

	return null;
}

/**
 * ----------------------------------------------------------------------------
 * 5. RENDERIZADOR DE LA MAQUETA 1:1 CON INTEGRACIÓN WOOCOMMERCE
 * ----------------------------------------------------------------------------
 * Intercepta template_redirect para emitir el HTML exacto de la propuesta,
 * reescribir rutas relativas de assets, deshabilitar caché de LiteSpeed,
 * y alimentar window.WC_PRODUCTS en JavaScript con los productos reales de WooCommerce.
 *
 * @return void
 */
function cafe_alegra_child_render_propuesta() {
	// Ignorar peticiones de administración, AJAX o cron de WordPress
	if ( is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
		return;
	}
	$req_uri = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '';
	if ( false !== strpos( $req_uri, '/wp-json/' ) || false !== strpos( $req_uri, '/wp-admin' ) || false !== strpos( $req_uri, 'wp-login.php' ) ) {
		return;
	}

	$slug      = cafe_alegra_child_resolve_propuesta_slug();
	$pages_dir = get_stylesheet_directory() . '/pages/';
	$is_404    = false;

	if ( ! $slug || ! file_exists( $pages_dir . $slug . '.html' ) ) {
		$slug   = '404';
		$is_404 = true;
	}

	$file = $pages_dir . $slug . '.html';
	if ( ! file_exists( $file ) ) {
		return;
	}

	// Evitar que LiteSpeed Cache almacene la vista de staging sobre producción
	if ( ! defined( 'DONOTCACHEPAGE' ) ) {
		define( 'DONOTCACHEPAGE', true );
	}
	do_action( 'litespeed_control_set_nocache', 'Cafe Alegra Child Theme Propuesta' );
	header( 'X-LiteSpeed-Cache-Control: no-cache' );
	nocache_headers();
	status_header( $is_404 ? 404 : 200 );
	header( 'Content-Type: text/html; charset=UTF-8' );

	$html       = file_get_contents( $file );
	$theme_uri  = trailingslashit( get_stylesheet_directory_uri() );
	$assets_uri = $theme_uri . 'assets/';
	$base_href  = trailingslashit( home_url() );

	// Reescribir rutas relativas assets/ hacia la URL del tema hijo en WordPress
	$html = str_replace(
		array( 'href="assets/', 'src="assets/', 'content="assets/' ),
		array( 'href="' . esc_url( $assets_uri ), 'src="' . esc_url( $assets_uri ), 'content="' . esc_url( $assets_uri ) ),
		$html
	);

	// Cache-busting dinámico para forzar a navegadores a descartar versiones anteriores de JS y CSS
	$asset_v = 'v' . ( defined( 'WP_DEBUG' ) && WP_DEBUG ? time() : '20261111_03' );
	$html = preg_replace( '/\?v=[0-9a-zA-Z_\-]+/', '?v=' . $asset_v, $html );

	// Ocultar cualquier elemento topbar remanente
	$html = preg_replace( '/<div[^>]*class=["\'][^"\']*topbar[^"\']*["\'][^>]*>.*?<\/div>/is', '', $html );

	/* ------------------------------------------------------------------------
	 * EXTRACCIÓN DINÁMICA DEL CATÁLOGO DE WOOCOMMERCE
	 * ------------------------------------------------------------------------
	 * Si existen productos cargados en WooCommerce, se procesan y serializan
	 * en JSON para que main.js use los precios, nombres y stock reales.
	 */
	$wc_products_data = array();
	$wc_soldout_data  = array();

	if ( class_exists( 'WooCommerce' ) ) {
		$wc_query = wc_get_products( array(
			'status' => 'publish',
			'limit'  => -1,
		) );

		if ( ! empty( $wc_query ) ) {
			foreach ( $wc_query as $prod ) {
				$pid        = $prod->get_id();
				$slug       = $prod->get_slug() ?: ( 'wc-' . $pid );
				$sku        = $prod->get_sku() ?: ( 'SKU-' . $pid );
				$name       = $prod->get_name();
				$reg_price  = (float) $prod->get_regular_price();
				$curr_price = (float) $prod->get_price();
				$sale_price = (float) $prod->get_sale_price();
				$in_stock   = $prod->is_in_stock();

				$terms = wp_get_post_terms( $pid, 'product_cat', array( 'fields' => 'slugs' ) );
				if ( is_wp_error( $terms ) ) {
					$terms = array();
				}

				$cat = 'especialidad';
				$collection = 'origen';
				if ( in_array( 'autor', $terms, true ) ) {
					$cat = 'autor';
					$collection = 'autor';
				} elseif ( in_array( 'tradicion', $terms, true ) ) {
					$cat = 'tradicion';
					$collection = 'tradicion';
				} elseif ( in_array( 'complementos', $terms, true ) ) {
					$cat = 'complementos';
					$collection = 'complementos';
				}

				$img_id = $prod->get_image_id();
				$img_url = $img_id ? wp_get_attachment_image_url( $img_id, 'large' ) : '';
				if ( ! $img_url ) {
					$img_url = trailingslashit( get_stylesheet_directory_uri() ) . 'assets/img/catalogo-guatemala.png';
				}

				if ( ! $in_stock ) {
					$wc_soldout_data[] = $slug;
					$wc_soldout_data[] = (string) $pid;
				}

				$short = wp_strip_all_tags( $prod->get_short_description() );
				if ( ! $short ) {
					$short = $name;
				}

				$lower_name = strtolower( $name );
				$canonical_id  = $slug;
				$canonical_ref = $slug;

				// Identificación canónica según catálogo oficial
				if ( false !== strpos( $lower_name, 'huila' ) || false !== strpos( $lower_name, 'microlote' ) ) {
					$canonical_id  = 'origen-colombia-huila-grano';
					$canonical_ref = 'origen-colombia-huila';
				} elseif ( false !== strpos( $lower_name, 'guatemala' ) ) {
					$canonical_id  = 'origen-guatemala-grano';
					$canonical_ref = 'origen-guatemala';
				} elseif ( false !== strpos( $lower_name, 'bolivia' ) ) {
					$canonical_id  = 'origen-bolivia-molido';
					$canonical_ref = 'origen-bolivia';
				} elseif ( false !== strpos( $lower_name, 'colombia' ) ) {
					$canonical_id  = 'origen-colombia-grano';
					$canonical_ref = 'origen-colombia';
				} elseif ( false !== strpos( $lower_name, 'avellana' ) ) {
					$canonical_id  = 'praline-avellana-250';
					$canonical_ref = 'praline-avellana';
				} elseif ( false !== strpos( $lower_name, 'nuez' ) ) {
					$canonical_id  = 'praline-nuez-250';
					$canonical_ref = 'praline-nuez';
				} elseif ( false !== strpos( $lower_name, 'pistacho' ) ) {
					$canonical_id  = 'praline-pistacho-250';
					$canonical_ref = 'praline-pistacho';
				} elseif ( false !== strpos( $lower_name, 'higo' ) ) {
					$canonical_id  = 'cafe-de-higos';
					$canonical_ref = 'cafe-de-higos';
				} elseif ( false !== strpos( $lower_name, 'trigo' ) ) {
					$canonical_id  = 'cafe-de-trigo';
					$canonical_ref = 'cafe-de-trigo';
				} elseif ( false !== strpos( $lower_name, 'moka' ) ) {
					$canonical_id  = 'cafetera-moka-roja';
					$canonical_ref = 'cafetera-moka-roja';
				} elseif ( false !== strpos( $lower_name, 'prensa' ) ) {
					$canonical_id  = 'prensa-francesa-cobre';
					$canonical_ref = 'prensa-francesa-cobre';
				}

				// Extraer o deducir Tueste / Intensidad (admite atributos de WooCommerce)
				$roast_attr = $prod->get_attribute( 'tueste' ) ?: ( $prod->get_attribute( 'intensidad' ) ?: ( $prod->get_attribute( 'pa_tueste' ) ?: ( $prod->get_attribute( 'pa_intensidad' ) ?: get_post_meta( $pid, '_tueste', true ) ) ) );
				$roast = null;
				if ( ! empty( $roast_attr ) ) {
					$r_clean = strtolower( trim( $roast_attr ) );
					if ( false !== strpos( $r_clean, 'suave' ) || false !== strpos( $r_clean, 'claro' ) ) {
						$roast = array( 'label' => 'Medio suave', 'tone' => 'suave' );
					} elseif ( false !== strpos( $r_clean, 'intenso' ) || false !== strpos( $r_clean, 'fuerte' ) ) {
						$roast = array( 'label' => 'Medio intenso', 'tone' => 'intenso' );
					} else {
						$roast = array( 'label' => ucfirst( $roast_attr ), 'tone' => 'medio' );
					}
				} else {
					if ( false !== strpos( $lower_name, 'huila' ) || false !== strpos( $lower_name, 'microlote' ) ) {
						$roast = array( 'label' => 'Medio claro', 'tone' => 'suave' );
					} elseif ( false !== strpos( $lower_name, 'bolivia' ) ) {
						$roast = array( 'label' => 'Medio suave', 'tone' => 'suave' );
					} elseif ( false !== strpos( $lower_name, 'colombia' ) ) {
						$roast = array( 'label' => 'Medio intenso', 'tone' => 'intenso' );
					} elseif ( false !== strpos( $lower_name, 'guatemala' ) || 'especialidad' === $cat || 'autor' === $cat ) {
						$roast = array( 'label' => 'Medio', 'tone' => 'medio' );
					}
				}

				// Extraer o deducir Notas de cata sensoriales
				$notes_attr = $prod->get_attribute( 'notas' ) ?: ( $prod->get_attribute( 'pa_notas' ) ?: get_post_meta( $pid, '_notas', true ) );
				if ( ! empty( $notes_attr ) ) {
					$notes_parts = array_map( 'trim', preg_split( '/[|,;]+/', $notes_attr ) );
					$notes = array_values( array_filter( $notes_parts ) );
				} else {
					if ( false !== strpos( $lower_name, 'huila' ) || false !== strpos( $lower_name, 'microlote' ) ) {
						$notes = array( 'Blend Caturra y Colombia', '1.700–1.800 msnm', 'Lavado' );
					} elseif ( false !== strpos( $lower_name, 'guatemala' ) ) {
						$notes = array( 'Bourbon y Catuaí', '1.500 msnm', 'Lavado' );
					} elseif ( false !== strpos( $lower_name, 'bolivia' ) ) {
						$notes = array( 'Castillo y Caturra', 'Caramelo y miel', '1.450 msnm' );
					} elseif ( false !== strpos( $lower_name, 'colombia' ) ) {
						$notes = array( 'Castillo', 'Caramelo y miel de caña', '1.600 msnm' );
					} elseif ( false !== strpos( $lower_name, 'avellana' ) ) {
						$notes = array( 'Acidez equilibrada', 'Sabor intenso', 'Cuerpo ligero' );
					} elseif ( false !== strpos( $lower_name, 'nuez' ) ) {
						$notes = array( 'Nuez tostada', 'Caramelo dulce', 'Cuerpo sedoso' );
					} elseif ( false !== strpos( $lower_name, 'pistacho' ) ) {
						$notes = array( 'Pistacho tostado', 'Caramelo dulce', 'Notas de amaretto' );
					} elseif ( false !== strpos( $lower_name, 'higo' ) ) {
						$notes = array( 'Sin cafeína', '100% natural', 'VI Región' );
					} elseif ( false !== strpos( $lower_name, 'trigo' ) ) {
						$notes = array( 'Sin cafeína', '100% natural', 'VI Región' );
					} else {
						$notes = array( '100% arábica', 'Tueste Rancagua' );
					}
				}

				// Formato, molienda y recomendación de preparación
				$format_val = $prod->get_attribute( 'formato' ) ?: ( $prod->get_attribute( 'pa_formato' ) ?: '250 g' );
				$grind_val  = $prod->get_attribute( 'molienda' ) ?: ( $prod->get_attribute( 'pa_molienda' ) ?: ( false !== strpos( $lower_name, 'molido' ) ? 'molido' : 'grano' ) );
				$default_prep = 'Ideal en prensa francesa o métodos de filtrado.';
				if ( false !== strpos( $lower_name, 'bolivia' ) || false !== strpos( $lower_name, 'moka' ) ) {
					$default_prep = 'Ideal para espresso y cafetera italiana (moka).';
				} elseif ( 'autor' === $cat ) {
					$default_prep = 'Molienda media, ideal para prensa francesa y máquinas automáticas compatibles con café molido.';
				}
				$prep_val = $prod->get_attribute( 'preparacion' ) ?: ( $prod->get_attribute( 'pa_preparacion' ) ?: $default_prep );

				$default_price = 13000;
				if ( false !== strpos( $lower_name, 'guatemala' ) ) {
					$default_price = 13500;
				} elseif ( false !== strpos( $lower_name, 'bolivia' ) ) {
					$default_price = 12000;
				} elseif ( 'autor' === $cat ) {
					$default_price = 14000;
				}

				// Limpieza de textos residuales de borradores
				$clean_desc = $prod->get_description() ?: $short;
				$clean_desc = preg_replace( '/\s*Color de etiqueta.*?(#[0-9a-fA-F]{3,6}|\))/i', '', $clean_desc );
				$clean_desc = preg_replace( '/\s*Fuente:\s*cat[áa]logo.*?\./i', '', $clean_desc );
				$clean_desc = preg_replace( '/\s*Base de caf[ée] de Guatemala.*?(SCA|\.)/i', '', $clean_desc );

				$wc_products_data[] = array(
					'id'            => $canonical_id,
					'wc_slug'       => $slug,
					'reference'     => $canonical_ref,
					'referenceName' => $name,
					'roast'         => $roast,
					'cat'           => $cat,
					'collection'    => $collection,
					'name'          => $name,
					'sub'           => $name,
					'size'          => $format_val,
					'grind'         => $grind_val,
					'price'         => $curr_price ?: ( $reg_price ?: $default_price ),
					'was'           => $sale_price ? $reg_price : 0,
					'img'           => $img_url,
					'short'         => $short,
					'notes'         => $notes,
					'desc'          => wpautop( $clean_desc ),
					'prep'          => $prep_val,
					'sourcePage'    => 1,
				);
			}
		}
	}

	// Inyectar etiqueta <base> hacia home_url y variables globales de configuración para main.js
	$head_inject  = "\n" . '<base href="' . esc_url( $base_href ) . '">' . "\n";
	$head_inject .= '<style>.topbar, [class*="topbar"] { display: none !important; height: 0 !important; visibility: hidden !important; overflow: hidden !important; padding: 0 !important; margin: 0 !important; }</style>' . "\n";
	$head_inject .= '<script>'
		. 'window.CA_ASSET_BASE = ' . wp_json_encode( $assets_uri ) . '; '
		. 'window.CA_PROPUESTA_BASE = ' . wp_json_encode( $base_href ) . '; '
		. ( ! empty( $wc_products_data ) ? 'window.WC_PRODUCTS = ' . wp_json_encode( $wc_products_data ) . '; ' : '' )
		. ( ! empty( $wc_soldout_data ) ? 'window.WC_SOLDOUT = ' . wp_json_encode( $wc_soldout_data ) . '; ' : '' )
		. '</script>' . "\n";
	$html = preg_replace( '/<head>/i', '<head>' . $head_inject, $html, 1 );

	// Indicador flotante para administradores que permite navegar entre staging y producción
	$exit_url  = esc_url( 'https://cafealegra.cl/' );
	$admin_url = esc_url( admin_url() );
	$badge     = '<div id="ca-wp-preview-pill" style="position:fixed;bottom:14px;left:14px;z-index:99999;background:#1b120c;color:#f7f1e8;border:1px solid #b98a3e;border-radius:99px;padding:6px 14px;font:500 12px/1.3 Jost,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.35);display:flex;align-items:center;gap:10px;">'
		. '<span>☕ <strong>Tienda Propuesta (Staging)</strong></span>'
		. '<a href="' . $admin_url . '" style="color:#d9b36a;text-decoration:none;font-weight:600;" target="_blank">Panel WP-Admin ⚙</a>'
		. '<span style="opacity:.4">|</span>'
		. '<a href="' . $exit_url . '" style="color:#f7f1e8;text-decoration:underline;font-weight:400;" target="_blank">Sitio oficial en vivo →</a>'
		. '</div>';

	$html = str_replace( '</body>', $badge . "\n</body>", $html );

	echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit;
}
add_action( 'template_redirect', 'cafe_alegra_child_render_propuesta', 1 );

/**
 * ----------------------------------------------------------------------------
 * 6. RENDERIZADO DE PERFIL DE TUESTE Y HISTORIA ACF EN WOOCOMMERCE
 * ----------------------------------------------------------------------------
 * Permite mostrar el bloque editorial "Saber más" en fichas nativas de WooCommerce
 * si los campos de Advanced Custom Fields (ACF) están definidos.
 */
add_action( 'woocommerce_single_product_summary', 'cafe_alegra_render_product_roast_and_story', 25 );
function cafe_alegra_render_product_roast_and_story() {
	if ( ! function_exists( 'get_field' ) ) {
		return;
	}
	$post_id         = get_the_ID();
	$titulo_historia = get_field( 'alegra_historia_titulo', $post_id );
	$cuerpo_historia = get_field( 'alegra_historia_cuerpo', $post_id );
	$kicker          = get_field( 'alegra_historia_kicker', $post_id ) ?: 'Café de Especialidad · Origen Único';

	if ( $titulo_historia && $cuerpo_historia ) {
		echo '<div class="saber-mas-wrap" style="margin-top:1.8rem;">';
		echo '<button type="button" class="btn ghost block copper-btn" id="btn-toggle-story" style="border-color:var(--cobrizo);color:var(--cobrizo);font-weight:600;">★ ¿Quieres saber más? Conoce su historia y origen</button>';
		echo '<div id="box-story" class="box-saber-mas" style="display:none;margin-top:1.5rem;">';
		echo '<span class="badge-tag cobrizo">' . esc_html( $kicker ) . '</span>';
		echo '<h2 style="font-size:1.8rem;margin:.4rem 0;">' . esc_html( $titulo_historia ) . '</h2>';
		echo '<p style="font-size:1rem;line-height:1.7;color:var(--suave);">' . nl2br( esc_html( $cuerpo_historia ) ) . '</p>';
		echo '<div class="acts" style="margin-top:1.5rem;"><a class="btn gold" href="' . esc_url( wc_get_page_permalink( 'shop' ) ) . '">← Regresar a la tienda</a></div>';
		echo '</div></div>';
	}
}

/**
 * ----------------------------------------------------------------------------
 * 7. SHORTCODES PARA ELEMENTOR Y PLANTILLAS
 * ----------------------------------------------------------------------------
 */

/**
 * Shortcode: [cafe_alegra_subcat_nav]
 * Renderiza la barra de navegación rápida por subcategorías en café de especialidad.
 */
function cafe_alegra_subcat_nav_shortcode() {
	ob_start();
	?>
	<div class="subcat-bar">
		<div class="wrap">
			<nav class="subcat-nav" aria-label="Navegación de subcategorías">
				<a href="cafe-de-especialidad.html#origenes" class="subcat-link is-active">☕ Cafés de Origen Único</a>
				<a href="cafe-de-especialidad.html#sabores-de-autor" class="subcat-link">🌰 Colección Praliné · Autor</a>
				<a href="cafe-de-especialidad.html#calidad-especialidad" class="subcat-link">✓ ¿Qué es Especialidad?</a>
			</nav>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'cafe_alegra_subcat_nav', 'cafe_alegra_subcat_nav_shortcode' );

/**
 * Shortcode: [cafe_alegra_quality_pillars]
 * Muestra los tres pilares de calidad internacional de Café Alegra.
 */
function cafe_alegra_quality_pillars_shortcode() {
	ob_start();
	?>
	<div class="pillars-grid">
		<div class="pillar-card">
			<span class="pillar-badge">01 · Estándar Internacional</span>
			<h3>Calificación 84–85 SCA</h3>
			<p>Grano 100% arábica de estricta altura sin defectos primarios, evaluado por catadores Q-Grader certificados con más de 80 puntos sobre una escala de 100.</p>
		</div>
		<div class="pillar-card">
			<span class="pillar-badge">02 · Tueste en Rancagua</span>
			<h3>Curvas a Medida</h3>
			<p>Tostamos en pequeños lotes semanales en nuestra tostaduría de Rancagua. Aplicamos perfiles medio y medio-suave que respetan la dulzura y notas florales nativas.</p>
		</div>
		<div class="pillar-card">
			<span class="pillar-badge">03 · Frescura y Molienda</span>
			<h3>Preparado para tu Ritual</h3>
			<p>Envasado con válvula desgasificadora unidireccional. Puedes elegir en grano entero o molido fresco a la medida exacta de tu Moka italiana, Prensa o Espresso.</p>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'cafe_alegra_quality_pillars', 'cafe_alegra_quality_pillars_shortcode' );

/**
 * Shortcode: [cafe_alegra_praline_palette]
 * Despliega las etiquetas sensoriales de los tres ensambles Praliné.
 */
function cafe_alegra_praline_palette_shortcode() {
	ob_start();
	?>
	<div class="palette-row">
		<span class="badge-tag cobrizo">Nuez & Caramelo</span>
		<span class="badge-tag avellana">Avellana Chilena & Caramelo</span>
		<span class="badge-tag pistacho">Pistacho & Caramelo · notas de amaretto</span>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'cafe_alegra_praline_palette', 'cafe_alegra_praline_palette_shortcode' );

/**
 * Shortcode: [cafe_alegra_casa_cafes]
 * Sección editorial completa "Nuestra Casa de Cafés · Rancagua".
 */
function cafe_alegra_casa_cafes_shortcode( $atts = array() ) {
	ob_start();
	?>
	<section class="section alt" id="casa-de-cafes" aria-labelledby="h-orig">
		<div class="wrap">
			<div class="sec-head">
				<span class="eyebrow"><?php esc_html_e( 'Nuestra Casa de Cafés · Rancagua', 'cafe-alegra-child' ); ?></span>
				<h2 id="h-orig"><?php _e( 'El encuentro entre la <em>especialidad</em> y la <em>tradición</em>', 'cafe-alegra-child' ); ?></h2>
				<div class="rule"></div>
				<p class="lead" style="margin-inline:auto"><?php esc_html_e( 'Nacimos en la VI Región con el propósito de ofrecer un café auténtico. En nuestra tostaduría artesanal conviven dos mundos que se complementan: la precisión sensorial de los mejores cafetales y el rescate patrimonial de nuestra tierra.', 'cafe-alegra-child' ); ?></p>
			</div>
			<div class="origins">
				<article class="origin-card origin-tueste">
					<span class="origin-kicker"><?php esc_html_e( 'Tostaduría Artesanal', 'cafe-alegra-child' ); ?></span>
					<h3><?php esc_html_e( 'Curvas de Tueste', 'cafe-alegra-child' ); ?></h3>
					<p><?php esc_html_e( 'Seleccionamos granos arábica de altura y cuidamos cada tueste semanal en pequeños lotes en Rancagua para resaltar notas florales, dulces y achocolatadas sin quemar el grano.', 'cafe-alegra-child' ); ?></p>
				</article>

				<article class="origin-card origin-patrimonio">
					<span class="origin-kicker"><?php esc_html_e( 'Patrimonio de Chile', 'cafe-alegra-child' ); ?></span>
					<h3><?php esc_html_e( 'Rescate del Higo y Trigo', 'cafe-alegra-child' ); ?></h3>
					<p><?php esc_html_e( 'Reinterpretamos bebidas ancestrales chilenas elaboradas a partir de higos y trigo tostado, transformándolas en alternativas nobles 100% libres de cafeína.', 'cafe-alegra-child' ); ?></p>
				</article>

				<article class="origin-card origin-praline">
					<span class="origin-kicker"><?php esc_html_e( 'Sabores de Autor', 'cafe-alegra-child' ); ?></span>
					<h3><?php esc_html_e( 'Colección Praliné', 'cafe-alegra-child' ); ?></h3>
					<p><?php esc_html_e( 'Una línea pionera con identidad propia: ensambles de café arábica combinados con frutos secos reales cuidadosamente tostados y molidos: avellana chilena, nuez y pistacho con notas de amaretto.', 'cafe-alegra-child' ); ?></p>
				</article>
			</div>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
add_shortcode( 'cafe_alegra_casa_cafes', 'cafe_alegra_casa_cafes_shortcode' );

/**
 * ----------------------------------------------------------------------------
 * 8. GESTIÓN Y EXPERIENCIA DE PRODUCTOS AGOTADOS EN WOOCOMMERCE
 * ----------------------------------------------------------------------------
 * Muestra cajas de aviso amigables y botón directo de consulta a WhatsApp.
 */
add_action( 'woocommerce_single_product_summary', 'cafe_alegra_wc_soldout_notice_and_whatsapp', 31 );
function cafe_alegra_wc_soldout_notice_and_whatsapp() {
	global $product;
	if ( ! $product || $product->is_in_stock() ) {
		return;
	}

	$phone        = '56977942117';
	$product_name = $product->get_name();
	$wa_msg       = rawurlencode( 'Hola Café Alegra, quisiera consultar por la reposición de ' . $product_name );
	$wa_url       = 'https://wa.me/' . $phone . '?text=' . $wa_msg;
	?>
	<div class="soldout-box">
		<strong>⚠ Producto temporalmente agotado</strong>
		<p>No contamos con stock de este lote en este momento. Tostamos semanalmente en Rancagua; consulta la fecha de la próxima tostada artesanal.</p>
		<a class="btn ghost block" href="<?php echo esc_url( $wa_url ); ?>" target="_blank" rel="noopener" style="margin-top:.6rem;">
			Consultar reposición por WhatsApp
		</a>
	</div>
	<?php
}

add_filter( 'woocommerce_product_add_to_cart_text', 'cafe_alegra_wc_soldout_button_text', 10, 2 );
function cafe_alegra_wc_soldout_button_text( $text, $product ) {
	if ( ! $product->is_in_stock() ) {
		return __( 'Ver producto (Agotado)', 'cafe-alegra-child' );
	}
	return $text;
}

add_filter( 'woocommerce_loop_add_to_cart_link', 'cafe_alegra_wc_soldout_loop_link', 10, 3 );
function cafe_alegra_wc_soldout_loop_link( $html, $product, $args ) {
	if ( ! $product->is_in_stock() ) {
		$html = str_replace( 'class="', 'class="soldout-card-btn ', $html );
	}
	return $html;
}

add_filter( 'woocommerce_get_availability_text', 'cafe_alegra_wc_custom_availability_text', 10, 2 );
function cafe_alegra_wc_custom_availability_text( $availability, $product ) {
	if ( ! $product->is_in_stock() ) {
		$availability = __( 'Agotado (Tostamos semanalmente en Rancagua)', 'cafe-alegra-child' );
	}
	return $availability;
}
