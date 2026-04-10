const gameBoard = document.querySelector("#gameboard");
const topPiece = '<div class="top-piece piece"></div>';
const botPiece = '<div class="bot-piece piece"></div>';
let squaresArray = [];
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
        squaresArray[i] = [];
        piecesArray[i].forEach((cell, j) => {
            const square = document.createElement('div');
            square.innerHTML = cell;
            square.classList.add('square');
            square.setAttribute("x", j);
            square.setAttribute("y", i);
            squaresArray[i][j] = square;
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
                     
            /*const yCoor = piecesArray.indexOf(piece);
            const xCoor = yCoor.indexOf(piece);
            const pieceType = piece.classList[0];*/
            console.log("Game piece was clicked on x:" + xCoor + " y:" + yCoor + " !");
            
            movePiece(xCoor,yCoor);
           
        });
    
    });
    
};

createBoard();
addPieceBehavior();