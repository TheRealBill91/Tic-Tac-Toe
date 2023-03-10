/* eslint-disable no-unused-expressions */
// IIFE Module
const gameBoard = (() => {
  const board = [];
  let rows = 3;
  let columns = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  // This function adds a player's token to the selected cell on the board if it is empty.
  // It takes in the column and row index of the selected cell and the player's token as arguments.
  const addPlayerSelection = (column, row, player) => {
    const selectedRowArray = board[row];
    // console.log(selectedRowArray);
    const rowCellsWithValues = selectedRowArray.map((cell) => cell.getValue());
    // Check if board spot is taken
    if (!(rowCellsWithValues[column] === 0)) {
      return;
    }

    board[row][column].addToken(player);
  };

  const printGameBoard = (row, column, cell) => {
    let boardCellsWithValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    // console.log(boardCellsWithValues);
  };

  return { printGameBoard, addPlayerSelection, getBoard };
})();

// Checks whether there is a win or a tie
const checkGameStatus = (function () {
  // Checking for horizontal (row) win for each of the three rows
  const horizontalWin = () => {
    let playerOneCounter = 0;
    let playerTwoCounter = 0;
    let winner;
    const boardCellsWithValues = gameBoard
      .getBoard()
      .map((row) => row.map((cell) => cell.getValue()));
    for (let i = 0; i < boardCellsWithValues.length; i++) {
      const currentRow = boardCellsWithValues[i];
      playerOneCounter = 0;
      playerTwoCounter = 0;
      const onlyPlayerMarkings = currentRow.filter(
        (cell) => cell === "X" || cell === "O"
      );
      for (let j = 0; j < currentRow.length; j++) {
        const currentCell = currentRow[j];
        if (onlyPlayerMarkings.length === 3) {
          currentCell === "X"
            ? playerOneCounter++
            : currentCell === "O"
            ? playerTwoCounter++
            : null;
          if (playerOneCounter === 3) {
            winner = `Winner: ${
              gameController.playerSetup.getCurrentPlayer().name
            }`;
            // eslint-disable-next-line no-useless-return
            return winner;
          } else if (playerTwoCounter === 3) {
            winner = `Winner: ${
              gameController.playerSetup.getCurrentPlayer().name
            }`;
            // eslint-disable-next-line no-useless-return
            return winner;
          }
        }
      }
    }
  };

  // Checking for vertical (column) win for each of the three columns
  const verticalWin = () => {
    let playerOneCounter = 0;
    let playerTwoCounter = 0;
    let winner;
    for (let i = 0; i < gameBoard.getBoard().length; i++) {
      playerOneCounter = 0;
      playerTwoCounter = 0;
      const currentColumn = gameBoard
        .getBoard()
        .map((row) => row[i].getValue());
      const onlyPlayerMarkings = currentColumn.filter(
        (cell) => cell === "X" || cell === "O"
      );
      for (let j = 0; j < currentColumn.length; j++) {
        const currentCell = currentColumn[j];
        if (onlyPlayerMarkings.length === 3) {
          currentCell === "X"
            ? playerOneCounter++
            : currentCell === "O"
            ? playerTwoCounter++
            : null;
          if (playerOneCounter === 3) {
            winner = `Winner: ${
              gameController.playerSetup.getCurrentPlayer().name
            }`;
            // eslint-disable-next-line no-useless-return
            return winner;
          } else if (playerTwoCounter === 3) {
            winner = `Winner: ${
              gameController.playerSetup.getCurrentPlayer().name
            }`;
            console.log("Player Two Wins");
            // eslint-disable-next-line no-useless-return
            return winner;
          }
        }
      }
    }
  };

  // checks top left to bottom right win condition on game board
  const checkTopLeftToBottomRight = () => {
    /*  let playerOneCounter = 0;
     let playerTwoCounter = 0; */
    let winner;
    let playerValues = [];
    const board = gameBoard.getBoard();
    // check for top left to bottom right
    const boardCellsWithValues = gameBoard
      .getBoard()
      .map((row) => row.map((cell) => cell.getValue()));
    for (let i = 0; i <= 2; i++) {
      const currentRow = boardCellsWithValues[i];
      for (let j = 0; j < 1; j++) {
        const currentCell = currentRow[i];
        playerValues.push(currentCell);
      }
    }

    const playerOneWin = playerValues.filter((value) => value === "X");
    const playerTwoWin = playerValues.filter((value) => value === "O");

    if (playerOneWin.length === 3) {
      winner = `Winner: ${gameController.playerSetup.getCurrentPlayer().name}`;
      return winner;
    } else if (playerTwoWin.length === 3) {
      winner = `Winner: ${gameController.playerSetup.getCurrentPlayer().name}`;
      return winner;
    }
  };

  // checks bottom left to top right win condition on game board
  const checkBottomLeftToTopRight = () => {
    let winner;
    let playerValues = [];
    // Used to select the first, second, and third cell in each row
    let counter = 0;
    const board = gameBoard.getBoard();
    // check for top left to bottom right
    const boardCellsWithValues = gameBoard
      .getBoard()
      .map((row) => row.map((cell) => cell.getValue()));
    // starts at row 2 and works backwards
    for (let i = 2; i >= 0; i--) {
      const currentRow = boardCellsWithValues[i];
      // prevents selecting more than one cell in the row
      for (let j = 0; j < 1; j++) {
        const currentCell = currentRow[counter];
        counter++;
        playerValues.push(currentCell);
      }
    }

    const playerOneWin = playerValues.filter((value) => value === "X");
    const playerTwoWin = playerValues.filter((value) => value === "O");

    if (playerOneWin.length === 3) {
      winner = `Winner: ${gameController.playerSetup.getCurrentPlayer().name}`;
      return winner;
    } else if (playerTwoWin.length === 3) {
      winner = `Winner: ${gameController.playerSetup.getCurrentPlayer().name}`;
      return winner;
    }
  };

  // check for tie result by counting the number of cells that are not equal
  // to zero, which is 9 for a tie.
  const tieResult = () => {
    let tieResult;
    let nonZeroValues = [];
    const boardCellsWithValues = gameBoard
      .getBoard()
      .map((row) => row.map((cell) => cell.getValue()));
    const noZeros = boardCellsWithValues.map((row) =>
      row.filter((cellValue) => !(cellValue === 0))
    );

    noZeros.forEach((row) => {
      row.forEach((cell) => {
        nonZeroValues.push(cell);
      });
    });

    if (nonZeroValues.length === 9) {
      tieResult = "It's a tie!";
      return tieResult;
    }
  };

  return {
    horizontalWin,
    verticalWin,
    checkTopLeftToBottomRight,
    checkBottomLeftToTopRight,
    tieResult,
  };
})();

