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
    
    var Stackctrl = this;
    var stackid = $routeParams.stackid || 1;
    
    this.thetiletype = 'default';
    
    this.startDrag = function(event, ui, template, index) {
          Stackctrl.draggedTemplate = template;
    };

    this.dropTile = function() {
        //console.log('You drop: ' + $scope.draggedTitleID);
//        console.log(Stackctrl.state.tiles);
//        console.log([Stackctrl.draggedTemplate]);
//        
        
        Stackctrl.state.tiles = Stackctrl.state.tiles.concat([Stackctrl.draggedTemplate.template]);
        console.log(Stackctrl.state.tiles);
        Stackctrl.draggedTemplate = null;
       // $scope.settings = getSettingsById($scope.template_tiles, $scope.draggedTitle.id_tile);
    };

    
    callApi.getStack(stackid);
    
    this.state = callApi.state;
    $scope.$watch(
        function(){ return callApi.state },
    
        function(newVal) {
            Stackctrl.state = newVal;
        },
        true
    );
    
    this.fullscreen = tileState.fullscreen;
    $scope.$watch(
        function(){ return tileState.fullscreen },
    
        function(newVal) {
            Stackctrl.fullscreen = newVal;
        },
        true
    );
    
    this.edit = tileState.edit;
    $scope.$watch(
        function(){ return tileState.edit },
    
        function(newVal) {
            Stackctrl.edit = newVal;
        },
        true
    );
    this.templates = tileState.templates;
    this.alltemplates = this.templates.slice();
    
    console.log('all', this.alltemplates);
    $scope.$watch(
        function(){ return tileState.templates },
    
        function(newVal) {
            Stackctrl.templates = newVal;
        },
        true
    );
    
    this.saveStack = function(){
        callApi.patchStack();
    };
    
    this.tmpList = [];
    this.sortableOptions = {
        connectWith: ".worksheet",
        activate: function () {
            console.log("activate");
        },
        beforeStop: function () {
            console.log("beforeStop");
        },
        change: function () {
            console.log("change");
        },
        create: function () {
            console.log("create");
        },
        deactivate: function () {
            console.log("deactivate");
        },
        out: function () {
            console.log("out");
        },
        over: function () {
            console.log("over");
        },
        receive: function (event, ui) {
            console.log("receive");
            
            if ($(ui.sender[0]).hasClass('tiletypes')){
                // clone the original model to restore the removed item
              Stackctrl.alltemplates = Stackctrl.tmpList;
            }
            
        },
        remove: function () {
            console.log("remove");
        },
        sort: function () {
            console.log("sort");
        },
        start: function () {
            console.log("start");
            Stackctrl.tmpList = Stackctrl.alltemplates.slice();
        },
        update: function (e, ui) {
            console.log("update");

//            var logEntry = Stackctrl.tmpList.map(function (i) {
//                return i.value;
//            }).join(', ');
//            Stackctrl.sortingLog.push('Update: ' + logEntry);
        },
        stop: function (e, ui) {
            console.log("stop",Stackctrl.alltemplates);
            
//            if ($(e.target).hasClass('tiletypes') &&
//                ui.item.sortable.droptarget &&
//                e.target != ui.item.sortable.droptarget[0]) {
//                // clone the original model to restore the removed item
//                Stackctrl.templates = tileState.templates;
//            }
            // this callback has the changed model
            
            
//            var logEntry = Stackctrl.tmpList.map(function (i) {
//                return i.value;
//            }).join(', ');
//            Stackctrl.sortingLog.push('Stop: ' + logEntry);
//            console.log(Stackctrl.tmpList);
//            console.log(Stackctrl.sortingLog);
        }
    };
    
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