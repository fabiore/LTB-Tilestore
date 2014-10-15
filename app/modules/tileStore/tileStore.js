'use strict';

var tileStore = angular.module('tileStore', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'modules/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);

tileStore.controller('SearchController',['$scope', '$http', '$location', function($scope, $http, $location){
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