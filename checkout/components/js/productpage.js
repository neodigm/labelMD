"use strict";

var classname = document.getElementsByClassName("js-prod-href__a");
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', PrevNextFunction, false);
}
function PrevNextFunction(){
	 var url = this.getAttribute("href"),
	 nextParams = url.split('?')[1].split('&'),
		params = window.location.search.substring(1).split('&'),
		dimensionValue = window.location.href.split('?')[0];
	 	sessionStorage.clear();
		if (dimensionValue.indexOf('N-') != -1) {
			dimensionValue = dimensionValue.substring(dimensionValue.indexOf('N-')+2);
			// if there is a jsessionid in the url, strip it out. it causes errors with seo url
			if (dimensionValue.indexOf(';') != -1) {
				dimensionValue = dimensionValue.substring(0, dimensionValue.indexOf(';'));
			}
			dimensionValue = dimensionValue.replace(/[^a-zA-Z0-9]/g,'');
			sessionStorage.setItem('N', dimensionValue);
		}
		if (nextParams.length > 0) {
			nextParams.forEach(function(item){
				var split = item.split('=');
				if (split[1] != 'search') {
				sessionStorage.setItem(split[0], split[1]);
				}
			});
		}
		if (params.length > 0) {
			params.forEach(function(item){
				var split = item.split('=');
				if (split[1] != 'search') {
				sessionStorage.setItem(split[0], split[1]);
				}					
			});
		}
		// Set session storage item for the Nr.
		// The value of Nr is in the SiteTopBreadcrumbs.jsp <input type="hidden" id="recordFilterState" value="${navAction.removeAction.navigationState}"/>
		
		
		if(document.getElementById('recordFilterState')) {
			sessionStorage.setItem('Nr', document.getElementById('recordFilterState').value);
		}		

		// go to pdp url		
		window.location = url;
}

//addToCart onclick event for product_collection / browse history / thumbnail 
var __th_atcForms = document.querySelectorAll(".js__pc--addToCart");
for(var i = 0, ln = __th_atcForms.length; i < ln; i++) {
	__th_atcForms[i].addEventListener("click", function(){		
		var formId = this.dataset.formId;
		var flag = this.dataset.tealiumEnabled;
		var srcId = this.dataset.srcId;
		var prodId = this.dataset.prodId;
		var skuId = this.dataset.skuId;
		var action = this.dataset.actionId;		
		__submit_th_cart(formId,prodId,skuId,srcId,flag,action);		
	});
}

