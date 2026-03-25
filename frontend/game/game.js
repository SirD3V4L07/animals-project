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

function createBoard() {
    startPieces.forEach((startPiece) => {
        const square = document.createElement('div');
        square.classList.add('square');
        gameBoard.append(square);
        square.innerHTML = startPiece;
    })
}

createBoard();