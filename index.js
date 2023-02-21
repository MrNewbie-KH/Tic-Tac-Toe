"use strict";
const cells = document.querySelectorAll(".cell");
const container = document.querySelector(".container");
const showUp = document.createElement("div");
const showUpText = document.createElement("p");
const clearBtn = document.createElement("button");
clearBtn.textContent = "CLEAR";
clearBtn.classList.add("clear-btn");
showUp.appendChild(showUpText);
showUp.classList.add("appear-up");
const winner = document.createElement("span");
winner.classList.add("winner");

// ===================================================================
// iife to build the game board once and only once bro
// ===================================================================
const gameBoard = (function () {
  const arrayBoard = [];
  for (let i = 0; i < 9; i++) arrayBoard[i] = i;
  const clearCell = function () {
    for (let i = 0; i < 9; i++) cells[i].textContent = "";
  };
  return { arrayBoard, clearCell };
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
      (arr[i * 3] === arr[i * 3 + 1] && arr[i * 3] === arr[i * 3 + 2]) ||
      (arr[i] === arr[i + 3] && arr[i] === arr[i + 6]) ||
      (arr[0] === arr[4] && arr[0] === arr[8]) ||
      (arr[2] === arr[4] && arr[2] === arr[6])
    ) {
      return true;
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
  const reset = () => {
    x = 0;
    o = 0;
  };
  const sum = () => {
    return x + o;
  };
  const increaseWho = () => {
    if (x > o) return "O";
    else return "X";
  };
  return { increaseO, increaseX, increaseWho, sum, reset };
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
      if (checkWinner(gameBoard.arrayBoard) === true) {
        winner.textContent = element;
        showUp.textContent = `<< The Winner is ... >> `;
        showUp.appendChild(winner);
        container.appendChild(showUp);
        showUp.appendChild(clearBtn);
      } else {
        if (gameController.sum() === 9) {
          winner.textContent = "Tie";
          showUp.textContent = `<< It's a ... >>`;
          showUp.appendChild(winner);
          container.appendChild(showUp);
          showUp.appendChild(clearBtn);
        }
      }
      e.target.classList.add("no-hover");
    }
  });
});
// ===================================================================
// function to clear or reset the game
// 1-reset array
// 2-reset the appearing x and o
// ===================================================================
// const resetAll

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("clear-btn")) {
    gameBoard.arrayBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    gameBoard.clearCell();
    gameController.reset();

    container.removeChild(showUp);
  }
});
