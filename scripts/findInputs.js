//Get all HTML elements of type "input"
const inputs = document.querySelectorAll("input")
let element
if(inputs) {
    for(let input of inputs) {
        //Get the "type" of the input, if it's a password type then set the element variable to it
        const type = input.type
        if(type === 'password') {
            element = input
        }
    }
}
if(element) {
    //At this point we have the password input, and we can set its value to anything.
    element.value = 'testinput'
    //Dispatch an input event so the UI knows to update
    someelement.dispatchEvent(new Event('input'))
}