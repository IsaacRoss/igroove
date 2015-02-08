/**
 * Created by Isaac on 2/8/2015.
 */
(function(iGroove){
    'use strict';

    var Widget = {
        init: function(width, height){
            this.width = width || 50;
            this.height = height || 50;
            this.$elem = null;
        },
        insert: function($where){
            if(this.$elem){
                this.$elem.style.width = this.width + 'px';
                this.$elem.style.height = this.height + 'px';
            }
            $where.appendChild(this.$elem);
        }
    };

    var SearchButton = Object.create(Widget);
    SearchButton.setup = function(width, height, label){
        var btn, t;
        this.label = label || 'Default';
        btn = document.createElement('button');
        t = document.createTextNode(this.label);
        this.init(width, height);
        btn.appendChild(t);
        this.$elem = btn;
    };
    SearchButton.build = function($where){
        this.insert($where);
        this.$elem.onclick = this.SearchClicked.bind(this);
    };


    SearchButton.SearchClicked = function(evt){
        console.log('button ' + this.label + 'clicked');
    };

    iGroove.SearchButton = SearchButton;

})(this.isaacGroove);