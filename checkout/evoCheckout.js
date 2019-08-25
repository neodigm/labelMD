"use strict";

//  grid columns
var oXCheck_grids = [{
    "query": "#main-content div.small-10.medium-10.large-4.resp_col_pad_l.columns",
    "add":["large-5"],
    "remove":["large-4"],
},
{
    "query": "#orderSummaryContainerId",
    "add":["large-5"],
    "remove":["large-6"],
}];

//  Content areas
var QQQQoXCheck_content = [{
    "query": "#main-content > section:nth-child(30)|ltd",
    "add":["hide"],
    "remove":[""],
},
{
    "query": "#main-content > section:nth-child(31)|ltd",
    "add":["hide"],
    "remove":[""],
}];

//  logo
var oXCheck_logo = [{
    "query": "#main-content > ltdc-toplogo > nav",
    "add":["h-txt__align--center"],
    "remove":["l-grid"],
}];

function changeClass( oXCheck, sBrn ){  //  Add or Remove Class by Element and Brand
    var nC = 0;
    oXCheck.forEach( function( aE ){
        aE.aQuery = aE.query.split("|");  //  Optional Brand Criterion
        var eL = document.querySelectorAll( aE.aQuery[0] )[0];
        var sB = ( aE.aQuery[1] ) ? aE.aQuery[1].toUpperCase() : sBrn;
        if( sB === sBrn ){
            if( eL ){
                aE.add.forEach( function( sCn ){ if( sCn ) eL.classList.add( sCn )} );
                aE.remove.forEach( function( sCn ){ if( sCn ) eL.classList.remove( sCn )} );
                nC++;
            }else{ console.log("!--- element not found ---! " + aE.query ); }
        }
    });
    return nC;
}

changeClass( oXCheck_grids, document.body.dataset.brand );
changeClass( oXCheck_logo, document.body.dataset.brand  );

function fAsyncSnip( _d, _url, _sId, _cb){
    var oXhr = new XMLHttpRequest(), _eTarg = _d.getElementById( _sId );
    oXhr.open("GET", _url, true);
    oXhr.onreadystatechange = function(){
        if( this.readyState!==4 || this.status!==200 ) return;
        _eTarg.innerHTML = this.responseText;
        if( _cb ) _cb();
    };
    oXhr.send();
}

fAsyncSnip( document, "evoCheckout_template.html", "orderSummaryContainerId", function(){
    console.log("-------------duck----");
})
