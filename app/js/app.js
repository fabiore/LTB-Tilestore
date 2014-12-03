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
    'ui.sortable',
    'textAngular',
    'ng.deviceDetector'
    ])

.run(function (gettextCatalog) {
    //todo: dynamic language setting
    //see: https://angular-gettext.rocketeer.be/dev-guide/
    var lang = 'en';
    
    gettextCatalog.setCurrentLanguage(lang);
    gettextCatalog.loadRemote("languages/" + lang + ".json");
    gettextCatalog.debug = true;
})

.factory('Main', function() {
   var title = 'default';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
})

.config(['$routeProvider', function($routeProvider) {  
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
        templateUrl:'modules/home/home.html',
        resolve: {
            title: function(Main){
                Main.setTitle('Home');                
            }
        }
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}])

.controller('MainController', ['callApi', 'Main', function(callApi, Main){
   this.apisettings = callApi.apisettings;
   this.Main = Main;
}])

.controller('defaultController', ['callApi', function(callApi){
   this.apisettings = callApi.apisettings;
}]);
   