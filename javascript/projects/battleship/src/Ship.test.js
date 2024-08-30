import Ship from "./Ship";

test("Ship is created correctly", () => {
  const ship = new Ship(4);
  expect(ship.length).toBe(4);
  expect(ship.hits.size).toBe(0);
});

test("Ship can receive hits", () => {
  const ship = new Ship(4);
  expect(ship.hits.size).toBe(0);
  ship.hit(0);
  expect(ship.hits.size).toBe(1);
  expect(ship.hits.has(0)).toBe(true);
});

test("Ship can't receive hits out of bounds", () => {
  const ship = new Ship(4);
  expect(() => ship.hit(4)).toThrow();
});

test("Ship can't receive attacks on the same place", () => {
  const ship = new Ship(4);
  ship.hit(0);
  expect(() => ship.hit(0)).toThrow();
});

test("Ship can't get sunk after getting hit on all locations", () => {
  const ship = new Ship(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit(0);
  ship.hit(1);
  expect(ship.isSunk()).toBe(true);
});
