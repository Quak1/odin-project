import Player from "./Player";

test("Player gets created correctly", () => {
  const player = new Player("Test player");
  expect(player.gameboard).toBeTruthy();
  expect(player.name).toBe("Test player");
});

test("Player can set a ship", () => {
  const player = new Player();
  player.setShip(0, 0, 2, "h");
  expect(player.gameboard.board[0][0]).not.toBe(null);
});

test("Player can set an armada", () => {
  const player = new Player();
  player.setArmada(false);
  expect(player.gameboard.board[0][0]).not.toBe(null);
  expect(player.gameboard.board[1][0]).not.toBe(null);
  expect(player.gameboard.board[2][0]).not.toBe(null);
  expect(player.gameboard.board[3][0]).not.toBe(null);
  expect(player.gameboard.board[4][0]).not.toBe(null);
});

test("Player can set a random armada", () => {
  const player = new Player();
  player.setArmada();
  expect(player.gameboard.ships.length).toBe(5);
});

test("Player can attack other player's board", () => {
  const player1 = new Player();
  const player2 = new Player();

  player1.attack(player2, 0, 1);
  expect(player2.gameboard.board[0][1].hit).toBe(true);
  expect(player2.gameboard.board[0][0]).toBe(null);
});

test("Player can attack and sink a ship", () => {
  const player1 = new Player();
  const player2 = new Player();

  player2.setShip(0, 0, 2);

  player1.attack(player2, 0, 0);
  player1.attack(player2, 0, 1);
  expect(player2.gameboard.areAllShipSunk()).toBe(true);
});
