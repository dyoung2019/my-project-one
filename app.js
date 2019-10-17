var cells = document.querySelectorAll(".cell");

// ----------------------------
// JS FUNCTIONS

// If there are no more free spaces (i.e no more possible moves) on the board left then declare (End state : DRAW)
var isGameADraw = function(board) {
  var freeSpaces = 0;

  board.forEach(function(cell) {
    if (cell === ' ') {
      freeSpaces += 1;
    }
  })

  return (freeSpaces === 0);
}

var lookingForMatchInArray = function(segment) {
  var noOfElements = segment.length;
  var noOfCrosses = 0;
  var noOfNoughts = 0;

  for (var i = 0; i < noOfElements; i += 1) {
    if (segment[i] === 'X') {
      // console.log('X found');
      noOfCrosses += 1;
    } else if (segment[i] === 'O') {
      // console.log('O found');
      noOfNoughts += 1;
    }
  }

  var outcome = (noOfCrosses === noOfElements || noOfNoughts === noOfElements);

  var result = {
    wasFound: outcome,
    noOfElements: noOfElements,
    noOfCrosses: noOfCrosses,
    noOfNoughts: noOfNoughts
  };

  return result;
}

var getArrayIndex = function(segmentLength, row, column) {
  var arrayIndex = segmentLength * row + column;
  // console.log(`[${row}][${column}] --> ${arrayIndex}`);
  return arrayIndex
}

var extractSegment = function(board, indices) {
  var segment = [];
  for (var i = 0; i < segmentLength; i += 1) {
    segment.push( board[ indices[i] ] );
  }
  return segment;
}

var performMatchOnBoard = function(board, indices) {
  var segment = extractSegment(board, indices);
  return lookingForMatchInArray(segment);
}

var generateRowIndices = function(offset, segmentLength) {
  var indices = [];
  for (var i = offset; i < segmentLength; i += 1) {
    indices.push(i);
  }
  return indices;
}

var hasFoundMatch = function(count, noOfElements) {
  return count > 0 && count === noOfElements;
}

var evaluateWhichMarkHasWon = function(match) {
  if (hasFoundMatch(match.noOfCrosses,match.noOfElements)) {
    return 'X';
  } else if (hasFoundMatch(match.noOfNoughts, match.noOfElements)) {
    return 'O';
  }
  return null;
} 

var getResultForMatch = function(wasFound, mark, indices) {
  return {
    wasFound: wasFound,
    mark: mark,
    indices: indices,
  }; 
}

var checkAllRowsOnBoard = function(board, segmentLength) {
  for(var i = 0; i < board.length; i += segmentLength) {
    var indices = generateRowIndices(i, segmentLength);
    
    var match = performMatchOnBoard(board, indices);
    if (match.wasFound) {
      var winner = evaluateWhichMarkHasWon(match);
      return getResultForMatch(true, winner, indices);
    }
  }
  // console.log("Match was not found");
  return getResultForMatch(false, null, null);
}

// Next look for matches in all columns for wins (3x)
var checkAllColumnsOnBoard = function(board, segmentLength) {
  // divide board into columns
  for (var column = 0; column < segmentLength; column += 1) {
    var indices = [];
    for (var row = 0; row < segmentLength; row += 1) {
      indices.push(getArrayIndex(segmentLength, row, column));
    }

    // console.table(columnIndexes);
    var match = performMatchOnBoard(board, indices);
    if (match.wasFound) {
      var winner = evaluateWhichMarkHasWon(match);
      return getResultForMatch(true, winner, indices);
    }
  }
  // console.log("column match was not found");
  return getResultForMatch(false, null, null);
}

// Now check all diagonals for wins (2x)

// var board_3 = [ 'X', 'O', 'O', 'X', 'O', 'X', ' ', ' ', ' ']
  
// forward slash / Bottom Left -> Top Right
var generateForwardDiagonalIndices = function(segmentLength) {
  var columnIndexes = [ ];

  var row = segmentLength - 1;
  var column = 0;

  var count = 0;
  while (count < segmentLength) {
    columnIndexes.push( getArrayIndex(segmentLength, row, column) );
    // up one
    row -= 1;
    // right one
    column += 1;
    count += 1;
  }

  return columnIndexes;
}

