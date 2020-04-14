const startBtn = document.getElementById("startBtn");
const startGameEl = document.getElementById("start-game-container");
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const closeEndBtn = document.getElementById("closeEnd");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// declare chosen word, initial score and time
let randomWord,
  score = 0,
  time = 10;

// set difficulty to previous value or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;

// start game
function startGame() {
  startGameEl.style.display = "none";
  // focus on text on start
  text.focus();

  // start counting time
  const timeInterval = setInterval(updateTime, 1000);

  function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    if (time === 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }
}

// get random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDOM();

// update score and time
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function endGame() {
  endgameEl.innerHTML = `
  <h1>Ooops, time ran out!</h1>
  <p>Your final score is ${score}.</p>
  <button onclick='location.reload()'>Return to Start Page</button>
  `;

  endgameEl.style.display = "flex";
}

// event listeners

startBtn.addEventListener("click", startGame);

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    // clear input and add word to DOM
    text.value = "";
    addWordToDOM();
    updateScore();

    if (difficulty === "hard") {
      time += 3;
    } else if (difficulty === "medium") {
      time += 5;
    } else {
      time += 7;
    }

    updateTime();
  }
});

// toggle settings
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// select difficulty
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
  settings.classList.toggle("hide");
});

