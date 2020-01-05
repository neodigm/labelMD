"use strict";
[].slice.call( document.querySelectorAll(".collapsible") )
    .filter(function( _e ){ // Expand Collapsed Footer Links on Mobile
        _e.addEventListener("click", function( _ev ){
            var cStyle = this.nextElementSibling.style;
            this.classList.toggle( "active" );
            cStyle.display = ((cStyle.display === "block") ? "none" : "block" );
        });
    }
);