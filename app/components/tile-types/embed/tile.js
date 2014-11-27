'use strict';

tileTypes
.run(['tileState', function(tileState){
    tileState.addTemplate(
    {
        size: "double",
        colour: "red",
        name: "Embed",
        description: "Embed external content",
        icon: "cogs",
        type: "embed",
        template: {
            size: "double",
            colour: "red",
            name: "new embed",
            description: "",
            icon: "",
            position: 0,
            settings: {},
            type: "embed"
          }
        
        }
    );
}])

.controller('embedTileController', ['tileState', 'callApi', '$scope', '$sce', function (tileState, callApi, $scope, $sce) {
        
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
       tileState.setTile($scope.tile);
       tileState.fullscreen = true;
    };
//    $scope.tile.settings.htmlSafe = $sce.trustAsHtml($scope.tile.settings.html);
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/embed/tile.html";
    };

}])

.controller('embedFullController', ['tileState', '$sce', function(tileState, $sce){
        console.log(tileState.selectedTile);
    this.tile = tileState.selectedTile;
    this.tile.settings.htmlSafe = $sce.trustAsHtml(this.tile.settings.html);
    
    this.tileClose = function ($event) {
       tileState.setTile();
    };
}])

.controller('embedMenuController', ['callApi', 'tileState', '$sce', function(callApi, tileState, $sce){
    this.url = tileState.selectedTile.settings.url;
    this.selectedTile = tileState.selectedTile;
    
    this.tileDelete = function (){
        console.log('index',tileState);
        callApi.deleteTile(tileState.tileindex);
        tileState.setTile();
        
    };
    
    this.findEmbed = function(){
        callApi.getEmbed(this.url, 220, null, function(data){
            console.log(data._embedded.embed[0]);
            tileState.selectedTile.settings = data._embedded.embed[0];
            tileState.selectedTile.name = data._embedded.embed[0].title;
            
        });
    };
}])

;