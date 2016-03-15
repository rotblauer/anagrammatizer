'use strict';
angular.module('main')
.factory('Brain', function ($log, $q, $localForage) {

  $log.log('Hello from your Brain: LocalStorage in module main');

  // Save
  var save = function (obj) {
    // var fakeKey = value.original;
    var fakeKey = Date.now();
    $localForage.setItem(fakeKey, obj);
  };

  var saveWithKey = function (key, obj) {
    $localForage.setItiem(key, obj);
  };

  // Index
  var index = function () {
    var defer = $q.defer();

    var returnArray = [];

    $localForage.iterate(function(value, key) {

      // $log.log('key', key, 'value', value);
      var obj = {};
      obj.id = key;
      obj.data = value;

      if (key !== 'fakerSetting') {
        returnArray.push(obj);
      }

    }).then(function(data) {
        // data is the key of the value > 10
        // $log.log('Got data for:', data);
        $log.log(data);
        defer.resolve(returnArray);
    }, function (err) {
      $log.log(err);
    });

    return defer.promise;
  };

  var remove = function (key) {
    $localForage.removeItem(key).then(function (data) {
      $log.log(data);
    });
  };

  // function get (key) {
  //   var defer = $q.defer();

  //   $localForage.getItem(key).then(function (data) {
  //     if (data !== null) {
  //       defer.resolve(data);
  //     } else {
  //       defer.resolve({useBooks: true, useHipster: true});
  //     }
  //   });

  //   return defer.promise;
  // }

  return {
    save: save,
    saveWithKey: saveWithKey,
    index: index,
    remove: remove
    // get: get
  };

});
