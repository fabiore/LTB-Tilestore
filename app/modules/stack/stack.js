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

.controller('StackController', ["$http", "$filter", "$routeParams", function($http, $filter, $routeParams) {
   this.stack = [];
   this.screen = [];
   this.tiles = [];
   var stackid = $routeParams.stackid || 1;
   var stackctr = this;
   $http.get('data/data-stack-'+stackid+'-temp.json').success(function(data){
       stackctr.stack = data;
       stackctr.getTiles();
   });
   
   this.getTiles = function(screen){
       var thescreen = screen || this.stack.startscreen || 1;
       this.screen = $filter('filter')(this.stack.screens, function (s) {return s.id === thescreen;})[0];
       this.tiles = this.screen.tiles;
   };
}])

.directive("stack", function() {
    return {
      restrict: "E",
      templateUrl: "modules/stack/stack.html",
//      controller: function() {
//        
//      },
//      controllerAs: "stack"
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