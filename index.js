const darkMode = document.getElementById('dark');

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

const grid = document.querySelector('.grid');
const boxes = document.querySelectorAll('.box');
const restartButton = document.getElementById('restart');
const playerDisplay = document.getElementById('Player'); // Player display element

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningPatterns = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Anti-diagonal
];

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(box, index));
});

restartButton.addEventListener('click', restartGame);

function handleBoxClick(box, index) {
    if (!gameActive || gameState[index]) return;

    gameState[index] = currentPlayer;
    box.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        const winningPattern = checkWinner();
        highlightWinningCells(winningPattern);
        playerDisplay.textContent = `Winner: ${currentPlayer}`; // Update winner
    } else if (!gameState.includes(null)) {
        playerDisplay.textContent = "It's a draw!"; // Update draw
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.textContent = `Player: ${currentPlayer}`; // Update next player
    }
}

function checkWinner() {
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return pattern;
        }
    }
    return null;
}

function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = currentPlayer === 'X' ? 'lightblue' : 'lightcoral';
    });
}

function restartGame() {
    gameState.fill(null);
    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = ''; // Reset cell colors
    });
    currentPlayer = 'X';
    gameActive = true;
    playerDisplay.textContent = `Player: ${currentPlayer}`; // Reset player display
}
