"use strict";
var fSMSSignUpOnClickDroplet = function(event){
	var phone = event.target.parentNode.getElementsByClassName("js-sms__input")[0];
	var siteId = event.target.parentNode.getElementsByClassName("js-siteId__input")[0].value;
	var smsUrl = event.target.parentNode.getElementsByClassName("js-smsUrl__input")[0].value;
	var location = event.target.parentNode.getElementsByClassName("js-location__input")[0].value;
	var g_error = event.target.parentNode.getElementsByClassName("js-error__input")[0].value;
	var oEl = event.target.parentNode.getElementsByClassName("js-sms__button")[0];
	var smsStatusResponse = "";	
	var smsStatus ="";	
	var tealium_sms_success = {};
	tealium_sms_success["e_"+location+"_sms_success"]="t";
	var tealium_sms_existing = {};
	tealium_sms_existing["e_"+location+"_sms_existing"]="t";	
	if( phone ){
		if( isPhoneValid( phone.value ) ){
			fSpinner( oEl, document.body.dataset.brand, true);
			var phoneValue = phone.value.replace(/\W/g, '');
			var params ={
					"mobileNumber": phoneValue,
					"site": siteId
			}
			axios.get(smsUrl,{params: params}, {'timeout': 1000} )
			.then(function ( response ) {
				fSpinner( oEl, document.body.dataset.brand, false);
				smsStatusResponse = response.data;	
				smsStatus = smsStatusResponse.smsStatus;
				switch (smsStatus){
					case "202":
					case"active": 
						ltdc_snackbar.q(smsStatusResponse.messageContent);
						//clean the input box
						var smsInputs= document.querySelectorAll(".js-sms__input");
						var j = 0;
						for (j; j < smsInputs.length; j++) {
							smsInputs[j].value="";
						}
						if( !ltdc_promo_drawer.isDocked() ){ 
						    ltdc_promo_drawer.toggle();
						}
						break;
					default:
						ltdc_snackbar.q(smsStatusResponse.messageContent, "error");
						break;
				}				
				fireTealiumEvent({
					"e_header_sms" : "t"
				});				
				switch (smsStatus){
					case "202": // sms success						
						fireTealiumEvent(tealium_sms_success);
						break;
					case "active": // already existing
						fireTealiumEvent(tealium_sms_existing);						
						break;
				}
			})
			.catch(function ( error ) {
				ltdc_snackbar.q(g_error, "error");
			});		
		}else{
			//ltdc_snackbar.q("Please enter a valid phone", "error");
			fButtonPassiveValidationErrorPhone( oEl, "Phone", "Text Me" );
		}
	}
	return true;
}

var fButtonPassiveValidationErrorPhone = function( eButton, sType, sCTA ){
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

var fSpinner = function( eButton, sBrand, bSpinner){

	if( eButton && sBrand ){
		if( bSpinner ){
			var eSpinImg = new Image();
			eSpinImg.src = "/images/" + sBrand.toLowerCase() + "_spinner_small.gif";
			eSpinImg.id = "js-spin__img--id";
			eButton.dataset.spinText = eButton.innerHTML;
			eButton.innerHTML = "";
			eButton.appendChild( eSpinImg );
		}else{
			var eSpinImg = document.getElementById( "js-spin__img--id" );
			eButton.removeChild( eSpinImg );
			if( eButton.dataset ) eButton.innerHTML = eButton.dataset.spinText;
		}
	}
}


var signSMSUpBtns = document.querySelectorAll(".js-sms__button");
var i = 0, length = signSMSUpBtns.length;
for (i; i < length; i++) {
	signSMSUpBtns[i].addEventListener("click", function(e){
		var eButton = e.target.parentNode.getElementsByClassName("js-sms__button")[0];
		if(eButton && eButton.innerHTML.indexOf("Invalid") === -1)
			fSMSSignUpOnClickDroplet(e);
		});
};

var smsInputs= document.querySelectorAll(".js-sms__input");
var j = 0;
for (j; j < smsInputs.length; j++) {
	smsInputs[j].addEventListener('input', function (e) {
		  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		  e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
		});
	smsInputs[j].addEventListener("mouseover", function(){
		this.placeholder="(___)___-____";
	});
	smsInputs[j].addEventListener("mouseout", function(){
		this.placeholder="Mobile Phone";
	});
	smsInputs[j].addEventListener("keydown", function(e){
		if(e.keyCode == 13){
			var eButton = e.target.parentNode.getElementsByClassName("js-sms__button")[0];
			if(eButton && eButton.innerHTML.indexOf("Invalid") === -1){
				fSMSSignUpOnClickDroplet(e);
				return false;
				}
		   }
	});
	
}

function isPhoneValid(phone){
	var _isValid = true;
	if (phone ==''){
		_isValid=false;
	}else{
		_isValid=phone.match(/\d/g).length===10;
	}	
	return _isValid;
}