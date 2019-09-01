"use strict";

Vue.config.devtools = true;

var vltdc_quickerview = new Vue( {
  el: "#js-quickerview--id",
  data: {
    Opt : {"async_base": "/catalog/modals/productDetail.jsp?productId="},
    jResponse: {"childSkus": [{"value":{"largeImageUrl":""}}]},
    nUpdates: 0,
    aThumbnails: [],
    aThumbnails3: [],
    aSwatches: [],
    aSizeCharts: [],
    nQty: "1",
    noDropdowns: 0,
    aPicker1: [],
    aPicker2: [],
    selectedPickr1SKU: {},
    selectedPickr2SKU: {},
    sProdId: "",
    sBookId: "",
    sFinalURL: "",
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
    fontZoom: 2,
    isWaiting: false,
    isCartMsg: false,
    isCartMsgErr: false,
    aCartMsg: [],
    isGiftMsg: false,
    isGiftMsgErr: false,
    aGiftMsg: [],
    isPersCollapsed: false,
    isPersChecked: false
  },
  computed: {
    isPers: function(){
      return ( this.jResponse.childSkus[0].value.isPersonalized );
    }
  },
  watch: {
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
        if( this.isGiftMsgErr ){
          var _self = this;
          setTimeout(function(){ _self.isGiftMsgErr = false; }, 6400);
        }
      },
    jResponse : function(){
      var _v = this;
      var _aThumbnails = this.aThumbnails;
      var _aSwatches = this.aSwatches;
      var _aSizeCharts = this.aSizeCharts;
      var _nCnt = 0, _sSizeChart = "";
      this.selectedSKU = this.jResponse.childSkus[0];
      if( this.jResponse.childSkus.length >= 2 ){
        this.noDropdowns = 1; // No of Dropdowns | 0,1 or 2
        if( this.jResponse.childSkus[0].value.picker2Title !== "" ) this.noDropdowns++;
      }
      if( this.jResponse.largeImageUrl ){
		    _aThumbnails.push( { "level" : "10", "img": this.jResponse.largeImageUrl, "sku": "product", "pers": true, "hide":false, "alt": this.jResponse.displayName } );
      }
      this.jResponse.childSkus = this.jResponse.childSkus.filter( function( _child ){  //  Remove Archived
          return !_child.value.isArchived;
      });

      if( this.jResponse.auxiliaryMedia && this.jResponse.auxiliaryMedia.length ){  //  Product zm1
        this.jResponse.auxiliaryMedia.filter( function( _oAux ){
          var sKey = Object.keys( _oAux )[0];
          if( sKey.indexOf("zm") != -1 ){
            if( _oAux[sKey].indexOf("_zm") != -1 ){  //  Exclude *_qmn.jpg
              _aThumbnails.push( {  "level" : "11", "img": _oAux[sKey], "sku": vltdc_quickerview.jResponse.repositoryId, "pers": true, "alt": vltdc_quickerview.jResponse.displayName } );
            }
          }
        } );
      }

      this.jResponse.childSkus.filter( function( _child, nSkuCnt  ){  //  Build Thumbnails
        if( _child.value.displayName ) _child.value.displayName = _child.value.displayName.replace("&amp;trade;", "&trade;");
        if( _child.value.largeImageUrl ) _aThumbnails.push( { "level" : nSkuCnt + 12, "img": _child.value.largeImageUrl, "sku": _child.key, "pers": false, "hide":false, "alt": _child.value.displayName } );
          if( _child.value.auxiliaryMedia ){
            _child.value.auxiliaryMedia.filter( function( _aux ){
              for( var k in _aux ){  //  Add tn from aux media if the key contains MN
                if(  k.indexOf("sw") != -1 ){
                  if( _v.noDropdowns === 1 ){
                    _aSwatches.push( {"p1v": _v.getSwatchName( nSkuCnt ), "img": _aux[ k ], "imgtn": _aux.largeImageUrl, "avail": _child.value.availabilityId, "availPost": _child.value.availabilityId, "sku": _child.key, "pers": false, "alt": _v.getSwatchName( nSkuCnt ) } );
                  }else{
                    _aSwatches.push( {"p1v": _v.getSwatchName( nSkuCnt ), "img": _aux[ k ], "imgtn": _aux.largeImageUrl, "avail": 1, "availPost": _child.value.availabilityId, "sku": _child.key, "pers": false, "alt": _v.getSwatchName( nSkuCnt ) } );
                  }
                }
                if( k.indexOf("zm") != -1 ){
                  if( _aux[ k ].indexOf("_zm") != -1 ){  //  Exclude *_qmn.jpg
                    _aThumbnails.push( { "level" : nSkuCnt + 12, "img": _aux[ k ], "sku": _child.key, "pers": false, "hide":false, "alt": _child.value.displayName  } );
                  }
                }
              }
            } );
          }
      } );

      this.sortTN( _aThumbnails );

      if( this.jResponse.auxiliaryMedia && this.jResponse.auxiliaryMedia.length ){  //  Personal Instructions
        this.jResponse.auxiliaryMedia.filter( function( _oAux ){
          if( _oAux.pm ){
            _aThumbnails.push( { "img": _oAux.pm , "sku": vltdc_quickerview.jResponse.repositoryId, "pers": true, "hide":false, "alt": "How to Personalize" } );
            vltdc_quickerview.persInstructSrc = _oAux.pm;
          }
          var sKey = Object.keys( _oAux )[0];
          if( sKey.indexOf("sc") != -1 ){
              if( _oAux[sKey].indexOf("_sc") != -1 ){  //  size chart only
                _aSizeCharts.push( { "img": _oAux[sKey], "sku": vltdc_quickerview.jResponse.repositoryId, "pers": true, "alt": "Size Chart" } );
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

      if( this.jResponse.productVideo ){  //  Video | second button and off state
        this.isPlayingVideo = false;
        _aThumbnails.splice(1, 0, { "img": "/media/global/images/icons/pdp-video-btn.jpg" , "sku": "video", "pers": true, "hide":false });
      }
      this.isLessThan4 = ( this.aThumbnails3.length <= 3 );  //  Hide Nav Arrows
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
      if( this.jResponse.selectedSku ){ // Be careful with the case of this var
        if( this.getChildIndex( this.jResponse.selectedSku ) && this.noDropdowns == 1){ // Return element index if exists in child SKUs
          this.selectSKU( this.jResponse.selectedSku, 0, false ); // This has to fire after the thumbs have been gen
        }
      }
      this.dedupeTN();
      if( this.aSwatches.length > 0 ) this.dedupeSW();  //  Hide duplication Swatches
      this.update3();
    },
    nQty : function(){
        this.nQty = String( this.nQty ).replace(/[^0-9]/g,"");  //  Filter out alphas
    }
  },
  methods: {
    doAction: function( sProd, sFinalURL, sBookId, bShowSoldOut, DefaultSKU ){
	  if((typeof ltdc_reveal != "undefined") && (ltdc_reveal.isOpen)){ ltdc_reveal.close();}    	
      this.toggleView( false );
      vltdc_quickerview = this;
      this.refresh();
      if( sProd ){
      sFinalURL= (sFinalURL.indexOf("?") > -1) ? sFinalURL +"&fm=qvdetails" : sFinalURL +"?fm=qvdetails";
      sFinalURL += "&navAction=jump&navCount=0";
        vltdc_quickerview.sProdId = sProd;
        vltdc_quickerview.sBookId = sBookId;
        vltdc_quickerview.sFinalURL = sFinalURL;
        vltdc_quickerview.bShowSoldOut = bShowSoldOut;
        axios.get( vltdc_quickerview.Opt.async_base + vltdc_quickerview.sProdId + "&bookId=" + vltdc_quickerview.sBookId ).then( function( response ){
          var jData = response.data[Object.keys(response.data)[0]];
          if( (typeof DefaultSKU != "undefined") && DefaultSKU ){  //  Modify the json object before the watch executes
            jData.selectedSku = DefaultSKU;
          }
          vltdc_quickerview.jResponse = jData; 
          var utag_data = "{"+response.data[ Object.keys(response.data)[0] ]["utag_data"]+"}";
          utag_data = JSON.parse(utag_data);
          if(sFinalURL.indexOf("rrec") > -1){
            utag_data.page_type="recs_quick-view";
          }
          fireTealiumPageView(utag_data);
        } ).catch( function( error ){
            if ( window.console ) {
              console.log( "async error: " + error );
            }
        } );
      }
    },
    refresh: function(){
      this.aThumbnails = [];
      this.aThumbnails3 = [];
      this.aSwatches = [];
      this.aSizeCharts = [];
      this.nQty = "1";
      this.noDropdowns = 0;
      this.aPicker1 = [];
      this.aPicker2 = [];
      this.selectedPickr1SKU = {};
      this.selectedPickr2SKU = {};
      this.sProdId = "";
      this.sFinalURL = "";
      this.C2AMicrocopy = "";
      this.bShowSoldOut = false;
      this.isLessThan4 = false;
      this.isPlayingVideo = false,
      this.calcPriceLine1 = "";
      this.calcPriceLine2 = "";
      this.calcPriceLine3 = "";
      this.calcPriceLine4 = "";
      this.tabmutex = [{"caption": "Overview", "selected": true}, {"caption": "Details", "selected": false}];
      this.tabmutex_selected( this.tabmutex[0] );
      this.selectedSKU = {"value" : {"listPrice" : 0} };
      this.selectedHero = "";
      this.persInstructSrc = "";
      this.dropd_surf_init_0 = false; this.dropd_cont_state_0 = false;
      this.dropd_surf_init_1 = false; this.dropd_cont_state_1 = false;
      this.dropd_surf_init_2 = false; this.dropd_cont_state_2 = false;
      this.fontZoom = 2;
      this.jResponse = {"childSkus": [{"value":{"largeImageUrl":""}}]};
      this.isWaiting = false;
      this.isCartMsg = false; this.isCartMsgErr = false;
      this.aCartMsg = [];
      this.isGiftMsg = false; this.isGiftMsgErr = false;
      this.aGiftMsg = [];
      this.isPersCollapsed = false;
      this.isPersChecked = false;
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
    selectSKU : function( _sSku, _sImg, _bPers ){  //  Create selected sku data model
      var _ChildSku = this.getChildIndex( _sSku );

      var _aTn = this.aThumbnails.filter( function( _oTn ){
        if( _oTn.sku === _sSku ){
          return true;
        }
      } );
      this.selectedHero = ( _sImg ) ? _sImg : _aTn[0].img;
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
        while( true ){ // loop until first visible
          oTn = this.aThumbnails.pop();
          this.aThumbnails.unshift( oTn );
          if( !oTn.hide ) break;
        }
      }else{
        while( true ){ // loop until first visible
          oTn = this.aThumbnails.shift();
          this.aThumbnails.push( oTn );
          if( !oTn.hide ) break;
        }
      }
      this.update3();
    },
    dropd_surf_toggle: function( _nDropd ){
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
          //this.aCartMsg[0] = this.nQty;
          //this.aCartMsg[1] = this.jResponse.displayName + " " + this.selectedSKU.value.displayName;
          //this.aGiftMsg[2] = this.nQty;
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
      submitGiftError: function( sError ){
          var _sError = ( sError ) ? sError : "An unexpected error has occurred.";
          this.isWaiting = false;
          this.isGiftMsgErr = true;
          this.aGiftMsg[3] = _sError;
      },
    submitCart: function( _callBack ){
      var _nQty = this.nQty;
      if( this.isC2AValid() ){
        _callBack();
        this.isWaiting = true;
        this.aCartMsg[0] = this.nQty;
        this.aCartMsg[1] = this.jResponse.displayName + " " + this.selectedSKU.value.displayName;
      }else{
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
    submitCartError: function( sError ){
        var _sError = ( sError ) ? sError : "An unexpected error has occurred.";
        this.isWaiting = false;
        this.isCartMsgErr = true;
        this.aCartMsg[3] = _sError;
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
        vltdc_quickerview.$forceUpdate();
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
          vltdc_quickerview.selectedPickr2SKU = this.aPicker2[0];  //  This may need to be first context=true
        }
      }
      if( _nDropd == 2 ){
        if( !this.selectedPickr2SKU.context ){  //  Deselect if not context
          this.deselectPicker( 1 );
          vltdc_quickerview.selectedPickr1SKU = this.aPicker1[0];  //  This may need to be first context=true
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
      vltdc_quickerview.$forceUpdate()
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
  },
  toggleView: function( _bView ){
    if( _bView ){
      document.getElementById( "js-quickerview__cont--id" ).classList.remove("hidden");
      document.getElementById( "js-quickerview__spin--id" ).classList.add("hidden");
    }else{
      document.getElementById( "js-quickerview__cont--id" ).classList.add("hidden");
      document.getElementById( "js-quickerview__spin--id" ).classList.remove("hidden");
    }
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
  update3: function(){  //  Sync the proxy / presentation array
    this.aThumbnails3 = this.aThumbnails.filter( function( _tn ){
      return !_tn.hide;
    });
    this.isLessThan4 = ( this.aThumbnails3.length <= 3 );  //  Hide Nav Arrows
  },
  open1st: function(){  //  Open first drop-down - should be closed
    this.dropd_surf_toggle( String( this.noDropdowns - 1 ) );
  }
  },
  created: function( e ){
    document.body.addEventListener("click", function( e ){  //  Outside Click close
      var cQv = vltdc_quickerview, eTarget = e.target, bInside = false;
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
  updated: function( e ){
      this.nUpdates++;
      if( this.nUpdates == 3 ){
        this.nUpdates = 0;
        this.toggleView( true );
        if( fSecCards_QV && !fSecCards_QV.isInit() ){ fSecCards_QV.bind( "ltdc-quickerview .seccard__surface", false ); }
      }
  }
} );

var fSecCards_QV = (function(){  //  function for Section Card bound events
  var _eCards, _bInit = false;
  return {
      isInit: function(){ return _bInit; },
      bind: function( sQuery, bMobile ){  //  Wire DOM events
        _bInit = true;
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

function letterCounter (x) {
  return x.replace(/[^a-zA-Z]/g, '').length;
}
function numberCounter (x) {
  return x.replace(/[^0-9]/g, '').length;
}
