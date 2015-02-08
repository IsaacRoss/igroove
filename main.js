/**
 * Created by Isaac on 2/7/2015.
 */
(function(iGroove, dom){
    'use strict';
     var storage = iGroove.storage();


    dom.addEventListener('DOMContentLoaded', function(event){

        var button = document.getElementById('btnSearch');
        var searchBox = document.getElementsByTagName('input')[0];
        button.onclick = function(){
            var searchTerm = searchBox.value;
            getSearchResults(searchTerm);
            searchBox.value = '';
        };
        searchBox.onkeydown = function(e){
            //enter key
            if(e.which === 13){
                e.preventDefault();
                // trigger click.
                button.click();
            }
        };

        function getSearchResults(searchTerm){
            iGroove.jsonp(iGroove.config.etsyApi + 'listings/active.js?' +
            iGroove.serialize({
                api_key: iGroove.config.apiKey,
                keywords: searchTerm
            }), function(err, data){
                var frag = dom.createDocumentFragment(),
                    results = dom.getElementById('results');
                results.innerHTML = '';
                data.results.forEach(function(d){
                    var div = dom.createElement('div');
                    div.innerText = d.title;
                    frag.appendChild(div);
                });
                results.appendChild(frag);
            });
        }
    })

})(this.isaacGroove, document);