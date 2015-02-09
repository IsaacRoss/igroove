/**
 * Created by Isaac on 2/7/2015.
 */
(function(iGroove, dom){
    'use strict';



    dom.addEventListener('DOMContentLoaded', function(){

        var store = iGroove.storage();
        var collection;

        var savedsearches = document.getElementById('savedsearches');
        var button = document.getElementById('btnSearch');
        var searchBox = document.getElementById('search');
        var saveSearch = document.getElementById('saveSearch');
        loadPreviousResults();



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

        function loadPreviousResults(){
            savedsearches.innerHTML = '';
            var x = JSON.parse(store.get('searches'));
            collection = x && x['isaacGroove:data'] || [];
            // load any previously saved searches.
            for(var i = 0; i< collection.length; i++){
                var st = collection[i];
                bookmarkSearch(st);
            }

        }

        function bookmarkSearch(searchterm){
            var saved = Object.create(iGroove.SearchButton);
            var li = document.createElement('li');
            var a = dom.createElement('a');
            savedsearches.appendChild(li);
            saved.SearchClicked = function(){
                getSearchResults(this.label);
            };
            saved.setup(125, 25, searchterm);
            store.save({
                searches: collection
            });
            saved.build(li);
            a.className = 'removeSearch';
            a.innerText = 'remove item';
            a.onclick = function(){
              removeSearchItem(searchterm);
            };
            li.appendChild(a);

        }

        function removeSearchItem(sItem){
            collection = collection.filter(function(x){
                return x !== sItem;
            });
            store.save({searches: collection});
            loadPreviousResults();

        }

        function getSearchResults(searchTerm){
            var frag = dom.createDocumentFragment(),
                results = dom.getElementById('results');
            results.textContent = 'Loading Search Results...';
            iGroove.jsonp(iGroove.config.etsyApi + 'listings/active.js?' +
            iGroove.serialize({
                api_key: iGroove.config.apiKey,
                keywords: searchTerm
            }), function(err, data){
                if(err){
                    alert('Unable to get listings.')
                }
                if(!data.results){
                    results.textContent = 'No Results Found.';
                    return;
                }
                results.textContent = '';
                data.results.forEach(function(d){

                    var listing = dom.createElement('div');
                    var desc = dom.createElement('div');
                    var h2 = dom.createElement('h2');
                    desc.className = 'description';
                    desc.textContent = d.description;
                    listing.className = 'etsyresult';
                    h2.textContent = iGroove.decode(d.title);
                    listing.appendChild(h2);
                    listing.appendChild(desc);
                    frag.appendChild(listing);
                });
                results.appendChild(frag);
            });
        }
    })

})(this.isaacGroove, document);