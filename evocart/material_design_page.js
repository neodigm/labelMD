var oMDPage = ( function( _d ){  //  Material Design INPUT Labels
    var aInp = [], aLab = [], sBrand="", bBound = false, nCnt = -1;
    var oCSS = [
[".h-vs__hidden", ["visibility", "hidden"]],
["input.label-md__inp", [
    ["background-color", "#fff"],
    ["border-radius", "4px"],
    ["box-shadow", "none"],
    ["color", "#343a40"],
    ["display", "inline"],
    ["font-size", "16px"],
    ["height", "40px"],
    ["padding", "6px"],
    ["z-index", "1"]
]],
["label.label-md__lab", [
    ["background-color", "#fff"],
    ["cursor", "text"],
    ["display", "inline"],
    ["font-family", "sans-serif"],
    ["font-size", "14px"],
    ["left", "6px"],
    ["margin", "0 0 0 8px"],
    ["padding", "0 6px"],
    ["position", "relative"],
    ["top", "10px"],
]],
["body[data-brand=LS]  input.label-md__inp", [
    ["border", "1px solid #a1b5c2"]
]],
["body[data-brand=LTD] input.label-md__inp", [
    ["border", "1px solid #30619a"]
]],
["body[data-brand=LS]  input:focus.label-md__inp", [
    ["border", "1px solid #343a40"]
]],
["body[data-brand=LTD] input:focus.label-md__inp", [
    ["border", "1px solid #4a90e2"]
]],
["body[data-brand=LS]  label.label-md__lab", [
    ["color", "#343a40"]
]],
["body[data-brand=LTD] label.label-md__lab", [
    ["color", "#4a90e2"]
]],
];
    function onInpFoc( _el ){  //  focus
        if( typeof _el.dataset.mdLabel !== "undefined" ){
            var sPH = _el.getAttribute("placeholder");
            if( sPH ){
                _el.dataset.mdLabelPh = sPH;
                _el.placeholder = "";
                aLab[ _el.dataset.mdLabel ].classList.remove( "h-vs__hidden" );                
            }
        }
    }
    function onInpBlur( _el ){  //  blur
        if( typeof _el.dataset.mdLabel !== "undefined" ){
            if( typeof _el.dataset.mdLabelPh !== "undefined" ){
                _el.placeholder = _el.dataset.mdLabelPh;
                aLab[ _el.dataset.mdLabel ].classList.add( "h-vs__hidden" );
            }
        }
    }
    function parsePH( sPH ){
        return sPH.replace("* ", "");
    }
    function addStylesheetRules(rules) {
        var styleEl = document.createElement("style");
        document.head.appendChild(styleEl);
        var styleSheet = styleEl.sheet;
        for (var i = 0; i < rules.length; i++) {
            var j = 1, 
            rule = rules[i], 
            selector = rule[0], 
            propStr = "";
            if (Array.isArray(rule[1][0])) {
                rule = rule[1];
                j = 0;
            }
            for (var pl = rule.length; j < pl; j++) {
                var prop = rule[j];
                propStr += prop[0] + ": " + prop[1] + " !important;\n";
            }
            styleSheet.insertRule(selector + "{" + propStr + "}", styleSheet.cssRules.length);
        }
    }
    return {
        bind: function( _sBrand = "LTD" ){  //  Wire Events
            if( !bBound ) addStylesheetRules( oCSS );
            sBrand = _sBrand.toLowerCase();
            aInp = [].slice.call( _d.querySelectorAll( "[data-md-page]") ).filter(function( el ){
                return ( !el.dataset.mdLabel );  //  Exclude Existing
            });
            aInp.map( function( _inp ){
                var eLab = _d.createElement("LABEL");
                nCnt++;
                eLab.textContent = parsePH( _inp.placeholder );
                eLab.setAttribute("for", _inp.id);
                eLab.classList.add("label-md__lab", "h-vs__hidden");
                aLab.push( eLab );
                _inp.before( eLab );
                _inp.dataset.mdLabel = nCnt;
                _inp.dataset.mdLabelCl = _inp.className;
                _inp.classList.add( "label-md__inp" );  
                _inp.addEventListener("focus", function( _ev ){ onInpFoc(_ev.currentTarget); });
                _inp.addEventListener("blur", function( _ev ){ onInpBlur(_ev.currentTarget); });
            } );
            bBound = true;
        }
    };
} )( document );

oMDPage.bind( document.body.dataset.brand );