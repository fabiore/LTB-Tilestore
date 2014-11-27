'use strict';

tileTypes

.run(['tileState', function(tileState){
//    tileState.addTemplate(
//    {
//        type: "default",
//        title: "Content tile",
//        description: "Supply content",
//        template: {
//            size: "",
//            colour: "purple",
//            name: "new content",
//            icon: "file-text-o",
//            position: 0,
//            settings: {},
//            type: "default"
//        }
//        
//    }
//    );
}])
.controller('defaultTileController', ['tileState', '$scope', function (tileState, $scope) {
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
       return  "components/tile-types/default/tile.html";
    };

}])

.controller('defaultMenuController', function(){

})

;