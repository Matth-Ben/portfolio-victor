<?php

function danka_register_settings__cookies()
{  
    $section_name = 'danka__cookies-banner';

    add_settings_section(
        $section_name,              // id
        'Bannière',                  // title
        '',                         // callback
        'danka-settings-cookies'    // page
    );

    add_settings_field(
        $section_name . '__title',                              // id
        "Titre",                                                // title
        function( $args ) {
            $name = $args['name'];
            $value = get_option( $name );
            echo "<input id='$name' class='regular-text' type='text' name='$name' value='$value' />";
        },                                                      // callback
        'danka-settings-cookies',                               // page
        $section_name,                                          // section
        array( 'name' => $section_name . '__title' )
    );
    register_setting(
        'danka-settings-cookies',                           // option group
        $section_name . '__title',                          // option name
        array( 'type' => 'string' )
    );
    

    add_settings_field(
        $section_name . '__description',                              // id
        "Description",                                          // title
        function( $args ) {
            $name = $args['name'];
            $value = get_option( $name );
            echo "<textarea id='$name' class='regular-text' name='$name'>$value</textarea>";
        },               // callback
        'danka-settings-cookies',                               // page
        $section_name,                                          // section
        array( 'name' => $section_name . '__description' )
    );
    register_setting(
        'danka-settings-cookies',                           // option group
        $section_name . '__description',                          // option name
        array( 'type' => 'string' )
    );

    add_settings_field(
        $section_name . '__link',                              // id
        "Lien \"Page de confidentialités\"",                                                // title
        function( $args ) {
            $name = $args['name'];
            $value = get_option( $name );
            echo "<input id='$name' class='regular-text' type='text' name='$name' value='$value' />";
        },                                                      // callback
        'danka-settings-cookies',                               // page
        $section_name,                                          // section
        array( 'name' => $section_name . '__link' )
    );
    register_setting(
        'danka-settings-cookies',                           // option group
        $section_name . '__link',                          // option name
        array( 'type' => 'string' )
    );


    $section_name = 'danka__cookies-settings';

    add_settings_section(
        $section_name,              // id
        'Activations',                  // title
        '',                         // callback
        'danka-settings-cookies'    // page
    );

    register_setting(
        'danka-settings-cookies',                           // option group
        $section_name . '__link',                           // option name
        array( 'type' => 'string' )
    );

    $cookies = array(
        'youtube' => 'Youtube',
        'google-analytics' => 'Google Analytics'
    );

    foreach ( $cookies as $slug => $cookie ) {
        $slug = str_replace( '-', '_', $slug );
        $name = "{$section_name}__{$slug}";

        add_settings_field(
            $name,                                          // id
            $cookie,                                        // title
            "danka_settings__cookies__render",              // callback
            'danka-settings-cookies',                       // page
            $section_name,                                  // section
            array( 'name' => $name )
        );
    
        register_setting(
            'danka-settings-cookies',                           // option group
            $name,                                              // option name
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            )
        );

        if ( $slug === "google_analytics" ) {
            add_settings_field(
                $name . '__script',                                     // id
                $cookie . " (script)",                                  // title
                "danka_settings__cookies__render_script",               // callback
                'danka-settings-cookies',                               // page
                $section_name,                                          // section
                array( 'name' => $name . '__script' )
            );
        
            register_setting(
                'danka-settings-cookies',                           // option group
                $name . '__script',                                 // option name
                array(
                    'type' => 'string',
                )
            );
        }
    }
}


function danka_settings__cookies__render( $args )
{
    $name = $args['name'];
    $value = get_option( $name );
    $checked = $value ? 'checked' : '';

    echo "<input id='$name' type='checkbox' name='$name' $checked />";
}

function danka_settings__cookies__render_script( $args )
{
    $name = $args['name'];
    $value = get_option( $name );
    
    echo "<textarea id='$name' class='regular-text' name='$name'>$value</textarea>";
}

add_action( 'admin_init', 'danka_register_settings__cookies' );