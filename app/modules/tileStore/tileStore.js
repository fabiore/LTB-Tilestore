'use strict';

angular.module('LTBApp.tileStore', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tile-store', {
    templateUrl: 'modules/tileStore/tile-store.html',
    controller: 'StackDetailsController'
  });
}])

.controller('StackDetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.stack_id = $routeParams.stack_id;
    $scope.stack_info={};
    $scope.code_render_stack="";
    
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
    
    $scope.renderTiles=function(){
        for(var i in $scope.stack_info.tiles) {
            if($scope.stack_info.tiles[i].typebody === 7) {
                    $scope.code_render_stack += "<a onclick=\""+$scope.stack_info.tiles[i].html+"\"><div class=\""+$scope.stack_info.tiles[i].tile+"\">";
            }
            else if ($scope.stack_info.tiles[i].html === "") {
                    $scope.code_render_stack += "<div class=\""+$scope.stack_info.tiles[i].tile+"\">";
            }
            else {
                $scope.code_render_stack += "<a href=\"" + $scope.stack_info.tiles[i].html + "\"><div class=\"" + $scope.stack_info.tiles[i].tile + "\">";
            }
            if($scope.stack_info.tiles[i].typebody === 1 || $scope.stack_info.tiles[i].typebody === 7) {
                    $scope.code_render_stack +="<div class=\"tile-body\"><i class=\""+$scope.stack_info.tiles[i].img+"\"></i></div>";
            }
            else if ($scope.stack_info.tiles[i].typebody === 2) {
                    $scope.code_render_stack +="<img src=\""+$scope.stack_info.tiles[i].img+"\" width=115 height=115 VSPACE=0 alt=\"\">";
            }
            else if ($scope.stack_info.tiles[i].typebody === 3) {
                    $scope.code_render_stack +="<div class=\"tile-body\"><div class=\"main_align\"style=\"font-size:30px; padding-top:40%\">"+$scope.stack_info.tiles[i].img+"</div></div>";
            }
            else if ($scope.stack_info.tiles[i].typebody === 4) {
                    $scope.code_render_stack +="<div class=\"tile-body\"><img src=\""+$scope.stack_info.tiles[i].img+"\" alt=\"\"></div>";
            }
            else if ($scope.stack_info.tiles[i].typebody === 5) {
                    $scope.code_render_stack +="<div class=\"tile-body\">"+$scope.stack_info.tiles[i].img+"</div>";
            }
            else if ($scope.stack_info.tiles[i].typebody === 6) {
                    $scope.code_render_stack +="<div class=\"tile-body\">"+$scope.stack_info.tiles[i].img+"</div>";
                    $scope.stack_info.tiles[i].name = "<i class=\""+$scope.stack_info.tiles[i].name+"\"></i>";
            }
            $scope.code_render_stack +="<div class=\"tile-object\"><div class=\"name\">"+$scope.stack_info.tiles[i].name+"</div><div class=\"number\">"+$scope.stack_info.tiles[i].number+"</div></div></div></a>";
        }
    };
}])

.controller('SearchController',['$scope', '$http', '$location', function($scope, $http, $location){
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