import Accordion from '../components/class-accordions'

document.addEventListener( 'DOMContentLoaded', () => {
    document.querySelectorAll( '.accordion' ).forEach( element => {
        new Accordion( element )
    } )
} )