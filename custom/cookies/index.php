<?php

include get_template_directory() . '/custom/cookies/_register-options-page.php';
include get_template_directory() . '/custom/cookies/_register-settings.php';

add_action( 'wp_enqueue_scripts', function()
{
    $path = get_template_directory_uri() . '/custom/cookies';
    wp_enqueue_script( 'app_cookies_init', $path . '/assets/scripts/index.js' );
    wp_localize_script( 'app_cookies_init', 'cookies_data', array(
        'text' => array(
            'title' => get_option( 'danka__cookies__title' ),
            'description' => get_option( 'danka__cookies__description' ),
            'link' => get_option( 'danka__cookies__link' ),
        ),
        'youtube' => array(
            'name' => 'Youtube',
            'script' => null,
            'is_active' => get_option( 'danka__cookies__youtube' ) ? true : false
        ),
        'google_analytics' => array(
            'name' => 'Google Analytics',
            'script' => get_option( 'danka__cookies__google_analytics__script' ),
            'is_active' => get_option( 'danka__cookies__google_analytics' ) ? true : false
        ),
    ) );
} );

add_filter( 'script_loader_tag', function( $tag, $handle, $source ) {

    if ( 'app_cookies_init' === $handle ) {
        $tag = '<script type="module" src="'. $source .'"></script>';
    }

    return $tag;
}, 10, 3 );


add_action( 'wp_footer', function() {
    \Timber\Timber::render( array( get_template_directory() . '/custom/cookies/default.twig' ) );
} );
