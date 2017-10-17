// using a function contructor form to create an object
function MyApp(){
	var version = "v1.0";
	var correctNumber;
	var attempts;
	var isRunning = true;
	var $userStartGame;
	var $userInput;
	var $userSubmit;
	var $userPrompt;
	var $reset;

	// creating a private function
	function setStatus(message){
		$("#app>footer").text(message);
	}

	function startGame(){
	  correctNumber;

	  $userStartGame.onClick = setNumber();
		console.log('setNumber');
	}

	function setNumber(){
	  correctNumber = $userInput.val();
	  $userInput.val('');
	  setStatus("Player 2 make an attempt to guess the number.");
	  $userSubmit.removeClass('hidden');
	}

	function guessNumber(){
	  if(isRunning){
	    guess = parseInt($userInput.val());
	    $userInput.val('');
	    attempts++;
	    if(guess != ""){
	      if(guess == -1){
	        setStatus('You quit the game by putting in -1');
	      }

	      if(guess > correctNumber){
	        setStatus("Guess too high. Try again");
	      }

	      if(guess < correctNumber){
	        setStatus("Guess too low. Try again");
	      }

	      if(guess == correctNumber){
	        setStatus("Congrats you guessed the correct number (" + correctNumber + "). It took you " + attempts + " guesses to guess it. Click play to play again.");
	        stopGame();
	      }
	    }
	  }
	}

	function stopGame(){
	  $userSubmit.addClass("hidden");
	  $reset.removeClass("hidden");
	  isRunning = false;
	}

	function reset(){
	  $userStartGame.removeClass("hidden");
	  $reset.addClass("hidden");
	  setStatus("Welcome to the coolest game ever. Player 1 enter your number");
	  isRunning = true;
	  attempts = 0;
	  correctNumber = 0;
	  $userInput.val(1);
	}

	// creating a public function
	this.start = function(){
		attempts = 0;
	  $userStartGame = $('#userStartGame');
	  $userInput = $('#userTextInput');
	  $userPrompt = $('#userPrompt');
	  $userSubmit = $('#userSubmit');
	  $reset = $('#reset');
		$("#userStartGame").on('click', function(e){
			e.preventDefault();
			$userStartGame.addClass("hidden");
			setNumber();
		});
		$("#userSubmit").on('click', function(e){
			e.preventDefault();
			guessNumber();
		});
		$("#reset").on('click', function(e){
			e.preventDefault();
			reset();
		});
		$("#app>header").append(version);
		setStatus("ready");
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(document).ready(function() {
	window.app = new MyApp();
	window.app.start();
});
