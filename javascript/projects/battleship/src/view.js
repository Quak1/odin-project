const container = document.querySelector("container");
const playerBoard = document.getElementById("playerBoard");
const enemyBoard = document.getElementById("enemyBoard");

function makeElement(className, tag = "div") {
  const container = document.createElement(tag);
  container.classList.add(className);
  return container;
}

function renderBoard(containerId, player, clickCallBack) {
  const rows = player.gameboard.board.map((row, rowNum) => {
    const rowContainer = makeElement("row");
    const cells = row.map((_, colNum) => {
      const cell = makeElement("cell");
      if (clickCallBack)
        cell.addEventListener("click", clickCallBack(rowNum, colNum), {
          once: true,
        });
      return cell;
    });
    rowContainer.append(...cells);
    return rowContainer;
  });

  const container = document.getElementById(containerId);
  container.textContent = "";
  container.append(...rows);
}

function upadatePlayerBoard(player) {
  playerBoard.querySelectorAll(".row").forEach((row, rowNum) => {
    row.querySelectorAll(".cell").forEach((cellDiv, colNum) => {
      const cell = player.gameboard.board[rowNum][colNum];
      if (cell) {
        if (cell.ship) cellDiv.classList.add("ship");
        if (cell.hit) cellDiv.classList.add("hit");
        if (cell.ship && cell.ship.isSunk()) cellDiv.classList.add("sunk");
      }
    });
  });
}

function updateEnemyBoard(enemy) {
  enemyBoard.querySelectorAll(".row").forEach((row, rowNum) => {
    row.querySelectorAll(".cell").forEach((cellDiv, colNum) => {
      const cell = enemy.gameboard.board[rowNum][colNum];
      if (cell && cell.hit) {
        cellDiv.classList.add("hit");
        if (cell.ship) cellDiv.classList.add("ship");
        if (cell.ship && cell.ship.isSunk()) cellDiv.classList.add("sunk");
      }
    });
  });
}

export { renderBoard, upadatePlayerBoard, updateEnemyBoard };
