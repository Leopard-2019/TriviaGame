//Declaration of variables #1
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const aChoice = document.getElementById("a");
const bChoice = document.getElementById("b");
const cChoice = document.getElementById("c");
const dChoice = document.getElementById("d");
const counter = document.getElementById("counter");
const reset = document.getElementById("reset");
const reset2 = document.getElementById("ipp1");


// object arrays composed by seven major league baseball questions

let myQuestion = [
    {
        question: 'Who was the first Major League player to pitch a ball over 100 mph?',
        a: 'Roger Clemens',
        b: 'Nolan Ryan',
        c: 'Tom Seaver',
        d: 'Dwight Gooden',
        correctAnswer: 'b',
        imgSrc: "https://www.youtube.com/embed/tPgR4d5NyXg" 
    }, {
        question: 'How many balls are used during a typical game?',
        a: '80',
        b: '90',
        c: '100',
        d: '70',
        correctAnswer: 'c',
        imgSrc: "https://www.youtube.com/embed/waUqKwXk7t4" 
    }, {
        question: 'What MLB player holds the record for most consecutive games with a strikeout?',
        a: 'Reggie Jackson',
        b: 'Aaron Judge',
        c: 'Chili Davis',
        d: 'Babe Ruth',
        correctAnswer: 'b',
        imgSrc: "https://www.youtube.com/embed/uuR9h3rJCcE" 
    }, {
        question: 'What player holds the record for most hits in a season?',
        a: 'Lefty O’Doul',
        b: 'Darin Erstad',
        c: 'Ichiro Suzuki',
        d: 'George Sisler',
        correctAnswer: 'c',
        imgSrc: "https://www.youtube.com/embed/HL-XjMCPfio" 
    }, {
        question: 'What player has the longest hitting streak?',
        a: 'Joe DiMaggio',
        b: 'George Sisler',
        c: 'Pete Rose',
        d: 'Ty Cobb',
        correctAnswer: 'a',
        imgSrc: "https://www.youtube.com/embed/exJPClJRX78" 
    }, {
        question: 'Who was the first player to reach 50 doubles and 50 home runs in the same season ?',
        a: 'Alex Rodriguez',
        b: 'Mark McGwire',
        c: 'Babe Ruth',
        d: 'Albert Belle',
        correctAnswer: 'd',
        imgSrc: "https://www.youtube.com/embed/hP1t2HEawm8" 
    }, {
        question: 'From where the game baseball has originated at the beginning?',
        a: 'England',
        b: 'United States',
        c: 'Mexico',
        d: 'Canada',
        correctAnswer: 'a',
        imgSrc: "https://www.youtube.com/embed/q5nnWihSeN8" 
    }
];

//Declaration of variables #2
const lastQuestionIndex = myQuestion.length - 1;
let runningQuestionIndex = 0;
let count = 0;
// the question time is set to 15s for every question
const questionTime = 15; // 15s
let CLOCK;
let score = 0;
let uscore = 0;
reset.style.display = "none";

//function that creates the display of question and choices
// this function will be invoked for every question until 
// the runningQuestionIndex is equal to the index of the last question.
function sendQuestion() {
    let q = myQuestion[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    aChoice.innerHTML = q.a;
    bChoice.innerHTML = q.b;
    cChoice.innerHTML = q.c;
    dChoice.innerHTML = q.d;
};

// creates the button that trigger the function "startQuiz" when click the button start
start.addEventListener("click", startQuiz);

// function startQuiz that represents the engine containing the functions that make the program works
// the setinterval is set to 2000 ms, i.e. 2 s

function startQuiz() {
    start.style.display = "none";
    sendQuestion();
    quiz.style.display = 'block';
    counterTrivia();
    CLOCK = setInterval(counterTrivia, 1000);
}

/* function that controls if the counter has reached the question time set for every question
 the question time has been set to 15s for every question
this function also checks (with the first else)  if the 15 sec has been reached, without selecting any choice anwer,
if so, it will trigger the function answersWrong, then will invoke the function "sendQuestion" to
display another question (with the if contained in this else).*/

function counterTrivia() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        quiz.style.display = 'block';
        document.getElementById("qq3").style = ''
        document.getElementById("qq").textContent = '';
        document.getElementById("qq1").textContent = '';
        document.getElementById("qq2").textContent = '';
        document.getElementById("myVideo").src = '';
        reset2.style.display = 'none';
        count++;
    }
    else {
        clearInterval(CLOCK);
        answerWrong();
        if (runningQuestionIndex < lastQuestionIndex) {
            runningQuestionIndex++;

        sendQuestion();
        }
        else {
            clearInterval(CLOCK);
        }
    }
}

/*this function checks if the answer given by the player  matchs the correct answer
if the answer given is wrong (the first else), it will trigger the function answerWrong.
if the counter is equal to 0, and the iterator running QuestionIndex is not equal to the
lastquestionindex. then the sendQuestion function is invoked to go to the next question, otherwise
the game is over*/
function checkAnswer(answer) {
    if (answer === myQuestion[runningQuestionIndex].correctAnswer) {
        score++;
        clearInterval(CLOCK);
        answerCorrect();
    }
    else {
        clearInterval(CLOCK);
        answerWrong();
    }


    if (runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;

        sendQuestion();

    }
    else {
        clearInterval(CLOCK);
        reset.style.display = "block";
        reset.addEventListener("click", rReset);

    }

}
/* function that display when the answer is correct, also display the numbers of questions that has been correctly guessed, 
 the other way around as well, and the movie associated with the correct answer*/

function answerCorrect() {
    quiz.style.display = 'none';
    document.getElementById("qq3").style = 'block';
    reset2.style.display = 'block';
    reset2.addEventListener("click", conT);
    document.getElementById("qq").textContent = "The Answer is Correct!";
    document.getElementById("qq1").textContent = "Correct Answers:" + score;
    document.getElementById("qq2").textContent = "InCorrect Answers:" + uscore;
    document.getElementById("myVideo").src = myQuestion[runningQuestionIndex].imgSrc;
}

/* function that display when the answer is incorrect, also display the numbers of question that has been correctly guessed, and
 the other way around as well, and the movie associated with the correct answer*/
function answerWrong() {
    quiz.style.display = 'none';
    document.getElementById("qq3").style = 'block';
    reset2.style.display = 'block';
    reset2.addEventListener("click", conT);
    uscore += 1;
    document.getElementById("qq").textContent = "The Answer is not Correct!";
    document.getElementById("qq1").textContent = "Correct Answers:" + score;
    document.getElementById("qq2").textContent = "InCorrect Answers:" + uscore;
    document.getElementById("myVideo").src = myQuestion[runningQuestionIndex].imgSrc;
}

function rReset(){
    window.location.reload(false);
}

function conT(){
    count=0;
    CLOCK = setInterval(counterTrivia, 1000);
}


