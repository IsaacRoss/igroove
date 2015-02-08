/**
 * Created by Isaac on 2/7/2015.
 */
(function(iGroove){
    'use strict';

    if(!iGroove) throw new Error('storage.isaacGroove: core Required');

    iGroove.storage = function(opts){
        var store, publicChain, expires;

        opts = opts || {};
        if('expires' in opts && typeof opts.expires === 'number' && opts.expires > 0){
            expires = opts.expires + (new Date()).getTime();
        }
        if(opts.expires == 'session') store = sessionStorage;
        else store = localStorage;

        function save(data){
            var key, val;

            for(key in data){
                if(data.hasOwnProperty(key)){
                    val = { 'isaacGroove:data': data[key] }
                    if(expires) val['isaacGroove:expires'] = expires;

                    store.setItem(key, JSON.stringify(val));
                }
            }
            return publicChain;
        }

        function discard(keys) {
            if (keys + '' != '[object Array]') keys = [keys];
            for (var i = 0; i < keys.length; i++) {
                store.removeItem(keys[i]);
            }
            return publicChain;
        }

        publicChain = {
            save: save,
            discard: discard
        }
        return publicChain;
    }

})(this.isaacGroove);