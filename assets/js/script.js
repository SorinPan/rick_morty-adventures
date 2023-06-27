// Global variables

const intro = document.querySelector(".intro-buttons");
const gameBoard = document.getElementById("game-board");
const instructions = document.getElementById("instructions");
const playBtn = document.querySelector(".btn-play");
const instructionBtn = document.querySelector(".btn-instructions");
const closeBtn = document.querySelector(".btn-close");
const game = document.getElementById("game");
const timer = document.querySelector("time");

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
let minutes = 0;
let seconds = 0;
let timeSpan;

// Event Listeners

playBtn.addEventListener("click", function () {
    displaySection(gameBoard, true);
    generateCards();
});
instructionBtn.addEventListener("click", function () {
    displaySection(instructions, true);
});
closeBtn.addEventListener("click", function () {
    displaySection(instructions, false);
});

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
    if (!gameStart) {
        gameStart = true;
        startTimer();
    }
    this.classList.toggle("flip");
}

function startTimer() {
    timeSpan = setInterval(function () {
        seconds++;

        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timer.textContent = "Time " + minutes + " : " + seconds;
    }, 1000);
}