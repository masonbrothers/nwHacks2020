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
            sendToPython(JSONMessages);
}

function sendToPython(messages)
{
    for(var i = 0; i<messages.length;i++) {
        sendSingular(messages[i])
        i++;
    }
}

function sendSingular(text){
    const xhttp = new XMLHttpRequest();
    let url = "http://localhost:8000/?text="+ encodeURI(text)
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE) {
        alert(getEmojiAndPost(xhttp.responseText));
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
    if (sentence == "Happy"){emojiCODE = "U+1F600"}
    else if (sentence == "Angry"){emojiCODE = "U+1F620" }
    else if (sentence == "Excited"){ emojiCODE = "U+1F929"}
    else if (sentence == "Sad"){emojiCODE = "U+1F629" }
    else if (sentence == "Fear"){emojiCODE = "U+1F631" }
    else if (sentence == "Bored"){ emojiCODE = "U+1F634"}
    else {emojiCODE = "no associated emotion"}
    return emojiCODE;
}



  /*window.addEventListener('mouseup', e => {
    getMessages();
    //setEmojis(messages);


});*/

//$("body").on('DOMSubtreeModified', getMessages())








