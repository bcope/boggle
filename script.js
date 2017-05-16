// blocks ======================================================================
// must have a length that is a square number
var fourByFour = [
  ['A','A','E','E','G','N'],
  ['A','C','H','O','P','S'],
  ['E','E','G','H','N','W'],
  ['E','H','R','T','V','W'],
  ['R','I','L','X','E','D'],
  ['O','S','S','E','I','T'],
  ['A','P','F','S','K','F'],
  ['T','A','O','O','W','T'],
  ['T','E','L','R','Y','T'],
  ['O','M','C','I','U','T'],
  ['D','Y','V','E','R','L'],
  ['H','L','R','N','Z','N'],
  ['Qu','M','N','U','I','H'],
  ['B','O','O','A','J','B'],
  ['I','S','D','T','Y','T'],
  ['E','E','I','N','S','U']
]

// from boggle deluxe - see https://boardgamegeek.com/article/4975223#4975223
var fiveByFive = [
  ['A','A','A','F','R','S'],
  ['A','A','E','E','E','E'],
  ['A','A','F','I','R','S'],
  ['A','D','E','N','N','N'],
  ['A','E','E','E','E','M'],
  ['A','E','E','G','M','U'],
  ['A','E','G','M','N','N'],
  ['A','F','I','R','S','Y'],
  ['B','J','K','Qu','X','Z'],
  ['C','C','N','S','T','W'],
  ['C','E','I','I','L','T'],
  ['C','E','I','L','P','T'],
  ['C','E','I','P','S','T'],
  ['D','H','H','N','O','T'],
  ['D','H','H','L','O','R'],
  ['D','H','L','N','O','R'],
  ['D','D','L','N','O','R'],
  ['E','I','I','I','T','T'],
  ['E','M','O','T','T','T'],
  ['E','N','S','S','S','U'],
  ['F','I','P','R','S','Y'],
  ['G','O','R','R','V','W'],
  ['H','I','P','R','R','Y'],
  ['N','O','O','T','U','W'],
  ['O','O','O','T','T','U']
]

var board = []

// using fisher yates shuffle: https://bost.ocks.org/mike/shuffle/
var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // while there remain elements to shuffle
  while (currentIndex) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // and swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function createBoard(blocks) {
  var $board = $('#board')
  var orientations = ['up','right','left','down']
  // delete existing letters if they exist
  $('.letter-container').remove()
  board = []
  function createRow(array) {
    var $newRow = $('<div></div>')
      .addClass('row')
    var newRow = []
    for (var i = 0; i < array.length; i++) {
      // randomly pick a letter from the current block i
      var newLetter = array[i][Math.floor(Math.random() * array[i].length)]
      var $newDiv = $('<div class="letter-container"><div class="letter">' + newLetter + '</div></div>')
        .addClass(orientations[Math.floor(Math.random() * orientations.length)])
      // underline certain letters
      if (/[MWZ]/.test(newLetter)) {
        $newDiv.addClass('underline')
      }
      $newRow.append($newDiv)
      newRow.push(newLetter)
    }
    board.push(newRow)
    return $newRow
  }
  blocks = shuffle(blocks)
  for (var j = 0; j < Math.sqrt(blocks.length); j++) {
    $board.append(createRow(blocks.slice(j * Math.sqrt(blocks.length),(j + 1) * Math.sqrt(blocks.length))))
  }
}

var currentTimer

// TODO: fix bug with resetting timer
function startTimer(timer) {
  timer = setInterval(function() {
    var $timer = $('#timer')
    var newTime = ($timer.html() || 181) - 1
    if (newTime > 10) {
      $timer.html(newTime)
    } else if (newTime > 0) {
      $timer.html(newTime).addClass('warning')
    } else {
      $timer.html('Game Over').removeClass('warning')
      clearInterval(timer)
    }
  },1000)
}

// is word in board ============================================================
// helper functions
function isLetter(letter,coord,board) {
  return board[coord[0]][coord[1]] == letter
}

function sameCoordinate(coord1,coord2) {
  return coord1[0] == coord2[0] && coord1[1] == coord2[1]
}

function getSurroundingCoordinates(coord,boardLength) {
  var surroundingCoordinates = []
  for (var i = Math.max(coord[0] -1,0); i < Math.min(coord[0] + 2,boardLength); i++) {
    for (var j = Math.max(coord[1] -1,0); j < Math.min(coord[1] + 2,boardLength); j++) {
      surroundingCoordinates.push(new Array(i,j))
    }
  }
  return surroundingCoordinates.filter((e) => {
    return !sameCoordinate(e,coord)
  })
}

function getLetterCoordinates(letter,board) {
  var letterCoordinates = []
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (board[i][j] == letter) {
        letterCoordinates.push(new Array(i,j))
      }
    }
  }
  return letterCoordinates
}

// solver function
// TODO: refactor and finish
function testUserWord(word) {
  word = word.split('')
  var match = false
  var matchCoordinates = []
  for (var i = 0; i < word.length && matchCoordinates.length === 0; i++) {
    // TODO: refactor and finish
  }

  // test every letter of the board against the first letter of the word
  for (var i = 0; i < board.length && !match; i++) {
    for (var j = 0; j < board[i].length && !match; j++) {
      if (board[i][j] == word[0]) {
        matchCoordinates.push([i,j])
        // TODO: refactor and finish
      }
    }
  }
  return matchCoordinates
}
