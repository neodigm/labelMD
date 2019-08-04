"use strict"
var oSignIn = (function( dc, sQuery, sIDs ){  //  Sign-In and I Forgot Modal Validation Logic (from Cart)
  var eForgotLink = dc.querySelectorAll( sQuery ), bForgotLink = false;  //  Modal State
  var eC2A_save = dc.getElementById( sIDs[0] ), eC2A_reset = dc.getElementById( sIDs[1] );  //  Buttons
  var eSI_email = dc.getElementById( sIDs[2] ), eSI_pw = dc.getElementById( sIDs[3] );  //  INPUT sign in
  var eIF_email = dc.getElementById( sIDs[4] );  //  INPUT I forgot
  return {
    "bind": function(){
      if( eForgotLink ){  //  Show Sign-In UI with Forgot link.
        eForgotLink[1].addEventListener( "click", function( ev ){
          bForgotLink = true;
          eForgotLink[0].classList.add("hide");
          eForgotLink[2].classList.remove("hide");
        });
        if( eC2A_save && eC2A_reset && eSI_email && eSI_pw && eIF_email ){
          [ eC2A_save, eC2A_reset ].forEach( function( el ){  //  Bind event to buttons
            el.addEventListener("click", function( ev ){
              var aMsg = ["","Please Enter Your|Email Address", "Please Enter Your|Password"], nMsg = 0;
              if( bForgotLink ){
                if( eIF_email.value === "" ) nMsg = 1;
              }else{
                if( eSI_pw.value === "" ) nMsg = 2;
                if( eSI_email.value === "" ) nMsg = 1;
              }
              if( nMsg ){
                if( typeof ltdc_snackbar !== "undefined" ) ltdc_snackbar.q( aMsg[ nMsg ], "error" );
              }else{
                if( bForgotLink ){  //  Form is valid
// ADD SUBMIT FORGOT LOGIC HERE
                }else{
// ADD SUBMIT SIGN IN LOGIC HERE
                }
              }
            });
          });
        }
      }
    },
    "signin": function(){  //  This should be called whenever the modal is opened.
      if( eForgotLink ){  // Init state is Sign-In (not I forgot).
        bForgotLink = false;
        eForgotLink[0].classList.remove("hide");
        eForgotLink[2].classList.add("hide");
      }
    }
  }
})( document, ".js-forgot__view", ["js-sign-in__save", "js-forgot__reset", "js-sign-in__email", "js-sign-in__password", "js-forgot__email"]);
oSignIn.bind();