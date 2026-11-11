<?php
/**
 * Fallback template for Café Alegra Child theme.
 *
 * @package CafeAlegraChild
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( function_exists( 'cafe_alegra_child_render_propuesta' ) ) {
	cafe_alegra_child_render_propuesta();
}
get_header();
get_footer();
