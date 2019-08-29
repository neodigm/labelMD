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

//  step panel
var oXCheck_panel = [{
    "query": ".cmd_stp",
    "add":[""],
    "remove":["panel","radius"],
}];



function changeClass( oXCheck, sBrn ){  //  Add or Remove Class by Element and Brand
    var nC = 0;
    oXCheck.forEach( function( aE ){
        aE.aQuery = aE.query.split("|");  //  Optional Brand Criterion

        [].slice.call( document.querySelectorAll( aE.aQuery[0] ) ).filter(function( eL ){
            var sB = ( aE.aQuery[1] ) ? aE.aQuery[1].toUpperCase() : sBrn;
            if( sB === sBrn ){
                if( eL ){
                    aE.add.forEach( function( sCn ){ if( sCn ) eL.classList.add( sCn )} );
                    aE.remove.forEach( function( sCn ){ if( sCn ) eL.classList.remove( sCn )} );
                    nC++;
                }else{ console.log("!--- element not found ---! " + aE.query ); }
            }
        });

    });
    return nC;
}

function fAsyncSnip( _d, _uri, sId, _cb){  //  Get snippet and put in template on body
    var oXhr = new XMLHttpRequest();
_uri = "https://neodigm.github.io/labelMD/checkout/" + _uri;
    oXhr.open("GET", _uri, true);
    oXhr.onreadystatechange = function(){
        if( this.readyState!==4 || this.status!==200 ) return;
        var _div = _d.createElement( "div" );
        _div.id = sId;
        _div.innerHTML = this.responseText;
        _d.getElementsByTagName( "body" )[0].appendChild( _div );
        if( _cb ) _cb();
    };
    oXhr.send();
}

function fAsyncJS( _d, _uri, _cb ){  //  Load CSS Async then callback
    var _link = _d.createElement( "link" );
_uri = "https://neodigm.github.io/labelMD/checkout/" + _uri;
    _link.rel = "stylesheet";
    if( _cb ) _link.onload = function(){ _cb(); };
    _link.href = _uri;
    _d.getElementsByTagName( "head" )[0].appendChild( _link );
}

fAsyncSnip( document, "evoCheckout_template.html", "js-template", function(){
    console.log("---- snippet loaded html ----");
    [].slice.call( document.querySelectorAll("#js-template SECTION") ).filter(function( _sect ){
        var eTarget = document.querySelectorAll( _sect.dataset.targetQuery )[0];
        if( eTarget ){
            //var _newSect = document.createElement( "section" );
            eTarget.insertAdjacentElement("afterEnd", _sect);
        }
    });
});

if( window.location.href.indexOf("purchase.jsp") !== -1 ){
    fAsyncJS( document, "evoCheckout_override.css", function(){
        changeClass( oXCheck_grids, document.body.dataset.brand );
        changeClass( oXCheck_logo,  document.body.dataset.brand );
        changeClass( oXCheck_panel,  document.body.dataset.brand );
        console.log("---- snippet loaded css---- " + window.location.href );
    });    
}

