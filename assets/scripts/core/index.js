import data from '../../../data.json'
import parallax from './parallax'
import show_elements from './show-elements'
import split_text from './split-text'
import taxi from './taxi'
import headroom from './headroom'

export default ( () => {
    window.data = data
    
    document.addEventListener( 'DOMContentLoaded', () => {
        split_text()
        show_elements()
        parallax()
        headroom()
        taxi()
    } )

    // document.addEventListener( 'DOMContentLoaded', () => {
    //     // parallax()
    // } )

    // document.addEventListener( 'newPageLoaded', () => {
    //     split_text()
    //     show_elements()
    //     // parallax()
    // } )
} )()