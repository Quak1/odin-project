import Ship from "./Ship";

test("Ship is created correctly", () => {
  const ship = new Ship(4);
  expect(ship.length).toBe(4);
  expect(ship.hits).toBe(0);
});

test("Ship can receive hits", () => {
  const ship = new Ship(4);
  expect(ship.hits).toBe(0);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Ship can't have more hits than its size", () => {
  const ship = new Ship(2);
  expect(ship.hits).toBe(0);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("Ship can't have more hits than its size", () => {
  const ship = new Ship(2);
  expect(ship.hits).toBe(0);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
