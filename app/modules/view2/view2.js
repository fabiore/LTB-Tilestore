'use strict';

angular.module('LTBApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'modules/view2/view2.html',
    controller: 'View2Ctrl',
    controllerAs: 'View2ctrl'
  });
}])

.controller('View2Ctrl', ["$http", "$filter", function($http, $filter) {
   this.stack = [];
   this.screen = [];
   this.tiles = [];
   this.test = "test";
   
   var View2 = this;
   $http.get('data/data-stack-1-temp.json').success(function(data){
       View2.stack = data;
       View2.getTiles();
   });
   
   this.getTiles = function(screen){
       var thescreen = screen || this.stack.startscreen || 1;
       this.screen = $filter('filter')(this.stack.screens, function (s) {return s.id === thescreen;})[0];
       this.tiles = this.screen.tiles
       console.log(this.tiles);
   };
}])

.directive("stack", function() {
    return {
      restrict: "E",
      templateUrl: "modules/view2/stack.html",
//      controller: function() {
//        
//      },
//      controllerAs: "stack"
    };
})

.directive("tile", function() {
    return {
      restrict: "E",
      templateUrl: "modules/view2/tile.html",
//      controller: function() {
//        
//      },
//      controllerAs: "tile"
    };
});

;