//The timer needs to be set at 1 minute
//timer

var testBtn = document.getElementById("testbtn")
var contentDiv = document.getElementById("content")
var cardBox = document.getElementById("cardbox")
var questionBox = document.getElementById("cardtitle")

//dom creations
var cardEl = document.createElement("div")
cardEl.classList.add("card")

var question = document.createElement("h1")

var gameScore = 0


var h1El = document.createElement("h1")
var h2El = document.createElement("h2")
var input = document.createElement("input")

var index = 0
var seconds = 10



//timer variables
var timer
var timerStart
var timerCount
var timerEl = document.getElementById("timer")





//Questions and ans
var questionsArr = ["Which of the following is an advantage of using JavaScript?",
    "How can you get the total number of arguments passed to a function?",
    "Which built-in method returns the length of the string?",
    "Which built-in method sorts the elements of an array?"]
var answersArr = [
    ["Less server interaction", " Immediate feedback to the visitors", "Increased interactivity", "All of the above"],
    ["Using args.length property", "Using arguments.length property", "Both of the above.", "None of the above."],
    ["length()", "size()", "index()", "None of the above."],
    ["changeOrder(order)", "order()", "sort()", "None of the above"]
]


var correctAnsArr = ["4", "2", "1", "3"]

var answers = answersArr[0].length

function resetTimer() {
    gameScore = seconds;
    seconds = 0;
}

function clearContent() {
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild)
    }
}



function freshState() {
    //questionnaire index
    index = 0;
    //ensure timer is reset
    resetTimer();
    clearContent();

    //load local highscores into data    
    highScores = [];
    storedHighScores = JSON.parse(localStorage.getItem("scoreInfo"));
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }

    startResetBtn.textContent = "Start";
    startResetBtn.setAttribute("data-function", "start")
    contentDiv.appendChild(h1El)
    questionBox.appendChild(h1El)
    h1El.textContent = "This is a thing I guess, get ready to start."

}

// function countdown() {
//     timeLeft = 120;
//     var timer = setInterval(function () {
//         timerEl.textContent = "Time: " + timeLeft;
//         if (timeLeft <= 0) {
//             clearInterval(timer);
//             timerEl.textContent = "Time: N/A";
//         }
//         timeLeft--;
//     }, 1000);
// }



function timer() {
    var seconds = 120
    timerEl.innerHTML = "time left: " + seconds
 var countdown = setInterval(function timerUpdate() {
    seconds--
    timerEl.innerHTML = "time left: " + seconds
    console.log(seconds)
    if (seconds <= 0) {
        timerEl.innerHTML = "Times up!"
        console.log("game end")
        clearInterval(countdown)
    }
}, 1000)
}


function startResetBtnPress(event) {
    event.stopPropagation()
    var element = event.target
    if (element.matches("#startResetBtn")) {
        if (startResetBtn.textContent == "Start") {
            startResetBtn.textContent = "Reset"
            startResetBtn.setAttribute("data-function", "reset")
            timer()
            quizActual()
        } else {
            clearContent()
            freshState()
        }
    }
}





function chooseAnswer(event) {
    var element = event.target;
    var answerID = element.getAttribute("data-answer-index");
    var buttonType = element.getAttribute("data-function");
    var answerButtons = document.querySelectorAll("[data-function='answer']");
    if (buttonType === "answer") {
        //-1 because of developer choice with how the questions are set up.
        if (answerID == correctAnsArr[index] - 1) {
            element.style.backgroundColor = "#8FBC8F";
            disableButtons(answerButtons);

        }
        else {
            timeLeft -= 10;
            element.style.backgroundColor = "#8B0000";
            disableButtons(answerButtons);
        }
        waitTime(1);
    }
}




function quizActual() {
    clearContent();
    if (index < questionsArr.length) {
        contentDiv.appendChild(h1El);
        h1El.textContent = questionsArr[index];

        //create buttons with all possible answers in the answer array for the specific question
        for (let i = 0; i < answersArr[index].length; i++) {
            var ansEl = document.createElement("div");
            ansEl.classList.add("card")
            contentDiv.appendChild(ansEl);
            var select = document.createElement("button")
            select.textContent = "select"
            ansEl.textContent = answersArr[index][i];
            ansEl.appendChild(select)
            ansEl.setAttribute("data-answer-index", i);
            ansEl.setAttribute("data-function", "answer")

            //give all buttons click event listeners
            var buttonAnswers = document.querySelectorAll("[data-function='answer']");
            for (let i = 0; i < buttonAnswers.length; i++) {
                buttonAnswers[i].addEventListener("click", chooseAnswer);
            }
        }
    } else {
        endGame();
    }
}









question.textContent = questionsArr[index]



// questionBox.appendChild(question)



freshState();
startResetBtn.addEventListener("click", startResetBtnPress);
// highScoreBtn.addEventListener("click", showHighScore);
