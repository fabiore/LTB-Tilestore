'use strict';

tileTypes

.run(['tileState', function(tileState){
//    tileState.addTemplate(
//    {
//        type: "navigate",
//        title: "Navigation",
//        description: "Navigate to screen",
//        template: {
//            size: "",
//            colour: "red",
//            name: "navigate",
//            icon: "compass",
//            position: 0,
//            settings: {},
//            type: "navigate"
//        }
//        
//    }
//    );
}])
.controller('navigateTileController', ['tileState', '$scope', function (tileState, $scope) {
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
       return  "components/tile-types/navigate/tile.html";
    };

}])

.controller('navigateMenuController', function(){

})

;