// Module (IIFE) 
const gameBoard = (() => {
    const gameBoard = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];


    const getGameBoard = () => {
        // html dom elements
        const boardCells = document.querySelectorAll(".boardCell");
        for (let i = 0; i < boardCells.length; i++) {
            // individual html dom element 
            const boardCell = boardCells[i];
            // individual board object value from board array
            const boardCellValue = gameBoard[i];
            boardCell.textContent = boardCellValue;
        }
    }
    return { getGameBoard };

})();



// factory function for Player object
/* const Player = () => {

} */

gameBoard.getGameBoard();