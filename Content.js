/*function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
         text = document.selection.createRange().text;
    }
    return text;
}
*/

$(window).on('load', function(){
    window.setTimeout(getMessages, 5000)});


function getMessages(){
    var messages = [];
    var JSONMessages = [];
    document.getElementsByClassName('uiScrollableAreaContent')[2].querySelector('div').querySelectorAll('.direction_ltr, .text_align_ltr')
        .forEach(function(div) {
                let query = div.querySelector('div[tabindex] > span');
                if (query) {
                    messages.push(query.innerText)
                }
                
            })
            let length = messages.length
            for (var i = 0; i<length;i++) {
                JSONMessages[i] = JSON.stringify(messages[i]);
            }
            sendToPython(JSONMessages, div);
}

function sendToPython(messages, div)
{
    for(var i = 0; i<messages.length;i++) {
        sendSingular(messages[i], div)
        i++;
    }
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
}
    xhttp.open("GET", url, true)
    // xhttp.withCredentials = true;
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.send({ 'request': "authentication token" });
    xhttp.send()

}

function getEmojiAndPost(sentence){
    var emojiCODE ="";
    if (sentence == "Happy"){emojiCODE = "\uD83D\uDE00"}
    else if (sentence == "Angry"){emojiCODE = "\uD83D\uDE20" }
    else if (sentence == "Excited"){ emojiCODE = "\uD83E\uDD29" }
    else if (sentence == "Sad"){emojiCODE = "\uD83D\uDE29" }
    else if (sentence == "Fear"){emojiCODE = "\uD83D\uDE31" }
    else if (sentence == "Bored"){ emojiCODE = "\uD83D\uDE34"}
    else {emojiCODE = "no associated emotion"}
    return emojiCODE;
}



  /*window.addEventListener('mouseup', e => {
    getMessages();
    //setEmojis(messages);


});*/

//$("body").on('DOMSubtreeModified', getMessages())








