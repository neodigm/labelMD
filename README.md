A [declarative](https://thescottkrause.com/emerging_tech/neodigm55_ux_library/) and reactive Label Material Design | Placeholder > label [polyfill](https://www.thescottkrause.com/tags/javascript/) for existing legacy INPUT HTML elements.

```javascript
// Scott C. Krause | neodigm 55 | TheScottKrause.com
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
```

---
#
[Portfolio Blog](https://www.theScottKrause.com) |
[🌶️ Résumé](https://thescottkrause.com/Arcanus_Scott_C_Krause_2023.pdf) |
[UX micro-library](https://thescottkrause.com/emerging_tech/neodigm55_ux_library/) |
[PWA WASM](https://www.thescottkrause.com/emerging_tech/curated-pwa-links/) |
[Web Tool Toys](https://www.webtooltoys.com/) |
[Neodigm UX Wiki](https://github.com/arcanus55/neodigm55/wiki/Cheat-Sheet) | 
[NPM](https://www.npmjs.com/~neodigm) |
[Github](https://github.com/neodigm) |
[LinkedIn](https://www.linkedin.com/in/neodigm555/) |
[Gists](https://gist.github.com/neodigm?direction=asc&sort=created) |
[Salesforce](https://trailblazer.me/id/skrause) |
[Code Pen](https://codepen.io/neodigm24) |
[Machvive](https://www.machfivemarketing.com/accelerators/google_analytics_ga4_migration/) |
[Arcanus 55](https://www.arcanus55.com/?trusted55=A55PV2) |
[Medium](https://medium.com/@neo5ive/accessibility-%EF%B8%8F-ecommerce-552d4d35cd66) |
[W3C](https://www.w3.org/users/123844) |
[InfoSec](https://arcanus55.medium.com/offline-vs-cloud-password-managers-51b1fbebe301)
#
<p align="center">
	  <a target="_blank" href="https://www.thescottkrause.com/emerging_tech/cytoscape_dataviz_skills/">
	  	<img src="https://neodigm.github.io/brand_logo_graphic_design/fantastic/discerning/22.webp" alt="TypeScript UX 🪐 Interactive Infographic ⚡ WASM ✨ PWA 🍭 Svelte">
	  </a>
</p>

