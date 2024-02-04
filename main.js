const allValueBox = document.querySelectorAll(".value-box");
// console.log("all value boxes ", allValue)  //array list 
const valueDOM = document.querySelectorAll(".value");
const turnMessageDOM = document.querySelector(".turn-message");
const restartDOM = document.querySelector(".restart");

let playerTurn = "0";
let gameOver = false;

function updatePlayerTurn() {
  return playerTurn === "x" ? "0" : "x";
}

function checkWin() {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winConditions.forEach(condition => {
    // console.log("check", valueDOM[condition[0]].innerText, valueDOM[condition[1]].innerText, valueDOM[condition[2]].innerText)
    if ((valueDOM[condition[0]].innerText !== "") && (valueDOM[condition[0]].innerText === valueDOM[condition[1]].innerText) && (valueDOM[condition[1]].innerText === valueDOM[condition[2]].innerText)) {
      turnMessageDOM.innerText = valueDOM[condition[0]].innerText + " won the match."
      // console.log(valueDOM[condition[0]].innerText, 'wooon')
      gameOver = true;
      playerTurn = null // for disable to click 
    }
  });
}

Array.from(allValueBox).forEach(eachBox => {
  let value = eachBox.querySelector(".value");
  eachBox.addEventListener("click", () => {
    if (value.innerText === "") {
      value.innerText = playerTurn;
      if (!gameOver) {
        playerTurn = updatePlayerTurn();
        turnMessageDOM.innerText = "Turn for " + playerTurn;
      }
      checkWin();
      restartGame();
    }
  })
})

function restartGame() {
  restartDOM.addEventListener("click", () => {
    turnMessageDOM.innerText = ""
    Array.from(valueDOM).forEach(value => {
      value.innerText = "";
      // playerTurn = "";
    })
    gameOver = false
  })
}
