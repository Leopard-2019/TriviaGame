//Declaration of variable #1
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const aChoice = document.getElementById("a");
const bChoice = document.getElementById("b");
const cChoice = document.getElementById("c");
const dChoice = document.getElementById("d");
const counter = document.getElementById("counter");

// object arrays composed by seven questio about MLB questions
// there was not time to include the figures/videos related to the answers
// my apologies for that

let myQuestion = [
    {
        question: 'Who was the first Major League player to pitch a ball over 100 mph?',
        a: 'Roger Clemens',
        b: 'Nolan Ryan',
        c: 'Tom Seaver',
        d: 'Dwight Gooden',
        correctAnswer: 'b',
    }, {
        question: 'How many balls are used during a typical game?',
        a: '80',
        b: '90',
        c: '100',
        d: '70',
        correctAnswer: 'c',
    }, {
        question: 'What MLB player holds the record for most consecutive games with a strikeout?',
        a: 'Reggie Jackson',
        b: 'Aaron Judge',
        c: 'Chili Davis',
        d: 'Babe Ruth',
        correctAnswer: 'b',
    }, {
        question: 'What player holds the record for most hits in a season?',
        a: 'Lefty O’Doul',
        b: 'Darin Erstad',
        c: 'Ichiro Suzuki',
        d: 'George Sisler',
        correctAnswer: 'c',
    }, {
        question: 'What player has the longest hitting streak?',
        a: 'Joe DiMaggio',
        b: 'George Sisler',
        c: 'Pete Rose',
        d: 'Ty Cobb',
        correctAnswer: 'a',
    }, {
        question: 'Who was the first player to reach 50 doubles and 50 home runs in the same season ?',
        a: 'Alex Rodriguez',
        b: 'Mark McGwire',
        c: 'Babe Ruth',
        d: 'Albert Belle',
        correctAnswer: 'd',
    }, {
        question: 'From where the game baseball has originated at the beginning?',
        a: 'England',
        b: 'United States',
        c: 'Mexico',
        d: 'Canada',
        correctAnswer: 'a',
    }
];

//Declaration of variable #2
const lastQuestionIndex = myQuestion.length - 1;
let runningQuestionIndex = 0;
let count = 0;
const questionTime = 15; // 15s
let CLOCK;
let score = 0;
let uscore = 0;

//function that creates the question and choices
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

// create the button that trigger the function "startQuiz" when click the button start
start.addEventListener("click", startQuiz);

// function startQuiz that represent the engine containing the functions that make the program works
function startQuiz() {
    start.style.display = "none";
    sendQuestion();
    quiz.style.display = 'block';
    counterTrivia();
    CLOCK = setInterval(counterTrivia, 1000);
}

/* function that control if the counter has reached the question time set for every question
 the question time has been set to 15 s for every question
this function also checks (with the first else)  if the 15 sec has been reached, without clicking any choice anwers,
if so, it will trigger the function answers wrong, then will invoke the function "sendQuestion" to
display another question (with the if contained in this else).*/

function counterTrivia() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        quiz.style.display = 'block';
        document.getElementById("qq").textContent = '';
        document.getElementById("qq1").textContent = '';
        document.getElementById("qq2").textContent = '';
        count++;
    }
    else {
        count = 0;
        answerWrong();
        if (runningQuestionIndex < lastQuestionIndex) {
            runningQuestionIndex++;
            sendQuestion();
        }
        else {
            clearInterval(CLOCK);
            quiz.style.display = 'none';
        }
    }
}

/*this function check if the answer given by the player has been matched the correct answer
if the answer given is wrong (the first else), it will trigger the function wrong.
if the counter is equal to 0, and the iterator running QuestionIndex is not equal to the
last question. then the sendQuestion is invoked to go for another question, otherwise
the game finish*/
function checkAnswer(answer) {
    if (answer === myQuestion[runningQuestionIndex].correctAnswer) {
        score++;
        answerCorrect();
    }
    else {
        answerWrong();
    }
    count = 0;
    if (runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;
        sendQuestion();
    }
    else {
        clearInterval(CLOCK);
    }

}
/* function that display the answer is correct, also display the numbers of question that has been correctly guessed, 
 the other way around as well*/

function answerCorrect() {
    quiz.style.display = 'none';
    document.getElementById("qq3").style = 'block';
    document.getElementById("qq").textContent = "The Answer is Correct!";
    document.getElementById("qq1").textContent = "Correct Answers:" + score;
    document.getElementById("qq2").textContent = "InCorrect Answers:" + uscore;
}

/* function that display the answer is incorrect, also display the numbers of question that has been correctly guessed, and
 the other way around as well*/
function answerWrong() {
    quiz.style.display = 'none';
    document.getElementById("qq3").style = 'block';
    uscore += 1;
    document.getElementById("qq").textContent = "The Answer is not Correct!";
    document.getElementById("qq1").textContent = "Correct Answers:" + score;
    document.getElementById("qq2").textContent = "InCorrect Answers:" + uscore;
}