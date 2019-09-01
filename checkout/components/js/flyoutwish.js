"use strict";
var ltdc_flyoutwish = (function( doc, eID ) {
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
      setTimeout( this.close, 3000 );
    },
    close: function(){
      doc.getElementById( eID ).classList.add("hidden");
      if( window.location.href.indexOf( "wishlist" ) != -1){
    	  window.location.href = window.location.href.replace( window.location.search, "");
        //window.location.reload();
      }
    }
  }
})( document, "js-flyoutwish__id" );

//This method will display flyout after item is added to the gift list
function showFlyoutGift(data){
	var giftContent = document.getElementsByClassName("flyoutgift__prod--contain")[0];
    if( giftContent.length > 0 ){
    	giftContent.parentNode.replaceChild(document.getElementById( "js-flyoutwish__id" ),giftContent);
    }
 	var xhrSuc = new XMLHttpRequest();
 	xhrSuc.onreadystatechange = function (e) {
 	    if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
 	    	giftContent.innerHTML = xhrSuc.responseText;
 	    	console.log(":: showFlyoutGift ::");
 	    	ltdc_flyoutwish.open();
 	    }
 	}
 	xhrSuc.open("GET", "/checkout/flyout_gift.jsp?lastAddedItem="+data.lastAddedItem+"&lastAddedItemQty="+data.lastAddedItemQty+"&lastAddedItemProdId="+data.lastAddedItemProdId, true);
 	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	xhrSuc.send();
}