// Logic for adding player selections and retrieving player selections
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const removeToken = () => {
    value = 0;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
    removeToken,
  };
}

const playerCreator = () => {
  const players = [];

  const getPlayers = () => players;

  let currentPlayer = players[0];
  const getCurrentPlayer = () => players[0];

  const addPlayer = (name, value) => {
    // players[name] = { name, value };
    players.push({ name, value });
  };

  return { addPlayer, getPlayers, getCurrentPlayer };
};

const gameController = (() => {
  const playerSetup = (() => {
    let players;

    const { switchPlayer } = playerCreator();

    let playerOneName;

    let playerTwoName;

    players = playerCreator();
    const addPlayerOne = () => players.addPlayer(playerOneName, "X");
    const addPlayerTwo = () => players.addPlayer(playerTwoName, "O");

    const setPlayerOneName = () => {
      const playerOneInput = document.querySelector(".playerOneInput");
      playerOneName = playerOneInput.value;
    };

    const setPlayerTwoName = () => {
      const playerTwoInput = document.querySelector(".playerTwoInput");
      playerTwoName = playerTwoInput.value;
    };

    let currentPlayer;
    const changePlayer = () => {
      if (shallowEqual(currentPlayer, getPlayers()[0])) {
        currentPlayer = getPlayers()[1];
        console.log(`It's ${currentPlayer.name}s turn`);
      } else {
        currentPlayer = getPlayers()[0];
        console.log(`It's ${currentPlayer.name}s turn`);
      }
    };

    // sets starting player as player one
    const setCurrentPlayer = () => {
      currentPlayer = getPlayers()[0];
    };

    const getPlayers = () => players.getPlayers();

    const getCurrentPlayer = () => currentPlayer;
    return {
      getPlayers,
      setCurrentPlayer,
      getCurrentPlayer,
      changePlayer,
      setPlayerOneName,
      setPlayerTwoName,
      addPlayerOne,
      addPlayerTwo,
    };
  })();

  //   console.log(currentPlayer);

  // checks if two objects property values are equal
  function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

  const playRound = (column, row) => {
    let horizontalResult;
    let verticalResult;
    let checkTopLeftToBottomRight;
    let checkBottomLeftToTopRight;
    let tieResult;
    console.log(
      `${
        playerSetup.getCurrentPlayer().name
      } placed his marker on row ${row}, column ${column}`
    );
    gameBoard.addPlayerSelection(
      column,
      row,
      playerSetup.getCurrentPlayer().value
    );
    horizontalResult = checkGameStatus.horizontalWin();
    verticalResult = checkGameStatus.verticalWin();
    checkTopLeftToBottomRight = checkGameStatus.checkTopLeftToBottomRight();
    checkBottomLeftToTopRight = checkGameStatus.checkBottomLeftToTopRight();
    tieResult = checkGameStatus.tieResult();

    if (horizontalResult) {
      return horizontalResult;
    } else if (verticalResult) {
      return verticalResult;
    } else if (checkTopLeftToBottomRight) {
      return checkTopLeftToBottomRight;
    } else if (checkBottomLeftToTopRight) {
      return checkBottomLeftToTopRight;
    } else if (tieResult) {
      return tieResult;
    }

    playerSetup.changePlayer();
    gameBoard.printGameBoard(row, column);
    /*  switchPlayerTurn(); */
  };

  return {
    playRound,
    shallowEqual,
    playerSetup,
  };
})();

