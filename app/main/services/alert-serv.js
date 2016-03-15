'use strict';
angular.module('main')
.factory('AlertFactory', function ($log, $ionicPopup, $ionicActionSheet) {

  $log.log('Hello from your factory: Alert in module main');


  function alertNoSave () {
    var alertPopup = $ionicPopup.alert({
      title: 'Nothing to save...',
      template: 'Make an anagram first!'
    });
    return alertPopup;
  }

  function alertSave (saver) {
    var alertPopup = $ionicPopup.alert({
      title: 'Got it!',
      template: saver.original + ' / ' + saver.revised
    });
    return alertPopup;
  }

  function promptShuffle () {
    var myPopup = $ionicPopup.show({
      title: 'What kind of words would you like?',
      subTitle: 'Approximately.',
      // scope: $scope,
      buttons: [
        { text: '3 hipster words', type: 'button-balanced', onTap: function (e) {return 3;} },
        { text: '4 hipster words', type: 'button-positive', onTap: function (e) {return 4;} },
        { text: '5 hipster words', type: 'button-assertive', onTap: function (e) {return 5;} }
      ]
    });
    return myPopup;
  }

  // Triggered on a button click, or some other target
   function shuffleSheet () {

     // Show the action sheet
     var sheet = $ionicActionSheet.show({
       buttons: [
         { text: '<b>Share</b> This' },
         { text: 'Move' }
       ],
       destructiveText: 'Delete',
       titleText: 'Modify your album',
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         return true;
       }
     });

     return sheet;
   }

  return {
    alertNoSave: alertNoSave,
    alertSave: alertSave,
    promptShuffle: promptShuffle,
    shuffleSheet: shuffleSheet
  };

});
