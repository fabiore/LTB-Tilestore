'use strict';

angular.module('ltbapi', [])

//settings
.value('apisettings', {
        apiuri: 'https://api.ltb.io/',
        apistack: 'stack',
        apitile: 'tile',
        apiembed: 'embed'
    }
)

.service('callApi', ["AccessToken", "apisettings", "$http", "$filter", "$routeParams", function(AccessToken, apisettings, $http, $filter, $routeParams) {
    
    this.state = {
        stack : [],
        screen : [],
        tiles : []
    };
    
    this.headers = function(){
        var headers = {};
        if(AccessToken.get()){
            headers = { Authorization : 'Bearer '+AccessToken.get().access_token};
        }
        return headers;
    };
    
    this.send = function(request, success, fail){
        var promise = $http.get(apisettings.apiuri + request, { headers: this.headers() });
        if(success){
            promise.success(success);
        }
        if(fail){
            promise.fail(fail);
        }
    };

    //Stack collection
    this.getStacks = function(){
        var stackcntr = this;
        
        this.send(apisettings.apistack, function(data){
            console.log(angular.fromJson(data.raw));
        });
    };
    
    //Stack Entity
    this.getStack = function(stackid){
        stackid = stackid || 1;
        var stackcntr = this;
        
        this.send(apisettings.apistack + "/"+ stackid, function(data){
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
    };
    
    //Embed, usage: callApi.getEmbed('https://www.youtube.com/watch?v=bHEG6b91dG8', 200, null);
    this.getEmbed = function(url, width, height, success, fail){
        width = width || '';
        height = height || '';
        var apisrv = this;
        
        success = success || function(data){console.log(data);};
        fail = fail || function(data){console.log(data);};
        
        var urlstr = "?url="+encodeURIComponent(url)+"&width="+width+"&height="+height;
        this.send(apisettings.apiembed+urlstr, success, fail);
    };
}]);