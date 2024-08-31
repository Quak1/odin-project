const container = document.querySelector("container");
const playerBoard = document.getElementById("playerBoard");
const enemyBoard = document.getElementById("enemyBoard");

function makeElement(className, tag = "div") {
  const container = document.createElement(tag);
  container.classList.add(className);
  return container;
}

function makePlayerCells(cell) {
  const div = makeElement("cell");
  if (cell) {
    if (cell.ship) div.classList.add("ship");
    if (cell.hit) div.classList.add("hit");
    if (cell.ship && cell.ship.isSunk()) div.classList.add("sunk");
  }
  return div;
}

function makeEnemyCells(row, enemy) {
  return function (cell, col) {
    const btn = makeElement("cell", "btn");
    if (cell && cell.hit) {
      btn.classList.add("hit");
      if (cell.ship) btn.classList.add("ship");
      if (cell.ship && cell.ship.isSunk()) btn.classList.add("sunk");
    }

    if (cell && cell.hit) return btn;

    btn.addEventListener(
      "click",
      () => {
        enemy.gameboard.receiveAttack(row, col);
        updateBoard(enemy, false);
      },
      { once: true },
    );

    return btn;
  };
}

function updateBoard(player, isPlayer = true) {
  const board = player.gameboard.board;
  const rows = board.map((row, rowNum) => {
    const rowContainer = makeElement("row");
    const cells = row.map(
      isPlayer ? makePlayerCells : makeEnemyCells(rowNum, player),
    );
    rowContainer.append(...cells);
    return rowContainer;
  });

  if (isPlayer) {
    playerBoard.textContent = "";
    playerBoard.append(...rows);
  } else {
    enemyBoard.textContent = "";
    enemyBoard.append(...rows);
  }
}

export { updateBoard };
