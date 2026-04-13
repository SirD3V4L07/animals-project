const gameBoard = document.querySelector("#gameboard");
let boardArray = [];
let toggle = true;

function createBoard() {
    for (let i = 0; i < 8; i++) {
        boardArray[i] = [];
        for (let j = 0; j < 8; j++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            const square = document.createElement('div');
            square.classList.add('square');
            boardArray[i][j] = square;
            square.dataset.x = j;
            square.dataset.y = i;
            if ((i < 2)||(i > 5)) {
                square.appendChild(piece);
            } 
            gameBoard.append(boardArray[i][j]);
            if (toggle) {
                square.classList.add('even-square');
            } else {
                square.classList.add('odd-square');
            }
            toggle = !toggle;    
        }
        toggle = !toggle;
    };
};


function movePiece(x,y) {
    
    squaresArray[y][x].classList.toggle('highlight');
};

function addPieceBehavior() {
    document.querySelectorAll(".piece").forEach(piece => {
        piece.addEventListener("click", () => {
                     
            
            console.log("Game piece was clicked on x:" + xCoor + " y:" + yCoor + " !");
            
            movePiece(xCoor,yCoor);
           
        });
    
    });
    
};

createBoard();
addPieceBehavior();