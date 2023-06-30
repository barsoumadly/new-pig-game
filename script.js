'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');

// Selecting buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Selecting scores elements
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

// Declaring main variables
let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];
let playing = true;

// Setting conditions
const setConditions = function () {
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
};

setConditions();

const switchPlayer = function () {
  // Reseting current score
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScore = 0;

  // Switching players
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const currentScoreEl = document.getElementById(`current--${activePlayer}`);
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    // Showing the stuitable dice
    diceEl.src = `dice-${randomNumber}.png`;
    diceEl.classList.remove('hidden');

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      currentScoreEl.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    const scoreEl = document.getElementById(`score--${activePlayer}`);
    const activePlayerEl = document.querySelector(`.player--${activePlayer}`);
    diceEl.classList.add('hidden');

    // Setting the total score
    scores[activePlayer] += currentScore;
    scoreEl.textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // If player wins
      activePlayerEl.classList.add('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

const setVariables = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
};

btnNew.addEventListener('click', function () {
  // Reseting the game
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  setVariables();
  setConditions();
});
