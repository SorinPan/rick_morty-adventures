// Global variables

const intro = document.getElementById("intro");
const instructions = document.getElementById("instructions");
const instructionBtn = document.getElementById("btn-instructions");
const closeBtn = document.getElementById("btn-close");

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