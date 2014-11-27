'use strict';

tileTypes

.run(['tileState', function(tileState){
    tileState.addTemplate(
    {
        size: "double",
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
.controller('appTileController', ['tileState', '$scope', function (tileState, $scope) {
    this.tileEdit = function ($event) {
        
        var obj = $($event.target).closest(".tile");
        if (obj.hasClass('selected')) {
            obj.removeClass('selected');
            tileState.setTile();
            tileState.edit = false;
        } else {
            $(".tile.selected").removeClass('selected');
            $($event.target).closest(".tile").addClass('selected');
            tileState.setTile($scope.tile);
            tileState.edit = true;
            
        }
    };
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/app/tile.html";
    };

}])

.controller('appMenuController', function(){

})

;