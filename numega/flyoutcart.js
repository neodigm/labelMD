"use strict";
console.log("-------------------flyoutcart")
var ltdc_flyoutcart = (function( doc, eID, eRevID ) {
  var  oFlick = new Flickity('.carsl', {"freeScroll": true, "groupCells": 4,
  "autoPlay": false, "initialIndex": 2, "cellAlign": "left", "wrapAround": true, "pageDots": false
});
  return {
    open: function(){
      if( typeof ltdc_reveal != "undefined" ){
        ltdc_reveal.autoOpen( eRevID );
      }
      setTimeout( function(){
        oFlick.reloadCells();
        oFlick.resize();
       }, 400 );
    },
    close: function(){
      if( window.location.href.indexOf( "shopping_cart.jsp" ) != -1 || window.location.href.indexOf( "wishlist" ) != -1){
    	  window.location.href = window.location.href.replace( window.location.search, "");
      }
      if( typeof ltdc_reveal != "undefined" ){
        //ltdc_reveal.close();
      }
    }
  }
})( document, "js-flyoutcart__id", "modalFlyOutCart" );


//This method will display the last added item in flyoutcart
function showFlyoutCart(data){
	var cartContent = document.getElementsByClassName("flyoutcart__prod--contain")[0];
    if( cartContent.length > 0 ){
    	cartContent.parentNode.replaceChild(document.getElementById( "js-flyoutcart__id" ),cartContent);
    }
 	var xhrSuc = new XMLHttpRequest();
 	xhrSuc.onreadystatechange = function (e) {
 	    if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
 	    	cartContent.innerHTML = xhrSuc.responseText;
 	    	ltdc_flyoutcart.open();
 	    }
 	}
 	xhrSuc.open("GET", "/checkout/flyout_cart.jsp?lastAddedItem="+data.lastAddedItem+"&lastAddedItemQty="+data.lastAddedItemQty+"&lastAddedItemProdId="+data.lastAddedItemProdId, true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	xhrSuc.send();
}