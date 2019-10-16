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


// Next look for matches in all columns for wins (3x)

var board = [ 'X', 'O', 'O', 'X', 'O', 'X', ' ', ' ', ' ']

var checkAllColumns = function(board, segmentLength) {
  // divide board into columns
  for (var column = 0; column < segmentLength; column += 1) {
    var columnIndexes = [];
    for (var row = 0; row < segmentLength; row += 1) {
      columnIndexes.push(segmentLength * row + column);
    }
    // console.table(columnIndexes);

    // pick array into segment
    var segment = [];
    for (var i = 0; i < segmentLength; i += 1) {
      segment.push( board[ columnIndexes[i] ] );
    }

    var match = lookingForMatch(segment);
    if (match.wasFound) {
      console.log("Column Match was FOUND");
      return true;
    }
  }
  console.log("column match was not found");
  return false;
}

checkAllColumns(board, segmentLength); // -> no win
checkAllColumns(xboard, segmentLength); // -> win
checkAllColumns(oboard, segmentLength) // -> win

// TODO : where does the win come from

// var result0 = lookingForMatch([ 'X', 'X', 'X']) // --> win / lost
// testFound(result0);

// var result1 = lookingForMatch([ 'X', 'O', 'X']) // --> nothing
// testFound(result1);

// var result2 = lookingForMatch([ 'O', 'O', 'O']) // --> win
// testFound(result2);

// var result3 = lookingForMatch([ ' ', 'O', 'O']) // --> nothing
// testFound(result3);