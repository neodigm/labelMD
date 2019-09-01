"use strict";

var vltdc_tellafriend = new Vue( {
  el: "#js-tellafriend--id",
  data: {
    sBrand: "LTD",
    sBrandURL: "LTDCommodities.com",
    sFriendsName: "",
    sFriendsEmail: "",
    sYourName: "",
    sYourEmail: "",
    sMessage: "I was shopping online today when I saw this product at LTDCommodities.com and thought of you.",
    aC2AMsg: ["Send Email to a Friend", "Enter Friend's Name", "Enter Friend's Email", "Enter Your Name", "Enter Your Email", "Enter a Message", "Enter a Valid Email"],
    sC2AMsg: "",
  },
  methods: {
    clear: function(){
      this.sFriendsName = "";
      this.sFriendsEmail = "";
    }
  },
  watch: {
    sBrand : function(){
      this.sBrandURL = ( this.sBrand == "LTD" ) ? "LTDCommodities.COM" : "Lakeside.com";
      this.sMessage = this.sMessage.replace("LTDCommodities.com", this.sBrandURL);
    }
  },
  computed: {
    isValid: function(){  //  Validate in order of display, update button microcopy and enabled state.
      var _nMsg = 0, reEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if( !this.sMessage ){ _nMsg = 5; }
      if( !reEmail.test(this.sYourEmail) ){ _nMsg = 6; }
      if( !this.sYourEmail ){ _nMsg = 4; }
      if( !this.sYourName ){ _nMsg = 3; }
      if( !reEmail.test(this.sFriendsEmail) ){ _nMsg = 6; }
      if( !this.sFriendsEmail ){ _nMsg = 2; }
      if( !this.sFriendsName ){ _nMsg = 1; }
      this.sC2AMsg = this.aC2AMsg[ _nMsg ];
      return ( _nMsg == 0 );
    }
  },
  mounted: function( e ){
    this.sBrand = document.body.dataset.brand;   
    }
} );

var submitBtn = document.getElementsByClassName("js-tell-a-friend-send")[0];
if(submitBtn){			
	submitBtn.addEventListener("click", function(){submitTellAFriendForm(true);});
}		
var callBack = function(response) {			
	submitTellAFriendForm(false);
};	

function submitTellAFriendForm(regUser){			
	var btnDisabled = document.getElementsByClassName("gf-c2a--disabled");
	if(btnDisabled.length == 0) {
		var xhr = new XMLHttpRequest();
		var oFormElement = document.getElementById("tellafriendForm");  
		xhr.onload = function() {	 
		 	 console.log(xhr.responseText);
		 	 var xhrResJson = JSON.parse(xhr.responseText);
			 if(xhrResJson.success){				 
				 if(!regUser){
					 grecaptcha.reset();
				 }						
				 document.getElementsByClassName("taf_error")[0].classList.add('hidden');	
				 document.getElementById("tell-a-friend-form").classList.add('hidden');
				 document.getElementById("tell-a-friend-msg").innerHTML=xhrResJson.successMessage;
				 
				 fireTealiumEvent({"e_tell_friend" : "t"});
									 
				 var submitBtn = document.getElementsByClassName("js-tell-a-friend-send")[0];
				 if(submitBtn){							
					submitBtn.addEventListener("click", function(){submitTellAFriendForm(true);});
				 }		
				 var callBack = function(response) {							
					submitTellAFriendForm(false);
		         };									 
			 }
			 else if(xhrResJson.error){
				 console.log("server side form error");
				 if(!regUser){
					 grecaptcha.reset();
				 }	
				 document.getElementsByClassName("taf_error")[0].classList.remove('hidden');						 
			 }
		}
		xhr.onerror = function() { 
			//console.log (xhr.responseText); 
		}		
		xhr.open (oFormElement.method, oFormElement.action, true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.send (new FormData (oFormElement));
	} else{ 
		console.log("Please fill all the fields and try again");
		if(!regUser){
		 	grecaptcha.reset();
	 	}	
	}
	return false;
}