//product_collection / browse history / thumbnail addToCart - This method will addItem to cart
function __submit_th_cart(form,prod,sku,src,flag,action){
	if( typeof oEvoCart != "undefined" ){
		oEvoCart.blockUISpinner(true);
	}
	var xhr = new XMLHttpRequest();
	var oFormElement = document.getElementById(form);  
	xhr.onload = function() {	 
		var xhrResJson = JSON.parse(xhr.responseText);
		//console.log (xhr.responseText);
		if(xhrResJson.success){ //success case
			updateCartContents();
			updateGiftContents();
			if( typeof oEvoCart != "undefined" ){
		    	  //adding to cart from the wishlist on the shopping cart
		    	oEvoCart.refresh(["items","wishes","totals","empty"]);
		    	fireTealiumAjaxEvent({
		    		"pagename" : "shopping-cart",
		    		"pagetype" : "cart"		
		    	});
			}else {				
				showFlyoutCart(xhrResJson);    	  
		      }
			if(flag){	
				var pin = xhrResJson.pinCodes[0];
				tag_th_ATC(form,prod,sku,pin,src,action);
			}
			
		}else{
			//console.log( xhrResJson.error );
			if(xhrResJson.maxQty){
				ltdc_snackbar.q(xhrResJson.maxQty,"maxQty");
			}else{
				ltdc_snackbar.q(xhrResJson.error,"error");
			}
		} 
	}
	xhr.onerror = function() { 
		//console.log (xhr.responseText); 
	}	
	xhr.open (oFormElement.method, oFormElement.action, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send (new FormData (oFormElement));
	return false;
}

//This method will call tealium for addToCart event
function tag_th_ATC(formId,prodId,skuId,pin,src,action){
	if (action != "wishlist"){
		var prodArt = document.querySelectorAll("."+src+" .prod-artc")[formId.split('_')[1]-1];
		var priceEle = prodArt.getElementsByClassName("prod-price")[0];	
		var unitPrice = priceEle.innerHTML.replace('$','');	
		var totalPrice = unitPrice * 1;
		var source = determineSource();
	}else{
		//src is being used for price from wish list
		var totalPrice = src * 1;
		var unitPrice = src;
		var source = action;
		
	}
	 fireTealiumAjaxEvent({
		"pagename" : "cart-add",
		"pagetype" : "cart-add",
		"action" : action,
		"productId" : prodId,
		"skuId" : skuId,
		"quantity" : "1",
		"totalPrice" : totalPrice,
		"unitPrice" : unitPrice,
		"pin" : pin,
		"source" : source
	});
}
var preAddToGift = function(){
		if(vltdc_productdetail.jResponse.childSkus[0].value.isPersonalized){
			var oReq = new XMLHttpRequest();
	 		oReq.onload = function() {	 
				var oResJson = JSON.parse(oReq.responseText);			
				if(oResJson){
					vltdc_productdetail.submitGiftError();
					ltdc_snackbar.q("We're sorry, but profanity cannot be applied to personalized items","error");				
				 }else{
					document.getElementById("addToGiftPersonalInput").value = vltdc_productdetail.getPersInputArray()[1];
					document.getElementById("addToGiftPersonalHeader").value = vltdc_productdetail.getPersInputArray()[0];
					
					addToGift();
				 }
			 }
		 oReq.open("GET", '/common/profanity_check.jsp?profanityStringToCheck=' + vltdc_productdetail.getPersInputArray()[1]); 
		 oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		 oReq.send();
		}else{
			addToGift();
		}
	//}
	
}
var addToGift = function submitGiftForm(){
	var xhr = new XMLHttpRequest();
	var oFormElement = document.getElementById("addToGiftPDP");  
	xhr.onload = function() {
		//console.log (xhr.responseText);
		var xhrResJson = JSON.parse(xhr.responseText);
		if(xhrResJson.success){ //success case			
			updateGiftContents("pdp");
			showFlyoutGift(xhrResJson);
			var tealiumEnabled=document.getElementsByClassName("xxxtealiumEnabled")[0].value;
			if(tealiumEnabled == 'true'){
				tagPDPGiftAdd();
			}
		}else{		
			vltdc_productdetail.submitGiftError();
			ltdc_snackbar.q(xhrResJson.error,"error");
		} 
	}
	xhr.onerror = function() { 
		console.log (xhr.responseText); 
	}	
	xhr.open (oFormElement.method, oFormElement.action, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send (new FormData (oFormElement));
	//document.getElementById("addToGiftPDP").submit();
	return false;
}

//PDP preAddToCart - This method will be invoked from productDetailPage.jsp/productdetail.js submitCart(preAddToCart)
var preAddToCart = function(){
	if(vltdc_productdetail.jResponse.childSkus[0].value.isPersonalized){
		var oReq = new XMLHttpRequest();
 		oReq.onload = function() {	 
			var oResJson = JSON.parse(oReq.responseText);			
			if(oResJson){
				vltdc_productdetail.submitCartError();
				ltdc_snackbar.q("We're sorry, but profanity cannot be applied to personalized items","error");				
			 }else{
				document.getElementById("addToCartPersonalInput").value = vltdc_productdetail.getPersInputArray()[1];
				document.getElementById("addToCartPersonalHeader").value = vltdc_productdetail.getPersInputArray()[0];
				addToCart();
			 }
		 }
	 oReq.open("GET", '/common/profanity_check.jsp?profanityStringToCheck=' + vltdc_productdetail.getPersInputArray()[1]); 
	 oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	 oReq.send();
	}else{
		addToCart();
	}
}


//PDP addToCart - This method will addItem to cart
var addToCart = function submitATCForm(){
	var xhr = new XMLHttpRequest();
	var oFormElement = document.getElementById("addToCartPDP");  
	xhr.onload = function() {
		console.log (xhr.responseText);
		var xhrResJson = JSON.parse(xhr.responseText);
		if(xhrResJson.success){ //success case			
			updateCartContents("pdp");
			showFlyoutCart(xhrResJson);
			var tealiumEnabled=document.getElementsByClassName("xxxtealiumEnabled")[0].value;
			if(tealiumEnabled == 'true'){
				tagPDPCartAdd();
			}
		}else{		
			vltdc_productdetail.submitCartError();
			if(xhrResJson.maxQty){
				ltdc_snackbar.q(xhrResJson.maxQty,"maxQty");
			}else{
				ltdc_snackbar.q(xhrResJson.error,"error");
			}
		} 
	}
	xhr.onerror = function() { 
		//console.log (xhr.responseText); 
	}	
	xhr.open (oFormElement.method, oFormElement.action, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send (new FormData (oFormElement));
	return false;
}


//This method will call tealium for addToCart event
function tagPDPCartAdd(){
	var unitPrice = document.getElementsByClassName("sku-desc__price")[0].innerHTML.replace('$','');
	var productId = document.getElementsByClassName("xxxprodid")[0].value;
	var pin = document.getElementsByClassName("xxxpin")[0].value;	
	var qty = document.getElementById("quantity").value;
	var skuId = document.getElementsByName("skuNumFld")[0].value;	
	var totalPrice = unitPrice * qty;
	var source = determineSource();
	var action = determineAction();
	 fireTealiumAjaxEvent({
		"pagename" : "cart-add",
		"pagetype" : "cart-add",
		"action" : action,
		"productId" : productId,
		"skuId" : skuId,
		"quantity" : qty,
		"totalPrice" : totalPrice,
		"unitPrice" : unitPrice,
		"pin" : pin,
		"source" : source
	});
}

//This method will call tealium for addToGift event from PDP
function tagPDPGiftAdd(){
	var unitPrice = document.getElementsByClassName("sku-desc__price")[0].innerHTML.replace('$','');
	var productId = document.getElementsByClassName("xxxprodid")[0].value;
	var pin = document.getElementsByClassName("xxxpin")[0].value;	
	var qty = "1";
	var skuId = document.getElementsByName("skuNumFld")[0].value;	
	var totalPrice = unitPrice * qty;
	var source = determineSource();
	var action = determineAction();
	 fireTealiumAjaxEvent({
		"pagename" : "wishlist-add",
		"pagetype" : "wishlist-add",
		"action" : "pdp",
		"productId" : productId,
		"skuId" : skuId,		
		"unitPrice" : unitPrice,		
		"totalPrice" : totalPrice,		
		"source" : source
	});
}

//This method will update cart items count
function updateCartContents(action){
	var cartContent = document.getElementsByClassName("topmenu__link--items")[0];
 	var xhrSuc = new XMLHttpRequest();	 	
 	xhrSuc.onreadystatechange = function (e) { 
 	    if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
 	    	cartContent.innerHTML = xhrSuc.responseText;
 	    	if(action == 'pdp'){
 	    		vltdc_productdetail.aCartMsg[2] = xhrSuc.responseText; 	    	
 	 	    	vltdc_productdetail.submitCartComplete();
 	    	}
 	    	
 	    }
 	   }
 	
 	xhrSuc.open("GET", "/checkout/flyout_cart.jsp?getCartCount=true", true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 	
 	xhrSuc.send();	
}

//This method will update gift items count
function updateGiftContents(action){
	var giftContent = document.getElementsByClassName("topmenu__link--wish")[0];
 	var xhrSuc = new XMLHttpRequest();	 	
 	xhrSuc.onreadystatechange = function (e) { 
 	    if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
 	    	giftContent.innerHTML = xhrSuc.responseText;
 	    	if(action == 'pdp'){
 	    		//vltdc_productdetail.aCartMsg[2] = xhrSuc.responseText; 	    	
 	 	    	vltdc_productdetail.submitGiftComplete();
 	    	}
 	    	
 	    }
 	   }
 	xhrSuc.open("GET", "/checkout/flyout_gift.jsp?getGiftCount=true", true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 	
 	xhrSuc.send();	
}

//Determines the source of a user add to cart.  Used for tealium tagging
function determineSource() {
	return (window.location.href.indexOf('fm=search') > -1) ? "search" :
				(window.location.href.indexOf('pinSearch') > 1) ? "pinsearch" :
					(window.location.href.indexOf('fm=brhist') > -1) ? "browsing_history" :
						(window.location.href.indexOf('fm=upsell') > -1) ? "upsell" :
							(window.location.href.indexOf('catalog_quick') > -1) ? "catalog_quick_order" :
								(window.location.href.indexOf('fm=qvdetails') > -1) ? "qvdetails" :
									(window.location.href.indexOf('my_favorites') > -1) ? "my_favorites" :
										(window.location.href.indexOf('bookId=') > -1) ? "catalog" :
											(window.location.href.indexOf('cid=tell-a-friend') > -1) ? "tell-a-friend" : "browse";
}

function determineAction() {
	return (window.location.href.indexOf('rrec') > -1) ? "prod_rec_pdp" : "pdp";
}

/* event 15 - browsing history clicks */
var brHistProd = document.querySelectorAll(".brHistory .productcard__a");
for(var i = 0, ln = brHistProd.length; i < ln; i++) {
	brHistProd[i].addEventListener("click", function(){fireTealiumEvent({"e_browse_history" : "t"});});
}
window.addEventListener("load", function(event) { 
	// Trigger bv review modal when writeReview=t, or jump down to the reviews if showReviews=t
	var params = window.location.search.substring(1).split('&');
	params.forEach(function(item){
		var split = item.split('=');
		if (split[0] == 'writeReview' && split[1] == 't') {
			if(typeof submitReview == 'function') {
				submitReview();
			}
		} else if (split[0] == 'showReviews' && split[1] == 't') {		
			// show customer reviews accordion in PDP
			var reviewLink = document.getElementById("reviews");
			var reviewSummary = document.getElementById("reviewSummary");
			if(reviewSummary.dataset.state != 'opened') {
				reviewLink.click();			
			}else{
				reviewLink.scrollIntoView();			
			}
			fireTealiumEvent({"e_customer_reviews" : "t"});
		}
	});
});