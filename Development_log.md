27012026: Setup animal table API, fetching animal table to frontend as JSON. Next step, draw styled html table with animals_tb contents!
28012026: Added html database data table, next step is installing dotenv, setting up .env files and change db access password. Then, start building basic website structure with placeholder options.
13032026: Spent 2 hours troubleshooting some API changes because I didn't realize pm2 processes are user-specific and I was restarting the wrong process. GG.
06042026: Little roadmap for the next steps:
    Convert gameboard array to bidimensional array
    Add event listener for click, console log clicked square
    Highlight available squares on clicked square event
    Change position of game piece to clicked square after first click
08042026: We're at step 3 and apparently It's better to use arrays than querying the DOM all the time, so let's redo that part.
13042026: At step 4 now. I might still be querying the DOM too much rather than sticking to manipulating the array. Also, I need to clear all highlights when clicking outside active highlights, as well as continuing to move forward after first step. I need to try redoing all logic minimizing DOM queries and using array and properties to check and manipulate states. The DOM should only ever paint the state saved as logic.
27042026: Next session, make it so all squares have click listeners instead if only when they're highlighted, but condition what happens when clicked to only if they're highlighted. If the listener is conditioned, it never gets added before movePiece.
12062026: I will need to populate the array with empty objects, with the pieces as properties, because the pieces cannot be objects themselves because they're DOM elements. I can run the createBoard nearly as is, except populate the starting pieces inside the appropriate cells using boardArray as reference. Then add event listeners to all pieces, which will check surrounding cells for any empty cell that isn't further than 1 cell away. 
25062026: Trying to figure out clearing highlights when clicking empty squares or squares which contain a piece that's currently marked as clicked.
22072026: Starting over the logic, again. I think the key thing I'm missing is checking the array for states, and changing the DOM based on array states, while leaving them completely separate. 
12082026: Initial movement done, next will be:
Set different colors for opposing player pieces
Taking pieces mechanic
    -Highlight enemy pieces if in range (highlight logic) Done
    -Increment score if replaced enemy piece (movePiece logic) Done
Defining win state
    -Analogy to ecosystems and wildlife
    -Each side has 8 resources which must be protected from the enemy
    -Resources are taken when your piece reaches opposing end of board
    -Each end of the board has one resource on each square of the last opposing lane
    -Pieces can be captured
    -The piece that takes a resource is allowed to reproduce 
    -Reproduction adds a life to that piece, or more depending on reproduction rate
    -Each piece may only reproduce once
    -Whoever takes all resources first wins
    -Only herbivores can collect resources, only carnivores can capture, omnivores can do both
    -A carnivore reproduces by capturing pieces rather than resources, and typically reproduces in fewer numbers
    -Each piece has a power level determined by the animal's real life mass and their hunting strategies or defensive strategies, such as group hunting when there are other alike pieces in game
    -Power levels determine whether a piece can take another piece
Defining turns and basic AI opponent
Defining piece types and different movement depending on piece
    -Initial pieces for testing must consist of both carnivores and herbivores
    -Include variety of movement, like land, flying and swimming animals
    -Inlude 2 of each, so 8 different species
    -2 flying carnivores: Buteo and dragonfly
    -2 land carnivores: European wild cat and african wild dog
    -2 flying herbivores: Dawn bat and honey bee
    -2 land herbivores: Chinchilla and desert iguana    
First piece types will not include marine animals, those will be used in specific levels for marine animals.
Changing piece visuals to animal portraits
Improve game AI
Launch prototype for testing and sending to friends
Launch first version of website with coming soon and roadmap etc
Launch v1 of gameplay on website

So development will be:
1) Setting animal pictures from JSON file to facilitate dealing with piece types later (Done)
2) Create the different properties on piece object (Name, diet, reproduction, movement and adaptation level) (Done)
3) Developing the different movement types
4) Create movement function with a switch for each piece type and call the function inside clickPiece
5) Condition capture on carnivore piece property being truthy
6) Create resources and capture resource mechanic
7) Create reproduction mechanic
8) Define win states: All resources taken/All herbivores captured
9) Create AI opponent and turns


Brainstorming movement types:

X different dimensions of movement:
1) Directions
2) Distance (speed)
3) Altitude (does it jump over other pieces?)
4) 