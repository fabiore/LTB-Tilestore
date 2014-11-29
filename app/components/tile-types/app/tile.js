'use strict';

tileTypes

.run(['tileState', function(tileState){
    tileState.addTemplate(
    {
        size: "",
        colour: "purple",
        icon: "android",
        type: "app",
        name: "App link",
        description: "Link to a mobile app",
        template: {
            size: "",
            colour: "purple",
            name: "new content",
            icon: "android",
            position: 0,
            settings: {},
            type: "app"
        }
        
    }
    );
}])
.controller('appTileController', ['tileState', 'callApi', '$scope', function (tileState, callApi, $scope) {
    //make sure the inserted tile is not a template
    if(!$scope.tiletemplate && callApi.state.tiles[$scope.tileindex].template){
        callApi.state.tiles[$scope.tileindex] = callApi.state.tiles[$scope.tileindex].template;
        $scope.tile = callApi.state.tiles[$scope.tileindex];
    }
    this.tileEdit = function ($event) {
        tileState.tileEdit($event, $scope.tile, $scope.tileindex);
    };
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/app/tile.html";
    };

}])

.controller('appMenuController', ['callApi', 'tileState', function(callApi, tileState){
    this.tileDelete = function (){
        console.log('index',tileState);
        callApi.deleteTile(tileState.tileindex);
        tileState.setTile();
        
    };
}])

;