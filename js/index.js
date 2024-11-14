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
