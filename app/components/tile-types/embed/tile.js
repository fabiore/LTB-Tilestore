'use strict';

tileTypes
.run(['tileState', function(tileState){
    tileState.addTemplate(
    {
        size: "",
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
        
    //make sure the inserted tile is not a template
    if(!$scope.tiletemplate && callApi.state.tiles[$scope.tileindex].template){
        callApi.state.tiles[$scope.tileindex] = callApi.state.tiles[$scope.tileindex].template;
        $scope.tile = callApi.state.tiles[$scope.tileindex];
    }
    this.tileEdit = function ($event) {
        tileState.tileEdit($event, $scope.tile, $scope.tileindex);
    };
    
    this.tileClick = function ($event) {
       tileState.toggleSelect($event, 'off');
       tileState.setTile($scope.tile, 'full', $scope.tileindex);
//       tileState.fullscreen = true;
    };
//    $scope.tile.settings.htmlSafe = $sce.trustAsHtml($scope.tile.settings.html);
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/embed/tile.html";
    };

}])

.controller('embedFullController', ['tileState', '$sce', function(tileState, $sce){
        
    this.tile = tileState.selectedTile;
    
    //@todo: remove str.replace fix below when embed api is updated to support 'scheme'
    this.tile.settings.htmlSafe = $sce.trustAsHtml(this.tile.settings.html.replace('src=\"//cdn.embed', 'src=\"http://cdn.embed'));
    
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
    
    this.findEmbed = function(url, width, height, success, fail){
        var url = this.url;
        var width = 220;
        var height = '';
        
        var urlstr = "?url="+encodeURIComponent(url)+"&width="+width+"&height="+height+'&scheme='+callApi.device.scheme;
        
        callApi.get(callApi.apisettings.apiembed+urlstr, function(data){
            tileState.selectedTile.settings = data._embedded.embed[0];
            tileState.selectedTile.name = data._embedded.embed[0].title;  
        });
    };
}])

;