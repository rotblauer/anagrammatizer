'use strict';
angular.module('main')
.controller('TestCtrl', function ($log) {

  $log.log('Hello from your Controller: TestCtrl in module main:. This is your controller:', this);

});
