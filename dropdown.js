/*jshint browser: true*/

/*
Simple dropdowns.
Expects: container > a.dropdown-toggle + ul
Position: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
*/
;(function () {
    "use strict";

    function Dropdown(settings) {
        this.container = settings.container;
        this.position = settings.position || 'top-left';

        if (this.container) {
            this.toggle = this.container.querySelector('.dropdown-toggle');
            this.list = this.container.querySelector('ul');
            this.anchors = this.list.querySelectorAll('a');
            this.list.className = 'align-' + this.position;
            this.bindHandlers();
        }
    }


    /*
    Bind handlers
    */
    Dropdown.prototype.bindHandlers = function () {
        this.toggle.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (this.toggle.className.indexOf('active') === -1) {
                this.toggle.className += ' active';
                this.list.className += ' active';
            } else {
                this.toggle.className = this.toggle.className.replace(/ active/, '');
                this.list.className = this.list.className.replace(/ active/, '');
            }
        }.bind(this));

        this.container.addEventListener('click', function (event) {
            event.stopPropagation();
        }.bind(this));

        for (var i = 0; i < this.anchors.length; i++) {
            this.anchors[i].addEventListener('click', function () {
                this.close();
            }.bind(this));
        }

        document.addEventListener('click', this.close);
        document.addEventListener('touchstart', this.close);
    };


    /*
    Close all dropdowns
    */
    Dropdown.prototype.close = function () {
        var toggles = document.querySelectorAll('.dropdown-toggle'),
            lists = document.querySelectorAll('.dropdown-toggle + ul'),
            i;

        for (i = 0; i < toggles.length; i++) {
            toggles[i].className = toggles[i].className.replace(/ active/, '');
        }
        for (i = 0; i < lists.length; i++) {
            lists[i].className = lists[i].className.replace(/ active/, '');
        }
    };


    window.Dropdown = Dropdown;
}());
