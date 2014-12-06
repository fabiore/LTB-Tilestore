'use strict';

tileTypes

.run(['tileState', function(tileState){
    tileState.addTemplate(
    {
        size: "",
        colour: "red",
        icon: "camera",
        type: "qrcode",
        name: "QR Decode",
        description: "Open camera for decode qrcode",
        template: {
            size: "",
            colour: "red",
            name: "QR Decode",
            icon: "camera",
            position: 0,
            settings: {},
            type: "qrcode"
        }
        
    }
    );
}])

.controller('qrcodeTileController', ["tileState", "callApi", "$scope", "$cordovaBarcodeScanner", function (tileState, callApi, $scope, $cordovaBarcodeScanner) {
//.controller('qrcodeTileController', ["tileState", "callApi", "$scope", function (tileState, callApi, $scope) {
                //make sure the inserted tile is not a template
    if(!$scope.tiletemplate && callApi.state.tiles[$scope.tileindex].template){
        callApi.state.tiles[$scope.tileindex] = callApi.state.tiles[$scope.tileindex].template;
        $scope.tile = callApi.state.tiles[$scope.tileindex];
    }
    this.tileEdit = function ($event) {
        console.log('edit');
        tileState.tileEdit($event, $scope.tile, $scope.tileindex);
    };
    
    this.tileTemplateUrl = function(){
       return  "components/tile-types/qrcode/tile.html";
    };
    
    this.scanQR = function() {
        $cordovaBarcodeScanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                }, 
                function (error) {
                    alert("Scanning failed: " + error);
            }
        );
    };
    
}])

.controller('qrcodeMenuController', ['callApi', 'tileState', function(callApi, tileState){
    this.tileDelete = function (){
        console.log('index',tileState);
        callApi.deleteTile(tileState.tileindex);
        tileState.setTile();
        
    };
}])

;