$(function(){$("body").delegate("#formSubmitButton","click",function(c){c.preventDefault();var b=$("#shippingInfoForm"),a={beforeSerialize:function(e,d){$("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.moveToBilling",value:"Submit",type:"hidden"}).add($("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.moveToBilling.x",value:"1",type:"hidden"})).add($("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.moveToBilling.y",value:"1",type:"hidden"})).appendTo(e)},url:CONTEXT_ROOT+"checkout/checkout_container_acap.jsp",success:function(f){var d=f.split(",");if(typeof d!=="undefined"&&d.length==2&&d[0]=="session_expired"){var e=d[1];window.location=e}else{$("div.resp_col_pad_l").html(f);updateOrderSummaryContainer();scrollToDefinedPostion("#stp_bnr_2")}},beforeSend:displayWaitImage,complete:function(){$.unblockUI();if(!tealformHasErrors){$.ajax({url:CONTEXT_ROOT+"tagging/tealium_ajax.jsp?pagename=payment&pagetype=checkout-payment",success:function(d){fireTealiumPageView(d)}})}tealformHasErrors=false;addAndroidMaxLength()}};if(b.length>0){b.ajaxSubmit(a)}});$("body").delegate("input.useGivenAddress","click",function(c){c.preventDefault();var b=$("#shippingInfoForm"),a={beforeSerialize:function(e,d){$("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.useGivenAddress",value:"Submit",type:"hidden"}).add($("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.useGivenAddress.x",value:"1",type:"hidden"})).add($("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.useGivenAddress.y",value:"1",type:"hidden"})).appendTo(e)},url:CONTEXT_ROOT+"checkout/checkout_container_acap.jsp",success:function(f){var d=f.split(",");if(typeof d!=="undefined"&&d.length==2&&d[0]=="session_expired"){var e=d[1];window.location=e}else{$("div.resp_col_pad_l").html(f);updateOrderSummaryContainer();scrollToDefinedPostion("#stp_bnr_2")}},beforeSend:displayWaitImage,complete:function(){$.unblockUI();if(!tealformHasErrors){$.ajax({url:CONTEXT_ROOT+"tagging/tealium_ajax.jsp?pagename=payment&pagetype=checkout-payment",success:function(d){fireTealiumPageView(d)}})}tealformHasErrors=false;addAndroidMaxLength()}};if(b.length>0){b.ajaxSubmit(a)}});$("div.resp_col_pad_l").delegate("input.useCorrectedAddress","click",function(c){c.preventDefault();var b=$("#shippingInfoForm"),a={beforeSerialize:function(e,d){$("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.useCorrectedAddress",value:"Submit",type:"hidden"}).add($("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.useCorrectedAddress.x",value:"1",type:"hidden"})).add($("<input />",{name:"/ltd/commerce/order/purchase/LTDShippingFormHandler.useCorrectedAddress.y",value:"1",type:"hidden"})).appendTo(e)},url:CONTEXT_ROOT+"checkout/checkout_container_acap.jsp",success:function(f){var d=f.split(",");if(typeof d!=="undefined"&&d.length==2&&d[0]=="session_expired"){var e=d[1];window.location=e}else{$("div.resp_col_pad_l").html(f);updateOrderSummaryContainer();scrollToDefinedPostion("#stp_bnr_2")}},beforeSend:displayWaitImage,complete:function(){$.unblockUI();if(!tealformHasErrors){$.ajax({url:CONTEXT_ROOT+"tagging/tealium_ajax.jsp?pagename=payment&pagetype=checkout-payment",success:function(d){fireTealiumPageView(d)}})}tealformHasErrors=false;addAndroidMaxLength()}};if(b.length>0){b.ajaxSubmit(a)}});$("body").delegate("#billingFormSubmitButton","click",function(b){b.preventDefault();if($("#install_toggle").length>0){$("#payInstallments").val(($("#install_toggle").is(":checked")))}var c=$("#selectPaymentForm"),a={beforeSerialize:function(e,d){$("<input />",{name:"/ltd/commerce/order/purchase/LTDBillingFormHandler.moveToConfirm",value:"Submit",type:"hidden"}).add($("<input />",{name:"/ltd/commerce/order/purchase/LTDBillingFormHandler.moveToConfirm.x",value:"1",type:"hidden"})).add($("<input />",{name:"/ltd/commerce/order/purchase/LTDBillingFormHandler.moveToConfirm.y",value:"1",type:"hidden"})).appendTo(e)},url:CONTEXT_ROOT+"checkout/checkout_container_acap.jsp",success:function(f){var d=f.split(",");if(typeof d!=="undefined"&&d.length==2&&d[0]=="session_expired"){var e=d[1];window.location=e}else{$("div.resp_col_pad_l").html(f);updateOrderSummaryContainer();scrollToDefinedPostion("#stp_bnr_3")}},beforeSend:displayWaitImage,complete:function(){$(document).ajaxStop($.unblockUI);if(!tealformHasErrors){$.ajax({url:CONTEXT_ROOT+"tagging/tealium_ajax.jsp?pagetype=checkout-switch",success:function(d){fireTealiumPageView(d)}})}tealformHasErrors=false;addAndroidMaxLength()}};if(c.length>0){c.ajaxSubmit(a)}});$("body").delegate("input.placeOrderBtn","click",function(c){c.preventDefault();var b=$("#selectPaymentForm"),a={beforeSerialize:function(e,d){$("<input />",{name:"/atg/commerce/order/purchase/CommitOrderFormHandler.commitOrder",value:"Submit",type:"hidden"}).add($("<input />",{name:"/atg/commerce/order/purchase/CommitOrderFormHandler.commitOrder.x",value:"1",type:"hidden"})).add($("<input />",{name:"/atg/commerce/order/purchase/CommitOrderFormHandler.commitOrder.y",value:"1",type:"hidden"})).appendTo(e)},url:CONTEXT_ROOT+"checkout/checkout_container_acap.jsp",success:function(g){var e=g.split(",");if(typeof e!=="undefined"&&e.length==2&&e[0]=="session_expired"){var f=e[1];window.location=f}var d=$(g).filter("span#ProcessingResult").html();d=$.trim(d);if(d=="success"){window.location=CONTEXT_ROOT+"checkout/order_commit.jsp"}else{$("div.resp_col_pad_l").html(g);updateOrderSummaryContainer()}},beforeSend:displayWaitImage,complete:function(){$(document).ajaxStop($.unblockUI);addAndroidMaxLength()}};if(b.length>0){b.ajaxSubmit(a)}})});function updateOrderSummary(){$("#resp_orderSummary").load(CONTEXT_ROOT+"checkout/order_summary_acap.jsp?ts="+(new Date()).getTime(),function(){})}function updateInstallments(){if($("#installmentEligible").length>0){var a=($("#installAgreement").length>0)||($("#installmentNotQualified").length>0)||($("#installmentBelowUpsell").length>0);if(a){$("#installmentContentMessage").load(CONTEXT_ROOT+"checkout/includes/inc_installment_display_info.jsp?ts="+(new Date()).getTime(),"showNonQualified=true",function(){})}else{$("#installmentContentMessage").load(CONTEXT_ROOT+"checkout/includes/inc_installment_display_info.jsp?ts="+(new Date()).getTime(),"showNonQualified=false",function(){})}}if($(".installmentReview").length>0){if($(".installmentReview").html().trim().length>0){$(".installmentReview").load(CONTEXT_ROOT+"checkout/includes/inc_installment_review_info.jsp?ts="+(new Date()).getTime(),"showNonQualified=true",function(){})}else{$(".installmentReview").load(CONTEXT_ROOT+"checkout/includes/inc_installment_review_info.jsp?ts="+(new Date()).getTime(),"showNonQualified=false",function(){})}}}function updateShippingMethodSelections(){if($(".shipOptionsForm").length>0){$(".shipOptionsForm").load(CONTEXT_ROOT+"checkout/includes/inc_shipping_options_form.jsp?ts="+(new Date()).getTime(),function(){})}}function updateOrderSummaryContainer(){$("#orderSummaryContainerId").load(CONTEXT_ROOT+"checkout/order_summary_container_acap.jsp?ts="+(new Date()).getTime(),function(){})}function scrollToDefinedPostion(a){if(IsSmall()){if($(a).length>0){if($(":input:not(:hidden).error:first").length>0||$("#paraRecom").length>0||$("#poCorrectedAddress").length>0){}else{$("html, body").animate({scrollTop:$(a).offset().top-64},400)}}}}function displayWaitImage(){var a=CONTEXT_ROOT+"media/ltd/images/popups/spinner1-black.gif";$.blockUI({message:'<img src="'+a+'" />',css:{top:($(window).height()-100)/2+"px",left:($(window).width()-100)/2+"px",width:"100px",border:"none"}})}
/*!
 * jQuery blockUI plugin
 * Version 2.59.0-2013.04.05
 * @requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
(function(){function a(j){j.fn._fadeIn=j.fn.fadeIn;var d=j.noop||function(){};var n=/MSIE/.test(navigator.userAgent);var f=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent);var k=document.documentMode||0;var g=j.isFunction(document.createElement("div").style.setExpression);j.blockUI=function(r){e(window,r)};j.unblockUI=function(r){i(window,r)};j.growlUI=function(v,t,u,r){var s=j('<div class="growlUI"></div>');if(v){s.append("<h1>"+v+"</h1>")}if(t){s.append("<h2>"+t+"</h2>")}if(u===undefined){u=3000}j.blockUI({message:s,fadeIn:700,fadeOut:1000,centerY:false,timeout:u,showOverlay:false,onUnblock:r,css:j.blockUI.defaults.growlCSS})};j.fn.block=function(s){if(this[0]===window){j.blockUI(s);return this}var r=j.extend({},j.blockUI.defaults,s||{});this.each(function(){var t=j(this);if(r.ignoreIfBlocked&&t.data("blockUI.isBlocked")){return}t.unblock({fadeOut:0})});return this.each(function(){if(j.css(this,"position")=="static"){this.style.position="relative";j(this).data("blockUI.static",true)}this.style.zoom=1;e(this,s)})};j.fn.unblock=function(r){if(this[0]===window){j.unblockUI(r);return this}return this.each(function(){i(this,r)})};j.blockUI.version=2.59;j.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:0.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:false};var c=null;var h=[];function e(v,H){var E,P;var C=(v==window);var y=(H&&H.message!==undefined?H.message:undefined);H=j.extend({},j.blockUI.defaults,H||{});if(H.ignoreIfBlocked&&j(v).data("blockUI.isBlocked")){return}H.overlayCSS=j.extend({},j.blockUI.defaults.overlayCSS,H.overlayCSS||{});E=j.extend({},j.blockUI.defaults.css,H.css||{});if(H.onOverlayClick){H.overlayCSS.cursor="pointer"}P=j.extend({},j.blockUI.defaults.themedCSS,H.themedCSS||{});y=y===undefined?H.message:y;if(C&&c){i(window,{fadeOut:0})}if(y&&typeof y!="string"&&(y.parentNode||y.jquery)){var K=y.jquery?y[0]:y;var R={};j(v).data("blockUI.history",R);R.el=K;R.parent=K.parentNode;R.display=K.style.display;R.position=K.style.position;if(R.parent){R.parent.removeChild(K)}}j(v).data("blockUI.onUnblock",H.onUnblock);var D=H.baseZ;var O,N,M,I;if(n||H.forceIframe){O=j('<iframe class="blockUI" style="z-index:'+(D++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+H.iframeSrc+'"></iframe>')}else{O=j('<div class="blockUI" style="display:none"></div>')}if(H.theme){N=j('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+(D++)+';display:none"></div>')}else{N=j('<div class="blockUI blockOverlay" style="z-index:'+(D++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>')}if(H.theme&&C){I='<div class="blockUI '+H.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(D+10)+';display:none;position:fixed">';if(H.title){I+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(H.title||"&nbsp;")+"</div>"}I+='<div class="ui-widget-content ui-dialog-content"></div>';I+="</div>"}else{if(H.theme){I='<div class="blockUI '+H.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(D+10)+';display:none;position:absolute">';if(H.title){I+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(H.title||"&nbsp;")+"</div>"}I+='<div class="ui-widget-content ui-dialog-content"></div>';I+="</div>"}else{if(C){I='<div class="blockUI '+H.blockMsgClass+' blockPage" style="z-index:'+(D+10)+';display:none;position:fixed"></div>'}else{I='<div class="blockUI '+H.blockMsgClass+' blockElement" style="z-index:'+(D+10)+';display:none;position:absolute"></div>'}}}M=j(I);if(y){if(H.theme){M.css(P);M.addClass("ui-widget-content")}else{M.css(E)}}if(!H.theme){N.css(H.overlayCSS)}N.css("position",C?"fixed":"absolute");if(n||H.forceIframe){O.css("opacity",0)}var B=[O,N,M],Q=C?j("body"):j(v);j.each(B,function(){this.appendTo(Q)});if(H.theme&&H.draggable&&j.fn.draggable){M.draggable({handle:".ui-dialog-titlebar",cancel:"li"})}var x=g&&(!j.support.boxModel||j("object,embed",C?null:v).length>0);if(f||x){if(C&&H.allowBodyStretch&&j.support.boxModel){j("html,body").css("height","100%")}if((f||!j.support.boxModel)&&!C){var G=o(v,"borderTopWidth"),L=o(v,"borderLeftWidth");var A=G?"(0 - "+G+")":0;var F=L?"(0 - "+L+")":0}j.each(B,function(t,U){var z=U[0].style;z.position="absolute";if(t<2){if(C){z.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+H.quirksmodeOffsetHack+') + "px"')}else{z.setExpression("height",'this.parentNode.offsetHeight + "px"')}if(C){z.setExpression("width",'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')}else{z.setExpression("width",'this.parentNode.offsetWidth + "px"')}if(F){z.setExpression("left",F)}if(A){z.setExpression("top",A)}}else{if(H.centerY){if(C){z.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')}z.marginTop=0}else{if(!H.centerY&&C){var S=(H.css&&H.css.top)?parseInt(H.css.top,10):0;var T="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+S+') + "px"';z.setExpression("top",T)}}}})}if(y){if(H.theme){M.find(".ui-widget-content").append(y)}else{M.append(y)}if(y.jquery||y.nodeType){j(y).show()}}if((n||H.forceIframe)&&H.showOverlay){O.show()}if(H.fadeIn){var J=H.onBlock?H.onBlock:d;var u=(H.showOverlay&&!y)?J:d;var r=y?J:d;if(H.showOverlay){N._fadeIn(H.fadeIn,u)}if(y){M._fadeIn(H.fadeIn,r)}}else{if(H.showOverlay){N.show()}if(y){M.show()}if(H.onBlock){H.onBlock()}}m(1,v,H);if(C){c=M[0];h=j(":input:enabled:visible",c);if(H.focusInput){setTimeout(q,20)}}else{b(M[0],H.centerX,H.centerY)}if(H.timeout){var w=setTimeout(function(){if(C){j.unblockUI(H)}else{j(v).unblock(H)}},H.timeout);j(v).data("blockUI.timeout",w)}}function i(u,w){var v;var t=(u==window);var s=j(u);var x=s.data("blockUI.history");var y=s.data("blockUI.timeout");if(y){clearTimeout(y);s.removeData("blockUI.timeout")}w=j.extend({},j.blockUI.defaults,w||{});m(0,u,w);if(w.onUnblock===null){w.onUnblock=s.data("blockUI.onUnblock");s.removeData("blockUI.onUnblock")}var r;if(t){r=j("body").children().filter(".blockUI").add("body > .blockUI")}else{r=s.find(">.blockUI")}if(w.cursorReset){if(r.length>1){r[1].style.cursor=w.cursorReset}if(r.length>2){r[2].style.cursor=w.cursorReset}}if(t){c=h=null}if(w.fadeOut){v=r.length;r.fadeOut(w.fadeOut,function(){if(--v===0){l(r,x,w,u)}})}else{l(r,x,w,u)}}function l(v,z,y,x){var u=j(x);v.each(function(w,A){if(this.parentNode){this.parentNode.removeChild(this)}});if(z&&z.el){z.el.style.display=z.display;z.el.style.position=z.position;if(z.parent){z.parent.appendChild(z.el)}u.removeData("blockUI.history")}if(u.data("blockUI.static")){u.css("position","static")}if(typeof y.onUnblock=="function"){y.onUnblock(x,y)}var r=j(document.body),t=r.width(),s=r[0].style.width;r.width(t-1).width(t);r[0].style.width=s}function m(r,v,w){var u=v==window,t=j(v);if(!r&&(u&&!c||!u&&!t.data("blockUI.isBlocked"))){return}t.data("blockUI.isBlocked",r);if(!u||!w.bindEvents||(r&&!w.showOverlay)){return}var s="mousedown mouseup keydown keypress keyup touchstart touchend touchmove";if(r){j(document).bind(s,w,p)}else{j(document).unbind(s,p)}}function p(w){if(w.keyCode&&w.keyCode==9){if(c&&w.data.constrainTabKey){var t=h;var s=!w.shiftKey&&w.target===t[t.length-1];var r=w.shiftKey&&w.target===t[0];if(s||r){setTimeout(function(){q(r)},10);return false}}}var u=w.data;var v=j(w.target);if(v.hasClass("blockOverlay")&&u.onOverlayClick){u.onOverlayClick()}if(v.parents("div."+u.blockMsgClass).length>0){return true}return v.parents().children().filter("div.blockUI").length===0}function q(r){if(!h){return}var s=h[r===true?h.length-1:0];if(s){s.focus()}}function b(z,r,B){var A=z.parentNode,w=z.style;var u=((A.offsetWidth-z.offsetWidth)/2)-o(A,"borderLeftWidth");var v=((A.offsetHeight-z.offsetHeight)/2)-o(A,"borderTopWidth");if(r){w.left=u>0?(u+"px"):"0"}if(B){w.top=v>0?(v+"px"):"0"}}function o(r,s){return parseInt(j.css(r,s),10)||0}}if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}})();