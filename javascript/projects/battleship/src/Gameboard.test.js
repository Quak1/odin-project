import Gameboard from "./Gameboard";

test("Board gets created correctly", () => {
  const gameboard = new Gameboard();
  const conditions = gameboard.board.every((row) =>
    row.every((cell) => cell === null),
  );

  expect(conditions).toBe(true);
  expect(gameboard.ships.length).toBe(0);
});

test("Board can place new ships", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 2);
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.board[0][0]).not.toBe(null);
  expect(gameboard.board[0][0].location).toBe(0);
  expect(gameboard.board[0][1]).not.toBe(null);
  expect(gameboard.board[0][1].location).toBe(1);
});

test("Board can place new ships vertical", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 2, "v");
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.board[0][0]).not.toBe(null);
  expect(gameboard.board[0][0].location).toBe(0);
  expect(gameboard.board[1][0]).not.toBe(null);
  expect(gameboard.board[1][0].location).toBe(1);
});

test("Board doesn't place ships out of bounds", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(9, 9, 3, "v");
  expect(gameboard.ships.length).toBe(0);
  expect(gameboard.board[9][9]).toBe(null);
});

test("Board doesn't place a ship if there would be a collision", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 2, "h");
  gameboard.placeShip(0, 0, 3, "v");
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.board[0][0]).not.toBe(null);
  expect(gameboard.board[0][1]).not.toBe(null);
  expect(gameboard.board[1][0]).toBe(null);
  expect(gameboard.board[2][0]).toBe(null);
});

test("Board records missed attacks", () => {
  const gameboard = new Gameboard();
  expect(gameboard.receiveAttack(0, 0)).toBe(false);
  expect(gameboard.board[0][0].hit).toBe(true);
});

test("Board records hits on ships", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 2);
  expect(gameboard.receiveAttack(0, 1)).toBe(true);
  expect(gameboard.board[0][1].hit).toBe(true);
  expect(gameboard.board[0][0].ship.hits.has(1)).toBe(true);
});

test("Board prohibits hits on previously attacked cells", () => {
  const gameboard = new Gameboard();
  expect(gameboard.receiveAttack(0, 0)).toBe(false);
  expect(() => gameboard.receiveAttack(0, 0)).toThrow(/same/);
});

test("Board records multiple hits on a ship", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 2);
  expect(gameboard.receiveAttack(0, 0)).toBe(true);
  expect(gameboard.receiveAttack(0, 1)).toBe(true);
  expect(gameboard.board[0][0].ship.hits.size).toBe(2);
});

test("Board reports if all ships have been sunk", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0, 2);
  expect(gameboard.receiveAttack(0, 0)).toBe(true);
  expect(gameboard.areAllShipSunk()).toBe(false);

  expect(gameboard.receiveAttack(0, 1)).toBe(true);
  expect(gameboard.areAllShipSunk()).toBe(true);
});
