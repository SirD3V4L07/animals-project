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
    gameBoard.innerHTML = "";
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

            //Define square styles to make checkered pattern
            if (toggle) {
                square.classList.add('even-square');
            } else {
                square.classList.add('odd-square');
            }

            //Append squares and piece elements to board element
            if (boardArray[i][j] != null) {
                boardArray[i][j].x = j;
                boardArray[i][j].y = i;
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

function refreshBoard() {

}

function addClickBehavior() {
    gameBoard.addEventListener("click", (e) => {        
        if (e.target.classList.contains("piece")) {            
            clickPiece(e.target);
        } else if (e.target.classList.contains("square")) {            
            clickSquare(e.target);
        }

    });
};

function clickPiece(piece) {       
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
                }
            }            
        }
    } else {        
        clearHighlights();
        clearSelection();
        console.log("Entered click again condition");
    }    
}

function clickSquare(square) {
    if (!square.classList.contains('highlight')) {
        clearHighlights();
        clearSelection();
    } else {
        //Logic for clicking a highlighted square
        movePiece(square);
    }
}

function movePiece(square) {
    boardArray[square.dataset.y][square.dataset.x] = boardArray[selectedPiece.y][selectedPiece.x];
    boardArray[selectedPiece.y][selectedPiece.x] = null;
    clearHighlights();
    clearSelection();
    createBoard();
}


createBoard();
addClickBehavior();
