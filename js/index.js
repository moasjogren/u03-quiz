const generalKnowledge = "https://opentdb.com/api.php?amount=1&category=9&type=multiple";
const geography = "https://opentdb.com/api.php?amount=1&category=22&type=multiple";
const art = "https://opentdb.com/api.php?amount=1&category=25&type=multiple";
const sports = "https://opentdb.com/api.php?amount=1&category=21&type=multiple";
const music = "https://opentdb.com/api.php?amount=1&category=12&type=multiple";
const history = "https://opentdb.com/api.php?amount=1&category=23&type=multiple";
const animals = "https://opentdb.com/api.php?amount=1&category=27&type=multiple";
const science = "https://opentdb.com/api.php?amount=1&category=17&type=multiple";

// Array med kategorierna
const categories = ["generalKnowledge", "geography", "art", "sports", "music", "history", "animals", "science"];

// Funktion för slumpmässigt val av 4 kategorier
function getRandomOrder(arr) {
  let randomArray = arr.sort(() => Math.random() - 0.5).slice(0, 4);
  return randomArray;
}

function createCats() {
  let randomCats = getRandomOrder(categories);
  randomCats.forEach((cat) => {
    let genDivs = document.createElement("div");
    genDivs.style.background = "red";
    genDivs.innerHTML = cat;
    document.querySelector(".quiz-container__gameboard__categories").append(genDivs);
  });
}
createCats();

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
