var homePhase = document.getElementById("homePhase");
var questionPhase = document.getElementById("questionPhase");
var finishPhase = document.getElementById("finishPhase");
var highScorePhase = document.getElementById("highScorePhase");

var startButton = document.querySelector("#startButton");
var questionNumber = document.querySelector("#questionNumber");
var timerText = document.querySelector("#timerText");
var scoreText = document.querySelector("#score");
var answerText = document.querySelector("#answerStatus");

var qNum = 0;
var timer;
var statTimer;
var secondsLeft = 60;
var score = 0;


startButton.addEventListener("click", function(event){

    homePhase.classList.add("invisible");
    questionPhase.classList.remove("invisible");

    score = 0;
    QuestionInit(qNum);
    StartTimer();

});


var questionBank = {
    1 : ["Question 1", "Q1 answer 1", "Q1 answer 2", "Q1 answer 3", "Q1 answer 4", 1],
    2 : ["Question 2", "Q2 answer 1", "Q2 answer 2", "Q2 answer 3", "Q2 answer 4", 1],
    3 : ["Question 3", "Q3 answer 1", "Q3 answer 2", "Q3 answer 3", "Q3 answer 4", 1],
    4 : ["Question 4", "answer 1", "answer 2", "answer 3", "answer 4", 1],
    5 : ["Question 5", "answer 1", "answer 2", "answer 3", "answer 4", 1]
};

//////////////////////////////////////////

function QuestionInit(qNum){
    var questions = document.querySelector("ol.questions");
    for (var i= 0 ; i < questions.children.length; i++)
    {
        for (var j = 0; j < 4; j++)
        {
            questions.children[j].firstChild.textContent = Object.entries(questionBank)[qNum][1][j+1];  // second is always a 1, last is answer
        }
    }

}
function answerClick(thisId) // inline function
{
    if (Object.entries(questionBank)[qNum][1][5] == thisId)
    {
        score += 100;
        answerText.textContent='Correct!';
        clearInterval(statTimer);
        StatusTimer();
    }
    else
    {
        score -= 15;
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
function StartTimer()
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
function StatusTimer()
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
function Finish()
{
    clearInterval(timer);
    clearInterval(statTimer);
    timerText.textContent='';
    scoreText.textContent = score;
    finishPhase.classList.remove("invisible");
    questionPhase.classList.add("invisible");
}


questionPhase.classList.add("invisible");
finishPhase.classList.add("invisible");
highScorePhase.classList.add("invisible");

