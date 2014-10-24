'use strict';

// Declare app level module which depends on views, and components
var LTBApp = angular.module('LTBApp', [
  'ngRoute',
  'LTBApp.view1',
  'LTBApp.stack',
  'LTBApp.version',
  'LTBApp.myStacks',
  'LTBApp.tileStore',
  'ngStorage',
  'oauth',
  'gettext',
  'ltbapi'
]);

LTBApp.run(function (gettextCatalog) {
    //todo: dynamic language setting
    //see: https://angular-gettext.rocketeer.be/dev-guide/
    var lang = 'en';
    
    gettextCatalog.setCurrentLanguage(lang);
    gettextCatalog.loadRemote("languages/" + lang + ".json");
    gettextCatalog.debug = true;
});


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


LTBApp.controller('MyStacksController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.myStacks={};
    $http.get('data/data-results-a.json').success (function(data){
            $scope.myStacks=data;
    });
    
    $scope.openStack= function(stackid){
        $location.path("/stack_edit/"+stackid);
    };
}]);

LTBApp.controller('EditStackController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
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
}]);

/*LTBApp.directive('searchhhBar', function(){
    return {
        restrict:'A',
        templateUrl:"../searchBarStacks.html",
        controller:function(){
            $scope.text_controller = '';
            $scope.results={};
            $scope.aux='helloo';
            $scope.setSearchText = function(text_to_search){
                $scope.text_controller = text_to_search;

                $http.get('data/data-results-a.json').success (function(data){
                    $scope.results=data;
                    $scope.aux='bye';
                });
            };
        },
        controllerAs:'searchBar'
    };
});*/
        
LTBApp.config(['$routeProvider', function($routeProvider) {
    
    //for openid connect callback...    
    $routeProvider.when('/access_token=:accessToken', {
      template: '',
      controller: function ($location, AccessToken) {
        var hash = $location.path().substr(1);
        AccessToken.setTokenFromString(hash);
        $location.path('/');
        $location.replace();
      }
    });
    
    $routeProvider.when('/', {
        templateUrl:'modules/home/home.html'
    });
    
    $routeProvider.when('/stack_details/:stack_id?', {
        templateUrl:'modules/stack_details/stack_details.html',
        controller:'StackDetailsController'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);
