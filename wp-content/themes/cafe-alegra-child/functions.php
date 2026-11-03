<?php
/**
 * Café Alegra child theme bootstrap.
 *
 * @package CafeAlegraChild
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register theme features without replacing WooCommerce templates or behavior.
 *
 * @return void
 */
function cafe_alegra_child_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array(
		'height'      => 160,
		'width'       => 480,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	) );
	add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'cafe_alegra_child_setup' );

/**
 * Load the Café Alegra design tokens after the parent theme stylesheet.
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
 * Renderizado automático de barra de tueste y panel "Saber más" desde campos ACF de WooCommerce
 */
add_action( 'woocommerce_single_product_summary', 'cafe_alegra_render_product_roast_and_story', 25 );
function cafe_alegra_render_product_roast_and_story() {
    if ( ! function_exists( 'get_field' ) ) return;
    $post_id = get_the_ID();
    $titulo_historia = get_field( 'alegra_historia_titulo', $post_id );
    $cuerpo_historia = get_field( 'alegra_historia_cuerpo', $post_id );
    $kicker = get_field( 'alegra_historia_kicker', $post_id ) ?: 'Café de Especialidad · Origen Único';
    
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
 * Shortcodes para Elementor y Plantillas de Café de Especialidad
 */
function cafe_alegra_subcat_nav_shortcode() {
    ob_start();
    ?>
    <div class="subcat-bar">
      <div class="wrap">
        <nav class="subcat-nav" aria-label="Navegación de subcategorías">
          <a href="#origenes" class="subcat-link is-active">☕ Cafés de Origen Único</a>
          <a href="#sabores-de-autor" class="subcat-link">🌰 Colección Praliné · Autor</a>
          <a href="#calidad-especialidad" class="subcat-link">✓ ¿Qué es Especialidad?</a>
        </nav>
      </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'cafe_alegra_subcat_nav', 'cafe_alegra_subcat_nav_shortcode' );

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

function cafe_alegra_praline_palette_shortcode() {
    ob_start();
    ?>
    <div class="palette-row">
      <span class="badge-tag cobrizo">Nuez & Caramelo #9B552B</span>
      <span class="badge-tag pistacho">Pistacho & Amaretto #507B2E</span>
      <span class="badge-tag avellana">Avellana Chilena #9C182F</span>
      <span class="badge-tag cardamomo">Cardamomo #C0CA80</span>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'cafe_alegra_praline_palette', 'cafe_alegra_praline_palette_shortcode' );

/**
 * Banner de Consentimiento de Cookies Nativo (Fallback para WordPress)
 * Si no hay plugin de cookies (ej. Complianz / CookieYes) activo, despliega el banner corporativo.
 */
function cafe_alegra_render_cookie_consent_banner() {
    // Si ya existe un plugin especializado de cookies, no duplicar el banner
    if ( class_exists( 'COMPLIANZ' ) || function_exists( 'cookieyes_init' ) ) {
        return;
    }
    ?>
    <div id="ca-cookie-banner" class="cookie-banner" role="region" aria-label="Consentimiento de cookies">
      <div class="wrap cookie-wrap">
        <div class="cookie-text">
          <div class="cookie-title"><strong>🍪 Tu privacidad en Café Alegra</strong></div>
          <p>Utilizamos cookies esenciales para el funcionamiento de la tienda y analíticas para optimizar tu experiencia de compra. Puedes aceptar todas o navegar solo con las necesarias. Conoce más en nuestra <a href="<?php echo esc_url( home_url( '/politica-de-privacidad/' ) ); ?>">Política de privacidad</a>.</p>
        </div>
        <div class="cookie-actions">
          <button type="button" class="btn ghost sm" id="ca-cookie-essential">Solo esenciales</button>
          <button type="button" class="btn gold sm" id="ca-cookie-accept">Aceptar todas</button>
        </div>
      </div>
    </div>
    <script>
    (function() {
      var STORAGE_KEY = 'ca_cookie_consent';
      var banner = document.getElementById('ca-cookie-banner');
      if (!banner) return;
      var consent = null;
      try { consent = localStorage.getItem(STORAGE_KEY); } catch(e) {}
      if (!consent) {
        setTimeout(function() { banner.classList.add('is-visible'); }, 700);
      }
      function setConsent(type) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: type, timestamp: new Date().toISOString() }));
          document.cookie = "ca_cookie_consent=" + type + "; path=/; max-age=" + (365*24*60*60);
        } catch(e) {}
        banner.classList.remove('is-visible');
      }
      var bAcc = document.getElementById('ca-cookie-accept');
      var bEss = document.getElementById('ca-cookie-essential');
      if (bAcc) bAcc.addEventListener('click', function() { setConsent('all'); });
      if (bEss) bEss.addEventListener('click', function() { setConsent('essential'); });
      document.addEventListener('click', function(e) {
        if (e.target && e.target.matches('[data-open-cookie-banner]')) {
          e.preventDefault();
          banner.classList.add('is-visible');
        }
      });
    })();
    </script>
    <?php
}
add_action( 'wp_footer', 'cafe_alegra_render_cookie_consent_banner', 100 );

/**
 * Gestión y Experiencia de Productos Agotados en WooCommerce
 * Réplica 1:1 de la propuesta estática adaptada al estándar nativo de WooCommerce.
 */

// 1. Caja informativa y botón de WhatsApp en la ficha de producto cuando está agotado
add_action( 'woocommerce_single_product_summary', 'cafe_alegra_wc_soldout_notice_and_whatsapp', 31 );
function cafe_alegra_wc_soldout_notice_and_whatsapp() {
    global $product;
    if ( ! $product || $product->is_in_stock() ) {
        return;
    }

    $phone = '56977942117';
    $product_name = $product->get_name();
    $wa_msg = rawurlencode( 'Hola Café Alegra, quisiera consultar por la reposición de ' . $product_name );
    $wa_url = 'https://wa.me/' . $phone . '?text=' . $wa_msg;
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

// 2. Texto del botón en el catálogo/bucle de WooCommerce para productos sin stock
add_filter( 'woocommerce_product_add_to_cart_text', 'cafe_alegra_wc_soldout_button_text', 10, 2 );
function cafe_alegra_wc_soldout_button_text( $text, $product ) {
    if ( ! $product->is_in_stock() ) {
        return __( 'Ver producto (Agotado)', 'cafe-alegra-child' );
    }
    return $text;
}

// 3. Estilo del botón en el catálogo cuando está agotado
add_filter( 'woocommerce_loop_add_to_cart_link', 'cafe_alegra_wc_soldout_loop_link', 10, 3 );
function cafe_alegra_wc_soldout_loop_link( $html, $product, $args ) {
    if ( ! $product->is_in_stock() ) {
        $html = str_replace( 'class="', 'class="soldout-card-btn ', $html );
    }
    return $html;
}

// 4. Personalizar el texto de disponibilidad nativo de WooCommerce
add_filter( 'woocommerce_get_availability_text', 'cafe_alegra_wc_custom_availability_text', 10, 2 );
function cafe_alegra_wc_custom_availability_text( $availability, $product ) {
    if ( ! $product->is_in_stock() ) {
        $availability = __( 'Agotado (Tostamos semanalmente en Rancagua)', 'cafe-alegra-child' );
    }
    return $availability;
}

