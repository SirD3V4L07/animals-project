const gameBoard = document.querySelector("#gameboard");
const piece = '<div class="game-piece"></div>';
let squaresArray = [];
let piecesArray = [
    [piece,piece,piece,piece,piece,piece,piece,piece],
    [piece,piece,piece,piece,piece,piece,piece,piece],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    [piece,piece,piece,piece,piece,piece,piece,piece],
    [piece,piece,piece,piece,piece,piece,piece,piece]
];
let toggle = true;

function createBoard() {
    piecesArray.forEach((row, i) => {
        squaresArray[i] = [];
        piecesArray[i].forEach((cell, j) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.innerHTML = cell;
            square.setAttribute("x", j);
            square.setAttribute("y", i);
            squaresArray[i][j] = square;
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
            squaresArray[yCoor][xCoor].classList.add('highlight');
           
        });
    
    });
    
};

createBoard();
addPieceBehavior();