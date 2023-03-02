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


    // Moved to playRound method
    /* gameController.switchPlayerTurn(); */
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
      const onlyPlayerMarkings = currentRow.filter((cell) => cell === "X" || cell === "O");
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


  const diagonalWin = () => {
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
        playerValues.push(currentCell)
      }
    }

    const playerOneWin = playerValues.filter((value => value === "X"));
    const playerTwoWin = playerValues.filter((value => value === "O"));

    if (playerOneWin.length === 3) {
      winner = `Winner: ${gameController.getCurrentPlayer().name}`;
      return winner;
    } else if (playerTwoWin.length === 3) {
      winner = `Winner: ${gameController.getCurrentPlayer().name}`;
      return winner;
    }




  }

  /*  const tieResult = () => {
     const boardCellsWithValues = gameBoard
       .getBoard()
       .map((row) => row.map((cell) => cell.getValue()));
     const onlyZeros = boardCellsWithValues
       .map((row) => row.filter(cellValue => cellValue === 0));
 
   }
  */



  return { horizontalWin, verticalWin, diagonalWin };
})();

// Logic for adding player selections and retrieving player selections
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const removeToken = () => {
    value = 0;
  }

  const getValue = () => value;

  return {
    addToken,
    getValue,
    removeToken
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
    let diagonalResult;
    console.log(
      `${getCurrentPlayer().name
      } placed his marker on row ${row}, column ${column}`
    );
    gameBoard.addPlayerSelection(column, row, getCurrentPlayer().value);
    horizontalResult = checkGameStatus.horizontalWin();
    verticalResult = checkGameStatus.verticalWin();
    diagonalResult = checkGameStatus.diagonalWin();

    if (horizontalResult) {
      return horizontalResult
    } else if (verticalResult) {
      return verticalResult
    } else if (diagonalResult) {
      return diagonalResult
    }

    switchPlayerTurn();
    gameBoard.printGameBoard(row, column);
    /*  switchPlayerTurn(); */
  };

  return { switchPlayerTurn, getCurrentPlayer, playRound };
})();

function displayController() {
  const boardDiv = document.querySelector(".board-container");
  const gameResultDiv = document.querySelector(".gameResult")
  const topBarDiv = document.querySelector(".topBar");
  const board = gameBoard.getBoard();


  const updateBoard = (roundResult) => {
    boardDiv.innerHTML = "";
    gameResultDiv.textContent = roundResult
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

  const boardReset = () => {

    boardDiv.removeEventListener("click", clickHandler);
    const resetButton = document.createElement("button");
    // Change this to play again or create seperate play again button eventually
    resetButton.textContent = "Reset"
    resetButton.classList.add("resetButton");
    topBarDiv.appendChild(resetButton);
    resetButton.addEventListener("click", boardResetHandler)
  }

  function boardResetHandler(e) {
    gameResultDiv.textContent = "";
    e.target.remove();
    board.forEach(row => {
      row.forEach(cell => {
        cell.removeToken();
      })
    })
    updateBoard();
    boardDiv.addEventListener("click", clickHandler);
  }

  function clickHandler(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (!selectedColumn || !selectedRow) return;



    const roundResult = gameController.playRound(selectedColumn, selectedRow);
    updateBoard(roundResult);
    if (roundResult) {
      boardReset();
    }
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
console.log(gameBoard.getBoard()[0].getValue());