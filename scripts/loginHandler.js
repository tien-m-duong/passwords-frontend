chrome.storage.local.get(["loggedin"]).then((result) => {
    //Get whether the user is logged in, and choose which popup to load based on that.
    if(result && !window.location.href.includes('popup_alt.html')) {
        window.location.href = 'popup_alt.html'
    } else if(window.location.href.includes('popup.html')) {
        window.location.href = 'popup.html'
    }
});

//Event DOMContentLoaded runs when everything is fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    //Get the form object
    const form = document.getElementById("loginForm")

    //When the submit button is pressed, do something.
    if(!form) {
        return
    }
    form.addEventListener("submit", (event) => {
        //Prevents the browser from attempting to submit on its own
        event.preventDefault()

        //Get the username & pasword objects then values
        let usernameTag = document.getElementById("username")
        let passwordTag = document.getElementById("password")

        let username = usernameTag.value
        let password = passwordTag.value

        //If they're both not empty, do something
        if(password !== '' && username !== '') {
            //Disable the inputs while processing
            usernameTag.setAttribute('disabled',true)
            passwordTag.setAttribute('disabled',true)
            //Save the authenication to cookies
            chrome.storage.local.set({ "loggedin": true }).then(() => {
                console.log("Value is set");
            });
            //Load a new popup
            window.location.href = 'popup_alt.html'

        } else {
            document.getElementById('error').style.display = "initial"
        }
        //WARNING, console.log() does not work in this section. Consider using document.write() instead.
    })
})