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
let selectedPiece = null;

function createBoard() {
    for (let i = 0; i < 8; i++) {
        
        for (let j = 0; j < 8; j++) {
            
            //Create squares and pieces
            const piece = document.createElement('div');
            piece.classList.add('piece');
            const square = document.createElement('div');
            square.classList.add('square');
            
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

            //Append new elements to board element
            if (boardArray[i][j] != null) {
                square.appendChild(piece);                
            }            
            gameBoard.append(square);
            toggle = !toggle;    
        }
        toggle = !toggle;
    };
};

function refreshBoard() {
     gameBoard.replaceChildren()
    for (let i = 0; i < 8; i++) {
        
        for (let j = 0; j < 8; j++) {
            gameBoard.append(boardArray[i][j]);
            console.log("Refresh trigger");
        }
    }
}

function squareClickHandler() {
    //Deselect current highlights if clicked on empty square
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("click", (e) => { 
            if (square.piece == undefined) {
                //Highlight click behavior
                if (square.classList.contains('highlight')) {
                    for (let i = 0; i < 8; i++) {                    
                        for (let j = 0; j < 8; j++) {
                            if (boardArray[i][j].piece != null && boardArray[i][j].piece.clicked == true) {
                                square.piece = boardArray[i][j].piece;
                                square.piece.clicked = false;
                                boardArray[i][j].piece = "";
                                console.log("Piece move condition triggered");
                                console.log("Empty piece: " + boardArray[i][j].piece);
                                console.log("New piece: " + square.piece);    
                                refreshBoard();                            
                            }
                        }    
                    }
                }   
                //Clean highlights
                for (let i = 0; i < 8; i++) {                    
                    for (let j = 0; j < 8; j++) {
                        if (boardArray[i][j].classList.contains('highlight')) {
                            boardArray[i][j].classList.remove('highlight');   
                            console.log("Square condition trigger");                       
                        }
                    }    
                }
            };    
        });
    });
}

function pieceClickHandler() {
    document.querySelectorAll(".piece").forEach(piece => {
        piece.addEventListener("click", (e) => {    
            let square = boardArray[piece.y][piece.x];
            //Remove previous highlights
            for (let i = 0; i < 8; i++) {                    
                    for (let j = 0; j < 8; j++) {
                        boardArray[i][j].classList.remove('highlight');
                        if (boardArray[i][j].piece != undefined) {
                            boardArray[i][j].piece.clicked = false; 
                        }
                    }    
            }        

            //Check viable moves and highlight them
            if (piece.clicked == false) {
                for (let i = piece.y - 1; i <= piece.y + 1; i++) {
                    for (let j = piece.x - 1; j <= piece.x + 1; j++) {
                        if ((boardArray[i] != undefined) && (boardArray[i][j] != undefined) && (boardArray[i][j].piece == undefined)) {
                            boardArray[i][j].classList.add('highlight'); 
                            piece.clicked = true;
                        }
                    }
                }
            } else {piece.clicked = false};
        }); 
    });
}



createBoard();
squareClickHandler();
pieceClickHandler();