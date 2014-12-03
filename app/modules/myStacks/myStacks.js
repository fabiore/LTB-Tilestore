'use strict';

angular.module('LTBApp.mystacks', ['ngRoute'])
        
.config(['$routeProvider', function($routeProvider) {  
    $routeProvider.when('/my-stacks', {
        templateUrl:'modules/myStacks/my_stacks.html',
        controller:'MyStacksController',
        controllerAs: 'mySCtrl'
    });
}])

.controller('MyStacksController', ['callApi', '$http', '$location', function(callApi, $http, $location) {
    //@todo get stacks from API...                
   // callApi.getStacks();
    
    this.myStacks={};
    var mStackcrtl = this;
    $http.get('data/data-results-a.json').success (function(data){
            mStackcrtl.myStacks=data;
    });
    
    this.openStack= function(stackid){
        $location.path("/stack_edit/"+stackid);
    };
}])
    
.controller('EditStackController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

}]);