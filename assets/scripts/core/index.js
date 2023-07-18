import data from '../../../data.json'
import smoothScroll from './smooth-scroll'
import taxi from './taxi'
import headroom from './headroom'
import timelineAnimation from './timeline-animation'
import splitText from './split-text'
import parallax from './parallax'
import gridHelper from './grid-helper'

export default ( () => {
    window.data = data

    document.addEventListener( 'ContentLoaded', () => {
        taxi()
        headroom()
        splitText()
        timelineAnimation()
        smoothScroll()
        parallax()
        gridHelper()
    } )
    
    document.addEventListener( 'NewContentLoaded', () => {
        splitText()
        timelineAnimation()
        parallax()
    } )

    document.addEventListener( 'DOMContentLoaded', () => {

        if ( document.body.classList.contains( 'welcome' ) ) {
            return
        }

        document.dispatchEvent( new CustomEvent( 'ContentLoaded' ) )
    } )
} )()