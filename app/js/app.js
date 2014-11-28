'use strict';

var LTBApp = angular.module('LTBApp', [
    'ngRoute',
    'LTBApp.view1',
    'LTBApp.stack',
    'LTBApp.tileStore',
    'LTBApp.stack_details',
    'LTBApp.tileTypes',
    'LTBApp.mystacks',
    'ltbapi',
    'oauth',
    'gettext',
    'ui.sortable'
    ]);

LTBApp.run(function (gettextCatalog) {
    //todo: dynamic language setting
    //see: https://angular-gettext.rocketeer.be/dev-guide/
    var lang = 'en';
    
    gettextCatalog.setCurrentLanguage(lang);
    gettextCatalog.loadRemote("languages/" + lang + ".json");
    gettextCatalog.debug = true;
});

LTBApp.config(['$routeProvider', function($routeProvider) {  
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

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);

LTBApp.controller('defaultController', ['callApi', function(callApi){
   this.apisettings = callApi.apisettings;
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