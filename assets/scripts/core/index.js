import data from '../../../data.json'
import parallax from './parallax'
import show_elements from './show-elements'
import split_text from './split-text'
import taxi from './taxi'

export default ( () => {
    window.data = data
    taxi()
    split_text()
    show_elements()
    parallax()

    // document.addEventListener( 'DOMContentLoaded', () => {
    //     // parallax()
    // } )

    // document.addEventListener( 'newPageLoaded', () => {
    //     split_text()
    //     show_elements()
    //     // parallax()
    // } )
} )()