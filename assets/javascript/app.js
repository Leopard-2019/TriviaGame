const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const aChoice = document.getElementById("a");
const bChoice = document.getElementById("b");
const cChoice = document.getElementById("c");
const dChoice = document.getElementById("d");
const counter = document.getElementById("counter");


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

const lastQuestionIndex = myQuestion.length - 1;
let runningQuestionIndex = 0;
let count = 0;
const questionTime = 15; // 15s
let CLOCK;
let score = 0;
let uscore = 0;


function sendQuestion() {
    let q = myQuestion[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    aChoice.innerHTML = q.a;
    bChoice.innerHTML = q.b;
    cChoice.innerHTML = q.c;
    dChoice.innerHTML = q.d;
};

start.addEventListener("click", startQuiz);

function startQuiz() {
    start.style.display = "none";
    sendQuestion();
    quiz.style.display = 'block';
    counterTrivia();
    CLOCK = setInterval(counterTrivia, 1000);
}


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

function answerCorrect() {
    quiz.style.display = 'none';
    document.getElementById("qq3").style = 'block';
    document.getElementById("qq").textContent = "The Answer is Correct!";
    document.getElementById("qq1").textContent = "Correct Answers:" + score;
    document.getElementById("qq2").textContent = "InCorrect Answers:" + uscore;
}
function answerWrong() {
    quiz.style.display = 'none';
    document.getElementById("qq3").style = 'block';
    uscore += 1;
    document.getElementById("qq").textContent = "The Answer is not Correct!";
    document.getElementById("qq1").textContent = "Correct Answers:" + score;
    document.getElementById("qq2").textContent = "InCorrect Answers:" + uscore;
}