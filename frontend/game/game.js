const gameBoard = document.querySelector("#gameboard");
let {} = {
    xCoordinate: null,
    yCoordinate: null,
    player: null,
    highlight: false,
    piece: null
};
let boardArray = 
[[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}],
[{},{},{},{},{},{},{},{}]];
let toggle = true;
let selectedPiece = null;

function createBoard() {
    for (let i = 0; i < 8; i++) {
        
        for (let j = 0; j < 8; j++) {
            
            //Create squares and pieces
            const piece = document.createElement('div');
            piece.classList.add('piece');
            const square = document.createElement('div');
            square.classList.add('square');
            boardArray[i][j] = square;
            boardArray[i][j].x = j;
            boardArray[i][j].y = i;
            
            //Register initial piece positions
            if (i < 2) {
                boardArray[i][j].piece = piece;                
                boardArray[i][j].piece.player = 'top';
                boardArray[i][j].piece.x = j;
                boardArray[i][j].piece.y = i;
            } 
            if (i > 5) {
                boardArray[i][j].piece = piece;                
                boardArray[i][j].piece.player = 'bottom';
                boardArray[i][j].piece.x = j;
                boardArray[i][j].piece.y = i;
            }

            if (boardArray[i][j].piece != null) {
                square.appendChild(boardArray[i][j].piece);                
            }

            //Define square styles to make checkered pattern
            if (toggle) {
                square.classList.add('even-square');
            } else {
                square.classList.add('odd-square');
            }
            
            gameBoard.append(boardArray[i][j]);
            toggle = !toggle;    
        }
        toggle = !toggle;
    };
};

/*
function movePiece(x,y,piece) {
    let validSquareY = 0;
    document.querySelectorAll(".highlight").forEach(square => {
        square.classList.remove("highlight");
    });
    if (piece.dataset.player == 'top') {
         validSquareY = y + 1;
    } else if (piece.dataset.player == 'bottom') {
         validSquareY = y - 1;
    };
    boardArray[validSquareY][x].classList.add('highlight');
};
*/

/*
function addPieceBehavior() {
    document.querySelectorAll(".piece").forEach(piece => {
        piece.addEventListener("click", (e) => {
            selectedPiece = e.currentTarget;         
            boardArray[piece.dataset.y][piece.dataset.x].piece.clicked = true;
            piece.dataset.clicked = true;
            let x = Number(e.currentTarget.dataset.x);
            let y = Number(e.currentTarget.dataset.y);
        });
    });
    
    document.querySelectorAll(".highlight").forEach(square => {
                square.addEventListener("click", (e) => {
                    e.currentTarget.classList.remove('highlight');
                    e.currentTarget.appendChild(selectedPiece);
        });
    });
};
*/

function checkMoves() {
    //boardArray[currentPosition + 1][currentPosition];
};

createBoard();

document.querySelectorAll(".piece").forEach(piece => {
        piece.addEventListener("click", (e) => {    
            piece.clicked = true;
            let square = boardArray[piece.y][piece.x];
            //Pass current square and piece to function which will check viable moves
            for (let i = piece.y - 1; i <= piece.y + 1; i++) {
                for (let j = piece.x - 1; j <= piece.x + 1; j++) {
                    if ((boardArray[i][j] != undefined) && (boardArray[i][j].piece == undefined)) {
                        console.log("Hello");
                        boardArray[i][j].classList.toggle('highlight');
                    }
                }
            }
        });
    });