$(window).on('load', function() {
    window.setTimeout(getMessages, 1000)
});

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

let observer = new MutationObserver(function () {
    console.log("B4")
    getMessages();
    console.log("After")
});

console.log(observer);

let config = {attributes: true, childList: true, characterData: true};

async function getMessages(){
    console.log(observer);
    observer.disconnect();
    console.log(observer);
    let mainDiv = document.getElementsByClassName('uiScrollableAreaContent')[2].querySelector('div');
    let divs = mainDiv.querySelectorAll('.direction_ltr, .text_align_ltr');
    await asyncForEach(divs, async function(div) {
        let query = div.querySelector('div[tabindex] > span');
        if (query) {
            sendSingular((query.innerText),div)
        }
    });
    console.log(observer);
    observer.observe(mainDiv, config);
    console.log(observer);
}

function sendSingular(text, div){
    const xhttp = new XMLHttpRequest();
    let url = "http://localhost:8000/?text="+ encodeURI(text)
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            let emoji = getEmojiAndPost(xhttp.responseText);
            let span = document.createElement("span");
            span.innerText = emoji;
            span.className = "Emoji-Changer";
            span.title = xhttp.responseText;
            div.append(span);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send()

}

function getEmojiAndPost(sentence){
    //console.log(sentence);
    let emojiCODE ="";
    if (sentence === "Joy"){emojiCODE = "\uD83D\uDE00"}
    else if (sentence === "Anger"){emojiCODE = "\uD83D\uDE20" }
    else if (sentence === "Analytical"){ emojiCODE = "\ud83e\udd14" }
    else if (sentence === "Sadness"){emojiCODE = "\uD83D\uDE29" }
    else if (sentence === "Fear"){emojiCODE = "\uD83D\uDE31" }
    else if (sentence === "Tentative"){ emojiCODE = "\uD83D\uDE1F"}
    else if (sentence === "Confident"){ emojiCODE = "\ud83d\ude0e"}
    else {emojiCODE = "\uD83D\uDE10"}
    return emojiCODE;
}