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
    let genImg = document.createElement("img");
    genImg.src = `./img/${cat}.png`;
    document.querySelector(".quiz-container__gameboard__categories").append(genDivs);
    genDivs.append(genImg);
    genImg.addEventListener("click", function () {
      switch (cat) {
        case "generalKnowledge":
          getQuestion(generalKnowledge);
          break;
        case "geography":
          getQuestion(geography);
          break;
        case "art":
          getQuestion(art);
          break;
        case "sports":
          getQuestion(sports);
          break;
        case "music":
          getQuestion(music);
          break;
        case "history":
          getQuestion(history);
          break;
        case "animals":
          getQuestion(animals);
          break;
        case "science":
          getQuestion(science);
          break;
      }
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
    console.log(data.results[0].question);
  } catch (error) {
    console.log(error);
  }
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
