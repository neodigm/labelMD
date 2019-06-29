"use strict";

/* This method 'certonaRecommendations' is configured in resonance.js which will be invoked through the tealium.
 * This callback function will parse the json response and display the product recommendation carousel
 */       
window.certonaRecommendations = function(data){
    for(var i = 0; i < data.resonance.schemes.length; i++){
    	var scheme = data.resonance.schemes[i];
    	if(scheme.display == "yes"){            		
    		var title = scheme.explanation;       		    
			var ids = "";
			for(var k = 0; k < scheme.items.length; k++){					
				if(k==0) {
					ids=scheme.items[k].sku+":"+scheme.items[k].productid;
				}else{
					ids=ids+"|"+scheme.items[k].sku+":"+scheme.items[k].productid;
				}					
			}		
			//console.log("scheme : "+scheme.scheme+" title : "+title+" ids : "+ids);
			var prodRecContainer = document.getElementsByClassName(scheme.scheme)[0];			
			if(prodRecContainer){
				if(ids){
					showProductRecommendations(scheme.scheme, title, ids, prodRecContainer); 
				}				
			}
    	}
    }
}  

//This method will asynchronously load the product recommendations and display the content.
function showProductRecommendations(scheme, title, ids, divContainer){	 	
	 	var showATC = document.getElementsByClassName("js-show_ATC_"+scheme)[0];
	 	if(showATC){
	 		var showAddToCart = showATC.getAttribute("value");
	 	}
	  	var xhrSuc = new XMLHttpRequest();	 	
	  	xhrSuc.onreadystatechange = function (e) { 
	  	    if (xhrSuc.readyState == 4 && xhrSuc.status == 200) {
	  	    	divContainer.innerHTML = xhrSuc.responseText; 	
	  	    	
	  	    	//binding onclick event for product recommendations
	  	    	var __th_atcForms = document.querySelectorAll(".js__pr--addToCart_"+scheme);	  	    	
	  	    	for(var i = 0, ln = __th_atcForms.length; i < ln; i++) {
	  	    		__th_atcForms[i].addEventListener("click", function(){
	  	    			var formId = this.dataset.formId;
	  	    			var flag = this.dataset.tealiumEnabled;
	  	    			var srcId = this.dataset.srcId;
	  	    			var prodId = this.dataset.prodId;
	  	    			var skuId = this.dataset.skuId;
	  	    			var action = this.dataset.actionId;	
	  	    			__submit_th_cart(formId,prodId,skuId,srcId,flag,action);		
	  	    		});
	  	    	}
				var eCar = document.querySelectorAll( ".js-prod__rec--carousel_" + scheme )[0];
				if( eCar ){  //  Center Carousel
					var nCnt = eCar.querySelectorAll( ".prod-artc" ).length;
					if( nCnt == 0 ){
						eCar.parentElement.style.display="none";
					}else{
						var nCardW = 212 + ( 48 - (nCnt * 8) ); // Number of cards influences fixed width
						if( nCnt < 7 ){
							var nParW = eCar.parentElement.clientWidth;
							if( nCardW && nCnt && nParW ){
								if( ( nCardW * nCnt ) <= nParW ){
									eCar.style.margin = "0 auto";
									eCar.style.width = (nCardW * nCnt) + "px";
								}
							}
						}
					}
				}
	  	    	//load flickity
				var flkty = new Flickity( ".js-prod__rec--carousel_" + scheme, {"freeScroll": true,
	  	    		"autoPlay": false, "initialIndex": 2, "cellAlign": "left", "wrapAround": true, "pageDots": false
	  	    	}); 
				  //initialize reveal
				if( ( typeof ltdc_reveal != "undefined" ) && ltdc_reveal ) ltdc_reveal.init();
	  	    }
	  	} 	
	  	xhrSuc.open("POST", "/common/includes/inc_prod_recommendations.jsp?scheme="+scheme+"&title="+title+"&articleIds="+ids+"&dispATC="+showAddToCart, true);
	  	xhrSuc.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 	
	  	xhrSuc.send(); 	
 }	