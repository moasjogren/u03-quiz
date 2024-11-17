const amount = 1
const type = 'multiple'

const categories = [
  {
    id: 9,
    name: 'General Knowledge',
    color: '#ef4444',
    borderColor: '#dc2626',
    icon: '💡',
  },
  {
    id: 22,
    name: 'Geography',
    color: '#f97316',
    borderColor: '#ea580c',
    icon: '🌎',
  },
  {
    id: 25,
    name: 'Art',
    color: '#eab308',
    borderColor: '#ca8a04',
    icon: '🎨',
  },
  {
    id: 21,
    name: 'Sports',
    color: '#84cc16',
    borderColor: '#65a30d',
    icon: '⚽️',
  },
  {
    id: 12,
    name: 'Music',
    color: '#06b6d4',
    borderColor: '#0891b2',
    icon: '🎵',
  },
  {
    id: 23,
    name: 'History',
    color: '#3b82f6',
    borderColor: '#2563eb',
    icon: '📜',
  },
  {
    id: 27,
    name: 'Animals',
    color: '#8b5cf6',
    borderColor: '#7c3aed',
    icon: '🐱',
  },
  {
    id: 17,
    name: 'Science',
    color: '#ec4899',
    borderColor: '#db2777',
    icon: '🔬',
  },
]

let url = null
let selectedCategory = null
let questions = []
let currentQuestion = null
let selectedAnswer = null
let questionIndex = 0
let timer = null
let score = 0

const categoryContainer = document.querySelector('.category-container')
const questionContainer = document.querySelector('.question-container')
const questionTitle = document.querySelector('.question-container h1')
const answerContainer = document.querySelector('.answer-container')
const quizFooter = document.querySelector('.quiz-footer')
const quizTitle = document.querySelector('.quiz-header h1')

let highScore = 0

function getHighScore() {
  highScore = parseInt(localStorage.getItem('highScore')) || 0
  quizFooter.querySelector(
    '.high-score',
  ).textContent = `High Score: ${highScore}`
}

resetQuiz()
getHighScore()

answerContainer
  .querySelectorAll('.answer-container__item')
  .forEach((item, index) => {
    item.addEventListener('click', () => {
      selectAnswer(index)
    })
  })

function addCategoryElement(category) {
  const item = document.createElement('div')

  item.classList.add('category-container__item')
  item.style.backgroundColor = `${category.color}`
  item.style.borderBottom = `0.5rem solid ${category.borderColor}`

  const iconSpan = document.createElement('span')
  iconSpan.textContent = category.icon

  item.appendChild(iconSpan)

  item.addEventListener('click', () => {
    selectCategory(category.id)
  })

  categoryContainer.appendChild(item)
}

function showCategories() {
  ;[...categories]
    .sort(() => Math.random() - 0.5)
    .splice(0, 4)
    .forEach((category) => {
      addCategoryElement(category)
    })
}

function selectCategory(category) {
  selectedCategory = category

  quizTitle.textContent = categories.find((c) => c.id === category).name

  categoryContainer.classList.add('hidden')
  questionContainer.classList.remove('hidden')

  setTimeout(() => {
    getQuestions()
  }, 1000)
}

async function getQuestions() {
  if (!selectCategory) return
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&type=${type}&category=${selectedCategory}`,
    )
    if (!response.ok) {
      throw new Error('HTTP' + response.status)
    }
    const data = await response.json()

    questions = data.results.map((q) => {
      return {
        question: removeHTMLEntities(q.question),
        correctAnswer: removeHTMLEntities(q.correct_answer),
        options: [...q.incorrect_answers, q.correct_answer]
          .sort(() => Math.random() - 0.5)
          .map((option) => removeHTMLEntities(option)),
      }
    })

    currentQuestion = questions[0]
    showQuestion(currentQuestion)
  } catch (error) {
    console.log(error)
  }
}

function showQuestion(q) {
  questionTitle.textContent = currentQuestion.question

  setTimeout(() => {
    showOptions()
  }, 1000)
}

function showOptions() {
  answerContainer.classList.remove('loading')

  const items = answerContainer.querySelectorAll('.answer-container__item')

  items.forEach((item, index) => {
    item.textContent = currentQuestion.options[index]
  })
}

function selectAnswer(index) {
  console.log(index)

  const isCorrect =
    currentQuestion.options[index] === currentQuestion.correctAnswer

  if (isCorrect) {
    console.log('correct')
  } else {
    console.log('wrong')
  }

  answerContainer
    .querySelectorAll('.answer-container__item')
    .forEach((item, index) => {
      if (currentQuestion.options[index] === currentQuestion.correctAnswer) {
        item.classList.add('correct')
      } else {
        item.classList.add('wrong')
      }
    })

  score += isCorrect ? 1 : 0

  setTimeout(() => {
    updateScore()
  }, 1000)
}

function updateScore() {
  if (score > highScore) {
    highScore = score
    localStorage.setItem('highScore', highScore)
  }

  quizFooter.querySelector('.score').textContent = `Score: ${score}`
  quizFooter.querySelector(
    '.high-score',
  ).textContent = `High Score: ${highScore}`

  setTimeout(() => {
    resetQuiz()
  }, 1000)
}

function resetQuiz() {
  selectedAnswer = null
  selectedCategory = null

  questionTitle.textContent = '...'
  answerContainer.classList.add('loading')
  answerContainer
    .querySelectorAll('.answer-container__item')
    .forEach((item) => {
      item.textContent = ''
      item.classList.remove('correct')
      item.classList.remove('wrong')
    })

  categoryContainer.classList.remove('hidden')
  questionContainer.classList.add('hidden')
}

function removeHTMLEntities(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.documentElement.textContent
}

document.addEventListener('DOMContentLoaded', () => {
  showCategories()
})
