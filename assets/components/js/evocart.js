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
                    setTimeout( function(){ oSimpleQty.debounce( eNav ) }, 360);
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
                    ltdc_snackbar.q("Sorry, cannot order more than " + sMax + "|Call Customer Service.");
                }
                return true;
            }else{
                return false;
            }
        }
    }
})( document );
var updateCart = function(commerceItemId){
	var xhr = new XMLHttpRequest();
	var oFormElement = document.getElementById("shoppingCart"); 
	xhr.onload = function() {				
		updateGiftContents();
		updateCartContents()		
	  	oEvoCart.refresh(["items","totals"]);
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
var updateRemoval = function(commerceItemId){
	document.getElementById("removalInput").value = commerceItemId;
	updateCart();
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
	var xhrCoupon = new XMLHttpRequest();
	var oCouponFormElement = document.getElementById("couponCodeForm"); 
	xhrCoupon.onload = function() {
		oEvoCart.updateSection( "totals" );	
	}
	xhrCoupon.open (oCouponFormElement.method, oCouponFormElement.action, true);
	xhrCoupon.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhrCoupon.send (new FormData (oCouponFormElement));
}
var oEvoCart_config = {  //  Configuration Object
    aSections: [
    {ID:"items" ,elID:"js-evoCartLeft__items", url:"evoCartLeft_items.jsp"},
    {ID:"recom" ,elID:"js-evoCartLeft__recom", url:"evoCartLeft__recom.jsp"},
    {ID:"wishes",elID:"js-evoCartLeft__wishes",url:"evoCartLeft_wishes.jsp"},
    {ID:"totals",elID:"js-evoCartRight__totals",url:"evoCartRight__totals.jsp"}]
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
            var self = this, nCnt = 0;
            oConf.aSections.forEach( function( e ){
                if( e.ID === sSect ){
                    var elSection = e.elSection; // Node ref
                    self.fAsyncGet(nCnt, function( sRespn ){
                        e.elSection.innerHTML = sRespn; });
                        setTimeout( function(){self.bind( sSect, elSection );}, 1000 );
                }
                nCnt++;
            } );
        },
        bind: function( sSect, elSection ){  //  Init the newly loaded section
            switch( sSect ){
                case "items":
                    oSimpleQty.rebind( function( sSKU_id, nQty ){
                    	updateCart();
                    });
                break;
                case "recom":
                    if( typeof Flickity != "undefined" ){
                        var oFlick = new Flickity('.carsl', {
                            "freeScroll": true,
                            "groupCells": 4,
                            "autoPlay": false,
                            "initialIndex": 2,
                            "cellAlign": "left",
                            "wrapAround": true,
                            "pageDots": false});
                    }
                    setTimeout( function(){
                        oFlick.reloadCells();
                        oFlick.resize();
                    }, 400 );
                break;
                case "totals":
                    if( typeof oTopmenu != "undefined" ){
                        elSection.style.top = "60px";//oTopmenu.getTopmenuLoc();
                    }
                    if(doc.getElementsByClassName("js-more-info-shipping")[0]){
	                    doc.getElementsByClassName("js-more-info-shipping")[0]
	                    .addEventListener("click", function( e ){
	                    	ltdc_reveal.autoOpen("shippingChart" );
	                    });
                    }
                    if(doc.getElementsByClassName("js-more-info-tax")[0]){
	                    doc.getElementsByClassName("js-more-info-tax")[0]
	                    .addEventListener("click", function( e ){
	                    	ltdc_reveal.autoOpen("taxInfo" );
	                    });
                    }
                    var estTaxForm = doc.getElementById("submitEstimateTaxForm");
                    if(estTaxForm){
                    	estTaxForm.addEventListener("click",  function(e){estimateTax(e)});
                    	estTaxForm.addEventListener("keyup",  function(e){
                    		
                    	});
                    }
                    var applyPromoCode = doc.getElementById("applyCouponCode");
                    if(applyPromoCode){
                    	applyPromoCode.addEventListener("click",  function(e){submitCouponForm(e)});
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
        fAsyncGet: function( iSect, fCB ){ // Given an index and a callback
            var oX = new XMLHttpRequest();
            var sURI = oConf.aSections[ iSect ].url;
            oX.onreadystatechange = function(){ if (oX.readyState==4 && oX.status==200) fCB(oX.responseText); };
            oX.open("GET", sURI, true); // true asynchronous 
            oX.send( null );
        }
    };
}
)(document, oEvoCart_config);

oEvoCart.updateSection( "items" );
oEvoCart.updateSection( "wishes" );
oEvoCart.updateSection( "totals" );

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
function editPersonalizedModalValue_evoCart() {
	var personalizedInput = new Array();
	personalizedInput = CreatePersonalizeInput();
	document.getElementById('personalizationInput').value = personalizedInput[0];
	document.getElementById('personalizationHeader').value = personalizedInput[1];	
}
//This function is being called after customer press "save" button on pers form
var savePersonalizeDetails = function(){	
	editPersonalizedModalValue_evoCart();		
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
function updatePersonalizeDetails(sku, commerceId, defaultValues){	
	var xhrSuc = new XMLHttpRequest();	
	var url = "/checkout/includes/evo_personalized_form.jsp?skuId="+sku+"&commerceId="+commerceId+"&defaultValues="+defaultValues+"&modal=true";
	var content = document.getElementById("updatePersDetails")
	xhrSuc.onreadystatechange = function (e) {
		if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
			content.innerHTML = xhrSuc.responseText;			
			ltdc_reveal.autoOpen("updatePersDetails");
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
