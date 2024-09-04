import { newGameBtnCallback } from "./game";

const container = document.querySelector(".container");
const playerBoard = document.getElementById("playerBoard");
const enemyBoard = document.getElementById("enemyBoard");
const modal = document.querySelector("dialog");
const modalBtn = document.querySelector("dialog button");
modalBtn.addEventListener("click", newGameBtnCallback);

function makeElement(className, tag = "div") {
  const container = document.createElement(tag);
  container.classList = className;
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

  if (clickCallBack) {
    const cover = makeElement("cover");
    container.append(cover);
  }

  container.append(...rows);
}

function upadatePlayerBoard(player) {
  playerBoard.querySelectorAll(".row").forEach((row, rowNum) => {
    row.querySelectorAll(".cell").forEach((cellDiv, colNum) => {
      const cell = player.gameboard.board[rowNum][colNum];
      const classList = ["cell"];
      if (cell) {
        if (cell.ship) classList.push("ship");
        if (cell.hit) classList.push("hit");
        if (cell.ship && cell.ship.isSunk()) classList.push("sunk");
      }
      cellDiv.classList = classList.join(" ");
    });
  });
}

function updateEnemyBoard(enemy) {
  enemyBoard.querySelectorAll(".row").forEach((row, rowNum) => {
    row.querySelectorAll(".cell").forEach((cellDiv, colNum) => {
      const cell = enemy.gameboard.board[rowNum][colNum];
      const classList = ["cell"];
      if (cell && cell.hit) {
        classList.push("hit");
        if (cell.ship) classList.push("ship");
        if (cell.ship && cell.ship.isSunk()) classList.push("sunk");
      }
      cellDiv.classList = classList.join(" ");
    });
  });
}

function renderBtnContainer(startBtnCallback, randomBtnCallback) {
  const startBtn = makeElement("", "button");
  startBtn.textContent = "Start";
  startBtn.addEventListener("click", startBtnCallback);

  const randomBtn = makeElement("", "button");
  randomBtn.textContent = "Random Armada";
  randomBtn.addEventListener("click", randomBtnCallback);

  const btns = makeElement("btns");
  btns.append(startBtn, randomBtn);

  container.prepend(btns);
}

function showModal(winner) {
  modal.querySelector("p").textContent = `${winner.name} is the winner!`;
  modal.showModal();
}

function closeModal() {
  modal.close();
}

function enableCover() {
  document.querySelector("#enemyBoard .cover").classList.add("active");
}

function disableCover() {
  document.querySelector("#enemyBoard .cover").classList.remove("active");
}

function removeBtns() {
  document.querySelector(".btns").remove();
}

function renderNewGameBtn() {
  const btn = makeElement("", "button");
  btn.textContent = "New game";
  btn.addEventListener("click", newGameBtnCallback);

  const div = makeElement("btns");
  div.append(btn);
  container.prepend(div);
}

export {
  renderBoard,
  upadatePlayerBoard,
  updateEnemyBoard,
  renderBtnContainer,
  showModal,
  closeModal,
  enableCover,
  disableCover,
  removeBtns,
  renderNewGameBtn,
};
