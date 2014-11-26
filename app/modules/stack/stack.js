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
  $routeProvider.when('/stack_edit', {
    templateUrl: 'modules/myStacks/edit_stack.html',
    controller: 'StackController',
    controllerAs: 'StackCtrl'
  });
  $routeProvider.when('/stack_edit/:stackid', {
    templateUrl: 'modules/myStacks/edit_stack.html',
    controller: 'StackController',
    controllerAs: 'StackCtrl'
  });
}])

.controller('StackController', ["callApi", "tileState", "$scope", "$http", "$filter", "$routeParams", function(callApi, tileState, $scope, $http, $filter, $routeParams) {
    
    //@todo: synch this with folders in components/tile-types            
    $scope.template_tiles = {};//[{'title': 'Gallery'},{'title': 'QrTile'},{'title': 'Forum'},{'title': 'Camera'},{'title': 'Suggestions'},{'title': 'Folder Explorer'},{'title': 'Tile with Tiles'}];
    $http.get('data/template-tiles.json').success(function(data){
        $scope.template_tiles = data.edit_tiles;
    });
    var Stackctrl = this;
    var stackid = $routeParams.stackid || 1;
    this.emulate = false;
    this.thetiletype = 'default';
    
    this.setEmulate = function(newVal) {
        this.emulate = newVal;
    };
//    
//    $scope.stack_info={};    
//    $scope.stack = this;
//    $scope.tiles = {};
//
//    $http.get('data/data-stack-2.json').success(function(data){
//        $scope.tiles = data.tiles;
//        $scope.stack_info = data;
//    });
//    
//    $scope.hideMe = function() {
//      return $scope.list5.length > 0;
//    };
//
    this.startCallback = function(event, ui, title) {
          Stackctrl.draggedTitle = title;
    };

    this.dropTile = function() {
        //console.log('You drop: ' + $scope.draggedTitleID);
        Stackctrl.state.tiles = Stackctrl.state.tiles.concat([{tile : "tile bg-blue",colour : "red",name : Stackctrl.draggedTitle.name,html : "",typebody : 1,icon : "video-camera",number : "",position: "11"}]);
       // $scope.settings = getSettingsById($scope.template_tiles, $scope.draggedTitle.id_tile);
    };
//    
//    function getSettingsById(arr, id) {
//        for (var d = 0, len = arr.length; d < len; d += 1) {
//            if (arr[d].id_tile === id) {
//                return arr[d].settings;
//            }
//        }
//    }
//    
//    $scope.getSubStack = function(pos) {
//        if ($scope.tiles[pos-1].subtiles !== undefined)
//            $scope.tiles = $scope.tiles[pos-1].subtiles;
//    };
    
    callApi.getStack(stackid);
    
    this.state = callApi.state;
    
    
    $scope.$watch(
        function(){ return callApi.state },
    
        function(newVal) {
            Stackctrl.state = newVal;
        },
        true
    );
    
    this.saveStack = function(){
        callApi.patchStack();
    }
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