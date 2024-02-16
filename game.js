buttonColours = ["blue", "green", "yellow", "red"];

var gamePattern = [];
var userChosenPattern = []
var started = false
var level = 0

$(document).keypress(function(){
    if (!started){
        nextSequence();
        $("#level-title").text("level "+ level)
        started = true
    }})


function nextSequence(){
    userChosenPattern = []
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = (Math.floor(Math.random()*4));
    var randomColourChosen = buttonColours[randomNumber];
    gamePattern.push(randomColourChosen);
    $("#"+randomColourChosen).fadeOut(100).fadeIn(100);
    playSound(randomColourChosen)
    animateClick(randomColourChosen)
    }

$(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userChosenPattern.push(userChosenColour);
        console.log(userChosenPattern);
        playSound(userChosenColour)
        animateClick(userChosenColour)
        checkAnswer(userChosenPattern.length-1)
    });
   

function playSound(name){
        var audio = new Audio("./sounds/"+name+".mp3")
        audio.play();
    }

function animateClick(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
}, 100)};

function checkAnswer(currentLevel){
     if (userChosenPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success")
        
        if (userChosenPattern.length=== gamePattern.length)
        setTimeout(function(){
            nextSequence()}, 1000);
            
    } else{
        console.log("wrong")

        var wrong = new Audio("./sounds/wrong.mp3")
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, press any key to restart");
       startOver()
    }
    }
function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}