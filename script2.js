// script2.js
const cells = document.querySelectorAll('td');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const statusElement = document.getElementById("status");

function makeMove(cellIndex) {
    if (gameOver || board[cellIndex] !== "") return;

    board[cellIndex] = currentPlayer;
    document.getElementById(cellIndex).innerText = currentPlayer;

    if (checkWinner()) {
        statusElement.innerText = `player ${currentPlayer} wins!`;
        gameOver = true;
    } else if (board.every(cell => cell !== "")) {
        statusElement.innerText = "It's a tie!";
        gameOver = true;
    } else {
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        if (currentPlayer === "O") {
            aiMove();
        }
    }
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
    
}

function aiMove() {
    if (gameOver) return;

    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === "") acc.push(index);
        return acc;
    }, []);

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellIndex = emptyCells[randomIndex];

    setTimeout(() => makeMove(cellIndex), 500); // Delay AI move for better user experience
}
// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => (cell.textContent = ''));
    status.textContent = '';
  }
  
  // Add event listeners
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
  });
  
  resetButton.addEventListener('click', resetGame);
  resetGame(); // Initialize the game