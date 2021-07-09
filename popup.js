const content = document.getElementById('content')
const regform = document.getElementById('regForm')
const register = document.getElementById("registration")
const loginForm = document.getElementById("loginForm")
const login = document.getElementById("login")
const loginIn = document.getElementById('loginIn')
const regEntered = document.getElementById('regEntered')
let registered = false

function checkRegistered() {
    chrome.storage.local.get('registration', value => {
        if (value.registration && value.registration.length === 5) {
            registered = true
        }
        if (registered) {
            content.style.display = 'block'
            content.innerHTML = 'Auto'
            regform.style.display = 'none'
            loginForm.style.display = 'none'
        } else {
            loginForm.style.display = 'none'
            content.style.display = 'none'
        }
    })
}

function registerEntered(){
    content.style.display = 'none'
    loginForm.style.display = 'none'
    regform.style.display = 'block'
}

const registration = function () {
    const firstname = document.getElementsByName('firstname')[0]
    const lastname = document.getElementsByName('lastname')[0]
    const username = document.getElementsByName('username')[0]
    const phone = document.getElementsByName('phone')[0]
    const email = document.getElementsByName('email')[0]

    //and then request > if yes
    chrome.storage.local.set({"registration": [firstname, username, lastname, phone, email]})
    regform.style.display = 'none'
    content.style.display = 'block'
    content.innerHTML = 'Auto'
    //if no > nothing
}
const contentFunction = function () {
    console.log('content loaded')
    if (content.innerHTML === "auto") {
        content.innerHTML = "manual"
    } else {
        content.innerHTML = "auto"
    }
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, content.innerHTML)
    })

}

const loginEntered = function () {
    regform.style.display = 'none'
    content.style.display = 'none'
    loginForm.style.display = 'block'
}

const loginChecker = function (){
    const email = document.getElementById('emailLogin')

    //check if exist email
}
document.addEventListener('DOMContentLoaded', function () {
    checkRegistered()
    register.addEventListener('click', registration)
    regEntered.addEventListener('click', registerEntered)
    content.addEventListener('click', contentFunction)
    login.addEventListener('click', loginEntered)
    loginIn.addEventListener('click', loginChecker)

}, false)