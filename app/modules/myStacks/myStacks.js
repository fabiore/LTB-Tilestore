'use strict';

angular.module('LTBApp.mystacks', ['ngRoute'])
        
.config(['$routeProvider', function($routeProvider) {  
    $routeProvider.when('/my-stacks', {
        templateUrl:'modules/myStacks/my_stacks.html',
        controller:'MyStacksController',
        controllerAs: 'mySCtrl',
        resolve: {
            title: function(Main){
                Main.setTitle('My Stacks');                
            }
        }
    });
}])

.controller('MyStacksController', ['callApi', '$http', '$location', '$scope', function(callApi, $http, $location, $scope) {
    //@todo get stacks from API...                
    callApi.getStacks();
    
    this.myStacks= callApi.state.mystacks;
    var mSCtrl = this;
    $scope.$watch(
        function(){ return callApi.state.mystacks },
    
        function(newVal) {
            mSCtrl.myStacks = newVal;
        },
        true
    );
    
    this.openStack= function(stackid){
        $location.path("/stack_edit/"+stackid);
    };
}])
    
.controller('EditStackController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

}]);