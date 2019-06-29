"use strict";

var oTopLogo = (function( doc, sID, sInput, sCat, sFAQ, sCQO, sC2A ){
	var _bOpened = false;
	var _eEmailOffers = doc.getElementById( sID );
	var _eEmailInput = doc.getElementById( sInput );
	var _eEmailCat = doc.getElementById( sCat );
	var _eFAQ = doc.getElementById( sFAQ );
	var _eCQO = doc.getElementById( sCQO );
	var _eC2A = doc.getElementById( sC2A );
	_eEmailOffers.addEventListener("click", function() { oTopLogo.open(); });
	doc.body.addEventListener("click", function( e ){  //  Outside Click close
	  var eTarget = e.target, bInside = false;
	  while( eTarget.tagName !== "HTML" ){  //  Disregard clicks from within
	    if( eTarget.id == "js-toplogo-slide__email--id" ){ bInside = true; break; }
	    eTarget = eTarget.parentNode;
	  }
	  if( !bInside ){
	    oTopLogo.close();
	  }
	}, true);
	return {
		"open" : function(){
			_bOpened = true;
			_eEmailOffers.classList.add( "toplogo__slide--opened" );
			setTimeout(function(){ oTopLogo.focus(); }, 286);
			_eEmailCat.classList.add("toplogo__slide--offset");
			_eC2A.classList.remove( "slide-init__hide" );
			if( _eFAQ && _eCQO){
				_eFAQ.classList.add("toplogo__slide--offset");
				_eCQO.classList.add("toplogo__slide--offset");
			}
		},
		"close" : function(){
			_bOpened = false;
			_eEmailOffers.classList.remove( "toplogo__slide--opened" );
			_eEmailInput.classList.add( "hide" );
			_eEmailCat.classList.remove("toplogo__slide--offset");
			_eC2A.classList.add( "slide-init__hide" );
			if( _eFAQ && _eCQO){
				_eFAQ.classList.remove("toplogo__slide--offset");
				_eCQO.classList.remove("toplogo__slide--offset");
			}
		},
		"focus" : function(){
			_eEmailInput.classList.remove( "hide" );
			_eEmailInput.focus();
		}
	};
})(document, "js-toplogo-slide__email--id", "js-toplogo-slide__input--id", "js-toplogo__cat--id", "js-toplogo__faq--id", "js-toplogo__cqo--id", "js-toplogo-email__btn--id");

var emlSignUpOnClick = function(){
	var eEmail = document.getElementById("js-toplogo-slide__input--id");
	if( eEmail ){
		if( isEmailValid( eEmail.value ) ){
			fireTealiumEvent({"e_header_email" : "t"});	
			var xhr = new XMLHttpRequest();
			var oFormElement = document.getElementById("eSignUpForm");		 
			xhr.onload = function() {				  
			  //success case		 
			  var resp = xhr.responseText;
			  var xhrResJson = JSON.parse(resp);			
				var newSignUp = xhrResJson.newEmailSignUp;
				if (newSignUp == true) {					
					if(ltdc_snackbar){
						ltdc_snackbar.q("Thank you for signing up for Emails");
					}
					fireTealiumEvent({"e_header_email_success" : "t"});	
				} else {
					if(ltdc_snackbar){
						ltdc_snackbar.q("Thank you|We already have you on our List.");	
					}
					fireTealiumEvent({"e_header_email_existing" : "t"});
				}
				eEmail.value=""
			}
			xhr.onerror = function() {  //failure case
			  //console.log (xhr.responseText); 
			}  
			xhr.open (oFormElement.method, oFormElement.action, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send (new FormData (oFormElement));
		}else{
			if(ltdc_snackbar){
				ltdc_snackbar.q("Please Enter Valid Email","error");
			}
		}
	}
  return false;
}

var signUpBtn = document.getElementById("js-toplogo-email__btn--id");
if(signUpBtn != null) {
	signUpBtn.addEventListener("click", emlSignUpOnClick );
}

var emlAddr = document.getElementById('js-toplogo-slide__input--id');
if(emlAddr != null) {
   emlAddr.onkeydown = function(e){
	   if(e.keyCode == 13){ 
	   	   emlSignUpOnClick();
		   return false;
	   }
   };
}

function isEmailValid( _sEmail ){
	var _isValid = false, _eReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;  //  Legacy RegEx
	if(_sEmail){
		if( _sEmail.indexOf("@") !== -1 ){
			if( _sEmail.indexOf(".") !== -1 ){
				_isValid = _eReg.test( _sEmail );
			}
		}
	}
    return _isValid;
}