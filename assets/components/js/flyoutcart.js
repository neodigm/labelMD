"use strict";
var ltdc_flyoutcart = (function( doc, eID ) {
  var nWidthAdj = doc.documentElement.clientWidth;
	if ( nWidthAdj >= 980 ) { // Position horz if large
		doc.getElementById( eID ).style.right = ( ((nWidthAdj - 980) / 2) + 212 + "px" );
	}
  //  wire close ancher
  return {
    open: function(){
    	doc.getElementById( eID ).style.right = "10px";
      if( oTopmenu ){
        doc.getElementById( eID ).style.top = oTopmenu.getTopmenuLoc();
      }else{
        doc.getElementById( eID ).style.top = "140px";
      }
      doc.getElementById( eID ).classList.remove("hidden");
      setTimeout( this.close, 2800 );
    },
    close: function(){
      doc.getElementById( eID ).classList.add("hidden");
      if( window.location.href.indexOf( "shopping_cart.jsp" ) != -1 || window.location.href.indexOf( "wishlist" ) != -1){
    	  window.location.href = window.location.href.replace( window.location.search, "");
    	  //window.location.reload();
      }
    }
  }
})( document, "js-flyoutcart__id" );


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