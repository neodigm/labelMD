"use strict";
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

function fireTealiumEv(_fromLoc,status) {	
	if(_fromLoc && status) {
		var eventVar = {};
		eventVar["e_"+_fromLoc+"_email_"+status] = "t";
		fireTealiumEvent(eventVar);
	}	
}

var fButtonPassiveValidationError = function( eButton, sType, sCTA ){
    if( eButton ){
        var thisButton = eButton, oSt = eButton.style;
        if( eButton.dataset.hasError !== "true"){
            eButton.dataset.hasError = "true";
            eButton.style.backgroundColor = "#d0021b";
            eButton.style.color = "#fff";
            eButton.innerHTML = "Invalid<br>" + sType;
            eButton.style.lineHeight="1.2";
            eButton.style.width = 66 + "px";
            eButton.style.minWidth = 66 + "px";
            setTimeout(function(){
                thisButton.innerHTML = sCTA;
                thisButton.style = oSt;
                thisButton.dataset.hasError = "false";
            }, 2800);
        }
    }
}

var fEmailSignUpOnClick = function(event){	
	if(event){
		var eEmail = event.target.parentNode.getElementsByClassName("js-eml__input--field")[0];	
		if( eEmail ){
			if( isEmailValid( eEmail.value ) ){				
				fireTealiumEvent({"e_header_email" : "t"});			
				event.target.parentNode.getElementsByClassName("js-email__addr")[0].setAttribute("value",eEmail.value);
				var xhr = new XMLHttpRequest();
				var oFormElement = event.target.parentNode.getElementsByTagName("form")[0];		
				var location = oFormElement.dataset.location;		
				xhr.onload = function() {				  
				  //success case		 
				  var resp = xhr.responseText;
				  var xhrResJson = JSON.parse(resp);			
					var newSignUp = xhrResJson.newEmailSignUp;
					if (newSignUp == true) {
						if(ltdc_snackbar){
							ltdc_snackbar.q("Thank you for signing up for Emails");
						}
						fireTealiumEv(location,"success");
						
					} else {
						if(ltdc_snackbar){
							ltdc_snackbar.q("Thank you|We already have you on our List.");
						}
						fireTealiumEv(location,"existing");		
					}	
					eEmail.value = "";
					if( ltdc_reveal.isOpen ){ 
						ltdc_reveal.close();
					}
				}
				xhr.onerror = function() {  //failure case
				  //console.log (xhr.responseText); 
				}  
				xhr.open (oFormElement.method, oFormElement.action, true);
				xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				xhr.send (new FormData (oFormElement));
			}else{	
				var sButton = event.target.parentNode.getElementsByClassName("js-eml__submit--button")[0];
				fButtonPassiveValidationError(sButton,'Email','Sign Up');				
			}
		}
	}
  return false;
}

var signUpBtns = document.querySelectorAll(".js-eml__submit--button");
for (var i=0; i < signUpBtns.length; i++) {
	signUpBtns[i].addEventListener("click", function(e){fEmailSignUpOnClick(e)} );
}

var addrInputFields= document.querySelectorAll(".js-eml__input--field");
for (var j=0; j < addrInputFields.length; j++) {	
	addrInputFields[j].addEventListener("keydown", function(e){
		if(e.keyCode == 13){
			fEmailSignUpOnClick(e);
			return false;
		}
	});
}