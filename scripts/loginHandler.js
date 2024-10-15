chrome.storage.local.get(["loggedin"]).then((result) => {
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
        event.preventDefault()

        let usernameTag = document.getElementById("username")
        let passwordTag = document.getElementById("password")

        let username = usernameTag.value
        let password = passwordTag.value

        if(password !== '' && username !== '') {
            usernameTag.setAttribute('disabled',true)
            passwordTag.setAttribute('disabled',true)
            chrome.storage.local.set({ "loggedin": true }).then(() => {
                console.log("Value is set");
            });
            window.location.href = 'popup_alt.html'

        } else {
            document.getElementById('error').style.display = "initial"
        }
        //WARNING, console.log() does not work in this section. Consider using document.write() instead.
    })
})