'use strict';

angular.module('ltbapi', [])

//settings
.value('apisettings', {
        apiuri: 'https://api.ltb.io/',
        apistack: 'stack/',
        apitile: 'tile/'
    }
)

.service('callApi', ["apisettings", "$http", "$filter", "$routeParams", function(apisettings, $http, $filter, $routeParams) {
    
    this.state = {
        stack : [],
        screen : [],
        tiles : []
    }
    
    this.doit = function(call){
        return this.apiuri;
    };

    this.getStack = function(stackid){
        stackid = stackid || 1;
        var stackcntr = this;
        //var $api_str = 'data/data-stack-'+stackid+'-temp.json';
        var $api_str = apisettings.apiuri + apisettings.apistack + stackid;
        $http.get($api_str).success(function(data){
            stackcntr.state.stack = angular.fromJson(data.raw);
            stackcntr.getTiles();
        });
    };

    this.getTiles = function(screen){
        var thescreen = screen || this.state.stack.startscreen || 1;
        this.state.screen = $filter('filter')(this.state.stack.screens, function (s) {return s.id === thescreen;})[0];
        this.state.tiles = this.state.screen.tiles;
    };
    
    this.putStack = function(stack, stackid){
        //todo save stack to API
    }
}]);