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

var fEmailSignUpOnClick = function(){
	var eEmail = document.getElementById("emailAddressFieldId");
	if( eEmail ){
		if( isEmailValid( eEmail.value ) ){
			var xhr = new XMLHttpRequest();
			var oFormElement = document.getElementById("emailSignUpFormId");		 
			xhr.onload = function() {				  
			  //success case		 
			  var resp = xhr.responseText;
			  var xhrResJson = JSON.parse(resp);			
				var newSignUp = xhrResJson.newEmailSignUp;
				if (newSignUp == true) {	
					document.getElementsByClassName('close-reveal-modal')[0].click();
					document.getElementById('dispEmailSignUpModalNew').click();					
				} else {					
					document.getElementsByClassName('close-reveal-modal')[0].click();
					document.getElementById('dispEmailSignUpModalExisting').click();				
				}
				fireTealium();
			}
			xhr.onerror = function() {  //failure case
			  //console.log (xhr.responseText); 
			}  
			xhr.open (oFormElement.method, oFormElement.action, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send (new FormData (oFormElement));
		}else{
			var _eEButton = document.getElementById("js-email-submit__btn");
			_eEButton.text = "Invalid Email";
			_eEButton.classList.add("eml-msg__button--err");
			setTimeout(function(){ _eEButton.text = "Sign Up"; _eEButton.classList.remove("eml-msg__button--err"); }, 2800);
		}
	}
  return false;
}

var signUpBtn = document.getElementById("js-email-submit__btn");
if(signUpBtn != null) {
	signUpBtn.addEventListener("click", fEmailSignUpOnClick );
}

var addrField = document.getElementById('emailAddressFieldId');
if(addrField != null) {
	addrField.onkeydown = function(e){
	   if(e.keyCode == 13){
		   fEmailSignUpOnClick();
		   return false;
	   }
	};
}






