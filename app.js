const start = document.querySelector(".start");
const quiz = document.querySelector(".quiz");
const question = document.querySelector(".question");
const allAnswerChoices = document.querySelectorAll(".choice");
const answerChoiceA = document.querySelector("#A");
const answerChoiceB = document.querySelector("#B");
const answerChoiceC = document.querySelector("#C");
const answerChoiceD = document.querySelector("#D");
const couter = document.querySelector(".counter");
const timeGauge = document.querySelector(".time-gauge");
const progressContainer = document.querySelector(".progress-container");
const scoreContainer = document.querySelector(".score-container");

// Questions
let questions = [
  {
    question: "How many different sounds can a cat make?",
    questionImg: "img/1.jpg",
    choiceA: "100",
    choiceB: "150",
    choiceC: "10",
    choiceD: "27",
    correctAnswer: "100",
  },
  {
    question: "What breed of cat has a reputation for being cross-eyed?",
    questionImg: "img/2.jpg",
    choiceA: "Himalayan",
    choiceB: "Egyptian Mau",
    choiceC: "Siamese",
    choiceD: "Persian",
    correctAnswer: "Siamese",
  },
  {
    question: "What is the most common training command taught to dogs?",
    questionImg: "img/3.jpg",
    choiceA: "Stay",
    choiceB: "Sit",
    choiceC: "Dance",
    choiceD: "Roll",
    correctAnswer: "Sit",
  },
  {
    question: "What is a dog’s most highly developed sense?",
    questionImg: "img/4.jpg",
    choiceA: "Smell",
    choiceB: "Sight",
    choiceC: "Taste",
    choiceD: "Touch",
    correctAnswer: "Smell",
  },
  {
    question: " How many known species of birds are there?",
    questionImg: "img/5.jpg",
    choiceA: "5,000",
    choiceB: "10,000",
    choiceC: "20,000",
    choiceD: "40,000",
    correctAnswer: "10,000",
  },
  {
    question: "What evolutionary adaptation helps birds fly?",
    questionImg: "img/6.jpg",
    choiceA: "Rapid Digestion",
    choiceB: "Beaks",
    choiceC: "Hollow Bones",
    choiceD: "All of These",
    correctAnswer: "All of These",
  },
  {
    question:
      "Which of the following is not one of the four remaining subspecies of elk in North America?",
    questionImg: "img/7.jpg",
    choiceA: "Manitoba Elk",
    choiceB: "Highland Elk",
    choiceC: "Rocky Mountain Elk",
    choiceD: "Tule Elk",
    correctAnswer: "Highland Elk",
  },
  {
    question: "What is a baby elk called?",
    questionImg: "img/8.jpg",
    choiceA: "Bull",
    choiceB: "Sow",
    choiceC: "Cow",
    choiceD: "Calf",
    correctAnswer: "Calf",
  },
  {
    question: "What do wolves use their scent for?",
    questionImg: "img/9.jpg",
    choiceA: "Marking Territory",
    choiceB: "Finding Prey",
    choiceC: "A Cover-up",
    choiceD: "Nothing",
    correctAnswer: "Marking Territory",
  },
  {
    question:
      "If a wolf trespasses on the territory of other wolves, what will happen?",
    questionImg: "img/10.jpg",
    choiceA: "Nothing",
    choiceB: "It will be accepted into the pack",
    choiceC: "It will be chased or killed",
    choiceD: "It will be required to present prey to the pack",
    correctAnswer: "It will be chased or killed",
  },
];

// Neccessary Variables

const lastQuestion = questions.length - 1;
let activeQuestion = 0;
let count = 0;
const questionTime = 10; // 10 seconds
const gaugeWidth = 800;
const gaugeUnit = gaugeWidth / questionTime; // 80px
let TIMER;
let score = 0;
// renderQuestion Function

function renderQuestion() {
  let q = questions[activeQuestion];
  question.innerHTML = "<p>" + q.question + "</p>";
  answerChoiceA.innerHTML = q.choiceA;
  answerChoiceB.innerHTML = q.choiceB;
  answerChoiceC.innerHTML = q.choiceC;
  answerChoiceD.innerHTML = q.choiceD;

  let bodyImg = `url(${q.questionImg})`;
  let body = document.body;
  body.style.backgroundImage = bodyImg;
}
// starat quiz function
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.visibility = "visible";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

// Start Button Event listener
start.addEventListener("click", function () {
  startQuiz();
});

// Answer choices event listeners

allAnswerChoices.forEach((click) => {
  click.addEventListener("click", function (e) {
    let userAnswer = click.innerText;
    checkAnswer(userAnswer);
  });
});
// Render progress function

function renderProgress() {
  for (let questionIndex = 0; questionIndex <= lastQuestion; questionIndex++) {
    progressContainer.innerHTML +=
      "<div class='progress-box' id=" + questionIndex + " ></div>";
  }
}
// render counter function

function renderCounter() {
  if (count <= questionTime) {
    couter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    answerIsIncorrect();
    nextQuestion();
  }
}

// Check answer function

function checkAnswer(answer) {
  if (answer === questions[activeQuestion].correctAnswer) {
    score++;
    answerIsCorrect();
  } else {
    answerIsIncorrect();
  }
  nextQuestion();
}

// answer is correct function

function answerIsCorrect() {
  document.getElementById(activeQuestion).style.backgroundColor = "green";
}
// answer is incorrect function

function answerIsIncorrect() {
  document.getElementById(activeQuestion).style.backgroundColor = "red";
}

// next question function

function nextQuestion() {
  count = 0;
  if (activeQuestion < lastQuestion) {
    activeQuestion++;
    renderQuestion();
  } else {
    clearInterval(TIMER);
    renderScore();
  }
}

// render score function

function renderScore() {
  scoreContainer.style.visibility = "visible";
  let scorePercentage = Math.round((100 * score) / questions.length);
  scoreContainer.innerHTML = `<h2> Percentage of correctly answered questions:  ${scorePercentage}`;
  scoreContainer.innerHTML += `<h2> Percentage of correctly answered questions:  ${score}`;
}
