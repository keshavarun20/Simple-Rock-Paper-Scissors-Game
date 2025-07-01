const scoreCounterElem = document.getElementById("js-scoreCounter");
const resultTextElem = document.getElementById("js-resultText");
const moveTextElem = document.getElementById("js-moveText");

const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

function updateScore() {
  scoreCounterElem.innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function countScore(result) {
  if (result === "You Won!") {
    score.wins++;
  } else if (result === "You Lost!") {
    score.losses++;
  } else if (result === "Tie") {
    score.ties++;
  }

  updateScore();

  localStorage.setItem("score", JSON.stringify(score));
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  updateScore();

  resultTextElem.innerText = "";

  moveTextElem.innerHTML = "";

  localStorage.removeItem("score");
}

function getComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber < 1 / 3) computerMove = "Rock";
  else if (randomNumber < 2 / 3) computerMove = "Paper";
  else computerMove = "Scissors";

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = getComputerMove();

  let result = "";

  if (playerMove === computerMove) {
    result = "Tie";
  } else if (playerMove === "Rock") {
    result = computerMove === "Paper" ? "You Lost!" : "You Won!";
  } else if (playerMove === "Paper") {
    result = computerMove === "Scissors" ? "You Lost!" : "You Won!";
  } else if (playerMove === "Scissors") {
    result = computerMove === "Rock" ? "You Lost!" : "You Won!";
  }

  countScore(result);

  resultTextElem.innerText = `${result}`;

  moveTextElem.innerHTML = `
  <div class="move-box">
    <span class="label">Your Move</span>
    <img src="images/${playerMove}-emoji.png" alt="${playerMove}-emoji" class="move-i" />
  </div>
  <div class="move-box">
    <span class="label">Computer Move</span>
    <img src="images/${computerMove}-emoji.png" alt="${computerMove}-emoji" class="move-i" />
  </div>
`;
}

document.getElementById("js-rock-button").onclick = function () {
  playGame("Rock");
};
document.getElementById("js-paper-button").onclick = function () {
  playGame("Paper");
};
document.getElementById("js-scissors-button").onclick = function () {
  playGame("Scissors");
};
document.getElementById("js-resetScore-button").onclick = function () {
  resetScore();
};
