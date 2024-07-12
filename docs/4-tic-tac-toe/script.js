function Gameboard() {
  const board = new Array(9).fill(".");
  let markCount = 0;

  const getBoard = () => board;

  const addMark = (pos, mark) => {
    if (pos > 8 || pos < 0 || board[pos] !== ".") return;
    board[pos] = mark;
    return ++markCount;
  };

  const isFull = () => markCount >= 9;

  const resetBoard = () => {
    board.fill(".");
    markCount = 0;
  };

  return {
    getBoard,
    addMark,
    isFull,
    resetBoard,
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

function GameController(p1Name, p2Name) {
  const gameboard = Gameboard();
  const players = [Player(p1Name, "X"), Player(p2Name, "O")];
  let activePlayer = players[0];
  let gameOver = false;
  let winner;

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  const getWinner = () => winner;

  const isWinningBoard = (board) => {
    const winningPatterns = [
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
    return winningPatterns.find(
      (pattern) =>
        board[pattern[0]] === mark &&
        board[pattern[1]] === mark &&
        board[pattern[2]] === mark,
    );
  };

  const playRound = (pos) => {
    if (gameOver) return;
    // was invalid move
    if (!gameboard.addMark(pos, activePlayer.getMark())) return;

    const winningPattern = isWinningBoard(gameboard.getBoard());

    if (winningPattern) {
      gameOver = true;
      activePlayer.addWin();
      winner = {
        name: activePlayer.getName(),
        pattern: winningPattern,
      };
      return;
    }

    if (gameboard.isFull()) {
      gameOver = true;
      winner = "tie";
      return;
    }

    switchActivePlayer();
  };

  const resetGame = () => {
    activePlayer = players[0];
    gameboard.resetBoard();
    gameOver = false;
    winner = undefined;
  };

  const getScores = () => [
    {
      name: players[0].getName(),
      score: players[0].getWins(),
    },
    {
      name: players[1].getName(),
      score: players[1].getWins(),
    },
  ];

  return {
    playRound,
    resetGame,
    getActivePlayer,
    getBoard: gameboard.getBoard,
    getWinner,
    getScores,
  };
}

function displayController() {
  const boardContainer = document.querySelector(".board");
  const currentPlayerText = document.querySelector(".player");
  const announcementDialog = document.querySelector("dialog");
  let game;

  const drawBoard = () => {
    boardContainer.textContent = "";
    const board = game.getBoard();

    for (let i = 0; i < 9; i++) {
      const btn = document.createElement("button");
      btn.dataset.position = i;
      btn.classList.add("cell", board[i]);
      boardContainer.appendChild(btn);
    }
  };

  const colorWinningCells = (pattern) => {
    document.querySelectorAll(".cell").forEach((cell) => {
      if (pattern.includes(Number(cell.dataset.position)))
        cell.classList.add("winner");
    });
  };

  const updateScores = () => {
    const scores = game.getScores();
    const p1Element = document.getElementById("p1-score");
    const p2Element = document.getElementById("p2-score");

    p1Element.textContent = `${scores[0].name}: ${scores[0].score}`;
    p2Element.textContent = `${scores[1].name}: ${scores[1].score}`;
  };

  const updateScreen = () => {
    drawBoard();

    const player = game.getActivePlayer();
    currentPlayerText.textContent = `${player.getName()}'s turn`;

    const winner = game.getWinner();
    if (!winner) return;

    // there is a winner or tie
    boardContainer.removeEventListener("click", boardClickEventHandler);
    const announcementText = document.querySelector("dialog p");
    announcementDialog.showModal();
    if (winner === "tie") {
      announcementText.textContent = "It's a tie!";
    } else {
      announcementText.textContent = `${winner.name} wins!`;
      colorWinningCells(winner.pattern);
      updateScores();
    }
  };

  const boardClickEventHandler = (e) => {
    const position = e.target.dataset.position;
    if (!position) return;

    game.playRound(position);
    updateScreen();
  };

  const firstLoad = () => {
    announcementDialog.showModal();
    form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const p1Name = document.querySelector("#p1-name").value;
      const p2Name = document.querySelector("#p2-name").value;
      game = GameController(p1Name, p2Name);

      const dialogCloseHandler = () => {
        boardContainer.addEventListener("click", boardClickEventHandler);
        game.resetGame();
        updateScreen();
      };

      const info = document.createElement("p");
      const newGameBtn = document.createElement("button");
      newGameBtn.textContent = "New Game!";
      newGameBtn.addEventListener("click", () => {
        announcementDialog.close();
      });

      announcementDialog.addEventListener("close", dialogCloseHandler);
      announcementDialog.textContent = "";
      announcementDialog.append(info, newGameBtn);
      announcementDialog.close();

      updateScreen();
    });
  };

  firstLoad();
}

displayController();
