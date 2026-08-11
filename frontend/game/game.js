const gameBoard = document.querySelector("#gameboard");

function createPiece() {
    return {
        x: null,
        y: null,
        clicked: false,
        player: null
    };
}
let boardArray = 
[[createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece()],
[createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece()],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece()],
[createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece(),createPiece()]];
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

function clearHighlights() {
    document.querySelectorAll(".highlight").forEach(element => {element.classList.remove('highlight')});
}

function clearSelection() {
    selectedPiece.x = null;
    selectedPiece.y = null;
}

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
    const x = Number(piece.dataset.x);
    const y = Number(piece.dataset.y);
    clearHighlights();
    if ((selectedPiece.x != x) || (selectedPiece.y != y)) {
        selectedPiece.x = x;
        selectedPiece.y = y;
        for (let i = y - 1; i <= y + 1; i++) {
            
            for (let j = x - 1; j <= x + 1; j++) {
                
                if (boardArray[i]?.[j] === null) {
                    document.querySelector(`.square[data-y="${i}"][data-x="${j}"]`).classList.add("highlight");
                    console.log("Entered highlight condition");
                }
            }
            
        }
    } else
    //Is this piece being clicked first or clicked again for toggling highlights?
    if ((selectedPiece.x === x) && (selectedPiece.y === y))  {
        //Clicking a selected piece, click will toggle off highlights
        clearHighlights();
        clearSelection();
        console.log("Entered click again condition");
    }
    //Toggle off highlighted squares if clicked second time

}

function clickSquare(square) {
    //Is this square highlighted?
    //Move piece if highlighted
    //Clear highlights if not highlighted
    if (!square.classList.contains('highlight')) {
        clearHighlights();
        clearSelection();
    };
}



createBoard();
addClickBehavior();
