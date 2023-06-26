// Global variables

const intro = document.querySelector(".intro-buttons");
const gameBoard = document.getElementById("game-board");
const instructions = document.getElementById("instructions");
const playBtn = document.querySelector(".btn-play");
const instructionBtn = document.querySelector(".btn-instructions");
const closeBtn = document.querySelector(".btn-close");

const cards = [
    'assets/images/flipcard1.png',
    'assets/images/flipcard3.png',
    'assets/images/flipcard4.png',
    'assets/images/flipcard5.png',
    'assets/images/flipcard6.png',
    'assets/images/flipcard7.png',
    'assets/images/flipcard8.png',
];

// Event Listeners

playBtn.addEventListener("click", function () {
    displaySection(gameBoard, true);
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