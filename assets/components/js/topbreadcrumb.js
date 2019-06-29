/**********************
 * PRODUCT DETAIL PAGE
 **********************/

var storageSupported = true;
try {
	sessionStorage.setItem("storage", "test");
	sessionStorage.removeItem("storage");
}
catch (error) {
	storageSupported = false;
}	

// prev/next link service
if (storageSupported) {
		// update productId on page load
		var pid = window.location.toString().match(/prod[0-9]*/);
		sessionStorage.setItem('productId', pid);

		// Also read in the fm paramerter for this URL
		var params = window.location.search.substring(1).split('&');
		var fmsearch = "";
		params.forEach(function(item){
			var split = item.split('=');
			if (split[0] == 'fm' && split[1] != 'search') {
				sessionStorage.setItem('fm', split[1]);					
				return true;
			}
			if (split[0] == 'fm' && split[1] == 'search') {
				fmsearch = 	split[1];			
				return true;
			}
			return false;
		});

		// get all the parameters from sessionStorage
		var categoryId = sessionStorage.getItem('categoryId'),
			Ns = sessionStorage.getItem('Ns'),
			N = sessionStorage.getItem('N'),
			Ntk = sessionStorage.getItem('Ntk'),
			Ntt = sessionStorage.getItem('Ntt'),
			Nty = sessionStorage.getItem('Nty'),
			D = sessionStorage.getItem('D'),
			Ntx = sessionStorage.getItem('Ntx'),
			Dx  = sessionStorage.getItem('Dx'),
			//fm  = sessionStorage.getItem('fm'),
			offset  = sessionStorage.getItem('offset'),
			Nrpp  = sessionStorage.getItem('Nrpp'),
			Nr  = sessionStorage.getItem('Nr'),
			bookId  = sessionStorage.getItem('bookId'),
			No  = sessionStorage.getItem('No'),
			pageNum  = sessionStorage.getItem('pageNum'),
			productId = sessionStorage.getItem('productId');
		
		var fm="";
		if (fmsearch == 'search') {
			fm  = "search";
		}else{
			fm  = sessionStorage.getItem('fm');
		}		
							
		axios.get('/navigation/linkServiceJSON.jsp',{params: {categoryId: categoryId, Ns: Ns, N: N, Ntk: Ntk, Ntt: Ntt, Nty: Nty, D: D, Ntx: Ntx, Dx: Dx, fm: fm, offset: offset, productId: productId, currentUrl: window.location.href, Nrpp: Nrpp, No: No, pageNum: pageNum, Nr: Nr, bookId: bookId}} )
		.then(function ( response ) {
			// got json back with prev/next links
			var lsp = response.data.linkServiceParameters,
				prev = lsp.prevProdPDPURL,
				next = lsp.nextProdPDPURL,
				prevProdId = lsp.prevProdId,
				nextProdId = lsp.nextProdId
				searchResults= lsp.SearchResults;			
			sessionStorage.setItem("Nrpp", lsp.Nrpp);					
			sessionStorage.setItem("No", lsp.No);
			var prevUrl = prev.replace(/amp;/g,'');
			var nextUrl = next.replace(/amp;/g,'');
			var showPreviousButton = true;
			var showNextButton = true;
			if (searchResults.length > 0) {				
				document.getElementsByClassName("js-back_to_search--url")[0].setAttribute("href", searchResults);				
				document.getElementsByClassName("js-fm--search")[0].classList.remove("hidden");					
			}else{	
				document.getElementsByClassName("js-fm--navigation")[0].classList.remove("hidden");				
			}
			
			if (prevProdId.length > 0) {				
				var prevLinkEle = document.getElementsByClassName("js-breadcrumb--prev");				
				for(var i = 0, ln = prevLinkEle.length; i < ln; i++) {
					prevLinkEle[i].setAttribute("href", prevUrl);
				}				
				document.getElementById('js-topbreadcrumb--id').dataset.navFirst="false";				
			}else{				
				document.getElementById('js-topbreadcrumb--id').dataset.navFirst="true";
				showPreviousButton = false;
			}
			if (nextProdId.length > 0) {				
				document.getElementsByClassName("js-breadcrumb--next")[0].setAttribute("href", nextUrl);
				document.getElementById('js-topbreadcrumb--id').dataset.navLast="false";
			}else{				
				document.getElementById('js-topbreadcrumb--id').dataset.navLast="true";
				showPreviousButton = false;
			}
			
			if(!showPreviousButton && !showNextButton){
				document.getElementById('js-topbreadcrumb--id').dataset.nav="false";
			}
						
		})
		.catch(function ( error ) {			
			console.log( error );
		});
}