"use strict";Vue.config.devtools=!0,Vue.component("ltdc-leftnav",{template:"#v-leftnav__templ",props:{model:Object},data:function(){return{open:!1,hidden:!1,leftnav__current:!1}},computed:{isFolder:function(){return this.model.children&&this.model.children.length}},methods:{toggle:function(){this.isFolder&&(this.open=!this.open)}},mounted:function(){"level0"===this.model.name&&(this.open=!0,this.hidden=!0)}});var vleftnav__id=new Vue({el:"#v-leftnav__id",data:{ltdc_leftnav__hier:ltdc_leftnav},methods:{parseJSONCat:function(){var e={},n=0,t="",l="",r=-1;for(var i in jsnCat)switch(n=1,void 0!==jsnCat[i].level2CategoryUrl&&(n=2),void 0!==jsnCat[i].level3CategoryUrl&&(n=3),t=jsnCat[i]["level"+n+"DisplayName"],l=jsnCat[i]["level"+n+"CategoryUrl"],n){case 1:e={name:t,href:l},ltdc_leftnav.children.push(e),r=-1;break;case 2:void 0===e.children&&(e.children=[]),e.children.push({name:t,href:l}),r++;break;case 3:void 0!==e.children[r]&&(void 0===e.children[r].children&&(e.children[r].children=[]),e.children[r].children.push({name:t,href:l}))}},openCurrent:function(e){var n=this.$children[0],t=!1,l=!1;e=e.toLowerCase();n.$children.filter(function(n){if(-1!=e.indexOf(n.model.href.toLowerCase())&&(t=!0),n.$children.length>=1&&!t)n.$children.filter(function(n){if(-1!=e.indexOf(n.model.href.toLowerCase())&&(t=!0,l=!0),n.$children.length>=1&&!l)n.$children.filter(function(n){-1!=e.indexOf(n.model.href.toLowerCase())&&(t=!0,l=!0)});l&&(n.toggle(),n.leftnav__current=!0,l=!1)});t&&(n.toggle(),n.leftnav__current=!0,t=!1)})}},created:function(){this.parseJSONCat()}}),vleftnav2Column__id=new Vue({el:"#v-leftnav2Column__id",data:{ltdc_leftnav__hier:ltdc_leftnav},methods:{openCurrent:function(e){var n=this.$children[0],t=!1;e=e.toLowerCase();n.$children.filter(function(n){if(-1!=e.indexOf(n.model.href.toLowerCase())&&(t=!0),n.$children.length>=1)n.$children.filter(function(n){if(-1!=e.indexOf(n.model.href.toLowerCase())&&(n.toggle(),n.leftnav__current=!0,t=!0),n.$children.length>=1)n.$children.filter(function(n){-1!=e.indexOf(n.model.href.toLowerCase())&&(t=!0)});t&&(n.toggle(),n.leftnav__current=!0)});t&&(n.toggle(),n.leftnav__current=!0,t=!1)})}}});vleftnav__id.openCurrent(location.href),document.getElementById("v-leftnav2Column__id")&&vleftnav2Column__id.openCurrent(location.href);