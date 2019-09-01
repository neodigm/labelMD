"use strict";
var oTopsearch = (function( doc ){
	var _eSelf = doc.getElementById("js-topsearch--id"); // refer to own template
	var _nOffset = 80; // init
	var _bStick = false;
	window.addEventListener("scroll", function() { oTopsearch.stick() }); // Listen for scroll
	return {
		"toggle": function(){
			if( _eSelf.classList.contains("hide") ){
				_eSelf.classList.remove("hide");
				if( typeof oFlymyaccount != 'undefined' ){ oFlymyaccount.close(); }  //  Mutex S3.4
				if( typeof oMegamenu != 'undefined' ){ oMegamenu.close(); }  //  Mutex S3.4
			}else{
				_eSelf.classList.add("hide");
			}
			_nOffset = _eSelf.offsetTop;
			this.stick();
		},
		"stick": function(){
			if (window.pageYOffset >= _nOffset) {  //  Add class if scroll to top
				_eSelf.classList.add("ever-present__search");
				_bStick = true;
			} else {
				_eSelf.classList.remove("ever-present__search");
				_bStick = false;
			}
		},
		"isSticky": function(){ return _bStick; },
		"close": function(){ _eSelf.classList.add("hide"); }
	}
})( document ); // Removed id to icon
if( oTopmenu && oTopmenu.isMobile() ) oTopsearch.toggle();  //  QC 980

var vTAtopsearch = new Vue({
	el: "#c_headnavtype__topsearch--id",
	data: {
		brand: "LTD",
		ta_data: "",
		ta_response: "",
		is_hidden: true,
		is_watched: true,
		form_id: "basictopsearchForm",
		async_base: "/common/includes/inc_search_type_ahead.jsp"
	},
	watch: {
		ta_data: function(){

		},
		ta_response: function(){
			this.is_hidden = ( this.ta_response === "" );
		}
	},
	methods: {
		close: function(){
			this.is_hidden = true;
		},
		getSearch: function( e ){
			vTAtopsearch = this;
			axios.get(  this.async_base,{params: {environment: 'typeAhead_queries', sort: 'alpha', searchFrom: '',Ntt:this.ta_data.trim()+"*"}} )			
			.then(function ( response ) {				 										
				var aTmp = [], aPins = response.data.replace("<div>","").split( "\n" );		
				for (var i=0; i<(aPins.length - 1); ++i) {
					var nPos = aPins[i].indexOf(" ");
					aTmp.push( [aPins[i].substr(0,nPos), aPins[i].substr(nPos)] );
				}
				vTAtopsearch.ta_response = aTmp;								
			})
			.catch(function ( error ) {
				vTAtopsearch.ta_response = "";
			console.log( error );
			});
		},
		pinClick: function( e ){
			this.ta_data = e.currentTarget.firstChild.innerHTML;
			var eF = document.getElementById( this.form_id );
			if( eF ){
				eF.submit();
			}
		},
		searchKey: function( e ) {
				if( isNumeric( this.ta_data.substr(0,6) ) && ( this.ta_data.length > 5 ) ){
					if( this.brand === "LTD" ){
						if( e.key !== "Backspace" ){
							if( this.ta_data.length === 6 ){ this.ta_data+="-"; }
							if( this.ta_data.length === 12){ this.ta_data+="-"; }
						}
					}
					this.getSearch();
				}else{
					this.ta_response = "";
				}
		}
	},
	created: function() {	
		if( document.getElementById("js-headnavtype__topsearch--id") ){
			document.getElementById("js-headnavtype__topsearch--id").classList.remove("hidden");
		}
		this.brand = document.querySelector("[data-brand]").dataset.brand;
	}
});

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var srchBtn = document.getElementsByClassName("js-topsearch__btn");
if(srchBtn.length > 0) {		
	srchBtn[0].addEventListener("click", function(){
		var formId = this.dataset.searchFormId;			
		console.log(formId);
		document.getElementById(formId).submit();
	});
}