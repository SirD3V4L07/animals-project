const gameBoard = document.querySelector("#gameboard");

function createPiece(player) {
    return {
        x: null,
        y: null,
        player: player
    };
}
let boardArray = 
[[createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top")],
[createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top"),createPiece("top")],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom")],
[createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom"),createPiece("bottom")]];
let toggle = true;
let selectedPiece = {
    x: null,
    y: null
};
let gameScore = {
    top: 0,
    bottom: 0
};

function createBoard() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        
        for (let j = 0; j < 8; j++) {
            
            //Create squares and pieces
            const piece = document.createElement('div');
            piece.classList.add('piece');
        
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
                if (boardArray[i][j].player === "top") {
                    piece.classList.add('top');
                } else {
                    piece.classList.add('bottom');
                }
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
        const square = e.target.closest(".square");

        if (!square) return;

        if (square.classList.contains("highlight")) {
            movePiece(square);
        } else if (e.target.classList.contains("piece")) {
            clickPiece(e.target);
        } else {
            clearHighlights();
            clearSelection();
        }
    });
}

function clickPiece(piece) {       
    const square = piece.parentElement;
    const x = Number(square.dataset.x);
    const y = Number(square.dataset.y);
    clearHighlights();
    if ((selectedPiece.x != x) || (selectedPiece.y != y)) {
        selectedPiece.x = x;
        selectedPiece.y = y;
        for (let i = y - 1; i <= y + 1; i++) {            
            for (let j = x - 1; j <= x + 1; j++) {                
                if ((boardArray[i]?.[j] === null) || (boardArray[i]?.[j]?.player != boardArray[y][x].player)){
                    document.querySelector(`.square[data-y="${i}"][data-x="${j}"]`)?.classList.add("highlight");
                }
            }            
        }
    } else {        
        clearHighlights();
        clearSelection();
    }    
}

function clickSquare(square) {
    if (!square.classList.contains('highlight')) {
        clearHighlights();
        clearSelection();
    } else {
        movePiece(square);
    }
}

function movePiece(square) {
    if (boardArray[square.dataset.y][square.dataset.x] != null) {
        let point = boardArray[selectedPiece.y][selectedPiece.x].player;
        gameScore[point] += 1;
        console.log(gameScore);
    }
    
    boardArray[square.dataset.y][square.dataset.x] = boardArray[selectedPiece.y][selectedPiece.x];
    boardArray[selectedPiece.y][selectedPiece.x] = null;
    
    
    clearHighlights();
    clearSelection();
    createBoard();
}


createBoard();
addClickBehavior();
