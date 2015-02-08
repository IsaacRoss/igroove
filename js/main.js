/**
 * Created by Isaac on 2/7/2015.
 */
(function(iGroove, dom){
    'use strict';



    dom.addEventListener('DOMContentLoaded', function(){

        var store = iGroove.storage();
        var x = JSON.parse(store.get('searches'));
        var collection = x && x['isaacGroove:data'] || [];
        var savedsearches = document.getElementById('savedsearches');
        var button = document.getElementById('btnSearch');
        var searchBox = document.getElementById('search');
        var saveSearch = document.getElementById('saveSearch');

        // load any previously saved searches.
        for(var i = 0; i< collection.length; i++){
            var st = collection[i];
            bookmarkSearch(st);
        }


        button.onclick = function(){
            var searchTerm = searchBox.value;
            if(saveSearch.checked){
                collection.push(searchTerm);
                bookmarkSearch(searchTerm);


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

        function bookmarkSearch(searchterm){
            var saved = Object.create(iGroove.SearchButton);
            var li = document.createElement('li');
            savedsearches.appendChild(li);
            saved.SearchClicked = function(){
                getSearchResults(this.label);
            };
            saved.setup(125, 50, searchterm);
            store.save({
                searches: collection
            });
            saved.build(li);
        }

        function getSearchResults(searchTerm){
            var frag = dom.createDocumentFragment(),
                results = dom.getElementById('results');
            results.innerHTML = 'Loading Search Results...';
            iGroove.jsonp(iGroove.config.etsyApi + 'listings/active.js?' +
            iGroove.serialize({
                api_key: iGroove.config.apiKey,
                keywords: searchTerm
            }), function(err, data){
                if(err){
                    alert('Unable to get listings.')
                }
                if(!data.results){
                    results.innerHTML = 'No Results Found.';
                    return;
                }
                results.innerHTML = '';
                data.results.forEach(function(d){
                    var listing = dom.createElement('div');
                    var desc = dom.createElement('div');
                    var h2 = dom.createElement('h2');
                    desc.className = 'description';
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