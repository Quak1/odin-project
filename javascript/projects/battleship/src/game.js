import { updateEnemyBoard, upadatePlayerBoard } from "./view";
import Player from "./Player";

const player1 = new Player();
const player2 = new Player();

const rows = player1.gameboard.board.length;
const cols = player1.gameboard.board[0].length;

function start() {
  player1.setArmada();
  player2.setArmada();

  player1.isTurn = true;
  upadatePlayerBoard();
  updateEnemyBoard();
}

function attack(attacker, receiver, row, col) {
  attacker.attack(receiver, row, col);
  receiver.isTurn = true;
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

export { start, attack, attackRandom, player1, player2 };
