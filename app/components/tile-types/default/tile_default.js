'use strict';

tileTypes

.controller('defaultTileController', ['tileState', '$scope', function (tileState, $scope) {
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
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/default/tile.html";
    };

}])

.controller('defaultMenuController', function(){

})

;