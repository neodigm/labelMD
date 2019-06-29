/****************************************************
 * Egain dock chat code - begin
 ****************************************************/

    /*eGain Chat server */
    var egainDockChat = egainDockChat  || {};
    egainDockChat.serverURL ="https://ltdcommodities.egain.cloud/system";
    /*eGain Chat Locale*/
    egainDockChat.Locale  = "en-US";
    /*Set to true to enable posting attributes to templates*/
    egainDockChat.PostChatAttributes = false;
    egainDockChat.IntegratedEntryPoint  = "false";
    /*eGain video chat parameters */
    egainDockChat.VChatParams = '';
    /*Set to true if custom button is used to launch docked chat */
    egainDockChat.UseCustomButton=false;
    /*Method to set customer Parameters. To be called by client website. All the parameters specified in application-chat-defaults must be set here.*/
    egainDockChat.SetCustomerParameters = function (egainAttributeName, attributeValue) {
        if(!egainDockChat.SetParameter){
           egainDockChat.CallQueue = egainDockChat.CallQueue || [];
            egainDockChat.CallQueue.push({name:'SetParameter', args:[egainAttributeName,attributeValue]});
        }else{
            egainDockChat.SetParameter(egainAttributeName,attributeValue);
        }
    };

    if(!egainDockChat.UseCustomButton){
    	setEntryPoints();
        startChat();
    }
    function startChat(){
        if(!egainDockChat.launchChat){
            egainDockChat.CallQueue = egainDockChat.CallQueue || [];
            egainDockChat.CallQueue.push({name:'launchChat', args:[]});
        }else{
            egainDockChat.launchChat();
        }
    }
    

    /*eGain Chat Entry Point and eGain template name*/
    function setEntryPoints(){
    	/*eGain Chat Entry Point and eGain template name*/
	    var site = document.querySelector("[data-brand]").dataset.brand;
		var bodyClass = document.body.classList;
		var bodyIdName = document.body.id;
		var pageName = '';
		if (bodyClass != null && bodyClass.contains('signin')) {
			pageName = 'signin';
		}
		else if (bodyClass != null && bodyClass.contains('payment')) {
			pageName = 'payment';
		}
		else if (bodyClass != null && bodyClass.contains('pay_invoice_online')) {
			pageName = 'pay_invoice';
		}
		else if (bodyClass != null && bodyClass.contains('faq')) {
			pageName = 'faq';
		}
		if(bodyIdName != null && bodyIdName.indexOf('onePageCheckout') > -1) {
			pageName = 'checkout';
		}
		if(document.getElementsByClassName('l-productdetail').length > 0){
			pageName = 'pdp';
		}
		if(document.location.href.indexOf('homeltd') > -1 || document.location.href.indexOf('homels') > -1){
			pageName = 'home';
		}
		if(document.location.href.indexOf('shopping_cart.jsp') > -1){
			pageName = 'shoppingCart';
		}
		if(document.location.href.indexOf('order_history_') > -1){
			pageName = 'order_history';
		}
		if(document.location.href.indexOf('wishlist') > -1){
			pageName = 'wishlist';
		}		
		var cancelItemPage = document.getElementById("cancel-item-container");
		if(cancelItemPage){
			pageName = 'cancel_keep';
		}
		if (site === 'LS') {
			egainDockChat.Template = "Lakeside";
			egainDockChat.EntryPointId  = "1020";			
			if( pageName == "payment" ){
				egainDockChat.EntryPointId = "1003";
			}else if( pageName == "signin" ){
				egainDockChat.EntryPointId = "1004";
			}else if( pageName == "checkout" ){
				egainDockChat.EntryPointId = "1009";
			}else if( pageName == "faq" ){
				egainDockChat.EntryPointId = "1015";
			}else if( pageName == "cancel_keep" ){
				egainDockChat.EntryPointId = "1018";
			}else if( pageName == "pay_invoice" ){
				egainDockChat.EntryPointId = "1019";
			}else if( pageName == "shoppingCart" ){
				egainDockChat.EntryPointId = "1027";
			}else if( pageName == "pdp" ){
				egainDockChat.EntryPointId = "1029";
			}else if( pageName == "home" ){
				egainDockChat.EntryPointId = "1026";
			}else if( pageName == "order_history" ){
				egainDockChat.EntryPointId = "1028";
			}else if( pageName == "wishlist" ){
				egainDockChat.EntryPointId = "1031";
			}
		}else if (site === 'LTD'){
			egainDockChat.Template = "LTD";
			egainDockChat.EntryPointId  = "1021";			
			if( pageName == "payment" ){
				egainDockChat.EntryPointId = "1005";
			}else if( pageName == "signin" ){
				egainDockChat.EntryPointId = "1006";
			}else if( pageName == "pay_invoice" ){
				egainDockChat.EntryPointId = "1013";
			}else if( pageName == "checkout" ){
				egainDockChat.EntryPointId = "1008";
			}else if( pageName == "legacy" ){
				egainDockChat.EntryPointId = "1011";
			}else if( pageName == "faq" ){
				egainDockChat.EntryPointId = "1014";
			}else if( pageName == "cancel_keep" ){
				egainDockChat.EntryPointId = "1017";
			}else if( pageName == "shoppingCart" ){
				egainDockChat.EntryPointId = "1023";
			}else if( pageName == "pdp" ){
				egainDockChat.EntryPointId = "1025";
			}else if( pageName == "home" ){
				egainDockChat.EntryPointId = "1022";
			}else if( pageName == "order_history" ){
				egainDockChat.EntryPointId = "1024";
			}else if( pageName == "wishlist" ){
				egainDockChat.EntryPointId = "1030";
			}
		}
	}
/****************************************************
 * Egain dock chat code - end
 ****************************************************/