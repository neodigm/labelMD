"use strict";
//register the component
window.addEventListener("DOMContentLoaded", function() {	
	var c_pagination = Vue.component('ltdc-pagination',{
	 template: '<div class="pagbrd__items"><p class="pagbrd__text--dark">Items <span v-text="currentItemIndex"></span> - <span v-text="lastItemIndex"></span> of <span v-text="totalRecords"></span></p></div>',
	 data: function(){
		return {	 
		       itemsPerPage: "",
		       totalRecords: "",
		       currentItemIndex: "",
		       lastItemIndex: "",
			   restListSection: ""
		  }	  
	  },  
	  mounted: function(){	   	  
		    this.itemsPerPage = parseInt(document.getElementById("pageRecsPerPage").value, 10);
	        this.totalRecords = parseInt(document.getElementById("sizeTotalNumRecs").value, 10);
	        this.currentItemIndex = parseInt(document.getElementById("pageOffsetVal").value, 10);       
	        this.lastItemIndex = this.currentItemIndex + this.itemsPerPage;  
	     	// check for last page not having itemsPerPage number of items
	        if (this.lastItemIndex > this.totalRecords){
	        	this.lastItemIndex = this.totalRecords;
	        }
	        if (this.totalRecords > 0){
	        	 this.currentItemIndex =  this.currentItemIndex + 1;
	        }       
	  }
	})
	
	// create a root instance
	var app = new Vue({
		el: '.topltdpagination'
	})
	
	//create a root instance
	var app = new Vue({
		el: '.bottomltdpagination'
	})
	
	var ltdpagination = document.getElementsByClassName("topltdpagination"),
	bottomltdpagination = document.getElementsByClassName("bottomltdpagination"),	
	paginationUL = document.getElementById("paginationUL");
	if(typeof ltdpagination !== 'undefined' && ltdpagination.length > 0) {
		var cln = paginationUL.cloneNode(true);
		cln.classList.remove('hidden');
		ltdpagination[0].appendChild(cln); 
	}
	if(typeof bottomltdpagination !== 'undefined' && bottomltdpagination.length > 0) {	
		paginationUL.classList.remove('hidden');
		bottomltdpagination[0].appendChild(paginationUL);
	}
});