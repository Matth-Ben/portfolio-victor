import Splitting from 'splitting'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}  

export default () => {

    // init
    const init = () => {
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

    // show elements
    document.addEventListener( 'showElements', event => {
        const elements = event.detail.elements

        elements.forEach( element => {
            element.querySelectorAll( '.word' ).forEach( ( word, index ) => {
                setTimeout( () => word.classList.add( 'is-show' ), index * 50 )
            } )
        } )
    } )

    document.addEventListener( 'DOMContentLoaded', init )
    document.addEventListener( 'newPageLoaded', init )
}