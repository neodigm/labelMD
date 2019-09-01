
var ltdc_topfab = {
  "init" : function() {
    window.addEventListener("scroll", ltdc_topfab.scrollevent);
    document.getElementById("js-topfab__id").addEventListener("click", ltdc_topfab.totop, false);
  },
  "scrollevent" : function( e ){
    if(window.pageYOffset >= 500)
    {
      document.getElementById("js-topfab__id").classList.remove("hidden");
    }else
    {
      document.getElementById("js-topfab__id").classList.add("hidden");
    }
  },
  "totop" : function( e ){
    window.scrollTo(0, 0);
    e.preventDefault();
    return false;
  }
};
ltdc_topfab.init();