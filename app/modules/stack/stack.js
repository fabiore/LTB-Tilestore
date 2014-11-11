'use strict';

angular.module('LTBApp.stack', ['ngRoute','ngDragDrop','ui.bootstrap'])

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

.controller('StackController', ["callApi", "$scope","$http", "$filter", "$routeParams", function(callApi, $scope, $http, $filter, $routeParams) {
    var stackid = $routeParams.stackid || 1;
    this.emulate = false;
    this.setEmulate = function(newVal) {
        emulate = newVal;
    };
     $scope.stack_info={};
    //callApi.getStack(stackid);
    
    //this.state = callApi.state;
    $scope.stack = this;
    $scope.tiles = {};
    $scope.stack_info={};
    $http.get('data/data-stack-1.json').success(function(data){
        //$scope.stack.state = data;
        $scope.tiles = data.tiles;
        $scope.stack_info = data;
    });
    
    //$scope.$watch(
    //    function(){ return callApi.state },

    //    function(newVal) {
    //        Stackctrl.state = newVal;
    //    },
    //    true
    //);
    
    $scope.list5 = [{'title': 'Gallery'},{'title': 'QrTile'},{'title': 'Forum'},{'title': 'Camera'},{'title': 'Suggestions'},{'title': 'Folder Explorer'},{'title': 'Tile with Tiles'}];

    $scope.hideMe = function() {
      return $scope.list5.length > 0;
    };

    $scope.dropTile = function() {
        $scope.list5 = $scope.list5.concat([{'title': 'iPhone'},{'title': 'iPod'},{'title': 'iPad'}]);
        $scope.tiles = $scope.tiles.concat([{tile : "tile bg-blue",colour : "red",name : "Settings",html : "",typebody : 1,img : "fa fa-cogs",number : "",position: "11"}]);
        //$scope.tiles = {};
        //$scope.$apply(function () {
        //    $scope.tiles = $scope.tiles.concat([{tile : "tile bg-blue",colour : "red",name : "Settings",html : "",typebody : 1,img : "fa fa-cogs",number : "",position: "11"}]);
        //    $scope.list5 = $scope.list5.concat([{'title': 'iPhone'},{'title': 'iPod'},{'title': 'iPad'}]);
        //});
    };
}])


.controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

$scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
})

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