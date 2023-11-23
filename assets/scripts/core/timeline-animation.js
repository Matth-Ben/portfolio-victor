class TimelineAnimation
{
    constructor() {
        if ( !document.body.classList.contains( 'timeline-animation-init' ) ) {
            window.addEventListener( 'scroll', this.observe )
            document.body.classList.add( 'timeline-animation-init' )
        }
        this.observe()

        ////
        document.addEventListener( 'HideElements', () => {
            document.querySelectorAll( '[show-elements]' ).forEach( element => {
                let max_delay = 0,
                    elements = []

                element.querySelectorAll( '[show-element]' ).forEach( e => {
                    const delay = parseInt( this.get_delay( e ) )

                    max_delay = max_delay < delay ? delay : max_delay

                    elements.push( [e, delay] )
                } )
                
                // console.log(max_delay)
                // console.log(elements)
                // debugger

                elements.forEach( ( item, index ) => {
                    item[1] = item[1] - max_delay
                    item[1] = item[1] < 0 ? item[1] * -1 : item[1]
                } )

                // console.log(elements)
                // debugger

                elements.forEach( item => {
                    setTimeout( () => {
                        item[0].classList.remove( 'is-in-view' )
                    }, item[1] )
                } )
            } )
        } )
        ////
    }

    is_in_view = element => {
        const rect = element.getBoundingClientRect()
    
        return (
            (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) || 
            (
                window.innerHeight * 80 / 100 > element.getBoundingClientRect()['top']
            )
        )
    }

    is_desktop = () => parseInt( data.breakpoints[data.breakpointDesktop] ) < window.innerWidth

    get_delay = element => {
        let delay = element.getAttribute( 'show-delay' ),
            desktop_delay = element.getAttribute( 'show-desktop-delay' ),
            mobile_delay = element.getAttribute( 'show-mobile-delay' )

        if ( this.is_desktop() && desktop_delay ) {
            delay  = Number.isInteger( desktop_delay / 1 ) ? desktop_delay : delay
        }
        
        else if ( !this.is_desktop() && mobile_delay ) {
            delay  = Number.isInteger( mobile_delay / 1 ) ? mobile_delay : delay
        }

        return delay && Number.isInteger( delay / 1 ) ? delay : 0
    }

    show_element = ( element, delay ) => {
        setTimeout( () => {
            element.classList.add( 'is-in-view' )
            document.dispatchEvent( new CustomEvent( 'ShowElements', { detail: { elements: [element] } } ) )
        }, delay )
    }

    show_elements = ( parent, delay ) => {
        setTimeout( () => {
            this.show_element( parent )
            parent.querySelectorAll( '[show-element]:not(.is-in-view)' ).forEach( element => {
                this.show_element( element, this.get_delay( element ) )
            } )
        }, delay )
    }

    observe = () => {
        
        if ( document.body.classList.contains( 'hide-article' ) ) {
            return
        }

        // elements
        document.querySelectorAll( '[show-elements]:not(.is-in-view)' ).forEach( parent => {

            if ( this.is_in_view( parent ) ) {
                this.show_elements( parent, this.get_delay( parent ) )
            }
        } )
        
        // mobile elements
        document.querySelectorAll( '[show-mobile-elements]:not(.is-in-view)' ).forEach( parent => {

            if ( !this.is_desktop() && this.is_in_view( parent ) ) {
                this.show_elements( parent, this.get_delay( parent ) )
            }
        } )
        
        // desktop elements
        document.querySelectorAll( '[show-desktop-elements]:not(.is-in-view)' ).forEach( parent => {

            if ( this.is_desktop() && this.is_in_view( parent ) ) {
                this.show_elements( parent, this.get_delay( parent ) )
            }
        } )

        // element
        document.querySelectorAll( '[show-element]:not(.is-in-view)' ).forEach( element => {

            if ( element.closest( '[show-elements]:not(.is-in-view)' ) !== null ) {
                return
            }
           
            if ( this.is_in_view( element ) ) {
                this.show_element( element, this.get_delay( element ) )
            }
        } )
        
        // mobile element
        document.querySelectorAll( '[show-mobile-element]:not(.is-in-view)' ).forEach( element => {

            if ( element.closest( '[show-mobile-elements]:not(.is-in-view)' ) !== null ) {
                return
            }
           
            if ( !this.is_desktop() && this.is_in_view( element ) ) {
                this.show_element( element, this.get_delay( element ) )
            }
        } )

        // desktop element
        document.querySelectorAll( '[show-desktop-element]:not(.is-in-view)' ).forEach( element => {

            if ( element.closest( '[show-desktop-elements]:not(.is-in-view)' ) !== null ) {
                return
            }
           
            if ( this.is_desktop() && this.is_in_view( element ) ) {
                this.show_element( element, this.get_delay( element ) )
            }
        } )
    }
}

export default () => {
    new TimelineAnimation()
}
