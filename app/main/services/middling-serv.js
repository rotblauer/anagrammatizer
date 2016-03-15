'use strict';
angular.module('main')
.factory('MiddlingFactory', function ($log) {

  $log.log('Hello from your Service: Middling in module main');

  var middle = function (origString, newString) {
    var words = {};
    words.bits = [];
    words.lowerBits = [];

    words.outerBits = [];
    words.bitCounts = {};
    for (var i = 0; i < origString.length + 1; i++) {
      words.bits.push(origString[i]);
      words.lowerBits.push(origString.toLowerCase()[i]);
    }

    for (var j = 0; j < newString.length; j++) {
      var letter = newString[j];

      var indexInOriginal = words.lowerBits.indexOf(letter.toLowerCase());
      if ( (indexInOriginal > -1 ) && words.bits[indexInOriginal] !== ' ') {
        words.lowerBits.splice(indexInOriginal, 1);
        words.bits.splice(indexInOriginal, 1);
      } else if ( indexInOriginal < 0 ) {
        words.outerBits.push(newString[j]);
      }
    }

    return {
      inner: words.bits.join(''), //return words.bits.join("");
      outer: words.outerBits.join('')
    };
  };

  return {
    middle: middle
  };

});
