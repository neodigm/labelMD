"use strict";
var oSortrefine = (function( _d, sCritSel, sGridSel, sChips ){
	var _aCr = [].slice.call( document.querySelectorAll( sCritSel ) );
	var _aGr = [].slice.call( document.querySelectorAll( sGridSel ) );
	var _aCh = [].slice.call( document.querySelectorAll( sChips ) );
	var _eSort = _d.getElementById( "js-sr-sort--id" );
	var _ePage = _d.getElementById( "js-sr-page--id" );
	var _eSort_pnl = _d.getElementById( "js-sr-sort__pnl--id" );
	var _ePage_pnl = _d.getElementById( "js-sr-page__pnl--id" );
	var _eRefine = _d.getElementById( "js-sr-btn__refine--id" );
	if( _eSort_pnl ){ _eSort_pnl.sr_state = false; }
	if( _ePage_pnl ){ _ePage_pnl.sr_state = false; }


//  Move Elements
var _nCr = _d.getElementsByClassName( "sr-grid__criteria" );
var eChp = _d.getElementsByClassName( "sr-grid__chip" )[0];
if( !eChp ) return;  //  Exit if not required on this page.
var ePar = eChp.parentElement;
for (var ix = 0; ix < _nCr.length; ix++) {
	ePar.insertBefore( _nCr[ 0 ], eChp);  //  NodeList is real-time
}
[
"js-sr__dep__mobl--id",
"js-sr__gen__mobl--id",
"js-sr__col__mobl--id",
"js-sr__siz__mobl--id",
"js-sr__rev__mobl--id"].filter(function( _sId ){
	var _eTarget = _d.getElementById( _sId );
	var _eSource = _d.getElementById( _sId.replace("__mobl", "") );
	if( _eTarget && _eSource ){
		_eTarget.innerHTML = _eTarget.innerHTML + _eSource.innerHTML;
		_eTarget.classList.add("sr-grid__criteria");
	}
	if( _eTarget && !_eSource ){ _eTarget.classList.add("hidden"); }
});


	if( _eSort ){  //  Wire DOM Events
		_eSort.addEventListener("click", function(){ oSortrefine.doSort(); });
	}
	if( _ePage ){
		_ePage.addEventListener("click", function(){ oSortrefine.doPage(); });
	}
	//_d.getElementsByClassName("sr-btn sr-btn--refine")[0].addEventListener("click", function(){ oSortrefine.openLeftDrawer(); });

	if(_eRefine){
		_eRefine.addEventListener("click", function(){ oSortrefine.openLeftDrawer(); });
	}

	_aCr.filter( function( _e ){
		_e.addEventListener("click", function( _e ){  //  Criteria button clicks
			var sId = this.dataset.srPanel;
			var bOpen = this.classList.contains("btn--open");
			if( bOpen ){
				this.classList.remove("btn--open")
				oSortrefine.doCriClick( );
			}else{
				_aCr.filter( function( _e ){ _e.classList.remove("btn--open"); });
				this.classList.add("btn--open")
				oSortrefine.doCriClick( sId );
			}
		});
	});
	var _fClose = function(){
		_ePage_pnl.classList.add("hidden");
		_eSort_pnl.classList.add("hidden");
		_eSort_pnl.sr_state = false;
		_ePage_pnl.sr_state = false;
		oSortrefine.doCriClick();
	}
	_d.body.addEventListener("click", function( e ){  //  Outside Click close
	  var eTarget = e.target, bInside = false;
	  while( eTarget.tagName !== "HTML" ){  //  Disregard clicks from within
	    if( eTarget.dataset.srPanel || eTarget.id == "js-sr-sort--id" || eTarget.id == "js-sr-page--id" ){ bInside = true; break; }
	    eTarget = eTarget.parentNode;
	  }
	  if( !bInside ){
	    _fClose();
	  }
	}, true);
	return {
		"openLeftDrawer": function(){
			var eMenu =  document.getElementById( "js-topmenu__id" );
			var eScrim = document.getElementById( "js-topmenu-scrim__id" );
			if( eMenu && eScrim ){
				_d.getElementById( "v-leftnav__id" ).classList.add("hidden");
				eMenu.classList.add("isOpen__menu");
				eScrim.classList.add("isOpen__scrim");
				oTopmenu.bOpen( true );
				_d.getElementById( "js-rs__cont--id" ).classList.remove("hidden");
			}
		},
		"doSort": function( _e ){ // on click
			if( !_eSort_pnl.sr_state ){
				_eSort_pnl.classList.remove("hidden");
				if( _ePage_pnl.sr_state ){  //  mutex
					_ePage_pnl.classList.add("hidden");
					_ePage_pnl.sr_state = !_ePage_pnl.sr_state;
				}
				oSortrefine.doCriClick();
			}else{
				_eSort_pnl.classList.add("hidden");
			}
			_eSort_pnl.sr_state = !_eSort_pnl.sr_state;
		},
		"doPage": function( _e ){ // on click
			if( !_ePage_pnl.sr_state ){
				_ePage_pnl.classList.remove("hidden");
				if( _eSort_pnl.sr_state ){  //  mutex
					_eSort_pnl.classList.add("hidden");
					_eSort_pnl.sr_state = !_eSort_pnl.sr_state;
				}
				oSortrefine.doCriClick();
			}else{
				_ePage_pnl.classList.add("hidden");
			}
			_ePage_pnl.sr_state = !_ePage_pnl.sr_state;
		},
		"doCriClick": function( _sId ){  //  Toggle Panels or Chips
			if( oTopmenu && !oTopmenu.isMobile() ){
				var eShow = _d.getElementById( _sId );
				_aGr.filter( function( _e ){ _e.classList.add("hidden"); });  //  Hide all panels
				if( eShow ){
					eShow.classList.remove("hidden");
					_d.getElementsByClassName("sr-grid__chip")[0].classList.add("hidden");
					_ePage_pnl.classList.add("hidden");
					_eSort_pnl.classList.add("hidden");
					_eSort_pnl.sr_state = false;
					_ePage_pnl.sr_state = false;
				}else{
					if( _aCh.length >= 1 ){  //  Unhide Chips
						_d.getElementsByClassName("sr-grid__chip")[0].classList.remove("hidden");
					}
					_aCr.filter( function( _e ){ _e.classList.remove("btn--open"); });  //  Close criterion
				}
			}
		}
	}
})( document, ".sr-btn--criterion", ".sr-grid__criteria", ".sr-grid__chip .sr-btn" );

var resetFilter = document.getElementsByClassName( "sr-btn__chip--clear" );
if(resetFilter.length > 0){
	var link = document.getElementsByClassName( "sr-left-link" );
	if(link.length > 0){
		link[0].setAttribute("href", resetFilter[0].getAttribute("href"));
		link[0].classList.remove("hidden");
	}
}

var dropDown = document.getElementsByClassName("dropdown__ul--a");
for (var i=0; i<dropDown.length; i++) {
	dropDown[i].addEventListener("click", function(){
		fireTealiumEvent({"e_sort_item_options" : this.text});
	});
}