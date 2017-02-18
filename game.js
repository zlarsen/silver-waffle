var bits = 0;
var cursors = 0;
var mouseBooster = 1;

//this jQuery function looks for the div identified by the #clickBox id and waits for a click on it. Known as a click handler.
$('#clickBox').click(function () {
    
    //every click we add a bit and update the score span to reflect the new info
    bitClick(1, mouseBooster);
});

$('.buyCursorBtn').click(function () {
    buyCursor();
});

$('.buyMouseBoosterBtn').click(function () {
    buyMouseBooster();
});

$('#save').click(function () {
    save();
});

$('#deleteSave').click(function () {
    deleteSave();
});

function bitClick(number, multiplier){
    bits = bits + (number * multiplier);
    $('#score').text(calcAndSaveScore(bits)); 
};

function calcAndSaveScore(score) {
    return setScoreText(score);
}


function setScoreText(score) {
    var scoreText = '';
    if (score < 8) {
        scoreText = 'Bits: '+score;
    } else {
        scoreText = formatBytes(score/8);
    }
    return scoreText;
}

function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Bytes';
   var k = 1024,
       dm = decimals + 1 || 3,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(bits >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
        bits = bits - cursorCost;                          //removes the bits spent
        $('#cursors').text('Cursors: '+cursors);//updates the number of cursors for the user
        $('#score').text(calcAndSaveScore(bits));   //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    $('#cursorsCost').text('Cursor Price: '+formatBytes(nextCost/8));  //updates the cursor cost for the user
};

function buyMouseBooster(){
    var mouseBoosterCost = Math.floor(10 * Math.pow(1.1,mouseBooster));     //works out the cost of this mouseBooster
    if(bits >= mouseBoosterCost){                                   //checks that the player can afford the mouseBooster
        mouseBooster = mouseBooster + 1;                                   //increases number of mouseBooster
        bits = bits - mouseBoosterCost;                          //removes the bits spent
        $('#mouseBooster').text('Mouse Booster: '+mouseBooster);//updates the number of mouseBooster for the user
        $('#score').text(calcAndSaveScore(bits));   //updates the number of cookies for the user
    };
    var costOfNext = Math.floor(10 * Math.pow(1.1,mouseBooster));       //works out the cost of the next mouseBooster
    $('#mouseBoosterCost').text('Mouse Booster Price: '+formatBytes(costOfNext/8));  //updates the mouseBooster cost for the user
};


function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
    return output;
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame) {
        if (typeof savegame.bits !== "undefined") bits = savegame.bits;
        if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
        if (typeof savegame.mouseBooster !== "undefined") mouseBooster = savegame.mouseBooster;
    }
}

function save() {
    var save = {
        bits: bits,
        cursors: cursors,
        mouseBooster: mouseBooster,
    }
    localStorage.setItem("save",JSON.stringify(save));
}

function deleteSave() {
    localStorage.removeItem("save")
}

$(document).ready(function() {
    load();
    var nextCursorCost = Math.floor(10 * Math.pow(1.1,cursors));
    var nextmouseBoosterCost = Math.floor(10 * Math.pow(1.1,mouseBooster));
    $('#score').text(calcAndSaveScore(bits));
    $('#cursors').text('Cursors: '+cursors);
    $('#mouseBooster').text('Mouse Booster: '+mouseBooster);
    $('#mouseBoosterCost').text('Mouse Booster Price: '+formatBytes(nextmouseBoosterCost/8));
    $('#cursorsCost').text('Cursor Price: '+formatBytes(nextCursorCost/8));
});

var gameLoop = setInterval(function() {
    bitClick(cursors, 1);
}, 1000);
