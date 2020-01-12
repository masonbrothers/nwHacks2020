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

function getMessages(){
    document.getElementsByClassName('uiScrollableAreaContent')[2].querySelector('div').querySelectorAll('.direction_ltr, .text_align_ltr')
        .forEach(function(div) {
                let query = div.querySelector('div[tabindex] > span');
                if (query) {
                    console.log(query.innerText)
                }
            }
        )

}
function getEmoji(sentence){
    var emojiCODE ="";
    if (sentence == "HAPPY"){emojiCODE = "U+1F600"}
    else if (sentence == "ANGRY"){emojiCODE = "U+1F620" }
    else if (sentence == "EXCITED"){ emojiCODE = "U+1F929"}
    else if (sentence == "SAD"){emojiCODE = "U+1F629" }
    else if (sentence == "FEAR"){emojiCODE = "U+1F631" }
    else if (sentence == "BORED"){ emojiCODE = "U+1F634"}
    else {emojiCODE = "no associated emotion"}
    return emojiCODE;
}



window.addEventListener('mouseup', e => {
    getMessages();
    setEmojis(messages);


});






