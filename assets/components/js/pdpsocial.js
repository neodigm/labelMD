"use strict";

var ltdc_pdpsocial = {
  "bLoaded": false,
  "brand": "LTD",
  "lS_sim_fb_appid": "1413773718873852",
  "LS_sim_twt_hash": "@LSCollection",
  "LTD_sim_fb_appid": "431847256949124",
  "LTD_sim_twt_hash": "@LTDCommodities",
  "init" : function( d, _brand ) {

    if( _brand ){ this.brand = _brand; }
    var eTwitter = d.getElementById("smi--svg__twt");
    if( eTwitter ){
      var sHr  = "https://twitter.com/intent/tweet?text=Check out this ";
      sHr += d.getElementsByTagName("h1")[0].innerHTML;
      sHr += " from " + this[this.brand+"_sim_twt_hash"] + " ";
      sHr += d.URL+"&source=clicktotweet";
      eTwitter.href = sHr.replace("&","and");
    }
    document.body.addEventListener("click", function( e ){
      [].slice.call( document.querySelectorAll( ".smi-fig__off" ) ).filter(function( _e ){
        _e.classList.add("hidden");
      });
    }, true);
    [].slice.call( d.querySelectorAll( ".pdpsocial__link" ) ).filter(function( _e ){ 
    	if( _e.href ){
          _e.href = _e.href.replace("FB_APPID",    ltdc_pdpsocial[ltdc_pdpsocial.brand+"_sim_fb_appid"]);
    	    _e.href = _e.href.replace("TXT_CAPTION", d.getElementsByTagName("h1")[0].innerHTML);
    	    _e.href = _e.href.replace("URI_CAPTION", encodeURIComponent(encodeURIComponent(d.title)) );
    	    _e.href = _e.href.replace("URI_LINK",    encodeURIComponent(d.location) );
    	    _e.href = _e.href.replace("URI_REDIR",   encodeURIComponent(d.location) ); 
    	    _e.href = _e.href.replace("URI_IMAGE",   document.getElementsByClassName("thumb-nav__link")[0].firstChild.src );
    	}      
    });
    if(typeof bvJsUrlVar !== 'undefined'){
  	  ltdc_pdpsocial.getScript( document, bvJsUrlVar);
    }
    [].slice.call( d.querySelectorAll( ".js-smi--a_progr" ) ).filter(function( _e ){
      _e.addEventListener("click", function( e ){
        e.preventDefault(); e.stopPropagation();
        if( !ltdc_pdpsocial.bLoaded ){
          ltdc_pdpsocial.getScript( document, "https://assets.pinterest.com/js/pinit_main.js", "js-pinterest__S--id");
          ltdc_pdpsocial.getScript( document, "https://connect.facebook.net/en_US/all.js#xfbml=1&appId="+ltdc_pdpsocial[ltdc_pdpsocial.brand+"_sim_fb_appid"], "facebook-jssdk");
          ltdc_pdpsocial.bLoaded = true;
        }
        ltdc_pdpsocial.udateFigrState( _e.dataset.progrId );
      });
    });
    d.getElementById( "js-tell--id" ).addEventListener("click",function( e ){
      e.preventDefault(); e.stopPropagation();
      document.getElementById("tell-a-friend-msg").innerHTML="";
      vltdc_tellafriend.clear();
      document.getElementById("tell-a-friend-form").classList.remove('hidden');
      ltdc_reveal.autoOpen("js-tell-a-friend-dialog");      
      var submitBtn = document.getElementsByClassName("js-tell-a-friend-send")[0];
	  if(submitBtn){			
		submitBtn.addEventListener("click", function(){submitTellAFriendForm(true);});
	  }      
    });
  },
  "getScript": function( d, _scriptURI, _sId ){
    var f = d.getElementsByTagName("SCRIPT")[0], p = d.createElement("SCRIPT");
    p.type = 'text/javascript';
    p.async = true;
    p.src = _scriptURI;
    p.id = _sId;
    f.parentNode.insertBefore(p, f);
  },
  "udateFigrState": function( sId ){
    [].slice.call( document.querySelectorAll( ".smi-fig__off" ) ).filter(function( _e ){
      if( _e.id === sId ){
        _e.classList.remove("hidden");
      }else{
        _e.classList.add("hidden");
      }
    });
  }
}