"use strict";
var oFlymyaccount = (function(doc, sSelfId, sIconId){
	var _eSelf = doc.getElementById( sSelfId ); // refer to own template
	var _fClose = function(){ _eSelf.classList.add("hide"); };
	if( doc.getElementById( sIconId ).parentElement ){ // A element
		doc.getElementById( sIconId ).parentElement.addEventListener("click", function( e ){
			oFlymyaccount.toggle();
		});
		doc.body.addEventListener("click", function( e ){  //  Outside Click close
		  var eTarget = e.target, bInside = false;
		  while( eTarget.tagName !== "HTML" ){  //  Disregard clicks from within
		    if( eTarget.tagName === "LTDC-FLYMYACCOUNT" || eTarget.id == "js-topmenu__myaccount--id" ){ bInside = true; break; }
		    eTarget = eTarget.parentNode;
		  }
		  if( !bInside ){
		    _fClose();
		  }
		}, true);
	}
	window.addEventListener("scroll", function() { _fClose(); }); // Listen for scroll
	return {
		"toggle": function(){
			var HORZOFFSET = ( oTopmenu && oTopmenu.isMobile() ) ? 132 : 104; // Horizontal offset px | Center on icon
			_eSelf.style.left = (doc.getElementById( sIconId ).getBoundingClientRect().x - HORZOFFSET ) + "px";
			if( oTopmenu ){ _eSelf.style.top = oTopmenu.getTopmenuLoc(); }
			if( _eSelf.classList.contains("hide") ){
				_eSelf.classList.remove("hide");
				if( oTopsearch ){ oTopsearch.close(); }  //  Mutex S3.4
				if( oMegamenu ){ oMegamenu.close(); }  //  Mutex S3.4
				if( vTAtopmenu ){ vTAtopmenu.close(); }  //  Close Type Ahead
			}else{
				_fClose();
			}
		},
		"close": function(){
			_fClose();
		}
	}
})( document, "js-flymyaccount--id", "js-topmenu__myaccount-vect--id" );