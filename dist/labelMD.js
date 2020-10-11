
var oMDPage = ( function( _d, _aQuery ){  //  Material Design INPUT Labels.
    var aInp = [], aLab = [], sBrand="", bBound = false, nCnt = -1;
    function onInpFoc( _el ){  //  focus
        if( typeof _el.dataset.mdLabel !== "undefined" ){
            var sPH = _el.getAttribute("placeholder");
            if( sPH ){
                _el.dataset.mdLabelPh = sPH;
                _el.placeholder = "";
                aLab[ _el.dataset.mdLabel ].textContent = sPH;
                aLab[ _el.dataset.mdLabel ].classList.remove( "h-vs__hidden" );                
            }
        }
    }
    function onInpBlur( _el ){  //  blur
        if( typeof _el.dataset.mdLabel !== "undefined" ){
            if( typeof _el.dataset.mdLabelPh !== "undefined" ){
            	if( !_el.value ){
	                _el.placeholder = _el.dataset.mdLabelPh;
	                aLab[ _el.dataset.mdLabel ].classList.add( "h-vs__hidden" );
            	}
            }
        }
    }
    function parsePH( sPH ){
        return sPH.replace("* ", "");
    }
    return {
        bind: function( _sBrand ){  //  Wire Events
            sBrand = _sBrand.toLowerCase();
            aInp = [].slice.call( _d.querySelectorAll( _aQuery[0] ) ).filter(function( el ){
                return ( !el.dataset.mdLabel );  //  Exclude Existing
            });
            aInp.map( function( _inp ){
                var eLab = _d.createElement("LABEL");
                nCnt++;
                eLab.textContent = parsePH( _inp.placeholder );
                eLab.setAttribute("for", _inp.id);
                eLab.classList.add("label-md__lab");
                eLab.classList.add("h-vs__hidden");
                aLab.push( eLab ); 
                _inp.parentNode.insertBefore(eLab, _inp);
                _inp.dataset.mdLabel = nCnt;
                _inp.dataset.mdLabelCl = _inp.className;
                _inp.classList.add( "label-md__inp" );  
                _inp.addEventListener("focus", function( _ev ){ onInpFoc(_ev.currentTarget); });
                _inp.addEventListener("blur", function( _ev ){ onInpBlur(_ev.currentTarget); });
				if (_inp.value) {
					if (typeof _inp.dataset.mdLabel !== "undefined") {
						var sPH = _inp.getAttribute("placeholder");
						if (sPH) {
							_inp.dataset.mdLabelPh = sPH;
							_inp.placeholder = "";
							aLab[_inp.dataset.mdLabel].classList
									.remove("h-vs__hidden");
						}
					}
                }
                
            } );
            bBound = true;
        },
        rebind: function( _sBrand ){ // Vue interface
            aInp = [].slice.call( _d.querySelectorAll( _aQuery[1] ) )
                .map(function( el ){
                    el.dataset.mdPage = "true";
            });
            this.bind( _sBrand );
        }
    };
} )( document, ["[data-md-page]", "[data-md-vue]", ".sku-panel__inner [type='TEXT']"] );

oMDPage.bind( document.body.dataset.brand );
