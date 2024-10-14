
//Event DOMContentLoaded runs when everything is fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    //Get the form object
    const form = document.getElementById("loginForm")

    //When the submit button is pressed, do something.
    form.addEventListener("submit", (event) => {
        let username = document.getElementById("username")
        //WARNING, console.log() does not work in this section. Consider using document.write() instead.
    })
})