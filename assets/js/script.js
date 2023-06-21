// Global variables

const intro = document.getElementById("intro");
const instructions = document.getElementById("instructions");
const instructionBtn = document.getElementById("btn-instructions");
const closeBtn = document.getElementById("btn-close");

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

instructionBtn.addEventListener("click", getInstructions);
closeBtn.addEventListener("click", hideInstructions);

function getInstructions() {
    instructions.style.display = "flex";
    intro.style.display = "none";
}

function hideInstructions() {
    instructions.style.display = "none";
    intro.style.display = "flex";
}