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
            winner = `Winner: ${gameController.getCurrentPlayer().name}`;
            // eslint-disable-next-line no-useless-return
            return winner;
          } else if (playerTwoCounter === 3) {
            winner = `Winner: ${gameController.getCurrentPlayer().name}`;
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
            winner = `Winner: ${gameController.getCurrentPlayer().name}`;
            // eslint-disable-next-line no-useless-return
            return winner;
          } else if (playerTwoCounter === 3) {
            winner = `Winner: ${gameController.getCurrentPlayer().name}`;
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
      winner = `Winner: ${gameController.getCurrentPlayer().name}`;
      return winner;
    } else if (playerTwoWin.length === 3) {
      winner = `Winner: ${gameController.getCurrentPlayer().name}`;
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
      winner = `Winner: ${gameController.getCurrentPlayer().name}`;
      return winner;
    } else if (playerTwoWin.length === 3) {
      winner = `Winner: ${gameController.getCurrentPlayer().name}`;
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

const gameController = (function () {
  const playerOneName = "Player One";
  const playerTwoName = "Player Two";
  const players = {
    playerOne: {
      name: playerOneName,
      value: "X",
    },
    playerTwo: {
      name: playerTwoName,
      value: "O",
    },
  };

  let currentPlayer = players.playerOne;
  const getCurrentPlayer = () => currentPlayer;

  const switchPlayerTurn = () => {
    if (currentPlayer === players.playerOne) {
      currentPlayer = players.playerTwo;
      console.log(`It's ${getCurrentPlayer().name}'s turn`);
    } else {
      currentPlayer = players.playerOne;
      console.log(`It's ${getCurrentPlayer().name}'s turn`);
    }
  };

  const playRound = (column, row) => {
    let horizontalResult;
    let verticalResult;
    let checkTopLeftToBottomRight;
    let checkBottomLeftToTopRight;
    let tieResult;
    console.log(
      `${
        getCurrentPlayer().name
      } placed his marker on row ${row}, column ${column}`
    );
    gameBoard.addPlayerSelection(column, row, getCurrentPlayer().value);
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

    switchPlayerTurn();
    gameBoard.printGameBoard(row, column);
    /*  switchPlayerTurn(); */
  };

  return { switchPlayerTurn, getCurrentPlayer, playRound };
})();

function displayController() {
  const boardDiv = document.querySelector(".board-container");
  const topBarDiv = document.querySelector(".topBar");
  const mainElement = document.querySelector("main");
  const resetButton = document.createElement("button");

  const gameResultDiv = document.createElement("div");

  const board = gameBoard.getBoard();

  const updateBoard = (roundResult) => {
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
    boardDiv.removeEventListener("click", clickHandler);
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.classList.add("playAgainButton");
    gameResultDiv.classList.add("gameResult");
    gameResultDiv.textContent = roundResult;

    mainElement.prepend(gameResultDiv);
    topBarDiv.append(playAgainButton);
    playAgainButton.addEventListener("click", boardResetHandler);
    topBarDiv.removeChild(resetButton);
  };

  const boardResetListen = () => {
    resetButton.classList.add("resetButton");
    resetButton.textContent = "Reset";
    topBarDiv.appendChild(resetButton);
    resetButton.addEventListener("click", boardResetHandler);
  };

  function boardResetHandler(e) {
    gameResultDiv.textContent = "";
    if (e.target.className === "playAgainButton") {
      e.target.remove();
      mainElement.removeChild(gameResultDiv);
    }

    board.forEach((row) => {
      row.forEach((cell) => {
        cell.removeToken();
      });
    });
    updateBoard();
    boardResetListen();
    boardDiv.addEventListener("click", clickHandler);
  }

  function clickHandler(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (!selectedColumn || !selectedRow) return;

    const roundResult = gameController.playRound(selectedColumn, selectedRow);
    updateBoard();
    if (roundResult) {
      playAgain(roundResult);
    }
  }

  updateBoard();
  boardResetListen();
  boardDiv.addEventListener("click", clickHandler);
}

displayController();

/* gameBoard.printGameBoard(); */

// factory function for Player object
/* const Player = () => {

} */

/* gameBoard.getGameBoard(); */
/* gameController.playRound(); */
