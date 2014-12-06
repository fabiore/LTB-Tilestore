'use strict';

var LTBApp = angular.module('LTBApp.stack_details', ['ngRoute']);

LTBApp.config(['$routeProvider', function($routeProvider) {  
    $routeProvider.when('/stack_details/:stack_id?', {
        templateUrl:'modules/stack_details/stack_details.html',
        controller:'StackDetailsController'
    });
}]);

LTBApp.controller('SearchController',['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.text_controller = '';
    $scope.results={};
    $scope.setSearchText = function(text_to_search){
        $scope.text_controller = text_to_search;
        
        $http.get('data/data-results-a.json').success (function(data){
            $scope.results=data;
        });
    };
    $scope.openDetailsScope= function(stackid){
        $location.path("/stack_details/"+stackid);
    };
}]);