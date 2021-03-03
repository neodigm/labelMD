var catcount = (function(_d,_q){  //  Report on number of products by category | Scott C. Krause 2020 - see gist
    "use strict";
    var aSub = [];

    
    return {
        init: function(){
            aSub = [].slice.call( _d.querySelectorAll( _q ) ).filter(function( el ){
                return (el.href && (el.href.indexOf("browse") !== -1));
            });
        } }

})(document, "#main-content .sub-cat > a");
catcount.init();
