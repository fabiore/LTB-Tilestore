'use strict';

tileTypes

.run(['tileState', function(tileState){
    tileState.addTemplate(
    {
        size: "",
        colour: "red",
        icon: "compass",
        type: "navigate",
        name: "Navigation",
        description: "Navigate to screen",
        template: {
            size: "",
            colour: "red",
            name: "navigate",
            icon: "compass",
            position: 0,
            settings: {
                target: 2
            },
            type: "navigate"
        }
        
    }
    );
}])
.controller('navigateTileController', ['tileState', 'callApi', '$scope', function (tileState, callApi, $scope) {
    //make sure the inserted tile is not a template
    if(!$scope.tiletemplate && callApi.state.tiles[$scope.tileindex].template){
        callApi.state.tiles[$scope.tileindex] = callApi.state.tiles[$scope.tileindex].template;
        $scope.tile = callApi.state.tiles[$scope.tileindex];
    }
    this.tileEdit = function ($event) {
        
        var obj = $($event.target).closest(".tile");
        if (obj.hasClass('selected')) {
            obj.removeClass('selected');
            tileState.setTile();
        } else {
            $(".tile.selected").removeClass('selected');
            $($event.target).closest(".tile").addClass('selected');
            tileState.setTile($scope.tile);
            tileState.tileindex = $scope.tileindex;
            tileState.edit = true;
            
        }
    };
    
        
    this.tileClick = function ($event) {
       callApi.getTiles($scope.tile.settings.target);
    };
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/navigate/tile.html";
    };

}])

.controller('navigateMenuController', ['callApi', 'tileState', function(callApi, tileState){
    this.selectedTile = tileState.selectedTile;
    this.targetscreen = tileState.selectedTile.settings.target;
    
    this.tileDelete = function (){
        console.log('index',tileState);
        callApi.deleteTile(tileState.tileindex);
        tileState.setTile();
        
    };
    
    this.targetChange = function(id){
        
        var name = $('#'+id).find(":selected").text();
        
        console.log(name);
        tileState.selectedTile.name = name;
    }
    
    
    
}])

;