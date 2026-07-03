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
            boardArray[i][j] = square;
            boardArray[i][j].x = j;
            boardArray[i][j].y = i;
            
            //Register initial piece positions
            if (i < 2) {
                boardArray[i][j].piece = piece;                
                boardArray[i][j].piece.player = 'top';
                boardArray[i][j].piece.clicked = false;
                boardArray[i][j].piece.x = j;
                boardArray[i][j].piece.y = i;
            } 
            if (i > 5) {
                boardArray[i][j].piece = piece;                
                boardArray[i][j].piece.player = 'bottom';
                boardArray[i][j].piece.clicked = false;
                boardArray[i][j].piece.x = j;
                boardArray[i][j].piece.y = i;
            }
            

            if (boardArray[i][j].piece != null) {
                square.appendChild(boardArray[i][j].piece);                
            }

            //Define square styles to make checkered pattern
            if (toggle) {
                square.classList.add('even-square');
            } else {
                square.classList.add('odd-square');
            }
            
            gameBoard.append(boardArray[i][j]);
            toggle = !toggle;    
        }
        toggle = !toggle;
    };
};




createBoard();


//Deselect current highlights if clicked on empty square
document.querySelectorAll(".square").forEach(square => {
    square.addEventListener("click", (e) => { 
        if (square.piece == undefined) {
            for (let i = 0; i < 8; i++) {                    
                for (let j = 0; j < 8; j++) {
                    if (boardArray[i][j].classList.contains('highlight')) {
                        boardArray[i][j].classList.remove('highlight');   
                        console.log("Square condition trigger");                       
                    }
                }    
            }   
        }     
    });
});

document.querySelectorAll(".piece").forEach(piece => {
    piece.addEventListener("click", (e) => {    
        let square = boardArray[piece.y][piece.x];
        //Remove previous highlights
        for (let i = 0; i < 8; i++) {                    
                for (let j = 0; j < 8; j++) {
                    boardArray[i][j].classList.remove('highlight');
                    
                    if (boardArray[i][j].piece != undefined) {
                        boardArray[i][j].piece.clicked = false;
                        console.log("Current piece click condition: " + boardArray[i][j].piece.clicked); 
                    }
                    console.log("Piece clean condition trigger."); 
                }    
        }        
        

        //Check viable moves and highlight them
        if (piece.clicked == false) {
            for (let i = piece.y - 1; i <= piece.y + 1; i++) {
                for (let j = piece.x - 1; j <= piece.x + 1; j++) {
                    if ((boardArray[i] != undefined) && (boardArray[i][j] != undefined) && (boardArray[i][j].piece == undefined)) {
                        boardArray[i][j].classList.add('highlight');
                        console.log("Piece highlight condition trigger"); 
                        piece.clicked = true;
                    }
                }
            }
        } else {piece.clicked = false};

        
        
    }); 
});

