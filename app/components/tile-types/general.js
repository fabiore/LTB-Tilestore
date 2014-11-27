'use strict';

var tileTypes = angular.module('LTBApp.tileTypes', [])


.directive("tile", ['$compile', function($compile) {
    return {
        restrict: "E",
        
        scope: {
            tiletype: '=',
            tile: '=',
            tileindex: '=',
        },
        link: function(scope, element, attrs){
            element.html('<div><ng-include src="TileCtrl.tileTemplateUrl()"/></div>').show();
            var div = element.find('div');
            
            div.attr('ng-controller',scope.tiletype+'TileController as TileCtrl');
            $compile(element.contents())(scope);
        }
    };
}])

.service('tileState', function(){
    this.templates = [];
    this.selectedTile = {};
    this.fullscreen = false;
    this.edit = false;
    this.tileindex = null;
    
    this.setTile = function(tile){
        this.selectedTile = tile || {};
        if(!tile){
            this.fullscreen = false;
            this.edit = false;
            this.tileindex = null;
        }
    };
    
    this.getTile = function(){
        return this.selectedTile;
    };
    
    this.getProp = function(prop){
        return this.selectedTile[prop] || '';
    };
    
    this.addTemplate = function(template){
        this.templates.push(template);
        console.log(template);
        console.log(this.templates);
    };
})

.directive("tileFull", function(){
    return {
        restrict: "E",
        template: '<ng-include src="tileTCtrl.tileTypeTemplateUrl(\'full\')"/>',
        controller: 'tileTypeController',
        controllerAs: 'tileTCtrl'
    };
    
})

.directive("tileProp", function(){
    return {
        restrict: "E",
        template: '<ng-include src="tileTCtrl.tileTypeTemplateUrl(\'prop\')"/>',
        controller: 'tileTypeController',
        controllerAs: 'tileTCtrl'
    };
    
})

.directive("tileSettings", function(){
    return {
        restrict: "E",
        template: '<ng-include src="tileTCtrl.tileTypeTemplateUrl(\'settings\')" />',
        controller: 'tileTypeController',
        controllerAs: 'tileTCtrl'
    };
    
})

.controller('tileTypeController', ['tileState', '$scope', function(tileState, $scope){
    this.selectedTile = tileState.selectedTile;
    var tileMCtrl = this;
    
    $scope.$watch(
        function(){ return tileState.selectedTile },
    
        function(newVal) {
            tileMCtrl.selectedTile = newVal;
            
            
        },
        true
    );
    
    this.tileTypeTemplateUrl = function(what) {
        if(what === 'prop'){
            return 'components/tile-types/' + this.selectedTile.type + '/prop.html';
        }else if(what === 'settings'){
            return 'components/tile-types/' + this.selectedTile.type + '/settings.html';
        }else if(what === 'full'){
            return 'components/tile-types/' + this.selectedTile.type + '/full.html';
        }
    };
}])

;