const displayController = (() => {
  const boardDiv = document.querySelector(".board-container");
  const topBarDiv = document.querySelector(".topBar");
  const mainElement = document.querySelector("main");
  const resetButton = document.createElement("button");
  // Get player one and two input

  const gameResultDiv = document.createElement("div");

  let players;

  const board = gameBoard.getBoard();

  const preGameSetup = () => {
    const playBtn = document.querySelector(".playBtn");
    const formDiv = document.querySelector(".formDiv");
    const boardDiv = document.querySelector(".board-container");

    playBtn.addEventListener("click", () => {
      // hide play button
      playBtn.style.display = "none";

      // make form div and child elements visible
      formDiv.style.display = "flex";
      formDiv.addEventListener("submit", startGame);
    });

    const startGame = (event) => {
      event.preventDefault();
      gameController.playerSetup.setPlayerOneName();
      gameController.playerSetup.setPlayerTwoName();
      gameController.playerSetup.addPlayerOne();
      gameController.playerSetup.addPlayerTwo();
      gameController.playerSetup.setCurrentPlayer();
      formDiv.style.display = "none";

      const playerTurn = document.createElement("div");
      playerTurn.classList.add("currentPlayerTurn");
      let currentPlayer = gameController.playerSetup.getCurrentPlayer().name;
      playerTurn.textContent = `It's ${currentPlayer}s turn`;

      const topBarDiv = document.createElement("div");
      topBarDiv.classList.add("topBar");
      const boardDiv = document.createElement("div");
      boardDiv.classList.add("board-container");

      mainElement.append(playerTurn, topBarDiv, boardDiv);
      updateBoard();
      boardResetListen();
      boardDiv.addEventListener("click", clickHandler);
    };
  };

  const updateBoard = (roundResult) => {
    const boardDiv = document.querySelector(".board-container");
    boardDiv.innerHTML = "";

    for (let i = 0; i < board.length; i++) {
      const currentRow = board[i];
      for (let j = 0; j < currentRow.length; j++) {
        const button = document.createElement("button");
        button.dataset.row = i;
        button.dataset.column = j;
        button.classList.add("boardCell");
        const row = board[i];
        const cellValue = row[j].getValue();
        cellValue === 0
          ? (button.textContent = "")
          : (button.textContent = cellValue);

        boardDiv.appendChild(button);
      }
    }
  };

  const playAgain = (roundResult) => {
    const boardDiv = document.querySelector(".board-container");
    const topBarDiv = document.querySelector(".topBar");
    const playerTurn = document.querySelector(".currentPlayerTurn");
    boardDiv.removeEventListener("click", clickHandler);
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.classList.add("playAgainButton");
    gameResultDiv.classList.add("gameResult");
    gameResultDiv.textContent = roundResult;

    mainElement.removeChild(playerTurn);
    mainElement.prepend(gameResultDiv);
    topBarDiv.append(playAgainButton);
    playAgainButton.addEventListener("click", boardResetHandler);
    topBarDiv.removeChild(resetButton);
  };

  const boardResetListen = () => {
    resetButton.classList.add("resetButton");
    resetButton.textContent = "Reset";
    const topBarDiv = document.querySelector(".topBar");
    topBarDiv.appendChild(resetButton);
    resetButton.addEventListener("click", boardResetHandler);
    const playerTurn = document.querySelector(".currentPlayerTurn");
  };

  function boardResetHandler(e) {
    const boardDiv = document.querySelector(".board-container");
    gameResultDiv.textContent = "";
    const playerTurn = document.querySelector(".currentPlayerTurn");
    const topBarDiv = document.querySelector(".topBar");

    if (e.target.className === "playAgainButton") {
      const playerTurn = document.createElement("div");
      e.target.remove();
      mainElement.removeChild(gameResultDiv);
      mainElement.insertBefore(playerTurn, topBarDiv);
      playerTurn.classList.add("currentPlayerTurn");
      let currentPlayer = gameController.playerSetup.getCurrentPlayer().name;
      playerTurn.textContent = `It's ${currentPlayer}s turn`;
    } else {
      // Changes the current player back to player 1 after reset or win reset
      gameController.playerSetup.setCurrentPlayer();
      let currentPlayer = gameController.playerSetup.getCurrentPlayer().name;
      playerTurn.textContent = `It's ${currentPlayer}s turn`;
    }

    // Resets the value inside each cell to default (0)
    board.forEach((row) => {
      row.forEach((cell) => {
        cell.removeToken();
      });
    });

    updateBoard();
    boardDiv.addEventListener("click", clickHandler);
    boardResetListen();
  }

  function clickHandler(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    const playerTurn = document.querySelector(".currentPlayerTurn");

    // return if user clicks on cell border instead of cell
    if (!selectedColumn || !selectedRow) return;

    const roundResult = gameController.playRound(selectedColumn, selectedRow);

    let currentPlayer = gameController.playerSetup.getCurrentPlayer().name;
    playerTurn.textContent = `It's ${currentPlayer}s turn`;

    updateBoard();
    if (roundResult) {
      playAgain(roundResult);
    }
  }

  preGameSetup();

  return { players };
})();

/* gameBoard.printGameBoard(); */

// factory function for Player object
/* const Player = () => {

} */

/* gameBoard.getGameBoard(); */
/* gameController.playRound(); */
