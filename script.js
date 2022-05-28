const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// list of word of game
const words = [
  "sign",
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
  "superman",
  "thor",
  "ironMan",
  "hulk",
];
// init word
let randomWord;

// init score
let score = 0;

// init timer
let time = 10;

// set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficulty.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus one text on start
text.focus();

// start counting down

const timeInterval = setInterval(updateTime, 1000);
// Generate random word from away
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
// add word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // endgame
    gameOver();
  }
}

// Game over , show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p> Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = "flex";
}
addWordToDom();

// Event listener

// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();

    // clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// setting btn click
settingBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// setting select
settingForm.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});
