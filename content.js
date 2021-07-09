let click = false
let auto = true

chrome.runtime.onMessage.addListener(function (request) {
    auto = (request === 'auto')
    console.log(auto)
})

function sendMessage(message) {
    window.InputEvent = window.Event || window.InputEvent;
    var event = new InputEvent('input', {
        bubbles: true
    });
    var textbox = document.querySelectorAll('div._3FRCZ')[1];
    textbox.textContent = message;
    if (auto) {
        textbox.dispatchEvent(event);
    }
}

const sendApi = function (text) {
    const xhr = new XMLHttpRequest();
    const url = "https://aibot.corover.mobi/websiteAPI/getAnswer?languageCode=en";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("auth-Key", "2b5fb5d4-0753-4302-b661-f8580e9effb0");
    xhr.setRequestHeader("app-id", "29fd4f94-f793-4227-9588-056b5ffb1318");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };
    const data = JSON.stringify({
        "query": `${text}`,
        "channel": "browser | Desktop User",
        "prevCode": "",
        "inputType": "TEXT"
    });
    xhr.send(data);
}

let lastMessage = ''
const clicked = () => {
    const messages = document.querySelector('div.z_tTQ')
    if (messages && messages.lastElementChild.className.includes('message-in')) {
        if (lastMessage !== messages.lastElementChild.querySelector('._3Whw5').innerText) {
            lastMessage = messages.lastElementChild.querySelector('._3Whw5').innerText
            sendApi(lastMessage)
        }
    }
}
const timeTime = setInterval(clicked, 1000)

/*

*css
#selector-top, #selector-bottom {
	background: blue;
	height:3px;
	position: fixed;
	transition:all 300ms ease;
    z-index: 100;
}
#selector-left, #selector-right {
	background: blue;
	width:3px;
	position: fixed;
	transition:all 300ms ease;
    z-index: 100;
}

.n{
 -webkit-transform: scale(3) translateX(100px)
}

html under body

<div id="selector">
    <div id="selector-top" style="top: 66px; width: 1011px; left: -4px;"></div>
    <div id="selector-left" style="left: -4px;"></div>
    <div id="selector-right"></div>
    <div id="selector-bottom" style="width: 1011px;"></div>
</div>

javascript

var elements = {
    top: $('#selector-top'),
    left: $('#selector-left'),
    right: $('#selector-right'),
    bottom: $('#selector-bottom')
};

document.onmousemove = function(event) {
    if(event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;

    var $target = event.target;
        targetOffset = $target.getBoundingClientRect();
        targetHeight = targetOffset.height;
        targetWidth  = targetOffset.width;
    console.log(targetOffset);

    document.getElementById("selector-top").style.top= (targetOffset.top - 4) + "px";
 document.getElementById("selector-top").style.width= (targetWidth + 5) + "px";
 document.getElementById("selector-top").style.left=(targetOffset.left - 4)  + "px";
};

*/