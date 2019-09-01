//    Uncomment the 3 lines below to audio F5 Interchange
//$(document).on('replace', 'img', function (e, new_path, original_path) {
//  console.log("interchange: " + e.currentTarget, new_path, original_path);
//});
$(document).ready(function(){
	//  Issue with iOS side-nav still open on back button
	$(".side-nav li a").on("click", function(e){
		if( ( $(e.target).hasClass("sub-cat-title") ) && ("inline" != $(".exit-off-canvas").css("display")) ){ $(".exit-off-canvas").click(); }
	});
	// Section 9 - Tab States (Foundation 5 conversion)
	moveSecTab();
	$(document).ajaxComplete(function() {
		moveSecTab();
	});
	$(document).on("opened.fndtn.reveal", "[data-reveal]", function () {
		var oTOtabs = window.setTimeout(moveSecTab, 200);
	});
	$(document).on("click", ".section-container .title>a", function (e) {
		// A11y | Accessibility
		e.preventDefault();  
		moveSecTab();
		var oSec = $(this).closest("section");
		$(".section-container section.active").removeClass("active").attr({"aria-selected": "false", "aria-hidden": "true", "aria-expanded": "false"});
		oSec.addClass("active").attr({"aria-selected": "true","aria-hidden": "false","aria-expanded": "true"});

		var oTOtabs = window.setTimeout(moveSecTab, 200);
	});
	function moveSecTab(){
		if ($(".section-container")[0]){
			var sWi = parseInt( $(".section-container.tabs section:nth-child(1n) .title").css("width"), 10);
			$(".section-container.tabs section:nth-child(2n) .title").css("left", (sWi-3)+"px");
		}
	}

	// prevent caching of ajax requests
	$.ajaxSetup({cache: false});

	// detect screen size
	function screenSizeDetect(){
		$("html").removeClass("small-screen medium-screen large-screen");
		if ( $("#smallTest").css("display") !== "none" ) {
				$("html").addClass("small-screen");
		} else if ( $("#mediumTest").css("display") !== "none" ) {
				$("html").addClass("medium-screen");
		} else if ( $("#largeTest").css("display") !== "none" ) {
				$("html").addClass("large-screen");
		}
	}
	screenSizeDetect();
	$(window).resize(function(){ screenSizeDetect(); });

	// initialize responsive image maps
	$('img[usemap]').rwdImageMaps();

	// ensure links navigate to page
	$('.sub-cat a').click(function(e) {
		window.location = $(this).attr('href');
	});

	// show hide-while-loading
	$('.hide-while-loading').addClass('done-loading');
	$('.done-loading').removeClass('hide-while-loading');

	// text-sizer
	var $content = $('.section-container .content');
	if ($content.hasClass('normalFont')){
		$('.text-sizer a.normalFont').addClass('active');
	}
	else if ($content.hasClass('mediumFont')){
		$('.text-sizer a.mediumFont').addClass('active');
	}
	else if ($content.hasClass('largeFont')){
		$('.text-sizer a.largeFont').addClass('active');
	}
	$('.text-sizer').on('click', 'a', function(e){
		e.preventDefault();
		var $this = $(this);
		/*20151105 SCK F5 upgrade | Section to Tab*/
		$('.zftabs--content .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
		$('.section-container .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
		$('.text-sizer a').removeClass('active');
		$this.addClass('active');
	});

	// don't let users click a.unavailable
	$('body').on('click', 'a.unavailable', function(e){
		e.preventDefault();
	});

	// see if session storage is supported
	
	var storageSupported = true;
	try {
		sessionStorage.setItem("storage", "test");
		sessionStorage.removeItem("storage");
	}
	catch (error) {
		storageSupported = false;
	}

	var $body = $('body');
	if ($body.hasClass('home')) {
		// home page

		function homepageImages(originalCall) {
			var $html = $('html'),
				$targetImg = $('.homepage-features li:first img'),
				margin = ($('#homeCatalogCarousel').width()/2) - ($('.catalog-slide').length * 9.5 + 25),
				carouselHeight = $('.homepage-carousel li:first img').height(),
				$orbitContainer = $('.homepage-carousel ul.orbit-slides-container');

			$('.pagers li.first').css('marginLeft', margin);

			if ($html.hasClass('medium-screen')) {
				$targetImg.css('height', $('#homeCatalogCarousel').height());
			}
			else {
				$targetImg.css('height', 'auto');
			}

			if ($html.hasClass('small-screen') && $html.hasClass('touch')) {
				$orbitContainer.css('marginBottom', 10);
			}
			else {
				$orbitContainer.css('marginBottom', 0);
			}
			$orbitContainer.height(carouselHeight);
		}

		var debounced;
		$(window).resize(function(e){
			/* we need to reflow interchange, but part of the reflow is a trigger to do a window.resize
			 * this causes an infinite loop because this is inside a window.resize listener. we need to
			 * check and see if the event is naturally occuring (an actual resizing of the window) or
			 * part of a jquery triggered event (like the one from the interchange reflow).
			 *
			 * we also ignore this window resizing if browsing in ie8
			 */
			if (!e.isTrigger && !$('html').hasClass('ie8')) {
				clearTimeout(debounced);
				debounced = setTimeout(function(){
					homepageImages();
				}, 1000);
			}
		});
		setTimeout(function(){
			homepageImages(true);
			$.fn.rwdImageMaps();
		}, 1000);

		// homepage catalog carousel
		var carouselModule = function(carouselRoot, num) {

			var carouselEl = carouselRoot.find('.carousel').length ? carouselRoot.find('.carousel') : carouselRoot.find('.items'),
				carouselItems = carouselEl.find('> li'),
				carouselPrev = carouselRoot.find('a.jcarousel-prev').length ? carouselRoot.find('a.jcarousel-prev') : carouselRoot.find('.pagers .previous a'),
				carouselNext = carouselRoot.find('a.jcarousel-next').length ? carouselRoot.find('a.jcarousel-next') : carouselRoot.find('.pagers .next a'),
				displayNum = num;

			// activate bullet links
			var margin = ($('.pagers').width()/2) - ($('.catalog-slide').length * 9.5 + 25);
			$('.pagers li.first').css('marginLeft', margin);

			carouselItems.each(function() {
				var $this = $(this);
				if ($this.hasClass('show')) {
					$('.pagers li.' + $this.attr('id')).addClass('active');
				}
			});

			$('.catalog-slide').on('click', function(){
				var slide = $(this).data('slide'),
					size = carouselItems.size();

				if (slide == size || slide == size-1) {
					//show size, size-1, size-2, hide next button, show prev button
					$('.catalog-slide').removeClass('active');
					$('.catalog-' + size).addClass('active');
					$('.catalog-' + (size-1)).addClass('active');
					$('.catalog-' + (size-2)).addClass('active');
					$('.catalog-thumb').removeClass('show hidden').addClass('hidden');
					$('#catalog-' + size).addClass('show').removeClass('hidden');
					$('#catalog-' + (size-1)).addClass('show').removeClass('hidden');
					$('#catalog-' + (size-2)).addClass('show').removeClass('hidden');
					carouselNext.addClass("not-selectable");
					carouselPrev.removeClass("not-selectable");
				}
				else if (slide == '1' || slide == '2') {
					//show 1, 2, 3
					$('.catalog-slide').removeClass('active');
					$('.catalog-1').addClass('active');
					$('.catalog-2').addClass('active');
					$('.catalog-3').addClass('active');
					$('.catalog-thumb').removeClass('show hidden').addClass('hidden');
					$('#catalog-1').addClass('show').removeClass('hidden');
					$('#catalog-2').addClass('show').removeClass('hidden');
					$('#catalog-3').addClass('show').removeClass('hidden');
					carouselPrev.addClass("not-selectable");
					carouselNext.removeClass("not-selectable");
				}
				else {
					// show slide-1, slide, slide+1, show next button, hide prev button
					$('.catalog-slide').removeClass('active');
					$('.catalog-' + (slide-1)).addClass('active');
					$('.catalog-' + slide).addClass('active');
					$('.catalog-' + (slide+1)).addClass('active');
					$('.catalog-thumb').removeClass('show hidden').addClass('hidden');
					$('#catalog-' + (slide-1)).addClass('show').removeClass('hidden');
					$('#catalog-' + slide).addClass('show').removeClass('hidden');
					$('#catalog-' + (slide+1)).addClass('show').removeClass('hidden');
					carouselPrev.removeClass("not-selectable");
					carouselNext.removeClass("not-selectable");
				}

			});

			carouselPrev.click(function() {
				if (!carouselPrev.hasClass('not-selectable')) {
					var liSize = carouselItems.size(),
						iLast = 0;
					carouselItems.each(function() {
						if ($(this).is('.show')) {
							iLast = $(this).attr("title");
						}
					});
					if (parseInt(iLast) > 1 && parseInt(iLast)-displayNum >=1) {
						carouselItems.each(function() {
							var $this = $(this),
								diff = parseInt(iLast) - $this.attr("title");
							if (diff <= displayNum && diff > 0) {
								$this.removeClass("hidden").addClass("show");
								$('.pagers li.' + $this.attr('id')).addClass('active');
							}
							else {
								$this.removeClass("show").addClass("hidden");
								$('.pagers li.' + $this.attr('id')).removeClass('active');
							}
						});
					}

					if (parseInt(iLast) - displayNum > 1) {
						carouselPrev.removeClass("not-selectable");
					}
					else {
						carouselPrev.addClass("not-selectable");
					}

					if (parseInt(iLast) - 1 < liSize) {
						carouselNext.removeClass("not-selectable");
					}
					else {
						carouselNext.addClass("not-selectable");
					}

				}
			});

			carouselNext.click(function() {
				if (!carouselNext.hasClass('not-selectable')) {

					var liSize = carouselItems.size(),
						iLast = 0;
					carouselItems.each(function() {
						if ($(this).is('.show')) {
							iLast = $(this).attr("title");
						}
					});
					if (iLast < liSize) {
						carouselItems.each(function() {
							var $this = $(this),
								diff = parseInt(iLast) - $(this).attr("title");
							if (diff >= -1 && diff < (displayNum-1)) {
								$this.removeClass("hidden").addClass("show");
								$('.pagers li.' + $this.attr('id')).addClass('active');
							}
							else {
								$this.removeClass("show").addClass("hidden");
								$('.pagers li.' + $this.attr('id')).removeClass('active');
							}
						});
					}

					if (liSize == parseInt(iLast) + 1) {
						carouselNext.addClass("not-selectable");
					}
					else {
						carouselNext.removeClass("not-selectable");
					}

					if (parseInt(iLast) - 1 > 1) {
						carouselPrev.removeClass("not-selectable");
					}
					else {
						carouselPrev.addClass("not-selectable");
					}

				}
			});
		}

		var carousels = $('#homeCatalogCarousel, .carousel');
		$.each(carousels, function(index, el) {
			var $el = $(el),
				displayNum = $el.hasClass('products') ? 4 : 3;
			carouselModule($(el), displayNum);
		});

		// modify featured items carousel
		function adjustFeaturedItems() {
			var medium = $('html').hasClass('medium-screen'),
				small = $('html').hasClass('small-screen'),
				height = 0;
			if (!$('html').hasClass('ie8')){
				if (medium || small) {
					var container = $(window).width() - 70,
						image = container / 4;
					if (small) {
						image = container / 2;
					}
					$('.homepage-featured-items .scroll-container').css('width', container);
					$('.homepage-featured-items .scroll-group').css('left', '0px');
					$('.homepage-featured-items .scroll-button-left').addClass('visibility', 'hidden');
					$('.homepage-featured-items .scroll-button-right').css('visibility', 'visible');
					$('.homepage-featured-items .cs-rec').css('width', image);
				}
				if ($('html').hasClass('large-screen')) {
					$('.homepage-featured-items .scroll-container').css('width', '726px');
					$('.homepage-featured-items .scroll-group').css('left', '0px');
					$('.homepage-featured-items .scroll-button-left').css('visibility', 'hidden');
					$('.homepage-featured-items .scroll-button-right').css('visibility', 'visible');
					$('.homepage-featured-items .cs-rec').css('width', '180px');
				}
			}
			// adjust height
			setTimeout(function(){
				$('.homepage-featured-items .scroll-group li').each(function(){
					var thisHeight = $(this).height();
					if (thisHeight > height) {
						height = thisHeight;
					}
				});
				$('#unique-descriptive-recslot-id').height(height+5);
			}, 1000);
		}
		if ($('.homepage-featured-items').length > 0) {
			if (ATGSvcs.erg.cond('rendered')) {
				adjustFeaturedItems();
			}
			else {
				ATGSvcs.erg.wait({rendered: true}, adjustFeaturedItems);
			}
			$(window).resize(function(e){
				/* if the resize event is triggered by interchange (reflow function), we want to
				 * ignore it.  if the browser is ie8, also ignore it.
				 */
				if (!e.isTrigger && !$('html').hasClass('ie8')) {
					adjustFeaturedItems();
				}
			});
		}

	}

	// size chart and personalization modal listeners
	var	sizeChartHandler = function() {
console.log("sizeChartHandler");
			var $this = $(this),
				img = $this.data('img') + '<a class="close-reveal-modal">&#215;</a>';
			$( document ).on('close.fndtn.reveal', '#sizeChartModal[data-reveal]', function () {
			//$('#sizeChartModal').on('closed', function(){
				if ($this.parents('#quickViewModal').length > 0) {
					$('.reveal-modal-bg').hide();
					$('#quickViewModal').foundation('reveal', 'open');
				}
			});
			$('#sizeChartModal').html(img).foundation('reveal', 'open');
		},
		personalizationHandler = function() {
			if( $('#personalizationModal').html().length  == 0 ){
				var $this = $(this),
					images = $this.siblings('.personalization-image'),
					message = '<h3>Personalization Instructions</h3>';

				for (var z=0; z<images.length; z++) {
					message += '<img src="' + images[z].value + '" alt="Personalization Instructions" />'
				}
				message += '<a class="close-reveal-modal">&#215;</a>';
				$('#personalizationModal').html(message);
				//  20151204 SCK ZF5
				$( document ).on('close.fndtn.reveal', '#personalizationModal[data-reveal]', function () {
					$('#personalizationModal').html("");
					if ($this.parents('#quickViewModal').length > 0) {
						//$('.reveal-modal-bg').hide();
						$('#quickViewModal').foundation('reveal', 'open');
					}
				});
				//    20150309  _qc_192
				$('#personalizationModal').foundation('reveal', 'open');
				//    20160112 QC_659 Personalization instructions are popping up below the fold
				if( !jsMQ.isLarge() ){ 
					$('html, body').animate({ scrollTop: ($('#personalizationModal').focus().offset().top-56) },400);
				}  
			}				

		};
	function bindSizePersonal() {
		unbindSizePersonalQuick();
		$('body').on('click', '.sizeChart', sizeChartHandler);
		$('body').on('click', '.personalization-link', personalizationHandler);
	}
	function unbindSizePersonal() {
		$('#sizeChartModal').off('closed');
		$('#personalizationModal').off('closed');
		$('body').off('click', '.sizeChart', sizeChartHandler);
	}
	function reinitSizePersonal() {
		unbindSizePersonal();
		bindSizePersonal();
	}
	function bindSizePersonalQuick() {
		unbindSizePersonal();
		$('#quickView').on('click', '.sizeChart', sizeChartHandler);
		$('#quickView').on('click', '.personalization-link', personalizationHandler);
	}
	function unbindSizePersonalQuick() {
		$('#sizeChartModal').off('closed');
		$('#personalizationModal').off('closed');
		$('#quickView').off('click', '.sizeChart', sizeChartHandler);
		$('#quickView').off('click', '.personalization-link', personalizationHandler);
	}
	function reinitSizePersonalQuick() {
		unbindSizePersonalQuick();
		bindSizePersonalQuick();
	}
	bindSizePersonal();

	/* need to reinitialize size chart and personalization listeners every time a picker is click
	 * because it reloads these elements via ajax */
	$('body').on('click', '#firstPicker li', function(){
		reinitSizePersonal();
	});
	$('body').on('click', '#secondPicker li', function(){
		reinitSizePersonal();
	});
	$('body').on('click', '[id^=a_sku]', function(){
		reinitSizePersonal();
	});

	/**********************************
	 * BACK TO TOP BUTTON FOR ALL PAGES
	 **********************************/
	var trigger = $(window).height()/2,
		position = 0,
		$button = $('.to-top');
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		if (scrollTop > position) {
			// scrolling down
			if (scrollTop > trigger) {
				$button.show();
			}
		}
		else {
			// scrolling up
			if (scrollTop < trigger) {
				$button.hide();
			}
		}
		position = scrollTop;
	});
	$('.to-top').on('click', function(){
		$('html, body').animate({scrollTop:0}, '300');
	});

	/**********************
	 * PRODUCT DETAIL PAGE
	 **********************/
	if ($body.hasClass('pdp')) {
		// back to top button
		var trigger = $(window).height()/2,
			position = 0,
			$button = $('.to-top');
		$(window).scroll(function(){
			var scrollTop = $(this).scrollTop();
			if (scrollTop > position) {
				// scrolling down
				if (scrollTop > trigger) {
					$button.show();
				}
			}
			else {
				// scrolling up
				if (scrollTop < trigger) {
					$button.hide();
				}
			}
			position = scrollTop;
		});
		$('.to-top').on('click', function(){
			$('html, body').animate({scrollTop:0}, '300');
		});

		// only show zoom modal for medium/large
		$('body').on('click', '#mainDataOrbit', function(e){
			e.preventDefault();
			if (!$('html').hasClass('small-screen')) {
				// pdp lightbox modal
				function lightboxResize() {
					var img = $('#imageZoomSlider').find('li.active img')[0],
						pic_real_width,
						marginLeft;
					$('<img>').attr("src", $(img).attr('src')).load(function() {
						pic_real_width = this.width;
						marginLeft = -pic_real_width/2;
						$('#imageZoomModal').css('width', pic_real_width).css('marginLeft', marginLeft);
					});
				}
				function lightboxResizeIE() {
					var pic_real_width = $('#imageZoomSlider li.active img').width(),
						marginLeft = -pic_real_width / 2;
					$('#imageZoomModal').css('width', pic_real_width).css('marginLeft', marginLeft);
				}

				$('#imageZoomModal').bind('opened', function(){
					if ($('html').hasClass('lt-ie9')) {
						lightboxResizeIE();
					}
					else {
						lightboxResize();
					}
				});
				$('#imageZoomSlider').on('orbit:before-slide-change', function(event, orbit) {
					if ($('html').hasClass('lt-ie9')) {
						lightboxResizeIE();
					}
					else {
						lightboxResize();
					}
				});
				$("#imageZoomModal").load("/catalog/includes/inc_zoomImage_Modal.jsp?productId=" + $(this).data('pid') + "&", function(){
					$(this).foundation('orbit', 'reflow');
					$('#orbitLinks a[data-orbit-link="' + $("#mainDataOrbit").attr("data-orbit-link") + '"]').trigger('click');

					// prevent clicking on anything but prev/next/close links
					$('#imageZoomModal .orbit-caption').click(function(e){
						return false;
					});
					$('#imageZoomModal .active img').click(function(e){
						return false;
					});
				});
				$('#imageZoomModal').foundation('reveal', 'open');
			}
		});

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
			// send all the parameters from sessionStorage to the link service
			$.ajax({
				url: '/navigation/linkServiceJSON.jsp',
				data: { categoryId: categoryId, Ns: Ns, N: N, Ntk: Ntk, Ntt: Ntt, Nty: Nty, D: D, Ntx: Ntx, Dx: Dx, fm: fm, offset: offset, productId: productId, currentUrl: window.location.href, Nrpp: Nrpp, No: No, pageNum: pageNum, Nr: Nr, bookId: bookId},
				success: function(data) {
					// got json back with prev/next links
					var lsp = data.linkServiceParameters,
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
						$('.search-results').attr('href', searchResults);
						$('.breadcrumbs').addClass('hidden');
						$('.backtosearch').removeClass('hidden');
					}else{
						//$('.nosearch').removeClass('hidden');
						$('.backtosearch').addClass('hidden');
					}
						
					if (prevProdId.length > 0) {
						$('.previous-button').attr('href', prevUrl).removeClass('unavailable');
					}else{
						showPreviousButton = false;
					}
					if (nextProdId.length > 0) {
						$('.next-button').attr('href', nextUrl).removeClass('unavailable');
					}else{
						showNextButton = false;
					}
					if(showPreviousButton || showNextButton){
						$('.button-pagination').removeClass('hidden');
					}
				},
				error: function(error) {
					console.log('error:', error);
				}
			});
		}

		$('#tellAFriend').on('click', function(){
			console.log('show tell a friend modal');
		});
	}

	// product click to pdp (for prev/next)
	if (storageSupported) {
		$('body').on('click', '.product-link', function(e){
			e.preventDefault();
			var url = $(this).attr('href'),
				nextParams = url.split('?')[1].split('&'),
				params = window.location.search.substring(1).split('&'),
				dimensionValue = window.location.href.split('?')[0];

			// delete all possible key/value pairs
			sessionStorage.clear();
			if (dimensionValue.indexOf('N-') != -1) {
				dimensionValue = dimensionValue.substring(dimensionValue.indexOf('N-')+2);
				// if there is a jsessionid in the url, strip it out. it causes errors with seo url
				if (dimensionValue.indexOf(';') != -1) {
					dimensionValue = dimensionValue.substring(0, dimensionValue.indexOf(';'));
				}
				dimensionValue = dimensionValue.replace(/[^a-zA-Z0-9]/g,'');
				sessionStorage.setItem('N', dimensionValue);
			}

			/* jeff thought it would be a good idea to put all the necessary parameters into
			 * separate urls. brilliant.
			 * save parameters from pdp link in localStorage
			 */
			if (nextParams.length > 0) {
				nextParams.forEach(function(item){
					var split = item.split('=');
					if (split[1] != 'search') {
					sessionStorage.setItem(split[0], split[1]);	
					}
				});
			}
			
			// save current url parameters in localStorage
			// we're doing it in this order because sometimes categoryId isn't correct in pdp link
			if (params.length > 0) {
				params.forEach(function(item){
					var split = item.split('=');
					if (split[1] != 'search') {
					sessionStorage.setItem(split[0], split[1]);
					}
				});
			}
			
			// Set session storage item for the Nr.
			// The value of Nr is in the breadcrumbs.jsp <input type="hidden" id="recordFilterState" value="${navAction.removeAction.navigationState}"/>
			sessionStorage.setItem('Nr', $('#recordFilterState').val());

			// go to pdp url
			window.location = url;
		});
	}

	/*************
	 * QUICK VIEW
	 *************/
	$('.prod-item').hover(function(){
		if (!$('html').hasClass('small-screen')) {
			$(this).find('.quick-view').css('display', 'block');
		}
	},
	function(){
		$(this).find('.quick-view').css('display', 'none');
	});

	$( document ).on('open.fndtn.reveal', '#quickViewModal', function () {

		nTime = setTimeout(function(){
			$(".reveal-modal-bg").css("display","block");
		}, 480);

		// reflow section
		$(this).foundation('section', 'reflow');

		// reinit section tabs
		$('#quickViewModal').on('click', '.section-container section', function(e){
			e.preventDefault();
			var $this = $(this);
			$this.addClass('active').siblings('section').removeClass('active');
		});

		// reinit text-sizer
		var $content = $('.section-container .content');
		if ($content.hasClass('normalFont')){
			$('.text-sizer a.normalFont').addClass('active');
		}
		else if ($content.hasClass('mediumFont')){
			$('.text-sizer a.mediumFont').addClass('active');
		}
		else if ($content.hasClass('largeFont')){
			$('.text-sizer a.largeFont').addClass('active');
		}
		$('.text-sizer').on('click', 'a', function(e){
			e.preventDefault();
			var $this = $(this);
			/*20151105 SCK F5 upgrade | Section to Tab*/
			$('.zftabs--content .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
			$('.section-container .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
			$('.text-sizer a').removeClass('active');
			$this.addClass('active');
		});

		// reinit size chart and personalization modals
		reinitSizePersonalQuick();
		/* need to reinitialize size chart and personalization listeners every time a picker is click
		 * because it reloads these elements via ajax
		 */
		$('#quickView').on('click', '#firstPicker li', function(){
			reinitSizePersonalQuick();
		});
		$('#quickView').on('click', '#secondPicker li', function(){
			reinitSizePersonalQuick();
		});
		$('#quickView').on('click', '[id^=a_sku]', function(){
			reinitSizePersonalQuick();
		});

	});



	/***********
	 * SIDE NAV
	 ***********/
	if (!$('.category-list')) {
		$('.side-nav').find('a[href="' + window.location.pathname + window.location.search + '"]').addClass('selected');
	}



	/*******************
	 * ADD TO FAVORITES
	 *******************/
	$('body').on('click', '#favoritesDummyButton', function(){
		$('.favoritesBtn').trigger('click');
	});

	// only load pagination/refinements on results pages
	if ($('#atg_store_catSubProdList').length > 0) {
		/**************
		 * PAGINATION
		 **************/
		var itemsPerPage = parseInt($('#pageRecsPerPage').val(), 10),
			totalRecords = parseInt($('#sizeTotalNumRecs').val(), 10),
			currentItemIndex = parseInt($('#pageOffsetVal').val(), 10),
			categoryName=$('#categoryName').val(),
			lastItemIndex= currentItemIndex + itemsPerPage;

		// check for last page not having itemsPerPage number of items
		if (lastItemIndex > totalRecords){
			lastItemIndex = totalRecords;
		}

		if (totalRecords =='0'){
			$('.numItems').html('Items ' + (currentItemIndex) + ' - ' + lastItemIndex + ' of ' + totalRecords);
		}else {
			$('.numItems').html('Items ' + (currentItemIndex + 1) + ' - ' + lastItemIndex + ' of ' + totalRecords);
		}
		$('#searchCrumbSpan').html('Total Matches Found: ' + totalRecords);
		$('#numItemsTop').html(' (' + totalRecords+')');
		$('#numItemsTop1').html(' (' + totalRecords+')');
		// move pagination/refinements to proper sections
		var $rightSection = $('#rightSection'),
			$ltdpagination = $('.ltdpagination'),
			$refinements = $('#refinements'),
			$sorting = $('#sorting'),
			$paginationUL = $('#paginationUL');
		$sorting.detach().appendTo($rightSection);
		$paginationUL.detach().appendTo($ltdpagination);
		$('<p id="numItems" class="numItems show-for-small"></p>').insertAfter('#bottomltdpagination #paginationUL');
		$('#numItems.show-for-small').html($('#numItems.hide-for-small').html());

		/*************
		 * REFINEMENTS
		 *************/
		// a few array functions
		Array.prototype.getUnique = function(){
			var u = {}, a = [];
			for (var i = 0, l = this.length; i < l; ++i) {
				if (u.hasOwnProperty(this[i])) {
					continue;
				}
				a.push(this[i]);
				u[this[i]] = 1;
			}
			return a;
		}
		Array.prototype.except = function(a) {
			return this.filter(function(i) {return !(a.indexOf(i) > -1);});
		};
		function getNValue(action) {
			var nValue = '',
				url = action.split(';')[0];

			if (isSEO) {
				if (url.search('N-') !== -1) {
					nValue = url.split('N-')[1].split('/')[0].split('?')[0];
				}
				else if (url.search('N=') !== -1) {
					nValue = url.split('N=')[1].split('/')[0].split('?')[0];
				}
				else {
					console.log('cannot find n-value.');
				}
			}
			else {
				var linkSplit = url.split('?'),
					query = linkSplit[linkSplit.length - 1],
					querySplit = query.split('&');
				// ie8 doesn't support forEach
				querySplit.forEach(function(parameter){
					if (parameter.indexOf('N=') == 0) {
						nValue = parameter.split('=')[1];
					}
				});
			}
			return nValue;
		}
		
		function getAction(nValueArray) {
			// Rebuild the N-value parameter
			var combinedNParameter = '';
			// ie8 doesn't support forEach
			nValueArray.getUnique().forEach(function(nValue, i) {
				if (nValue != '') {
					combinedNParameter += (i != 0 ? nDelimiter : '') + nValue;
				}
			});

			// Replace the N parameter in the current URL
			var url = document.URL.split('#')[0],
				replacementNParameter = getNValue(url),
				combinedAction = '';

			if (replacementNParameter !== '') {
				if (combinedNParameter.length == 0) {
					combinedAction = url.replace('N=' + replacementNParameter, '');
					if (url.search('N-') !== -1) {
						combinedAction = url.replace('_/N-' + replacementNParameter, '');
					}
					if (combinedAction.indexOf('?') == combinedAction.length - 1) {
						combinedAction = combinedAction.substring(0,combinedAction.length - 1);
					}
				}
				else {
					combinedAction = url.replace(replacementNParameter, combinedNParameter);
				}
			}
			else {
				combinedAction = url + ((combinedNParameter.length > 0) ? (url.indexOf('?')>=0 ? '&' : '?') + 'N=' + combinedNParameter : '');
			}

			return combinedAction;
		}

		function getArrayIntersection(a1, a2) {
			return $.map(a1,function(a){return $.inArray(a, a2) < 0 ? null : a;});
		}

		function getConsolidatedRemovalLink(removalLinks) {
			var combinedNValues = BASE_N_VALUES;
			for (var i=0; i<removalLinks.length; i++) {
				var localNValues = getNValue($(removalLinks[i]).data('remove-action')),
					removalNValues = BASE_N_VALUES.except(localNValues),
					combinedNValues = combinedNValues.except(removalNValues);
			}
						var combinedAction = getAction(combinedNValues);
			var newCombinedAction = '';
			//Removing the Nf param from url if present
			if(combinedAction.indexOf('&Nf') != -1){
				var params = combinedAction.split('&');
				var newCombinedAction = params[0];
				for (var i = 1; i < params.length; i++) {
					if(params[i].indexOf('Nf') == -1){
						newCombinedAction += '&'+params[i];
					}
				}
				combinedAction = newCombinedAction;
			}else if(combinedAction.indexOf('?Nf') != -1){
				var params = combinedAction.split('?');
				var newCombinedAction = params[0];
				if(params[1].indexOf('Nf')== -1){
					newCombinedAction = newCombinedAction + '?' + params[1].substring((params[1].indexOf('&')+1), params[1].length);
				}
				combinedAction = newCombinedAction;
			}

			return combinedAction;
		}

		function getCombinedRemovalLink(link1, link2) {
			var nValue1 = getNValue(link1),
				nValue2 = getNValue(link2),
				combinedNParameter = '',
				combinedNValues = getArrayIntersection(nValue1.split(nDelimiter), nValue2.split(nDelimiter));

			// ie8 doesn't support forEach
			combinedNValues.forEach(function(nValue, i) {
				combinedNParameter += (i != 0 ? nDelimiter : '') + nValue;
			});

			return link1.replace(nValue1, combinedNParameter);
		}

		function initializeSelector(selectorName) {
		var totalRefinementsNo = $('#totalSelectedRefinements').val();
		if(typeof(selectorName) == 'string'){
			var selector = $('#' + selectorName);
			if (selector.size() > 0) {

				if (selector.hasClass('page-number')) {
					$('.page-number').on('click', '.update-refinements', function(e){
						e.preventDefault();
						var values = $("#slider-range").slider('values'),
							delimiter = '&';
						if (pageURL.indexOf('?') < 0) {
							delimiter = '?';
						}
						pageURL = pageURL + delimiter + "Nf=" + pageNumber + "|BTWN+" + values[0] + "+" + values[1];
						window.location=pageURL;
					});
				}
				else {
					// Populate the selectors' info sections
					var removalLinks = $('#' + selectorName + ' a.active[data-remove-action]'),
						updateButton = $('#' + selectorName + '-selector-update');

					// if there are selected refinements, add a link to remove all refinements
					if (removalLinks.length > 0) {
						$('.refine-results + hr').removeClass('hidden');
						$('#refineResultsList').append('<li class="button tiny radius secondary selected-refinement"><a class="reset-refinements" href="' + getConsolidatedRemovalLink(removalLinks) + '">Reset Refinements</a></li>');
					}

					// If there is an update button, assume multi-select. We need to add click handlers to both the option links and the update button itself
					if (updateButton.size() > 0) {

						// Add click handler to update button
						updateButton.click(function() {
							// Merge the set of N-values from all options marked as currrent
							var combinedNValues = [],
								newUrl = '';
							

							// Add any new N-values by finding any active options with an addAction
							var newOptions = $('#' + selectorName + ' a.active[data-add-action]');
							newOptions.each(function() {							
								var localNValues = $.makeArray($(getNValue($(this).data('add-action')).split(nDelimiter))),
									newNValues = localNValues.except(BASE_N_VALUES);
								combinedNValues = $.merge(combinedNValues, newNValues);
							});

							// Add any N-value from the current request
							combinedNValues = $.merge(combinedNValues, BASE_N_VALUES);

							// Remove any old N-values by finding any inactive options with a removeAction
							var oldOptions = $('#' + selectorName + ' a:not(.active)[data-remove-action]');

							oldOptions.each(function() {
								var localNValues = getNValue($(this).data('remove-action')).split(nDelimiter),
									removalNValues = BASE_N_VALUES.except(localNValues);
								combinedNValues = combinedNValues.except(removalNValues);
							});

							var url = getAction(combinedNValues);
							if (window.location.href.indexOf('?') > 0) {
								var baseUrl = url.split('?')[0] + '?',
									params = url.split('?')[1].split('&'),
									paramCount = 0,
									nvalue = '';
								newUrl = baseUrl;
								params.forEach(function(p){
									var name = p.split('=')[0];
									if (name == 'N') {
										nvalue = p;
									}
									else if (name !== 'No' && name !== 'Nr' && name !== 'Nrpp' && name !== 'pageNum') {
										paramCount++;
										if (paramCount > 1) {
											newUrl += '&';
										}
										newUrl += p;
									}
								});
								if (nvalue !== '') {
									if (window.location.href.indexOf('?') !== -1) {
										newUrl += '&' + nvalue;
									}
									else {
										newUrl += '?' + nvalue;
									}
								}
							}
							else {
								newUrl = url;
							}
							// if refinement is department, fire tealium event
							if (selectorName == 'departmentLTD' || selectorName == 'departmentLS') {
								var deptSelections = '',
									count = 0;
								$('#' + selectorName + ' a.active').each(function() {
									
									if (count > 0) {
										deptSelections += ':';
									}
									deptSelections += ($(this).text().split('(')[0].trim().replace(/ /g, '-'));
									count++;
								});

								fireTealiumEvent({
									"refine_catalog_dept" : deptSelections
								});
							}
							

							// navigate to url with updated NValues
							window.location.href = newUrl;
							return false;
						});
					}
				}
			}
		} else if(totalRefinementsNo == 1) {
			var removeUrl = selectorName.data('remove-url');
			$('.refine-results + hr').removeClass('hidden');
			$('#refineResultsList').append('<li class="button tiny radius secondary selected-refinement"><a class="reset-refinements" href="' + removeUrl + '">Reset Refinements</a></li>');
		}
	}

		// add selected refinements to dropdowns and list of selected refinements
		// with the exception of ratings, only one rating can be selected
		var totalRefinements = $('#totalSelectedRefinements').val(),
			i = 0;
		if ($('#selectedRefinement-0').length == 0) {
			i = 1;
			totalRefinements++;
		}
		var saveddropdownName='';
		var addedRefinementsCount=0;
		for (i; i<totalRefinements; i++) {
			var $refinement = $('#selectedRefinement-' + i),
				dimensionName = $refinement.data('dimension-name'),
				displayName = $refinement.data('display-name'),
				dept = '',
				dnsplit = displayName.split('.'),
				dropdownName = MAIN_CONSTANTS[dnsplit[0]],
				label = $refinement.data('label'),
				removeUrl = $refinement.data('remove-url'),
				removeUrlN = removeUrl.split('N-')[1],
				productCount = $refinement.data('product-count'),
				$target = $('ul#' + dimensionName + ' #refineLIs');
			// class for wider dropdown for departments
			if (displayName == 'departmentLTD' || displayName == 'departmentLS') {
				dept = 'department';
			}
			
			// traverse through constants if necessary
			for (var j=1; j<dnsplit.length; j++) {
				dropdownName = dropdownName[dnsplit[j]];				
				
			}
			
			//This logic will add the refinement name to the URL									
			var delimit = '/_/N-';
			var hrefUrl;
			if(removeUrl.search(delimit) !== -1) {
				var remActUrl = removeUrl.substring(0, removeUrl.indexOf("?"));
				var remAmpLabel = label.replace('&','-');
				var remHashLabel = remAmpLabel.replace('#','-');
				var urlLabel = remHashLabel.replace(' ','-');
				var seoLabel = '-'+urlLabel+delimit;								
				hrefUrl = remActUrl.replace(delimit,seoLabel);
			} else {				
				var remActUrl = removeUrl.substring(0, removeUrl.indexOf("?"));
				var remAmpLabel = label.replace('&','-');
				var remHashLabel = remAmpLabel.replace('#','-');
				var urlLabel = remHashLabel.replace(' ','-');
				var nVal=getParameter('N');
				if(nVal != '' || typeof(nVal) != "undefined" ) {
					hrefUrl = '/'+urlLabel+remActUrl+'?Ntt='+getParameter('Ntt')+'&N='+nVal;
				}
				else {
					hrefUrl = '/'+urlLabel+remActUrl+'?Ntt='+getParameter('Ntt');
				}
			}			
						
			
			if ($target.length == 0 && dimensionName!= 'pageNumberSlider') {
				//check if object exist
				var x= $('#'+dropdownName+'1').find("img")[0];
				
				if (typeof(x) != "undefined"){
					if (dimensionName =="ratingsLTD" || dimensionName =="ratingsLS"){
						if (label.trim() == 'zero-star'){
							$('ul#'+dropdownName).append('<li><a class="refine-check active" data-remove-action="'+removeUrl+'"> <input type="checkbox" CHECKED="CHECKED" class="checked">Not Yet Reviewed <span class="productCount" style="padding-bottom: 50px;">('+productCount+')</span></a></li>');
						}else{
							var nbrOfDigits = (productCount.toString().length);
							if (nbrOfDigits >4){
								nbrOfDigits = 4;
							}
							//set width and left margins dynamically based on number of items
							if (label.trim() == 'five-star'){
								$('ul#'+dropdownName).append('<li data-mutex="stars"><a class="refine-check refine-rating-stars active" data-remove-action="'+removeUrl+'"> <input type="checkbox" CHECKED="CHECKED" class="checked"><div class="filt-mutex--div__star five-star' + nbrOfDigits.toString() + ' review-stars ' + label + ' text-right"><span class="productCount">('+productCount+')</span></div></a></li>');
							}else{
								$('ul#'+dropdownName).append('<li data-mutex="stars"><a class="refine-check refine-rating-stars active" data-remove-action="'+removeUrl+'"> <input type="checkbox" CHECKED="CHECKED" class="checked"><div class="filt-mutex--div__star star' + nbrOfDigits.toString() + ' review-stars ' + label + ' text-right" >&Up <span class="productCount">('+productCount+')</span></div></a></li>');
							}
						}
					}else{						
						if (dimensionName =="sku-gender" || dimensionName =="sku-size" || dimensionName =="sku-color"){
							$('ul#'+dropdownName).append('<li><a class="refine-check active" data-remove-action="'+removeUrl+'" href="'+hrefUrl+'"> <input type="checkbox" CHECKED="CHECKED" class="checked"> '+label+' <span class="productCount">('+productCount+')</span></a></li>');
						}
						else{
							$('ul#'+dropdownName).append('<li><a class="refine-check active" data-remove-action="'+removeUrl+'"> <input type="checkbox" CHECKED="CHECKED" class="checked"> '+label+' <span class="productCount">('+productCount+')</span></a></li>');
						}				
					}
					$target = $('ul#' + dimensionName + ' #refineLIs');
					$('#'+dropdownName).addClass('in');
					var img =$('#'+dropdownName+'1').find("img")[0];
					img.src = "/images/minus-icon.png";
					$('#drop1-a').text("Edit Refinements");
				}else{
					//manual creation of the refinement when everything is selected for that refinement
					if (dimensionName =="sku-gender" || dimensionName =="sku-size" || dimensionName =="sku-color"){
						$('#verticalbar').append(dropdownName+'<span><span id="'+dropdownName+'count"></span>'+'<a id="'+dropdownName+'1" class="togglerefinement" data-target="#'+dropdownName+'" style="float:right;" data-toggle="collapse">'+
								'<img class="img-swap" src="/images/minus-icon.png">'+
						'</a></span><ul id="' + dropdownName+ '"class="collapse in '+dept+'"'+ '><span id="refineLIs"></span>'+'<li><a class="refine-check active" data-remove-action="'+removeUrl+'" href="'+hrefUrl+'"> <input type="checkbox" CHECKED="CHECKED" class="checked"> '+label+' <span class="productCount">('+productCount+')</span></a></li>'+'</ul><hr class="refinement-divider">');
					}
					else{
						$('#verticalbar').append(dropdownName+'<span><span id="'+dropdownName+'count"></span>'+'<a id="'+dropdownName+'1" class="togglerefinement" data-target="#'+dropdownName+'" style="float:right;" data-toggle="collapse">'+
								'<img class="img-swap" src="/images/minus-icon.png">'+
						'</a></span><ul id="' + dropdownName+ '"class="collapse in '+dept+'"'+ '><span id="refineLIs"></span>'+'<li><a class="refine-check active" data-remove-action="'+removeUrl+'"> <input type="checkbox" CHECKED="CHECKED" class="checked"> '+label+' <span class="productCount">('+productCount+')</span></a></li>'+'</ul><hr class="refinement-divider">');
					}
					$('#drop1-a').removeClass('hidden');
					$('#drop1-a').text("Edit Refinements");
				}


				//**************This is the logic to display number of refinements next to refinement Name*********************
				if (i==0){
					saveddropdownName=dropdownName;
				}
				if (saveddropdownName != dropdownName ){					
					//check for 'undefined'  for the scenario when everything is selected for refinement and there is no list anymore
					//but we create a list manually in javascriptabove				
					if (typeof($('#totalAvailableRefinements'+saveddropdownName)).val() == 'undefined'){
						var finalcount= parseInt(addedRefinementsCount);
						$('#'+saveddropdownName+'count').html(' (' + finalcount+')');
					}else{
						var finalcount= parseInt(addedRefinementsCount)+parseInt($('#totalAvailableRefinements'+saveddropdownName).val());
						$('#'+saveddropdownName+'count').html(' (' + finalcount+')');
					}
					addedRefinementsCount=1;
					saveddropdownName=dropdownName;
				}else{
					addedRefinementsCount++;
				}
				if (i== (totalRefinements-1)){					
						if (typeof($('#totalAvailableRefinements'+dropdownName)).val() == 'undefined'){
							var finalcount= parseInt(addedRefinementsCount);
						}else{
							var finalcount= parseInt(addedRefinementsCount)+parseInt($('#totalAvailableRefinements'+dropdownName).val());
						}
					$('#'+dropdownName+'count').html(' (' + finalcount+')');
					
				}
				//**************End of logic to display number of refinements next to refinement Name************************
			}

			// add to dropdown
			if(dimensionName!= 'pageNumberSlider'){
				//$target.append('<li><a class="refine-check active" data-remove-action="' + removeUrl +'"><input type="checkbox" class="hidden-field"><span class="custom checkbox checked"></span> ' + label + ' <span class="productCount">(' + productCount + ')</span></a></li>');
				if (dimensionName =="sku-gender" || dimensionName =="sku-size" || dimensionName =="sku-color"){ 																		
					$target.append('<li><a class="refine-check active" data-remove-action="' + removeUrl +'" href="'+hrefUrl+'"><input type="checkbox" CHECKED class=">' + label + ' <span class="productCount">(' + productCount + ')</span></a></li>');					
				}
				else{
					$target.append('<li><a class="refine-check active" data-remove-action="' + removeUrl +'"><input type="checkbox" CHECKED class=">' + label + ' <span class="productCount">(' + productCount + ')</span></a></li>');
				}			
			}
			// add to selected refinement list
			/* there's a weird issue where if the 3-digit n-value is at the beginning of the url,
			 * selectedRefinement-# counter starts at 1 instead of 0 (see Breadcrumbs.jsp). moving the
			 * 3-digit n-value to the end of the n-value string resolves this issue.
			 */
			/* tested this with jyothish and it seems to be working fine now. commenting out,
			 * leaving this in for future reference in case it happens again.
			 */
			/*
			if (removeUrlN.substring(3,4) == 'Z') {
				removeUrl = removeUrl.split('N-')[0] + 'N-' + removeUrlN.substring(4) + 'Z' + removeUrlN.substring(0,3);
			}
			*/
			var urlParams = window.location.search.substring(1,window.location.search.length);
			var navStateParams =  urlParams.split('&');
			var navState='';
			for(var ni=0;ni<navStateParams.length;ni++){
				if(navStateParams[ni].indexOf('categoryId') >= 0 || navStateParams[ni].indexOf('bookId')>=0 ){
					if(removeUrl.indexOf(navStateParams[ni]) == -1 ){
						if(removeUrl.indexOf('?') != -1){
							navState = '&'+navStateParams[ni];
						}else{
							navState = '?'+navStateParams[ni];
						}
					}
				}
			}

			$('#refineResultsList').append('<li class="button tiny radius secondary selected-refinement"><a href="' + removeUrl + navState + '">' + label + '<span>X</span></a></li>');
		}
		//This function to toggle "+" and "-" on the refinements box
		//$('.togglerefinement').bind("click", function() {
		$('body').on('click', '.togglerefinement', function(){
			var img = $(this).find("img")[0];
			if (img.src.indexOf("plus-icon.png")>=0) {
		        img.src = "/images/minus-icon.png";
		        //alert("1");
		    } else {
		        img.src = "/images/plus-icon.png";
		        //alert("2");
		    }
		});

		// dropdown checkbox click handlers
		$('body').on('click', '.refine-check', function(e){
			e.preventDefault();
			var $this = $(this);
				//$check = $this.children('.custom.checkbox');
			var $check = $this.children("input:checkbox");
				$this.toggleClass('active');
				$check.toggleClass('checked');				
				setTimeout(function() {					
			        if( $check.hasClass("checked") ) {
			        	$check.attr("CHECKED","CHECKED");     
					} else{
						$check.attr("CHECKED",false).removeAttr("CHECKED");
					}	           
		         }, 120);
		});

		$("li[data-mutex]").on("click", function(){ 
			//    Mutually Exclusive Checkboxes QC 19
			$(this).attr("data-mutex-self", "self");
			$("li[data-mutex='"+$( this ).attr("data-mutex")+"']").each(function(){
			if( $(this).attr("data-mutex-self") != "self"){
				 $(this).removeClass('active');
				 $(this).find("input:checkbox[checked]").trigger('click');
				 $(this).find("input:checkbox").removeClass('checked').attr("CHECKED",false).removeAttr("CHECKED");
			 }
			});
			$("li[data-mutex]").removeAttr("data-mutex-self");
		});

		// multiselect refinement logic
		var BASE_N_VALUES = [],
			isSEO = false,
			nDelimiter = '+',
			refinementDropdowns = $('.refinement-dropdown');

		if (window.location.href.search('/_/N-') !== -1) {
			isSEO = true;
			nDelimiter = 'Z';
		}
		else if ($('.refine-check').data('add-action') !== null && $('.refine-check').data('add-action') !== undefined) {
			if ($('.refine-check').data('add-action').search('/_/N-') !== -1) {
				isSEO = true;
				nDelimiter = 'Z';
			}
		}

		if (getNValue(window.location.href) !== '') {
			BASE_N_VALUES = getNValue(window.location.href).split(nDelimiter);
		}

		// Initialize the selectors
		for (var i=0; i<refinementDropdowns.length; i++) {
			initializeSelector(refinementDropdowns[i].id);
		}

		//Initializing the page slider selected refinement
		if(totalRefinements == 1){
			var $refinement = $('#selectedRefinement-0'),
				dimensionName = $refinement.data('dimension-name');
			if(dimensionName == 'pageNumberSlider'){
				initializeSelector($refinement);
			}
		}

		// consolidate reset refinements buttons if necessary
		var $allResets = $('.reset-refinements'),
			allResetsLength = $allResets.length,
			resetAllUrl = '';
		if (allResetsLength > 0) {
			resetAllUrl = $allResets[0].href;
		}
		if (allResetsLength > 1) {
			for (var i=1; i<allResetsLength; i++) {
				resetAllUrl = getCombinedRemovalLink(resetAllUrl, $allResets[i].href);
			}
			resetAllUrl = resetAllUrl.replace('_/N-?', '?');
			$allResets.parents('li').remove();
			$('#refineResultsList').append('<li class="button tiny radius secondary selected-refinement"><a class="reset-refinements" href="' + resetAllUrl + '">Reset Refinements</a></li>');
		}
		// end of multiselect refinement logic
	}

	//Page Slider
	var bookPageMaxLimit = $('#bookPageMaxLimit').val();
	if('' == bookPageMaxLimit || 0 == bookPageMaxLimit || undefined ==bookPageMaxLimit){
		bookPageMaxLimit = 500;
	}
	var minPage = 1, // min selectable page... i.e. first value on slider range
		maxPage = bookPageMaxLimit, // max selectable page... i.e. last value on slider range
		pageURL= $(location).attr('href'),
		indexer = window.location.search.indexOf('Nf'),
		minIndex = 0,
		maxIndex= bookPageMaxLimit,
		pageNumber = $('#pageNumber').val();

	if (indexer >= 0 ){
		if (pageURL.indexOf('&Nf') >= 0) {
			var navStateParams =  pageURL.split('&');
			pageURL = navStateParams[0];
			for (var i=1;i<navStateParams.length;i++) {
				if (navStateParams[i].indexOf('Nf') < 0) {
					pageURL += '&'+navStateParams[i];
				}
			}
		}
		else if (pageURL.indexOf('?Nf') >= 0) {
			pageURL = pageURL.substring(0,pageURL.indexOf('?'));
			if (pageURL.indexOf('&') != -1) {
				pageURL = pageURL + '?' + pageURL.substring(pageURL.indexOf('&') + 1, pageURL.length);
			}
		}

		var pageRangeSelected = $("#pageRangeSelected").val();
		pageRangeSelected = pageRangeSelected.substring(pageRangeSelected.indexOf('BTWN'));
		var arraa = pageRangeSelected.split(' ');
		minIndex = parseInt(arraa[1]);
		maxIndex = parseInt(arraa[2]);
	}
	$(function() {
		if($('#slider-range').val() != undefined){
			$("#slider-range").slider({
				range: true,
				min: minPage,
				max: maxPage,
				values: [minIndex, maxIndex],
				slide: function(event, ui) {
					$("#pageRange").val(ui.values[0] + " - " + ui.values[1] );
				}
			});
			$("#pageRange").val($("#slider-range").slider("values", 0) + " - " + $("#slider-range").slider("values", 1));
		}
	});

	/*************************************************************************
	 * TEALIUM TAGGING
	 * -If you need to add a new tealium event (utag.link), use fireTealiumEvent()
	 * -If you need to add a new tealium page view (utag.view), then use fireTealiumPageView().
	 * -Only add tealium calls here if they aren't going to be executed at page load (even if they're an "event").  If something needs to be
	 * executed at page load, add it into the space in tealium.jsp.
	 ************************************************************************/

	/* event54 & 55 - personal & business signup
	 * heard about
	 */
	//Commented account creation, code was moved to droplet LR
	//$('#loginPer').on('submit', function(){
	//	var heard = $('#createPerAccount-heardFrom').val();
	//	var business = $('#createNewAccountCreateB2BAccount').is(':checked');
	//	var accountEvent = business ? "e_business_sign_up" : "e_personal_sign_up";

	//	fireTealiumEvent({
	//		"hear_about" : heard,
	//		accountEvent : "t"
	//	});

	//});

	/* Apply coupon event */
	$('#submitCoupon').on('submit', function(){
		var coupon =  $('#applyCouponInput').val();
		fireTealiumEvent({"coupon_id" : coupon});
	});

	$('#coupon').on('submit', function(){
		var coupon =  $('#applyCouponInput').val();
		fireTealiumEvent({"coupon_id" : coupon});
	});

	/* event 15 - browsing history clicks */
	$('.browse-history .prod-item a').click(function(event) {
		fireTealiumEvent({"e_browse_history" : "t"});
	});

	/* event 14 - customer review click */
	$('#reviews').click(function(event) {
		fireTealiumEvent({"e_customer_reviews" : "t"});
	});

	// Trigger bv review modal when writeReview=t, or jump down to the reviews if showReviews=t
	var params = window.location.search.substring(1).split('&');
	params.forEach(function(item){
		var split = item.split('=');
		if (split[0] == 'writeReview' && split[1] == 't') {
			if(typeof submitReview == 'function') {
				submitReview();
			}
		} else if (split[0] == 'showReviews' && split[1] == 't') {
			$('#reviews').trigger('click');
			$("html, body").delay(2000).animate({ scrollTop: $('#reviews').offset().top }, 1500);
		}
	});	
	setTimeout(function() {
		$(document).foundation();
		$(document).foundation('interchange', 'reflow');
	}, 1500);
});
$(window).load(function(){
	//  Set dimensions of background gray element (off-canvas jquery plug-in zf3)
	$(".exit-off-canvas").css("height", $(document).height());
	$(".exit-off-canvas").css("width", $(document).width());
	var oTOgenAlt = window.setTimeout(genAlt, 480);
	setAcs_skip();
});

function getParameter(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
