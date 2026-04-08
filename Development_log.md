27012026: Setup animal table API, fetching animal table to frontend as JSON. Next step, draw styled html table with animals_tb contents!
28012026: Added html database data table, next step is installing dotenv, setting up .env files and change db access password. Then, start building basic website structure with placeholder options.
13032026: Spent 2 hours troubleshooting some API changes because I didn't realize pm2 processes are user-specific and I was restarting the wrong process. GG.
06042026: Little roadmap for the next steps:
    Convert gameboard array to bidimensional array
    Add event listener for click, console log clicked square
    Highlight available squares on clicked square event
    Change position of game piece to clicked square after first click
08042026: We're at step 3 and apparently It's better to use arrays than querying the DOM all the time, so let's redo that part.