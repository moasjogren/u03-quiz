const generalKnowledge =
  "https://opentdb.com/api.php?amount=1&category=9&type=multiple";
const geography =
  "https://opentdb.com/api.php?amount=1&category=22&type=multiple";
const art = "https://opentdb.com/api.php?amount=1&category=25&type=multiple";
const sports = "https://opentdb.com/api.php?amount=1&category=21&type=multiple";
const music = "https://opentdb.com/api.php?amount=1&category=12&type=multiple";
const history =
  "https://opentdb.com/api.php?amount=1&category=23&type=multiple";
const animals =
  "https://opentdb.com/api.php?amount=1&category=27&type=multiple";
const science =
  "https://opentdb.com/api.php?amount=1&category=17&type=multiple";
const lifeElement = document.querySelector(".quiz-container__life");

const questionBox = document.querySelector(
  ".quiz-container__gameboard__questions"
);
const currentScore = document.querySelector(
  ".quiz-container__gameboard__points__score"
);
const highScore = document.querySelector(".highscore");

let score = 0;
let currentCat;
let currentRound = 0;
let activeQuestion = false;
const catContainer = document.querySelector(
  ".quiz-container__gameboard__categories"
);
const displayRound = document.querySelector(".quiz-container__gameboard__points__round");

document.querySelector(".quiz-container__gameboard__timer").style.display =
  "none";

if (localStorage.getItem("highscore"))
  highScore.innerHTML = localStorage.getItem("highscore");

const displayCategory = document.querySelector(
  ".quiz-container__gameboard__categories-h2"
);

// Array med kategorierna
const categories = [
  "generalKnowledge",
  "geography",
  "art",
  "sports",
  "music",
  "history",
  "animals",
  "science",
];

// Funktion för slumpmässigt val av 4 kategorier
function getRandomOrder(arr) {
  let randomArray = arr.sort(() => Math.random() - 0.5).slice(0, 4);
  return randomArray;
}

function changeCatImg(img) {
  const catImg = document.querySelector(".cat-image");
  catImg.src = `./img/cat${img}.png`;
  catImg.style.scale = "0.3";
  setTimeout(() => {
    catImg.style.scale = "1";
  }, 250);
}

function createCats() {
  let randomCats = getRandomOrder(categories);
  randomCats.forEach((cat) => {
    let genDivs = document.createElement("div");
    let genImg = document.createElement("img");
    genImg.src = `./img/${cat}.png`;
    document
      .querySelector(".quiz-container__gameboard__categories")
      .append(genDivs);
    genDivs.append(genImg);
    genDivs.classList.add(cat);
    genDivs.classList.add("bubble");
    genImg.classList.add("bubble__img");
    genDivs.addEventListener("click", function () {
      switch (cat) {
        case "generalKnowledge":
          getQuestion(generalKnowledge);
          displayCategory.innerHTML = "General knowledge";
          currentCat = generalKnowledge;
          break;
        case "geography":
          getQuestion(geography);
          displayCategory.innerHTML = "Geography";
          currentCat = geography;
          break;
        case "art":
          getQuestion(art);
          displayCategory.innerHTML = "Art";
          currentCat = art;
          break;
        case "sports":
          getQuestion(sports);
          displayCategory.innerHTML = "Sports";
          currentCat = sports;
          break;
        case "music":
          getQuestion(music);
          displayCategory.innerHTML = "Music";
          currentCat = music;
          break;
        case "history":
          getQuestion(history);
          displayCategory.innerHTML = "History";
          currentCat = history;
          break;
        case "animals":
          getQuestion(animals);
          displayCategory.innerHTML = "Animals";
          currentCat = animals;
          break;
        case "science":
          getQuestion(science);
          displayCategory.innerHTML = "Science";
          currentCat = science;
          break;
      }
      document.querySelector(".card").classList.toggle("flipped");
      changeCatImg(1);
    });
  });
}
async function getQuestion(cat) {
  try {
    const response = await fetch(cat);
    if (!response.ok) {
      throw new Error("HTTP" + response.status);
    }

    const data = await response.json();
    genQuestion(data.results[0]);
    console.log("data", data);
  } catch (error) {
    console.log(error);
  }
}

