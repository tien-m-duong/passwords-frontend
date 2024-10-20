document.addEventListener('DOMContentLoaded', function() {
    //Get the form object
    const form = document.getElementById("passwordform")

    //When the submit button is pressed, do something.
    if(!form) {
        return
    }
    form.addEventListener("submit", (event) => {
        let websiteTag = document.getElementById("website")
        let website = websiteTag.value
        if(website !== '') {
            fetch("../passwords.txt")
                .then((res) => res.text())
                .then((text) => {
                    document.write(text)
                })
                .catch((e) => console.error(e)); 
        }
    })
})