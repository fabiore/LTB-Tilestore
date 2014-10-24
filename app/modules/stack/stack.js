'use strict';

angular.module('LTBApp.stack', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/stack', {
    templateUrl: 'modules/stack/stackview.html',
    controller: 'StackController',
    controllerAs: 'StackCtrl'
  });
  $routeProvider.when('/stack/:stackid', {
    templateUrl: 'modules/stack/stackview.html',
    controller: 'StackController',
    controllerAs: 'StackCtrl'
  });
}])

.controller('StackController', ["callApi", "$scope", "$http", "$filter", "$routeParams", function(callApi, $scope, $http, $filter, $routeParams) {
    var stackid = $routeParams.stackid || 1;
    this.emulate = false;
    this.setEmulate = function(newVal) {
        emulate = newVal;
    };
    
    callApi.getStack(stackid);
    
    this.state = callApi.state;
    
    var Stackctrl = this;
    
    $scope.$watch(
        function(){ return callApi.state },

        function(newVal) {
            Stackctrl.state = newVal;
        },
        true
    );

}])

.directive("stack", function() {
    return {
      restrict: "E",
      templateUrl: "modules/stack/stack.html"
    };
})

.directive("stackemulate", function() {
    return {
      restrict: "E",
      templateUrl: "modules/stack/stack_emulate.html"
    };
})

.directive("tile", function() {
    return {
      restrict: "E",
      templateUrl: "modules/stack/tile.html",
//      controller: function() {
//        
//      },
//      controllerAs: "tile"
    };
});

;