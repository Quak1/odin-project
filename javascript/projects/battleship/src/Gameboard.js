import Ship from "./Ship";

class Gameboard {
  board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  ships = [];

  placeShip(row, col, size, direction = "h") {
    const ship = new Ship(size);

    const cells = this.#makeCells(row, col, size, direction);
    if (!cells) return false;

    for (let i = 0; i < size; i++) {
      const [newRow, newCol] = cells[i];
      this.board[newRow][newCol] = { ship, location: i };
    }
    this.ships.push(ship);
    return true;
  }

  #makeCells(row, col, size, direction) {
    const cells = [];

    for (let i = 0; i < size; i++) {
      let [newRow, newCol] = [row, col + i];

      if (direction === "v") {
        [newRow, newCol] = [row + i, col];
      } else if (direction !== "h") {
        throw new Error("Direction must be either 'h' or 'v'");
      }

      if (
        newRow >= this.board.length ||
        newCol >= this.board[0].length ||
        this.board[newRow][newCol]
      )
        return null;

      cells.push([newRow, newCol]);
    }

    return cells;
  }

  receiveAttack(row, col) {
    const cell = this.board[row][col];
    if (!cell) {
      this.board[row][col] = { hit: true };
      return false;
    } else if (cell.hit) throw new Error("Can't attack same place twice");

    cell.hit = true;
    cell.ship.hit(cell.location);
    return true;
  }

  areAllShipSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  resetBoard() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.ships = [];
  }
}

export default Gameboard;
