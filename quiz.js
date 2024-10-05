const questions = [
    {
        question: "What is the primary difference between DC and AC motors?",
        choices: ["A. Voltage", "B. Current", "C. Type of current", "D. Speed"],
        correct: "C"
    },
    {
        question: "What controls the speed of a DC motor?",
        choices: ["A. Voltage", "B. Resistance", "C. Power", "D. Frequency"],
        correct: "A"
    },
    {
        question: "In which type of motor is speed controlled by the frequency?",
        choices: ["A. DC Motor", "B. AC Motor", "C. Both", "D. Neither"],
        correct: "B"
    },
    {
        question: "What happens to the speed of a DC motor when voltage increases?",
        choices: ["A. Increases", "B. Decreases", "C. Remains the same", "D. Stops"],
        correct: "A"
    },
    {
        question: "What is the advantage of using an AC motor?",
        choices: ["A. Precise speed control", "B. Higher efficiency at high speeds", "C. Simpler control circuitry", "D. Requires less maintenance"],
        correct: "B"
    },
    {
        question: "In which application would you most likely use a DC motor?",
        choices: ["A. Washing machines", "B. Electric vehicles", "C. Industrial fans", "D. Ceiling fans"],
        correct: "B"
    },
    {
        question: "What is one key advantage of DC motors?",
        choices: ["A. Lower cost", "B. Requires less maintenance", "C. High torque at low speeds", "D. Runs on AC power"],
        correct: "C"
    },
    {
        question: "Which component is responsible for converting AC to DC in DC motors?",
        choices: ["A. Capacitor", "B. Transformer", "C. Commutator", "D. Rotor"],
        correct: "C"
    },
    {
        question: "Why are AC motors preferred for industrial applications?",
        choices: ["A. Higher starting torque", "B. Lower initial cost", "C. Constant speed operation", "D. Runs on DC power"],
        correct: "C"
    },
    {
        question: "How is the direction of a DC motor's rotation typically controlled?",
        choices: ["A. By changing the voltage", "B. By reversing the current flow", "C. By adjusting the frequency", "D. By altering the resistance"],
        correct: "B"
    },
    {
        question: "Which type of motor is typically more efficient at converting electrical energy into mechanical energy?",
        choices: ["A. DC Motor", "B. AC Motor", "C. Both equally", "D. Neither"],
        correct: "B"
    },
    {
        question: "What is a common application for an AC induction motor?",
        choices: ["A. Solar panels", "B. Conveyors", "C. Portable fans", "D. Stepper motors"],
        correct: "B"
    },
    {
        question: "What type of current is supplied to an AC motor?",
        choices: ["A. Direct current", "B. Pulsating DC", "C. Alternating current", "D. Constant voltage"],
        correct: "C"
    },
    {
        question: "What happens to the torque of a DC motor if the current increases?",
        choices: ["A. Torque increases", "B. Torque decreases", "C. Torque remains the same", "D. Motor stops"],
        correct: "A"
    },
    {
        question: "Which motor is generally preferred for high-precision applications such as robotics?",
        choices: ["A. Universal Motor", "B. Stepper Motor", "C. AC Motor", "D. DC Motor"],
        correct: "D"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let isAnswerSelected = false;
let score = 0;

function showQuestion(index) {
    const questionData = questions[index];
    document.getElementById('question').innerText = questionData.question;
    document.getElementById('options').innerHTML = questionData.choices.map((choice, i) =>
        `<button class="choice-button" onclick="selectAnswer('${String.fromCharCode(65 + i)}')">${choice}</button>`
    ).join('');
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('prevButton').style.display = index > 0 ? 'inline-block' : 'none';
    document.getElementById('nextButton').style.display = isAnswerSelected && index < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('seeAnswersButton').style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
        document.getElementById('feedback').innerHTML = '<span class="correct">Correct!</span>';
        score++;
    } else {
        document.getElementById('feedback').innerHTML = '<span class="incorrect">Incorrect.</span>';
    }
    userAnswers[currentQuestionIndex] = answer;
    isAnswerSelected = true;
    document.getElementById('nextButton').style.display = 'inline-block';
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        isAnswerSelected = false;
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showCorrectAnswers() {
    const answersHtml = questions.map((question, index) => 
        `<div><p><strong>Question ${index + 1}:</strong> ${question.correct}</p></div>`
    ).join('');
    document.getElementById('question').innerHTML = `<p><strong>Your Score: ${score} / ${questions.length}</strong></p>`;
    document.getElementById('options').innerHTML = '';
    document.getElementById('feedback').innerHTML = answersHtml;
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('prevButton').style.display = 'none';
    document.getElementById('seeAnswersButton').style.display = 'none';
}

function goBack() {
    window.history.back();
}

showQuestion(currentQuestionIndex);
