// dependency for inquirer npm package
var inquirer = require("inquirer");

//create word constructor representing current word to guess. 
//will contain word specific logic and data. require it here
var currentWord = require("./word.js");
//create Letter constructor. 
//each letter object should display either a character or an underscore.
//will contain letter specific logic and data . require it here
var Letter = require("./letter.js");
//keep track of remaining guesses
function GameStart(){
console.log("Let's play HangMom!");
	guessesRemaining = 12;
	answerSpaces = [];
	currentLetters = [];
	lettersGuessed = [];
	flipper = false;
//replace letters of word with underscores
	word = function() {
		currentLetters = currentWord.split("");
		console.log(currentLetters);
			for (var i = 0; i < currentWord.length; i++) {
					answerSpaces[i] = " _ ";
			}

			console.log(answerSpaces.join(""));
			console.log("Guesses remaining: " + guessesRemaining);	
			
	};
//prompt user to guess a letter, capture their "letter" answer
userGuess = function() {
	console.log("inquirer guess function started");
	if (guessesRemaining === 0){
		return printStats();
	}
	inquirer.prompt([
      {
        name: "letter",
        message: "Guess a letter: "
      }	
	]).then(function(letter){
		flipper = false;
		if (lettersGuessed.includes(letter.letter)){
			console.log("You already guessed this letter!");
			return userGuess();
		}
		for (var i = 0; i < currentLetters.length; i++) {
			if(letter.letter === currentLetters[i]){
				flipper = true;
				answerSpaces[i] = letter.letter;
				lettersGuessed.push(letter.letter);
			}
		}

		if (flipper == true) { 
			console.log("CORRECT!!!");
			console.log(answerSpaces);
				if (answerSpaces.includes(" _ ")){
					userGuess();
				}else{
				printStats();
			}
		}else { 
			console.log("flipper still false? " + flipper);
			guessesRemaining--;
			lettersGuessed.push(letter.letter);
		 	console.log(lettersGuessed);
		 	console.log("WRONG!!");
		 	console.log(answerSpaces + "array test");
			console.log("Guesses Left: "+ guessesRemaining);
			userGuess();
		}

		
	//else {
		//console.log("You already guessed this letter!");
	})
}

console.log("Guesses Remaining: " + guessesRemaining);

	printStats = function(){
		if (currentLetters.toString() === answerSpaces.toString()) {
		console.log ("Nice work! You win!");
		GameStart();
		//loss
	} else if (guessesRemaining === 0) {
		inquirer.prompt([
      {
        name: "playagain",
        type: "confirm",
        message: "You lose! Wanna try again? "
    }])

    .then(function(answer) {
      if(answer.playagain){
        StartGame();
      } else{
        console.log("See ya next time!");
      }
    })}
	}
	word();
	console.log(currentWord);
	userGuess();
}
var Game = new GameStart();
