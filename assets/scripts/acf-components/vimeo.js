import Vimeo from '../components/class-custom-vimeo'

const init = () => {
    document.querySelectorAll( '.vimeo' ).forEach( element => {
        new Vimeo( element )
    } )
}

document.addEventListener( 'NewContentLoaded', init )
document.addEventListener( 'ContentLoaded', init )