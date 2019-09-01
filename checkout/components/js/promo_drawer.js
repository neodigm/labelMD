"use strict";
var ltdc_promo_drawer = function( _d, _aIDs ){  //  Manage promo drawer state/events
	var _eDrw = _d.getElementById( _aIDs[0] ), _eChevron = _d.getElementById( _aIDs[1] );
	var _eCap = _d.getElementById( _aIDs[2] );
	var _sBrand="ltd", _eTab, _eCont, _aPanels = [], _nPanelCurrent = 0, _bEngaged = false;
	var _nSecondsBeforeClose = 9;  //  Number of Seconds before close if auto opened
	var _bDocked = true, _sDockMode = "dock";  //  init in docked state
	if( _eDrw && _eChevron ) {
		_eTab = _eDrw.firstElementChild;
		_eCont= _eTab.nextElementSibling;
		var _fIsTabletLandscape = function(){
			if( (window.innerWidth >= 1022) && (window.innerWidth <= 1368) ){  //  True if iPad Landscape or iPad Pro
				return true;
			}
		}
		var _fOpen = function(){
			_bDocked = !_bDocked;
			_eDrw.classList.remove( "l-promo_drawer--" + _sDockMode + "ed" );
			_eChevron.style.transform = "rotate(0deg)";
			if( oTopmenu && oTopmenu.isMobile() && !_fIsTabletLandscape() ){
				if( _eCap.dataset.capCurrent ) _eCap.innerHTML = _eCap.dataset.capCurrent;
			}
		}
		var _fDock = function(){
			_bDocked = !_bDocked;
			_eDrw.classList.add( "l-promo_drawer--" + _sDockMode + "ed" );
			_eChevron.style.transform = "rotate(180deg)";
			if( _eCap.dataset.capDock ) _eCap.innerHTML = _eCap.dataset.capDock;
			_bEngaged = false;
			_fClearInputs( "input" );  //  Clear input data upon Docking
		}
		var _fNavPrev = function(){
			if( _nPanelCurrent > 0 ) _fRender( --_nPanelCurrent );  //  not circular
		}
		var _fNavNext = function(){
			if( _nPanelCurrent < ( _aPanels.length - 1 ) ) _fRender( ++_nPanelCurrent );  //  not circular
		}
		var _fAutoOpen = function(){
			setTimeout( function(){
				if( !ltdc_promo_drawer.isDocked() && !ltdc_promo_drawer.isEngaged() ){ 
					ltdc_promo_drawer.toggle();
				 }
			}, (_nSecondsBeforeClose * 1000));
			setTimeout(function(){
				ltdc_promo_drawer.open();
			}, 2000);
		}
		var _fRender = function( nCurrent ){
			_eCap.dataset.capCurrent = _aPanels[ nCurrent ].caption;
			if( !_bDocked ) _eCap.innerHTML = _aPanels[ nCurrent ].caption;
			/*if( _aPanels[ nCurrent ].prev ){  //  Update the prev/next background image
				_ePrv.style.backgroundImage = "url('/images/" + _aPanels[ nCurrent ].prev + "')";
			}else{
				_ePrv.style.backgroundImage = "url('')";
			}
			if( _aPanels[ nCurrent ].next ){
				_eNxt.style.backgroundImage = "url('/images/" + _aPanels[ nCurrent ].next + "')";
			}else{
				_eNxt.style.backgroundImage = "url('')";
			}*/
			if( (oTopmenu && oTopmenu.isMobile()) && !_fIsTabletLandscape() ){
				_aPanels.filter( function( _p ){ _p.el.classList.add( "hide" ); } );
				_aPanels[ nCurrent ].el.classList.remove("hide");
			}else{
				_aPanels.filter( function( _p ){ _p.el.classList.remove( "hide" ); } );
			}
		}
		var _fWireEvents = function(){
			_eTab.addEventListener("click", function( _e ){  //  tab click event									
				ltdc_promo_drawer.toggle();
				if(!ltdc_promo_drawer.isDocked()){
					fireTealiumEvent({"e_special_offers_drawer" : "t"});
				}
			});
			/*_ePrv.addEventListener("click", function( _e ){  //  left click event				
				fireTealiumEvent({"e_headerpopup_email_p" : "t"});
				ltdc_promo_drawer.prev();
			});
			_eNxt.addEventListener("click", function( _e ){  //  right click event
				fireTealiumEvent({"e_popup_sms_p" : "t"});
				ltdc_promo_drawer.next();
			});*/
			["click", "touchstart"].forEach(function( sEv ){
				window.addEventListener(sEv, function( _e ){  //  Outside Click close
					var eZurbReveal = document.getElementsByClassName("reveal-modal-bg")[0];  //  Reveal exceptions
					if( eZurbReveal && eZurbReveal.style.display == "block" ) return;
					if( ( typeof( ltdc_reveal ) != "undefined" ) && ltdc_reveal.isOpen ) return;

					var eTarget = _e.target, bInside = false;
					while( eTarget.tagName !== "HTML" ){  //  Disregard clicks from within
					  if( eTarget.tagName === "LTDC-PROMO_DRAWER" ){ _bEngaged = bInside = true; break; }
					  eTarget = eTarget.parentNode;
					}
					if( !bInside && !_bDocked ) _fDock();
				  }, true);
			});
			/*[].slice.call( _d.querySelectorAll(".prmo-panel__cont") ).filter( function( _e ){
				var sOrder, sToken, sCaption;  //  Gen data model from declarative markup
				sOrder = _e.dataset.prmdrwOrder;
				sToken = _e.dataset.prmdrwToken;
				sCaption = _e.dataset.prmdrwCaption;
				sPrevImg = _sBrand + "_promo_drawer_" + sToken + "_prev.png";  //  /images/[ltd]_promo_drawer_[token]_prev.png
				sNextImg = _sBrand + "_promo_drawer_" + sToken + "_next.png";  //  /images/[ltd]_promo_drawer_[token]_next.png
				if( sOrder === "1" ) sPrevImg = null;  //  not circular
				_aPanels.push({ "order": sOrder, "token": sToken, "caption": sCaption, "prev": sPrevImg, "next": sNextImg, "el": _e });
			});
			_aPanels[ (_aPanels.length -1)].next = null;*/
		}
		var _fGetPanel = function( _sToken ){  //  Given a unq token return its order index (1 based)
			if( _sToken ){
				return _aPanels.filter( function( _oPanel ){
					if( _sToken === _oPanel.token ) return true;
					})[0].order;
			}
		}
		var _fClearInputs = function( _sQuery ){
			if( _sQuery ){  //  Clear data in INPUT elaments (not hidden)
				[].slice.call( _eCont.querySelectorAll( _sQuery ) ).filter( function( _e ){
					if( _e.type.toUpperCase() !== "HIDDEN" ) _e.value = "";
				});
			}
		}
		_eChevron.style.transition = "all 1.8s ease-out";
		_eChevron.style.transform = "rotate(180deg)";
		return {
			"init": function( sBrand ){
				if( sBrand ){
					//var sLocSt = localStorage.getItem("ltdc_promo_drawer");
					_sBrand = sBrand.toLowerCase();
					ltdc_promo_drawer.setDockMode( _eDrw.dataset.dock );  //  string
					_eDrw.classList.remove( "hide" );
					_fWireEvents();
					_eTab.style.left = (( document.body.clientWidth / 2 ) - ( _eTab.clientWidth / 2 ) ) + "px";
					/*_fRender( 0 );
					if( sLocSt ){  //  Reset if time limit elapsed
						var dLS = new Date( Number( sLocSt ) ), dNow = new Date();
						if( dLS < dNow ){
							sLocSt = null;
							localStorage.removeItem("ltdc_promo_drawer");
						}
					}
					if( !sLocSt ){  //  Autoopen only on first engagement
						var dPlus30days = new Date(Date.now() + 30*24*60*60*1000);
						localStorage.setItem("ltdc_promo_drawer", dPlus30days.getTime() );
						if( _sDockMode === "dock" ) ltdc_promo_drawer.autoopen();
					}*/
				}
			},
			"open": function( sToken, sTag ){  //  Unique token had from markup
				var _nCurOrder = _fGetPanel( sToken );
				if( _nCurOrder ){
					_nPanelCurrent = --_nCurOrder;
					_fRender( _nPanelCurrent );
				}
				if( _bDocked ) _fOpen();
				if( sTag && fireTealiumEvent ){  //  Call Tealium if exists
					var tealVar = {};
					tealVar[sTag] = "t";
					fireTealiumEvent(tealVar);
				}
			},
			"toggle": function(){
				if( _bDocked ){
					_fOpen();
				}else{
					_fDock();
				}
			},
			"enchant": function(){
				if( _bDocked && (Math.floor((Math.random() * 9) + 1) > 6) ){  //  1 in 3 chance
					_eChevron.style.transform = "rotate(0deg)";
					_eChevron.style.fill = "#00ff00";
					setTimeout( function(){ 
						if( _bDocked ) _eChevron.style.transform = "rotate(180deg)";
						_eChevron.style.fill = "#fff";
					}, 2600);
				}
			},
			"prev": function(){
				_fNavPrev();
			},
			"next": function(){
				_fNavNext();
			},
			"autoopen": function(){
				_fAutoOpen();
			},
			"setDockMode" : function( sDockMode ){  //  Expects a string True of False
				if( sDockMode === "true" ){
					_sDockMode = "dock";
					_eDrw.classList.remove( "l-promo_drawer--nodocked" );
					_eDrw.classList.add( "l-promo_drawer--" + _sDockMode + "ed" );

				}else{
					_sDockMode = "nodock";
					_eDrw.classList.remove( "l-promo_drawer--docked" );
					_eDrw.classList.add( "l-promo_drawer--" + _sDockMode + "ed" );
				}
			},
			"reset": function(){
				localStorage.removeItem("ltdc_promo_drawer");
			},
			"test_date": function( nDays ){
				if( nDays ){
					var dPlusXdays = new Date(Date.now() + nDays*24*60*60*1000);
					localStorage.setItem("ltdc_promo_drawer", dPlusXdays.getTime() );
					console.table([
					{"date": Date(), "Source": "Now"},
					{"date": dPlusXdays, "Source": "Calculated"}
				]);
				}
			},
			"isDocked": function() { return _bDocked; },
			"isEngaged": function() { return _bEngaged; },
			"isTabletLandscape" : function() { return _fIsTabletLandscape(); }
		}
	}
}( document, ["js-promo_drawer--id", "js-prmo-drwr__vect--id", "js-prmo-drwr__caption--id"] );
if( ltdc_promo_drawer ){
	ltdc_promo_drawer.init( document.body.dataset.brand );
}