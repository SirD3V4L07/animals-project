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