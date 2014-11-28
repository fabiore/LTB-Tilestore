'use strict';

angular.module('LTBApp.mystacks', ['ngRoute'])
        
.config(['$routeProvider', function($routeProvider) {  
    $routeProvider.when('/my-stacks', {
        templateUrl:'modules/myStacks/my_stacks.html',
        controller:'MyStacksController'
    });
}])

.controller('MyStacksController', ['callApi', '$scope', '$http', '$location', function(callApi, $scope, $http, $location) {
    //@todo get stacks from API...                
    //callApi.getStacks();
    
    $scope.myStacks={};
    $http.get('data/data-results-a.json').success (function(data){
            $scope.myStacks=data;
    });
    
    $scope.openStack= function(stackid){
        $location.path("/stack_edit/"+stackid);
    };
}])
    
.controller('EditStackController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

}]);