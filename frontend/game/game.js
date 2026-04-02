const gameBoard = document.querySelector("#gameboard");
const gamePiece = '<div class="game-piece"></div>'
const startPieces = [gamePiece , gamePiece , gamePiece, gamePiece, gamePiece, gamePiece, gamePiece, gamePiece
    , gamePiece, gamePiece, gamePiece, gamePiece, gamePiece, gamePiece, gamePiece, gamePiece
    , '', '', '', '', '', '', '', ''
    , '', '', '', '', '', '', '', ''
    , '', '', '', '', '', '', '', ''
    , '', '', '', '', '', '', '', ''
    , gamePiece , gamePiece , gamePiece, gamePiece, gamePiece, gamePiece, gamePiece, gamePiece
    , gamePiece, gamePiece, gamePiece, gamePiece, gamePiece, gamePiece, gamePiece, gamePiece
];
let toggle = true;

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        gameBoard.append(square);
        square.innerHTML = startPiece;

        if (toggle) {
            square.classList.add('even-square');
        } else {
            square.classList.add('odd-square');
        }

        //Toggle twice at the end of each row to fix alternating colors
        if ((i == 7) ||
            (i == 15) ||
            (i == 23) ||
            (i == 31) ||
            (i == 39) ||
            (i == 47) ||
            (i == 55)) {
            toggle = !toggle;
        }
        toggle = !toggle;
        
    })
}

createBoard();