'use strict';

tileTypes

.controller('embedTileController', ['tileState', '$scope', '$sce', function (tileState, $scope, $sce) {
    this.tileClick = function ($event) {
        
        var obj = $($event.target).closest(".tile");
        if (obj.hasClass('selected')) {
            obj.removeClass('selected');
            tileState.setTile();
        } else {
            $(".tile.selected").removeClass('selected');
            $($event.target).closest(".tile").addClass('selected');
            tileState.setTile($scope.tile);
            
        }
    };
    
    $scope.tile.settings.htmlSafe = $sce.trustAsHtml($scope.tile.settings.html);
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/embed/tile.html";
    };

}])

.controller('embedMenuController', ['callApi', 'tileState', '$sce', function(callApi, tileState, $sce){
    this.url = '';
    this.findEmbed = function(){
        callApi.getEmbed(this.url, null, 80, function(data){
            console.log(data._embedded.embed[0]);
            tileState.selectedTile.settings = data._embedded.embed[0];
            tileState.selectedTile.name = data._embedded.embed[0].title;
            $("#embedPreview").append( data._embedded.embed[0].html);
            tileState.selectedTile.settings.htmlSafe = $sce.trustAsHtml(tileState.selectedTile.settings.html);
           // $('#tile-embed').html(data._embedded.embed[0].html);
        });
    };
}])

;