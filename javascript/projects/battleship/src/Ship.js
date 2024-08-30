class Ship {
  hits = new Set();
  #sunk = false;

  constructor(size) {
    this.length = size;
  }

  hit(location) {
    if (this.#sunk) return;
    if (location >= this.length)
      throw new Error("Can't attack ship on location larger than ship");
    else if (this.hits.has(location))
      throw new Error("Can't attack ship on same location twice");
    else this.hits.add(location);
    this.isSunk();
  }

  isSunk() {
    if (this.hits.size === this.length) this.#sunk = true;
    return this.#sunk;
  }
}

export default Ship;
