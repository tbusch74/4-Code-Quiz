//global variables
var pageContentEl = document.querySelector(".page-content");
var startQuizEl = document.querySelector(".start-quiz");
var timerEl = document.querySelector(".timer");
var viewHighScoresEl = document.querySelector("#high-scores");
var questionAreaEl = document.querySelector(".question-area");
var answerAreaEl = document.querySelector(".answer-area");
var resultAreaEl = document.querySelector(".result-area");
var headerEditEl = document.querySelector("header");
var mainEditEl = document.querySelector("main");
var sec = 600;
var questionCount = 0;
var answersCorrect = 0;

//questions
var quizQuestionsObj = [{
    question: "Is this dumb?",
    answers: {answer1: "Yes",
        answer2: "No",
        answer3: "Maybe",
        answer4: "Pass"},
    solution: "answer-1"
},{
    question: "x",
    answers: {answer1: "a",
        answer2: "b",
        answer3: "c",
        answer4: "d"},
    solution: "answer-2"
}]
// },{
//     question: x,
//     answer1: a,
//     answer2: b,
//     answer3: b,
//     answer4: b,
//     solution: b
// },{
//     question: x,
//     answer1: a,
//     answer2: b,
//     answer3: b,
//     answer4: b,
//     solution: b
//}

//functions
var startTimer = function(){
        setInterval(function() {
        if (sec < 0) {
            clearInterval(setInterval());
            endGame();
        }
        timerEl.textContent ="Seconds Remaining: " + sec;
        sec = sec - 1;
    }, 1000);
}

var startQuiz = function(event){
    startQuizEl.remove();
    startTimer();
    showQuestion(quizQuestionsObj[questionCount]);
} 

var showQuestion = function(quizQuestionsObj){
    questionAreaEl.textContent = quizQuestionsObj.question;
    var i = 1
    Object.values(quizQuestionsObj.answers).forEach(function(answer){
    var answerButtonEl = document.createElement("button");
    answerButtonEl.className = "answer-btn";
    answerButtonEl.setAttribute ("id", "answer-" + i);
    answerButtonEl.textContent = answer;
    answerAreaEl.appendChild(answerButtonEl);
    i = i+1;  
    })
}
var endGameCheck = function() {
    if (questionCount < quizQuestionsObj.length - 1) {
        questionCount = questionCount + 1;
        answerAreaEl.innerHTML = "";
        showQuestion(quizQuestionsObj[questionCount]);
    }else 
    endGame();
}

var answerQuestion = function (event, solution) {
    var targetEl = event.target
    if (targetEl.id === solution && targetEl.matches (".answer-btn")) {
        resultAreaEl.textContent = "Correct!";
        answersCorrect = answersCorrect + 1;
        endGameCheck();
    }else if (targetEl.id !== solution && targetEl.matches (".answer-btn")) {
        resultAreaEl.textContent = "Incorrect!";
        sec = sec - 30;
        endGameCheck();
    }
}

var viewHighScores = function () {
    headerEditEl.innerHTML = '<div class="header-wrapper"><h1 class = "page-title">Javascript FUNdamentals Quiz HIGH SCORES</h1>'   
    mainEditEl.innerHTML = '<div class="high-score-area"></div>'
}

var endGame = function () {
    alert("The quiz is over, lets see how you did!");
    viewHighScores();
}
//event listeners
startQuizEl.addEventListener("click", startQuiz);
viewHighScoresEl.addEventListener("click", function(event) {
    viewHighScores();
})
pageContentEl.addEventListener("click", function(event) {
    var targetEl = event.target
    if (targetEl.matches (".answer-btn")) {
        var solution = quizQuestionsObj[questionCount].solution;
        answerQuestion(event, solution);
    }
})