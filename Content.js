let runGetMessages = true;

$(window).on('load', function() {
    setInterval(async function(){
        try {
            console.log(runGetMessages)
            
            if (runGetMessages) {
                runGetMessages = false;
                console.log(runGetMessages)
                await getMessages();
                runGetMessages = true;
                console.log(runGetMessages)
            }
        } catch (error) {
            console.error(error)
        }
    }, 5000);
});

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

let config = {attributes: true, childList: true, characterData: true};

async function getMessages(){
    let mainDiv = document.getElementsByClassName('uiScrollableAreaContent')[2].querySelector('div');
    let divs = mainDiv.querySelectorAll('.direction_ltr, .text_align_ltr');
    await asyncForEach(divs, async function(div) {
        let query = div.querySelector('div[tabindex] > span');
        if (query) {
            await sendSingular((query.innerText),div)
        }
    });
}

async function sendSingular(text, div){
    if (!div.querySelector('.Emoji-Changer') && text){
        const xhttp = new XMLHttpRequest();
        let url = "http://localhost:8000/?text="+ encodeURI(text)
        xhttp.open("GET", url, true);
        xhttp.send()
        await new Promise(function (resolve, reject) { 
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    let emoji = getEmojiAndPost(xhttp.responseText);
                    let span = document.createElement("span");
                    span.innerText = emoji;
                    span.className = "Emoji-Changer";
                    span.title = xhttp.responseText;
                    div.append(span);
                    resolve();
                }
            };
        });
    }
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