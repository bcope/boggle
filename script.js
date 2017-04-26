// from boggle deluxe - see https://boardgamegeek.com/article/4975223#4975223
// blocks need to have a length that is a square number
var blocks = [
  ['A','A','A','F','R','S'],
  ['A','A','E','E','E','E'],
  ['A','A','F','I','R','S'],
  ['A','D','E','N','N','N'],
  ['A','E','E','E','E','M'],
  ['A','E','E','G','M','U'],
  ['A','E','G','M','N','N'],
  ['A','F','I','R','S','Y'],
  ['B','J','K','Q','X','Z'],
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

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element
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
  $('.letter').remove()
  function createRow(array) {
    var $newRow = $('<div></div>')
      .addClass('row')
    for (var i = 0; i < array.length; i++) {
      var newLetter = array[i][Math.floor(Math.random() * array[i].length)]
      var $newDiv = $('<div></div>')
        .html(newLetter)
        .addClass(orientations[Math.floor(Math.random() * orientations.length)])
        .addClass('letter')
      $newRow.append($newDiv)
    }
    return $newRow
  }
  blocks = shuffle(blocks)
  for (var j = 0; j < Math.sqrt(blocks.length); j++) {
    $board.append(createRow(blocks.slice(j * Math.sqrt(blocks.length),(j + 1) * Math.sqrt(blocks.length))))
  }
}
