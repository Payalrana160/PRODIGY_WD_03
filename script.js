// script2.js
const cells = document.querySelectorAll('td');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
// Initialize variables for the game
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Function to handle a player's move
function makeMove(index) {
  if (!gameOver && gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    document.getElementById(index).innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check for a winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      document.getElementById('status').innerText = `Player ${gameBoard[a]} wins!`;
      gameOver = true;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    document.getElementById('status').innerText = "It's a tie!";
    gameOver = true;
  }
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




