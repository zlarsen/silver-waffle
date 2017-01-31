
//bits is our variable to store how many bits the person has earned. We need to store this in a cookie eventually
var bits = 0

//this jQuery function looks for the div identified by the #clickBox id and waits for a click on it. Known as a click handler.
$('#clickBox').click(function () {
    //every click we add a bit and update the score span to reflect the new info
    bits += 1;
    $('#score').text(calcScoreText(bits)); 
})

function calcScoreText(score) {
    var scoreText = '';
    if (score < 8) {
        scoreText = 'Bits: '+score;
    } else if (score >= 8 && score < 8192) {
        scoreText = 'Bytes: '+(score/8);
    } else if (score >= 8192 && score < 8388608) {
        scoreText = 'Kilobytes: '+(score/8000);
    }
    return scoreText;
}