// back slash \ Top Left -> Bottom Right
var generateBackwardDiagonalIndices = function(segmentLength) {
  var columnIndexes = [ ];

  // Top Left 
  var row = 0;
  var column = 0;

  var count = 0;
  while (count < segmentLength) {
    columnIndexes.push( getArrayIndex(segmentLength, row, column) );
    // down one
    row += 1;
    // right one
    column += 1;
    count += 1;
  }

  return columnIndexes;
}

var checkAllDiagonalsOnBoard = function(board, segmentLength) {
  var forwardDiagonal = generateForwardDiagonalIndices(segmentLength);
  var forwardMatch = performMatchOnBoard(board, forwardDiagonal);
  if (forwardMatch.wasFound) {
    // console.log("Forward Diagonal was found");
    var winner = evaluateWhichMarkHasWon(forwardMatch);
    return getResultForMatch(true, winner, forwardDiagonal);
  }

  // console.log(forwardSegment); // -> (3) [ 'O', ' ', 'O' ]
  var backwardDiagonal = generateBackwardDiagonalIndices(segmentLength);
  var backwardMatch = performMatchOnBoard(board, backwardDiagonal);
  if (backwardMatch.wasFound) {
    // console.log("Backward Diagonal was found");
    var winner = evaluateWhichMarkHasWon(backwardMatch);
    return getResultForMatch(true, winner, backwardDiagonal);
  }

  // console.log("Diagonal was not found");
  return getResultForMatch(false, null, null);
}

var checkBoardForWinner = function(board, segmentLength) {
  var rowMatch = checkAllRowsOnBoard(board, segmentLength);
  if (rowMatch.wasFound) {
    return rowMatch;
  }

  var columnMatch = checkAllColumnsOnBoard(board, segmentLength); // -> no win
  if (columnMatch.wasFound) {
    return columnMatch;
  }

  var diagMatch = checkAllDiagonalsOnBoard(board, segmentLength);
  if (diagMatch.wasFound) {
    return diagMatch;
  }

  return getResultForMatch(false, null, null);
}

// console.log(generateForwardDiagonalIndices(3)); // --> (3) [ 6, 4, 2 ]
// console.log(generateForwardDiagonalIndices(4)); // --> (4) [ 12, 9, 6, 3 ]

// console.log(generateBackwardDiagonalIndices(3)); // --> (3) [ 0, 4, 8 ]
// console.log(generateBackwardDiagonalIndices(4)); // --> (4) [ 0, 5, 10, 15 ]



  // // pick array into segment
  // var segment = [];
  // for (var i = 0; i < segmentLength; i += 1) {
  //   segment.push( board[ columnIndexes[i] ] );
  // }

  // var match = lookingForMatch(segment);
  // if (match.wasFound) {
  //   console.log("Column Match was FOUND");
  //   return true;
  // }
  


// TODO : where does the win come from

// var testFound = function(result) {
//   if (result.wasMatchFound) {
//     console.log("WIN / LOST FOUND");
//   } else {
//     console.log("NOTHING FOUND")
//   } 

//   return result.wasMatchFound;
// }
// var result0 = lookingForMatch([ 'X', 'X', 'X']) // --> win / lost
// testFound(result0);

// var result1 = lookingForMatch([ 'X', 'O', 'X']) // --> nothing
// testFound(result1);

// var result2 = lookingForMatch([ 'O', 'O', 'O']) // --> win
// testFound(result2);

// var result3 = lookingForMatch([ ' ', 'O', 'O']) // --> nothing
// testFound(result3);

// var emptyBoard = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

// var xboard = [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
// var oboard = [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']

// var segmentLength = 3;
// var spaceboard = [ ' ', 'O', 'O', 'O', ' ', 'O', 'O', 'O', ' ']
// console.log(`checkAllRowsOnBoard(spaceboard) -->`);
// console.log(checkAllRowsOnBoard(spaceboard, segmentLength)); // --> false
// console.log(`checkAllRowsOnBoard(xboard) --> `);
// console.log(checkAllRowsOnBoard(xboard, segmentLength)); // --> true
// console.log(`checkAllRowsOnBoard(oboard) --> `);
// console.log(checkAllRowsOnBoard(oboard, segmentLength)); // --> true

