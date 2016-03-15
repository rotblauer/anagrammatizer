'use strict';
angular.module('main')
.factory('MathFactory', function ($log, scrabble) {

  $log.log('Hello from your factory: Math in module main');

  //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  function shuffle (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  // Scrabble point counter.
  function scrabblePoints (string) {
    var scrabbleSum = 0;
    var originalUpper = string.toUpperCase();

    for (var i = 0; i < string.length; i++) {
      scrabbleSum += scrabble.LETTER_VALUES[originalUpper.charAt(i)] || 0;
    }
    return scrabbleSum;
  }

  return {
    shuffle: shuffle,
    scrabblePoints: scrabblePoints
  };

});
