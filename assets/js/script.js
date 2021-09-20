//global variables
var pageContentEl = document.querySelector("#page-content");
var startQuizEl = document.querySelector(".start-quiz");
var timerEl = document.querySelector(".timer");
var viewHighScoresEl = document.querySelector("#high-scores");
var questionAreaEl = document.querySelector(".question-area");
var answerAreaEl = document.querySelector(".answer-area");
var answerButton = document.querySelector(".answer-btn");
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
    solution: "answer1",
    asked: false
},{
    question: "x",
    answers: {answer1: "a",
        answer2: "b",
        answer3: "c",
        answer4: "d"},
    solution: "answer2",
    asked: false
}]
// },{
//     question: x,
//     answer1: a,
//     answer2: b,
//     answer3: b,
//     answer4: b,
//     solution: b,
//     asked: false
// },{
//     question: x,
//     answer1: a,
//     answer2: b,
//     answer3: b,
//     answer4: b,
//     solution: b,
//     asked: false

//functions
var startTimer = function(){
        setInterval(function() {
        if (sec < 0) {
            clearInterval();
            return
        }
        timerEl.textContent ="Seconds Remaining: " + sec;
        sec = sec - 1;
    }, 1000);
}

var startQuiz = function(event){
    startQuizEl.remove();
    startTimer();
    showQuestion(quizQuestionsObj[questionCount]);
    answerQuestion(quizQuestionsObj[questionCount]);
} 

var showQuestion = function(quizQuestionsObj){
    questionAreaEl.textContent = quizQuestionsObj.question;
    Object.values(quizQuestionsObj.answers).forEach(function(answer){
    var answerButton = document.createElement("button");
    answerButton.className = "answer-btn";
    answerButton.textContent = answer;
    answerAreaEl.appendChild(answerButton); 
    })
}

var answerQuestion = function (quizQuestionsObj) {
    answerButton.addEventListener("click", function(event) {

    });

}

var wrongAnswer = function () {
    sec = sec - 30;
}

var viewHighScores = function (event) {
    
}
//event listeners
startQuizEl.addEventListener("click", startQuiz);
viewHighScoresEl.addEventListener("click", viewHighScores);
