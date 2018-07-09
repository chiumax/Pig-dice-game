/*
Traditional Pig dice game recreated by dumblole.
Check out the repository page for more information:
https://github.com/dumblole/Pig-dice-game
*/

let pScores,
	roundScore,
	diceNum,
	pretend,
	tick,
	ding,
	dice,
	dice2,
	rollButton,
	holdButton,
	currentPlayer,
	currentScore,
	currentHold,
	currentDice,
	currentDice2,
	prevDie,
	finalWin,
	checkBox,
	checkicon,
	checked;

// Defining the variables used

checked = false;
currentPlayer = true;
diceNum = 0;
prevDie = 0;
// Setting up some audio cues for events like rolling and winning
tick = new Audio('audio/tick.wav');
ding = new Audio('audio/ding.wav');
// I'd rather not copy paste so I substituted the following into variables.
dice = document.getElementById('d1');
dice2 = document.getElementById('d2');
rollButton = document.getElementById('rolld');
holdButton = document.getElementById('holdd');
checkBox = document.getElementById('checky');
checkicon = document.getElementById('cicon');
currentHold = document.getElementById('current-' + currentPlayer);
currentScore = document.getElementById('score-' + currentPlayer);
// Updating some css
dice.style.display = 'none';
dice2.style.display = 'none';
// Detect when the 'ROLL DICE' button is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
	let tickSpeed, slot, iter;

	// I redefined these to update them because current player gets updated
	currentHold = document.getElementById('current-' + currentPlayer);
	currentScore = document.getElementById('score-' + currentPlayer);
	currentDice = 0;
	currentDice = 0;
	tickSpeed = 10;
	rollButton.disabled = true;
	rollButton.style.cursor = 'default';
	rollButton.textContent = 'Rolling...';
	checked ? (tickSpeed = 1) : (tickSpeed = 6);
	// Dice rolling kind of like slot machines
	iter = setInterval(function() {
		// Playing a tick sound effect when rolling dice
		tick.play();

		// Changing the dice
		currentDice = Math.floor(Math.random() * 6) + 1;
		currentDice2 = Math.floor(Math.random() * 6) + 1;
		dice.style.display = 'block';
		dice.src = 'images/dice-' + currentDice + '.png';
		dice2.style.display = 'block';
		dice2.src = 'images/dice-' + currentDice2 + '.png';
	}, 50);

	/*
	After playing the audio 6 times to simulate rolling, these events happen
	after because the diceNum variable depends on the last random number that
	is generated
	*/
	setTimeout(function() {
		clearInterval(iter);
		// If player rolls two 6s in a row, player looses all score.
		if (currentDice2 === currentDice && currentDice === 6) {
			currentScore.textContent = 0;
			resetR();
		}
		if (currentDice === 1 || currentDice2 === 1) {
			resetR();
		}
		// Resets the cursor and button to normal to prevent spamming
		rollButton.disabled = false;
		rollButton.style.cursor = 'pointer';
		currentHold.textContent = diceNum += currentDice + currentDice2;
		rollButton.innerHTML = '<i class="ion-ios-loop"></i>Roll dice';
	}, 50 * tickSpeed);
});
/*
Detect when the 'HOLD' button is clicked, so basically it takes the current
score of the current player and it adds it to the total score of the current
player.
*/
document.querySelector('.btn-hold').addEventListener('click', function() {
	currentScore = document.getElementById('score-' + currentPlayer);
	// Customizable win score
	finalWin = document.querySelector('.final-score').value;
	finalWin ? (finalWin = finalWin) : (finalWin = 100);
	currentScore.textContent =
		parseInt(currentScore.textContent) + parseInt(currentHold.textContent);
	// The first person to hold with a score higher than the set score wins
	if (parseInt(currentScore.textContent) >= finalWin) {
		document
			.querySelector('.player-' + currentPlayer + '-panel')
			.classList.remove('active');
		document
			.querySelector('.player-' + currentPlayer + '-panel')
			.classList.add('winner');
		document.getElementById('name-' + currentPlayer).textContent =
			'Winner!';
		dice.style.display = 'none';
		dice2.style.display = 'none';
		rollButton.disabled = true;
		holdButton.disabled = true;
		rollButton.style.cursor = 'default';
		holdButton.style.cursor = 'default';
		ding.play();
	} else {
		resetR();
	}
});
/*
Detect when the 'NEW GAME' button is clicked, so basically it resets everything
to the beginning state when the page first loaded
*/
document.querySelector('.btn-new').addEventListener('click', function() {
	// Reset everything to the way it was when the game first loads

	document
		.querySelector('.player-' + currentPlayer + '-panel')
		.classList.remove('winner');
	currentPlayer === false ? resetR() : (currentPlayer = true);
	diceNum = 0;
	dice.style.display = 'none';
	rollButton.disabled = false;
	holdButton.disabled = false;
	rollButton.style.cursor = 'pointer';
	holdButton.style.cursor = 'pointer';
	prevDie = 0;
	document
		.querySelector('.player-' + currentPlayer + '-panel')
		.classList.add('active');
	document.getElementById('name-true').textContent = 'Player 1';
	document.getElementById('name-false').textContent = 'Player 2';
	document.getElementById('score-true').textContent = '0';
	document.getElementById('score-false').textContent = '0';
	document.getElementById('current-true').textContent = '0';
	document.getElementById('current-false').textContent = '0';
});

// Reset the score in hold and will switch the player's turn
function resetR() {
	document
		.querySelector('.player-' + currentPlayer + '-panel')
		.classList.remove('active');
	currentHold.textContent = 0;
	currentDice = 0;
	currentDice2 = 0;
	diceNum = 0;
	currentPlayer = !currentPlayer;
	document
		.querySelector('.player-' + currentPlayer + '-panel')
		.classList.add('active');
	prevDie = 0;
}

/*
A special checkbox animation for toggling and untoggling
*/
checkBox.addEventListener('change', function() {
	if (checkBox.checked) {
		checked = true;
		tick.play();
		checkicon.innerHTML =
			'<i class="ion-android-checkbox" id="checkicon" style="font-size: 200;"></i>Turn Off Roll Animation';
	} else {
		checked = false;
		tick.play();
		checkicon.innerHTML =
			'<i class="ion-android-checkbox-blank" id="checkicon" style="font-size: 200;"></i>Turn Off Roll Animation';
	}
});
