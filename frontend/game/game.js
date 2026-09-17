let boardArray = 
[[createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top")],
[createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top"),createPiece("","top")],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[null,null,null,null,null,null,null,null],
[createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom")],
[createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom"),createPiece("","bottom")]];

let treeRowTop = [createTree(),createTree(),createTree(),createTree(),createTree(),createTree(),createTree(),createTree()];
let treeRowBottom = [createTree(),createTree(),createTree(),createTree(),createTree(),createTree(),createTree(),createTree()];

let selectedPiece = {
    x: null,
    y: null
};

let gameScore = {
    top: 0,
    bottom: 0
};

const gameBoard = document.querySelector("#gameboard");
const animalPicture = document.querySelector("#animal-picture");
const animalName = document.querySelector("#stat-name");
const animalTaxonomy = document.querySelector("#stat-taxonomy");
const animalPower = document.querySelector("#stat-power");
const animalSpeed = document.querySelector("#stat-speed");
const animalDiet = document.querySelector("#stat-diet");




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

function createTree() {
    const tree = {
        eaten: false,
    };

    return tree;
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
    addHoverBehavior();
}

function createBoard() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        const treecell = document.createElement('div');
        treecell.classList.add('treecell');
        treecell.dataset.x = i;
        treecell.dataset.y = -1;
        if (treeRowTop[i].eaten == true) {
            treecell.style.backgroundImage = `url()`;
        }        
        gameBoard.append(treecell);
    }

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
            if ((i + j) % 2 === 0) {
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
        }
    };

    for (let i = 0; i < 8; i++) {
        const treecell = document.createElement('div');
        treecell.classList.add('treecell');
        treecell.dataset.x = i;
        treecell.dataset.y = 8;
        if (treeRowBottom[i].eaten == true) {
            treecell.style.backgroundImage = `url()`;
        }     
        gameBoard.append(treecell);
    }
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

function addHoverBehavior() {
    gameBoard.addEventListener("mouseover", (e) => {
        // Find the piece element being hovered
        const piece = e.target.closest(".piece");
        if (!piece) return;

        const square = piece.closest(".square");
        if (!square) return;

        const xCoor = square.dataset.x;
        const yCoor = square.dataset.y;
        
        const currentAnimal = boardArray[yCoor]?.[xCoor]?.animal;
        if (currentAnimal) {
            animalPicture.style.backgroundImage = `url(${currentAnimal.image})`;
            // Optional: update the rest of your info tile stats on hover
            animalName.innerHTML = currentAnimal.name;
            animalTaxonomy.innerHTML = currentAnimal.scientificName;
            animalPower.innerHTML = currentAnimal.power;
            animalSpeed.innerHTML = currentAnimal.speed;
            animalDiet.innerHTML = currentAnimal.carnivore ? "Carnivore" : "Herbivore";
        }
    });
}
    

function highlightMoves(square,x,y) {
    selectedPiece.x = x;
    selectedPiece.y = y;
    const piece = boardArray[y][x];
    const speed = piece.animal.speed;
    const orthogonal = piece.animal.orthogonal;
    const diagonal = piece.animal.diagonal;
    const flight = piece.animal.flight;

    const orthogonalDirections = [
        [0, -1], // up
        [0, 1],  // down
        [-1, 0], // left
        [1, 0]   // right
    ];

    const diagonalDirections = [
        [-1, -1], // nw
        [1, -1], // ne
        [-1, 1], // sw
        [1, 1] // se
    ];

    let directions = [];

    if (orthogonal) {
        directions.push(...orthogonalDirections);
    }

    if (diagonal) {
        directions.push(...diagonalDirections);
    }


    for (const [dx, dy] of directions) {
        highlightDirection(
            x,
            y,
            dx,
            dy,
            speed,
            flight,
            piece.player,
            piece
        );
    }

}

function highlightDirection(x,y,dx,dy,speed,flight,player,piece) {
    for (let distance = 1; distance <= speed; distance++) {
        const targetX = x + dx * distance;
        const targetY = y + dy * distance;

        const target = boardArray[targetY]?.[targetX];

        // Outside board
        if (target === undefined) {
            break;
        }

        const square = document.querySelector(
            `.square[data-y="${targetY}"][data-x="${targetX}"]`
        );

        // Empty square
        if (target === null) {
            square.classList.add("highlight");
            continue;
        }

        // Enemy piece
        if ((target.player !== player) && (piece.animal.carnivore) && (piece.animal.power > target.animal.power)) {
            square.classList.add("highlight");

            if (!flight) {
                break;
            }

            continue;
        }

        // Friendly piece
        if (!flight) {
            break;
        }
    }
}

function clickPiece(piece) {       
    const square = piece.parentElement;
    const x = Number(square.dataset.x);
    const y = Number(square.dataset.y);
    clearHighlights();
    
    // If clicked on non-currently selected piece, show highlights
    if ((selectedPiece.x != x) || (selectedPiece.y != y)) {
        highlightMoves(square,x,y);
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
    let activePiece = boardArray[selectedPiece.y][selectedPiece.x];
    let clickedSquare = boardArray[square.dataset.y][square.dataset.x];
    if (clickedSquare != null) {
        let point = activePiece.player;
        gameScore[point] += 1;
        console.log(gameScore);
    }

    if ((square.dataset.y == 0) && 
    (activePiece.animal.herbivore == true) &&
    (activePiece.player == "bottom")
        ) {
            treeRowTop[square.dataset.x].eaten = true;
    }

    if ((square.dataset.y == 7) && 
    (activePiece.animal.herbivore == true) &&
    (activePiece.player == "top")
        ) {
            treeRowBottom[square.dataset.x].eaten = true;
    }
    
    boardArray[square.dataset.y][square.dataset.x] = boardArray[selectedPiece.y][selectedPiece.x];
    boardArray[selectedPiece.y][selectedPiece.x] = null;
    
    
    clearHighlights();
    clearSelection();
    createBoard();
    checkWinner();
}

function checkWinner() {
    // Check for harvest win
    let harvestBottom = 0;
    let harvestTop = 0;
    for (let i = 0; i < 8; i++) {
        if (treeRowBottom[i].eaten == true) {
            harvestBottom += 1;
        }
        if (treeRowTop[i].eaten == true) {
            harvestTop += 1;
        }
    }
    if (harvestBottom > 7) {
        announceWinner("top player");
    }
    if (harvestTop > 7) {
        announceWinner("bottom player");
    }
    
    // Check for extinction win
    let aliveHerbivoresTop = 0;
    let aliveHerbivoresBottom = 0;

    for (let i = 0; i < 8; i++) {        
        for (let j = 0; j < 8; j++) {
            if ((boardArray[i][j]?.animal.herbivore) && (boardArray[i][j].player == "top")) {
                aliveHerbivoresTop += 1;
                console.log("Surviving top herbivores: " + aliveHerbivoresTop);
            } else if ((boardArray[i][j]?.animal.herbivore) && (boardArray[i][j].player == "bottom")) {
                aliveHerbivoresBottom += 1;
                console.log("Surviving bottom herbivores: " + aliveHerbivoresBottom);
            }            
        }
    };
    if (aliveHerbivoresTop < 1) {
        announceWinner("bottom player");
    }
    if (aliveHerbivoresBottom < 1) {
        announceWinner("top player");
    }
}

function announceWinner(winner) {
    console.log("The winner is " + winner + "!");
}

main();

