const generalKnowledge =
  'https://opentdb.com/api.php?amount=1&category=9&type=multiple'
const geography =
  'https://opentdb.com/api.php?amount=1&category=22&type=multiple'
const art = 'https://opentdb.com/api.php?amount=1&category=25&type=multiple'
const sports = 'https://opentdb.com/api.php?amount=1&category=21&type=multiple'
const music = 'https://opentdb.com/api.php?amount=1&category=12&type=multiple'
const history = 'https://opentdb.com/api.php?amount=1&category=23&type=multiple'
const animals = 'https://opentdb.com/api.php?amount=1&category=27&type=multiple'
const science = 'https://opentdb.com/api.php?amount=1&category=17&type=multiple'
const lifeElement = document.querySelector('.quiz-container__life')
const questionBox = document.querySelector(
  '.quiz-container__gameboard__questions',
)
// Array med kategorierna
//const categories = ["generalKnowledge", "geography", "art", "sports", "music", "history", "animals", "science"];

// Funktion för slumpmässigt val av 4 kategorier
function getRandomOrder(arr) {
  let randomArray = arr.sort(() => Math.random() - 0.5).slice(0, 4)
  return randomArray
}

function createCats() {
  let randomCats = getRandomOrder(categories)
  randomCats.forEach((cat) => {
    let genDivs = document.createElement('div')
    let genImg = document.createElement('img')
    genImg.src = `./img/${cat}.png`
    document
      .querySelector('.quiz-container__gameboard__categories')
      .append(genDivs)
    genDivs.append(genImg)
    genImg.addEventListener('click', function () {
      switch (cat) {
        case 'generalKnowledge':
          getQuestion(generalKnowledge)
          break
        case 'geography':
          getQuestion(geography)
          break
        case 'art':
          getQuestion(art)
          break
        case 'sports':
          getQuestion(sports)
          break
        case 'music':
          getQuestion(music)
          break
        case 'history':
          getQuestion(history)
          break
        case 'animals':
          getQuestion(animals)
          break
        case 'science':
          getQuestion(science)
          break
      }
      document.querySelector('.card').classList.toggle('flipped')
    })
  })
}
async function getQuestion(cat) {
  try {
    const response = await fetch(cat)
    if (!response.ok) {
      throw new Error('HTTP' + response.status)
    }
    const data = await response.json()
    genQuestion(data.results[0])
  } catch (error) {
    console.log(error)
  }
}

function genQuestion(data) {
  const question = data.question
  const questionTitle = document.createElement('h2')
  questionTitle.classList.add('question')
  questionTitle.innerHTML = question
  questionBox.append(questionTitle)
  const rightAnswer = data.correct_answer
  const options = [...data.incorrect_answers, rightAnswer]
  const randomOrder = getRandomOrder(options)
  randomOrder.forEach((text) => {
    const option = document.createElement('div')
    option.classList.add('answer')
    option.innerHTML = text
    questionBox.append(option)
  })
}

createCats()

// Game over-state nedan
const gaga = new Health(lifeElement, () => {
  console.log('game over')
})

window.gaga = gaga

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

//globala variablar
const quizDuration = 10
let secondsLeft
let countdownInterval
const timeAddedByRightAnswer = 3
let timerInProgress = false

function startCountdown() {
  if (timerInProgress) return
  timerInProgress = true
  secondsLeft = quizDuration
  document.querySelector('#timer').style.width = '100%'
  document.getElementById('timer').style.backgroundColor = '#0ea5e9'

  countdownInterval = setInterval(() => {
    if (secondsLeft > 0) {
      if (secondsLeft === 6) {
        document.getElementById('timer').style.backgroundColor = '#ff0000'
      } else if (secondsLeft > 6) {
        document.getElementById('timer').style.backgroundColor = '#0ea5e9'
      }
      secondsLeft -= 1
      document.getElementById('start-btn').textContent = secondsLeft
      document.getElementById('timer').style.width = `${
        (secondsLeft / quizDuration) * 100
      }%`
    } else {
      alert("Time's up! You can allways take the quiz again!")
      timerInProgress = false
      clearInterval(countdownInterval)
    }
  }, 1000)
}

function addTime() {
  secondsLeft += timeAddedByRightAnswer
  if (secondsLeft > quizDuration) {
    secondsLeft = quizDuration
  }
}
