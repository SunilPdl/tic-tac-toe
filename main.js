const allValueBox = document.querySelectorAll(".value-box");
const valueDOM = document.querySelectorAll(".value");
const turnMessageDOM = document.querySelector(".turn-message");
const restartDOM = document.querySelector(".restart");
const lineDOM = document.querySelector(".line");

let playerTurn = "x";
let gameOver = false;
let playerClickValue = 0;

function updatePlayerTurn() {
  return playerTurn === "x" ? "0" : "x";
}

function checkWin() {
  let winConditions = [
    [0, 1, 2, 33, 4, 0],
    [3, 4, 5, 93, 4, 0],//top left rotate
    [6, 7, 8, 158, 4, 0],
    [0, 3, 6, 92, -59, 90],
    [1, 4, 7, 92, 3, 90],
    [2, 5, 8, 92, 66, 90],
    [0, 4, 8, 91, 3, 45],
    [2, 4, 6, 94, 3, -45],
  ];

  winConditions.forEach(condition => {
    if ((valueDOM[condition[0]].innerText !== "") && (valueDOM[condition[0]].innerText === valueDOM[condition[1]].innerText) && (valueDOM[condition[1]].innerText === valueDOM[condition[2]].innerText)) {
      turnMessageDOM.innerText = valueDOM[condition[0]].innerText + " won"
      console.log(condition[3], condition[4], condition[5])
      lineDOM.style.width = "180px";
      lineDOM.style.height = "2px";
      lineDOM.style.top = `${condition[3]}px`;
      lineDOM.style.left = `${condition[4]}px`;
      lineDOM.style.transform = `rotate(${condition[5]}deg)`;
      lineDOM.style.opacity = 1;
      gameOver = true;
    }
  });
}

function startGame() {
  Array.from(allValueBox).forEach(eachBox => {
    let value = eachBox.querySelector(".value");
    eachBox.addEventListener("click", () => {
      if (value.innerText === "" && !gameOver) {
        value.innerText = playerTurn;
        playerTurn = updatePlayerTurn();
        turnMessageDOM.innerText = "Turn for " + playerTurn;
        playerClickValue += 1;
        if (playerClickValue > 8 && gameOver !== true) {
          turnMessageDOM.innerText = "Draw the match"
          playerClickValue = 0;
        }
        checkWin();
      }
    })
  })
}
startGame();


restartDOM.addEventListener("click", () => {
  turnMessageDOM.innerText = ""
  Array.from(valueDOM).forEach(value => {
    value.innerText = "";
    playerTurn = updatePlayerTurn();
  })
  lineDOM.style.opacity = 0;
  playerClickValue = 0;
  gameOver = false
})

