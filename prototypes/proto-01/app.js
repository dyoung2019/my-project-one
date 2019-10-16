console.log("")

var cells = document.querySelectorAll(".cell");

var handleClick = function(event) {
  var elem = event.target;

  // get data index for cell

  // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  console.log(`Cell index :  ${elem.dataset.cellIndex}`)
  
  elem.classList.add('cross');

  elem.dataset.cellValue = "X";
}

cells.forEach(function(cell) {
  cell.addEventListener('click', handleClick);
})