"use strict";

var ltdc_megamenu = new Vue( {
	el: "#js-megamenu--id",
	data: {
		isOpen: false,
		aMegaNav: {children:[]},
		stick: false,
		bL2: false,
		bL3: false,
		nl2l3: 0,
		cat_l2l3: [],
		cat_lvl1: {},
		cat_lvl2: {},
		hasImage: false,
		lazyLoaded: false
	},
	watch: {
		hasImage: function(){  //  Lazy load logic
			if( this.hasImage && !this.lazyLoaded ){
				this.lazyLoaded = true;
				[].slice.call( document.querySelectorAll("[data-ugc2-cat]") ).filter(function( _eUGC ){
					var _eImg = _eUGC.firstElementChild;
					if( (typeof _eImg != "undefined" ) && (typeof _eImg.dataset.lzSrc != "undefined" ) ){
						_eImg.src = _eImg.dataset.lzSrc;
					}
				} );
			}
		}
	},
	methods: {
		open:  function(){
			this.isOpen = true;
			if( oTopmenu ){ this.$el.style.top = oTopmenu.getTopmenuLoc(); }
			if( oTopmenu ){ this.stick = oTopmenu.isSticky(); }
		},
		close: function(){
			this.hover_l1("static");
			this.isOpen = false;
		},
		setCat: function( jsnCat ){
			this.oCat = jsnCat;
		},
		hover_l1: function( sCat ){
			this.mutexUgc2( sCat );
			if( sCat === "static" ){
				this.cat_lvl1 = {};
				this.bL2 = false;
			}else{
				this.cat_l2l3 = this.getL2L3( sCat );  //  Get denorm arr of l2 and l3
				this.nl2l3 = this.calcBreakPoint();
				if( this.cat_lvl1 ) this.bL2 = true;
			}
			this.bL3 = false;
			this.aMegaNav.children.filter(function( _lvl1 ){ _lvl1.select = false; });  //  clear hover state
		},
		calcBreakPoint: function(){  //  Visually balance the left / right cols
			var nL1_len = this.aMegaNav.children.length;
			var nL23_len = this.cat_l2l3.length;
			var nRet = (nL1_len - 1);
			if( nL1_len < nL23_len ){
				nRet = ( Math.floor( nL23_len / 2) - 1);
				do {
					nRet++;
				}
				while ( this.cat_l2l3[ nRet ] && this.cat_l2l3[ nRet ].l === 3 );
			}
			return nRet;
		},
		mutexUgc2: function( sCat ){
			var _hasUGC2 = false;
			var _eaMutex = document.querySelectorAll(".ugc2__mutex");
			if( _eaMutex.length >= 1 ){
				[].slice.call( _eaMutex ).filter(function( _el ){
					if( sCat === _el.dataset.ugc2Cat ){  //  data-ugc2-cat
						_el.classList.remove("ugc2__mutex--hide");
						_hasUGC2 = true;
					}else{
						_el.classList.add("ugc2__mutex--hide");
					}
				});
			}
			if( _hasUGC2 ){
				document.getElementById("js-ugc2--id").classList.remove( "mm-grid__ugc2--hide" );
				this.hasImage = true;
			}else{
				document.getElementById("js-ugc2--id").classList.add( "mm-grid__ugc2--hide" );
				this.hasImage = false;
			}
		},
		getL2L3: function( sCat ){  //  Gen denorm array of l2 and l3
			var aL2 = [];
			this.aMegaNav.children.filter(function( oCat ){
				if( oCat.cat === sCat){
					oCat.children.filter(function( oCat2 ){
						aL2.push( { cat:oCat.cat, name:oCat2.name, href:oCat2.href, l:2} );
						if( oCat2.children ){
							oCat2.children.filter(function( oCat3 ){
								aL2.push( { cat:oCat3.cat, name:oCat3.name, href:oCat3.href, l:3} );
							});							
						}
					});
				};		
			});
			return aL2;
		},
	    parseJSONCat: function(){
	      var oPush={}, nLvl=0, sName="", sHref="", nL2Ct = -1;
	      for (var key in jsnCat) {  //  Normalize JSON Hier
	          nLvl=1;
	          if(typeof( jsnCat[key].level2CategoryUrl ) !== "undefined"){ nLvl=2; }
	          if(typeof( jsnCat[key].level3CategoryUrl ) !== "undefined"){ nLvl=3; }
	          sName=jsnCat[key]["level"+nLvl+"DisplayName"];
	          sHref=jsnCat[key]["level"+nLvl+"CategoryUrl"];
	          switch( nLvl ){
	            case 1:
	              oPush={name: sName, href: sHref, cat: key};
	              this.aMegaNav.children.push( oPush );
	              nL2Ct = -1;
	            break;
	            case 2:
	              if(typeof( oPush.children )=="undefined"){ oPush.children=[]; }
	              oPush.children.push( {name: sName, href: sHref, cat: key} );
	              nL2Ct++;
	            break;
	            case 3:
	              if(typeof( oPush.children[nL2Ct] )!="undefined"){
	                if(typeof( oPush.children[nL2Ct].children )=="undefined"){
	                    oPush.children[nL2Ct].children=[];
	                }
	                  oPush.children[nL2Ct].children.push( {name: sName, href: sHref, cat: key} );
	              }
	          }
	      }
	    }
	},
	created: function( e ){
		this.parseJSONCat();
	}
});

var oMegamenu = (function(doc, sLinkId, vcMegaMenu ){  //  init | wire dom events
	var _eLink = doc.getElementById( sLinkId ); // refer A and vect / text within
	var _fClose = function(){
		_eLink.classList.remove("megamenu");
		vcMegaMenu.close(); // Tell vue comp to close
	};
	if( _eLink ){ // A element
		_eLink.addEventListener("click", function( e ){
			if( oTopmenu && oTopmenu.isMobile() ){
				oTopmenu.autoToggle();
			}else{
				if( !vcMegaMenu.isOpen ){
					_eLink.classList.add("megamenu");
					if( oTopsearch ){ oTopsearch.close(); }  //  Mutex S3.4
					if( oFlymyaccount ){ oFlymyaccount.close(); }  //  Mutex S3.4
					if( vTAtopmenu ){ vTAtopmenu.close(); }  //  Close Type Ahead
					vcMegaMenu.open();
				}else{
					_fClose();
				}
			}
		}, true);
		doc.body.addEventListener("click", function( e ){  //  Outside Click close
		  var eTarget = e.target, bInside = false;
		  while( eTarget.tagName !== "HTML" ){  //  Disregard clicks from within
		    if( eTarget.id === "js-topmenu__menu--id" ){ return false; }
		    if( eTarget.tagName === "LTDC-MEGAMENU" ){ bInside = true; break; }
		    eTarget = eTarget.parentNode;
		  }
		  if( !bInside && vcMegaMenu.isOpen ){
		    _fClose();
		  }
		}, true);
	}
	window.addEventListener("scroll", function() { _fClose(); }); // Listen for scroll
	return {
		"close": function(){
			_fClose();
		}
	}
})( document, "js-topmenu__menu--id", ltdc_megamenu );