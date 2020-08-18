let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(".btn").click(function (){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


$(document).keypress(function (){
  if (!started) {
    started = true;
    nextSequence();
  }
});


function nextSequence (){

  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  $("#level-title").text("Level " + level);
  level += 1;
}


function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }
  } else {
      playSound('wrong');
      $("body").addClass("game-over");
      setTimeout(function (){
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}


function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
