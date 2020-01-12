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
    window.setTimeout(getMessages, 1000)});



let observer = new MutationObserver(getMessages)

let config = {attributes:true, childList:true,characterData:true}


function getMessages(){
    observer.disconnect()

    var JSONMessages = [];
    document.getElementsByClassName('uiScrollableAreaContent')[2].querySelector('div').querySelectorAll('.direction_ltr, .text_align_ltr')
        .forEach(function(div) {

                let query = div.querySelector('div[tabindex] > span');
                if (query) {
                    //messages.push(query.innerText)
                    JSONMessages.push(JSON.stringify(query.innerText))
                    sendSingular((query.innerText),div)

                }
                
            })
observer.observe(div,config)
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
/*
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
*/
function getEmojiAndPost(sentence){
    //console.log(sentence);
    var emojiCODE ="";
    if (sentence == "Joy"){emojiCODE = "\uD83D\uDE00"}
    else if (sentence == "Anger"){emojiCODE = "\uD83D\uDE20" }
    else if (sentence == "Analytical"){ emojiCODE = "\ud83e\udd14" }
    else if (sentence == "Sadness"){emojiCODE = "\uD83D\uDE29" }
    else if (sentence == "Fear"){emojiCODE = "\uD83D\uDE31" }
    else if (sentence == "Tentative"){ emojiCODE = "\uD83D\uDE1F"}
    else if (sentence == "Confident"){ emojiCODE = "\ud83d\ude0e"}
    else {emojiCODE = "\uD83D\uDE10"}
    return emojiCODE;
}



  /*window.addEventListener('mouseup', e => {
    getMessages();
    //setEmojis(messages);


});*/

//$("body").on('DOMSubtreeModified', getMessages())








