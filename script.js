const quizData = [
    { question: "What is the capital of France?", a: "Berlin", b: "Madrid", c: "Paris", d: "Lisbon", correct: "c" },
    { question: "Who is the CEO of Tesla?", a: "Jeff Bezos", b: "Elon Musk", c: "Bill Gates", d: "Tony Stark", correct: "b" },
    { question: "Which language runs in a web browser?", a: "Java", b: "C", c: "Python", d: "JavaScript", correct: "d" },
    { question: "What does CSS stand for?", a: "Central Style Sheets", b: "Cascading Style Sheets", c: "Cascading Simple Sheets", d: "Cars SUVs Sailboats", correct: "b" },
    { question: "What year was JavaScript launched?", a: "1996", b: "1995", c: "1994", d: "none of the above", correct: "b" },
    { question: "Which company developed the iPhone?", a: "Apple", b: "Samsung", c: "Google", d: "Microsoft", correct: "a" },
    { question: "What does HTML stand for?", a: "Hyper Text Markup Language", b: "Home Tool Markup Language", c: "Hyperlinks and Text Markup Language", d: "None of the above", correct: "a" },
    { question: "Which of the following is a JavaScript framework?", a: "React", b: "Laravel", c: "Django", d: "Ruby on Rails", correct: "a" },
    { question: "What is the square root of 64?", a: "6", b: "7", c: "8", d: "9", correct: "c" },
    { question: "What is the boiling point of water?", a: "90°C", b: "100°C", c: "110°C", d: "120°C", correct: "b" }
];

const quiz = document.getElementById('quiz');
const quizForm = document.getElementById('quiz-form');
const timeEl = document.getElementById('time');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const submitBtn = document.getElementById('submit');

let currentPage = 0;
let score = 0;
let timeLeft = 60;
const questionsPerPage = 4; // Adjusted to 4 questions per page

displayQuestions();
startTimer();

function displayQuestions() {
    const quizOptions = document.getElementById('quiz-options');
    quizOptions.innerHTML = ""; // Clear previous questions
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;

    quizData.slice(start, end).forEach((data, index) => {
        const questionEl = document.createElement('li');
        questionEl.innerHTML = `
            <h3>${data.question}</h3>
            <label><input type="radio" name="question${start + index}" value="a" class="answer"> ${data.a}</label><br>
            <label><input type="radio" name="question${start + index}" value="b" class="answer"> ${data.b}</label><br>
            <label><input type="radio" name="question${start + index}" value="c" class="answer"> ${data.c}</label><br>
            <label><input type="radio" name="question${start + index}" value="d" class="answer"> ${data.d}</label><br>
        `;
        quizOptions.appendChild(questionEl);
    });

    // Show or hide buttons based on the current page
    prevBtn.style.display = currentPage > 0 ? "inline-block" : "none";
    nextBtn.style.display = end >= quizData.length ? "none" : "inline-block";
    submitBtn.style.display = end >= quizData.length ? "inline-block" : "none";
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timeEl.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

nextBtn.addEventListener('click', () => {
    collectAnswers();
    currentPage++;
    displayQuestions();
});

prevBtn.addEventListener('click', () => {
    collectAnswers();
    currentPage--;
    displayQuestions();
});

quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    collectAnswers();
    showResults();
});

function collectAnswers() {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;

    quizData.slice(start, end).forEach((data, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${start + index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === data.correct) {
            score++;
        }
    });
}

function showResults() {
    let qualificationMessage = score >= 7 ? "Congratulations! You are qualified." : "Sorry, you did not qualify.";
    quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <h3>${qualificationMessage}</h3>
        <button onclick="location.reload()">Reload</button>
    `;
}
