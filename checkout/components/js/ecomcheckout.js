"use strict";
var oWatchRadio = (function( doc, sQuery ){
    var aRad = [].slice.call( doc.querySelectorAll( sQuery ) ), aInp;
    var aFrm = [].slice.call( doc.querySelectorAll( "FORM" ) );
    return {
        rebind: function(){
            aRad.forEach(function( _el ){
                _el.eWatchRadio = _el.querySelectorAll("INPUT")[0];
                _el.removeEventListener("click", oWatchRadio.clickRadio );
                _el.addEventListener("click", oWatchRadio.clickRadio );
            });
            aFrm.forEach(function( _Fm ){
                _Fm.removeEventListener("click", oWatchRadio.synceRadio );
                _Fm.addEventListener("click", oWatchRadio.synceRadio );
            }); 
        },
        clickRadio: function( _ev ){
            if(  _ev.target.tagName.toUpperCase() === "A" ){
                _ev.preventDefault();
                _ev.stopPropagation();
                oWatchRadio.synceRadio();
                return false;
            }
            this.eWatchRadio.click();
            this.dataset.addrCardSelect = "true";
            oWatchRadio.synceRadio();
        },
        synceRadio: function(){
            aRad.forEach(function( _el ){
                _el.dataset.addrCardSelect = ( _el.querySelectorAll("INPUT")[0].checked ) ? "true" : "false";
            } );
        }
    }
})( document, "[data-addr-card-select]" );

oWatchRadio.rebind();

function doit(){
    oSimpleExpand.click();
}

if( false ){
    var oSimpleExpand = (function( doc ){ // Simple expand / collapse
        var aSum, aDet; // Summary and Details paired elements 1:1
        return {
            "rebind": function(){
                aSum = [].slice.call( doc.querySelectorAll("[data-expand-summary]") );
                aDet = [].slice.call( doc.querySelectorAll("[data-expand-details]") );
                aSum.forEach( function( aE ){
                    var aDecl = aE.dataset.expandSummary.split("|");
                    if(  aDecl.length > 0 ){
                        aE.aDecl = aDecl;
                        aE.eDet = aDet.filter( function( eDet ){ // match
                            if( eDet.dataset.expandDetails == aDecl[0] ){ return true; }
                        })[0];
                        aE.addEventListener( "click", oSimpleExpand.click );                    
                    }
                });
            },
            "click": function( eV ){ // hide or show
                var eDet = this.eDet;
                var aDecl = this.aDecl;
                if( eDet.dataset.eventHide == "hide" ){
                    eDet.classList.remove("hide");
                    eDet.dataset.eventHide = "none";
                    if( aDecl[1] ) this.classList.add( aDecl[1] );
                    if( aDecl[2] ) { // swap temp
                        aDecl[3] = this.innerHTML;
                        this.innerHTML = "aDecl[2]";
                    }
                }else{
                    eDet.classList.add("hide");
                    eDet.dataset.eventHide = "hide";
                    if( aDecl[1] ) this.classList.remove( aDecl[1] );
                    if( aDecl[3] ) this.innerHTML = "aDecl[3]"; // undo
                }
            }
        }
    })( document );
   // oSimpleExpand.rebind();
}

document.getElementsByClassName("js-view__items--id")[0].addEventListener("click", function( eV ){
    var eDet = document.getElementById("resp_ccp_1_v");
    if( eDet ){
        if( eDet.dataset.eventHide == "hide" ){
            eDet.classList.remove("hide");
            eDet.dataset.eventHide = "none";
        }else{
            eDet.classList.add("hide");
            eDet.dataset.eventHide = "hide";
        }
    }
console.log("elk | " + eDet.classList );
});

var oEComCheck_lgo = (function( doc, sQry ){  //  Handle Logo Click in Checkout
    var aLgos = [].slice.call( doc.querySelectorAll( sQry  ) );
    var eT = doc.querySelector(".l-talk");
    var eStay = doc.querySelector(".js-talk-stay");
    return {
        "rebind": function(){
            if( aLgos && (aLgos.length > 0) && eT && eStay){
                aLgos.forEach(function( eLg ){
                    if( eLg.dataset.eventClicked !== "true" ){
                        eLg.addEventListener("click", oEComCheck_lgo.talk );
                        eLg.dataset.eventClicked = "true";
                    }
                });
                if( eStay.dataset.eventClicked !== "true" ){
                    eStay.addEventListener("click", oEComCheck_lgo.talk );
                    eStay.dataset.eventClicked = "true";
                }
            }
        },
        "talk": function(){
            if( eT ){
                if( eT.classList.contains("hide") ){
                    eT.classList.remove("hide");
                }else{
                    eT.classList.add("hide");
                }
            } 
        }
    }
})( document, ".l-ecomCheck__lgo a" );

oEComCheck_lgo.rebind();