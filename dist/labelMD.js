console.clear();
var labelMD_default = {  //  Detault configuration
    mode: "default",
    aExcludeID: ["js-inp-search--id","js-toplogo-slide__input--id","js-inp-topsearch--id","quickSearch-query-for-small","emailSubscribeAddressModal","emailAddressFieldId","quickSearch-query"],
    aExcludeCL: ["js-eml__input--field", "js-sms__input"]
};

//var labelMD_custom = { mode: "custom" }  //  Custom configuration

var labelMD = ( function( _d, _g ){  //  Dynamic Material Design INPUT Labels
    var aInp = [], oCnf = {}, sBrand;
    oCnf = ( typeof _g.labelMD_custom === "undefined") ? _g.labelMD_default : _g.labelMD_custom;
    function onInpFoc( _el ){
        console.log("yikes f| " + _el.placeholder );
        _el.dataset.labelMdCl = _el.className;
        _el.className = "";
    }
    function onInpBlur( _el ){
        console.log("yikes b| " + _el.placeholder );
        _el.className = _el.dataset.labelMdCl;
    }
    return {
        bind: function( _sBrand = "LTD" ){
            sBrand = _sBrand;
            aInp = [].slice.call( _d.querySelectorAll("INPUT") ).filter(function( _inp ){
                var bRet = true;  //  Exclusion logic
                if( "checkbox hidden image submit".indexOf( _inp.type ) !== -1 ) return false;
                oCnf.aExcludeCL.map( function( _cl ){
                    if( _inp.classList.toString().indexOf( _cl ) !== -1 ) bRet = false;
                } );
                return ( bRet && (oCnf.aExcludeID.indexOf( _inp.id ) === -1) );
            });
            aInp.map( function( _inp, _idx ){
                _inp.dataset.labelMd = _idx;
                _inp.addEventListener("focus", function( _ev ){ onInpFoc(_ev.currentTarget); });
                _inp.addEventListener("blur", function( _ev ){ onInpBlur(_ev.currentTarget); });
            } );
        }
    };
} )( document, window );

labelMD.bind( "LTD" );