
export default function initPreventEvent(){
const links = Array.from(document.querySelectorAll('.carousel_link'))

function preventEvent(event){
    return event.preventDefault()
}
links.forEach(link=>{
    link.addEventListener('click',preventEvent)
    link.addEventListener('touchstart',preventEvent)

})}