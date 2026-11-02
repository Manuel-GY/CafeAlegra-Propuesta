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
