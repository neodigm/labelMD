"use strict";
var oPersPopup = (function( doc, sSaveQry ){  //  Validate pers edit
    var aInputs, eSaveBtn, fCallback;
    var aMsg = ["", "Please enter Required field", "Please enter date in valid format", "You have used non-allowed characters"];
    return {
        "bind": function( sQuery, fCB ){  //  Bind can be re-executed as needed
            if( typeof fCB === "function" ) fCallback = fCB;  //  Callback to submit Form
            aInputs = [].slice.call( doc.querySelectorAll( sQuery ) );
            eSaveBtn = doc.querySelectorAll( sSaveQry )[0];
            if( eSaveBtn && (aInputs.length > 0) ){
                eSaveBtn.removeEventListener("click", oPersPopup.saveClick );
                eSaveBtn.addEventListener("click", oPersPopup.saveClick );
            }else{
                eSaveBtn.addEventListener("click", fCallback );  //  No Inputs found
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
            aInputs.forEach( function( eInp ){  //  Check for Invalid characters
            	var result= true;  
            	var legalRegex = /^[\w, \-, \,, ;, :, \', \", #, \., \!, \&]+$/g
            	if (eInp.value)
            		result = legalRegex.test(eInp.value.trim());            	
            	 //if all characters are legal, then result will be true, otherwise will be false 
            	if (!result) {
            		bHasError = true;
            		eInp.nMsg = 3;
            		 
            	 }else{
            		 if( eInp.nMsg === 3 ) eInp.nMsg = 0;
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
                    if( sDelm ){
                        var sValNum = sVal.split( sDelm ).join("");
                        return ( sValNum.length === 8 && ( !isNaN( sValNum ) ));
                    }else{ return ( nLen === 0 ); }
                break;
                case "MM.DD.YY":
                    var nLen = sVal.length, sDelm = sVal[2];
                    if( sDelm ){
                        var sValNum = sVal.split( sDelm ).join("");
                        return ( sValNum.length === 6 && ( !isNaN( sValNum ) ));
                    }else{ return ( nLen === 0 ); }
                break;
                case "YYYY-YYYY":
                    var nLen = sVal.length, sDelm = sVal[4];
                    if( sDelm ){
                        var sValNum = sVal.split( sDelm ).join("");
                        return ( sValNum.length === 8 && ( !isNaN( sValNum ) ));
                    }else{ return ( nLen === 0 ); }
                break;
                case "MONTH DD, YYYY":
                    var nLen = sVal.length, sDelm = " ";
                    if( sVal.indexOf( sDelm ) != -1 ){
                        var aVal = sVal.split( sDelm );
                        var bMonth = ( (aVal[0].length > 2) && isNaN( aVal[0] ) );
                        var bCom = ( aVal[1].indexOf(",") !== -1 );
                        var bDay = ( (!isNaN( aVal[1].replace(",","") )) && (aVal[1].length === 3) );
                        var bYear = ( (aVal[2].length === 4 ) && !isNaN( aVal[2] ) );
                        return ( bMonth && bDay && bCom && bYear );
                    }else{ return ( nLen === 0 ); }
                break;
            }
            return true;  //  Not a Date
        }
    }
})( document, ".js-pers-save" );