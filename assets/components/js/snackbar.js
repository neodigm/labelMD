"use strict";
var ltdc_snackbar = (function( doc, eID ) {
  var _nTimeout = 5000, _aQ = [], _sContext = "";
  var _eSb = doc.getElementById( eID ), _to = null;
  if( _eSb ){
    var _eSbText = _eSb.firstElementChild;
    _eSb.addEventListener("click", function(){ ltdc_snackbar.close(); clearTimeout( _to ); }, true);
    var _fClose = function(){
      _aQ.shift(); // fifo
      _eSb.classList.remove("snackbar__cont--show");
      _eSb.classList.add("snackbar__cont--hide");
      if( _sContext ){ _eSb.classList.remove("snackbar__cont--error" ); }
      if( _aQ.length != 0 ){ setTimeout( _fOpen, 1200 ); } // If more messages then open again
    };
    var _fOpen = function(){
      _eSbText.innerHTML = _aQ[0].replace("|","<br>");
      _eSb.style.left = (( document.body.clientWidth / 2 ) - ( _eSb.clientWidth / 2 ) ) + "px";
      _eSb.classList.remove("snackbar__cont--hide");
      if( _sContext ){ _eSb.classList.add("snackbar__cont--" + _sContext ) }
      _eSb.classList.add("snackbar__cont--show");
      _to = setTimeout( _fClose, _nTimeout );
    };
    return {
      q: function( sMsg, sContext ){
        _sContext = sContext;
        _aQ.push( sMsg ); // fifo
        if( _aQ.length == 1 ){ _fOpen(); } // If first message then init open
      },
      close: function( ){
        _fClose();
      }
    }
  }else{
    console.log("-- no snackbar --");
  }
})( document, "js-snackbar__id" );
