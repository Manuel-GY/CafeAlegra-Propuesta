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
