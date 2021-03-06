"use strict";

Vue.config.devtools = true;

var doZoom = null;

var vltdc_productdetail = new Vue( {
  el: "#js-productdetail--id",
  data: {
    Opt : {"async_base": "/catalog/modals/productDetail.jsp?productId="},
    jResponse: {"childSkus": [{"value":{"largeImageUrl":""}}]},
    nUpdates: 0,
    aThumbnails: [],
    aThumbnails3: [],
    aSwatches: [],
    aSizeCharts: [],
    aFlickHero: [],
    bFlickHero: false,
    oFlickHero: {},
    nFlickHeroPers: -1,
    nQty: "1",
    noDropdowns: 0,
    aPicker1: [],
    aPicker2: [],
    selectedPickr1SKU: {},
    selectedPickr2SKU: {},
    sProdId: "",
    sBookId: "",
    C2AMicrocopy: "",
    bShowSoldOut: false,
    isLessThan4: false,
    isPlayingVideo: false,
    calcPriceLine1: "",
    calcPriceLine2: "",
    calcPriceLine3: "",
    calcPriceLine4: "",
    tabmutex: [{"caption": "Overview", "selected": true}, {"caption": "Details", "selected": false}],
    selectedSKU: {"value": {"listPrice": 0} },
    selectedHero: "",
    persInstructSrc: "",
    dropd_surf_init_0: false, dropd_cont_state_0: false,
    dropd_surf_init_1: false, dropd_cont_state_1: false,
    dropd_surf_init_2: false, dropd_cont_state_2: false,
    OUT_OF_STOCK: "11",
    fontZoom: 1,
    isWaiting: false,
    isCartMsg: false,
    isCartMsgErr: false,
    aCartMsg: [],
    isGiftMsg: false,
    isGiftMsgErr: false,
    aGiftMsg: [],
    isPersCollapsed: false,
    isPersChecked: false,
    isProductDescCollapsed: true,
    isExclusive: false,
    isInit: false,
    showSocial: false
  },
  watch: {
    aFlickHero : function(){
      vltdc_productdetail.bindFlick();
    },
    selectedHero : function(){
      this.zoomzoom();
    },
    isCartMsg : function(){
      if( this.isCartMsg ){
        var _self = this;
        setTimeout(function(){ _self.isCartMsg = false; }, 6400);
      }
    },
    isCartMsgErr : function(){
      if( this.isCartMsgErr ){
        var _self = this;
        setTimeout(function(){ _self.isCartMsgErr = false; }, 6400);
      }
    },
    isGiftMsg : function(){
      if( this.isGiftMsg ){
        var _self = this;
        setTimeout(function(){ _self.isGiftMsg = false; }, 6400);
      }
    },
    isGiftMsgErr : function(){
      if( this.isGifttMsgErr ){
        var _self = this;
        setTimeout(function(){ _self.isGifttMsgErr = false; }, 6400);
      }
    },
    jResponse : function(){
      var _v = this;
      var _aThumbnails = this.aThumbnails;
      var _aSwatches = this.aSwatches;
      var _aSizeCharts = this.aSizeCharts;
      var _aFlickHero = this.aFlickHero;
      var _nFlickHeroPers = this.nFlickHeroPers;
      var _isExclusive = this.isExclusive;
      var _nCnt = 0, _sSizeChart = "";
      this.selectedSKU = this.jResponse.childSkus[0];
      if( this.jResponse.childSkus.length >= 2 ){
        this.noDropdowns = 1; // No of Dropdowns | 0,1 or 2
        if( this.jResponse.childSkus[0].value.picker2Title !== "" ) this.noDropdowns++;
      }
      if( this.jResponse.largeImageUrl ){
        _aThumbnails.push( { "level" : "10", "img": this.jResponse.largeImageUrl, "sku": "product", "pers": true, "alt": this.jResponse.displayName } );
      }
      this.jResponse.childSkus = this.jResponse.childSkus.filter( function( _child ){  //  Remove Archived
          return !_child.value.isArchived;
      });
      if( this.jResponse.auxiliaryMedia && this.jResponse.auxiliaryMedia.length ){  //  Product zm1 and 2
        this.jResponse.auxiliaryMedia.filter( function( _oAux ){
          var sKey = Object.keys( _oAux )[0];
          if( sKey.indexOf("zm") != -1 ){
            if( _oAux[sKey].indexOf("_zm") != -1 ){  //  Exclude *_qmn.jpg
              _aThumbnails.push( { "level" : "11", "img": _oAux[sKey], "sku": vltdc_productdetail.jResponse.repositoryId, "pers": true, "alt": vltdc_productdetail.jResponse.displayName } );
            }
          }
        } );
      }
      this.jResponse.childSkus.filter( function( _child, nSkuCnt ){  //  Build Thumbnails
        if( _child.value.isExclusive ) _isExclusive = true;
        if( _child.value.displayName ) _child.value.displayName = _child.value.displayName.replace("&amp;trade;", "&trade;");
        if( _child.value.largeImageUrl ) _aThumbnails.push( { "level" : nSkuCnt + 12, "img": _child.value.largeImageUrl, "sku": _child.key, "pers": false, "alt": _child.value.displayName } );
          if( _child.value.auxiliaryMedia ){
            _child.value.auxiliaryMedia.filter( function( _aux ){
              for( var k in _aux ){  //  Add tn from aux media if the key contains MN
                if(( k.indexOf("sw") != -1) && (_aux[ k ].indexOf("_sw.") != -1) ){
                  if( _v.noDropdowns === 1 ){
                    _aSwatches.push( {"p1v": _v.getSwatchName( nSkuCnt ), "img": _aux[ k ], "imgtn": _aux.largeImageUrl, "avail": _child.value.availabilityId, "availPost": _child.value.availabilityId, "sku": _child.key, "pers": false, "alt": _v.getSwatchName( nSkuCnt ) } );
                  }else{
                    _aSwatches.push( {"p1v": _v.getSwatchName( nSkuCnt ), "img": _aux[ k ], "imgtn": _aux.largeImageUrl, "avail": 1, "availPost": _child.value.availabilityId, "sku": _child.key, "pers": false, "alt": _v.getSwatchName( nSkuCnt ) } );
                  }
                }
                if( k.indexOf("zm") != -1 ){
                  if( _aux[ k ].indexOf("_zm") != -1 ){  //  Exclude *_qmn.jpg
                    _aThumbnails.push( { "level" : nSkuCnt + 12, "img": _aux[ k ], "sku": _child.key, "pers": false, "alt": _child.value.displayName  } );
                  }
                }
              }
            } );
          }
      } );
      this.isExclusive = _isExclusive;

      this.sortTN( _aThumbnails );
      
      if( this.jResponse.auxiliaryMedia && this.jResponse.auxiliaryMedia.length ){  //  Personal Instructions
        this.jResponse.auxiliaryMedia.filter( function( _oAux ){
          if( _oAux.pm ){
            _aThumbnails.push( { "img": _oAux.pm , "sku": vltdc_productdetail.jResponse.repositoryId, "pers": true, "alt": "How to Personalize" } );
            vltdc_productdetail.persInstructSrc = _oAux.pm;
          }
        var sKey = Object.keys( _oAux )[0];
        if( sKey.indexOf("sc") != -1 ){
            if( _oAux[sKey].indexOf("_sc") != -1 ){  //  size chart only
              _aSizeCharts.push( { "img": _oAux[sKey], "sku": vltdc_productdetail.jResponse.repositoryId, "pers": true, "alt": "Size Chart" } );
            }
          }
        } );
      }
      _sSizeChart = this.getSizeChart();
      if( _sSizeChart ){  //  Size Charts TN
        if( _aSizeCharts.length == 0 ){  //  No need for another size chart if SC exists.
          _aSizeCharts.push( { "img": _sSizeChart , "sku": this.jResponse.repositoryId, "pers": true, "alt": "Size Chart" } ); // Size chart
        }
      }

      _aThumbnails.filter( function( _tn ){ //  Build Hero array from TN (may pers instr but not video or size chart)
        _aFlickHero.push( { "img": _tn.img, "sku": _tn.sku, "pers": _tn.pers } );
      });

      if( this.jResponse.productVideo ){  //  Video | second button and on state
        this.isPlayingVideo = false;
        _aThumbnails.splice(1, 0, { "img": "/media/global/images/icons/pdp-video-btn.jpg" , "sku": "video", "pers": true });
      }

      _aThumbnails.forEach(function(_currentValue, _index, _arr){
        _currentValue.nOrd = _index;
      }, "thisValue");

      this.isLessThan4 = ( this.aThumbnails3.length <= 4 );  //  Hide Nav Arrows
      if( _aThumbnails[0] ) this.selectedHero = _aThumbnails[0].img;  //  Init

      if( this.jResponse.childSkus[0].value.isPersonalized ){ // gen pers input placeholder
        this.jResponse.childSkus.filter( function( _child ){
          if( _child.value.personalizedData ){
            _child.value.personalizedData.personalizedAttributes.filter( function( _oInput ){
              var _oFirst = _oInput[Object.keys(_oInput)[0]], _sText = "";
              _sText = ( ( _oFirst.isRequired ) ? "* " : "");
              _sText += _oFirst.header;
              _sText += (_oFirst.maxLength == 1) ? " (1"       : " (up to " + _oFirst.maxLength;
              _sText += (_oFirst.maxLength == 1) ? " character" : " characters";
              _sText += ")";
              _sText  = (_oFirst.dataType == 2) ? _sText.replace("up to ", "") : _sText;  //  4 char year
              _sText  = (_oFirst.dataType == 3) ? _oFirst.header : _sText;  // option dropdown
              if( _oFirst.placeholder_date ){
                _sText  = ( ( _oFirst.isRequired ) ? "* " : "") + "Date (" + _oFirst.placeholder_date + ")";
              }
              _oInput.placeholder = _sText;
              if( _oFirst.options ){
                _oInput.options = _oFirst.options.split("^");
              }
              _oInput.input_data = "";
            });
          }
        });
      }
      if( this.noDropdowns == 2 ){  //  Gen Pickers OM
        var _aP1 = this.aPicker1, _aP2 = this.aPicker2, _sUniq1 = "", _sUniq2 = "", _sTmp = "";
        this.jResponse.childSkus.filter( function( _child ){
          var _val = _child.value;
          _sTmp = "|"+_val.picker1Title+_val.picker1Value+"|";
          if( _sUniq1.indexOf( _sTmp ) == -1 ){
            _aP1.push( {"sku": _child.key, "title": _val.picker1Title, "value": _val.picker1Value, "avail": true, "context": true} );
            _sUniq1 = _sUniq1 + _sTmp;
          }
          _sTmp = "|"+_val.picker2Title+_val.picker2Value+"|";
          if( _sUniq2.indexOf( _sTmp ) == -1 ){
            _aP2.push( {"sku": _child.key, "title": _val.picker2Title, "value": _val.picker2Value, "avail": true, "context": true} );
            _sUniq2 = _sUniq2 + _sTmp;
          }
        });
      this.selectedPickr1SKU = this.aPicker1[0];  //  init
      this.selectedPickr2SKU = this.aPicker2[0];
      }
      this.getPrice( this.jResponse.salePriceRange,this.jResponse.listPriceRange,this.jResponse.compareAtPriceRange,this.jResponse.saveValueMin,this.jResponse.saveValue, true );
      if( this.jResponse.selectedSku && this.noDropdowns == 1){ // Be careful with the case of this var
        this.selectSKU( this.jResponse.selectedSku, 0, false ); // This has to fire after the thumbs have been gen
      }
      if( oTopmenu && !oTopmenu.isMobile() ){
        this.fontZoom = 2;  //  Small A (1) on mobile else medium A (2)
      }
      
      this.dedupeTN();  //  Hide duplication Thumbnails
      if( this.aSwatches.length > 0 ) this.dedupeSW();  //  Hide duplication Swatches
      this.dedupeFH(); 	//  Hide duplication flickity hero's - mobile.
      this.update3();
    },
    nQty : function(){
        this.nQty = String( this.nQty ).replace(/[^0-9]/g,"");  //  Filter out alphas
    }  //  End of JResponse watch
  },
  methods: {
    "zoomzoom": function(){
      if( oTopmenu && !oTopmenu.isMobile() ){
        var sInner = "<img id=#js-z__image# src=#" + vltdc_productdetail.selectedHero + "# alt=#Magnifying Glass#>";
        document.getElementById( "js-z__cont" ).innerHTML = sInner.split('#').join("'");
        vltdc_productdetail.$forceUpdate();
        doZoom = new Zoom("#js-z__image", { large: this.selectedHero, helperSize: 177, animation: 480 } );
      }
    },
    doAction: function( jProductDet ){
      if( jProductDet ){
        vltdc_productdetail = this;
        vltdc_productdetail.jResponse =  jProductDet[Object.keys(jProductDet)[0]];
        vltdc_productdetail.sProdId = "sProd";   // TODO get from json
        vltdc_productdetail.sBookId = "sBookId"; // TODO get from json
        vltdc_productdetail.bShowSoldOut = true; // TODO get from location href search
      }
    },
    refresh: function(){
    },
    tabmutex_selected : function( tab ){
      var _ePanelSelected = document.getElementById( "js-tabmutex-tabpanel__"+tab.caption.toLowerCase()+"--id" );
      var aPanels = [].slice.call( document.getElementsByClassName( "tabmutex-tabpanel" ) );
      this.$data.tabmutex.filter( function( _tab ){ // Deselect all tabs
        _tab.selected = false;
        return true;
      } );
      tab.selected = true; // Select one tab
      aPanels.filter( function( ePan ){  //  Hide all panels
        ePan.classList.add("hidden");
        ePan.setAttribute("aria-hidden", "true");
      } );
      _ePanelSelected.classList.remove("hidden");  // Unhide one panel
      _ePanelSelected.setAttribute("aria-hidden", "false");
    },
    selectSKUClass : function( aSKUClass ){  //  Swatch Clicked
      var nSKU_index = -1, _v = this;
      var aChildSKU = _v.jResponse.childSkus;
      for(var i=0; i <= (aSKUClass.length - 1); i++){  // Is picker 1 the same
        var oSKU = aChildSKU[ aSKUClass[ i ][0] ].value;  // and not sold out
        if( oSKU.picker1Value === _v.selectedPickr1SKU.value ){
          if( oSKU.availabilityId !== "11" ) nSKU_index = i;
        }else if( !oSKU.picker1Value && !_v.selectedPickr1SKU.value ){
          if( oSKU.availabilityId !== "11" ) nSKU_index = i;
        }else if( nSKU_index == -1 ){
          if( oSKU.availabilityId !== "11" ) nSKU_index = i;
        }
      }
      if( nSKU_index != -1 ) this.selectSKU( aSKUClass[ nSKU_index ][1], 0, false );
    },
    selectSKU : function( _sSku, _sImg, _bPers, _nOrd ){  //  Create selected sku data model
      var _ChildSku = this.getChildIndex( _sSku );
      var _aTn = this.aThumbnails.filter( function( _oTn ){
        if( _oTn.sku === _sSku ){
          return true;
        }
      } );
      this.selectedHero = ( _sImg ) ? _sImg : _aTn[0].img;
      var _selH = this.selectedHero, _nCnt = 0;

      this.aFlickHero.forEach( function( _e, _i){
        if( _e.img === _selH ) _nCnt = _i;
      } );

      if( this.oFlickHero.select ){
        this.oFlickHero.select( ( _nCnt ), false, false )  //  Animate Carousel
      }

      if(  this.jResponse.childSkus[ _ChildSku ] && !_bPers ){  //  Do not process size chart, pers instruction or video
        this.selectedSKU = this.jResponse.childSkus[ _ChildSku ];
        if( this.noDropdowns === 1 ){  //  The dropdown has been init
          this.dropd_surf_init_0 = true;
        }
        if( this.noDropdowns === 2 ){
          this.dropd_surf_init_1 = true;
          this.dropd_surf_init_2 = true;
        }
        if( this.selectedSKU.value.salePrice || this.selectedSKU.value.compareAtPrice ){
          this.getPrice(this.selectedSKU.value.salePrice, this.selectedSKU.value.listPrice, this.selectedSKU.value.compareAtPrice, this.jResponse.saveValueMin,this.jResponse.saveValue, false);
        }else{
          this.getPrice(this.selectedSKU.value.salePrice, this.selectedSKU.value.listPrice, this.selectedSKU.value.compareAtPrice, 0, 0, false);
        }
        this.selectedPickr1SKU = { "sku": _ChildSku, "title": this.selectedSKU.value.picker1Title, "value": this.selectedSKU.value.picker1Value, "avail": this.selectedSKU.value.availabilityId };
        this.selectedPickr2SKU = { "sku": _ChildSku, "title": this.selectedSKU.value.picker2Title, "value": this.selectedSKU.value.picker2Value, "avail": this.selectedSKU.value.availabilityId };
        if( this.noDropdowns === 2 ){
          this.filterPDContext( 2, this.selectedSKU.value.picker1Value );
        }
      }
      if( _sSku == "video" ){
        this.isPlayingVideo = true;
      }else if( this.isPlayingVideo ){
        this.isPlayingVideo = false;
      }
      if( this.aSwatches.length > 0 ) this.doSwatchSoldOut();
      return true;
    },
    doSwatchSoldOut: function(){
      var _v = this;
      if( typeof this.aSwatches[0].availList != "undefined" ){
        this.aSwatches.filter(function( _sw ){  //  Swatch sold-out avail status
          if( _sw.availList.indexOf( _v.getSwatchName( _v.getChildIndex( _sw.sku ) ) ) !== -1 ){
            _sw.avail = 1;
          }else{
            if( _v.noDropdowns === 1 ){
              _sw.avail = _sw.availPost;
            }else{
              _sw.avail = 11;
            }
          }
        });
      }
    },
    getSwatchName: function( nChildIdx ){
      var _v = this, sRetNameText = "";
      if( !_v.selectedPickr1SKU.value ){
        if( !_v.jResponse.childSkus[ nChildIdx ].value.picker1Value ){
          sRetNameText = _v.jResponse.childSkus[ nChildIdx ].value.displayName;
        }else{
          sRetNameText = _v.jResponse.childSkus[ nChildIdx ].value.picker1Value;
        }
      }else{
        sRetNameText = _v.selectedPickr1SKU.value;
      }
      return sRetNameText;
    },
    getChildIndex: function( _sSku ){
      var _nCnt = -1, _nIndex = 0;
      this.jResponse.childSkus.filter( function( _child ){
        _nCnt++;
        if( _child.key === _sSku ){
          _nIndex = _nCnt;
        }
      });
      return _nIndex;
    },
    getPrice : function( salePriceRange, listPriceRange, compareAtPriceRange, saveValueMin, saveValue, bUpdate3_4 ){
      if( salePriceRange && ( salePriceRange !== "" ) ){
        this.calcPriceLine1 = salePriceRange;
        this.calcPriceLine2 = "Orig. " + listPriceRange; // strike though

        if( compareAtPriceRange && ( compareAtPriceRange !== "" ) ){

          this.calcPriceLine3 = "Compare at: " + compareAtPriceRange;

          if( saveValueMin != "" && ( saveValue != saveValueMin ) ){
            if( saveValue ) this.calcPriceLine4 = " SAVE UP TO " + saveValue;
          }else{
            if( saveValue ) this.calcPriceLine4 = " SAVE " + saveValue;
          }

        }else{
          if( saveValueMin != "" && ( saveValue != saveValueMin ) ){
            if( saveValue ) this.calcPriceLine4 = "SAVE UP TO " + saveValue;
          }else{
            if( saveValue ) this.calcPriceLine4 = "SAVE " + saveValue;
          }
        }
      }else{
        this.calcPriceLine1 = listPriceRange;
        this.calcPriceLine2 = "";
        if( compareAtPriceRange && ( compareAtPriceRange !== "" ) ){
          this.calcPriceLine3 = "Compare at: " + compareAtPriceRange;
          if( saveValueMin != "" && ( saveValue != saveValueMin ) ){
            if( saveValue ) this.calcPriceLine4 = " SAVE UP TO " + saveValue;
          }else{
            if( saveValue ) this.calcPriceLine4 = " SAVE " + saveValue;
          }
        }else{
          this.calcPriceLine3 = "";
          this.calcPriceLine4 = "";
        }
      }
    },
    getAdditionalDelv: function(){
      var _sAddDelMsg = "";
      if( this.selectedSKU.value.additionalCost ){
        _sAddDelMsg = this.getCurrency( this.selectedSKU.value.additionalCost );
      }
      return _sAddDelMsg;
    },
    getCurrency: function( _sUSD ){
      if( _sUSD ){
        _sUSD = String( _sUSD );
        if( _sUSD.indexOf( "." ) == -1 ) _sUSD += ".00";
        if( _sUSD.indexOf( "$" ) == -1 ) _sUSD = "$" + _sUSD;
      }
      return _sUSD;
    },
    getSizeChart: function(){
      var _sGender = "";
      this.jResponse.childSkus.filter( function( _oSKU ){
        if( _oSKU.value.dynamicAttributes ){
          var _sDynAttr = _oSKU.value.dynamicAttributes.toLowerCase();
          if( _sDynAttr.indexOf("size chart=m") != -1 ) _sGender = "m";
          if( _sDynAttr.indexOf("size chart=w") != -1 ) _sGender = "w";
        }
      } );
      return ( _sGender ) ? "/images/quicker_"+_sGender+"_size_chart.jpg": false;
    },
    getUOM : function(){
      return this.jResponse.uom;
    },
    thumbArrowNav: function( _nValue ){
      var oTn;
      if( _nValue === 1 ){
        while( true ){ // loop until first visable
          oTn = this.aThumbnails.pop();
          this.aThumbnails.unshift( oTn );
          if( !oTn.hide ) break;
        }
      }else{
        while( true ){ // loop until first visable
          oTn = this.aThumbnails.shift();
          this.aThumbnails.push( oTn );
          if( !oTn.hide ) break;
        }
      }
      this.update3();
    },
    dropd_surf_toggle: function( _nDropd ){
      var sWidth = document.getElementById("js-dropdown-0--id");
      if( sWidth ){
        sWidth = document.getElementById("js-dropdown-0--id").offsetWidth;
        if( !sWidth ){
          sWidth = document.getElementById("js-dropdown_1--id").offsetWidth;
        }
        if( sWidth ){
          document.getElementById( "js-drop-container__0--id" ).style.width = sWidth + "px";
          document.getElementById( "js-drop-container__1--id" ).style.width = sWidth + "px";
          document.getElementById( "js-drop-container__2--id" ).style.width = sWidth + "px";
        }
      }

      switch( String( _nDropd ) ) {
        case "0":
          this.dropd_cont_state_0 = !this.dropd_cont_state_0;
        break;
        case "1":  //  mutex
          this.dropd_cont_state_1 = !this.dropd_cont_state_1;
          if( this.dropd_cont_state_1 ) this.dropd_cont_state_2 = false;
        break;
        case "2":  //  mutex
          this.dropd_cont_state_2 = !this.dropd_cont_state_2;
          if( this.dropd_cont_state_2 ) this.dropd_cont_state_1 = false;
        break;
      }
      if( this.aSwatches.length > 0 ) this.doSwatchSoldOut();
    },
    isC2AValid: function(){
      var _nError = 0;
      var _sMsg = ["Add to Cart", "Enter Quantity", "Out of Stock", "Select an Item", "Please Wait", "Check Confirmation", "* Required Field", "Invalid Date"];
      if( this.nQty <= 0 ) _nError = 1;
      if( this.selectedSKU.value.isPersonalized && !this.isPersChecked ){ _nError = 5; }
      if( this.selectedSKU.value.isPersonalized && !this.isPersDateYYvalid() ){ _nError = 7; }
      if( this.selectedSKU.value.isPersonalized &&  this.isPersDateYYYYinvalid() ){ _nError = 7; }
      if( this.selectedSKU.value.isPersonalized &&  this.isPersRequiredFilled() ){ _nError = 6; }
      if( this.selectedSKU.value.isPersonalized && !this.isPersDataMonthDDYYYvalid() ){ _nError = 7; }
      if( this.isWaiting ) _nError = 4;
      if( this.selectedSKU.value.availabilityId == this.OUT_OF_STOCK ) _nError = 2;
      if( this.noDropdowns == 1 && !this.dropd_surf_init_0 ){ _nError = 3; }
      if( this.noDropdowns == 2 && (!this.dropd_surf_init_1 || !this.dropd_surf_init_2) ){ _nError = 3; }
      this.C2AMicrocopy = _sMsg[ _nError ];
      return ( _nError === 0 );
    },
    isPersRequiredFilled: function(){
      var _isRequired = false;
      if( this.selectedSKU.value.personalizedData ){
        this.selectedSKU.value.personalizedData.personalizedAttributes.filter( function( _oInput ){
          if( _oInput[Object.keys(_oInput)[0]].isRequired && !_oInput.input_data ) _isRequired = true;
        });
      }
      return _isRequired;
    },
    isPersDateYYvalid: function(){
      if( this.selectedSKU.value.personalizedData ){
        var _qrv = this;
        var _aValid = this.selectedSKU.value.personalizedData.personalizedAttributes.filter( function( _oInput ){
          var _oFirst = _oInput[Object.keys(_oInput)[0]];
          if( _oFirst.dataType === 3 ) return true;
          var _bNoInput = ( (_oFirst.inputFormat == '""') || (_oFirst.inputFormat.length == 0) ) ? true : false;
          return ( !_oInput.input_data || ( _bNoInput ) || (( _oFirst.inputFormat === 6 ) && _qrv.isValidDateYY( _oInput.input_data )) );
        });
      }
      return ( _aValid.length != 0 );
    },
    isPersDateYYYYinvalid: function(){
      if( this.selectedSKU.value.personalizedData ){
        var _qrv = this;
        var _aValid = this.selectedSKU.value.personalizedData.personalizedAttributes.filter( function( _oInput ){
          var _oFirst = _oInput[Object.keys(_oInput)[0]], _bRet = false;
          if(  !_oInput.input_data ){
            _bRet = false;
          }else if( _oFirst.dataType !== 2 ){
            _bRet = false;
          }else if( ( _oFirst.inputFormat === 8 ) && ( _oInput.input_data.length !== 4 ) ){
            _bRet = true;
          }
          return _bRet;
        });
      }
      return ( _aValid.length >= 1 );
    },
    isPersDataMonthDDYYYvalid: function(){
      var _bAnyIsInvalid = false;
      if( this.selectedSKU.value.personalizedData ){
        var _aValid = this.selectedSKU.value.personalizedData.personalizedAttributes.filter( function( _oInput ){
          var _oFirst = _oInput[Object.keys(_oInput)[0]];
          if( _oInput.input_data ){
            if( _oFirst.inputFormat === 1 && _oFirst.dataType === 2 ){
              if( ( letterCounter(_oInput.input_data) < 3 ) || ( numberCounter(_oInput.input_data) < 5 ) ){
                _bAnyIsInvalid = true;
              }
            }
          }
        });
      }
      return ( !_bAnyIsInvalid );
    },
    submitGift: function( _callBack ){
      var _nQty = this.nQty;
      if( this.isC2AValid() ){
        _callBack();
        this.isWaiting = true;
      }
    },
    submitGiftComplete: function(){
        this.isWaiting = false;
        this.nQty = 1;
        this.isGiftMsg = true;
        this.selectedSKU = this.jResponse.childSkus[0];
        this.dropd_surf_init_0 = false; this.dropd_cont_state_0 = false;
        this.dropd_surf_init_1 = false; this.dropd_cont_state_1 = false; this.dropd_surf_init_2 = false; this.dropd_cont_state_2 = false;
        this.clearPersInput();
    },
    submitGiftError: function(){        
        this.isWaiting = false;        
    },
    submitCart: function( _callBack ){
      var _nQty = this.nQty;
      if( this.isC2AValid() ){
        _callBack();
        this.isWaiting = true;
        this.aCartMsg[0] = this.nQty;
        this.aCartMsg[1] = this.jResponse.displayName + " " + this.selectedSKU.value.displayName;
      } else {
        if( oTopmenu && oTopmenu.isMobile() ){
          var _eS = document.querySelectorAll(".thumb-nav")[0];
          if( _eS ) {  //  offset value for floating
            _eS.scrollIntoView( true );
          }
        }
        this.open1st();
      }
    },
    submitCartComplete: function(){
        this.isWaiting = false;
        this.nQty = 1;
        this.isCartMsg = true;
        this.selectedSKU = this.jResponse.childSkus[0];
        this.dropd_surf_init_0 = false; this.dropd_cont_state_0 = false;
        this.dropd_surf_init_1 = false; this.dropd_cont_state_1 = false; this.dropd_surf_init_2 = false; this.dropd_cont_state_2 = false;
        this.clearPersInput();
    },
    submitCartError: function(){
        this.isWaiting = false;
    },
    clearPersInput: function(){  //  Clear the pers input from the data model
      if( this.jResponse.childSkus[0].value.isPersonalized ){
        this.isPersChecked = false;
        this.selectedPickr1Locked = false;
        this.jResponse.childSkus.filter( function( _child ){
          if( _child.value.personalizedData ){
            _child.value.personalizedData.personalizedAttributes.filter( function( _oInput ){
              _oInput.input_data = "";
            });
          }
        });
        this.aPicker1.filter( function( _oPick ){ _oPick.context = true; });
        this.aPicker2.filter( function( _oPick ){ _oPick.context = true; });
      }
    },
    dropd_select: function( _sKey, _nDropd ){
      if( this.jResponse.childSkus[ this.getChildIndex( _sKey ) ].value.availabilityId != this.OUT_OF_STOCK ){
        this[ "dropd_cont_state_" + _nDropd ] = true;
        this[ "dropd_surf_init_" + _nDropd ] = true;
        this.dropd_surf_toggle( _nDropd );
        this.selectSKU( _sKey, 0, false );
      }
    },
    dropd_selectDP: function( _sKey, _sValue, _nDropd, _nOrdPick ){
      if( this.dropd_surf_init_1 ){
        if( this[ "aPicker" + _nDropd][ _nOrdPick ].avail == this.OUT_OF_STOCK ) return false;
      }

      this[ "dropd_cont_state_" + _nDropd ] = true;
      this[ "dropd_surf_init_" + _nDropd ] = true;
      this[ "selectedPickr" + _nDropd + "SKU"] = this[ "aPicker" + _nDropd][ _nOrdPick ];
      this.dropd_surf_toggle( _nDropd );
      if( _nDropd == 1 ){
        this.filterPDContext( 2, this.selectedPickr1SKU.value );  //  filter bottom
        if( !this.selectedPickr2SKU.context ){  //  Deselect if not context
          this.deselectPicker( 2 );
          vltdc_productdetail.selectedPickr2SKU = this.aPicker2[0];  //  This may need to be first context=true
        }
      }
      if( _nDropd == 2 ){
        if( !this.selectedPickr2SKU.context ){  //  Deselect if not context
          this.deselectPicker( 1 );
          vltdc_productdetail.selectedPickr1SKU = this.aPicker1[0];  //  This may need to be first context=true
        }
      }

      if( this.dropd_surf_init_1 && this.dropd_surf_init_2 ){
        this.selectSKU( this.getDPSku( this.selectedPickr1SKU.value, this.selectedPickr2SKU.value )[0].key, 0, false );
      }
    },
    filterPDContext: function( _nDropd, _sValue ){  //  Filter either dropdown by alternate sku value
        var _this = this;
        this[ "aPicker" + _nDropd ].filter( function( _oSelect ){  //  Iterate alternate dropdowns values
          var _aExists = _this.jResponse.childSkus.filter( function( _oChild ){
                      if( _oChild.value["picker" + ((_nDropd==1)?2:1) + "Value"] == _sValue ){
                        if( _oChild.value["picker" + _nDropd + "Value"] == _oSelect.value ) return true;
                      }
                    });
          _oSelect.context = ( _aExists.length >= 1 );
          var _bOutOfStock = true;  //  Is this sku combo out of stock
          if(_nDropd==1){
            _bOutOfStock = _this.isOutOfStock( _oSelect.value , _sValue );
          }else{
            _bOutOfStock = _this.isOutOfStock( _sValue , _oSelect.value );
          }
          _oSelect.avail = ( _bOutOfStock ) ? "11" : true;
        });
    },
    deselectPicker: function( _nDropd ){  //  Set a picker back to its origin init state (visually)
          this["dropd_cont_state_" + _nDropd ] = false;
          this["dropd_surf_init_" + _nDropd ]= false;
    },
    isOutOfStock: function( _sValue1, _sValue2 ){  //  Given two dp values return true if sold out
      var _aSkus = this.jResponse.childSkus.filter( function( _oChild ){
        if((_oChild.value.picker1Value == _sValue1) && (_oChild.value.picker2Value == _sValue2)){
          if( _oChild.value.availabilityId === "11" ) return true;
        }
      });
      return ( _aSkus.length >= 1 );
    },
    getDPSku: function( _sValue1, _sValue2 ){
      return this.jResponse.childSkus.filter( function( _child ){
        if( (_sValue1 == _child.value.picker1Value) && (_sValue2 == _child.value.picker2Value) ){
          return true;
        }else{
          return false;
        }
      } );
    },
    isValidDateYY: function( _sDateYY ){  //  Disclaimer, expects American dates and will not check for leap year.
      if(!/^\d{1,2}\/\d{1,2}\/\d{2}$/.test( _sDateYY )) return false;
      var parts = _sDateYY.split("/");
      var day = parseInt(parts[1], 10), month = parseInt(parts[0], 10), year = parseInt(parts[2], 10);
      if( month == 0 || month > 12 ) return false;
      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      return day > 0 && day <= monthLength[month - 1];
    },
    isValidKeyStroke: function(){
      vltdc_productdetail.$forceUpdate()
      this.jResponse.childSkus.filter( function( _child ){
        if( _child.value.personalizedData ){
          _child.value.personalizedData.personalizedAttributes.filter( function( _oInput ){
            var _oFirst = _oInput[Object.keys(_oInput)[0]];
            switch( _oFirst.dataType ){
              case 1:
                // Allow A-Z, 0-9, space, &, ', ", -, ., !, #
                _oInput.input_data = String( _oInput.input_data ).replace(/[^A-Za-z0-9. &-.\"\'!,#]/g, "").replace("*", "").replace("(", "").replace(")", "").replace("+", "");
              break
              case 2:
                if( _oFirst.inputFormat > "1" && _oFirst.inputFormat < "8" ){  // MM/DD/YY
                   if( _oFirst.inputFormat > "4" && _oFirst.inputFormat < "8" ) _oInput.input_data = _oInput.input_data.slice(0, "nn*nn*nn".length );
                   if( _oFirst.inputFormat < "5" && _oFirst.inputFormat > "1" ) _oInput.input_data = _oInput.input_data.slice(0, "nn*nn*nnnn".length );
                  _oInput.input_data = String( _oInput.input_data ).replace(/[^0-9\.\-\/]/g,"");  //  Filter out non-num and (/-.)
                }
                if( _oFirst.inputFormat == "8" ){  // YYYY
                  _oInput.input_data = _oInput.input_data.slice(0, "yyyy".length );
                  _oInput.input_data = String( _oInput.input_data ).replace(/[^0-9]/g,"");  //  Filter out non-num and (/-.)
                }
              break
            }
          });
        }
      });
    },
  getPersInputArray: function(){
    var sInputs="$", sValues="$";
    if( this.jResponse.childSkus[0].value.isPersonalized ){ // Return dollar delim input/value set
      this.selectedSKU.value.personalizedData.personalizedAttributes.filter( function( _oInput ){
        var _oFirst = _oInput[Object.keys(_oInput)[0]];
        sInputs += ( "$" + _oFirst.header );
        sValues += ( "$" + _oInput.input_data );
      });
    }
    return [sInputs, sValues];
  },
  doPersIntruct: function(){
    this.selectedHero = this.persInstructSrc;
    this.oFlickHero.select( ( this.nFlickHeroPers ), false, false )  //  Animate Carousel
  },
  bindFlick: function(){
    if( oTopmenu && oTopmenu.isMobile() ){
      setTimeout(function(){
        vltdc_productdetail.bFlickHero = true;
        vltdc_productdetail.oFlickHero = new Flickity( "#js-flickHero--id", { pageDots: false, wrapAround: true, cellSelector: ".flickhero__cell", cellAlign: "center", "prevNextButtons": false });
        document.getElementById( "js-flick__hero--id" ).style.display = "block";
        vltdc_productdetail.oFlickHero.resize();
      }, 1200);
    }
  },
  dedupeSW: function(){  //  Hide swatches with the same image
    var oRollup = {}, sImgName, nIdx=0, sUnq = "";
    this.aSwatches.forEach( function( _sw ){
      sImgName = _sw.img.split("/").pop();
      if( !oRollup[ sImgName ]){
        oRollup[ sImgName ] = {};
        oRollup[ sImgName ].availList = "";
        oRollup[ sImgName ].aSKUClass = [];
      }  //  A swatch is only sold out when all SKUs are sold out (11)
      oRollup[ sImgName ].availList += (( _sw.availPost === "11" ) ?  "|" : (_sw.p1v + "#"));
      oRollup[ sImgName ].aSKUClass.push( [ nIdx++, _sw.sku ] );
    } );
    this.aSwatches = this.aSwatches.filter( function( _sw ){
      if( sUnq.indexOf( _sw.img + "#" ) == -1 ){
        sImgName = _sw.img.split("/").pop();
        _sw.availList = oRollup[ sImgName ].availList;
        _sw.aSKUClass = oRollup[ sImgName ].aSKUClass;
        sUnq += _sw.img + "#";
        return true;
      }
    });
  },
  dedupeFH: function(){  //  Hide FlickHero's with the same image - mobile
    var sUnq = "";
    this.aFlickHero = this.aFlickHero.filter( function( _tn ){
      if( sUnq.indexOf( _tn.img + "#" ) == -1 ){
        sUnq += _tn.img + "#";
        return true;
      }
    });
  },
  sortTN: function( _aTN ){
    _aTN.sort(function(a,b) {  //  sort by level + file name asc
      var sZm_a, sZm_b;
      sZm_a = (typeof a.level == "undefined") ? "100": a.level;
      sZm_a += a.img;
      sZm_b = (typeof b.level == "undefined") ? "100": b.level;
      sZm_b += b.img;
      if ( sZm_a < sZm_b ){ return -1; }
      if ( sZm_a > sZm_b ){ return 1; }
      return 0;
    } );
  },
  dedupeTN: function(){  //  Hide thumbs with the same image
    var sUnq = "";
    this.aThumbnails.filter( function( _tn ){
      if( sUnq.indexOf( _tn.img + "#" ) == -1 ){
        sUnq += _tn.img + "#";
      }else{ _tn.hide = true; }
      return true;
    });
  },
  update3: function(){  //  Sync the proxy / presentation array
    this.aThumbnails3 = this.aThumbnails.filter( function( _tn ){
      return !_tn.hide;
    });
    this.isLessThan4 = ( this.aThumbnails3.length <= 4 );  //  Hide Nav Arrows
  },
  toggleSocial: function(){
    this.showSocial = true;
  },
  open1st: function(){  //  Open first drop-down - should be closed
    this.dropd_surf_toggle( '0' );
  }
  },
  created: function( e ){
    document.body.addEventListener("click", function( e ){  //  Outside Click close
      var cQv = vltdc_productdetail, eTarget = e.target, bInside = false;
      while( eTarget.tagName !== "HTML" ){  //  Disregard clicks from within
        if( eTarget.tagName === "LTDC-DROPDOWN" ){ bInside = true; break; }
        eTarget = eTarget.parentNode;
      }
      if( !bInside ){
        if( cQv ){
          if( cQv.dropd_cont_state_0 ) cQv.dropd_surf_toggle("0");
          if( cQv.dropd_cont_state_1 ) cQv.dropd_surf_toggle("1");
          if( cQv.dropd_cont_state_2 ) cQv.dropd_surf_toggle("2");
        }
      }
    }, true);
  },
  mounted: function(){
    setTimeout(function(){ vltdc_productdetail.zoomzoom(); }, 1200);
  },
  updated: function( e ){
    if( !this.isInit ){
      if( typeof ltdc_pdpsocial !== "undefined" ){
        ltdc_pdpsocial.init( document, document.body.dataset.brand );
        this.isInit = true;
        if( fSecCards && oTopmenu ){ fSecCards.bind( "ltdc-productdetail .seccard__surface", oTopmenu.isMobile() ); }
      }
    }
  }
} );

if( vltdc_productdetail && jProductDet ){ vltdc_productdetail.doAction( jProductDet ); }
window.addEventListener("resize", function(){
  if( typeof vltdc_productdetail !== "undefined" ){ vltdc_productdetail.zoomzoom(); }
})

var fSecCards = (function(){  //  function for Section Card bound events
  var _eCards;
  return {
      bind: function( sQuery, bMobile ){  //  Wire DOM events
        _eCards = document.querySelectorAll( sQuery );
        if( _eCards ){
            for (var idx = 0; idx < _eCards.length; ++idx) {
              var oPrDatSt = _eCards[ idx ].parentNode.dataset;
              if( bMobile && oPrDatSt.stateMobile ){ oPrDatSt.state = oPrDatSt.stateMobile; }  //  Init state
              _eCards[ idx ].addEventListener("click", function( e ){
                  var _eArtc = this.parentNode;  //  Article element
                  _eArtc.dataset.state = (_eArtc.dataset.state == "opened") ? "closed" : "opened";
              });
            }
        }
      }
  };
})();
if( fSecCards && oTopmenu ){ fSecCards.bind( "#reviewSummary .seccard__surface", oTopmenu.isMobile() ); }

(function(root) {
  'use strict';
  var IE9 = navigator.appVersion.indexOf("MSIE 9.") > -1;
  var defaultConfig = {
    helperSize: 150,
    containHelper: true,
    containerClass: "zm-container",
    wrapperClass: "zm-wrapper",
    previewClass: "zm-preview",
    customPreviewClass: "zm-custom-preview",
    imageClass: "zm-image",
    helperClass: "zm-helper",
    hoverClass: "zm-hover",
    fadeInClass: "zm-fade-in",
    fadeOutClass: "zm-fade-out",
    activeClass: "zm-active"
  };

  /* classList shim for IE9 */
  var classList = {
    contains: function(a, b) {
      if ( a )
        return a.classList ? a.classList.contains(b) : !!a.className && !!a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"));
    },
    add: function(a, b) {
      if (!classList.contains(a, b)) {
        if (a.classList) { a.classList.add(b); } else { a.className = a.className.trim() + " " + b; } }
    },
    remove: function(a, b) {
      if (classList.contains(a, b)) { if (a.classList) { a.classList.remove(b); } else { a.className = a.className.replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " "); }}
},
  };

  var transform = function(el, x, y) {
    if ( IE9 ) {
      el.style.left = x + "px";
      el.style.top = y + "px";
    } else {
      el.style.transform = "translate3d(" + x + "px, " + y + "px, 0px)";
    }
  };

  var extend = function(target, varArgs) {
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };

  var rect = function(el) {
    var win = window, doc = document, body = doc.body;
    var r = el.getBoundingClientRect();
    var x = win.pageXOffset !== undefined ? win.pageXOffset : (doc.documentElement || body.parentNode || body).scrollLeft;
    var y = win.pageYOffset !== undefined ? win.pageYOffset : (doc.documentElement || body.parentNode || body).scrollTop;

    return {
      x: r.left + x,
      y: r.top + y,
      height: r.height,
      width: r.width
    };
  };

  var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments, later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  var Zoom = function(el, options) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    this.config = extend({}, defaultConfig, options || {});

    this.events = {
      loaded: this.loaded.bind(this),
      mouseenter: this.mouseenter.bind(this),
      mousemove: this.mousemove.bind(this),
      mouseleave: this.mouseleave.bind(this),
      update: this.update.bind(this)
    };

    this.events.debounce = debounce(this.events.update, 50);
    this.ratio = {};
    this.imageLoaded = false;
    this.zoomLoaded = false;

    this.initDOM();
  }

  Zoom.prototype.init = function() {

    this.ratio.x = this.image.width / this.config.helperSize;
    this.ratio.y = this.image.height / 216;//this.config.helperSize;
    this.zoomImage.style.width = (this.image.width * this.ratio.x) + "px";

    window.addEventListener("resize", this.events.debounce);
    this.wrapper.addEventListener("mouseenter", this.events.mouseenter);
  };

  Zoom.prototype.initDOM = function() {

    var o = this.config;
    this.wrapper = document.createElement("div");
    if ( this.el.nodeName !== "IMG" ) {

      this.container = this.el;
      this.image = document.createElement("img");
      this.image.src = this.config.small;
      classList.add(this.image, o.imageClass);
      this.wrapper.appendChild(this.image);

    } else {

      this.isImage = true;
      this.container = document.createElement("div");
      this.image = this.el;
      classList.add(this.el, o.imageClass);

    }
    this.zoomImage = document.createElement("img");
    this.zoomImage.src = o.large;
    this.zoomImage.alt = "Zoom Magnified Image";

    classList.add(this.container, o.containerClass);

    classList.add(this.wrapper, o.wrapperClass);

    this.helper = document.createElement("div");
    classList.add(this.helper, o.helperClass);

    if ( o.previewContainer ) {
      this.customPreview = true;
      this.previewContainer = document.querySelector(o.previewContainer);
      classList.add(this.previewContainer, o.customPreviewClass);
    } else {
      this.previewContainer = document.createElement("div");
      this.container.appendChild(this.previewContainer);
      classList.add(this.previewContainer, o.previewClass);
    }

    this.previewContainer.appendChild(this.zoomImage);
    this.container.appendChild(this.wrapper);
    this.wrapper.appendChild(this.helper);
    this.el.parentNode.insertBefore(this.container, this.el);

    if ( this.isImage ) {
      this.wrapper.appendChild(this.el);
    }

    this.update();
    this.helper.style.width = this.config.helperSize + "px";
    this.helper.style.height = this.config.helperSize + "px";
    this.previewContainer.style.width = this.rect.width + "px",
    this.previewContainer.style.height = this.rect.height + "px"
    this.image.addEventListener("load", this.events.loaded);
    this.zoomImage.addEventListener("load", this.events.loaded);
  }

  Zoom.prototype.loaded = function(e) {
    if ( e.target === this.image ) {
      this.imageLoaded = true;
    } else {
      this.zoomLoaded = true;
    }

    if ( this.imageLoaded && this.zoomLoaded ) {
      this.init();
    }
  };

  Zoom.prototype.mousemove = function(e) {
    var r = this.rect;
    var s = this.config.helperSize;
    var x = e.pageX - r.x - (s / 2);
    var y = e.pageY - r.y - (s / 2);

    // Limit movement
    if ( this.config.containHelper ) {
      if ( x <= 0 ) {
        x = 0;
      }
      if ( x >= r.width - s ) {
        x = r.width - s;
      }
      if ( y <= 0 ) {
        y = 0;
      }
      if ( y >= r.height - s ) {
        y = r.height - s;
      }
    }
    transform(this.helper, x, y);
    transform(this.zoomImage, (-x * this.ratio.x), (-y * this.ratio.y));
  };
  Zoom.prototype.mouseenter = function(e) {
    var that = this, o = this.config;
    if ( o.animation && that.timer ) {
      clearTimeout(that.timer);

      if ( that.customPreview ) {
        classList.remove(that.previewContainer, o.fadeOutClass);
      } else {
        classList.remove(that.container, o.fadeOutClass);
      }
    }
    classList.add(that.container, o.hoverClass);

    if ( that.customPreview ) {
      classList.add(that.previewContainer, o.activeClass);
    }
    if ( o.animation ) {
      if ( that.customPreview ) {
        classList.add(that.previewContainer, o.fadeInClass);
      } else {
        classList.add(that.container, o.fadeInClass);
      }
    }
    that.wrapper.addEventListener("mousemove", that.events.mousemove);
    that.wrapper.addEventListener("mouseleave", that.events.mouseleave);
  };

  Zoom.prototype.mouseleave = function(e) {
    var that = this, o = this.config;
    if ( o.animation ) {
      if ( that.customPreview ) {
        classList.remove(that.previewContainer, o.fadeInClass);
        classList.add(that.previewContainer, o.fadeOutClass);
      } else {
        classList.remove(that.container, o.fadeInClass);
        classList.add(that.container, o.fadeOutClass);
      }
      that.timer = setTimeout(function() {
        classList.remove(that.container, o.hoverClass);
        classList.remove(that.container, o.fadeOutClass);

        if ( that.customPreview ) {
          classList.remove(that.previewContainer, o.fadeOutClass);
          classList.remove(that.previewContainer, o.activeClass);
        } else {
          classList.remove(that.container, o.fadeOutClass);
        }
        that.timer = false;
      }, 250);
    } else {
      classList.remove(that.container, o.hoverClass);
      if ( that.customPreview ) {
        classList.remove(that.previewContainer, o.activeClass);
      }
    }
    that.wrapper.removeEventListener("mousemove", that.events.mousemove);
    that.wrapper.removeEventListener("mouseleave", that.events.mouseleave);
  };
  Zoom.prototype.update = function() {
    this.rect = rect(this.container);
  };
  root.Zoom = Zoom;
}(this));

function letterCounter (x) {
  return x.replace(/[^a-zA-Z]/g, '').length;
}
function numberCounter (x) {
  return x.replace(/[^0-9]/g, '').length;
}

var prodCollBtn = document.getElementsByClassName("js-view__prod--coll");
if(prodCollBtn.length > 0) {
		var prodCollEle = document.getElementsByClassName("prod__collection");
		prodCollBtn[0].addEventListener("click", function() {
			if (prodCollEle.length > 0) {
        document.getElementsByClassName("prod__collection")[0].scrollIntoView( true );
			}
		});
}