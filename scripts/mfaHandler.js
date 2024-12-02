let API_URL
fetch('../variables.json')
.then(response => response.json())
.then(data => {API_URL = data.API_URL})
.catch(error => console.error('Error: ', error))

document.addEventListener('DOMContentLoaded', function() {

    let token
    chrome.storage.local.get(["token"]).then((result) => {
        token = result.token
    })
    let website
    chrome.storage.local.get(["website"]).then((result) => {
        website = result.website
    })

    //Get the form object
    const form = document.getElementById("mfaform")

    //When the submit button is pressed, do something.
    if(!form) {
        return
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        
        let codeTag = document.getElementById("code")
        let code = codeTag.value
        if(code.length == 6) {
            console.error(`Code Returns:`, code)
            codeTag.setAttribute('disabled',true)

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${token}`);
            
            const requestOptions = {
              method: "GET",
              headers:myHeaders,
              redirect: "follow"
            };
            
            fetch(`${API_URL}/account?token=${code}&site=${website}`, requestOptions)
              .then((response) => {
                if(response.status !==200) {
                    document.getElementById('outputdisplay').style.display = "initial"
                    document.getElementById('outputdisplay').textContent = `Code ${response.status}`
                    codeTag.setAttribute('disabled',false)
                }
                return response.json()
                 })
              .then((result) => {
                if(result["account"]) {
                    document.getElementById('outputdisplay').style.display = "initial"
                    document.getElementById('outputdisplay').textContent = `${result.account.username,result.account.password}`
                    codeTag.setAttribute('disabled',false)
                    window.location.href='popup_alt.html'
                }
                console.log(result)
            })
              .catch((error) => {
                document.getElementById('outputdisplay').style.display = "initial"
                codeTag.setAttribute('disabled',false)
                console.error(error)
            });
        } else {
            document.getElementById('outputdisplay').style.display = "initial"
            document.getElementById('outputdisplay').textContent = `Code Unusable: ${code}`
        }
    })
})