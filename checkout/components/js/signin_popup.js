"use strict"
var oSignIn = (function( dc, sQuery, sIDs ){  //  Sign-In and I Forgot Modal Validation Logic (from Cart)
  var eForgotLink = dc.querySelectorAll( sQuery ), bForgotLink = false;  //  Modal State
  var eC2A_save = dc.getElementById( sIDs[0] ), eC2A_reset = dc.getElementById( sIDs[1] );  //  Buttons
  var eSI_email = dc.getElementById( sIDs[2] ), eSI_pw = dc.getElementById( sIDs[3] );  //  INPUT sign in
  var eIF_email = dc.getElementById( sIDs[4] );  //  INPUT I forgot
  return {
    "bind": function(){
      if( eForgotLink ){  //  Show Sign-In UI with Forgot link.
    	  if ( eForgotLink[1] ) {
	        eForgotLink[1].addEventListener( "click", function( ev ){
	          bForgotLink = true;
	          eForgotLink[0].classList.add("hide");
	          eForgotLink[2].classList.remove("hide");
	        });
    	  }
        if( eC2A_save && eC2A_reset && eSI_email && eSI_pw && eIF_email ){
          [ eC2A_save, eC2A_reset ].forEach( function( el ){  //  Bind event to buttons
            el.addEventListener("click", function( ev ){
              var aMsg = ["","Please Enter Your|Email Address", "Please Enter Your|Password"], nMsg = 0;
              if( bForgotLink ){
                if( eIF_email.value === "" ) nMsg = 1;
              }else{
                if( eSI_pw.value === "" ) nMsg = 2;
                if( eSI_email.value === "" ) nMsg = 1;
              }
              if( nMsg ){
                if( typeof ltdc_snackbar !== "undefined" ) ltdc_snackbar.q( aMsg[ nMsg ], "error" );
              }else{
                if( bForgotLink ){
                	//SUBMIT FORGOT 
                	submitForgotPassword()//  Form is valid
                }else{
                	//SUBMIT SIGN IN 
                	submitSignIn()
                }
              }
            });
          });
        }
      }
    },
    "signin": function(){  //  This should be called whenever the modal is opened.
      if( eForgotLink ){  // Init state is Sign-In (not I forgot).
        bForgotLink = false;
        if (eForgotLink[0]){
        	eForgotLink[0].classList.remove("hide");
        }
        if (eForgotLink[2]){
        	eForgotLink[2].classList.add("hide");
        }
        //Reset all elements on the form
       if (document.getElementById("displayPasswordError"))
        	document.getElementById("displayPasswordError").classList.add("hidden");
        if (document.getElementById("displayLoginError"))
        	document.getElementById("displayLoginError").classList.add("hidden");
        if (document.getElementById("js-sign-in__email"))
        	document.getElementById("js-sign-in__email").value="";
        if (document.getElementById("js-sign-in__password"))
        	document.getElementById("js-sign-in__password").value="";
        if (document.getElementById("js-forgot__email"))
        	document.getElementById("js-forgot__email").value="";
      }
    }
  }
})( document, ".js-forgot__view", ["js-sign-in__save", "js-forgot__reset", "js-sign-in__email", "js-sign-in__password", "js-forgot__email"]);
oSignIn.bind();
function submitForgotPassword(){
	if( typeof oEvoCart != "undefined" ){
		oEvoCart.blockUISpinner(true);
	}
	var errorContent=document.getElementById("displayPasswordError");
	var xhr = new XMLHttpRequest();
	var oFormElement = document.getElementById("scForgotPassword"); 
	xhr.onload = function() {
		if( typeof oEvoCart != "undefined" ){
			oEvoCart.blockUISpinner(false);
		}
		var resp = xhr.responseText;		
		if (resp.search("XXXForgotPasswordError")>0){
			var start=resp.indexOf("scForgotPasswordError");
			var end=resp.indexOf("</div>", start);
			var errM=resp.substring(start+23, end);
			if (errorContent) {
				errorContent.classList.remove("hidden");				
				errorContent.innerHTML = errM;
			}
		}else{			
			var start=resp.indexOf("pId=");
			var end=resp.indexOf('"', start);
			var profileId=resp.substring(start+4, end);
			window.location.href = "/my_account/reset_password.jsp?pId="+profileId;
		}
	}
	xhr.onerror = function() {
		console("error");
	}
	xhr.open (oFormElement.method, oFormElement.action, true);	
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send (new FormData (oFormElement));
}
function submitSignIn(){
	if( typeof oEvoCart != "undefined" ){
		oEvoCart.blockUISpinner(true);
	}
	var errorContent=document.getElementById("displayLoginError");
	var xhr = new XMLHttpRequest();
	var oFormElement = document.getElementById("scReturningLogin"); 
	xhr.onload = function() {
		if( typeof oEvoCart != "undefined" ){
			oEvoCart.blockUISpinner(false);
		}
		var resp = xhr.responseText;
		if (resp.search("XXXLoginError")>0){
			var start=resp.indexOf("scLoginError");
			var end=resp.indexOf("</div>", start);
			var errM=resp.substring(start+14, end);
			if (errorContent) {
				errorContent.classList.remove("hidden");				
				errorContent.innerHTML = errM;
			}
		}else{
			window.location.href = "/checkout/shopping_cart.jsp";
		}
	}
	xhr.onerror = function() {
		console.log (xhr.responseText); 
	}
	xhr.open (oFormElement.method, oFormElement.action, true);	
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send (new FormData (oFormElement));
}
var ver_code= document.getElementById("js-have_code");
if (ver_code){
document.getElementById("js-have_code").addEventListener("click",function( e ){	
	var forgot_email = document.getElementById("js-forgot__email");
	if (forgot_email.value === ""){
		 if( typeof ltdc_snackbar !== "undefined" ) ltdc_snackbar.q( "Please Enter Your|Email Address", "error" );
	}else{
		document.getElementById('have_ver_code').value="true";	
		submitForgotPassword();
	}
	}); 
}
var sign_in_email = document.getElementById("js-sign-in__email");
if(sign_in_email){
	sign_in_email.addEventListener("keydown",  function(e){
	var key = e.which || e.keyCode;
    if (key === 13) {
    	if (sign_in_email.value === ""){
    		 if( typeof ltdc_snackbar !== "undefined" ) ltdc_snackbar.q( "Please Enter Your|Email Address", "error" );
    	}else{
    		submitSignIn(e); 
    	}
    }
	});
}
var sign_in_password = document.getElementById("js-sign-in__password");
if(sign_in_password){
	sign_in_password.addEventListener("keydown",  function(e){
	var key = e.which || e.keyCode;
    if (key === 13) {
    	if (sign_in_password.value === ""){
    		if( typeof ltdc_snackbar !== "undefined" ) ltdc_snackbar.q( "Please Enter Your|Password", "error" );
    	}else{
    		submitSignIn(e); 
    	}
    		
    }
	});
}
var forgot_email = document.getElementById("js-forgot__email");
if(forgot_email){
	forgot_email.addEventListener("keydown",  function(e){
	var key = e.which || e.keyCode;
    if (key === 13) { 
    	if (forgot_email.value === ""){
    		 if( typeof ltdc_snackbar !== "undefined" ) ltdc_snackbar.q( "Please Enter Your|Email Address", "error" );
    	}else{
    		submitForgotPassword(e); 	
    	}
    		
    	}
	});
}