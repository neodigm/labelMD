//console.clear();
var labelMD_default = {  //  Detault configuration
    mode: "default",
    aExcludeID: ["js-inp-search--id","js-toplogo-slide__input--id","js-inp-topsearch--id","quickSearch-query-for-small","emailSubscribeAddressModal","emailAddressFieldId","quickSearch-query"],
    aExcludeCL: ["js-eml__input--field", "js-sms__input"]
};

//var labelMD_custom = { mode: "custom" }  //  Custom configuration

var labelMD = ( function( _d, _g ){  //  Dynamic Material Design INPUT Labels
    var aInp = [], aLab = [], oCnf = {}, sBrand;
    var oCSS = [
[".h-vs__hidden", ["visibility", "hidden"]],
["input.label-md__inp", [
    ["background-color", "#fff"],
    ["border-radius", "4px"],
    ["box-shadow", "none"],
    ["color", "#343a40"],
    ["display", "block"],
    ["font-size", "16px"],
    ["height", "48px"],
    ["padding", "14px"],
    ["z-index", "1"]
]],
["label.label-md__lab", [
    ["cursor", "text"],
    ["background-color", "#fff"],
    ["position", "relative"],
    ["left", "4px"],
    ["top", "10px"],
    ["margin", "0 0 0 10px"],
    ["padding", "0 10px"],
    ["font-size", "14px"],
    ["display", "inline"],
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
    oCnf = ( typeof _g.labelMD_custom === "undefined" ) ? _g.labelMD_default : _g.labelMD_custom; // over-ride
    function onInpFoc( _el ){
        if( typeof _el.dataset.labelMd !== "undefined" ){
            var sPH = _el.getAttribute("placeholder");
            if( sPH ){
                _el.dataset.labelMdPh = sPH;
                _el.placeholder = "";
                aLab[ _el.dataset.labelMd ].classList.remove( "h-vs__hidden" );                
            }
        }
    }
    function onInpBlur( _el ){
        if( typeof _el.dataset.labelMd !== "undefined" ){
            if( typeof _el.dataset.labelMdPh !== "undefined" ){
                _el.placeholder = _el.dataset.labelMdPh;
                aLab[ _el.dataset.labelMd ].classList.add( "h-vs__hidden" );
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
        bind: function( _sBrand = "LTD" ){
            addStylesheetRules( oCSS );
            sBrand = _sBrand.toLowerCase();
            aInp = [].slice.call( _d.querySelectorAll("INPUT") ).filter(function( _inp ){
                var bRet = true;  //  Exclusion logic  //  TODO exclude if no placeholder or len LT 4, or no id
                if( "checkbox hidden image submit".indexOf( _inp.type ) !== -1 ) return false;
                oCnf.aExcludeCL.map( function( _cl ){  //  Exclude by Class
                    if( _inp.classList.toString().indexOf( _cl ) !== -1 ) bRet = false;
                } );
                return ( bRet && (oCnf.aExcludeID.indexOf( _inp.id ) === -1) );
            });
            aInp.map( function( _inp, _idx ){
                let eLab = _d.createElement("LABEL");
                eLab.textContent = parsePH( _inp.placeholder );
                eLab.setAttribute("for", _inp.id);
                eLab.classList.add("label-md__lab", "h-vs__hidden");
                aLab.push( eLab );
                _inp.before( eLab );  //  TODO test in MS IE & Edge
                _inp.dataset.labelMd = _idx;
                _inp.className = "label-md__inp";
                _inp.dataset.labelMdCl = _inp.className;
                _inp.className = "label-md__inp";  
                _inp.addEventListener("focus", function( _ev ){ onInpFoc(_ev.currentTarget); });
                _inp.addEventListener("blur", function( _ev ){ onInpBlur(_ev.currentTarget); });
            } );
        },
        unbind: function( sQuery ){
            //  remove data attr but leave in data model
        }
    };
} )( document, window );

labelMD.bind( document.body.dataset.brand );