import Gameboard from "./Gameboard";
class Player {
  gameboard = new Gameboard();

  constructor(name = "Player") {
    this.name = name;
  }

  setShip(row, col, size, direction = "h") {
    this.gameboard.placeShip(row, col, size, direction);
  }

  attack(player, row, col) {
    player.gameboard.receiveAttack(row, col);
  }

  setArmada(random = true) {
    this.gameboard.resetBoard();
    const sizes = [5, 4, 3, 3, 2];

    if (random) {
      for (const size of sizes) {
        let { row, col, direction } = this.#getRandomShip();
        while (!this.gameboard.placeShip(row, col, size, direction))
          ({ row, col, direction } = this.#getRandomShip());
      }
    } else {
      for (let i = 0; i < sizes.length; i++) this.setShip(i, 0, sizes[i]);
    }
  }

  #getRandomShip() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    const direction = Math.random() < 0.5 ? "h" : "v";
    return { row, col, direction };
  }
}

export default Player;