function genQuestion(data) {
  currentRound++;
  displayRound.innerHTML = `${currentRound}/3`;
  console.log("currentRound", currentRound)
  activeQuestion = false;
  questionBox.innerHTML = "";

  const question = data.question;
  const questionTitle = document.createElement("h2");
  questionTitle.classList.add("question");
  questionTitle.innerHTML = question;
  questionBox.append(questionTitle);
  const rightAnswer = data.correct_answer;
  const options = [...data.incorrect_answers, rightAnswer];
  const randomOrder = getRandomOrder(options);
  randomOrder.forEach((text) => {
    const option = document.createElement("div");
    option.classList.add("answer");
    setTimeout(() => {
      option.innerHTML = text;
      questionBox.append(option);
      timerInProgress = true;
    }, 3000);
    option.addEventListener("click", (e) => {
      if (activeQuestion) return;
      activeQuestion = true;

      checkAnswer(text, rightAnswer);
      showCorrectAnswer(document.querySelectorAll(".answer"), rightAnswer);
      if (currentRound === 3) {
        setTimeout(() => {
          newRound();
        }, 2000);
      } else {
        setTimeout(() => {
          getQuestion(currentCat);
        }, 2000);
      }
    });
  });
}
function newRound() {
  currentCat = "";
  currentRound = 0;
  displayRound.innerHTML = `${currentRound}/3`;
  timerInProgress = false;
  catContainer.innerHTML = "";
  displayCategory.innerHTML = "Choose your next category";
  changeCatImg(2);
  document.querySelector(".card").classList.toggle("flipped");
  createCats();
}

function checkAnswer(correct, guess) {
  if (guess === correct) {
    addTime();
    updateScore();
    timerInProgress = false;
    console.log("CORRECT");
  } else {
    decreaseTime()  
    timerInProgress = false;
    // saknad av modul i js script länk
    //
    /* decreaseHealth(); */
    //
    console.log("WRONG");
  }
}

function showCorrectAnswer(array, correct) {
  const doc = new DOMParser().parseFromString(correct, "text/html");
  array.forEach((text) => {
    if (text.innerHTML === doc.documentElement.textContent) {
      text.style.backgroundColor = "#2A9134";
    } else {
      text.style.backgroundColor = "#FF4A1C";
    }
  });
}

createCats();

// Game over-state nedan
const quizHealth = new Health(lifeElement);

function updateScore() {
  score++;

  currentScore.innerHTML = `Score: ${score}`;
  if (score > localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", score);
  }
}

// quiz-container__gameboard__categories
// Nummer för  alla kategorier:
// generalKnowledge = 9
// geography = 22
// art = 25
// sports = 21
// music = 12
// history 23
// animals = 27
// science = 17

/*
const categories = {
  generalknowledge: 9,
  geography: 22,
  art: 25,
  sports: 21,
  music: 12,
  history: 23,
  animals: 27,
  science: 17,
}
*/

//globala variablar
const quizDuration = 30;
let secondsLeft;
let countdownInterval;
const timeAnswer = 3;
let timerInProgress = false;

function startCountdown() {
  document.querySelector(".quiz-container__gameboard__timer").style.display =
    "block";
  // if (timerInProgress) return;
  secondsLeft = quizDuration;
  document.querySelector("#timer").style.width = "100%";
  document.getElementById("timer").style.backgroundColor = "#0ea5e9";

  countdownInterval = setInterval(() => {
    if (secondsLeft > 0) {
      if (secondsLeft < 6) {
        document.getElementById("timer").style.backgroundColor = "#ff0000";
      } else if (secondsLeft < 16) {
        document.getElementById("timer").style.backgroundColor = "yellow";
      } else {
        document.getElementById("timer").style.backgroundColor = "#0ea5e9";
      }
      if (timerInProgress) {
        secondsLeft -= 1;
      }
      // document.getElementById("start-btn").textContent = secondsLeft;
      document.getElementById("timer").style.width = `${
        (secondsLeft / quizDuration) * 100
      }%`;
    } else {
      alert("Time's up! You can allways take the quiz again!");
      timerInProgress = false;
      clearInterval(countdownInterval);
    }
  }, 1000);
}

function addTime() {
  secondsLeft += timeAnswer;
  if (secondsLeft > quizDuration) {
    secondsLeft = quizDuration;
  }
}

function decreaseTime() {
  secondsLeft -= timeAnswer;
  if (secondsLeft > quizDuration) {
    secondsLeft = quizDuration;
  }
}

startCountdown();
