function Gameboard() {
  const board = new Array(9).fill(" ");
  let markCount = 0;

  const getBoard = () => board;

  const addMark = (pos, mark) => {
    if (pos > 8 || board[pos] !== " ") return;
    board[pos] = mark;
    return ++markCount;
  };

  const isFull = () => markCount >= 9;

  return {
    getBoard,
    addMark,
    isFull,
  };
}

function Player(name, mark) {
  let wins = 0;

  const addWin = () => ++wins;
  const getWins = () => wins;
  const getName = () => name;
  const getMark = () => mark;

  return {
    addWin,
    getWins,
    getName,
    getMark,
  };
}

function GameController() {
  const board = Gameboard();
  const display = consoleDisplayController();

  const players = [Player("Player1", "X"), Player("Player2", "O")];
  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer;
  const switchActivePlayer = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  const isWin = (board) => {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const mark = activePlayer.getMark();
    return winningPositions.findIndex(
      (pattern) =>
        board[pattern[0]] === mark &&
        board[pattern[1]] === mark &&
        board[pattern[2]] === mark,
    );
  };

  const playRound = (pos) => {
    if (!board.addMark(pos, activePlayer.getMark())) {
      display.illegalMove();
      return;
    }
    if (isWin(board.getBoard()) !== -1) {
      display.printBoard(board.getBoard());
      display.castWinner(activePlayer.getName());
      activePlayer.addWin();
      return;
    }
    if (board.isFull()) {
      display.castTie();
      return;
    }

    switchActivePlayer();
    console.log(
      `It's ${activePlayer.getName()}(${activePlayer.getMark()}) turn. `,
    );
    display.printBoard(board.getBoard());
  };

  display.printBoard(board.getBoard());

  return {
    getActivePlayer,
    playRound,
  };
}

function consoleDisplayController() {
  const printBoard = (board) => {
    let row = "";
    for (let i = 0; i < board.length; i++) {
      if ((i + 1) % 3 === 0) {
        row += board[i];
        console.log(row);
        row = "";
      } else {
        row += board[i] + "|";
      }
    }
  };

  const castWinner = (playerName) => {
    console.log(playerName, "wins!");
  };

  const castTie = () => {
    console.log("It's a tie!");
  };

  const illegalMove = () => {
    console.log("That's illegal");
  };

  return {
    printBoard,
    castWinner,
    castTie,
    illegalMove,
  };
}
