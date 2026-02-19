// =====================================
// Score Variables
// =====================================
let userScore = 0;
let computerScore = 0;

// Selecting Elements from DOM
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const computerScorePara = document.querySelector("#computer-score");
const resetBtn = document.querySelector("#reset-btn");

// =====================================
// Sound Effects
// =====================================
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");
const drawSound = new Audio("draw.mp3");

// =====================================
// Generate Random Computer Choice
// =====================================
const genCompchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// =====================================
// Fade Animation Helper
// =====================================
const triggerFade = () => {
    msg.classList.add("fade");
    setTimeout(() => {
        msg.classList.remove("fade");
    }, 400);
};

// =====================================
// Handle Draw
// =====================================
const drawGame = () => {
    msg.innerText = "It's a Draw! 🤝";
    msg.style.backgroundColor = "#facc15";
    drawSound.play();
    triggerFade();
};

// =====================================
// Show Winner & Update Score
// =====================================
const showWinner = (userWin, userChoice, computerChoice) => {

    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;

        msg.innerText = `You Win! 🎉 ${userChoice} beats ${computerChoice}`;
        msg.style.backgroundColor = "#16a34a";
        winSound.play();

    } else {
        computerScore++;
        computerScorePara.innerText = computerScore;

        msg.innerText = `You Lose! 😢 ${computerChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "#dc2626";
        loseSound.play();
    }

    triggerFade();
};

// =====================================
// Main Game Logic
// =====================================
const playGame = (userChoice) => {

    const computerChoice = genCompchoice();

    if (userChoice === computerChoice) {
        drawGame();
    } else {

        let userWin = true;

        if (userChoice === "rock") {
            userWin = computerChoice === "paper" ? false : true;

        } else if (userChoice === "paper") {
            userWin = computerChoice === "scissors" ? false : true;

        } else if (userChoice === "scissors") {
            userWin = computerChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, computerChoice);
    }
};

// =====================================
// Add Click Event Listeners
// =====================================
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// =====================================
// Reset Game Functionality
// =====================================
resetBtn.addEventListener("click", () => {

    userScore = 0;
    computerScore = 0;

    userScorePara.innerText = 0;
    computerScorePara.innerText = 0;

    msg.innerText = "Game Reset! Play Again 🚀";
    msg.style.backgroundColor = "#2d2a4a";

    triggerFade();
});
