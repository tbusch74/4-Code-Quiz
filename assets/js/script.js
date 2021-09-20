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
var sec = 601;
var questionCount = 0;
var answersCorrect = 0;

//questions
var quizQuestionsObj = [{
    question: "What is NOT a Javascript data type",
    answers: {answer1: "Special Character",
        answer2: "Object",
        answer3: "Boolean",
        answer4: "String"},
    solution: "answer-1"
},{
    question: "What company developed Javascript",
    answers: {answer1: "Apple",
        answer2: "Netscape",
        answer3: "Microsoft",
        answer4: "The company our instructor works for"},
    solution: "answer-2"
},{
    question: "Which option shows the Javascript equality operator",
    answers: {answer1: "=",
        answer2: "===",
        answer3: ">=",
        answer4: "++"},
    solution: "answer-2"
},{
    question: "What is the result of '7'+'1'+'1'",
    answers: {answer1: "9",
        answer2: "71",
        answer3: "81",
        answer4: "711"},
    solution: "answer-4"
},{
    question: "What is event bubbling?",
    answers: {answer1: "When two or more styles interfere with each other and element 'bubble' together",
        answer2: "When nested elements allow the handler of the parent to work as if it was clicked",
        answer3: "An organizational layout unique to Javascript",
        answer4: "There is no such thing, this is a common gotcha interview question to see if you studied"},
    solution: "answer-2"
},{
    question: "Is Javascript case sensitive",
    answers: {answer1: "Yes",
        answer2: "No",
        answer3: "Yes - Only within if statements",
        answer4: "Yes - Only within for statements"},
    solution: "answer-1"
},{
    question: "What is a callback function?",
    answers: {answer1: "The first instnace where Javascript was deployed - literally calling people back that hung up on telemarketers",
        answer2: "A function that can me called with the command callBack()",
        answer3: "A function passed into another function as an arguement",
        answer4: "There is no such thing as a callback function is specific to HTML"},
    solution: "answer-3"
},{
    question: "What is true about Javascript objects?",
    answers: {answer1: "We no longer use them due to security concerns",
        answer2: "They must all have a unique ID",
        answer3: "They need to be cleared before navigating away from the web page",
        answer4: "They are name:value pairs"},
    solution: "answer-4"
},{
    question: "What is the issue with the following piece of Javascript code: var i = 1; while (i === 1) {someFunction()}",
    answers: {answer1: "Nothing, this is how you call Javascript",
        answer2: "We have an infinate loop (assuming that 'someFunction()' doesn't change the value of i",
        answer3: "The '===' needs to be changed to '='",
        answer4: "We haven't appended a chile to anything and that is the only point of Javascript."},
    solution: "answer-2"
},{
    question: "What does the 'push()' method do?",
    answers: {answer1: "Pushes the code out to production",
        answer2: "Adds an element to an object",
        answer3: "Adds an element to an array",
        answer4: "Woah..Don't ever even think about putting that in your code"},
    solution: "answer-3"
}]

var startTimer = function(){
        var timer = setInterval(function() {
        sec = sec - 1;
        timerEl.textContent ="Seconds Remaining: " + sec;
        if (sec <= -1) {
            clearInterval(timer);
            endGame();
        }
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

var checkHighScores = function () {
    if (localStorage.getItem("scores") === null) {
        savedScores = []
        enterHighScore();
    }else{
        savedScores = localStorage.getItem("scores");
        savedScores = JSON.parse(savedScores);
        savedScores = savedScores.sort(function(a, b){return b.score - a.score});
        if (savedScores.length < 3) {
            enterHighScore();
        }else if (savedScores[2].score < answersCorrect) {
            enterHighScore();
        }else{
            alert("You didn't get a top score. Kepep Studying!")
            viewHighScores();
        }
    }  
}

var enterHighScore = function () {    
    alert("You have made the top 3! Congrats!")
    var playerScore = {
    name: prompt("What is your name?"),
    score: answersCorrect
    }
    savedScores.push(playerScore);
    savedScores = savedScores.sort(function(a, b){return b.score - a.score});
    if (savedScores.length > 3) {
        savedScores = savedScores.slice(0, 3);
    }
    localStorage.setItem("scores", JSON.stringify(savedScores));
    viewHighScores();
}

var viewHighScores = function () {
    headerEditEl.innerHTML = '<div class="header-wrapper"><h1 class = "page-title">Javascript FUNdamentals Quiz HIGH SCORES</h1>'   
    mainEditEl.innerHTML = '<div class="high-score-area"><ul></ul></div>'
    highScores = localStorage.getItem("scores");
    highScores = JSON.parse(highScores);
    for (i = 0; i<highScores.length; i++) {
        var highScoreEl = document.querySelector(".high-score-area ul");
        var highScorerEl = document.createElement("li");
        highScorerEl.textContent = highScores[i].name + " - " + highScores[i].score;
        highScoreEl.appendChild(highScorerEl);
    }
    var returnButtonEl = document.createElement("button");
    returnButtonEl.className = "reset-btn";
    returnButtonEl.textContent = "Return to Quiz Start";
    var returnButtonAreaEl = document.querySelector(".high-score-area");
    returnButtonAreaEl.appendChild(returnButtonEl);
}

var endGame = function () {
    alert("The quiz is over, lets see how you did!");
    checkHighScores();
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
    if (targetEl.matches (".reset-btn")) {
        location.reload();
    }
})