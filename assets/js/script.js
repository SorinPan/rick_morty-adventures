// Global variables

const intro = document.querySelector(".intro-buttons");
const gameBoard = document.getElementById("game-board");
const instructions = document.getElementById("instructions");
const playBtn = document.querySelector(".btn-play");
const instructionBtn = document.querySelector(".btn-instructions");
const closeBtn = document.querySelector(".btn-close");
const game = document.getElementById("game");

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
 * Generates cards
 */
function generateCards() {
    cardsList.forEach((card) => {
        const flipCard = document.createElement("img");
        flipCard.setAttribute("src", card.img);
        flipCard.setAttribute("data-name", card.name);
        flipCard.classList.add("card");
        game.appendChild(flipCard);
    })
};