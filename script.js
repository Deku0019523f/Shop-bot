const quizData = [
    {
        question: "Quel est le protagoniste principal de 'Naruto'?",
        options: ["Sasuke", "Naruto", "Kakashi", "Jiraiya"],
        answer: "Naruto"
    },
    {
        question: "Dans 'Death Note', quel est le nom du shinigami?",
        options: ["L", "Ryuk", "Light", "Misa"],
        answer: "Ryuk"
    },
    {
        question: "Dans 'One Piece', qui est le capitaine de l’équipage au chapeau de paille ?",
        options: ["Zoro", "Luffy", "Sanji", "Ace"],
        answer: "Luffy"
    },
    {
        question: "Dans 'Attack on Titan', qui possède le Titan Assaillant ?",
        options: ["Eren", "Levi", "Armin", "Jean"],
        answer: "Eren"
    },
    {
        question: "Dans 'Demon Slayer', quel est le nom de famille de Tanjiro ?",
        options: ["Tomioka", "Kamado", "Hashibira", "Urokodaki"],
        answer: "Kamado"
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.querySelector('.manga-container').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const progressElement = document.getElementById('progress');

    const current = quizData[currentQuestion];
    questionElement.textContent = current.question;
    optionsElement.innerHTML = '';

    current.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('quiz-option');
        button.onclick = () => selectOption(button, option);
        optionsElement.appendChild(button);
    });

    progressElement.style.width = `${(currentQuestion / quizData.length) * 100}%`;
}

function selectOption(buttonClicked, selected) {
    const optionsButtons = document.querySelectorAll('.quiz-option');
    const correctAnswer = quizData[currentQuestion].answer;

    optionsButtons.forEach(btn => btn.disabled = true);

    if (selected === correctAnswer) {
        buttonClicked.style.backgroundColor = "#2ecc71"; // vert
        buttonClicked.style.color = "#fff";
        score++;
    } else {
        buttonClicked.style.backgroundColor = "#e74c3c"; // rouge
        buttonClicked.style.color = "#fff";

        optionsButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.style.backgroundColor = "#2ecc71";
                btn.style.color = "#fff";
            }
        });
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    let imagePath = "";
    const ratio = score / quizData.length;

    if (ratio === 1) {
        imagePath = "images/perfect.png";
    } else if (ratio >= 0.6) {
        imagePath = "images/good.png";
    } else {
        imagePath = "images/fail.png";
    }

    const quizContainer = document.querySelector('.manga-container');
    quizContainer.innerHTML = `
        <h1>Résultats du Quiz</h1>
        <div class="manga-result">
            <p>Votre score : ${score}/${quizData.length}</p>
            <img src="${imagePath}" alt="Résultat">
            <button onclick="location.reload()">Recommencer</button>
        </div>
    `;
}

window.onload = () => {
    document.querySelector('.manga-container').style.display = 'none';
};
