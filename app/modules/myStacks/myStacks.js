'use strict';

var App = angular.module('drag-and-drop', ['ngRoute']);

App.config(['$routeProvider', function($routeProvider) {  
    $routeProvider.when('/my-stacks', {
        templateUrl:'modules/myStacks/edit_stack.html',
        controller:'StackController'
    });
}]);

App.controller('MyStacksController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.myStacks={};
    $http.get('data/data-results-a.json').success (function(data){
            $scope.myStacks=data;
    });
    
    $scope.openStack= function(stackid){
        $location.path("/stack_edit/"+stackid);
    };
}]);

App.controller('EditStackController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

}]);