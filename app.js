console.log('hello')

// 2. Figure out either player (or AI) has won

// ALSO CHECK for draw

// Get game state for the current board
// Do a check for in-a-row matches; if match found, stop game and declare (End state: WIN OR LOSE)
// First look for matches in all rows for wins (3x)
// Next look for matches in all columns for wins (3x)
// Now check all diagonals for wins (2x)
// If there are no more free spaces (i.e no more possible moves) on the board left then declare (End state : DRAW)
// Else continue game

var emptyBoard = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

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

// console.log(isGameADraw(emptyBoard));

var xboard = [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
var oboard = [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']

// console.log(isGameADraw(xboard));

// First look for matches in all rows for wins (3x)

var lookingForMatch = function(segment) {
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

var testFound = function(result) {
  if (result.wasMatchFound) {
    console.log("WIN / LOST FOUND");
  } else {
    console.log("NOTHING FOUND")
  } 

  return result.wasMatchFound;
}

var checkAllRows = function(board, segmentLength) {
  for(var i = 0; i < board.length; i += segmentLength) {
    var segment = board.slice(i, i + segmentLength);
    var match = lookingForMatch(segment);

    if (match.wasFound) {
      console.log("Match was found");
      return true;
    }
  }
  console.log("Match was not found");
  return false;
}

// divide board in rows 
var segmentLength = 3;
// var spaceboard = [ ' ', 'O', 'O', 'O', ' ', 'O', 'O', 'O', ' ']
// checkAllRows(spaceboard, segmentLength); // --> false
// checkAllRows(xboard, segmentLength); // --> true
// checkAllRows(oboard, segmentLength); // --> true

// var board_3 = [ 'X', 'O', 'O', 'X', 'O', 'X', ' ', ' ', ' ']
// checkAllColumns(xboard, segmentLength); // -> win
// checkAllColumns(oboard, segmentLength) // -> win

// Next look for matches in all columns for wins (3x)

var extractSegment = function(board, indices) {
  var segment = [];
  for (var i = 0; i < segmentLength; i += 1) {
    segment.push( board[ indices[i] ] );
  }
  return segment;
}

var checkAllColumns = function(board, segmentLength) {
  // divide board into columns
  for (var column = 0; column < segmentLength; column += 1) {
    var columnIndexes = [];
    for (var row = 0; row < segmentLength; row += 1) {
      columnIndexes.push(segmentLength * row + column);
    }
    // console.table(columnIndexes);

    var segment = extractSegment(board, columnIndexes);

    var match = lookingForMatch(segment);
    if (match.wasFound) {
      console.log("Column Match was FOUND");
      return true;
    }
  }
  console.log("column match was not found");
  return false;
}

var checkBoardForWins = function(board, segmentLength) {
  checkAllRows(board, segmentLength);
  checkAllColumns(board, segmentLength); // -> no win
}

// Now check all diagonals for wins (2x)

var getArrayIndex = function(segmentLength, row, column) {
  var arrayIndex = segmentLength * row + column;
  // console.log(`[${row}][${column}] --> ${arrayIndex}`);
  return arrayIndex
}

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

var performDiagonalMatch = function(board, indices) {
  var forwardSegment = extractSegment(board, indices);
  return lookingForMatch(forwardSegment);
}

var checkDiagonals = function(board, segmentLength) {
  var forwardDiagonal = generateForwardDiagonalIndices(segmentLength);
  var forwardMatch = performDiagonalMatch(board, forwardDiagonal);
  if (forwardMatch.wasFound) {
    console.log("Forward Diagonal was found");
    return true;
  }

  // console.log(forwardSegment); // -> (3) [ 'O', ' ', 'O' ]
  var backwardDiagonal = generateBackwardDiagonalIndices(segmentLength);
  var backwardMatch = performDiagonalMatch(board, backwardDiagonal);
  if (backwardMatch.wasFound) {
    console.log("Backward Diagonal was found");
    return true;
  }

  console.log("Diagonal was not found");
  return false;
}

var board = [ 'X', 'O', 'O', 'X', ' ', 'X', 'O', ' ', 'X']
console.log(checkDiagonals(board, segmentLength)); // -->  false;
var board_2 = [ 'X', 'O', 'O', 'X', 'X', 'X', 'O', ' ', 'X']
console.log(checkDiagonals(board_2, segmentLength)); // -->  true;  \ bk slash
var board_3 = [ 'X', 'O', 'O', 'X', 'O', 'X', 'O', ' ', 'X']
console.log(checkDiagonals(board_3, segmentLength)); // -->  true; / fwd slash

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

// var result0 = lookingForMatch([ 'X', 'X', 'X']) // --> win / lost
// testFound(result0);

// var result1 = lookingForMatch([ 'X', 'O', 'X']) // --> nothing
// testFound(result1);

// var result2 = lookingForMatch([ 'O', 'O', 'O']) // --> win
// testFound(result2);

// var result3 = lookingForMatch([ ' ', 'O', 'O']) // --> nothing
// testFound(result3);