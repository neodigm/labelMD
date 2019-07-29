"use strict";
var oTopmenu = (function( doc, sID, sPlaceHldrID ){
	var _eTopmenu = doc.getElementById( sID );
	var _eTopmenu_ph = doc.getElementById( sPlaceHldrID );
	var _nOffset = _eTopmenu.offsetTop;
	var _bStick = false;
	var eHB = null, eMenu = null, eScrim = null, bOpen = false, eVectClose = null;
	var _fInit = function() {
		eMenu =  document.getElementById( "js-topmenu__id" );
		eScrim = document.getElementById( "js-topmenu-scrim__id" );
		eScrim.addEventListener("click", oTopmenu.toggle, false);
		eVectClose = document.getElementById("js-vect-close--id");
		eVectClose.addEventListener("click", oTopmenu.toggle, false); // X Click
	}
	window.addEventListener("scroll", function() {oTopmenu.stick()}); // Listen for scroll
	return {
		"bOpen": function( _b ){ bOpen = _b; },
		"init": function(){ _fInit(); },
		"stick": function(){
			if (window.pageYOffset >= _nOffset) {  //  Add class if scroll to top
				_eTopmenu.classList.add("ever-present__menu");
				_eTopmenu_ph.style.height = "60px";
				_bStick = true;
			} else {
				_eTopmenu.classList.remove("ever-present__menu");
				_eTopmenu_ph.style.height = "0px";
				_bStick = false;
			}
		},
		"isSticky": function(){ return _bStick; },
		"getTopmenuLoc" : function(){
			return _eTopmenu.getBoundingClientRect().bottom + "px";
		},
		"isMobile": function(){ return ( _eTopmenu.clientWidth <= 1064 ) ? true : false; },
		"toggle" : function( e ){
				oTopmenu.autoToggle();
				e.preventDefault();
		},
		"autoToggle" : function(){
				if( bOpen ){
					eMenu.classList.remove("isOpen__menu");
					eScrim.classList.remove("isOpen__scrim");
					eVectClose.classList.add("hide");
				}else{
					var _eRefine = document.getElementById( "js-rs__cont--id" );
					if( _eRefine ){ _eRefine.classList.add("hidden"); }
					document.getElementById( "v-leftnav__id" ).classList.remove("hidden");
					eMenu.classList.add("isOpen__menu");
					eScrim.classList.add("isOpen__scrim");
					eVectClose.classList.remove("hide");
				}
				bOpen = !bOpen;
		},
		"scrollIntoView" : function(){
			if( oTopmenu.isMobile() ){
document.getElementById("js-topmenu--id").scrollIntoView();
document.getElementById("js-topmenu--id").scrollTop += 10;
			}
		}
	};
})(document, "js-topmenu--id", "js-topmenu__placeholder--id");
oTopmenu.init();

var vTAtopmenu = new Vue({
	el: "#c_headnavtype__search--id",
	data: {
		brand: "LTD",
		ta_data: "",
		ta_response: "",
		is_hidden: true,
		is_watched: true,
		form_id: "basicsearchForm",
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
			vTAtopmenu = this;
			axios.get(  this.async_base,{params: {environment: 'typeAhead_queries', sort: 'alpha', searchFrom: '',Ntt:this.ta_data.trim()+"*"}} )
			.then(function ( response ) {									
				var aTmp = [], aPins = response.data.replace("<div>","").split( "\n" );	
				for (var i=0; i<(aPins.length - 1); ++i) { 
					var nPos = aPins[i].indexOf(" ");
					aTmp.push( [aPins[i].substr(0,nPos), aPins[i].substr(nPos)] );
				}
				vTAtopmenu.ta_response = aTmp;							
			})
			.catch(function ( error ) {
				vTAtopmenu.ta_response = "";
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
		if( document.getElementById("js-headnavtype__search--id") ){
			document.getElementById("js-headnavtype__search--id").classList.remove("hidden");
		}
		this.brand = document.querySelector("[data-brand]").dataset.brand;
	}
});

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var srchBtn = document.getElementsByClassName("js-search__btn");
if(srchBtn.length > 0) {
	srchBtn[0].addEventListener("click", function(){
		var formId = this.dataset.searchFormId;
		document.getElementById(formId).submit();
	});
}