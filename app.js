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

    const addPlayerSelection = (row, column, player) => {
        /* const boardCellsWithValues = board.map((row) => row.map((cell) => cell.getValue())); */
        const selectedRowArray = board[row];
        console.log(selectedRowArray);
        const boardCellsWithValues = selectedRowArray.map((cell) => cell.getValue());
        // Check if board spot is taken
        if (!(boardCellsWithValues[column] === 0)) {
            return
        }

        console.log(boardCellsWithValues[column]);
        board[row][column].addToken(player)
    }
    const printGameBoard = () => {
        const boardCellsWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardCellsWithValues);
    }


    /*  const getGameBoard = () => {
         // html dom elements
         const boardCells = document.querySelectorAll(".boardCell");
         for (let i = 0; i < boardCells.length; i++) {
             // individual html dom element 
             const boardCell = boardCells[i];
             // individual board object value from board array
             const boardCellValue = gameBoard[i];
             boardCell.textContent = boardCellValue;
         }
     } */

    return {/*  getGameBoard */ printGameBoard, addPlayerSelection, getBoard };

})();



// Logic for adding player selections and retrieving player selections
function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}




const gameController = (() => {

    const playerOneName = "Player One";
    const playerTwoName = "Player Two";
    const players = {
        playerOne: {
            name: playerOneName,
            value: "X"
        },
        playerTwo: {
            name: playerTwoName,
            value: "O"
        }
    }


    let currentPlayer = players.playerOne;
    const getCurrentPlayer = () => currentPlayer;

    const switchPlayerTurn = () => {
        if (currentPlayer === players.playerOne) {
            currentPlayer = players.playerTwo;
        } else {
            currentPlayer = players.playerOne;
        }
    }

    const playRound = (column, row) => {
        console.log(`${getCurrentPlayer().name} placed his marker on row ${row}, column ${column}`)
        gameBoard.addPlayerSelection(column, row, getCurrentPlayer().value);
        gameBoard.printGameBoard();
        switchPlayerTurn();
    }


    return { switchPlayerTurn, getCurrentPlayer, playRound }
})();

gameBoard.printGameBoard();

// factory function for Player object
/* const Player = () => {

} */


/* gameBoard.getGameBoard(); */
/* gameController.playRound(); */