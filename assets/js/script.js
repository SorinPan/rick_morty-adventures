// Global variables

const intro = document.querySelector(".intro-buttons");
const gameBoard = document.getElementById("game-board");
const instructions = document.getElementById("instructions");
const gameEnd = document.getElementById("game-end");
const playBtn = document.querySelector(".btn-play");
const instructionBtn = document.querySelector(".btn-instructions");
const closeBtn = document.querySelector(".btn-close");
const restartBtn = document.querySelector(".btn-restart");
const game = document.getElementById("game");
const timer = document.querySelector(".time");

const cards = [
    {
        img: 'assets/images/flipcard1.png',
        name: 'flipcard1',
    },
    {
        img: 'assets/images/flipcard2.png',
        name: 'flipcard2',
    },
    {
        img: 'assets/images/flipcard3.png',
        name: 'flipcard3',
    },
    {
        img: 'assets/images/flipcard4.png',
        name: 'flipcard4',
    },
    {
        img: 'assets/images/flipcard5.png',
        name: 'flipcard5',
    },
    {
        img: 'assets/images/flipcard6.png',
        name: 'flipcard6',
    },
    {
        img: 'assets/images/flipcard7.png',
        name: 'flipcard7',
    },
    {
        img: 'assets/images/flipcard8.png',
        name: 'flipcard8',
    }
];

const cardsList = [...cards, ...cards];

let gameStart = false;
let timeSpan;
let clickedCard = false;
let firstCard, secondCard;
let lockCards = false;
let matchPairs = 0;
let movesCount = 0;

// Event Listeners

playBtn.addEventListener("click", function () {
    const userName = prompt("Enter you name:");
    if (userName) {
        startGame();
    } else {
        alert("Please enter your name to continue.");
    }
});

instructionBtn.addEventListener("click", function () {
    displaySection(instructions, true);
});

closeBtn.addEventListener("click", function () {
    displaySection(instructions, false);
});

restartBtn.addEventListener("click", function () {
    restartGame();
})

function displaySection(section, visible) {
    const style = visible ? 'flex' : 'none';
    section.style.display = style;

    if (visible) {
        intro.style.display = "none";
    } else {
        intro.style.display = "flex";
    }
};

/**
 * Starts the game after the user inputs their name
 */
function startGame() {
    displaySection(gameBoard, true);
    generateCards();
}

/**
 * Shuffles the cards
 * Inspiration taken from https://dev.to/javascriptacademy/creating-a-memory-card-game-with-html-css-and-javascript-57g1
 */
function shuffleCards() {
    let currentList = cardsList.length;

    while (currentList !== 0) {
        const randomList = Math.floor(Math.random() * currentList);
        currentList -= 1;
        [cardsList[currentList], cardsList[randomList]] = [cardsList[randomList], cardsList[currentList]];
    }
}

/**
 * Generates cards
 */
function generateCards() {
    shuffleCards();

    cardsList.forEach((card) => {
        const flipCard = document.createElement("div");
        flipCard.setAttribute("data-name", card.name);
        flipCard.classList.add("card");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        const cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.setAttribute("src", card.img);
        cardFront.appendChild(cardImage);

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        flipCard.appendChild(cardFront);
        flipCard.appendChild(cardBack);
        game.appendChild(flipCard);

        flipCard.addEventListener("click", flipCards);
    })
};

function flipCards() {
    if (lockCards) return;

    if (!gameStart) {
        gameStart = true;
        startTimer();
    }
    this.classList.toggle("flip");

    if (!clickedCard) {
        clickedCard = true;
        firstCard = this;
    } else {
        clickedCard = false;
        secondCard = this;
        lockCards = true;

        checkIfMatch();
    }
}

function startTimer() {
    const timeTotal = 5 * 60;
    let timeRemaining = timeTotal;

    timeSpan = setInterval(function () {
        timeRemaining--;

        if (timeRemaining < 0) {
            stopTimer();
            return;
        }

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timer.textContent = minutes + " : " + seconds;
    }, 1000);
}

/**
 * Checks if the data-name of first and second cards clicked are a match.
 * Inspiration taken from https://dev.to/javascriptacademy/creating-a-memory-card-game-with-html-css-and-javascript-57g1
 */
function checkIfMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        keepCards();
    } else {
        flipBack();
    }

    movesCount++;
    updateCount();
}

/**
 * Flips back the cards if no match is found
 */
function flipBack() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetCards();
    }, 1000);
}

/**
 * Keeps the cards flipped when match is found
 */
function keepCards() {
    firstCard.removeEventListener("click", flipCards);
    secondCard.removeEventListener("click", flipCards);
    resetCards();

    matchPairs++;

    if (matchPairs === cardsList.length / 2) {
        endOfGame();
    }
}

function updateCount() {
    const moves = document.querySelector(".moves");
    const movesMade = document.querySelector(".moves-made");
    moves.textContent = movesCount;
    movesMade.textContent = movesCount;
}

function resetCards() {
    clickedCard = false;
    lockCards = false;
    firstCard = null;
    secondCard = null;
}

function stopTimer() {
    clearInterval(timeSpan);
}

function resetMoves(){
    movesCount = 0;
    updateCount();
}

function endOfGame () {
    stopTimer();
    resetMoves();
    updateCount();
    displaySection(gameBoard, false);
    displaySection(gameEnd, true);

    const timePassed = document.querySelector('.time-passed');
    timePassed.textContent = timer.textContent;

    const restartBtnEndGame = document.getElementById("restart-endgame");
    restartBtnEndGame.addEventListener("click", function () {
        restartGame()
        displaySection(gameEnd, false);
        displaySection(gameBoard, true);
    });
}

function restartGame() {
    resetCards();
    resetMoves();
    stopTimer();
    game.textContent = "";
    timer.textContent = "";
    gameStart = false;
    shuffleCards();
    generateCards();
}