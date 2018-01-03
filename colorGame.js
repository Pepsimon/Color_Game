var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.getElementById('message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeBtns = document.querySelectorAll('.mode');

var genSquares = function genSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
};

init();

function init() {
  setupModeBtns();
  setupSquares();
  resetButton.addEventListener('click', function() {
    reset();
  });
  reset();
};

function setupModeBtns() {
  for (var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener('click', function() {
      modeBtns[0].classList.remove('selected');
      modeBtns[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === 'easy' ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
};

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add click listeners to squares.
    squares[i].addEventListener('click', function() {
      // grab color of clicked square.
      var clickedColor = this.style.backgroundColor;
      // compare color to pickedColor.
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'You Got It!'
        changeColors(clickedColor);
        h1.style.background = clickedColor;
        // set button to say play again
        resetButton.textContent = 'Play again?';
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = 'Try Again!';
      }
    });
  }
};

function reset() {
  // generate all new colors
  colors = generateRandomColors(numSquares);
  // pick a new random color from array
  pickedColor = pickColor();
  // set colorDisplay to match the pickedColor
  colorDisplay.textContent = pickedColor;
  // change colors of squares
  genSquares();
  // reset message
  messageDisplay.textContent = '';
  // reset background color of the h1
  h1.style.backgroundColor = 'steelblue';
  // set button back to def
  resetButton.textContent = 'New colors';
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
    } else {
      squares[i].style.display = 'none';
    }
  }
};

function changeColors(color) {
  // loop through all squares.
  for (var i = 0; i < squares.length; i++) {
    // change each color to match pickedColor.
    squares[i].style.backgroundColor = color;
  }
};

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

function generateRandomColors(num) {
  // make an array.
  var arr = []
  // repeat num times.
  for (var i = 0; i < num; i++) {
    // get random color and push into array.
    arr.push(randomColor());
  }
  // return arr.
  return arr;
}

function randomColor() {
  // pick red from 0 - 255
  var r = Math.floor(Math.random() * 256);
  // pick green from 0 - 255
  var g = Math.floor(Math.random() * 256);
  // pick blue from 0 - 255
  var b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};
