"use strict";

var oCheckoutPageState = (function( doc ){ // Maintain the state of the Checkout page progress
    var nStateAvail = 1;  //  1 thru 3
    var nStateCurrent = 1;  //  1 thru 3
    var aTask, eStep, eEdit;  //  
    var bExpedited = false;  //  Three or Four buttons (states)
    return {
        "rebind": function(){
            aTask = [].slice.call( doc.querySelectorAll("[data-step-state]") );  //  Bubble Buttons
            eStep = [].slice.call( doc.querySelectorAll("[data-step-banner]") );  //  Step Banners
        },
        "setState": function( _nState ){  //  Set the state and maybe the available state
            nStateCurrent = _nState;
            if( nStateAvail <= nStateCurrent) nStateAvail = nStateCurrent;
        },
        "getState": function(){  //  Retun the current state number
            return nStateCurrent;
        },
        "getStateAvail": function(){  //  Return the highest available state number
            return nStateAvail;
        }
    }
})( document );

oCheckoutPageState.rebind();

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
                    aE.removeEventListener( "click", oSimpleExpand.click );
                    aE.addEventListener( "click", oSimpleExpand.click );                    
                }
            });
        },
        "click": function( eV ){ // hide or show
            var eDet = this.eDet;
            var aDecl = this.aDecl;
            if( eDet.classList.contains("hide") ){
                eDet.classList.remove("hide");
                if( aDecl[1] ) this.classList.add( aDecl[1] );
                if( aDecl[2] ) { // swap temp
                    aDecl[3] = this.innerHTML;
                    this.innerHTML = aDecl[2];
                }
            }else{
                eDet.classList.add("hide");
                if( aDecl[1] ) this.classList.remove( aDecl[1] );
                if( aDecl[3] ) this.innerHTML = aDecl[3]; // undo
            }
        }
    }
})( document );

oSimpleExpand.rebind();

var oEComCheck_lgo = (function( doc, sQry ){  //  Handle Logo Click in Checkout
    var aLgos = [].slice.call( doc.querySelectorAll( sQry  ) );
    var eT = doc.querySelector(".l-talk");
    var eStay = doc.querySelector(".js-talk-stay");
    return {
        "rebind": function(){
            if( aLgos && (aLgos.length > 0) && eT && eStay){
                aLgos.forEach(function( eLg ){
                    eLg.removeEventListener("click", oEComCheck_lgo.talk );
                    eLg.addEventListener("click", oEComCheck_lgo.talk );
                });
                eStay.removeEventListener("click", oEComCheck_lgo.talk );
                eStay.addEventListener("click", oEComCheck_lgo.talk );
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