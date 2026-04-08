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
            square.setAttribute("x", j);
            square.setAttribute("y", i);
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
};

function addPieceBehavior() {
    document.querySelectorAll(".game-piece").forEach(piece => {
        piece.addEventListener("click", () => {
            const parent = piece.parentElement;
            const xCoor = parent.getAttribute("x");
            const yCoor = parent.getAttribute("y");
            console.log("Game piece was clicked on x:" + xCoor + " y:" + yCoor + " !");
            /*
            const highlightedSquare = document.querySelector('[x=`${xCoor}`][y="1"]');
            highlightedSquare.classList.add('highlight');
            */
        });
    
    });
    
};

createBoard();
addPieceBehavior();