var homePhase = document.getElementById("homePhase");
var questionPhase = document.getElementById("questionPhase");
var finishPhase = document.getElementById("finishPhase");
var highScorePhase = document.getElementById("highScorePhase");

var startButton = document.querySelector("#startButton");
var questionNumber = document.querySelector("#questionNumber");

var qNum = 0;


startButton.addEventListener("click", function(event){

    homePhase.classList.add("invisible");
    questionPhase.classList.remove("invisible");

    QuestionInit(qNum);

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
        questions.children[j].firstChild.textContent = Object.entries(questionBank)[qNum][1][j+1];  // second is always a 1, last is answer
    }

}
function answerClick(thisId)
{
    qNum++;
    QuestionInit(qNum);
}

questionPhase.classList.add("invisible");
finishPhase.classList.add("invisible");
highScorePhase.classList.add("invisible");

