/**
 * Created by Isaac on 2/7/2015.
 */
(function(global) {
    'use strict';

    var getCount = idGen();
    var pfx = '__igv';
    var param = 'callback';

    global.isaacGroove = {
        config: {
            etsyApi: 'https://openapi.etsy.com/v2/',
            apiKey: 'h5uibwhy1kmoug0jwgfs3oox'
        },
        jsonp: jsonp,
        serialize: function(obj){
            var str = [];
            for(var p in obj){
                if(obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
            }
            return str.join('&');
        },
        decode: function(str){
            str = str.replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");
            return str;
        }
    };

    // increment value
    function idGen() {
        var x = 1;
        return function(){
            x++;
            return x;
        }
    }

    function jsonp(url, options, fn) {
        var id = pfx + getCount(),
            script,
            timer;
        var target = document.getElementsByName('script')[0] || document.head;
        //second param maybe just the callback function if no options
        if (typeof options === 'function') {
            //set the second param to the function and options to nothing
            fn = options;
            options = {};
        }
        if (!options) options = {};

        // add callback to url, check for querystring or not to know whether to & or ?
        url += (~url.indexOf('?') ? '&' : '?') + param + '=' + encodeURIComponent(id);
        url = url.replace('?&', '?');

        global[id] = function (data) {
            if (fn) fn(null, data);
        };

        function cleanUp() {
            if(script.parentNode) script.parentNode.removeChild('script');
            global[id] = function(){};
        }

        function cancel(){
            if(global[id]){
                cleanUp();
            }
        }

        // create script
        script = document.createElement('script');
        script.src = url;
        target.parentNode.insertBefore(script, target);

        return cancel;
    }
})(this);