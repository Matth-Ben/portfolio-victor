import CarouselBasic from "../components/class-carousel-basic"

document.addEventListener( 'DOMContentLoaded', () => {
    document.querySelectorAll( '.carousel--full' ).forEach( element => {
        new CarouselBasic( element )
    } )
} )