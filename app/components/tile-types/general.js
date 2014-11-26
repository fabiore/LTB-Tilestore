'use strict';

var tileTypes = angular.module('LTBApp.tileTypes', [])


.directive("tile", ['$compile', function($compile) {
    return {
        restrict: "E",
        
        scope: {
            tiletype: '=',
            tile: '='
        },
        link: function(scope, element, attrs){
            element.html('<div><ng-include src="TileCtrl.tileTemplateUrl()"/></div>').show();
            var div = element.find('div');
            console.log(scope.tiletype);
            div.attr('ng-controller',scope.tiletype+'TileController as TileCtrl');
            $compile(element.contents())(scope);
        }
    };
}])

.service('tileState', function(){
    this.selectedTile = {};
    
    this.setTile = function(tile){
        this.selectedTile = tile || {};
    };
    
    this.getTile = function(){
        return this.selectedTile;
    };
    
    this.getProp = function(prop){
        return this.selectedTile[prop] || '';
    }
})

.directive("tileProp", function(){
    return {
        restrict: "E",
        template: '<ng-include src="tileMCtrl.tileMenuTemplateUrl(\'prop\')"/>',
        controller: 'tileMenuController',
        controllerAs: 'tileMCtrl'
    };
    
})

.directive("tileSettings", function(){
    return {
        restrict: "E",
        template: '<ng-include src="tileMCtrl.tileMenuTemplateUrl(\'settings\')" />',
        controller: 'tileMenuController',
        controllerAs: 'tileMCtrl'
    };
    
})

.controller('tileMenuController', ['tileState', '$scope', function(tileState, $scope){
    this.selectedTile = tileState.selectedTile;
    var tileMCtrl = this;
    
    $scope.$watch(
        function(){ return tileState.selectedTile },
    
        function(newVal) {
            tileMCtrl.selectedTile = newVal;
            
            
        },
        true
    );
    
    this.tileMenuTemplateUrl = function(what) {
        if(what === 'prop'){
            return 'components/tile-types/' + this.selectedTile.type + '/prop.html';
        }else if(what === 'settings'){
            return 'components/tile-types/' + this.selectedTile.type + '/settings.html';
        }
    };
}])

;