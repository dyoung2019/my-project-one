# Brainstorm

## Tic-tac-toe

### Features

  - place either O or X on a board
  - figure out if either player (or computer) has won
  - output player has won or lost
  - draw board
  - draw X or O  
  - switch turns between players

### Nice to haves
  - animations
  - cross out matching

## Pseudocode

### 1. Place either O or X on a board
On script load
  1. draw board
  1. add click event listener on each cell 

Event loop
  1. wait for click on board
  1. On click, check whose turns is it now
  1. If player one (e.g. X), then draw X on board
  1. Else if player two turn (e.g. O) then draw O on board  

### 2. Figure out either player (or AI) has won
  1. Do a check for in-a-row matches.
  1. Now check all rows for wins (3x)
  2. Now check all columns for wins (3x)
  3. Now check all diagonals for wins (2x)

### 3. Output player has won or lost
  Say player 1 (user) is X and player 2 is computer

  1. First count looking for a match on the grid
      the number of X and O (i.e. 3 x 3 board => 3 in a row)
      - if found
      -   if equal to  player marks (either X)      report "you win"
      -   else 
        report "you lose"

  Say player 1 (user) is X and player 2 is another user  

  1. First count looking for a match on the grid
      the number of X and O (i.e. 3 x 3 board => 3 in a row)
      - if found
      -   if equal to  player marks (either X)      report "player 1 wins"  
      -   else 
        report "player 2 wins" 

## 4. Draw board

  Layout 9 cells (i.e. 3 x 3) made up of div with different layout to form a grid.

  Board is usually a square.

## 5. Switch turns between players

  1. After __place either O or X on a board__, 
check __Figure out either player (or AI) has won__
  2. Only continue If no one has won (or lost) yet
  3. If previous move was made by player 1 
     - if player 2 is computer, make move
     - if player 2 is another user, prompt move
  4. Else if previous move was made by player 2 (as either user or computer), then prompt player to make move






