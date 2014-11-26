'use strict';

angular.module('LTBApp.tileTypes', [])


.directive("tileDefault", function() {
    return {
      restrict: "E",
      templateUrl: "components/tile-types/default/tile.html",
      controller: 'tileDefaultController',
      controllerAs: 'tileDefCtrl'
    };
})

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

.controller('tileDefaultController', ['tileState', '$scope', function (tileState, $scope) {
    this.tileClick = function ($event) {
        
        var obj = $($event.target).closest(".tile-emulate");
        if (obj.hasClass('selected')) {
            obj.removeClass('selected');
            tileState.setTile();
        } else {
            $(".tile-emulate.selected").removeClass('selected');
            $($event.target).closest(".tile-emulate").addClass('selected');
            tileState.setTile($scope.tile);
            
        }
        console.log(tileState.getTile());
    };

}])

.directive("tileProp", function(){
    return {
        restrict: "E",
        template: '<ng-include src="tileMCtrl.getTemplateUrl(\'prop\')"/>',
        controller: 'tileMenuController',
        controllerAs: 'tileMCtrl'
    };
    
})

.directive("tileSettings", function(){
    return {
        restrict: "E",
        template: '<ng-include src="tileMCtrl.getTemplateUrl(\'settings\')"/>',
        controller: 'tileMenuController',
        controllerAs: 'tileMCtrl'
    };
    
})

.controller('tileMenuController', ['tileState', '$scope', function(tileState, $scope){
    $scope.selectedTile = tileState.selectedTile;
    var tileMCtrl = this;
    
    $scope.$watch(
        function(){ return tileState.selectedTile },
    
        function(newVal) {
            $scope.selectedTile = newVal;
            
        },
        true
    );
    
    this.getTemplateUrl = function(what) {
        console.log($scope.selectedTile);
        if(what === 'prop'){
            return 'components/tile-types/' + this.selectedTile.type + '/prop.html';
        }else if(what === 'settings'){
            return 'components/tile-types/' + this.selectedTile.type + '/settings.html';
        }
    };
}])

;