// variables to store the four Screen sections
var homePhase = document.getElementById("homePhase");
var questionPhase = document.getElementById("questionPhase");
var finishPhase = document.getElementById("finishPhase");
var highScorePhase = document.getElementById("highScorePhase");

// All Buttons and text fields that need to be updated
var startButton = document.querySelector("#startButton");
var questionNumber = document.querySelector("#questionNumber");
var questionContent = document.querySelector("#questionContent");
var timerText = document.querySelector("#timerText");
var scoreText = document.querySelector("#score");
var answerText = document.querySelector("#answerStatus");
var submitButton = document.querySelector("#submit");
var nameField = document.querySelector("#name");
var scoreBoard = document.querySelector("#scoreBoard")
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");
var viewButton = document.querySelector("#view");
var timerField = document.querySelector("#time");

var qNum = 0;
var timer;
var statTimer;
var secondsLeft = 60;
var score = 0;

var pastScores = [];


startButton.addEventListener("click", function(event){

    homePhase.classList.add("invisible");
    viewButton.classList.add("invisible");
    questionPhase.classList.remove("invisible");
    timerField.classList.remove("invisible");

    qNum = 0;  // reset values for game start
    score = 0;
    secondsLeft = 60;
    QuestionInit(qNum);
    StartTimer();

});

submitButton.addEventListener("click", function(){
    
    finishPhase.classList.add("invisible");
    highScorePhase.classList.remove("invisible");

    var currentScore = {
        _name: nameField.value,
        _score: score 
    };

    WritePastScores();  // writes past scores to screen then saves and writes current score

    pastScores.push(currentScore);
    localStorage.setItem("pastScores",JSON.stringify(pastScores));

    var item = document.createElement("li");
    item.textContent = "Name: " + currentScore._name + " Score: " + currentScore._score;
    scoreBoard.appendChild(item);
});

clearButton.addEventListener("click", function(){
    localStorage.removeItem("pastScores");
    pastScores.splice(0,pastScores.length);
    EraseScoreText();
});

backButton.addEventListener("click",function(){
    highScorePhase.classList.add("invisible");
    homePhase.classList.remove("invisible");
    viewButton.classList.remove("invisible");
    EraseScoreText();
});

viewButton.addEventListener("click",function(){
    homePhase.classList.add("invisible");
    viewButton.classList.add("invisible");
    highScorePhase.classList.remove("invisible");
    WritePastScores();
})

// Question bank stores the question, the 4 answer choices, and an integer refering to the index of the correct answer, between (1-4, 0 is the question itself).
var questionBank = {
    1 : ["Which is not a commonly used data type?", "String", "Booleans", "alerts", "numbers", 3],
    2 : ["Which code is correct to begin a for loop?", "var i = 0;", "int i = 0;", "var i < 1;", "i = 0;", 1],
    3 : ["Which function adds a new element to an array?", ".remove()", ".add(content);", ".push('hello');", ".push();", 3],
    4 : ["Arrays can store what?", "numbers", "other arrays", "objects", "all of the above", 4],
    5 : ["Which returns an error?", "var i = 0; i = '0';", "var b = 'string'; b[0] = 'a';", "console.log('c');", "var c = 3; console.log(c);", 2]
};

//////////////////////////////////////////

function QuestionInit(qNum){  // loads the question and answer choices to the screen
    var questions = document.querySelector("ol.questions");
    for (var i= 0 ; i < questions.children.length; i++)  
    {
        for (var j = 0; j < 4; j++)
        {
            questions.children[j].firstChild.textContent = Object.entries(questionBank)[qNum][1][j+1];  // second is always a 1, last is answer
        }
    }
    questionNumber.textContent = qNum + 1;
    questionContent.textContent = Object.entries(questionBank)[qNum][1][0];

}
function answerClick(thisId) // inline function
{
    if (Object.entries(questionBank)[qNum][1][5] == thisId)  //if id of button pressed matches the correct answer stored in question bank
    {
        score += 100;
        answerText.textContent='Correct!';
        clearInterval(statTimer);
        StatusTimer();
    }
    else  // wrong answers
    {
        score -= 15;
        secondsLeft-=10;
        answerText.textContent='Incorrect :(';
        clearInterval(statTimer);
        StatusTimer();
    }

    qNum++;
    if(Object.keys(questionBank).length <= qNum)
    {
        Finish();
        return;
    }
    QuestionInit(qNum);
}
function StartTimer()  // game timer
{
    timer = setInterval(function(){

        secondsLeft--;
        timerText.textContent = secondsLeft;

        if (secondsLeft == 0)
        {
            Finish();
        }

    }, 1000);
}
function StatusTimer()  // when timer runs out, removes 'correct' or 'incorrect' text from play screen
{
    var seconds = 5;
    statTimer = setInterval(function(){
        seconds--;
        if (seconds == 0)
        {
            answerText.textContent ='';
            clearInterval(statTimer);
        }
    }, 1000);
}

function Finish()  // called on game end to save results and clear play screen
{
    clearInterval(timer);
    clearInterval(statTimer);
    timerText.textContent='';
    answerText.textContent ='';
    scoreText.textContent = score;

    finishPhase.classList.remove("invisible");
    questionPhase.classList.add("invisible");
    timerField.classList.add("invisible");
}
function WritePastScores()  // write past scores to high score menu
{
    for (var i = 0; i < pastScores.length; i++)
    {
        var item = document.createElement("li");
        item.textContent = "Name: " + pastScores[i]._name + " Score: " + pastScores[i]._score;
        scoreBoard.appendChild(item);
    }
}
function EraseScoreText()  // erase score text when leaving high score menu
{
    scoreBoard.innerHTML="";
}

/////////////////////////////



questionPhase.classList.add("invisible");
finishPhase.classList.add("invisible");
highScorePhase.classList.add("invisible");
timerField.classList.add("invisible");
pastScores = JSON.parse(localStorage.getItem("pastScores") || '[]') ;

