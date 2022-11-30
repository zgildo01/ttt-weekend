const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const startBtn = document.querySelector("#startBtn")

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;


restartBtn.addEventListener("click", restartGame);
startBtn.addEventListener("click", initializeGame)



function initializeGame(){
  startBtn.setAttribute("style", "display: none")
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked(){
  const cellIndex = this.getAttribute("cellIndex");
  if(options[cellIndex] != "" || !running){
      return;
    }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if(cellA == "" || cellB == "" || cellC == ""){
          continue;
        }
      if(cellA == cellB && cellB == cellC){
          roundWon = true;
          break;
        }
    }

    if(roundWon){
      statusText.textContent = `${currentPlayer} wins!`;
      running = false;
      restartBtn.setAttribute("style", "display: initial")
    }
    else if(!options.includes("")){
      statusText.textContent = `Draw!`;
      running = false;
    }
    else{
      changePlayer();
    }
}

function restartGame(){
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}