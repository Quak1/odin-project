import {
  renderBtnContainer,
  updateEnemyBoard,
  renderBoard,
  upadatePlayerBoard,
} from "./view";
import Player from "./Player";

const player1 = new Player();
const player2 = new Player();

let playersTurn;
let isGameOver = false;

const rows = player1.gameboard.board.length;
const cols = player1.gameboard.board[0].length;

function start() {
  renderBtnContainer(startBtnCallback, randomArmadaBtnCallback);

  player1.setArmada();
  player2.setArmada();

  renderBoard("playerBoard", player1);
  upadatePlayerBoard(player1);
  renderBoard("enemyBoard", player2, clickCellCallback);
  updateEnemyBoard(player2);
}

function attack(attacker, receiver, row, col) {
  attacker.attack(receiver, row, col);
  playersTurn = receiver;
  if (receiver.gameboard.areAllShipSunk()) gameOver(attacker);
}

function attackRandom(attacker, receiver) {
  if (receiver.gameboard.areAllShipSunk()) return;

  let row, col, cell;
  do {
    row = Math.floor(Math.random() * rows);
    col = Math.floor(Math.random() * cols);
    cell = receiver.gameboard.board[row][col];
  } while (cell && cell.hit);

  attack(attacker, receiver, row, col);
}

function clickCellCallback(row, col) {
  return function () {
    if (playersTurn !== player1 || isGameOver) return;
    attack(player1, player2, row, col);
    updateEnemyBoard(player2);

    attackRandom(player2, player1);
    upadatePlayerBoard(player1);
  };
}

function startBtnCallback() {
  playersTurn = player1;
}

function randomArmadaBtnCallback() {
  player1.setArmada();
  upadatePlayerBoard(player1);
}

function gameOver(winner) {
  isGameOver = true;
  alert(`${winner.name} is the Winner!`);
}

export { start, startBtnCallback, randomArmadaBtnCallback };
