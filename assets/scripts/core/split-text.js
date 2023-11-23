import Splitting from 'splitting'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}  

export default function()
{
    // show elements
    if ( !document.body.classList.contains( 'show-elements-init' ) ) {
        document.addEventListener( 'ShowElements', event => {
            const elements = event.detail.elements
            
            elements.forEach( element => {
                let delay
                
                element.querySelectorAll( '.word' ).forEach( ( word, index ) => {
                    delay = index * 70 + 10
                    setTimeout( () => word.classList.add( 'is-show' ), delay )
                } )
            } )
        } )

        document.body.classList.add( 'show-elements-init' )
    }

    const results = Splitting( {
        target: ".split",
        by: "lines"
    } )

    results.forEach( item => {
        item.words.forEach( word => {
            word.innerHTML = `<span class='rotate${randomIntFromInterval( -20, 20 )}'>` + word.innerHTML + `</span>`;
        } )
    } )
}
