"use strict";
const cells = document.querySelectorAll(".cell");

// ===================================================================
// iife to build the game board once and only once bro
// ===================================================================
const gameBoard = (function () {
  const arrayBoard = [];
  for (let i = 0; i < 9; i++) arrayBoard[i] = i;
  return { arrayBoard };
})();
// ===================================================================
// factory function to build players
// ===================================================================
const Player = function (name) {
  const getName = () => {
    return name;
  };
  return {
    getName,
  };
};
// ===================================================================
// Function to check winner
// ===================================================================
const checkWinner = function (arr) {
  for (let i = 0; i < 3; i++) {
    if (
      (arr[i] === arr[i + 1] && arr[i] === arr[i + 2]) ||
      (arr[i] === arr[i + 3] && arr[i] === arr[i + 6]) ||
      (arr[0] === arr[4] && arr[0] === arr[8]) ||
      (arr[2] === arr[4] && arr[2] === arr[6])
    ) {
      console.log("Win");
    }
  }
};
// ===================================================================
// iife to build the game controller once and only once bro
// ===================================================================
const gameController = (function () {
  let x = 0,
    o = 0;
  const increaseX = () => {
    ++x;
  };
  const increaseO = () => {
    ++o;
  };
  const increaseWho = () => {
    if (x > o) return "O";
    else return "X";
  };
  return { increaseO, increaseX, increaseWho };
})();
// ======================================================================
// mainEvent
cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    if (e.target.textContent === "") {
      const element = gameController.increaseWho();
      if (element === "X") {
        gameController.increaseX();
        e.target.textContent = "X";
        gameBoard.arrayBoard[e.target.id.slice(-1) - 1] = "X";
      } else {
        gameController.increaseO();
        e.target.textContent = "O";
        gameBoard.arrayBoard[e.target.id.slice(-1) - 1] = "O";
      }
      checkWinner(gameBoard.arrayBoard);
      e.target.classList.add("no-hover");
    }
  });
});
