"use strict";

function showFlyoutCart(data){
	
	if( ltdc_reveal.isOpen ){ 
		ltdc_reveal.close();
	}
	var cartContent = document.getElementById("modalFlyOutCart");
 	var xhrSuc = new XMLHttpRequest();
 	xhrSuc.onreadystatechange = function (e) {
 	    if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
 	    	cartContent.innerHTML = xhrSuc.responseText;
 	    	ltdc_reveal.autoOpen("modalFlyOutCart");
	 	   	if( window.location.href.indexOf( "wishlist" ) != -1){
	 			ltdc_reveal.setOnClose(function(){ location.reload(); } );
	 		}
 	    }
 	}
 	xhrSuc.open("GET", "/checkout/flyout_cart.jsp?lastAddedItem="+data.lastAddedItem+"&lastAddedItemQty="+data.lastAddedItemQty+"&lastAddedItemProdId="+data.lastAddedItemProdId, true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	xhrSuc.send();
 	
}
