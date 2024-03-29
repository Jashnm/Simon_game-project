var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

//To see if game has started no not
var started = false;

var level = 0;

$(document).keypress(function(){
  if(!started) {
    $("#level_title").text("Level " + level);
    nextSequence();
    started= true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
$("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Checking the pattern and then for wrong input
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    console.log("Success");

  if (userClickedPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }

  }
  else {
    console.log("Wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $("h3").removeClass("hide");
    startOver();
  }
}
//Starting Over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
//For start button clickers

$(".start").click(function(){
  if(!started) {
    $("#level_title").text("Level " + level);
    nextSequence();
    started= true;
    $("h3").addClass("hide");

  }
});
