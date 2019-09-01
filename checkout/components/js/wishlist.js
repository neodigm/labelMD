"use strict";

var addToCartFromWishlist = function(giftItemId,articleId){
	var catalogRefId = document.getElementsByClassName("catalogRefId"+" "+giftItemId)[0].value;	
	var productId = document.getElementsByClassName("productId"+" "+giftItemId)[0].value;
	var price = document.getElementsByClassName("price"+" "+giftItemId)[0].value;
	var tealiumEnabled =document.getElementById('tealiumEnabled').value;
	document.getElementById('addItemToCartRefId').value = catalogRefId;		
	document.getElementById('addItemToCartQuantity').setAttribute("name", catalogRefId);	
	document.getElementById('addItemToCartProductIds').value = productId;
	document.getElementById('addItemToCartItemIds').value = giftItemId;
	//document.getElementById("addAllItemsToOrderButton").click();	
	__submit_th_cart("addToCartFromWishlist", productId, catalogRefId, price, tealiumEnabled, "wishlist");
	if( typeof oEvoCart != "undefined" && typeof articleId != "undefined" ){
		callCertona({ event: "addfromrec", itemid: articleId });
	}
}
var removeFromWishlistEvo = function(giftItemId, giftlistId, pin){
	oEvoCart.blockUISpinner(true);
	var xhrSuc = new XMLHttpRequest();
	var url = "/checkout/remove_from_wish_list.jsp?giftlistId="+giftlistId+"&giftId="+giftItemId;
	xhrSuc.onreadystatechange = function (e) {
		if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
			fireTealiumEvent({
				wl_remove : "t",
				product_child_sku : pin,			
				event_flag : "remove from wish list"
				});
				//oEvoCart.updateSection( "wishes" );	
				updateGiftContents();
				oEvoCart.refresh(["wishes"]);
		}
		
	}
	xhrSuc.open("POST", url, true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	xhrSuc.send();
}
var removeFromWishlist = function(giftItemId, giftlistId, pin){
	var params ={
			"giftlistId": giftlistId,			
			"giftId": giftItemId
	}
	axios.get('/checkout/remove_from_wish_list.jsp',{params: params} )
	.then(function ( response ) {
		fireTealiumEvent({
			wl_remove : "t",
			product_child_sku : pin,			
			event_flag : "remove from wish list"
			});
				if( window.location.href.indexOf( "wishlist" ) != -1){
			    	  window.location.href = window.location.href.replace( window.location.search, "");			    	  
			      }	
				if( window.location.href.indexOf( "shopping_cart.jsp" ) != -1 ){
					oEvoCart.updateSection( "wishes" );	    	  
			      }	
	})
	
}
var moveFromCartToWishListRest = function(theItemId, giftlistId, qty, currentPin, unitPrice, skuId, productId, articleId) {
	oEvoCart.blockUISpinner(true);
	var xhrSuc = new XMLHttpRequest();
	var url = "/rest/model/atg/commerce/gifts/GiftlistActor/moveItemsFromCart?giftlistId="+giftlistId+"&itemIds="+theItemId+"&quantity="+qty;		
	xhrSuc.onreadystatechange = function (e) {
		if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
			var qty = "1";
			var totalPrice = unitPrice * qty;
			fireTealiumAjaxEvent({
				"pagename" : "wishlist-add",
				"pagetype" : "wishlist-add",
				"action" : "shopping_cart",
				"productId" : productId,
				"skuId" : skuId,			
				"totalPrice" : totalPrice,
				"unitPrice" : unitPrice,
				"source" : "shopping_cart"
				});	
				updateGiftContents();
				updateCartContents()
	  	  		oEvoCart.refresh(["items","wishes","totals","empty"]);
				callCertona({ event: "removefromcart", itemid: articleId });
				fireTealiumAjaxEvent({
	    			"pagename" : "shopping-cart",
	    			"pagetype" : "cart"		
	    		});
		}
		
	}
	xhrSuc.open("POST", url, true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	xhrSuc.send();
}

//this function is being used by old shopping cart and can be deleted
var moveFromCartToWishList = function(theItemId, siteId, currentPin, unitPrice, skuId, productId) {	
	document.getElementById('giftListItemId').value =theItemId;	
	setTimeout(function(){
		document.getElementById('moveToWishlistButton').click();
		var qty = "1";
		var totalPrice = unitPrice * qty;
		fireTealiumAjaxEvent({
			"pagename" : "wishlist-add",
			"pagetype" : "wishlist-add",
			"action" : "shopping_cart",
			"productId" : productId,
			"skuId" : skuId,			
			"totalPrice" : totalPrice,
			"unitPrice" : unitPrice,
			"source" : "shopping_cart"
		});
	}, 500);	
}
function loadWishListItems(startIndex, parentPage) {
	var wlContent = document.getElementById('wl_container');
	var xhrSuc = new XMLHttpRequest();
	var url = "";
	if (parentPage == "evoShoppingCartPage"){
		url= "/checkout/includes/inc_evoCartLeft_wishes.jsp?start="+startIndex+"&parentPage="+parentPage
	}else{
		url="/checkout/wish_list_landing_page.jsp?start="+startIndex+"&parentPage="+parentPage
	}
	
 	xhrSuc.onreadystatechange = function (e) {
 	    if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
 	    	wlContent.outerHTML = xhrSuc.responseText; 
 	    	if (typeof oSimpleExpand != "undefined") oSimpleExpand.rebind(); 
 	    	var viewcartbutton_load = document.getElementById("js-viewcart__wish--id");
 	    	if(viewcartbutton_load) { 	    			    		
	 	    	document.getElementById( "js-viewcart__wish--id" ).addEventListener("click",function( e ){
	 	    	    fireTealiumEvent({"wl_view_cart_click" : "t"});
	 	    	}); 
 	    	}
 	    }
 	} 	
 	xhrSuc.open("GET", url, true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	xhrSuc.send();
	
}
var topmenuwish = document.getElementById("js-topmenu__wish--id");
if(topmenuwish) {
	document.getElementById( "js-topmenu__wish--id" ).addEventListener("click",function( e ){
	    fireTealiumEvent({"wl_icon_click" : "t"});	
	}); 
}
var mobile_topmenuwish = document.getElementById("js-mobile-topmenu__wish--id");
if(mobile_topmenuwish) {
	document.getElementById( "js-mobile-topmenu__wish--id" ).addEventListener("click",function( e ){
	    fireTealiumEvent({"wl_icon_click" : "t"});	
	}); 
}
var myaccountwish = document.getElementById("js-myaccount__wish--id");
if(myaccountwish) {
	document.getElementById( "js-myaccount__wish--id" ).addEventListener("click",function( e ){
	    fireTealiumEvent({"wl_drop_click" : "t"});
	}); 
}
var viewcartbutton = document.getElementById("js-viewcart__wish--id");
if(viewcartbutton) {
	document.getElementById( "js-viewcart__wish--id" ).addEventListener("click",function( e ){
	    fireTealiumEvent({"wl_view_cart_click" : "t"});
	}); 
}

