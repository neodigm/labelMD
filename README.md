[![License: BSD](https://badgen.net/badge/license/BSD/orange)](https://opensource.org/licenses/BSD-3-Clause)
---

Label Material Design | A placeholder > label polyfill for existing legacy INPUT elements.

```javascript
// Scott C. Krause | neodigm
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

#
---
[Portfolio Blog](https://www.theScottKrause.com) |
[🚀 Résumé](https://thescottkrause.com/Arcanus_Scott_C_Krause_2020.pdf) |
[NPM](https://www.npmjs.com/~neodigm) |
[Github](https://github.com/neodigm) |
[LinkedIn](https://www.linkedin.com/in/neodigm24/) |
[Gists](https://gist.github.com/neodigm?direction=asc&sort=created) |
[Salesforce](https://trailblazer.me/id/skrause) |
[Code Pen](https://codepen.io/neodigm24) |
[Machvive](https://machvive.com/) |
[Arcanus 55](https://www.arcanus55.com/) |
[Repl](https://repl.it/@neodigm) |
[Twitter](https://twitter.com/neodigm24) |
[Keybase](https://keybase.io/neodigm) |
[Docker](https://hub.docker.com/u/neodigm) |
[W3C](https://www.w3.org/users/123844)
#

<p align="center">
  <a target="_blank" href="https://thescottkrause.com/d3_datavis_skills.html">
  <img src="https://repository-images.githubusercontent.com/178555357/2b6ad880-7aa0-11ea-8dde-63e70187e3e9" title="D3js Skills with Audio">
  </a>
</p>
