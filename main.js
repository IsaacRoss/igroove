/**
 * Created by Isaac on 2/7/2015.
 */
(function(iGroove, dom){
    'use strict';


    dom.addEventListener('DOMContentLoaded', function(event){

        var button = document.getElementById('btnSearch');
        var searchBox = document.getElementById('search');
        var saveSearch = document.getElementById('saveSearch');
        button.onclick = function(){
            var searchTerm = searchBox.value;
            if(saveSearch.checked){

            }
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
                if(err){
                    alert('Unable to get listings.')
                }
                var frag = dom.createDocumentFragment(),
                    results = dom.getElementById('results');
                results.innerHTML = '';
                data.results.forEach(function(d){
                    var listing = dom.createElement('div');
                    var desc = dom.createElement('div');
                    desc.className = 'description';
                    var h2 = dom.createElement('h2');
                    desc.innerText = d.description;
                    listing.className = 'etsyresult';
                    h2.innerText = iGroove.decode(d.title);
                    listing.appendChild(h2);
                    listing.appendChild(desc);
                    frag.appendChild(listing);
                });
                results.appendChild(frag);
            });
        }
    })

})(this.isaacGroove, document);