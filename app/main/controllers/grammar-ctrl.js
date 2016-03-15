'use strict';
angular.module('main')
.controller('GrammarCtrl', function ($scope, $log, $ionicActionSheet, $ionicSlideBoxDelegate, MiddlingFactory, MathFactory, AlertFactory, Brain, scrabble) {

  /*----------  Testes  ----------*/

  // $scope.testes = scrabble.HIP_SENTENCES['3'];


  /*----------  Init  ----------*/

  $scope.slideIndex = 0;

  $scope.placeholder = MathFactory.shuffle(scrabble.ANAGRAMS)[0];
  $scope.words = {};
  $scope.words.original = '';
  $scope.words.new = '';

  $scope.brainIndex = [];

  /*----------  Helpers  ----------*/

  $scope.goToSaved = function () {
    $ionicSlideBoxDelegate.slide(1, 500);
  };

  $scope.slideChanged = function(index) { // Called each time the slide changes
    $scope.slideIndex = index;
    if ($scope.slideIndex == 1) {
      getSavedAnagrams();
    }
  };

  var alertSave = function(saver) {
    AlertFactory.alertSave(saver).then(function(res) {
     $log.log('Thank you for not eating my delicious ice cream cone', res);
    });
  };

  var alertNoSave = function () {
    AlertFactory.alertNoSave().then(function(res) {
      $log.log('Didnt save; no anagram there.', res);
    });
  };

  /*----------  Buttons  ----------*/

  function insertRandomSentence (genre, numWords) {
    //HIP_SENTENCES
    //BOOK_TITLES
    $log.log(genre, numWords);
    if (genre === 'hipster') {
      $scope.words.original = MathFactory.shuffle(scrabble.HIP_SENTENCES[numWords.toString()])[0];
    }
    else {
      $scope.words.original = MathFactory.shuffle(scrabble.BOOK_TITLES)[0];
    }
    // switch (genre) {
    //   case 'hipster':
    //     $scope.words.original = MathFactory.shuffle(scrabble.HIP_SENTENCES[numWords.toString()])[0];
    //   case 'books':
    //     $scope.words.original = MathFactory.shuffle(scrabble.BOOK_TITLES)[0];
    // }

  }

  $scope.clear = function () {
    $scope.words.original = '';
    $scope.words.new = '';
  };

  $scope.promptShuffleOld = function () {
    // AlertFactory.promptShuffle().then(function(res) {
    //   $log.log('Tapped!', insertRandomSentence(res));
    // });
    // AlertFactory.shuffleSheet().then(function (res) {
    //   $log.log(res);
    // });
  };

  // Triggered on a button click, or some other target
   $scope.promptShuffle = function() {

     // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 'Hipster gibberishes (Short)' },
         { text: 'Hipster gibberishes (Medium)' },
         { text: 'Hipster gibberishes (Long)' },
         { text: 'Book titles' }
       ],
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
        $log.log(index);
        // var genre = 'hipster';
        // var num = 3;
          if (index === 0) {
              insertRandomSentence('hipster', 3);
          }
          else if (index === 1) {
              insertRandomSentence('hipster', 4);
          }
          else if (index === 2) {
              insertRandomSentence('hipster', 5);
          } else {
              insertRandomSentence('books', 0);
          }

        return true;
       }
     });

     // For example's sake, hide the sheet after two seconds
     // $timeout(function() {
     //   hideSheet();
     // }, 2000);

   };

  $scope.save = function () {
    if ($scope.words.original.length > 0 && $scope.words.new.length > 0) {
      var saver = {
        penname: $scope.penname,
        original: $scope.words.original,
        revised: $scope.words.new,
        scrabblePoints: $scope.words.scrabblePoints()
      };

      Brain.save(saver);
      $scope.clear();
      alertSave(saver);
    }
    else {
      alertNoSave();
    }
  };


  /*----------  Brain  ----------*/

  function getSavedAnagrams () {
    Brain.index().then(function(arr) {
      $scope.brainIndex = arr;
    });
  }

  // function getSettings () {
  //   Brain.get('settings').then(function (settings) {
  //     $scope.words.settings = settings;
  //   });
  // }
  // getSettings(); //init

  $scope.removeFromBrain = function (key) {
    Brain.remove(key);
    getSavedAnagrams();
  };

  $scope.editAgain = function (origString, newString) {
    $scope.words.original = origString;
    $scope.words.new = newString;
    $ionicSlideBoxDelegate.slide(0, 500);
  };



  /*----------  Word manipulation  ----------*/

  $scope.words.scrabblePoints = function () {
    return MathFactory.scrabblePoints($scope.words.original);
  };

  $scope.middling = function () {
    return MiddlingFactory.middle($scope.words.original, $scope.words.new);
  };



});
