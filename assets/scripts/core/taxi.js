import * as Taxi from '@unseenco/taxi'

const animation_duration = 300

class CustomTransition extends Taxi.Transition {
    /**
     * Handle the transition leaving the previous page.
     * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
     */
    onLeave({ from, trigger, done }) {
        document.body.classList.add( 'hide-article' )
        setTimeout( done, animation_duration )
    }
    
    /**
     * Handle the transition entering the next page.
     * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
    */
    onEnter({ to, trigger, done }) {
        setTimeout( () => {
            document.body.classList.remove( 'hide-article' )
            document.dispatchEvent( new CustomEvent( 'newPageLoaded' ) )
            done()
        }, animation_duration )
    }
}

export default () => {
    const options = {
        transitions: {
            default: CustomTransition
        }
    }

    const taxi = new Taxi.Core( options )
}