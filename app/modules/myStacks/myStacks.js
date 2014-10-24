'use strict';

angular.module('LTBApp.myStacks', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/my-stacks', {
        templateUrl: 'modules/myStacks/my_stacks.html',
        controller: 'MyStacksController'
    });
  
    $routeProvider.when('/stack_edit/:stack_id?', {
        templateUrl:'modules/myStacks/edit_stack.html',
        controller:'EditStackController'
    });
}])

.controller('MyStacksController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.myStacks={};
    $http.get('data/data-results-a.json').success (function(data){
            $scope.myStacks=data;
    });
    
    $scope.openStack= function(stackid){
        $location.path("/stack_edit/"+stackid);
    };
}])

.controller('EditStackController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.stack_id = $routeParams.stack_id;
    $scope.stack_info={};
    
    if ($scope.stack_id === 1) {
        $http.get('data/data-stack-1.json').success (function(data){
            $scope.stack_info=data;

            $scope.renderTiles();
            var aux = document.getElementById("renderTiles");
            aux.innerHTML = $scope.code_render_stack;
        });
    }
    else {
        $http.get('data/data-stack-2.json').success (function(data){
            $scope.stack_info=data;
        });
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
});