"use strict";
var oPersPopup = (function( doc, sSaveQry ){  //  Validate pers edit
    var aInputs, eSaveBtn, fCallback;
    var aMsg = ["", "Please enter Required field", "Please enter date in valid format"];
    return {
        "bind": function( sQuery, fCB ){  //  Bind can be re-executed as needed
            if( typeof fCB === "function" ) fCallback = fCB;  //  Callback to submit Form
            aInputs = [].slice.call( doc.querySelectorAll( sQuery ) );
            eSaveBtn = doc.querySelectorAll( sSaveQry )[0];
            if( eSaveBtn && (aInputs.length > 0) ){
                eSaveBtn.removeEventListener("click", oPersPopup.saveClick );
                eSaveBtn.addEventListener("click", oPersPopup.saveClick );
            }
        },
        "saveClick": function(){  //  When the Save button is clicked
            var bHasError = false;
            oPersPopup.hideErrors();  //  Clean State
            aInputs.forEach( function( eInp ){  //  Check for Required
                var sPtrn = eInp.dataset.validPattern;
                if( sPtrn && (sPtrn[0] === "*") && (eInp.value === "") ){
                    bHasError = true;
                    eInp.nMsg = 1;
                }else{
                    eInp.nMsg = 0;
                }
            });
            aInputs.forEach( function( eInp ){  //  Check for Date Formats
                var sPtrn = eInp.dataset.validPattern;
                if( sPtrn && ( !oPersPopup.isValidDt( eInp.value, sPtrn ) ) ){
                    bHasError = true;
                    eInp.nMsg = 2;
                }else{
                    if( eInp.nMsg === 2 ) eInp.nMsg = 0;
                }
            });
            if( bHasError ){  //  Display Each Error
                aInputs.forEach( function( eInp ){
                    if( eInp.nMsg !== 0) oPersPopup.showError( eInp, aMsg[ eInp.nMsg ] );
                });
            }else{  //  All good
                fCallback();
            }
        },
        "hideErrors": function(){
            [].slice.call( doc.querySelectorAll(".pers-error__feedback") ).forEach(function(eSc){
                eSc.classList.add( "hide" );
            });
        },
        "showError": function( eInp, sMsg ){  //  Unhide error message
            var eSc = eInp.nextElementSibling;
            if( eSc ){
                var eP = eSc.firstElementChild;
                if( eP ){
                    eP.innerHTML = sMsg;
                    eSc.classList.remove( "hide" );
                }
            }
        },
        "isValidDt": function( sVal, sPattern ){
            sPattern = sPattern.replace("*", "").toUpperCase();
            switch( sPattern ){  //  Validate Date Format against Pattern
                case "YY":
                    if( sVal ){
                        return ( sVal.length === 2 && ( !isNaN( sVal ) ));
                    }
                break;
                case "YYYY":
                    if( sVal ){
                        return ( sVal.length === 4 && ( !isNaN( sVal ) ));
                    }
                break;
                case "MM.DD.YYYY":
                    var nLen = sVal.length, sDelm = sVal[2];
                    if( nLen !== 10 ) return false;
                    if( sDelm ){
                        var sValNum = sVal.split( sDelm ).join("");
                        return ( sValNum.length === 8 && ( !isNaN( sValNum ) ));
                    }
                break;
                case "MM.DD.YY":
                    var nLen = sVal.length, sDelm = sVal[2];
                    if( nLen !== 8 ) return false;
                    if( sDelm ){
                        var sValNum = sVal.split( sDelm ).join("");
                        return ( sValNum.length === 6 && ( !isNaN( sValNum ) ));
                    }
                break;
                case "YYYY-YYYY":
                    var nLen = sVal.length, sDelm = sVal[4];
                    if( nLen !== 9 ) return false;
                    if( sDelm ){
                        var sValNum = sVal.split( sDelm ).join("");
                        return ( sValNum.length === 8 && ( !isNaN( sValNum ) ));
                    }
                break;
            }
            return true;  //  Not a Date
        }
    }
})( document, ".js-pers-save" );

oPersPopup.bind( ".l-editPers .input-pers", function(){
    console.log("---- Submit Form Logic Here   ----")
    console.log("---- Form input is valid      ----")
} );