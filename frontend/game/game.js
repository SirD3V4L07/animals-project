const gameBoard = document.querySelector("#gameboard");
let boardPiece = {
    x: null,
    y: null,
    clicked: false,
    player: null
};
let boardArray = 
[[boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece],
[boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece],
[boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece,boardPiece]];
let toggle = true;
let selectedPiece = {
    x: null,
    y: null
};

function createBoard() {
    for (let i = 0; i < 8; i++) {
        
        for (let j = 0; j < 8; j++) {
            
            //Create squares and pieces
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.dataset.x = j;
            piece.dataset.y = i;
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.x = j;
            square.dataset.y = i;
            
            //Register initial piece positions
            if (i < 2) {             
                boardArray[i][j].player = 'top';
                boardArray[i][j].x = j;
                boardArray[i][j].y = i;
            } 
            if (i > 5) {
                boardArray[i][j].player = 'bottom';
                boardArray[i][j].x = j;
                boardArray[i][j].y = i;
            }

            //Define square styles to make checkered pattern
            if (toggle) {
                square.classList.add('even-square');
            } else {
                square.classList.add('odd-square');
            }

            //Append squares and piece elements to board element
            if (boardArray[i][j] != null) {
                square.appendChild(piece);                
            }            
            gameBoard.append(square);
            toggle = !toggle;    
        }
        toggle = !toggle;
    };
};

function addClickBehavior() {
    gameBoard.addEventListener("click", (e) => {
        console.log("Entered addClickBehaviour");
        if (e.target.classList.contains("piece")) {
            //Piece click logic
            clickPiece(e.target);
        } else if (e.target.classList.contains("square")) {
            //Square click logic
            clickSquare(e.target);
        }

    });
};

function clickPiece(piece) {
    console.log("Entered clickPiece");
    //Highlight valid squares if clicked first time
    if ((selectedPiece.x == null) && (selectedPiece.y == null)) {
        for (let i = piece.dataset.y - 1; i <= piece.dataset.y + 1; i++) {
            console.log("i: " + i);
            for (let j = piece.dataset.x - 1; j <= piece.dataset.x + 1; j++) {
                console.log("j: " + j);
                if ((boardArray[i] != undefined) && (boardArray[i][j] != undefined) && (boardArray[i][j] == null)) {
                    document.querySelector(`.square[data-x="${j}"][data-y="${i}"]`).classList.add("highlight");
                    console.log("Entered highlight condition");
                }
            }
            
        }
    }
    //Is this piece being clicked first or clicked again for toggling highlights?
    if ((selectedPiece.x == piece.dataset.x) && (selectedPiece.y == piece.dataset.y))  {
        //Clicking a selected piece, click will toggle off highlights
    }
    //Toggle off highlighted squares if clicked second time

}

function clickSquare(square) {
    //Is this square highlighted?
    //Move piece if highlighted
    //Clear highlights if not highlighted
}



createBoard();
addClickBehavior();
