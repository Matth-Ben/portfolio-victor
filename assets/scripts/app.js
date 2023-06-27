import './core'

import Flickity from 'flickity'

document.addEventListener( 'DOMContentLoaded', () => {
    document.querySelectorAll( '.carousel--cards' ).forEach( element => {
        const carousel = element.querySelector( '.carousel__items' )
        const items = element.querySelectorAll( '.carousel-cell' )

        if ( carousel ) {
            const flickity = new Flickity( carousel, {
                cellAlign: 'left',
                prevNextButtons: false,
                pageDots: false,
                // wrapAround: true,
                // contain: true, // bug
            } )

            flickity.on( 'change', index => {
                const count = items.length - 1

                if ( index > count - 3 ) {
                    flickity.select( count - 3 + 1 )
                }
            } )
        }
    } )
} )