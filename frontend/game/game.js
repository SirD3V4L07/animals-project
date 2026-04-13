const gameBoard = document.querySelector("#gameboard");
const topPiece = '<div class="top-piece piece"></div>';
const botPiece = '<div class="bot-piece piece"></div>';
let boardArray = [];
let piecesArray = [
    [topPiece,topPiece,topPiece,topPiece,topPiece,topPiece,topPiece,topPiece],
    [topPiece,topPiece,topPiece,topPiece,topPiece,topPiece,topPiece,topPiece],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    [botPiece,botPiece,botPiece,botPiece,botPiece,botPiece,botPiece,botPiece],
    [botPiece,botPiece,botPiece,botPiece,botPiece,botPiece,botPiece,botPiece]
];
let toggle = true;

function createBoard() {
    piecesArray.forEach((row, i) => {
        boardArray[i] = [];
        piecesArray[i].forEach((cell, j) => {
            const square = document.createElement('div');
            square.innerHTML = cell;
            square.classList.add('square');
            squaresArray[i][j] = square;
            squaresArray[i][j].x = j;
            squaresArray[i][j].y = i;
            gameBoard.append(squaresArray[i][j]);
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