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
    /* const boardCellsWithValues = board.map((row) => row.map((cell) => cell.getValue())); */
    const selectedRowArray = board[row];
    console.log(selectedRowArray);
    const rowCellsWithValues = selectedRowArray.map((cell) => cell.getValue());
    // Check if board spot is taken
    if (!(rowCellsWithValues[column] === 0)) {
      return;
    }

    gameController.switchPlayerTurn();
    /* console.log(boardCellsWithValues[column]); */
    board[row][column].addToken(player);
  };

  const printGameBoard = (row, column, cell) => {
    let boardCellsWithValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardCellsWithValues);
    /*  console.log(boardCellsWithValues.map(row => row[column])); */
    /*  console.log(board.map(row => row[1].getValue())); */
    for (let i = 0; i < board.length; i++) {
      const test = board.map((row) => row[i].getValue());
      console.log(test);
    }
  };

  /*    const boardCellsWithValues = board.map((row) => row.map((cell) => cell.getValue())); */

  return { printGameBoard, addPlayerSelection, getBoard };
})();

const checkForWin = (function () {
  // Checking for horizontal (row) win
  const horizontalWin = () => {
    const boardCellsWithValues = gameBoard
      .getBoard()
      .map((row) => row.map((cell) => cell.getValue()));
    boardCellsWithValues.forEach((row) => {
      let playerOneCounter = 0;
      let playerTwoCounter = 0;
      const horizontalWin = row.filter((cell) => cell === "X" || cell === "O");
      if (horizontalWin.length) {
        row.forEach((cell) => {
          cell === "X"
            ? playerOneCounter++
            : cell === "O"
            ? playerTwoCounter++
            : null;
          if (playerOneCounter === 3) {
            console.log("Player One Wins");
            // eslint-disable-next-line no-useless-return
            return;
          } else if (playerTwoCounter === 3) {
            console.log("Player Two Wins");
            // eslint-disable-next-line no-useless-return
            return;
          }
        });
      }
    });
  };

  const verticalWin = () => {
    let playerOneCounter = 0;
    let playerTwoCounter = 0;
    let winner;
    for (let i = 0; i < gameBoard.getBoard().length; i++) {
      const currentColumn = gameBoard
        .getBoard()
        .map((row) => row[i].getValue());
      const onlyPlayerMarkings = currentColumn.filter(
        (cell) => cell === "X" || cell === "O"
      );
      for (let j = 0; j < currentColumn.length; j++) {
        const currentCell = currentColumn[j];
        if (onlyPlayerMarkings.length) {
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

  return { horizontalWin, verticalWin };
})();

// Logic for adding player selections and retrieving player selections
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
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
    let winResult;
    console.log(
      `${
        getCurrentPlayer().name
      } placed his marker on row ${row}, column ${column}`
    );
    gameBoard.addPlayerSelection(column, row, getCurrentPlayer().value);
    winResult = checkForWin.horizontalWin();

    if (!winResult) {
      winResult = checkForWin.verticalWin();
    }
    console.log(winResult);
    gameBoard.printGameBoard(row, column);
    /*  switchPlayerTurn(); */
  };

  return { switchPlayerTurn, getCurrentPlayer, playRound };
})();

function displayController() {
  const boardDiv = document.querySelector(".board-container");

  const board = gameBoard.getBoard();

  const updateBoard = () => {
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

  function clickHandler(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (!selectedColumn || !selectedRow) return;

    gameController.playRound(selectedColumn, selectedRow);
    updateBoard();
  }

  updateBoard();
  boardDiv.addEventListener("click", clickHandler);
}

displayController();

/* gameBoard.printGameBoard(); */

// factory function for Player object
/* const Player = () => {

} */

/* gameBoard.getGameBoard(); */
/* gameController.playRound(); */
