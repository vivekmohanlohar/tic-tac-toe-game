const board = document.getElementById('board');
const message = document.getElementById('message');
const popup = document.getElementById('popup');
const winnerName = document.getElementById('winnerName');
const cells = document.querySelectorAll('.cell');
const winnerIcon = document.getElementById('winnerIcon');
let currentPlayer = '😄';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

board.addEventListener('click', handleCellClick);

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = clickedCell.dataset.index;
  playSound('o_turn');

  if (gameBoard[cellIndex] === '' && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    playSound(currentPlayer);

    if (checkWinner()) {
      winnerIcon.innerHTML = `<img src="raju.gif" alt="raju">`;
      winnerName.textContent = `Player ${currentPlayer} wins!`;
      popup.style.display = 'flex';
      playSound('win');
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
      winnerIcon.innerHTML = '<img src="shyam.gif" alt="shyam">'
      winnerName.textContent = "It's a draw!";
      popup.style.display = 'flex';
      gameActive = false;
      playSound('draw');
    } else {
      currentPlayer = currentPlayer === '😄' ? '😛' : '😄';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function playSound(type) {
  const sound = new Audio(`${type}_sound.mp3`);
  sound.play();
}

function checkWinner() {
  const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = '😄';
  gameActive = true;
  message.textContent = 'Player 😄\'s turn';

  cells.forEach(cell => {
    cell.textContent = '';
  });

  popup.style.display = 'none';
}