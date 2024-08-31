import { updateBoard } from "./view";
import Player from "./Player";

const player = new Player();
const enemy = new Player();

function start() {
  player.setArmada();
  enemy.setArmada();

  updateBoard(player);
  updateBoard(enemy, false);
}

export { start };
