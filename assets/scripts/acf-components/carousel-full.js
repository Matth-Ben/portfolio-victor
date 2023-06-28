import CarouselBasic from "../core/class-carousel-basic"

document.addEventListener( 'DOMContentLoaded', () => {
    document.querySelectorAll( '.carousel--full' ).forEach( element => {
        new CarouselBasic( element )
    } )
} )