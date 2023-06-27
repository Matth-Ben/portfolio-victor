import is_in_view from './is-in-view'

const observe = () => {
    const elements = document.querySelectorAll( '[scroll-show]:not(.is-in-view)' )
    const elements_in_view = []

    elements.forEach( element => {
        if ( is_in_view( element ) || window.innerHeight * 80 / 100 > element.getBoundingClientRect()['top'] ) {
            element.classList.add( 'is-in-view' )
            elements_in_view.push( element )
        }
    } )

    if ( elements_in_view.length > 0 ) {
        document.dispatchEvent( new CustomEvent( 'showElements', { detail: { elements: elements_in_view } } ) )
    }
}

export default () => {
    window.addEventListener( 'scroll', observe )
    document.addEventListener( 'DOMContentLoaded', observe )
    document.addEventListener( 'newPageLoaded', observe )
}
