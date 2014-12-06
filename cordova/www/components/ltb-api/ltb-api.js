'use strict';

angular.module('ltbapi', [])

//settings
.value('apisettings', {
        apiuri: 'https://api.ltb.io/',
        authprovider: 'https://api.learning-layers.eu/o/oauth2',
        authclientid: '889b4051-bdbb-40e9-8692-251a93e239c7',
        apistack: 'stack',
        apitile: 'tile',
        apiembed: 'embed'
    }
).value('localsettings', {
        apiuri: 'http://localhost/LTB-API/public/',
        authprovider: 'https://api.learning-layers.eu/o/oauth2',
        authclientid: '889b4051-bdbb-40e9-8692-251a93e239c7',
        apistack: 'stack',
        apitile: 'tile',
        apiembed: 'embed'
    }
)

.service('callApi', ["AccessToken", "apisettings", "deviceDetector","$http", "$filter", "$routeParams", function(AccessToken, apisettings, deviceDetector, $http, $filter, $routeParams) {
    
    this.state = {
        mystacks: {},
        stackid : 0,
        stackfields : {},
        stack : [],
        screen : [],
        tiles : []
    };
    this.device = {
        os: deviceDetector.os,
        browser: deviceDetector.browser,
        device: deviceDetector.device,
        raw: deviceDetector.raw,
        scheme: window.location.protocol || 'http'
    };
    console.log(this.device);
    
//  API SETTINGS:  
//  apisettings = global settings
//  localsetttings = local settings
    this.apisettings = apisettings;
    
    this.headers = function(){
        var headers = {};
        
        if(AccessToken.get()){
            headers = { Authorization : 'Bearer '+AccessToken.get().access_token};
        }
        return headers;
    };
    this.jsonp = function(request, success, fail){
        var promise = $http.jsonp(request);
        if(success){
            promise.success(success);
        }
        if(fail){
            promise.error(fail);
        }
    };
    
    this.rawget = function(request, success, fail, options){
        var promise = $http.get(request, options);
        if(success){
            promise.success(success);
        }
        if(fail){
            promise.error(fail);
        }
    };
    
    this.get = function(request, success, fail){
        this.rawget(this.apisettings.apiuri + request, success, fail, { headers: this.headers() });
    };
    
    this.patch = function(request, data, success, fail){
        console.log(this.apisettings.apiuri + request, data, { headers: this.headers() });
        var promise = $http.patch(this.apisettings.apiuri + request, data, { headers: this.headers() });
        
        if(success){
            promise.success(success);
        }
        if(fail){
            promise.error(fail);
        }
    };

    //Stack collection
    this.getStacks = function(){
        var stackcntr = this;
        
        this.get(this.apisettings.apistack, function(data){
            stackcntr.state.mystacks = angular.fromJson(data._embedded.stacks);
           
            console.log(angular.fromJson(data._embedded.stacks));
        });
    };
    
    //Stack Entity
    this.getStack = function(stackid){
        stackid = stackid || 1;
        var stackcntr = this;
        
        this.get(this.apisettings.apistack + "/"+ stackid, function(data){
            
            stackcntr.state.stack = angular.fromJson(data.details);
            stackcntr.state.stackfields = angular.fromJson(data);
            stackcntr.state.stackid = stackid;
            stackcntr.getTiles();
        });
        
//        $http.get('data/newdata-1.json').success(function(data){
//            stackcntr.state.stack = angular.fromJson(data);
//            stackcntr.getTiles();
//        });
    };

    this.getTiles = function(screen){
        var thescreen = screen || this.state.stack.startscreen || 1;
        this.state.screen = $filter('filter')(this.state.stack.screens, function (s) {return s.id === thescreen;})[0];
        this.state.tiles = this.state.screen.tiles;
         console.log(this.state.tiles);
    };
    
    this.patchStack = function(){
        var callApi = this;
        angular.forEach(this.state.stack.screens, function(s, k){
                if(s.id === callApi.state.screen.id){
                    callApi.state.screen.tiles = callApi.state.tiles;
                    callApi.state.stack.screens[k].tiles = callApi.state.tiles;
                }
            });
            
        
        var stackcntr = this;
        var stackdata = {
            details : this.state.stack            
        };
        this.patch(this.apisettings.apistack + "/"+ this.state.stackid, stackdata, function(data){
            
            console.log(data);
            //@todo: succesfully saved!!!
        });
        
    };
    
    this.deleteTile = function(tileindex){
        console.log('tileindex', tileindex);
        this.state.tiles.splice(tileindex, 1);
    };
}]);