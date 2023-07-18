import CarouselBasic from "../components/class-carousel-basic"

const init = () => {
    document.querySelectorAll( '.carousel--full' ).forEach( element => {
        new CarouselBasic( element )
    } )
}

document.addEventListener( 'ContentLoaded', init )