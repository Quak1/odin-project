import { attack, attackRandom, player1, player2 } from "./game";

const container = document.querySelector("container");
const playerBoard = document.getElementById("playerBoard");
const enemyBoard = document.getElementById("enemyBoard");

function makeElement(className, tag = "div") {
  const container = document.createElement(tag);
  container.classList.add(className);
  return container;
}

function upadatePlayerBoard() {
  const rows = player1.gameboard.board.map((row) => {
    const rowContainer = makeElement("row");
    const cells = row.map(makePlayerCell);
    rowContainer.append(...cells);
    return rowContainer;
  });

  playerBoard.textContent = "";
  playerBoard.append(...rows);
}

function makePlayerCell(cell) {
  const div = makeElement("cell");
  if (cell) {
    if (cell.ship) div.classList.add("ship");
    if (cell.hit) div.classList.add("hit");
    if (cell.ship && cell.ship.isSunk()) div.classList.add("sunk");
  }

  return div;
}

function updateEnemyBoard() {
  const rows = player2.gameboard.board.map((row, rowNum) => {
    const rowContainer = makeElement("row");
    const cells = row.map(makeEnemyCell(rowNum));
    rowContainer.append(...cells);
    return rowContainer;
  });

  enemyBoard.textContent = "";
  enemyBoard.append(...rows);
}

function makeEnemyCell(row) {
  return function (cell, col) {
    const btn = makeElement("cell", "button");
    if (cell && cell.hit) {
      btn.classList.add("hit");
      if (cell.ship) btn.classList.add("ship");
      if (cell.ship && cell.ship.isSunk()) btn.classList.add("sunk");
      return btn;
    }

    btn.addEventListener(
      "click",
      () => {
        if (!player1.isTurn) return;
        attack(player1, player2, row, col);
        updateEnemyBoard();

        attackRandom(player2, player1);
        upadatePlayerBoard();
      },
      { once: true },
    );

    return btn;
  };
}

export { upadatePlayerBoard, updateEnemyBoard };
