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
            square.dataset.x = j;
            square.dataset.y = i;
            piece.dataset.x = j;
            piece.dataset.y = i;

            //Register initial piece positions
            if (i < 2) {
                boardArray[i][j].player = 'top';
                square.appendChild(piece);
                boardArray[i][j].piece = piece;
            } 
            if (i > 5) {
                boardArray[i][j].player = 'bottom';
                square.appendChild(piece);
                boardArray[i][j].piece = piece;
            }
            
            //Define square styles to make checkered pattern
            if (toggle) {
                square.classList.add('even-square');
            } else {
                square.classList.add('odd-square');
            }
            gameBoard.append(square);
            toggle = !toggle;    
        }
        toggle = !toggle;
    };
};


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

function addPieceBehavior() {
    document.querySelectorAll(".piece").forEach(piece => {
        piece.addEventListener("click", (e) => {
            selectedPiece = e.currentTarget;         
            boardArray[piece.dataset.y][piece.dataset.x].clicked = true;
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

createBoard();
addPieceBehavior();