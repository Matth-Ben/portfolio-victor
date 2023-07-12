class TimelineAnimation
{
    constructor() {
        if ( !document.body.classList.contains( 'timeline-animation-init' ) ) {
            window.addEventListener( 'scroll', this.observe )
            document.body.classList.add( 'timeline-animation-init' )
        }
        this.observe()
        console.log('observe')
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

    observe = () => {
        
        if ( document.body.classList.contains( 'hide-article' ) ) {
            return
        }

        // elements
        document.querySelectorAll( '[show-elements]:not(.is-in-view)' ).forEach( parent => {

            if ( this.is_in_view( parent ) ) {
                const delay = this.get_delay( parent )

                setTimeout( () => {
                    this.show_element(parent)
                    parent.querySelectorAll( '[show-element]:not(.is-in-view)' ).forEach( element => {
                        this.show_element( element, this.get_delay( element ) )
                    } )
                }, delay )
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
    }
}

export default () => {
    new TimelineAnimation()
}