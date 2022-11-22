/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.boardSq');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset-button');
const startBtnEl = document.querySelector("#start-button");

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square) {
  square.addEventListener('click', handleClick)
});
startBtnEl.addEventListener('click', init);
resetBtnEl.addEventListener('click', reset);

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;

  resetBtnEl.removeAttribute("hidden");
  startBtnEl.style.display = "none";
  render();
}

function reset() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;

  resetBtnEl.style.display = "none";
  startBtnEl.style.display = "initial";
  render();
}

function render() {
  board.forEach(function(element, idx) {
    const currentSquare = squareEls[idx];

  if(element === 1) {
    currentSquare.textContent = 'X';
  } else if(element === -1) {
    currentSquare.textContent = 'O';
  } else if(element === null) {
    currentSquare.textContent = '';
  }
  })

  if(!winner) {
    messageEl.textContent = "Currently: " + player() + "'s turn!"
  } else if (winner === 'T') {
    messageEl.textContent = `Players have tied!`;
  } else {
    messageEl.textContent = "Congratulations, Player " + player() + " has won!"
  }

  getWinner();
}

function handleClick(evt) {
  let sqIdx = parseInt(evt.target.id.replace('sq', ''))
  turn *= -1;
  board[sqIdx] = turn;
  winner = getWinner();
  render();
}

function player() {
  let playerName;
  if (turn === 1) {
    playerName = 'Player O';
  } else if(turn === -1) {
    playerName = 'Player X';
  }
  return playerName;
}

function getWinner() {
  for(let i = 0; i < winningCombos.length; i++) {
    let sum = board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]];

    if (Math.abs(sum) === 3) return board[winningCombos[i][0]];
  }

  if(!board.includes(null)) {
    return 'T';
  } else {
    return;
  }
}