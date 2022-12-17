'use strict';

const p1score = document.getElementById('score--0');
const p2score = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
let diceRoll = 1;
const players = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];
let activePlayer;
let activePlayerCurrentScore;
let activePlayerMainScore;
let activePlayerName;
let winner = false;

p1score.textContent = 0;
p2score.textContent = 0;
dice.classList.add('hidden');

function getActivePlayerInfo() {
  activePlayer = document.querySelector('.player--active');
  activePlayerCurrentScore = document.querySelector(
    '.player--active .current-score'
  );
  activePlayerMainScore = document.querySelector('.player--active .score');
  activePlayerName = document.querySelector('.player--active .name');
}

function switchPlayer() {
  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle('player--active');
  }
}

newBtn.addEventListener('click', function () {
  switchPlayer();
  winner = false;
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains('winner')) {
      players[i].classList.remove('winner');
    }
    document.querySelector(`.player--${i} .score`).textContent = 0;
    document.querySelector(`.player--${i} .current-score`).textContent = 0;
    document.querySelector(`.player--${i} .name`).textContent = `Player ${
      i + 1
    }`;
    dice.classList.add('hidden');
  }
});

holdBtn.addEventListener('click', function () {
  if (!winner) {
    getActivePlayerInfo();
    if (
      Number(activePlayerMainScore.textContent) +
        Number(activePlayerCurrentScore.textContent) >=
      100
    ) {
      activePlayerMainScore.textContent =
        Number(activePlayerMainScore.textContent) +
        Number(activePlayerCurrentScore.textContent);

      activePlayerCurrentScore.textContent = 0;
      activePlayer.classList.add('winner');
      activePlayerName.textContent = `${activePlayerName.textContent} \n Winner!`;
      winner = true;
    } else {
      activePlayerMainScore.textContent =
        Number(activePlayerMainScore.textContent) +
        Number(activePlayerCurrentScore.textContent);
      activePlayerCurrentScore.textContent = 0;
      switchPlayer();
    }
  }
});

rollBtn.addEventListener('click', function () {
  if (!winner) {
    diceRoll = Math.floor(Math.random() * 6 + 1);
    dice.src = `images/dice-${diceRoll}.png`;
    getActivePlayerInfo();
    if (dice.classList.contains('hidden')) {
      dice.classList.remove('hidden');
    }
    if (diceRoll === 1) {
      activePlayerCurrentScore.textContent = 0;
      switchPlayer();
    } else {
      activePlayerCurrentScore.textContent =
        Number(activePlayerCurrentScore.textContent) + diceRoll;
    }
  }
});
