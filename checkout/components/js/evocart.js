"use strict";
var oSignIn_inline = (function( doc, aClasses ){
    var eSignInLink = doc.getElementsByClassName( aClasses[0] );  //  Sign in link
    var eSignInSum  = doc.getElementsByClassName( aClasses[2] );  //  View Summary link
    return {
        "init": function(){  //  Wire click events
            if( eSignInLink && eSignInSum ){
            	if(eSignInLink[0]){
	                eSignInLink[0].addEventListener("click", function(ev){
	                    ltdc_reveal.autoOpen( aClasses[1] );
	                    if(typeof oSignIn != "undefined" ) oSignIn.signin();
	                });
            	}
            	if(eSignInSum[0]){
	                eSignInSum[0].addEventListener("click", function(ev){
	                    doc.getElementsByClassName( aClasses[3] )[0].scrollIntoView();
	                });
            	}
            }
        }
    }
})( document, ["js-signin__link", "modalSignin", "js-view__summary", "l-evoCartRight__totals"] );
oSignIn_inline.init();

var oSimpleQty = (function( doc ){ // Simple Minus, Plus and Keystoke capture
    var aNav, fCall, bDebounce=false; // Array of elements, callback function, and mutex
    return {
        "rebind": function( fBack ){ // Call after region is reloaded
            fCall = fBack;
            aNav = [].slice.call( doc.querySelectorAll("[data-quantity-id]") );
            if( aNav && (typeof fCall === "function") ){ // Wire events
                aNav.forEach( function( eNav ){
                    eNav.aNavSub = eNav.querySelectorAll("A, INPUT");
                    eNav.nQty = Number( eNav.aNavSub[1].value );
                    eNav.sSKU_id = eNav.dataset.quantityId;
                    [0,2].forEach( function( nSub ) {
                        eNav.aNavSub[ nSub ].removeEventListener( "click", oSimpleQty.changeQty );
                        eNav.aNavSub[ nSub ].addEventListener( "click", oSimpleQty.changeQty );
                    });
                    eNav.aNavSub[ 1 ].removeEventListener( "blur", oSimpleQty.changeQty );
                    eNav.aNavSub[ 1 ].addEventListener( "blur", oSimpleQty.changeQty );
                } );
            }
        },
        "changeQty": function( evChange ){
            var eNav = this.parentElement, nChng = 0; // nav container
            if( evChange.type == "click"){
                if( this.classList.contains( "qty-step__action--plus" ) ){ 
                    var nMax = eNav.dataset.maxQty;
                    if( !nMax ) nMax = 999;
                    nChng = ( eNav.nQty <= 998 ) ? 1 : 0;
                    if( oSimpleQty.isMaxQty( eNav.nQty, nMax ) ){
                        nChng = 0;
                    }
                }
                if( this.classList.contains( "qty-step__action--minus" ) ){ 
                    nChng = ( eNav.nQty >= 2 ) ? -1 : 0;
                }
                eNav.nQty = eNav.nQty + nChng;
                eNav.aNavSub[1].value = eNav.nQty;
            }else{
                if( !bDebounce ){
                    bDebounce = true; // Stream Keystrokes
                    oSimpleQty.debounce( eNav );
                }
            }
            if( nChng ) fCall( eNav.sSKU_id, eNav.nQty);
        },
        "debounce": function( eNav ){ // Delay action is events are too fast
            var nChng, sChng;
            sChng = eNav.aNavSub[1].value.trim();
            if( oSimpleQty.isValid(sChng) ){
                var nMax = eNav.dataset.maxQty;
                if( !nMax ) nMax = 999;
                if( oSimpleQty.isMaxQty( sChng, nMax ) ){
                    nChng = 0;
                    eNav.aNavSub[1].value = eNav.nQty; // revert
                }else{
                    eNav.nQty = nChng = Number( sChng );
                }
            }else{
                eNav.aNavSub[1].value = eNav.nQty; // revert
            }
            if( nChng ) fCall( eNav.sSKU_id, eNav.nQty ); // Exe Callback
            bDebounce = false;
        },
        "isValid": function( sChng ){
            if( sChng !== "" && !isNaN( sChng ) && !(sChng < 1) ){
                return true;
            }
        },
        "isMaxQty": function( sChng, sMax ){
            if( Number( sChng ) >= Number( sMax ) ){
                if( typeof ltdc_snackbar !== "undefined" ){
                    var sPhone = "833-267-2203";
                    if( document.body.dataset.brand === "LS" ){
                        sPhone = "833-267-2204";
                    }
                    ltdc_snackbar.q("The online order limit for this item is " + sMax + ". To place a larger order, please call us at " + sPhone+".", "maxQty");
                }
                return true;
            }else{
                return false;
            }
        }
    }
})( document );
var updateCart = function(commerceItemId){
	oEvoCart.blockUISpinner(true);
	var xhr = new XMLHttpRequest();
	var oFormElement = document.getElementById("shoppingCart"); 
	xhr.onload = function() {				
		updateGiftContents();
		updateCartContents()		
	  	oEvoCart.refresh(["items","totals","wishes","empty"]);
		fireTealiumAjaxEvent({
			"pagename" : "shopping-cart",
			"pagetype" : "cart"		
		});		
	}
	xhr.onerror = function() { 
	}

	xhr.open (oFormElement.method, oFormElement.action, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send (new FormData (oFormElement));
	
}
var updateRemoval = function(commerceItemId,articleId){
	document.getElementById("removalInput").value = commerceItemId;
	fireTealiumEvent({"e_remove_cart" : "t"});
	updateCart();
	callCertona({ event: "removefromcart", itemid: articleId });
}
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

var submitCouponForm = function(e){
	e.preventDefault();
	oEvoCart.blockUISpinner(true);
	var xhrCoupon = new XMLHttpRequest();
	var couponCode = document.getElementById("applyCouponInput").value;
	var oCouponFormElement = document.getElementById("couponCodeForm"); 
	xhrCoupon.onload = function() {
		oEvoCart.updateSection(["totals", "?promoCode="+couponCode]  );	
	}
	xhrCoupon.open (oCouponFormElement.method, oCouponFormElement.action, true);
	xhrCoupon.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhrCoupon.send (new FormData (oCouponFormElement));
}
var oEvoCart_config = {  //  Configuration Object
    aSections: [
    {ID:"items" ,elID:"js-evoCartLeft__items", url:"evoCartLeft_items.jsp"},
    {ID:"recom" ,elID:"js-evoCartLeft__recom", url:"evoCartLeft_recom.jsp"},
    {ID:"wishes",elID:"js-evoCartLeft__wishes",url:"evoCartLeft_wishes.jsp"},
    {ID:"totals",elID:"js-evoCartRight__totals",url:"evoCartRight_totals.jsp"},
    {ID:"empty",elID:"js-evoCartContent__empty",url:"evoCartEmpty.jsp"}]
};
var oEvoCart = (function( doc, oConf ){
    oConf.aSections.forEach( function( e ){ // Populate NodeArray
        e.elSection = doc.querySelectorAll( "." + e.elID )[0]; // js-class
    });
    return {
        refresh: function( aSects ){
            var self = this;
            aSects.forEach( function( e ){
                self.updateSection( e );
            });
        },
        updateSection: function( sSect, fCB ){ // Given a section name, fetch then bind
            var uri_param="";
            if( typeof sSect === "object" ){
                uri_param = sSect[1];
                sSect = sSect[0];
            }
            var self = this, nCnt = 0;
            oConf.aSections.forEach( function( e ){
                if( e.ID === sSect ){
                    var elSection = e.elSection; // Node ref
                    if(elSection){
                    	self.fAsyncGet(nCnt, uri_param, function( sRespn ){
                        e.elSection.innerHTML = sRespn; });
                        setTimeout( function(){ self.bind( sSect ); }, 1000 );
                    }
                }
                nCnt++;
            } );
            oEvoCart.blockUISpinner(false);
        },
        bindAll: function(){  //  Wire all events upon first page load
            var self = this;
            oEvoCart_config.aSections.forEach( function ( aSec ){
                self.bind( aSec.ID );
            }); 
        },
        bind: function( sSect ){  //  Init the newly loaded section
            var elSection = oEvoCart_config.aSections.filter( function ( aSec ){
                if( aSec.ID === sSect ) return true;
            })[0].elSection;
            switch( sSect ){
                case "items":
                    oSimpleQty.rebind( function( sSKU_id, nQty ){
                    	updateCart();
                    });
                    oSignIn_inline.init();
                break;
                case "recom":
                break;
                case "totals":
                    if( typeof oTopmenu != "undefined" ){
                        elSection.style.top = "60px";//oTopmenu.getTopmenuLoc();
                    }
                    if(doc.getElementsByClassName("js-more-info-shipping")[0]){
	                    doc.getElementsByClassName("js-more-info-shipping")[0]
	                    .addEventListener("click", function( e ){
	                    	ltdc_reveal.autoOpen("shippingChart" );
	                    	fireTealiumEvent({"e_calculate_shipping" : "t"});
	                    });
                    }
                    if(doc.getElementsByClassName("js-more-info-tax")[0]){
	                    doc.getElementsByClassName("js-more-info-tax")[0]
	                    .addEventListener("click", function( e ){
	                    	ltdc_reveal.autoOpen("taxInfo" );
	                    	fireTealiumEvent({"e_zipcode_shipping" : "t"});
	                    });
                    }
                    var estTaxForm = doc.getElementById("submitEstimateTaxForm");
                    if(estTaxForm){
                    	estTaxForm.addEventListener("click",  function(e){
                    		estimateTax(e);
                        	fireTealiumEvent({"e_calculate_taxes" : "t"});
                    		});                    	
                    }
                    var estTaxInput = doc.getElementById("custZipCode");
                    if(estTaxInput){
                    	estTaxInput.addEventListener("keydown",  function(e){
	                    	var key = e.which || e.keyCode;
	                        if (key === 13) {
	                        	estimateTax(e);
	                        	fireTealiumEvent({"e_calculate_taxes" : "t"});
	                        }
                    	}); 
                    	estTaxInput.addEventListener("input", function( e ){
                    		var v = e.target.value;
                    		e.target.value =  v.replace(/[^0-9]/g, "");
                    	});
                    }
                    var applyPromoCode = doc.getElementById("applyCouponCode");
                    if(applyPromoCode){
                    	applyPromoCode.addEventListener("click",  function(e){submitCouponForm(e)});
                    } 
                    var promoCouponInput = doc.getElementById("applyCouponInput");
                    if(promoCouponInput){
                    	promoCouponInput.addEventListener("keydown",  function(e){
                    	var key = e.which || e.keyCode;
                        if (key === 13) {
                        	submitCouponForm(e);
                        	}
                    	});
                    }
                    // Progress Bar Update Begin
                    var eProgB = doc.getElementsByClassName("ProgressBar__value")[0];
                    if( eProgB && eProgB.dataset.perCent ){
                        var perCent = Number( eProgB.dataset.perCent );
                        if( perCent > 100 ) perCent = 100;
                        eProgB.style.width = perCent + "%";
                    }
                    // Progress Bar Update End                    
                break;
            }
            setTimeout( oSimpleExpand.rebind(), 800);
        },
        blockUISpinner: function(bSpinner) {
        	var eButton = document.getElementById("js-sc-spin__img--id");
        	if (eButton) {
        		if (bSpinner) {
        			eButton.className = eButton.className.replace(/\bhidden\b/g, "");
        		} else {
        			var name, arr;
        			name = "hidden";
        			arr = eButton.className.split(" ");
        			if (arr.indexOf(name) == -1) {
        				eButton.className += " " + name;
        			}
        		}
        	}
        },
	    getScript: function( d, _scriptURI, _sId ){
	        var f = d.getElementsByTagName("SCRIPT")[0], p = d.createElement("SCRIPT");
	        p.type = 'text/javascript';
	        p.async = true;
	        p.src = _scriptURI;
	        p.id = _sId;
	        f.parentNode.insertBefore(p, f);
	      },
        fAsyncGet: function( iSect, uri_param, fCB ){ // Given an index and a callback
            var oX = new XMLHttpRequest();
            var sURI = oConf.aSections[ iSect ].url + uri_param;
            oX.onreadystatechange = function(){ if (oX.readyState==4 && oX.status==200) fCB(oX.responseText); };
            oX.open("GET", sURI, true); // true asynchronous 
            oX.send( null );
        }
    };
}
)(document, oEvoCart_config);

oEvoCart.bindAll();

//This function creates personalized input from the form
function CreatePersonalizeInput(){
	var myArray = new Array();
	var pInput = "";
	var pHeader = "";;
	var totalcount ="0"
	if (document.getElementById("totalCount") != null)
		var totalcount = document.getElementById("totalCount").value;
	if (document.getElementById("personalization_type-style") != null){
		pInput = pInput + document.getElementById("personalization_type-style").value + "$";
		pHeader = pHeader + document.getElementById("att_lbl_style").innerHTML + "$";
	}else{
		pInput = pInput + "$";
		pHeader = pHeader + "$";
	}
	if (document.getElementById("personalization_type-color") != null)	{
		pInput = pInput + document.getElementById("personalization_type-color").value + "$";
		pHeader = pHeader + document.getElementById("att_lbl_color").innerHTML + "$";
	}else{
		pInput = pInput + "$";
		pHeader = pHeader + "$";
	}	
	for (i = 1; i <= totalcount; i++) {
		var el = document.getElementById("att_"+i);		
		var value= el.value === el.getAttribute("placeholder") ? '' : el.value;
		var label = document.getElementById("att_lbl_"+i);
		var labelText = label.innerHTML.replace("*", "");		
		if (value !== null && value !==''){
			pInput = pInput + value + "$";
			pHeader = pHeader + labelText + "$";
			
		}else{
			pInput = pInput + "$";
			pHeader = pHeader + "$";
		}
	}
	pInput = pInput.slice(0,-1);
	pHeader = pHeader.slice(0,-1);
	myArray[0] = pInput;
	myArray[1] = pHeader;
	return myArray;
	
}
function validateProfanity() {
	editPersonalizedModalValue_evoCart();
	var validInput = true;
	var personalizedInput = document.getElementById('personalizationInput').value;
	var endpoint = "/common/profanity_check.jsp";
	var params = {
			profanityStringToCheck: personalizedInput			
		}
	var url = endpoint + formatParams(params)
	var oReq = new XMLHttpRequest();
		oReq.onload = function() {	 
		var oResJson = JSON.parse(oReq.responseText);			
		if(oResJson){
			var errorContent=document.getElementById("profanityError");
			var errorContent1=document.getElementById("displayProfanityError");
			errorContent1.classList.remove("hide");				
			errorContent.innerHTML = "We're sorry, but profanity cannot be applied to personalized items";					
		 }else{
			 savePersonalizeDetails();
		 }
	 }
	oReq.open("POST", url, true);	
	oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	oReq.send();
	
}
function editPersonalizedModalValue_evoCart() {
	var personalizedInput = new Array();
	personalizedInput = CreatePersonalizeInput();
	document.getElementById('personalizationInput').value = personalizedInput[0];
	document.getElementById('personalizationHeader').value = personalizedInput[1];	
}
//This function is being called after customer press "save" button on pers form
var savePersonalizeDetails = function(){	
	oEvoCart.blockUISpinner(true);
	var xhr = new XMLHttpRequest();
	var oFormElement = document.getElementById("personalization1"); 
	xhr.onload = function() {
		var resp = JSON.parse(xhr.responseText);
		if (resp.success){
			oEvoCart.updateSection( "items" );
			document.getElementById("closePers").click();
		}
		if (resp.error){
			ltdc_snackbar.q(resp.error, "error");
		}
	}
	xhr.onerror = function() { 
	}
	xhr.open (oFormElement.method, oFormElement.action, true);	
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send (new FormData (oFormElement));
}
function formatParams( params ){
	  return "?" + Object
	        .keys(params)
	        .map(function(key){
	          return key+"="+encodeURIComponent(params[key])
	        })
	        .join("&")
	}
function updatePersonalizeDetails(sku, commerceId, defaultValues){	
	oEvoCart.blockUISpinner(true);
	var xhrSuc = new XMLHttpRequest();
	var endpoint = "/checkout/includes/evo_personalized_form.jsp";
	var params = {
		skuId: sku, 
		commerceId: commerceId,
		defaultValues: defaultValues,
		modal:true
	}
	var url = endpoint + formatParams(params)	
	var content = document.getElementById("updatePersDetails")
	xhrSuc.onreadystatechange = function (e) {
		if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
			content.innerHTML = xhrSuc.responseText;			
            ltdc_reveal.autoOpen("updatePersDetails");
            oEvoCart.blockUISpinner(false);
            //  Bind Client Validation
            if( typeof oPersPopup != "undefined" ){
                oPersPopup.bind( ".l-editPers .input-pers", function(){
                    validateProfanity();                   
                } );
            }
		}		
	}
	xhrSuc.open("POST", url, true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	xhrSuc.send();
}
function trackTealiumCheckout(){
	fireTealiumEvent({"e_checkout" : "t"});
	return false;
}
function convertCouponInput(evt){
	if ((evt.keyCode >= 48 && evt.keyCode <= 90) || (evt.keyCode >= 96 && evt.keyCode <= 105) || (evt.keyCode == 189) || (evt.keyCode == 109)) {
		var typedChars = document.getElementById("applyCouponInput").value;
		typedChars = typedChars.trim();
		document.getElementById("applyCouponInput").value = typedChars.toUpperCase();
		}
}
function payPalRedirect(){	
	fireTealiumAjaxEvent({
		"pagename" : "Paypal Checkout (cart)",
		"pagetype" : "checkout-paypal"		
	});
	fireTealiumEvent({"e_paypal_cart" : "t"});
	addCookie("paypal_src", "", 0);
	addCookie("paypal_src", "cart", 1000*60*60*24);	
	document.getElementById('cmdPayPal').click();
}
function addCookie(name,value,expirationMs) {
	if (expirationMs) {
		var date = new Date();
		date.setTime(date.getTime()+(expirationMs));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

var estimateTax = function submitEstTaxForm(event){
	event.preventDefault();
	oEvoCart.blockUISpinner(true);
	var xhr1 = new XMLHttpRequest();
	var oFormElement1 = document.getElementById("estimateTaxForm");  
	xhr1.onload = function() {
		oEvoCart.refresh(["totals"]);
	}
	xhr1.onerror = function() { 
		console.log (xhr1.responseText); 
	}	
	xhr1.open (oFormElement1.method, oFormElement1.action, true);
	xhr1.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr1.send (new FormData (oFormElement1));
	return false;
}