// // var board_3 = [ 'X', 'O', 'O', 'X', 'O', 'X', ' ', ' ', ' ']
// console.log(`checkAllColumnsOnBoard(emptyBoard) -->`);
// console.log(checkAllColumnsOnBoard(emptyBoard, segmentLength)); // -> no match
// console.log(`checkAllColumnsOnBoard(xboard) -->`);
// console.log(checkAllColumnsOnBoard(xboard, segmentLength)); // -> match
// console.log(`checkAllColumnsOnBoard(oboard) -->`);
// console.log(checkAllColumnsOnBoard(oboard, segmentLength)); // -> match


// console.log(`checkAllDiagonalsOnBoard(emptyBoard) -->`); 
// console.log(checkAllDiagonalsOnBoard(emptyBoard, segmentLength)); // -->  false;
// var board = [ 'X', 'O', 'O', 'X', ' ', 'X', 'O', ' ', 'X']
// console.log(`checkAllDiagonalsOnBoard(board) -->`);
// console.log(checkAllDiagonalsOnBoard(board, segmentLength)); // -->  false;
// var board_2 = [ 'X', 'O', 'O', 'X', 'X', 'X', 'O', ' ', 'X']
// console.log(`checkAllDiagonalsOnBoard(board_2) -->`);
// console.log(checkAllDiagonalsOnBoard(board_2, segmentLength)); // -->  true;  \ bk slash
// var board_3 = [ 'X', 'O', 'O', 'X', 'O', 'X', 'O', ' ', 'X'];
// console.log(`checkAllDiagonalsOnBoard(board_3) --`);
// console.log(checkAllDiagonalsOnBoard(board_3, segmentLength)); // -->  true; / fwd slash


var emptyBoard = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

var figureOutIfGameHasEnded = function(board, segmentLength) {
  // Get game state for the current board
  // Do a check for in-a-row matches; if match found, stop game and declare (End state: WIN OR LOSE)
  // First look for matches in all rows for wins (3x)
  // Next look for matches in all columns for wins (3x)
  // Now check all diagonals for wins (2x)
  // If there are no more free spaces (i.e no more possible moves) on the board left then declare (End state : DRAW)
  // Else continue game

  var winner = checkBoardForWinner(board, segmentLength);

  if (winner.wasFound) {
    console.log(`STOP GAME WINNER : ${winner.mark}`);
  } else if (isGameADraw(board)) {
    console.log("ITS A DRAW");
  } else {
    console.log("CARRY ON");
  }
}

// figureOutIfGameHasEnded(emptyBoard, segmentLength); // --> false

// var xboard = [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
// figureOutIfGameHasEnded(xboard, segmentLength); // --> true / win

// var drawnGame = [ 'O', 'X', 'O', ' O', 'X', 'O', 'X', 'O', 'X']
// figureOutIfGameHasEnded(drawnGame, segmentLength); // --> true / draw

// Event loop
// - Wait for click on board  
//   - On click, check whose turns is it is next (either O or X)
//   - If spot is occupied, ignore change; Current player is still able to pick another spot
//   - If the user can select an unoccupied space on the board
//   - If player one (e.g. X), then draw X on the spot
//   on the board
//   - Else if player two turn (e.g. O) then draw O on the spot on the board 
//   - If the game has ended due to win/lost/draw (_Figure out either player has won_), alert players of the result;
//   - Otherwise alternate mark to other team (e.g. X -> O or O -> X)
//   - Else Prompt other player turn;

// global variables

var segmentLength = 3;
var playerMark = 'X';

var handleClick = function(event) {
  var elem = event.target;

  // get data index for cell

  // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  console.log(`Cell index :  ${elem.dataset.cellIndex}`)
  
  if (elem.dataset.cellValue === undefined) {
    elem.classList.remove('empty-cell');

    if (playerMark === 'X') {
      elem.classList.add('cross');
      elem.dataset.cellValue = "X";
      elem.textContent = 'X';

      playerMark = 'O';

    } else if (playerMark === 'O') {
      elem.classList.add('nought');
      elem.dataset.cellValue = "O";
      elem.textContent = 'O';  

      playerMark = 'X';
    }
  }

  var gameBoard = [];

  // Extract game mode
  cells.forEach(function(cell) { 
    var cellValue = cell.dataset.cellValue;

    if (cellValue === undefined) {
      cellValue = ' ';
    }

    gameBoard.push(cellValue);
  })

  console.log(gameBoard)

  figureOutIfGameHasEnded(gameBoard, segmentLength);
}

// On script load
//   - Add click event listener on each cell 

cells.forEach(function(cell) {
  cell.addEventListener('click', handleClick);
})
