import Flickity from 'flickity'

const init = () => {
    document.querySelectorAll( '.carousel--cards' ).forEach( element => {
        const carousel = element.querySelector( '.carousel__items' )
        const items = element.querySelectorAll( '.carousel-cell' )
        const previous = element.querySelector( '.carousel__previous' )
        const next = element.querySelector( '.carousel__next' )
    
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
    
            previous.addEventListener( 'click', () => flickity.previous() )
            next.addEventListener( 'click', () => flickity.next() )
        }
    } )
}

document.addEventListener( 'DOMContentLoaded', init )
document.addEventListener( 'NewContentLoaded', init )