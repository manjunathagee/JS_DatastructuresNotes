/**
* event capturing happens from window -> document -> to the target element
* event bubbling happens from the target element to window
* event capturing happens first, and then event bubbling
* default event handlers have event bubbling, and if capture is true, then it is registered to event capturing phase
* event.stopPropagation will cancel event from propagating
* event.preventDefault will prevent default browser action, click check action for a input type checkbox
*
*/

const first = document.getElementsByClassName('first')[0];
const second = document.getElementsByClassName('second')[0];
const third = document.getElementsByClassName('third')[0];
const button = document.getElementsByClassName('button')[0];

first.addEventListener("click", (e) => {
    console.log('first');
    // e.stopPropagation();
} , {capture: true});

second.addEventListener("click", () => console.log('second'), {capture: true, once: true});
third.addEventListener("click", () => console.log('third'), {capture: false});
button.addEventListener("click", (e) => {
    console.log('button');
    // e.stopPropagation();
});
window.addEventListener("click", ()=> console.log('window'));
document.addEventListener("click", ()=> console.log('document'));