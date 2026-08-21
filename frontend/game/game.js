let boardArray = 
[[createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top")],
[createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top")],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom")],
[createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom")]];

let toggle = true;

let selectedPiece = {
    x: null,
    y: null
};

let gameScore = {
    top: 0,
    bottom: 0
};

const gameBoard = document.querySelector("#gameboard");

async function loadAnimal(id) {
    const response = await fetch(`/backend/data/${id}.json`);

    if (!response.ok) {
        throw new Error(`Could not load animal: ${id}`);
    }

    return await response.json();
}

function createPiece(animal, player) {
    const piece = {
        animal: animal,
        player: player
    };

    return piece;
}

async function setAnimals() {
    const buteo = await loadAnimal("buteo-buteo");
    const agrioptera = await loadAnimal("agrioptera-insignis");
    const mellifera = await loadAnimal("apis-mellifera");
    const chinchilla = await loadAnimal("chinchilla-lanigera");
    const dipsosaurus = await loadAnimal("dipsosaurus-dorsalis");
    const eonycteris = await loadAnimal("eonycteris-spelaea");
    const felis = await loadAnimal("felis-silvestris");
    const lycaon = await loadAnimal("lycaon-pictus");

    boardArray[0][0] = createPiece(buteo, "top");
    boardArray[0][7] = createPiece(buteo, "top");
    boardArray[7][0] = createPiece(buteo, "bottom");
    boardArray[7][7] = createPiece(buteo, "bottom");

    boardArray[0][1] = createPiece(agrioptera, "top");
    boardArray[0][6] = createPiece(agrioptera, "top");
    boardArray[7][1] = createPiece(agrioptera, "bottom");
    boardArray[7][6] = createPiece(agrioptera, "bottom");

    boardArray[0][2] = createPiece(mellifera, "top");
    boardArray[0][5] = createPiece(mellifera, "top");
    boardArray[7][2] = createPiece(mellifera, "bottom");
    boardArray[7][5] = createPiece(mellifera, "bottom");

    boardArray[0][3] = createPiece(eonycteris, "top");
    boardArray[0][4] = createPiece(eonycteris, "top");
    boardArray[7][3] = createPiece(eonycteris, "bottom");
    boardArray[7][4] = createPiece(eonycteris, "bottom");

    boardArray[1][0] = createPiece(chinchilla, "top");
    boardArray[1][7] = createPiece(chinchilla, "top");
    boardArray[6][0] = createPiece(chinchilla, "bottom");
    boardArray[6][7] = createPiece(chinchilla, "bottom");

    boardArray[1][1] = createPiece(dipsosaurus, "top");
    boardArray[1][6] = createPiece(dipsosaurus, "top");
    boardArray[6][1] = createPiece(dipsosaurus, "bottom");
    boardArray[6][6] = createPiece(dipsosaurus, "bottom");

    boardArray[1][2] = createPiece(felis, "top");
    boardArray[1][5] = createPiece(felis, "top");
    boardArray[6][2] = createPiece(felis, "bottom");
    boardArray[6][5] = createPiece(felis, "bottom");

    boardArray[1][3] = createPiece(lycaon, "top");
    boardArray[1][4] = createPiece(lycaon, "top");
    boardArray[6][3] = createPiece(lycaon, "bottom");
    boardArray[6][4] = createPiece(lycaon, "bottom");
}

async function main() {
    
    await setAnimals();
    createBoard();
    addClickBehavior();
}

function createBoard() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        
        for (let j = 0; j < 8; j++) {
            const currentSquare = boardArray[i][j];
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
            
            if (currentSquare != null) {
                currentSquare.x = j;
                currentSquare.y = i;
                if (currentSquare.player === "top") {
                    piece.classList.add('top');
                } else {
                    piece.classList.add('bottom');
                }
                if (currentSquare.animal) {
                    piece.style.backgroundImage = `url(${currentSquare.animal.image})`;
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

main();

