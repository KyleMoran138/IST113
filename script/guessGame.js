function $(element){
  this.element;

  this.value = function(){
    return element.value;
  }

  if(element.charAt(0) == "#"){
    this.element = document.getElementById(element.substr(1));
    return this.element;
  }
}

var correctNumber;
var attempts;
var isRunning = true;
var $userStartGame;
var $userInput;
var $userSubmit;
var $userPrompt;
var $reset;

function startGame(){
  correctNumber;
  attempts = 0;
  $userStartGame = $('#userStartGame');
  $userInput = $('#userTextInput');
  $userPrompt = $('#userPrompt');
  $userSubmit = $('#userSubmit');
  $reset = $('#reset');
  $userStartGame.className = "hidden";
  $userStartGame.onClick = setNumber();
}

function setNumber(){
  correctNumber = $userInput.value;
  $userInput.value = "";
  say("Player 2 make an attempt to guess the number.");
  $userSubmit.className = "";
}

function guessNumber(){
  if(isRunning){
    guess = $userInput.value;
    $userInput.value = "";
    attempts++;
    if(guess != ""){
      if(guess == -1){
        say('You quit the game by putting in -1');
      }

      if(guess > correctNumber){
        say("Guess too high. Try again");
      }

      if(guess < correctNumber){
        say("Guess too low. Try again");
      }

      if(guess == correctNumber){
        say("Congrats you guessed the correct number (" + correctNumber + "). It took you " + attempts + " guesses to guess it. Click play to play again.");
        stopGame();
      }
    }
  }else{

  }

}

function stopGame(){
  $userSubmit.className = "hidden";
  $reset.className = "";
  isRunning = false;
}
function reset(){
  $userStartGame.className = "";
  $reset.className = "hidden";
  say("Welcome to the coolest game ever. Player 1 enter your number");
  isRunning = true;
  attempts = 0;
  correctNumber = 0;
  $userInput.value = 1;
}

function say(toSay){
  $userPrompt.innerHTML = toSay;
}
