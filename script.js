const questions = [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], ans: 0 },
    { q: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], ans: 2 },
    { q: "Which is NOT a JavaScript Framework?", options: ["React", "Angular", "Vue", "Django"], ans: 3 },
    { q: "What does `===` mean in JavaScript?", options: ["Assignment", "Equal value only", "Equal value and type", "Not equal"], ans: 2 },
    { q: "How to store data in browser permanently?", options: ["sessionStorage", "localStorage", "cookies only", "variable"], ans: 1 }
];

let current = 0, score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');

document.getElementById('start-btn').onclick = startQuiz;
document.getElementById('next-btn').onclick = () => { current++; showQuestion(); };
document.getElementById('restart-btn').onclick = startQuiz;

function startQuiz() {
    current = 0; score = 0;
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
    // last score chupinchatam - data handling point
    const last = localStorage.getItem('lastQuizScore');
    if(last) document.getElementById('last-score').innerText = `Last Score: ${last}`;
}

function showQuestion() {
    if(current >= questions.length) { showResult(); return; }
    const q = questions[current];
    document.getElementById('question-count').innerText = `Question ${current+1}/${questions.length}`;
    document.getElementById('score-display').innerText = `Score: ${score}`;
    document.getElementById('progress').style.width = `${(current/questions.length)*100}%`;
    questionText.innerText = q.q;
    optionsContainer.innerHTML = '';
    feedback.classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');

    q.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerText = opt;
        div.onclick = () => checkAnswer(i, div);
        optionsContainer.appendChild(div);
    });
}

function checkAnswer(selected, div) {
    const correctIndex = questions[current].ans;
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(o => o.style.pointerEvents = 'none'); // disable after click

    if(selected === correctIndex) {
        div.classList.add('correct');
        feedback.innerText = "Correct! 🎉";
        feedback.className = 'correct';
        score++;
    } else {
        div.classList.add('wrong');
        allOptions[correctIndex].classList.add('correct');
        feedback.innerText = "Wrong! Correct answer highlighted.";
        feedback.className = 'wrong';
    }
    feedback.classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('score-display').innerText = `Score: ${score}`;
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    document.getElementById('final-score').innerText = `Your Score: ${score} / ${questions.length}`;
    document.getElementById('result-message').innerText = score >= 4 ? "Excellent Work!" : score >=2 ? "Good Job, Keep Practicing!" : "Try Again!";
    
    // data handling - store result
    localStorage.setItem('lastQuizScore', `${score}/${questions.length}`);
    localStorage.setItem('quizHistory', JSON.stringify({ score, date: new Date().toLocaleString() }));
}