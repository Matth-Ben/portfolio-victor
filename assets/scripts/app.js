import './core'

// components
import './components/alert'
import './components/class-accordions'
import './components/welcome'

// acf components
import './acf-components/accordions'
import './acf-components/carousel-cards'
import './acf-components/carousel-full'

let resizeTimer
window.addEventListener( "resize", () => {
    clearTimeout( resizeTimer )
    resizeTimer = setTimeout( () => {
        window.dispatchEvent( new CustomEvent( 'windowResized' ) )
    }, 200 )
} )

const refresh_attr_sizes = () => {
    document.querySelectorAll( 'img[data-sizes]' ).forEach( element => {
        let attr_sizes

        if ( element.clientWidth > element.clientHeight ) {
            attr_sizes = element.clientWidth + 'px'
        }
        
        else {
            const sizes = element.getAttribute( 'data-sizes' )
            sizes.split( ',' ).forEach( item => {
                let width = parseInt( item.split( '-' )[0] ),
                    height = parseInt( item.split( '-' )[1] )
                
                attr_sizes = element.clientWidth * width / height + 'px'
            } )
        }

        element.setAttribute( 'sizes', attr_sizes )
    } )
}

window.addEventListener( "load", refresh_attr_sizes )
window.addEventListener( "windowResized", refresh_attr_sizes )

