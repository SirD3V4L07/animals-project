const gameBoard = document.querySelector("#gameboard");
const gamePiece = '<div class="game-piece"></div>'

let boardArray = [
    [gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece],
    [gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    [gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece],
    [gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece,gamePiece]
];
let toggle = true;

function createBoard() {
    boardArray.forEach((row, i) => {
        boardArray[i].forEach((cell, j) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.innerHTML = cell;
            gameBoard.append(square);
            if (toggle) {
                square.classList.add('even-square');
            } else {
                square.classList.add('odd-square');
            }
            toggle = !toggle;
        });
        toggle = !toggle;
    });
    
}

createBoard();