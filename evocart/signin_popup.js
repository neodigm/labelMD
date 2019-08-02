"use strict"
var oSignIn = (function( dc, sQuery ){
  var eForgotLink;
  return {
    "bind": function(){
      eForgotLink = dc.querySelectorAll( sQuery );
      if( eForgotLink ){
        eForgotLink[1].addEventListener( "click", function( ev ){
          eForgotLink[0].classList.add("hide");
          eForgotLink[2].classList.remove("hide");
        });
      }
    },
    "signin": function(){
      if( eForgotLink ){
        eForgotLink[0].classList.remove("hide");
        eForgotLink[2].classList.add("hide");
      }
    }
  }
})( document, ".js-forgot__view");
oSignIn.bind();