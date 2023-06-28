import Accordion from '../core/class-accordions'

document.addEventListener( 'DOMContentLoaded', () => {
    document.querySelectorAll( '.accordion' ).forEach( element => {
        new Accordion( element )
    } )
} )