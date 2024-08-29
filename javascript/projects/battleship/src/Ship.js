class Ship {
  hits = 0;
  #sunk = false;

  constructor(size) {
    this.length = size;
  }

  hit() {
    if (this.#sunk) return;
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    if (this.hits === this.length) this.#sunk = true;
    return this.#sunk;
  }
}

export default Ship;
