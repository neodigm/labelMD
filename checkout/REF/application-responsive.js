/*
 * application-responsive.js
 *
 * this file provides the functionality of /media/ltd/application.js in the 10.2 site, but has been
 * updated to work with the responsive pages of the 10.2.1 site. the file /media/ltd/application.js
 * is not included in the responsive pages so as to keep the js includes to a minimum.
 *
 * basic modal functionality can be found in ltd.modal.js
 *
 * basic pdp functionality can be found in pdp.js
 *
 */
$(function() {

	$("#tabs a").click(function (){
		if($(this).parent().hasClass("selected")){
			return false;
		}
		$("#tabs li").each(function (){
			$(this).removeClass("selected");
		});
		$(this).parent().addClass("selected");
		$("#mainContent .tab").each(function (){
			$(this).hide();
		});
		var id="#tab_"+$(this).attr("id");
		$(id).show();
		return false;
		}
	);

// FAQ-Clicked-On-Contact-Us-Open.jsp
$("div#mainContent .contentBlock a.buttonLinkLTD").click(function(event){
	if ($(this).hasClass("hideFAQs")) {
		if ($('#secondaryContent').hasClass('hidden')) {
			$('#secondaryContent').removeClass('hidden');
			$('.hideFAQs img').attr("src",CONTEXT_ROOT+"media/ltd/images/buttons/hide-faqs.gif");
			$('.hideFAQs img').attr("alt","Hide FAQs");
		}
		else {
			$('#secondaryContent').addClass('hidden');
			$('.hideFAQs img').attr("src",CONTEXT_ROOT+"media/ltd/images/buttons/view-all-faqs.gif");
			$('.hideFAQs img').attr("alt","Show All FAQs");
		}
		return;
	}
	if ($('#secondaryContent').hasClass('hidden')) {
		$('.hideFAQs img').click();
	}
});
$("div#mainContent .contentBlock a.buttonLinkLS").click(function(event){
	if($(this).hasClass("hideFAQs")) {
		if($('#secondaryContent').hasClass('hidden')) {
			$('#secondaryContent').show();
			$('.hideFAQs img').attr("src",CONTEXT_ROOT+"media/lakeside/images/buttons/hide-faqs.gif");
			$('.hideFAQs img').attr("alt","Hide FAQs");
		}
		else {
			$('#secondaryContent').hide();
			$('.hideFAQs img').attr("src",CONTEXT_ROOT+"media/lakeside/images/buttons/view-all-faqs.gif");
			$('.hideFAQs img').attr("alt","Show All FAQs");
		}
		return;
	}
	if ($('#secondaryContent').hasClass('hidden')) {
		$('.hideFAQs img').click();
	}
});



	window.tabClickEvent = function(e) {
		e.preventDefault();
		e.stopPropagation();

		var $el = $(this),
			contentDiv = $($el.find('a').attr('href')),
			tabClass = 'selected',
			contentClass = 'active';

		//Add class to clicked tab
		$el.siblings('.'+tabClass)
			.removeClass(tabClass)
			.end()
			.addClass(tabClass);

		//Show associated content container
		contentDiv.siblings('.'+contentClass)
			.removeClass(contentClass)
			.end()
			.addClass(contentClass);

	}

	$('.tabbedContent .tabs li').click(window.tabClickEvent);

	var quickViewOnPage = $('#quickView').length ? $('#quickView') : $('#quickView1');
	quickViewOnPage.delegate('.tabbedContent .tabs li', 'click', window.tabClickEvent);

	// toggles top nav menu on hover over
	$("#topNav li").each(function() {
		$(this).hover(function () {
			$(this).toggleClass("selected");
		});
	});

	$("#topNav li a#moreDepartmentsLink").click(function(e) {
			e.preventDefault();
		$(this).parent().siblings().removeClass('selected');
		$(this).parent().toggleClass("selected");
		$('ul#shopCatalogs').hide();
		$('ul#child').hide();
		$('ul#moreDepartments').toggle();
	});

	$("#quickSearch-query").result(function(event, data, formatted) {
		if (data) {
			$(this).parent().next().find("input").val(data[1]);
		}
	});

	//this function clears the search input box upon a click
	$("#quickSearch-query").click(function() {
		if ($(this).val() == 'Search item# or keyword') {
			$(this).val('');
		}
	});

	$("#quickSearch-query").blur(function() {
		if ($(this).val() == '') {
			$(this).val("Search item# or keyword");
		}
	});

	// Toggles product navigation menu
	$('#productNav a.toggle').each(function() {
		$(this).siblings("ul.hidden").hide().removeClass("hidden");
		$(this).click(function() {
			if ($(this).parent().hasClass("selected")) {
				$(this).siblings("ul").hide(0, function() {
					$(this).parent().removeClass("selected");
				});
			} else {
				$(this).parent().addClass("selected");
				$(this).siblings("ul").show();
			}
			return false;
		});
	});

	$('.customerService dt').each(function() {
		$(this).siblings('dd').hide();

		$(this).click(function() {
			$(this).toggleClass('selected');
			$(this).siblings('dd').toggle();
		});
	});

	$('#splitCardOne label.inputCheckbox.selectToggle input').live('click', function() {
			$('#splitCardTwo').toggle();
			$('#payWithBillMeLater').toggle();
			$('#orderTotalTextBox').toggle();
			$('#continueWithCCButton').toggle();
	});

	$('#accountUpdate label.inputCheckbox.selectToggle input').each(function() {
		$(this).click(function() {
			$('.toggleContent').toggle();
		});
	});

	$('#accountCreation label.inputCheckbox.selectToggle input').each(function() {
		$(this).click(function() {
			$('.toggleContent').toggle();
		});
	});



	$('.updatQtyField').keypress(function(e) {
		handleUpdateQuantityKeyPress(e);
	});

	$('#applyCouponInput').keypress(function(e) {
		handleApplyCouponKeyPress(e);
	});

	/*
	Tom Says:  I removed this becuase for some reason it was
	Getting called multiple times so it was showing and hiding the div

	$('#shippingAddress label.inputRadio.selectToggle input').each(function() {
		$(this).click(function() {

		});
	});
	*/

	// This is the Billing   Same as Shipping Address   checkbox
	$('#billingAddress label.inputCheckbox.selectToggle input').each(function() {
		$(this).click(function() {
			if ( $("#sameAsShippingCheckbox").is(":checked") ) {
				$('#billingSameAsShipping').val('true');
				$("#billingAddress .toggleContent").hide();
				/*
				$("#billingAddress-companyName").val($("#shippingAddress-companyName").val());
				$("#billingAddress-firstName").val($("#shippingAddress-firstName").val());
				$("#billingAddress-lastName").val($("#shippingAddress-lastName").val());
				$("#billingAddress-address1").val($("#shippingAddress-address1").val());
				$("#billingAddress-address2").val($("#shippingAddress-address2").val());
				$("#billingAddress-city").val($("#shippingAddress-city").val());
				$("#billingAddress-state").val($("#shippingAddress-state").val());
				$("#billingAddress-postalCode").val($("#shippingAddress-postalCode").val());
				//$("#billingAddress-phoneNumber").val($("#shippingAddress-phoneNumber").val());
				*/
			} else {
				$('#billingSameAsShipping').val('false');
				$('#billingAddress .toggleContent').show();
				/*
				$("#billingAddress-companyName").val("");
				$("#billingAddress-firstName").val("");
				$("#billingAddress-lastName").val("");
				$("#billingAddress-address1").val("");
				$("#billingAddress-address2").val("");
				$("#billingAddress-city").val("");
				$("#billingAddress-state").val("");
				$("#billingAddress-postalCode").val("");
				//$("#billingAddress-phoneNumber").val("");
				*/
			}
		});
	});

	$('#shippingAddress label.inputRadio input:not(:hidden):not(:last)').click(function() {
//	$('#shippingAddress label.inputRadio input:not(:last)').click(function() {
		$('#shippingAddress .toggleContent').hide();
	});

	$('#billingAddress label.inputRadio input:not(#billingAddress label.inputRadio.selectToggle.subToggle input)').click(function() {
		$('#billingAddress .toggleContent.subToggle').hide();
	});

	$('#billingAddress label.inputRadio.selectToggle.subToggle input').change(function() {
		if ($('#billingAddress label.inputRadio.selectToggle.subToggle input:checked')) {
			$('#billingAddress .toggleContent.subToggle').show();
		}
	});

	$('.account #content #secondaryContent h2').each(function() {
		$(this).click(function() {
			$('.account #content #secondaryContent h2:not(this)').removeClass('selected').next('.contentBlock').removeClass('selected');
			$(this).toggleClass('selected').next('.contentBlock').toggleClass('selected');
		});
	});

	$('.forgotPassword').click(function() {
		$('.signin #content form #signIn fieldset div.modified').toggle();
		return false;
	});

	$('.hideFAQs').click(function() {
		$('.customerService dd').hide();
	});

	$('.a-img-swap').click(function() {
		var x = this.id;
		x=x.substring(1);
		if($('#2'+x).hasClass('in')){
			//CLOSE IN
			document.getElementById('2'+x).style.display="none";
			$('#1'+x).removeClass("minus");
			$('#1'+x).addClass("plus");
			$target2 = $('#sidebar #' + x);
			$target2.children('ul').removeClass('in');
			$target2.children('ul').children('li').children('ul').removeClass('in');
			var myList = $target2.children('ul').children('li').find('.has-image');
			for (var i = 0; i < myList.length; i++) {
				var y=myList[i].id;
					$('#'+y).removeClass("minus");
					$('#'+y).addClass("plus");
			}

		}else {
			//OPEN
			//this code to close all top level categories and their children if the other top level was clicked
			if($('#2'+x).hasClass('top-level')){
				$target = $('#mobile');
				var topLevelList = $target.children('li');
				for (var i = 0; i < topLevelList.length; i++) {
					var y = topLevelList[i].id;
					if (x != y ){
						if ($('#1'+y).hasClass('minus') || $('#1'+y).hasClass('plus')){
							$('#1'+y).removeClass("minus");
							$('#1'+y).addClass("plus");
							$('#2'+y).removeClass("in");
							document.getElementById('2'+y).style.display="none";
						}
						//this is going to the second level category
						var subTopLevelList = $('#2'+y).children('li');
						for (var j = 0; j < subTopLevelList.length; j++) {
							var z = subTopLevelList[j].id;
							if ($('#1'+z).hasClass('minus') || $('#1'+z).hasClass('plus')){
								$('#1'+z).removeClass("minus");
								$('#1'+z).addClass("plus");
								$('#2'+z).removeClass("in");
							}
						}
						//end of second level
					}

				}
			}
			//end
			//the folloiwng code to close the second level categories which are sublings to the one that was clicked
			if($('#2'+x).hasClass('second-level')){
				var secondLevelList = $('#sidebar #'+x).siblings().children('ul');
				for (var m = 0; m < secondLevelList.length; m++) {
					var z = secondLevelList[m].id.substring(1);
					$('#1'+z).removeClass("minus");
					$('#1'+z).addClass("plus");
					$('#2'+z).removeClass("in");
				}
			}
			//end
			$('#2'+x).addClass('in');
			$('#1'+x).removeClass("plus");
			$('#1'+x).addClass("minus");
			document.getElementById('2'+x).style.display="block";
		}
	});

	//this function is not being used, was created for the first prototype
	$('.img-swap').click(function() {
		var x = this.id;
		x=x.substring(1);
		if($('#2'+x).hasClass('in')){
			//$('#2'+x).removeClass('in');
			document.getElementById('2'+x).style.display="none";
			//$('#2'+x).style.display="none";
			$('#1'+x).attr("src", "/images/plus-icon.png");
			$target2 = $('#sidebar #' + x);
			//target2.parents('ul.collapse').removeClass('in');
			//target2.children('a').removeClass('selected');
			$target2.children('ul').removeClass('in');
			$target2.children('ul').children('li').children('ul').removeClass('in');
			var myList = $target2.children('ul').children('li').find('img');
			for (var i = 0; i < myList.length; i++) {
				var y=myList[i].id;
				if ($('#'+y).hasClass('has-image')){
					myList[i].src="/images/plus-icon.png";
				}
			}

		}else {
			$('#2'+x).addClass('in');
			$('#1'+x).attr("src", "/images/minus-icon.png");
			document.getElementById('2'+x).style.display="block";
		}
	});

	// Add error message container to input
	//$('label.required.error').append('<div><em>Error - please re-enter</em></div>');

	// Check/Uncheck elements
	$('#shippingAddress label.inputRadio input').change(function() {
		if ($('#shippingAddress label.inputRadio input:checked')) {
			$('#shippingAddress label.inputRadio input:not(this)').next('span').removeClass('selected');
			$(this).next('span').addClass('selected');
		}
	});

	$('#billingAddress label.inputRadio input').change(function() {
		if ($('#billingAddress label.inputRadio input:checked')) {
			$('#billingAddress label.inputRadio input:not(this)').next('span').removeClass('selected');
			$(this).next('span').addClass('selected');
		}
	});

	// Textarea Character Count
	$('#comment').keyup(function(){
		limitChars('comment', 110, 'label.textareaBox');
	})

	$('#cart-comment').keyup(function(){
		limitChars('cart-comment', 110, 'label.textareaBox');
	})

	//$('.togglerefinement').click(function() {
	/*$('.togglerefinement').bind("click", function() {
		//var text = $(this).text();
		// $(this).text(
		//text == "+" ? "-" : "+");
		var img = $(this).find("img")[0];
		if (typeof(img) != "undefined"){
			alert("defined");
		}else{
			alert("undefined");
		}
		if (img.src.indexOf("plus-icon.png")>=0) {
	        img.src = "/images/minus-icon.png";
	        alert("1");
	    } else {
	        img.src = "/images/plus-icon.png";
	        alert("2");
	    }

	});*/

	$('#drop1-selector-cancel').click(function() {
		location.replace(location.href);
	});

	$('.popUp2').click(function() {
		if($(this).hasClass('email')){
			$('.tellAFriendPopup').removeClass('hidden');
			return false;
		}else if($(this).hasClass('videoBtn')){
			$('.videoPopup').removeClass('hidden');
			return false;
		}
		$('div#popUpWindow2').removeClass('hidden');
		return false;
	});

	$('a#closePopUp').click(function() {
		$('div#popUpWindow').addClass('hidden');
		$('div#popUpWindow2').addClass('hidden');
		$('div.popUpWindow2').addClass('hidden');
		$('div#popUpWindow3').addClass('hidden');
		$('div#quickView').addClass('hidden');
		$('div#quickCartPopup').addClass('displayNone');
		return false;
	});

	$('body').click(function() {
		$('div#popUpWindow').addClass('hidden');
		$('div#popUpWindow2').addClass('hidden');
		$('div.popUpWindow2').addClass('hidden');
		$('div#popUpWindow3').addClass('hidden');
		//$('div#quickView').addClass('hidden'); comment out by David Zhao
		$('div.videoPopup').addClass('hidden');
	});

	$('#johnMyAccountInput').keyup(function() {
		if (this.value.match(/[^a-zA-Z/' ]/g)) {
			this.value = this.value.replace(/[^a-zA-Z/' ]/g, '');
		}
	});


/*
	$('#calculateShippingForm').live('submit', function() {
		// bind form using 'ajaxForm'
		$('#calculateShippingForm').ajaxSubmit(calculateShippingFormOptions);
		return false;
	});


	$('#cartShippingStateSelect').live('change', function() {
		var newState = $(this).val();
		$('#shippingChartStateSelect').val(newState);
		$('#calculateShippingForm').ajaxSubmit(calculateShippingFormOptions);

	});

	*/

	$("#cartShippingStateSelect").on('change', updateOrderShipping);


	$('a.closeButton').click(function() {
		// $(this).parent().parent().parent().parent().addClass('hidden');
		$('div#popUpWindow').addClass('hidden');
		$('div#popUpWindow2').addClass('hidden');
		$('div.popUpWindow2').addClass('hidden');
		$('div#popUpWindow3').addClass('hidden');
		$('div#quickView').addClass('hidden');
		$('div#quickCartPopup').addClass('displayNone');
		$('a.quickViewHover').addClass('hidden');
		return false;
	});

	$('div#popUpWindow').click(function(event){
		event.stopPropagation();
	});

	$('div#popUpWindow2').click(function(event){
		event.stopPropagation();
	});

	$('div.popUpWindow2').click(function(event){
		event.stopPropagation();
	});

	$('div#quickView').click(function(event){
		event.stopPropagation();
	});

	$('div.videoPopup').click(function(event){
		event.stopPropagation();
	});

	$('.popUp').click(function() {
		if ($(".infoImg").length && $(".zoomImg").length) {
			LargeImagesDisplay('start');
		}
		$('div#popUpWindow').removeClass('hidden');
		return false;
	});

	window.personalizationModalDisplay = function(e) {
		e.preventDefault();
		e.stopPropagation();

		var popup = $('.personalPopup').eq(0),
			qv = $(this).closest('#quickView, #quickView1').length ? true : false,
			topPosition = ($(window).scrollTop() + 100) + 'px',
			qvEl = $('#quickView').length ? $('#quickView') : $('#quickView1');

		if(qv)
		{
			//Attach popup contents to body tag to avoid quickview interference
			popup.detach()
				.insertAfter(qvEl);

			//Mimic position of quickview
			topPosition = (parseInt(qvEl.css('top'), 10) + 10) + 'px';
			popup.css({
				'left': qvEl.css('left'),
				'margin-left': qvEl.css('margin-left')
			});

			//Hide quickview
			qvEl.addClass('hidden');
		}

		popup.removeClass('hidden')
			.css('top', topPosition)
			.find('#closePopUp').click(function(e){
				popup.addClass('hidden');
				qvEl.removeClass('hidden');
				$(this).unbind();
				return false;
			});
	}

	$('.galleryNav a.personalization').click(window.personalizationModalDisplay);

	$('#persistentCart a.view').click(function() {
		$('div#quickCartPopup').removeClass('displayNone');
		setTimeout(function() {
			$('div#quickCartPopup').addClass('displayNone');
		}, 3500);
		return false;
	});

	$('#showFlyOut').click(function() {
		$('div#quickCartPopup').removeClass('displayNone');
		setTimeout(function() {
			$('div#quickCartPopup').addClass('displayNone');
		}, 3500);
		return false;
	});

	$('a#closeViewLarger').click(function() {
		$('div#viewLarger').addClass('hidden');
		$('div#previewPage').removeClass('hidden');
		$('div#sizeChartPage').addClass('hidden');
		return false;
	});

	$('a#largerViewBtn').click(function() {
		$('div#viewLarger').removeClass('hidden');
		$('div#previewPage').addClass('hidden');
		$('div#sizeChartPage').addClass('hidden');
		return false;
	});


	$('a#sizeChartBtn').click(function() {
		$('div#viewLarger').addClass('hidden');
		$('div#previewPage').addClass('hidden');
		$('div#sizeChartPage').removeClass('hidden');
		return false;
	});

	$('#add-cc1').live('change', function(){
		updateSelectedCreditCardForCheckout('#add-cc1');
	});

	$('#add-cc2').live('change', function(){
		updateSelectedCreditCardForCheckout('#add-cc2');
	});

	$('div.item a').mouseenter(function(event){
		$(this).next('a.quickViewHover').removeClass('hidden');
	});

	$('div.item a').mouseleave(function(event){
		$(this).next('a.quickViewHover').addClass('hidden');
	});

	$('a.quickViewHover').hover(function(event){
		$(this).removeClass('hidden');
	});

	$('#closeViewLarger').click(function() {
		$('div#previewPage').removeClass('hidden');
		$('div#viewLarger').addClass('hidden');
		$('div#sizeChartPage').addClass('hidden');
		return false;
	});

	$('.closeViewLarger').click(function() {
		$('div#sizeChartPage').addClass('hidden');
		$('div#previewPage').removeClass('hidden');
		$('div#viewLarger').addClass('hidden');
		return false;
	});


	$('a#previewPage').click(function() {
		$('div#viewLarger').removeClass('hidden');
		$('div#previewPage').addClass('hidden');
		$('div#sizeChartPage').addClass('hidden');
		return false;
	});

	// email sign-in from the home page
	$("#homeSubscribe-form").submit(function(){
		// email verification
		var emailVal = $("#homeSubscribe-email").val();
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if (emailVal == ''){
			$("#homeSubscribe-email").val("Please Enter Your Email");
			return false;
		}else if (!emailReg.test(emailVal)){
			$("#homeSubscribe-email").add().css("color","#990000");
			$("#homeSubscribe-email").val('Please Enter a Valid Email');
			return false;
		};
	});

	$("#homeSubscribe-email").focus(function(){
		//$("#footerSubscribe-email").val("");
		$("#homeSubscribe-email").add().css("color","#999");
		$("#homeemail").replaceWith("<span id='homeemail'>We will never sell your email address. To learn more read our </span>");
		document.getElementById("homeemail1").style.visibility = 'visible';
		return false;
	});

// for the new home page
	$("#emailSubscribeAddress").focus(function(){
		$("#emailSubscribeAddress").add().css("color","#999");
		return false;
	});


// email sign-in from the footer
	$("#footerSubscribe-form").submit(function(){
		// email verification
		var emailVal = $("#footerSubscribe-email").val();
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if (emailVal == ''){
			$("#footerSubscribe-email").val("Please enter the email address");
			return false;
		}else if (!emailReg.test(emailVal)){
			$("#footerSubscribe-email").add().css("color","#990000");
			$("#footerSubscribe-email").val('Please enter a valid email address');
			return false;
		};
	});

	$("#footerSubscribe-email").focus(function(){
		//$("#footerSubscribe-email").val("");
		$("#footerSubscribe-email").add().css("color","#999");
		$("#footer1").replaceWith("<em id='footer1'>Sign-Up for Exclusive</em>");
		$("#footer2").replaceWith("<span id='footer2'>Offers and Previews</span>");
		return false;
	});

	//
	$('.addAllButton').live("click", function() {
		//$('#favoritesForm2').submit();
		$('#addAllItemsToOrderButton2').click();
	});

	//execute search on 'enter'
	$('#quickSearch-query').keypress(function(event) {
		if (event.keyCode == '13') {
			$('#quickSearch-submit').click();
			return false;
		}
	});

	//hide the toggle link next to nav items that don't have the <ul> element on the same level
	$('ul.nav a.toggle').each(function() {
		if($(this).nextAll('ul').children().size() == 0) {
			$(this).addClass('displayNone');
		}
	});
});

	function homePromoCarouselMove(pageNumber) {
		var iCount = 0;
		$("#homePromoCarousel .jcarousel-control > li").each(function() {
			iCount = iCount + 1;
			if ($(this).attr('class') == pageNumber)
				$(this).addClass("selected");
			else
				$(this).removeClass("selected");
		});

		var liSize = $("#homePromoCarousel .carousel > li").size();
		if (pageNumber == 1)
			$("#homePromoCarousel li.prev").addClass("hidden");
		else
			$("#homePromoCarousel li.prev").removeClass("hidden");
		if (pageNumber == liSize)
			$("#homePromoCarousel li.next").addClass("hidden");
		else
			$("#homePromoCarousel li.next").removeClass("hidden");

		var iShow = 0;
		$("#homePromoCarousel .carousel > li").each(function() {
			iShow = iShow + 1;
			if (iShow == pageNumber) {
				$(this).fadeIn("slow");
			}
			else {
				$(this).hide();
			}
		});
	}

	function closeQuickView() {
		$('div#quickView').addClass('hidden');
		$('a.quickViewHover').addClass('hidden');
		$('div#quickView').empty();
		return false;
	}

function updateRemovalFromGiftlist(giftlistItemID) {
	$("#removalGiftListInput").val(giftlistItemID);
	submitFormUpdateGiftlist();
}

function submitFormUpdateGiftlist() {
	$("#updateWishlistButton").click();

}

function updatePostOrderForm1 (theForm) {

	//$(this).parents('form:first');

	//var a = document.getElementById("thedropdown");
	//alert(a.options[a.selectedIndex].value);
	var promoEmail = $('#promoEmail').val();
	//alert(promoEmail);
	$('#createPerAccount-promoEmail').val(promoEmail);

	var CreateB2BAccount = $('#CreateB2BAccount').val();
	//alert(CreateB2BAccount);
	$('#createPerAccount-createBusinessAccount').val(CreateB2BAccount);


	var state = $('#state').val();
	//alert(b);
	$('#createPerAccount-state').val(state);


	var heardFrom = $('#heardFrom').val();
	//alert(heardFrom);
	$('#createPerAccount-heardFrom').val(heardFrom);
//	s.c_w('v46', heardFrom);

	$(theForm).find('input[name^="createPerAccount-"]').each(function(index) {
		//alert(index + ': ' + $(this).val());

		var idName = $(this).attr('name');
		//alert(idName);
		var theVal = $(this).val();
		//alert(theVal);
		$('#' + idName).val(theVal);


	});

/*
	var fName = $('#modal-createPerAccount-firstName').val();
	var lName = $('#modal-createPerAccount-lastName').val();
	var emailAddr = $('#modal-createPerAccount-email').val();
	var emailConfirm = $('#modal-createPerAccount-confirmEmail').val();
	var pword = $('#modal-createPerAccount-password').val();
	var pwordConfirm = $('#modal-createPerAccount-confirmPassword').val();

	alert("Form vals: " + fName + ", " + lName + ", " + emailAddr + ", " + emailConfirm + ", " + pword + ", " + pwordConfirm );


	$('#createPerAccount-firstName').val(fName);
	$('#createPerAccount-lastName').val(lName);
	$('#createPerAccount-email').val(emailAddr);
	$('#createPerAccount-confirmEmail').val(emailConfirm);
	$('#createPerAccount-password').val(pword);
	$('#createPerAccount-confirmPassword').val(pwordConfirm);

	alert("email vals: " + $('#createPerAccount-email').val());

*/
}



function updatePostOrderForm (theForm) {

	//$(this).parents('form:first');


	$(theForm).find('input[name^="createPerAccount-"]').each(function(index) {
		//alert(index + ': ' + $(this).val());

		var idName = $(this).attr('name');

		var theVal = $(this).val();

		$('#' + idName).val(theVal);


	});

/*
	var fName = $('#modal-createPerAccount-firstName').val();
	var lName = $('#modal-createPerAccount-lastName').val();
	var emailAddr = $('#modal-createPerAccount-email').val();
	var emailConfirm = $('#modal-createPerAccount-confirmEmail').val();
	var pword = $('#modal-createPerAccount-password').val();
	var pwordConfirm = $('#modal-createPerAccount-confirmPassword').val();

	alert("Form vals: " + fName + ", " + lName + ", " + emailAddr + ", " + emailConfirm + ", " + pword + ", " + pwordConfirm );


	$('#createPerAccount-firstName').val(fName);
	$('#createPerAccount-lastName').val(lName);
	$('#createPerAccount-email').val(emailAddr);
	$('#createPerAccount-confirmEmail').val(emailConfirm);
	$('#createPerAccount-password').val(pword);
	$('#createPerAccount-confirmPassword').val(pwordConfirm);

	alert("email vals: " + $('#createPerAccount-email').val());

*/
}


function updateAddToCartFromWishlistFormFields(giftItemId) {
	// see application-non-responsive.js
}

function validatePickerSelection(isQV){
	var firstpickerselected=false;
	var secondpickerselected=false;
	$("#firstPicker > li > a").each(function() {
		if ($('#firstPicker a.blue').length != 0){
			firstpickerselected=true;
		}
	});
	if (isQV){
		if ($('#quickView #secondPicker').length == 0) {
			secondpickerselected=true;
		}
		if ($('#quickView #firstPicker').length == 0) {
			firstpickerselected=true;
		}
	}
	if (!document.getElementById("secondPicker")) {
		secondpickerselected=true;
	}
	if (!document.getElementById("firstPicker")) {
		firstpickerselected=true;
	}
	$("#secondPicker > li > a").each(function() {
		if ($('#secondPicker a.blue').length != 0){
			secondpickerselected=true;
		}
	});
	if(!firstpickerselected || !secondpickerselected){
		var $personalizationErrors = $('#personalizationErrors'),
			$errorContainer = $('.product-error'),
			error = "<ul id='personalizationErrors'><li>! Please select your choice before adding to cart.</li></ul>";
		if (isQV) {
			$personalizationErrors = $('#quickView #personalizationErrors');
			$errorContainer = $('#quickView .product-error');
		}
		$personalizationErrors.remove();
		$errorContainer.prepend(error);
		return false;
	}
	else {
		return true;
	}
}


$.fn.validatePersonalized = function(isQV, callback){
	var form = $(this),
		labels = form.find('label'),
		len = labels.length,
		methods = validationMethods(),
		errors = {
			display: false,
			messages: {}
		};


	//Initialize profanity service
	$.webpurify.init();
	$("small").remove(".resp_error");
	//Loop through all field elements
	for(var i = 0; i < len; i++)
	{
		var el = labels.eq(i),
			container = el.closest('.fieldContainer'),
			validators = el.attr('class') ? el.attr('class').split(' '): '',
			valLen = validators.length,
			fieldValid = true;
			//container.removeClass('error')
		//Loop through all validators for current field
		for(var y = 0; y < valLen; y++)
		{
			var validator = $.trim(validators[y]),
				valid = true;

			if(methods[validator])
			{
				var input = el.find('input').length ? el.find('input') : el.next('input, select'),
					value = input.val() === input.attr('placeholder') ? '' : $.trim(input.val());


				if(value || validator === 'required')
				{
					valid = methods[validator].method(input);
				}

				if(!valid)
				{

					errors.display = true;
					//errors.messages[validator] = methods[validator].message;
					fieldValid = false;
					fieldValid ? container.removeClass('error') : container.after('<small class="resp_error">' +  methods[validator].message + '</small>');

				}
			}
		}

		//fieldValid ? container.removeClass('error') : container.addClass('error');

	}
	//**************************This is a hack to determine which field has a profanity*************************************

	var labelsprofanity = labels.filter('.profanity');
	var lenprofanity = labelsprofanity.length;

	for(var i = 0; i < lenprofanity; i++)
	{
		var el = labelsprofanity.eq(i)
		var container = el.closest('.fieldContainer')
		checkProfanity1(el, displayPersonalizationErrors);

	}

	function checkProfanity1(el, postAjaxCallback) {
		var valueArray = [],
		submitString = '';
		var $el = $(el);
		valueArray.push($el.next('input').val().toLowerCase());
		$.webpurify.returnProfanity(valueArray.join('::'), function(json) {
			var valid = true;
			if(json)
			{
				valid = false;

				if(!$.isArray(json))
				{
					var tmp = json;
					json = [tmp];
				}


					if(profanityFieldCheck($el, json)) {
						//$el.closest('.fieldContainer').addClass('error');
						$el.closest('.fieldContainer').after('<small class="resp_error">' +  "! We're sorry, but profanity cannot be applied to personalized items" + '</small>');
					}

					else
					{
						$el.closest('.fieldContainer').removeClass('error');
					}



			}


		});
	}

	//************************************End of profanity hack **************************

	//Initiate AJAX to check profanity service, and display errors after response.
	checkProfanity(labels.filter('.profanity'), displayPersonalizationErrors);

	//Supporting functions
	function displayPersonalizationErrors() {
		var $personalizationErrors = $('#personalizationErrors'),
			productErrorSelector = '.product-error',
			errorSelector = '.itemInfo';

		if (isQV) {
			$personalizationErrors = $('#quickView #personalizationErrors'),
			productErrorSelector = '#quickView .product-error',
			errorSelector = '#quickView .itemInfo';
		}

		$personalizationErrors.remove();
		if (errors.display) {

			var errorList = $('<ul id="personalizationErrors"></ul>');
			for (var key in errors.messages) {
				$('<li />', {text: errors.messages[key]}).appendTo(errorList);
			}
			if ($(productErrorSelector).length > 0) {
				errorList.prependTo(productErrorSelector);
			}
			else {
				errorList.prependTo(errorSelector);
			}
			callback && callback(false);
		}
		else {
			callback && callback(true);
		}
	}



	function checkProfanity(els, postAjaxCallback) {
		var valueArray = [],
			submitString = '';


		els.each(function(index, el){
				var $el = $(el);
				valueArray.push($el.next('input').val());
		});


		$.webpurify.returnProfanity(valueArray.join('::'), function(json) {
			var valid = true;
			if(json)
			{
				valid = false;

				if(!$.isArray(json))
				{
					var tmp = json;
					json = [tmp];
				}

				els.each(function(index, el) {
					var $el = $(el);

					if(profanityFieldCheck($el, json)) {
						//$el.closest('.fieldContainer').addClass('error');
						//$el.closest('.fieldContainer').addClass('error').after('<small class="resp_error">' +  "! We're sorry, but profanity cannot be applied to personalized items" + '</small>');

					}

					else
					{
						$el.closest('.fieldContainer').removeClass('error');
					}

				});

			}

			if(!valid)
			{
				errors.display = true;
				//errors.messages['profanity'] = "! We're sorry, but profanity cannot be applied to personalized items";
			}

			postAjaxCallback()
		});
	}

	function profanityFieldCheck(el, words)
	{
		var len = words.length,
			result = false;

		for(var i = 0; i < len; i++)
		{

			if(el.next('input').val().toLowerCase().indexOf(words[i]) >= 0)
				{

					result = true;
				}

		}

		return result;
	}


	function validationMethods () {

		return {
			'required': {
				'method': function(input) {
					var value = input.val() === input.attr('placeholder') ? '' : $.trim(input.val());

					if(!value )
						return false
					else
						return true;
				},
				'message': '! Please select ALL Personalization Options before adding to cart.'
			},
			'dateFormat': {
				'method': function(input) {
					var format = $.trim(input.attr('placeholder').toLowerCase()),
						regexStr = format.split('month').join('(\\w+)')
											.split('d').join('\\d')
											.split('m').join('\\d')
											.split('y').join('\\d')
											.split('.').join('\.'),
					regex = new RegExp("^"+regexStr+"$", "g"),
					result = regex.test(input.val());

				return result;
				},
				'message': '! Please enter a valid date format'

			},
			'specialChar': {
				'method': function(input) {
					//var legalRegex = /^[\w, \-, \,, ;, :, \', \", @, #, \., \!, \?, \&]+$/g,
					var legalRegex = /^[\w, \-, \,, ;, :, \', \", #, \., \!, \?, \&]+$/g,
						result = legalRegex.test($.trim(input.val()));

					return result;
				},
				'message': '! You have used non-allowed characters'
			},
			'confirmation': {
				'method': function(input){
					if(input[0].checked)
					{
						return true;
					}
					else {
						return false;
					}
				},
				'message': '! Please confirm your information is correct'
			}
		};
	}

}

function addToCartFromWishlistSuccess(data) {
	$('#includeSavedFavoritesDiv').load(CONTEXT_ROOT + "checkout/includes/shopping_cart/inc_saved_favorites.jsp");
	showMiniCartUpdate(data);

}


function updateRemoval(catRefID, siteId, commerceID, amount) {
	$("#removalInput").val(commerceID);
	var expeditedEligible = 'true'; 
	if($('#exp'+catRefID).length > 0){
		expeditedEligible = $("#exp"+catRefID).val();
	}
	submitFormUpdate(catRefID, "R", amount);
	// Telium tagging
	//var spanSkuPinCode = $(".productQuantity #"+commerceID).closest('tr').find(".productNum").text().trim();
	var spanSkuPinCode = $("#xxx"+catRefID).val();
	var prodSku = spanSkuPinCode;
	var count = prodSku.match(/-/g);
	if(count!= null && count.length > 1){
		prodSku = prodSku.replace(prodSku.substring(prodSku.lastIndexOf("-")), "");
	}
	else if (count == null){
		prodSku = prodSku.slice(0,-3);
	}
	//console.log("prodSku::"+prodSku);
	fireTealiumEvent({
		e_remove_cart : "t",
		product_child_sku : spanSkuPinCode,
		product_parent_sku : prodSku,
		product_exp_eligible : expeditedEligible,
		event_flag : "remove from cart"
	});
}


function initializeAddToCartForm() {
	//alert('initializeAddToCartForm-100');
	var options = {
			dataType:"json",
			success:showMiniCartUpdate,
			error:showMiniCartUpdate,
			beforeSubmit: function(){
				return $('#personalized').validatePersonalized(false, function(){});
			}
	};
	$("#addToCart").ajaxForm(options);
}

// subscribe to email cartridge
var subscribeOffCanvasOptions = {
		beforeSubmit: function(){
			// validate email address
			var emailVal = $('#sidebar .subscribe-email').val(),
				emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if (emailVal == '') {
				$('#sidebar .subscribe-email').val('Please Enter Your Email');
				return false;
			}
			else if (!emailReg.test(emailVal)) {
				$('#sidebar .subscribe-email').css('color', '#900');
				$('#sidebar .subscribe-email').val('Please Enter a Valid Email');
				return false;
			}
		},
		success: function(){
			fireTealiumEvent({
				"e_leftnav_email_p" : "t",
				"lead_type" : "email leftnavp signup"
			});
			$('#sidebar .subscribe-email').val('Enter Your Email Here').css('color', '#999');
			$('#sidebar .subscribe-message').html($('#sidebar .subscribe-confirmation').val());
		},
		error: function(){
			console.log('subscribeOffCanvas error: ', data);
		}
	},
	subscribeLeftColOptions = {
		beforeSubmit: function(){
			// validate email address
			var emailVal = $('.large-2 .subscribe-email').val(),
				emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if (emailVal == '') {
				$('.large-2 .subscribe-email').val('Please Enter Your Email');
				return false;
			}
			else if (!emailReg.test(emailVal)) {
				$('.large-2 .subscribe-email').css('color', '#900');
				$('.large-2 .subscribe-email').val('Please Enter a Valid Email');
				return false;
			}
		},
		success: function(){
			fireTealiumEvent({
				"e_leftnav_email" : "t",
				"lead_type" : "email leftnav signup"
			});
			$('.large-2 .subscribe-email').val('Enter Your Email Here').css('color', '#999');
			$('.large-2 .subscribe-message').html($('.large-2 .subscribe-confirmation').val());
		},
		error: function(){
			console.log('subscribeLeftCol error: ', data);
		}
	},
	subscribeRightColOptions = {
		beforeSubmit: function(){
			// validate email address
			var emailVal = $('.large-8 .subscribe-email').val(),
				emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if (emailVal == '') {
				$('.large-8 .subscribe-email').val('Please Enter Your Email');
				return false;
			}
			else if (!emailReg.test(emailVal)) {
				$('.large-8 .subscribe-email').css('color', '#900');
				$('.large-8 .subscribe-email').val('Please Enter a Valid Email');
				return false;
			}
		},
		success: function(){
			if ($('html').hasClass('small-screen')) {
				fireTealiumEvent({
					"e_rightnav_email_p" : "t",
					"lead_type" : "email rightnavp signup"
				});
			}
			else {
				fireTealiumEvent({
					"e_rightnav_email" : "t",
					"lead_type" : "email rightnav signup"
				});
			}
			$('.large-8 .subscribe-email').val('Enter Your Email Here').css('color', '#999');
			$('.large-8 .subscribe-message').html($('.large-8 .subscribe-confirmation').val());
		},
		error: function(){
			console.log('subscribeRightCol error: ', data);
		}
	};
$('#sidebar #homeSubscribe-form_new').ajaxForm(subscribeOffCanvasOptions);
$('.large-2 #homeSubscribe-form_new').ajaxForm(subscribeLeftColOptions);
$('.large-8 #homeSubscribe-form_new').ajaxForm(subscribeRightColOptions);

function initializefooterSubscribe() {
	var options = {
			//dataType:"json",
			success:footerSubscribeConfirm,
			error:footerSubscribeConfirm
	};
	$("#footerSubscribe-form").ajaxForm(options);
}

function footerSubscribeConfirm(data){
	if(data.success != undefined){
		$("#footerSubscribe-email").val("Enter Your Email Here");
		$("#footer1").replaceWith("<em id='footer1'>Thank you!</em>");
		$("#footer2").replaceWith("<span id='footer2'>You will receive email confirmation shortly.</span>");
		return;
	}
	else if (data.error != undefined){

	}
}

initializefooterSubscribe();

function submitEditInCartForm() {
var options = {
			//dataType:"json",
			//success:showMiniCartUpdate,
			//error:showMiniCartUpdate
	};
	updateEditInCartForm();
	$("#editInCartForm").submit();//ajaxSubmit(options);
	return false;
}
function submitEditGiftlistInCartForm() {
var options = {
			//dataType:"json",
			//success:showMiniCartUpdate,
			//error:showMiniCartUpdate
	};
	updateEditInCartGiftlistForm();
	$("#editInCartGiftlistForm").submit();//ajaxSubmit(options);
	return false;
}

function updateEditInCartForm() {

	// Update the form fields
	// Set the catalog
	var skuid = $('#skuToUpdate').val();
	var quantityValue = $('#'+skuid+"-qty").val();
	var productid = $('#productId').val();
	var originalSkuId = $('#originalSkuId').val();

	$('#originalSkuIdFormField').val(originalSkuId);
	$('#productIdFormField').val(productid);
	$('#skuIdFormField').val(skuid);
	$('#qtyFormField').attr('name', skuid);
	$('#qtyFormField').val(quantityValue);
}

function updateEditInCartGiftlistForm() {

	// Update the form fields
	// Set the catalog
	var giftlistItemId = $('#gl-giftlistItemToUpdate').val();
	var skuid = $('#gl-skuToUpdate').val();
	var quantityValue = $('#'+skuid+"-qty").val();
	var productid = $('#gl-productId').val();
	var originalSkuId = $('#gl-originalSkuId').val();

	$("#gl-giftlistItemToUpdateFormField").attr('name',giftlistItemId);
	$("#gl-giftlistItemToUpdateFormField").val(quantityValue);
	$('#gl-originalSkuIdFormField').val(originalSkuId);
	$('#gl-productIdFormField').val(productid);
	$('#gl-skuIdFormField').val(skuid);
	$('#gl-qtyFormField').attr('name', skuid);
	$('#gl-qtyFormField').val(quantityValue);
}

function closeNotesForm(){
	$('#shoppingcartnotes').foundation('reveal', 'close');
}

function editNotes(theItemId, successURL) {
	var qv = $('#shoppingcartnotes');
	var link="itemNotes.jsp?itemID=" + theItemId + "&successURL=" + successURL;
	qv.load(link, function(){
		$('#shoppingcartnotes').foundation('reveal', 'open');
		});
}

function editGiftNotes(theItemId) {
	$("#popUpWindow2").load("giftItemNotes.jsp?itemID=" + theItemId);
	$('div#popUpWindow2').removeClass('hidden');
	// return false;
}



function initializeProductNav() {

	var li=$('#productNav li.selected ');
	if (li.length == 0){
		li=$('#selected');
	}

	var childA=$(li).children().first();
	if (childA.hasClass("toggle")){
		childA.click();
	}

	var childA=$(li).children();
	var counter = 0;
	while( counter < childA.length ) {
		var first = childA[counter];
		var elem = $(first).first();
		if( elem.hasClass("toggle") ) {
			elem.click();
		}
		counter = counter + 1;
	}

	//var parentLi = $(li).parent().parent();
	//while(parentLi.length != 0 && parentLi.hasClass("toggle")){
	//    var toggleA = $(parentLi).children().first();
	//    $(toggleA).click();
	//    parentLi = $(parentLi).parent().parent();
	//}
}

/*
	jQuery extention to clear default input values onfocus
	For password fields, it adds/removes a password field class that fakes the Password defaultValue
*/
$.fn.clearDefaultValue = function() {
	return this.focus(function() {
		if(this.value == this.defaultValue) {
			this.value = '';
		}
		if(this.type == 'password' && this.value == '') {
			$(this).removeClass('password-field');
		}
	}).blur(function() {
		if(!this.value.length) {
			this.value = this.defaultValue;
		}
		if(this.type == 'password' && this.value == '') {
			$(this).addClass('password-field');
		}
	});
};

// Textarea Character Count
function limitChars(textid, limit, infodiv) {
	var text = $('#'+textid).val();
	var textlength = text.length;
	if (textlength > limit) {
		if (textid == 'cart-comment') {
			$(infodiv).children('em').html('<em class="required" style="clear: both; font-weight: normal; white-space: nowrap;">Character limit is ' + limit + '</em>');
		} else {
			$(infodiv).children('em').html('<em class="required" style="clear: both; font-weight: normal; white-space: nowrap;">Character limit is ' + limit + '</em><br />');
		}
		$('#'+textid).val(text.substr(0,limit));
		return false;
	} else {
		if (textid == 'cart-comment') {
			$(infodiv).children('em').html((limit - textlength) +' /110');
		} else {
			$(infodiv).children('span').html('Gift Message<br /><span> '+ (limit - textlength) +' /110</span>');
		}
		return true;
	}
}

// modal
function showVideoModal(video) {
	var videoModalShell = document.getElementById('videoModalShell');
	videoModalShell.style.display = 'block';
	showVideo(video);
	var header = videoModalShell.getElementsByTagName('h5')[0];
	header.className = video;
}

function closeModal(modalId) {
	var modal = document.getElementById(modalId);
	var elements = modal.getElementsByTagName('p');
	var header = modal.getElementsByTagName('h5')[0];
	for (i = 0; i < elements.length; i++) {
		elements[i].innerHTML = '&nbsp;';
	}
	header.innerHTML = '&nbsp;';
	modal.style.display = 'none';
}

function validateNumericInput(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\./;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		theEvent.preventDefault();
	}
}

function stateValue() {
	//alert("fuck this: " + $("#editSavedAddressModal #state-field2").val());
}
// Edit Address in Checkout Modal.
function showAddressEditModal( link, department, companyName, firstName, lastName, address1, address2, city, state, postalCode, phoneNumber, addressNickname, type, isDefault, addressType, accountType ) {
	// Add all the values into the field.
	$("#editSavedAddressModal #department-field").val(department);
	$("#editSavedAddressModal #companyName-field").val(companyName);
	$("#editSavedAddressModal #firstName-field").val(firstName);
	$("#editSavedAddressModal #lastName-field").val(lastName);
	$("#editSavedAddressModal #address1-field").val(address1);
	$("#editSavedAddressModal #address2-field").val(address2);
	$("#editSavedAddressModal #city-field").val(city);
	$("#editSavedAddressModal #state-field").val(state);
	$("#editSavedAddressModal #state-field2").val(state);
	$("#editSavedAddressModal #postalCode-field").val(postalCode);
	$("#editSavedAddressModal #phoneNumber-field").val(phoneNumber);
	$("#editSavedAddressModal #addressNickname-field").val(addressNickname);
	$("#editSavedAddressModal #type-field").val(type);


// Now populate the cloned modal if it exists
	$("#editSavedAddressModal-modal #department-field").val(department);
	$("#editSavedAddressModal-modal #companyName-field").val(escape(companyName));
	$("#editSavedAddressModal-modal #firstName-field").val(firstName);
	$("#editSavedAddressModal-modal #lastName-field").val(lastName);
	$("#editSavedAddressModal-modal #address1-field").val(address1);
	$("#editSavedAddressModal-modal #address2-field").val(address2);
	$("#editSavedAddressModal-modal #city-field").val(city);
	$("#editSavedAddressModal-modal #state-field").val(state);
	$("#editSavedAddressModal-modal #postalCode-field").val(postalCode);
	$("#editSavedAddressModal-modal #phoneNumber-field").val(phoneNumber);
	$("#editSavedAddressModal-modal #addressNickname-field").val(addressNickname);
	$("#editSavedAddressModal-modal #type-field").val(type);

	if (addressType == 'Shipping') {
		if (isDefault){
			$('.isDefaultAddressInput').val(true);
			$("#editSavedAddressModal #updatePrimaryAddress").show();
			$("#editSavedAddressModal #updateSecondaryAddress").hide();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").hide();
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");
		} else {
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").show();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").hide();
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");
		}

	} else {
		if (isDefault){
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").hide();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").show();
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");

		} else {
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").show();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").hide();
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");
	}
	}

/*
	if ( isDefault ) {

		if (isDefaultBilling) {
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").hide();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").show();
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");
		} else {
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").show();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").hide();
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");
		}

	}

	if ( isDefault ) {

		$("#editSavedAddressModal #updateSecondaryAddress").hide();
		$("#editSavedAddressModal #updatePrimaryAddress").show();
		$("#editSavedAddressModal #updatePrimaryBillingAddress").hide();
		if (accountType == "B")  {
			$("#editSavedAddressModal #companyNameRequired").removeClass("hidden");
			$("#editSavedAddressModal-modal #companyNameRequired").removeClass("hidden");
		} else {
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");
			$("#editSavedAddressModal-modal #companyNameRequired").addClass("hidden");
		}
	} else {
		if ( isDefaultBilling ) {
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").hide();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").show();
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");
		} else {
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").show();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").hide();
			$("#editSavedAddressModal #companyNameRequired").addClass("hidden");
		}
	}
	*/

	// Now pop the modal.
	showModal(link);
}

function showModalWithError ( link, isDefault, isDefaultBilling ) {
	if ( isDefault ) {
		$('.isDefaultAddressInput').val(true);
		$("#editSavedAddressModal #updateSecondaryAddress").hide();
		$("#editSavedAddressModal #updatePrimaryAddress").show();
		$("#editSavedAddressModal #updatePrimaryBillingAddress").hide();
	} else {
		if ( isDefaultBilling ) {
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").hide();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").show();
		} else {
			$("#editSavedAddressModal #updatePrimaryAddress").hide();
			$("#editSavedAddressModal #updateSecondaryAddress").show();
			$("#editSavedAddressModal #updatePrimaryBillingAddress").hide();
		}
	}

	// Now pop the modal.
	showModal(link);
}

function closeAddressEditModal() {
	// clears modal divs with class names given by showModal
	$('div').remove('.modalwindow');
	$('div').remove('.modalwindowCheckout');
	$('div').remove('.modalbackground');
}

// PopUp Functions
function hidePopups() {
		$('div#popUpWindow').addClass('hidden');
		$('div#popUpWindow2').addClass('hidden');
		$('div.popUpWindow2').addClass('hidden');
		$('div#quickView').addClass('hidden');
		$('div#quickCartPopup').addClass('displayNone');
		return false;
}

function updateCartPage(responseText, statusText, xhr, $form) {
	var return_values = responseText.split(',');
	if(typeof return_values !== 'undefined' && return_values.length == 2 && return_values[0] == 'session_expired') {
		// session expired
		console.log("Session expired");
		var redirectUrl = return_values[1];
		window.location = redirectUrl;
	}

	var origState = $('#originalState').val();

	$.ajax({
		url: CONTEXT_ROOT + 'checkout/includes/shopping_cart/inc_cart_subtotals.jsp?originalState='+origState,
		success: function(data){
			$('#cart-subtotals').html(data);
			$('#shipchart-subtotals-prices').load(CONTEXT_ROOT + 'checkout/includes/shopping_cart/inc_shipping_chart_subtotal_prices.jsp');
		},
		cache: false
	});
	//$('#shipchart-subtotals-prices').load(CONTEXT_ROOT + 'checkout/includes/shopping_cart/inc_shipping_chart_subtotal_prices.jsp');
	isFormSubmitting = false;
	//var selectedState = $form.find('#shippingChartStateSelect option:selected').val();
	//$('#cartShippingStateSelect').val(selectedState);

	//var url=CONTEXT_ROOT + 'checkout/includes/shopping_cart/inc_reset_shipping.jsp?originalState='+origState;
	//alert(url);


	//$('#resetShippingDiv').load(url);


}

function showRequest(formData, jqForm, options) {
	// formData is an array; here we use $.param to convert it to a string to display it
	// but the form plugin does this for you automatically when it submits the data
	var queryString = $.param(formData);

	// jqForm is a jQuery object encapsulating the form element.  To access the
	// DOM element for the form do this:
	// var formElement = jqForm[0];
	alert("URL = "  +  options.url);
	alert('About to submit: \n\n' + queryString);

	// here we could return false to prevent the form from being submitted;
	// returning anything other than false will allow the form submit to continue
	return true;
}

function showResponse(responseText, statusText, xhr, $form)  {
	//alert('status: ' + statusText + '\n\nresponseText: \n' + responseText +
	//	'\n\nThe output div should have already been updated with the responseText.');
}


		var calculateShippingFormOptions = {
			url:  CONTEXT_ROOT + 'checkout/includes/shopping_cart/inc_shipping_chart.jsp',
			//target:        '#popUpWindow',   //target element(s) to be updated with server response
			target:     '#shippingChart', //  '#popUpWindow',   //target element(s) to be updated with server response
			type: "post",
			success: updateCartPage,
			cache: false
			//beforeSubmit: showRequest


			// other available options:
			//beforeSubmit:  function,  // pre-submit callback
			//success:       function  // post-submit callback
			//url:       url         // override for form's 'action' attribute
			//type:      type        // 'get' or 'post', override for form's 'method' attribute
			//dataType:  null        // 'xml', 'script', or 'json' (expected server response type)
			//clearForm: true        // clear all form fields after successful submit
			//resetForm: true        // reset the form after successful submit

			// $.ajax options can be used here too, for example:
			//timeout:   3000
		};



$(document).ready(function() {

	addAndroidMaxLength();

		//$('#calculateShippingForm').ajaxForm(calculateShippingFormOptions);

	//if any of the catalogs submenus are selected, also select the main catalog menu
	$('ul.catalogs li.selected').each(function() {
		$(this).parent().parent().addClass('selected');
		$(this).parent().show();
	});

/*
	$('a.closeButton').live('click', function() {
		// $(this).parent().parent().parent().parent().addClass('hidden');
		$('div#popUpWindow').addClass('hidden');
		$('div#popUpWindow2').addClass('hidden');
		$('div#popUpWindow3').addClass('hidden');
		$('div#quickView').addClass('hidden');
		$('div#quickCartPopup').addClass('displayNone');
		return false;
	});
	*/

	$('#add-cc2').change(function(){
		updateSelectedCreditCardForCheckout($(this).val(), 'cc2');
	});

	$('#add-cc1').change(function(){
		updateSelectedCreditCardForCheckout($(this).val(), 'cc1');
	});

	if (Encoder.hasEncoded($('#quickSearch-query').val())) {
		$('#quickSearch-query').val(Encoder.htmlDecode($('#quickSearch-query').val()));
	}

});

// Alternate Pop Up for Tell a Friend



	// Method to update the credit card fields when a users chooses an existing credit card during checkout
	function updateSelectedCreditCardForCheckout(pSelectedCC, ccNum) {
		if ( pSelectedCC == '#add-cc1' ) {
			return;
		}

		if ( pSelectedCC == '#add-cc2' ) {
			return;
		}
		if ( ccNum == 'cc1' ) {
			if ( pSelectedCC == "" ) {
				$("#cardholderName-field").val("");
				$("#creditCardNumber-field").val("");
				$("#creditCardExpirationDate-Month").val("");
				$("#creditCardExpirationDate-Year").val("");
				$("#creditCardType-field").val("");
				$("#creditCardSavedToken-field").val("");
				$("#creditCardNumberHidden-field").val("");
				$("#creditCardNickNameHidden-field").val("");
				$("#creditCardIdHidden-field").val("");
			// $("#creditCardNumber-field").attr('disabled', false);
			// $("#creditCardType-field").attr('disabled', false);
				//$("#cardholderName-field").attr('disabled', false);

			} else {
				$("#cardholderName-field").val($("#" + pSelectedCC + " span#creditCardHolderName" + pSelectedCC).html());
				$("#creditCardNumber-field").val($("#" + pSelectedCC + " span#creditCardNumber" + pSelectedCC).html());
				$("#creditCardNumberHidden-field").val($("#" + pSelectedCC + " span#creditCardNumber" + pSelectedCC).html());
				$("#creditCardExpirationDate-Month").val($("#" + pSelectedCC + " span#expirationMonth" + pSelectedCC).html());
				$("#creditCardExpirationDate-Year").val($("#" + pSelectedCC + " span#expirationYear" + pSelectedCC).html());
				$("#creditCardType-field").val($("#" + pSelectedCC + " span#creditCardType" + pSelectedCC).html());
				$("#creditCardSavedToken-field").val($("#" + pSelectedCC + " span#creditCardToken" + pSelectedCC).html());
				$("#creditCardNickNameHidden-field").val($("#" + pSelectedCC + " span#creditCardNicknameNew" + pSelectedCC).html());
				$("#creditCardIdHidden-field").val($("#" + pSelectedCC + " span#creditCardIdNew" + pSelectedCC).html());
				//$("#creditCardNumber-field").attr('disabled', true);
				//$("#creditCardType-field").attr('disabled', true);
				//$("#cardholderName-field").attr('disabled', true);


			}
		} else if ( ccNum == 'cc2' ) {
			if ( pSelectedCC == "" ) {
				$("#cardholderName-field2").val("");
				$("#creditCardNumber-field2").val("");
				$("#creditCardExpirationDate-Month2").val("");
				$("#creditCardExpirationDate-Year2").val("");
				$("#creditCardType-field2").val("");
				$("#creditCardSavedToken-field2").val("");
			} else {
				$("#cardholderName-field2").val($("#" + pSelectedCC + " span#creditCardHolderName" + pSelectedCC).html());
				$("#creditCardNumber-field2").val($("#" + pSelectedCC + " span#creditCardNumber" + pSelectedCC).html());
				$("#creditCardExpirationDate-Month2").val($("#" + pSelectedCC + " span#expirationMonth" + pSelectedCC).html());
				$("#creditCardExpirationDate-Year2").val($("#" + pSelectedCC + " span#expirationYear" + pSelectedCC).html());
				$("#creditCardType-field2").val($("#" + pSelectedCC + " span#creditCardType" + pSelectedCC).html());
				$("#creditCardSavedToken-field2").val($("#" + pSelectedCC + " span#creditCardToken" + pSelectedCC).html());
				$("#creditCardNickNameHidden-field").val($("#" + pSelectedCC + " span#creditCardNickNameHidden" + pSelectedCC).html());
				$("#creditCardIdHidden-field").val($("#" + pSelectedCC + " span#creditCardIdHidden" + pSelectedCC).html());
			}
		}
	}

function gotoFavoritesView(data){
	if(data.success != undefined){
		var dir = data.goTo;
		window.location.href = dir;
		trackAddToFavorites();
	}
	else if (data.error != undefined){
		$('#personalizationErrors').remove();
		$('.itemInfo').prepend('<ul id="personalizationErrors"><li>' + data.error + '</li></ul>');
	}
}

function gotoFavoritesViewQV(data){
	if (data.success != undefined){
		var dir = data.goTo;
		window.location.href = dir;
		trackAddToFavorites();

	}
	else if (data.error != undefined){
		$('#quickView #personalizationErrors').remove();
		$('#quickView .itemInfo').prepend('<ul id="personalizationErrors"><li>' + data.error + '</li></ul>');
	}
}

function updateFavoriteFormQty(input,skuId){
	$("#addToFavoritesFormQty_"+skuId).val($(input).val());
}

function updateFavoriteFormQtyQuick(input,skuId){
	$("#quickView #addToFavoritesFormQty_"+skuId).val($(input).val());
}

function AddToCartQuick()
{
	$('div#quickView').addClass('hidden');
}

function AddToCart(siteId, itemNumber, itemCount, sessionId, findmethod) {

	if(findmethod =="" || findmethod =="undefined")
	{
		findmethod="browse";
	}
	if(findmethod == "brhist")
	{
		findmethod="browsing history";
	}
//	if(	siteId == 'LTD')
//	{
//		s.products=';'+itemNumber.substring(0,11)+';;;;evar3='+findmethod+'|evar8='+itemNumber;
//	}
//	else if (siteId == 'ABC')
//	{
//		s.products=';'+itemNumber.substring(0,11)+';;;;evar3='+findmethod+'|evar8='+itemNumber;
//	}
//	else if (siteId == 'LS')
//	{
//		s.products=';'+itemNumber.substring(0,6)+';;;;evar3='+findmethod+'|evar8='+itemNumber;
//	}
//	else
//	{
//		s.products=';'+itemNumber.substring(0,11)+';;;;evar3='+findmethod+'|evar8='+itemNumber;
//	}
//	s.linkTrackVars='events,products';
//	if (itemCount == '0')
//	{
//		s.linkTrackEvents='scAdd,scOpen';
//		s.events='scAdd,scOpen:'+sessionId;
//	}
//	else
//	{
//		s.linkTrackEvents='scAdd';
//		s.events='scAdd';
//	}
//	s.tl(this,'o','Add to Cart');
}

function AddToCartNew(itemCount, products, isCatQuickOrder, isParsePinCodes, findmethod) {
	//SiteCatalyst
	if (isCatQuickOrder == null || isCatQuickOrder == '') {
		isCatQuickOrder = "N";
	}
	if (isParsePinCodes == null || isParsePinCodes == '') {
		isParsePinCodes = "N";
	}
	if (findmethod == null || findmethod == '') {
		findmethod = "";
	}
	if (isCatQuickOrder == "Y" ){
		findmethod="catalog quick order"
	}
	if (typeof RefreshShoppingCart == "undefined" || typeof RefreshShoppingCart == null ){
		//do nothing;
	}else
	{
		if (RefreshShoppingCart == true){
			findmethod="upsell quickview"
		}
	}

	//alert($('#persistentCart_items').text());
	//var x=$('#sctotalitems').text(); //this variable from inc_header, do not use
	if (findmethod == ""){
			findmethod=$("#findMethod").val();
	}
	var siteId=$("#currentSite").val();
	var sessionId=$("#sessionId").val();
	var totalqtyquick=$("#totalqty").val();
	if(findmethod =="" || findmethod =="undefined" || findmethod == "leftnav" || findmethod == "topnav")
	{
		findmethod="browse";
	}
	if(findmethod == "brhist")
	{
		findmethod="browsing history";
	}
	if(findmethod == "emailprod")
	{
		findmethod="email";
	}
	var currentPin;
	var currentPinShort;
	var pincodes = products.pinCodes;
//	s.products="";
	if (isCatQuickOrder == "Y" || isParsePinCodes == "Y")
		{

		}
/*	for (i=0;i<=pincodes.length-1;i++)
	{
		currentPin=pincodes[i];
		if(	siteId == 'LTD' || siteId == 'ABC')
		{

			currentPinShort = currentPin.substring(0,11)

		}
		else
		{
			currentPinShort = currentPin.substring(0,6)
		}

		s.products = (s.products ? s.products + ',' : '') + ';'+currentPinShort+';;;' + (products.AddedItemPrice[i] ? 'event75=' + products.AddedItemPrice[i] : '') + ';evar3='+findmethod+'|evar8='+currentPin;
	}*/

//	s.linkTrackVars='events,products';
	//if (jQuery.trim(x) == '0')
//	if (isCatQuickOrder == "Y"){
//		if ($("#TotalCommerceItemCount").val() == totalqtyquick)
//			{
//			s.linkTrackEvents='scAdd,event75,scOpen';
//			s.events='scAdd,event75,scOpen:'+sessionId;
//			}
//		else
//			{
//			s.linkTrackEvents='scAdd,event75';
//			s.events='scAdd,event75';
//			}
//	}
//	else {
//			if ($("#TotalCommerceItemCount").val() == '0')
//			{
//
//					s.linkTrackEvents='scAdd,scOpen,event75';
//					s.events='scAdd,event75,scOpen:'+sessionId;
//					$("#TotalCommerceItemCount").val(itemCount);
//
//			}
//			else
//			{
//					s.linkTrackEvents='scAdd,event75';
//					s.events='scAdd,event75';
//			}
//	}
	//alert(s.products);
//	s.tl(this,'o','Add to Cart');
//	s.events='';
//	s.linkTrackEvents=''
//	s.products='';

	if (typeof RefreshShoppingCart == "undefined" || typeof RefreshShoppingCart == null ){
		//alert("undefined");
	}else
	{
		if (RefreshShoppingCart == true){
			//alert(RefreshShoppingCart);
			window.location=CONTEXT_ROOT+ "checkout/shopping_cart.jsp";
		}
	}


}

function GetSiteCatalystAccount(siteId) {
	if (siteId == 'LTD') {
		return "ltdcomltd2dev"; //test
		//return "ltdcomltd2"; //production
	}
	else if (siteId == 'ABC') {
		return "ltdcomabc2dev"; //test
		//return "ltdcomabc2"; //production
	}
	else if (siteId == 'LS') {
		return "ltdcomlake2dev"; //test
		//return "lltdcomlake2"; //production
	}
	else {
		return "ltdcomltd2dev"; //test
		//return "ltdcomltd2"; //production
	}
}

function AddToCartMultiple(siteId, itemCount, sessionId, findmethod) {
	//This function is not being used anymore, delete later 11/01/2010
	//SiteCatalyst code Add to Cart	for multiple items

	if(findmethod =="")
	{
		findmethod="browse";
	}
	if(findmethod == "brhist")
	{
		findmethod="browsing history";
	}

//	s.linkTrackVars='events,products';
//	s.products='';
//	if (itemCount == '0')
//	{
//		s.linkTrackEvents='scAdd,scOpen';
//		s.events='scAdd,scOpen:'+sessionId;
//
//	}
//	else
//	{
//		s.linkTrackEvents='scAdd';
//		s.events='scAdd';
//	}
	//var y = $('#xxxsku170012').val();
	//alert(y);
	$("input[name*='PinNumber']").each(function() {
		//var currentPin = $(this).val();
		var currentSku = $(this).val();
		var className = ".PinNumber" + currentSku;
		var pinClassName = ".xxx" + currentSku;
		var currentQTY = 0;
		var currentPinShort = '';
		var currentPin=$(pinClassName).val();
		//var y = $('#xxxsku170012').val();
		//alert(y);
		currentQTY = $(className).val();
		if(	siteId == 'LTD' || siteId == 'ABC')
		{
			currentPinShort = currentPin.substring(0,11)
		}
		else
		{
			currentPinShort = currentPin.substring(0,6)
		}

//		if (currentQTY != 0)
//		{
//
//			if (s.products == '')
//			{
//
//				s.products=';'+currentPinShort+';;;;evar3='+findmethod+'|evar8='+currentPin;
//
//			}
//			else
//			{
//
//				s.products=s.products+','+';'+currentPinShort+';;;;evar3='+findmethod+'|evar8='+currentPin;
//			}
//		}
		//alert("QTY for sku " + currentPin + "is :" +  currentQTY);

	})
	//alert("s.products="+s.products+" "+"s.events="+s.events+" s.linkTrackEvents="+s.linkTrackEvents);
//	s.tl(this,'o','Add to Cart');
	//alert('okay');
}
function LargeImagesDisplay(moveDirection, selectedButton)
{

	var infoImgUrl = $(".infoImg").attr("src");

	if (moveDirection=='start') {
		var zoomImgUrl = infoImgUrl.replace("_mn", "_zm");
		$(".zoomImg").attr("src", zoomImgUrl);
	}

	var curent = $(".zoomImg").attr("src");
	//if (current != null)
	//	current = current.replace("zm.jpg","mn.jpg");
	var imgSize = $(".galleryNav > li").size();
	//$.each(arr, function(index, value) {
	//	  alert(index + ': ' + value);
	//	});

	var list = new Array();
	// I believe that here we are assembling the collection of alt image urls.
	// but the gallery has the small alt images, not the proper size.
	// so we will alter the file names to point to the zoom images.

	$(".galleryNav > li").each(function() {
		var currentFileName = $(this).attr("title");

		if (currentFileName) {
			currentFileName = currentFileName.replace("_alt", "_zm");
		}
		list.push(currentFileName);
	});


	var idx = jQuery.inArray(curent, list);
	if (moveDirection=='next' && idx < imgSize-1) {
		idx = idx + 1;
	}
	else if (moveDirection=='prev' && idx > 0) {
		idx = idx - 1;
	}
	if (idx >= imgSize-1) {
		idx = imgSize-1;
		//$("#popUpWindow .productZoom .paging li.next").addClass("hidden");
		$("#popUpWindow .productZoom .paging li.next a").removeClass("active");
	}
	else {
		//$("#popUpWindow .productZoom .paging li.next").removeClass("hidden");
		$("#popUpWindow .productZoom .paging li.next a").addClass("active");
	}

	if (idx <= 0) {
		//$("#popUpWindow .productZoom .paging li.prev").addClass('hidden');
		$("#popUpWindow .productZoom .paging li.prev a").removeClass("active");
		idx = 0;
	}
	else {
		//$("#popUpWindow .productZoom .paging li.prev").removeClass('hidden');
		$("#popUpWindow .productZoom .paging li.prev a").addClass("active");
	}
	//if (list[idx] != null)
	//	$(".zoomImg").attr("src",list[idx].replace("mn.jpg","zm.jpg"));
	$(".zoomImg").attr("src",list[idx]);

	return false;
};

//Used for modal view
function quickViewLargeImage() {
	$('#quickView div.closeContainer').addClass('hidden');
	$('#quickView div.info').addClass('hidden');
	$('#quickView div.rightCol').addClass('hidden');
	$('#quickView div.bottomLinks').addClass('hidden');
	$('#quickView div.itemInfo').addClass('hidden');
	$('#quickView a.quickViewLarger').addClass('hidden');
	$('#quickView div.thumbnailRegion').addClass('thumbnailRegionLarge');
	$('#quickView div.thumbnailRegion').removeClass('thumbnailRegion');
	$('#quickView div.leftCol').addClass('leftColLarge');
	$('#quickView div.leftCol').removeClass('leftCol');
	$('#quickView div.quantity').addClass('hidden');
	$('#quickView #popUpWindowLarge').removeClass('hidden');
	return false;
};
function closePopUpLarge() {
	$('#quickView div.closeContainer').removeClass('hidden');
	$('#quickView div.info').removeClass('hidden');
	$('#quickView div.rightCol').removeClass('hidden');
	$('#quickView div.bottomLinks').removeClass('hidden');
	$('#quickView div.itemInfo').removeClass('hidden');
	$('#quickView a.quickViewLarger').removeClass('hidden');
	$('#quickView div.quantity').removeClass('hidden');
	$('#quickView div.thumbnailRegionLarge').addClass('thumbnailRegion');
	$('#quickView div.thumbnailRegionLarge').removeClass('thumbnailRegionLarge');
	$('#quickView div.leftColLarge').addClass('leftCol');
	$('#quickView div.leftColLarge').removeClass('leftColLarge');
	$('#quickView #popUpWindowLarge').addClass('hidden');
	return false;
};
//Used for modal view end

function editItemModal(sku, commerceId, giftId, line, page, formData, pinCode, itemName) {
	var url = (page === 'quickorder') ? '/catalog/personal_form_modal_quick_order.jsp' : '/catalog/personal_form_modal_cart.jsp';
	$.ajax({
		url: url,
		data: {
			'skuId': sku,
			'lineNumber': line,
			'commerceId': commerceId,
			'giftId' : giftId,
			'pincode': pinCode,
			'itemName': itemName,
			'defaultValues': formData
		},
		success: function(data){
			//$('#quickView1').html(data).removeClass('hidden');
			$('#quickView1').html(data);
			//var qv = $('#quickView1'),
				//width = qv.width(),
				//style = {
				//	'top': $(window).scrollTop() + 'px',
				//	'left': '50%',
				//	'margin-left': '-200px',
				//	'position': 'absolute'
				//};
			//qv.css(style);
			$('#quickView1').foundation('reveal', 'open');
		},
		error: function (xhr, ajaxOptions, thrownError){
			if(window.console && console.log) {
				console.log('Ajax error:', xhr.status, thrownError);
			}
		}
	});
}

//Catalog quick order and shopping cart Edit Modal
$(document).ready(function(){
	var qv1 = $('#quickView1');
	if (!qv1.length) {
		//  QC 889 Personalized item can not be edited in shopping cart
		$('<div id="quickView1" data-reveal class="reveal-modal"></div>').appendTo('body');
		qv1 = $('#quickView1');
	}

	//This is new for shopping cart responsive personalized
	if ($('body').hasClass('shoppingCart')) {
		$('.editPersonalizedLink').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			var el = $(this),
				sku = el.attr('data-sku'),
				commerceId = el.attr('data-commerceId'),
				giftId = el.attr('data-giftid'),
				defaultValues = el.attr('data-defaultValues'),
				row = $(this).closest("div").attr("data-row-index");
			editItemModal(sku, commerceId, giftId, row, 'cart', defaultValues, '', '');
		});
		qv1.delegate('#closeAndCancel', 'click', personalizationCloseModal);
	}
	//End of shopping cart responsive  personalized

	if ($('body').hasClass('products')) {
		$('body').delegate('.cartBtn', 'click', function(){
			if (!validatePickerSelection()) {
				console.log('PDP selection not valid');
				return false;
			}
			var personalized = $('#personalization'),
				options = {
					dataType:"json",
					success: function(data){
						tagAddToCart();
						showMiniCartUpdate(data);
					},
					error: showMiniCartUpdate,
					beforeSerialize: function(form, options){
						$('<input />', {
							name: '/atg/commerce/order/purchase/CartModifierFormHandler.addItemToOrder',
							value: 'Add To Cart',
							type: 'hidden'
						}).add($('<input />', {
							name: '/atg/commerce/order/purchase/CartModifierFormHandler.addItemToOrder.x',
							value: '1',
							type: 'hidden'
						})).add($('<input />', {
							name: '/atg/commerce/order/purchase/CartModifierFormHandler.addItemToOrder.y',
							value: '1',
							type: 'hidden'
						})).appendTo(form);
					}
				};

			if (personalized.length) {
				personalized.validatePersonalized(false, function(valid){
					if (valid) {
						addToCartDS();
						$("#addToCart").ajaxSubmit(options);
					}
				});
			}
			else {
				console.log('valid non-personalized PDP');
				$("#addToCart").ajaxSubmit(options);
			}
			return false;
		});

		$('body').delegate('.favoritesBtn', 'click', function(){

			if (!validatePickerSelection()) {
				return false;
			}
			var personalized = $('#personalization'),
				options = {
					dataType:"json",
					success: function(data){
						gotoFavoritesView(data);
					},
					beforeSerialize: function(form, options){
						$('<input />', {
							name: '/atg/commerce/gifts/GiftlistFormHandler.addItemToGiftlist',
							value: 'Add To Cart',
							type: 'hidden'
						}).add($('<input />', {
							name: '/atg/commerce/gifts/GiftlistFormHandler.addItemToGiftlist.x',
							value: '1',
							type: 'hidden'
						})).add($('<input />', {
							name: '/atg/commerce/gifts/GiftlistFormHandler.addItemToGiftlist.y',
							value: '1',
							type: 'hidden'
						})).appendTo(form);
					}
				};
			//trackAddToFavorites();
			if (personalized.length) {
				personalized.validatePersonalized(false, function(valid){
					if (valid) {
						addToFavoritesDS();
						$("#addToFavorites").ajaxSubmit(options);
					}
				});
			}
			else {
				addToFavoritesDS();
				$("#addToFavorites").ajaxSubmit(options);
			}
			return false;
		});
	}

	function personalizationCloseModal() {
		qv1.foundation('reveal', 'close');
		//$('#quickView1').foundation('reveal', 'close');
		//qv1.addClass('hidden').empty();
		return false;
	}

	function generatePersonalizationDetails(formEls) {
		var elements = formEls.not(':hidden, [type="checkbox"]')
			len = elements.length,
			details = ($('<ul/>', {
				'style': 'width: 216px;float: right;list-style-type: none; margin: 0; padding: 0;',
				'class': 'personalizationDetails'
			})),
			liTemplate = $('<li />', {
				'style': 'margin: 0; font-size: .9em; color: #090C10;'
			});

		//Generate heading element
		liTemplate.clone()
			.css('font-weight', 'bold')
			.text('Personalization Details:')
			.append($('<a />', {
				'href': '#',
				'class': 'editPersonalizedLink',
				'text': 'Edit',
				'style': 'margin-left: 10px; font-size: .9em;'
			}))
			.appendTo(details);

		//Generate list items for each form element
		for (var i = 0; i < len; i++) {
			var el = elements.eq(i),
				elementValue = el.val() !== el.attr('placeholder') ? el.val() : '';

			if (elementValue) {
				liTemplate.clone()
					.text(el.prev('label').text() + ': ' + elementValue)
					.appendTo(details);
			}
		}
		return details;
	}
});

function trackAddToFavorites() {
	// Fire Tealium event
	fireTealiumEvent({
		"e_save_favorites" : "t"
	});
}

//functions used by search
function submitSearch() {
	$('#quickSearch-resubmit').click();
	return false;
}
function submitFacetSearch(facetTrail) {
	$('#quickSearch-facetTrail').val(facetTrail);
	$('#quickSearch-facetSearchRequest').val(true);
	$('#quickSearch-resubmit').click();
	return false;
}
function changeSortOrder() {
	//get the value of the selected opton and split by :
	var sortOptions = $('#quickSearch-sorting option:selected').val().split(':');
	$('#quickSearch-docSort').val(sortOptions[0]);
	$('#quickSearch-docSortOrder').val(sortOptions[1]);
	$('#quickSearch-docSortProp').val(sortOptions[2]);
	$('#quickSearch-docSortPropDefault').val(sortOptions[3]);
	$('#quickSearch-docSortPropVal').val(sortOptions[4]);
	$('#quickSearch-docSortCase').val(sortOptions[5]);
	$('#quickSearch-resubmit').click();
	return false;
}
function nextPage(pageNum) {
	document.searchForm.goToPage.value = pageNum;
	$('#quickSearch-resubmit').click();
	return false;
}

function cancelEditWishlistInCart() {
	$('#editInCartGiftlist').closest('tr').addClass('hidden');
	$('#editInCartGiftlist').addClass('hidden');
}

function cancelEditInCart() {
	$('#editInCart').closest('tr').addClass('hidden');
	$('#editInCart').addClass('hidden');
}

function editInCartGiftlistWithSku(productId, skuId, quantity, originalSkuId, giftlistItemToUpdate) {
var urlParams = "productId=" + productId + "&skuId=" + skuId + "&quantity=" + quantity + "&originalSkuId=" + originalSkuId + "&giftlistItemToUpdate=" + giftlistItemToUpdate;
	url = CONTEXT_ROOT + "checkout/includes/shopping_cart/inc_edit_product_giftlist.jsp?" + urlParams
	//alert("URL = " +url);
	$('#editInCartGiftlist').load(url);
	$('#editInCartGiftlist').removeClass('hidden');
	$('#editInCartGiftlist').closest('tr').removeClass('hidden');

}

function editInCartGiftlistWithoutSku(productId, drivingField, drivingFieldValue, quantity, originalSkuId, giftlistItemToUpdate) {
	// nonDrivingFieldValue ="";
	var picker1Value ="";
	var picker2Value = "";

	//alert("Driving Field = " + drivingField);
	if (drivingField == 'picker1') {
		picker1Value = drivingFieldValue;
		picker2Value = $('.picker2.select a').text();
	} else if (drivingField == 'picker2') {
		picker2Value = drivingFieldValue;
		picker1Value = $('.picker1.select a').text();
	}

	picker1Value = picker1Value.replace("/" , '%2F');
	picker2Value = picker2Value.replace("/" , '%2F');

	var urlParams = "productId=" + productId + "&picker1Value=" + picker1Value + "&drivingField=" + drivingField + "&picker2Value=" + picker2Value + "&quantity=" + quantity + "&originalSkuId=" + originalSkuId + "&giftlistItemToUpdate=" + giftlistItemToUpdate;
	url = CONTEXT_ROOT + "checkout/includes/shopping_cart/inc_edit_product_giftlist.jsp?" + (urlParams);
	// alert("URL = " + (url));
	$('#editInCartGiftlist').load(url);
	$('#editInCartGiftlist').removeClass('hidden');
	$('#editInCartGiftlist').closest('tr').removeClass('hidden');
}


function editInCartWithSku(productId, skuId, quantity, originalSkuId) {
	var urlParams = "productId=" + productId + "&skuId=" + skuId + "&quantity=" + quantity + "&originalSkuId=" + originalSkuId;
	url = CONTEXT_ROOT + "checkout/includes/shopping_cart/inc_edit_product.jsp?" + urlParams
	//alert("URL = " +url);
	$('#editInCart').load(url);
	$('#editInCart').removeClass('hidden');
	$('#editInCart').closest('tr').removeClass('hidden');
}

function editInCartWithoutSku(productId, drivingField, drivingFieldValue, quantity, originalSkuId) {
	// nonDrivingFieldValue ="";
	var picker1Value ="";
	var picker2Value = "";

	//alert("Driving Field = " + drivingField);
	if (drivingField == 'picker1') {
		picker1Value = drivingFieldValue;
		picker2Value = $('.picker2.select a').text();
	} else if (drivingField == 'picker2') {
		picker2Value = drivingFieldValue;
		picker1Value = $('.picker1.select a').text();
	}

	//picker1Value = picker1Value.replace("/" , '%2F');
	//picker2Value = picker2Value.replace("/" , '%2F');
	picker1Value = encodeURIComponent(picker1Value);
	picker2Value = encodeURIComponent(picker2Value);
	var urlParams = "productId=" + productId + "&picker1Value=" + picker1Value + "&drivingField=" + drivingField + "&picker2Value=" + picker2Value + "&quantity=" + quantity + "&originalSkuId=" + originalSkuId;
	url = CONTEXT_ROOT + "checkout/includes/shopping_cart/inc_edit_product.jsp?" + (urlParams);
	// alert("URL = " + (url));
	$('#editInCart').load(url);
	$('#editInCart').removeClass('hidden');
	$('#editInCart').closest('tr').removeClass('hidden');
}

function moveToWishList(theItemId, siteId, currentPin, price) {
	var itemNumber = "";
	var qty = $('#'+theItemId).val();
	if(	siteId == 'LS' )
	{
		if (currentPin.length>=6)
			itemNumber=currentPin.substring(0,6);
	}
	else
	{
		if (currentPin.length>=11)
			itemNumber=currentPin.substring(0,11);
	}

//	s.products=';'+itemNumber + (price ? ';;;event76=' + price : '');
//	s.linkTrackVars='events,products';
//	s.linkTrackEvents='event46,event96,scRemove,event76';
//	s.events='scRemove,event46,event96,event76';
//	s.tl(true,'o','Add To Favorites');
	$("#giftListItemId").val(theItemId);
	setTimeout(function(){
		$("#moveToWishlistButton").click();
	}, 500);
}

function categorySelectedOnFAQsModal(category){

	if ($("#footerModal").length == 0 || $("#footerModal").length == null){
		$("#questions_"+$(category).attr("id")).show();
	}
	$("#footerModal .categories li").each(function (){
		$(this).removeClass("selected");
	});
	$(category).parent().addClass("selected");

	$("#footerModal .questionList").each(function (){
		$(this).hide();
	});
	$("#footerModal .QandA").each(function (){
		$(this).hide();
	});
	var divToShow = "questions_"+$(category).attr("id");
	$("#footerModal .questionList").each(function (){
		if (divToShow == $(this).attr("id")) $(this).show();
	});

	return false;
}

function questionSelectedOnFAQsModal(question){

	$("#footerModal .questionList").each(function (){
		$(this).hide();
	});

	var divToShow = "q_and_a_"+$(question).attr("id");
	$("#footerModal .QandA").each(function (){
		if (divToShow == $(this).attr("id")) $(this).show();
	});

	return false;
}

function backButtonOnFAQsModal(category){

	$("#footerModal .QandA").each(function (){
		$(this).hide();
	});
	var divToShow = "questions_"+category;
	$("#footerModal .questionList").each(function (){
		if (divToShow == $(this).attr("id")) $(this).show();
	});

	return false;
}

function telephoneAreaAutoTap(currentField,maxLength,nextFieldId){
	if((!navigator.userAgent.match(/iPhone/i)) && (!navigator.userAgent.match(/iPod/i)) && (!navigator.userAgent.match(/iPad/i)) ) {
		if($(currentField).val().length == maxLength )
			$('#'+nextFieldId).focus();
	}
}

function limitCharacterNumber(field,maxLength,infoFieldId){
	var currentValue = $(field).val();
	if(currentValue.length > maxLength)
		$(field).val(currentValue.substring(0,maxLength));
	$("#"+infoFieldId).html($(field).val().length);

}

function CreatePersonalizeInput(){
	var myArray = new Array();
	var pInput = "";
	var pHeader = "";;
	var totalcount ="0"

	if (document.getElementById("totalCount") != null)
		var totalcount = document.getElementById("totalCount").value;
	if (document.getElementById("personalization_type-style") != null){
		pInput = pInput + document.getElementById("personalization_type-style").value + "$"
		//if (document.getElementById("personalization_type-style").value != "")
			pHeader = pHeader + document.getElementById("att_lbl_style").innerHTML + "$";
		//else
			//pHeader = pHeader + "$";
	}
	else {
		pInput = pInput + "$";
		pHeader = pHeader + "$";
		//pHeader = pHeader + document.getElementById("att_lbl_style").innerHTML + "$";
	}

	if (document.getElementById("personalization_type-color") != null)	{
		pInput = pInput + document.getElementById("personalization_type-color").value + "$";
		//if (document.getElementById("personalization_type-color").value != "")
			pHeader = pHeader + document.getElementById("att_lbl_color").innerHTML + "$";
		//else
			//pHeader = pHeader + "$";
	}
	else {
		pInput = pInput + "$";
		pHeader = pHeader + "$";
		//pHeader = pHeader + document.getElementById("att_lbl_color").innerHTML + "$";
	}


	for (i = 1; i <= totalcount; i++) {
		var el = $('#att_'+i),
			value = el.val() === el.attr('placeholder') ? '' : el.val(),
			label = $("#att_lbl_"+i);

		if (el.length)	{
			pInput = pInput + value + "$";
			//if (value)
				pHeader = pHeader + label.text() + "$";
			//else
				//pHeader = pHeader + "$";
		}
		else {
			pInput = pInput + "$";
			pHeader = pHeader + "$";
			//pHeader = pHeader + label.text() + "$";

		}
	}
	pInput = pInput.slice(0,-1);
	pHeader = pHeader.slice(0,-1);
	myArray[0] = pInput;
	myArray[1] = pHeader;
	return myArray;
}

function CreatePersonalizeInputQV(){
	var myArray = new Array(),
		pInput = "",
		pHeader = "",
		totalcount = "0";

	if ($("#quickView #totalCount").length > 0) {
		var totalcount = $("#quickView #totalCount").val();
	}

	if ($("#quickView #personalization_type-style").length > 0){
		pInput = pInput + $("#quickView #personalization_type-style").val() + "$";
		pHeader = pHeader + $("#quickView #att_lbl_style").html() + "$";
	}
	else {
		pInput = pInput + "$";
		pHeader = pHeader + "$";
	}

	if ($("#quickView #personalization_type-color").length > 0) {
		pInput = pInput + $("#quickView #personalization_type-color").val() + "$";
		pHeader = pHeader + $("#quickView #att_lbl_color").html() + "$";
	}
	else {
		pInput = pInput + "$";
		pHeader = pHeader + "$";
	}
	for (i = 1; i <= totalcount; i++) {
		//var el = $('#quickView #att_'+i),
		//	value = el.val() === el.attr('placeholder') ? '' : el.val(),
		var	label = $("#quickView #att_lbl_"+i);
		if(label.hasClass('dateFormat')){
			var el = $('#quickView #att_'+i+'_qv'),
			value = el.val() === el.attr('placeholder') ? '' : el.val();
		}else{
			var el = $('#quickView #att_'+i),
			value = el.val() === el.attr('placeholder') ? '' : el.val();
		}
		if (el.length)	{
			pInput = pInput + value + "$";
			pHeader = pHeader + label.text() + "$";
		}
		else {
			pInput = pInput + "$";
			pHeader = pHeader + "$";
		}
	}
	pInput = pInput.slice(0,-1);
	pHeader = pHeader.slice(0,-1);
	myArray[0] = pInput;
	myArray[1] = pHeader;
	return myArray;
}

function checkMobileScroll() {
	var scrollEls = $('.iScroll'),
		len = scrollEls.length;

	if(len.length && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		for(var i = 0; i < len; i++)
		{
			var el = scrollEls.eq(i);

			el.eq(i)
				.wrapInner('<ul><li /></ul>');

			var obj = new iScroll(el[0]);

			el.data('scroller', obj);
		}
	}

}

function addToCartDS () {
	var personalizedInput = new Array();
	var isPersonalized = "";
	if (document.getElementById("isPersonalizedpicker") != null)	{
		isPersonalized = document.getElementById("isPersonalizedpicker").value;
	}
	if (isPersonalized == "Y" ){
		personalizedInput = CreatePersonalizeInput();
		//alert(personalizedInput[0]);
		//alert(personalizedInput[1]);
	}
	var totalQty = 0;
	var qty = document.getElementById("quantity").value;

	if (qty > 0) {
		if (isPersonalized == "Y" ) {
				$("#addToCartPersonalInput").val(personalizedInput[0]);
				$("#addToCartPersonalHeader").val(personalizedInput[1]);
				//?????next line is questionable, check if personalized input is being past
				//$('#addToCart').submit();
				//to refresh the form to the default settings of the sku, do not need for favorites
				var skuIdpicker = document.getElementById("skuIdpicker").value;
				var productIdpicker = document.getElementById("productIdpicker").value;
				var showSoldOutpicker = document.getElementById("showSoldOutpicker").value;
				var onlineOnlypicker = document.getElementById("onlineOnlypicker").value;
				$("#personalization").load(CONTEXT_ROOT + "catalog/includes/inc_personalized_form.jsp" , "productId="+productIdpicker+"&skuId="+skuIdpicker);
				//$(".itemInfo").load(CONTEXT_ROOT + "catalog/includes/inc_sku_shopping_cart.jsp" , "productId="+productIdpicker+"&skuId="+skuIdpicker+"&showSoldOut="+showSoldOutpicker+"&onlineOnly="+onlineOnlypicker+"&isPersonalized="+isPersonalized);
		}
		//$("#addToFavoritesFormQty").val(qty);

	}
	else {
		$("#errorMessage").removeClass("hidden");
	}
}

function addToFavoritesDS () {
	var personalizedInput = new Array();
	var isPersonalized = "";
	if (document.getElementById("isPersonalizedpicker") != null)	{
		isPersonalized = document.getElementById("isPersonalizedpicker").value;
	}
	if (isPersonalized == "Y" ){
		personalizedInput = CreatePersonalizeInput();
	}
	var totalQty = 0,
		hasQty = false;

	// single and double pickers
	if (document.getElementById("quantity")) {
		var qty = document.getElementById("quantity").value;
		if (qty > 0) {
			if (isPersonalized == "Y" ) {
				$("#addToFavoritesPersonalInput").val(personalizedInput[0]);
				$("#addToFavoritesPersonalHeader").val(personalizedInput[1]);
			}
			$("#addToFavoritesFormQty").val(qty);
			hasQty = true;
		}
	}
	// all sku pickers (all field's need a unique id so we had to append skuId to current id)
	else {
		$('.qtyFld').each(function(){
			var $this = $(this),
				value = $this.val(),
				skuId = $this.siblings('input[name=skuNumFld]').val();
			if (value > 0) {
				if (isPersonalized == "Y" ) {
					$("#addToFavoritesPersonalInput").val(personalizedInput[0]);
					$("#addToFavoritesPersonalHeader").val(personalizedInput[1]);
				}
				$("#addToFavoritesFormQty_" + skuId).val(value);
				hasQty = true;
			}
		});
	}
	if (!hasQty) {
		$("#errorMessage").removeClass("hidden");
	}
}

function editPersonalizedModal() {
	var personalizedInput = new Array();
	personalizedInput = CreatePersonalizeInput();
	$("#personalizationInput").val(personalizedInput[0]);
	$("#personalizationHeader").val(personalizedInput[1]);
	$('#editPersonalizedModal').click();
	//$("#errorMessage").removeClass("hidden");
}

function editPersonalizedModalValue() {
	var personalizedInput = new Array();
	personalizedInput = CreatePersonalizeInput();
	$("#personalizationInput").val(personalizedInput[0]);
	$("#personalizationHeader").val(personalizedInput[1]);
}

function handlePersonalizationModal(data){
	if(data.success != undefined){
		var dir = data.goTo;
		//personalizationCloseModal();
		window.location.href = dir;
	}
	else if (data.error != undefined){
		var msg = data.error;
		$('#personalizationErrors').remove();
		var error = "<ul id='personalizationErrors'><li>"+msg+"</li></ul>";
		$('.itemInfo').prepend(error);

	}
}

function addToFavoritesQuickView() {
	var totalQty = 0,
		pins = '';
	$('.quantityInput').each(function(index, element){
		var currentSku = $(this).find('[name=skuNumFld]').val();
		var currentQuantity = $(this).find('.qtyFld').val();
		totalQty = totalQty + parseInt(currentQuantity);
		$("#addToFavoritesFormQty_"+currentSku).val(currentQuantity);
	});
	if (totalQty > 0) {
		trackAddToFavorites();
		$('#atg_store_addToFavorites').click();
	}
	else {
		var error = "<ul id='personalizationErrors'><li>!Invalid entry. Please refresh and try again.</li></ul>";
		$('#quickView #personalizationErrors').remove();
		$('#quickView .itemInfo').prepend(error);
	}
}

function addToFavoritesQuickViewAllSku() {
	var totalQty = 0;
	$('.quantityInput').each(function(index, element){
		var currentSku = $(this).find('[name=skuNumFld]').val();
		var currentQuantity = $(this).find('.qtyFld').val();
		totalQty = totalQty + parseInt(currentQuantity);
		$("#addToFavoritesFormQty_"+currentSku).val(currentQuantity);
	});
	if (totalQty > 0) {
		//trackAddToFavorites();
	}
	else {
		var error = "<ul id='personalizationErrors'><li>!Invalid entry. Please refresh and try again.</li></ul>";
		$('#quickView #personalizationErrors').remove();
		$('#quickView .itemInfo').prepend(error);
	}
}

function submitToDSQuickCart(pType) {
	var personalizedInput = new Array();
	if (pType==1) {
		personalizedInput = CreatePersonalizeInputQV();
		$("#quickView #addToCartPersonalInput").val(personalizedInput[0]);
		$("#quickView #addToCartPersonalHeader").val(personalizedInput[1]);
	}
	return false;
}

function addToFavoritesDSQuickView (pType) {
	var personalizedInput = new Array();
	var qty = $('#quickView #quantity').val();

	if (qty > 0) {
		$("#quickView #addToFavoritesFormQty").val(qty);
		if (pType==1) {
			personalizedInput = CreatePersonalizeInputQV();
			$("#quickView #addToFavoritesPersonalInput").val(personalizedInput[0]);
			$("#quickView #addToFavoritesPersonalHeader").val(personalizedInput[1]);
		}
	}
	else {
		$("#quickView #errorMessage").removeClass("hidden");
	}
	return false;
}

var isFormSubmitting = false;

function updateOrderShipping() {
	var newState = $(this).val();
	if (!isFormSubmitting) {
		isFormSubmitting = true;
		$('#shippingChartStateSelect').val(newState);
		$('#calculateShippingForm').ajaxSubmit(calculateShippingFormOptions);
	}

}

function RecordSiteCatalystClick(site) {
	//Site Catalyst for Calculate Shipping and Tax click
//	s.linkTrackVars='events,products';
//	s.linkTrackEvents='event56';
//	s.events='event56';
//	s.tl(true,'o','Calculate Shipping and Sales Tax');
	//End of Site Catalyst for Calculate Shipping and Tax click
}


	function doaction1(var1, var2, var3, var4, var5, var6, showSoldOut) {
		// Fire Tealium event
		fireTealiumEvent({
			"e_cross_sell" : "t",
			//"e_quick_view" : "t"
		});

		RefreshShoppingCart = true;

		if (showSoldOut == null || showSoldOut == '') {
			showSoldOut = false;
		}

		var link = '',
			originallink = '',
			picker = '',
			fm='';

		if (var4.indexOf("single_picker_product")>=0) {
			picker = "singlePicker";
		}
		else if (var4.indexOf("double_picker_product")>=0) {
			picker = "doublePicker";
		}
		else if	(var4.indexOf("all_sku_listing")>=0) {
			picker = "allSku";
		}
		else if (var4.indexOf("product_collection")>=0) {
			picker = "allSku";
		}
		else if (var4.indexOf("sp_personal")>=0) {
			picker = "singlePickerPersonal";
		}
		else if (var4.indexOf("dp_personal")>=0) {
			picker = "doublePickerPersonal";
		}

		link = "catalog/modals/product.jsp";

		if (var5 != null && var5.length>=1) {
			if (var5.substring(0,1)=="/") {
				var5 = var5.substring(1,var5.length);
			}
			var5 = var5.replace("==","'");
			if (var5.indexOf("?fm=")>=0) {
				fm = var5.substring(var5.indexOf("?fm")+4);
				var5 = var5.substring(var5.indexOf("/site"), var5.indexOf("?fm"));
			}
			originallink = CONTEXT_ROOT + var5;
		}
		else {
			originallink = CONTEXT_ROOT;
		}

		//to fix xss issues the next three conditions
		if (var2 == null || var2 == '') {
			var2 = 'jump';
		}
		if (var3 == null || var3 == '') {
			var3 = '0';
		}
		if (originallink == null || originallink == '') {
			originallink = '/';
		}

		//var link = CONTEXT_ROOT + link + "?productId="+var1+"&navAction="+var2+"&navCount="+var3+"&originallink="+originallink+"&isdefaultcatalog=Y&categoryIdTmp="+var6+"&showSoldOut="+showSoldOut+"&picker="+picker;
		var link = CONTEXT_ROOT + link + "?productId="+var1+"&navAction="+var2+"&navCount="+var3+"&originallink="+originallink+"&isdefaultcatalog=Y&showSoldOut="+showSoldOut+"&picker="+picker+"&fm="+fm;
		$('#quickViewModal #quickView').load(link, function(){
			var $this = $(this);

			$('#quickViewModal').foundation('reveal', 'open');

			$this.find('.galleryNav a.personalization').click(window.personalizationModalDisplay);

			if (picker !="allSku"){
				$("#firstSKUImagequick").click();
			}

			// reflow section
			$this.foundation('section', 'reflow');

			// reinit section tabs
			$this.on('click', '.section-container section', function(e){
				e.preventDefault();
				$(this).addClass('active').siblings('section').removeClass('active');
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
				$('.tabs-content .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
				$('.section-container .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
				$('.text-sizer a').removeClass('active');
				$this.addClass('active');
			});

		});
		return true;
	}

	function zeroPad(num, places) {
		var zero = places - num.toString().length + 1;
		return Array(+(zero > 0 && zero)).join("0") + num;
	}

	function handleUpdateQuantityKeyPress (e) {
		if (e.which == 13) {
			var theTarget = e.target;
			var theParentTD = $(theTarget).closest('td');
			var theLink = theParentTD.find('.updateQuantityLink');
			//theLink.get(0).click();
			submitFormUpdate(e.target.id, 'U');
			e.preventDefault();
			return false;
		}
		else {
			return isNumeric(event);
		}
	}

	function handleApplyCouponKeyPress (e) {
		if (e.which == 13) {
			$('#applyCouponInput').val($('#applyCouponInput').val().toUpperCase());
			$('#submitCoupon').click();
			e.preventDefault();
			return false;
		}
	}

	function AddToCartFavorites () {
		// see application-non-responsive.js
	}

	function setGiftMessage(giftMessageField){
		var giftMessage = $(giftMessageField).attr("value");
		$.ajax({
			url:CONTEXT_ROOT + 'checkout/setGiftMessage.jsp?giftMessage='+giftMessage,
			success: function(data)
			{
				//alert(giftMessage);
			}
		});
	}
	function showSplitShipments(lineId, commerceitem, qty, orderId, image,installmentPlan){
		var qv = $('#clickForDetailsModal'),
		link = CONTEXT_ROOT+"my_account/order_history/modals/multiple_shipments.jsp?line="+lineId+"&ci="+commerceitem+"&qty="+qty+"&orderId="+orderId+"&img="+image+"&installmentPlan="+installmentPlan;
		qv.load(link, function(response, status, xhr){
			var return_values = response.split(',');
			if(typeof return_values !== 'undefined' && return_values.length == 2 && return_values[0] == 'session_expired') {
				// session expired
				var redirectUrl = return_values[1];
				window.location = redirectUrl;
			} else {
				$('#clickForDetailsModal').foundation('reveal', 'open');
			}
		});
	}
	/*function showMultipleShipments(lineId, commerceitem, qty, orderId, image){
		//function showMultipleShipments(lineId, commerceitem, qty, prodId, orderId){
		var qv = $('#orderTrackingDetails'),
		//link = CONTEXT_ROOT+"my_account/order_history/modals/multiple_shipments.jsp?line="+lineId+"&ci="+commerceitem+"&qty="+qty+"&prodId="+prodId+"&orderId="+orderId;
		link = CONTEXT_ROOT+"my_account/order_history/modals/multiple_shipments.jsp?line="+lineId+"&ci="+commerceitem+"&qty="+qty+"&orderId="+orderId+"&img="+image;
		qv.load(link, function(){

		$('#orderTrackingDetails').foundation('reveal', 'open');

		});
	}*/

	//CLICK TO CHAT
	//Click to Chat vars
	window.eGain = {};
	eGain.egainChatParameters = {};
	eGain.postChatAttributes  = false;
	eGain.serverName = "ltdcommodities.egain.cloud" //this is the production server name
	eGain.template = "LTD" //default value. See function eglv_setEntryPoint(). Also see eglv_openHelp().
	eGain.entryPoint = "1006"; //default value. See function eglv_setEntryPoint(). Also see eglv_openHelp().
	eGain.refererurl = encodeURIComponent(document.location.href); //used in eglv_setEntryPoint() and eglv_openHelp().
	eGain.page = '';

	//Click to Chat Initialization
	eGain.offerCheck = function(page){
		switch(page){
			case 'signin':
				var errorText = $('#passwordRecoveryForm small').text().toLowerCase();
				if(errorText.indexOf('user not found - for assistance') > -1)
				{
					eGain.eglv_checkAgentAvailability();
				}
				else if(errorText.indexOf('your request cannot be completed') > -1)
				{
					eGain.eglv_checkAgentAvailability();
				}
			break;
			case 'payment':
				if(eGain.offerTimeout)
				{
					clearTimeout(eGain.offerTimeout);
				}

				eGain.offerTimeout = setTimeout(function(){
					eGain.eglv_checkAgentAvailability();
				}, 30000);

				if($('#splitCardOne .error').length)
				{
					eGain.eglv_checkAgentAvailability();
				}

			break;
			//added for ACAP one page checkout
			case 'checkout':
					eGain.eglv_checkAgentAvailability();
			break;
			case 'pay_invoice':
				eGain.eglv_checkAgentAvailability();
			break;
			case 'faq':
				eGain.eglv_checkAgentAvailability();
			break;
			case 'cancel_keep':
				eGain.eglv_checkAgentAvailability();
			break;
			case 'legacy':
				eGain.eglv_checkAgentAvailability();
			break;
		}
	}


	//Click to Chat public (these need to remain public as they're altered by eGain's script)
	window.eglvchathandle = null;

	//Click to Chat supporting functions
	eGain.eglv_checkAgentAvailability = function(){
		//creates the agent ability check script element
		eGain.eglv_setEntryPoint( eGain.page );
		//below code excludes legacy page because it has been handle differently on update_username.jsp
		if (eGain.page != 'legacy'){
			$("#chat-available").css("display","block");
		}
	}

	eGain.setPage = function(){
		var bodyClass = $('body').attr('class');
		//added for ACAP one page checkout
		var bodyIdName = $('body').attr('id');
		if (bodyClass != null && bodyClass.indexOf('signin') > -1) {
			eGain.page = 'signin';
		}
		else if (bodyClass != null && bodyClass.indexOf('payment') > -1) {
			eGain.page = 'payment';
		}
		//added for new pay invoice online
		else if (bodyClass != null && bodyClass.indexOf('pay_invoice_online') > -1) {
			eGain.page = 'pay_invoice';
		}
		//added for new faq page
		else if (bodyClass != null && bodyClass.indexOf('faq') > -1) {
			eGain.page = 'faq';
		}
		//added for ACAP one page checkout
		if(bodyIdName != null && bodyIdName.indexOf('onePageCheckout') > -1) {
			eGain.page = 'checkout';
		}
		//Cancel/Keep items
		if($("#cancel-item-container").length > 0){
			eGain.page = 'cancel_keep';
		}
		//added for legacy login modal if user already exists
		if ($(".chat-available-reveal")[0]){
			eGain.page = 'legacy';
		}
	}


	eGain.eglv_setEntryPoint = function ( queue ){
		/* I just implemented a template check based on document.location--if you have a different preferred method, by all means use it.

		The mapping is as follows:

		1001: ABC Payment
		1002: ABC Sign In & Registration
		1003: Lakeside Payment
		1004: Lakeside Sign In & Registration
		1005: LTD Payment
		1006: LTD Sign In & Registration

		If for whatever reason the below code doesn't execute, we wil use the defaults as defined above (1006 and LTD, for LTD Sign In).
		*/

		var site = $('meta[name="site"]').attr('content');
		if (site === 'LS') {
			eGain.template = "Lakeside";
			if( queue == "payment" ){
				eGain.entryPoint = "1003";
			}else if( queue == "signin" ){
				eGain.entryPoint = "1004";
			}else if( queue == "checkout" ){
				eGain.entryPoint = "1009";
			}else if( queue == "faq" ){
				eGain.entryPoint = "1015";
			}else if( queue == "cancel_keep" ){
				eGain.entryPoint = "1018";
			}else if( queue == "pay_invoice" ){
				eGain.entryPoint = "1019";
			}
		}else if (site === 'LTD'){
			eGain.template = "LTD";
			if( queue == "payment" ){
				eGain.entryPoint = "1005";
			}else if( queue == "signin" ){
				eGain.entryPoint = "1006";
			}else if( queue == "pay_invoice" ){
				eGain.entryPoint = "1013";
			}else if( queue == "checkout" ){
				eGain.entryPoint = "1008";
			}else if( queue == "legacy" ){
				eGain.entryPoint = "1011";
			}else if( queue == "faq" ){
				eGain.entryPoint = "1014";
			}else if( queue == "cancel_keep" ){
				eGain.entryPoint = "1017";
			}
		}
		//fundraising overrides all other chat entry points to 1016, just checking if snackbar class .shoppingFor exist.	
		if($(".shoppingFor").length > 0){
			eGain.entryPoint = "1016";
		}
		
	}

	eGain.eglv_openHelp = function ( ) {

		try{
	        if( eglvchathandle != null && eglvchathandle.closed == false ){
	            eglvchathandle.focus();
	        return;
	        }
	    }
	    catch(err){}
	    var domainRegex = /^((?:https?:\/\/)?(?:www\.)?([^\/]+))/i;
	    var refererName = "";
	    refererName = encodeURIComponent(refererName);
	    var refererurl = encodeURIComponent(document.location.href);
	    var hashIndex = refererurl.lastIndexOf('#');
	    if(hashIndex != -1){
	        refererurl = refererurl.substring(0,hashIndex);
	    }
	    var eglvcaseid = (/eglvcaseid=[0-9]*/gi).exec(window.location.search);
	    var vhtIds = '';
	    if(typeof EGAINCLOUD != "undefined" && EGAINCLOUD.Account.getAllIds)
	    {
	        var ids = EGAINCLOUD.Account.getAllIds();
	        vhtIds = '&aId=' + ids.a + '&sId=' + ids.s +'&uId=' + ids.u;
	    }
	    var EG_CALL_Q = window.EG_CALL_Q || [];
	    EG_CALL_Q.push( ["enableTracker", true] );
	    var eGainChatUrl = "https://" + eGain.serverName + '/system/templates/chat/' + eGain.template + '/chat.html?entryPointId=' + eGain.entryPoint + '&templateName=' + eGain.template + '&languageCode=en&countryCode=US&ver=v11&postChatAttributes='+ eGain.postChatAttributes + '&eglvrefname=' + refererName + '&' + eglvcaseid+vhtIds;
        var domain = domainRegex.exec(eGainChatUrl)[0];
        if( window.navigator.userAgent.indexOf("MSIE") != -1 && eGain.postChatAttributes ) {
            var win = document.getElementById('testframe');
            win.contentWindow.postMessage(JSON.stringify(eGain.egainChatParameters), domain);
        }
	    if( (eGainChatUrl + refererurl).length <= 2000)
	        eGainChatUrl += '&referer='+refererurl;
	    var params = "height=623,width=419,resizable=yes,scrollbars=yes,toolbar=no";
	    eglvchathandle = window.open( eGainChatUrl,'',params)
        /*Message posted to the child window every second until it sends a message in return. This is done as we can not be sure when the mssage listener will be set in the child window.*/
        if( window.navigator.userAgent.indexOf("MSIE") == -1 && eGain.postChatAttributes ) {
            var messagePostInterval = setInterval(function(){
            var message = eGain.egainChatParameters;
            eGain.eglvchathandle.postMessage(message, domain);
            },1000);
            window.addEventListener('message',function(event) {
                if(event.data.chatParametersReceived) {
                    clearInterval(messagePostInterval);
                }
            },false);
        }

		fireTealiumEvent({
			"e_click_to_chat" : "t"
		});
	}

    /*To be called by client website. All the parameters specified in eGainLiveConfig must be set here.*/
	eGain.storeChatParameters = function(attributeName, attributeValue) {
		eGain.egainChatParameters[attributeName] = attributeValue;
    }
	eGain.writeIframeIfRequired = function() {
    	if(eGain.postChatAttributes  &&  window.navigator.userAgent.indexOf("MSIE") != -1 ) {
    		var iframe = document.createElement('iframe');
    		iframe.src=eGain.liveServerURL+'/system/web/view/live/customer/storeparams.html';
    		iframe.style.display = 'none';
    		iframe.id = 'testframe';
    		document.body.appendChild(iframe);
    	}
    }
	eGain.writeIframeIfRequired();

	$(document).ready(function(){
		eGain.setPage();
		$('#chat-available').bind('click', eGain.eglv_openHelp);
		eGain.offerCheck(eGain.page);
	});
    
/****************************************************
 * Formerly /media/global/ltd/scripts/application.js
 ****************************************************/
$(document).ready(function(){
	// Gives each field a title tag with the text from the label
	// Custom titles set for month/year fields
	$('.inline-prompt').each(function(){
		$(this).attr("title", $("label[for='" + $(this).attr('id') + "']").html());
	}).focus(function(){
		if ($(this).val() == $(this).attr("title")) {
			$(this).val("").removeClass("inline-prompt");
		}
	}).blur(function(){
		if ($(this).val() == "") {
			$(this).val($(this).attr("title")).addClass("inline-prompt");
		}
	});
});

/****************************************************
 * Formerly /media/endeca/scripts/scripts.js
 ****************************************************/
function doaction(var1, var2, var3, var4, var5, var6, showSoldOut) {
	//all sku testing
	//var1="prod470015"; //primary
	//var1="prod30618"; //duplicate
	//var1="prod1030540"; //primary no product image
	//var1="prod1070833"; //duplicate no product image
	//single picker personal
	//var1="prod890455"; //primary single picker personal
	//var1="prod1130292";// duplicate single picker personal
	//single picker
	//var1="prod1040011"; //primary single picker
	//var1="prod1030164"; // duplicate single picker
	//double picker personal
	//var1="prod880581"; //primary double picker personal
	//var1="prod890163"; //duplicate double picker personal
	//double picker
	//var1="prod1030563"; //primary double picker
	//var1="prod650401"; //duplicate double picker
	//var1="prod860742"; ///double picker
	//var1="prod860741"; ///single picker
	//var1="prod1231407"; //collection
	//var1="prod960250";

	//fireTealiumEvent({"e_quick_view" : "t"});

	$('div#quickView').empty();
	var isdefaultcatalog = '',
		link = '',
		originallink = '',
		picker = '',
		fm='';

	if (showSoldOut == null || showSoldOut == '') {
		showSoldOut = false;
	}

	if (var4.indexOf("single_picker_product")>=0) {
		picker="singlePicker";
	}
	else if (var4.indexOf("double_picker_product")>=0) {
		picker="doublePicker";
	}
	else if (var4.indexOf("all_sku_listing")>=0) {
		picker="allSku";
	}
	else if (var4.indexOf("sp_personal")>=0) {
		picker="singlePickerPersonal";
	}
	else if (var4.indexOf("dp_personal")>=0) {
		picker="doublePickerPersonal";
	}
	else if (var4.indexOf("product_collection")>=0) {
		picker="allSku";
	}

	link = "catalog/modals/product.jsp";
	//link = "catalog/modals/quick_all_view_responsive.jsp";

	if (var5 != null && var5.length>=1) {
		if (var5.substring(0,1)=="/") {
			var5 = var5.substring(1,var5.length)
		}
		var5 = var5.replace("==","'");
		if (var5.indexOf("?fm=")>=0) {
			fm = var5.substring(var5.indexOf("?fm")+4);
			var5 = var5.substring(var5.indexOf("/site"), var5.indexOf("?fm"));
			isdefaultcatalog = "Y";		}
		originallink = CONTEXT_ROOT + escape(var5);
	}
	else {
		originallink = CONTEXT_ROOT;
	}

	// just testing isdefaultcatalog
	isdefaultcatalog = "Y";

	originallink=originallink.replace(/ /g,"+");

	//to fix xss issues the next three conditions
	if (var2 == null || var2 == '') {
		var2 = 'jump';
	}
	if (var3 == null || var3 == '') {
		var3 = '0';
	}
	if (originallink == null || originallink == '') {
		originallink = '/';
	}
	if (isdefaultcatalog == "Y") {
		//var link = CONTEXT_ROOT + link + "?productId="+var1+"&navAction="+var2+"&navCount="+var3+"&originallink="+originallink+"&isdefaultcatalog="+isdefaultcatalog+"&categoryIdTmp="+var6+"&showSoldOut="+showSoldOut+"&picker="+picker;
		var link = CONTEXT_ROOT + link + "?productId="+var1+"&navAction="+var2+"&navCount="+var3+"&originallink="+originallink+"&isdefaultcatalog="+isdefaultcatalog+"&showSoldOut="+showSoldOut+"&picker="+picker+"&fm="+fm;

		$('#quickViewModal #quickView').load(link, function(){
			var $this = $(this);

			$this.find('.galleryNav a.personalization').click(window.personalizationModalDisplay);
			if (picker !="allSku"){
				$("#firstSKUImagequick").click();
			}

			// reflow section
			$this.foundation('section', 'reflow');

			// reinit section tabs
			$this.on('click', '.section-container section', function(e){
				$(this).addClass('active').siblings('section').removeClass('active');
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
				$('.tabs-content .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
				$('.section-container .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
				$('.text-sizer a').removeClass('active');
				$this.addClass('active');
			});
		});
	}
	else {
		//var link = CONTEXT_ROOT + link + "?productId="+var1+"&navAction="+var2+"&navCount="+var3+"&originallink="+originallink+"&categoryIdTmp="+var6+"&showSoldOut="+showSoldOut+"&picker="+picker;
		var link = CONTEXT_ROOT + link + "?productId="+var1+"&navAction="+var2+"&navCount="+var3+"&originallink="+originallink+"&showSoldOut="+showSoldOut+"&picker="+picker+"&fm="+fm;
		$('#quickViewModal #quickView').load(link, function(){
			var $this = $(this);

			if (picker !="allSku"){
				$("#firstSKUImagequick").click();
			}

			// reflow section
			$this.foundation('section', 'reflow');

			// reinit section tabs
			$this.on('click', '.section-container section', function(e){
				$(this).addClass('active').siblings('section').removeClass('active');
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
				$('.tabs-content .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
				$('.section-container .content').removeClass('normalFont mediumFont largeFont').addClass($this.attr('class'));
				$('.text-sizer a').removeClass('active');
				$this.addClass('active');
			});
		});
	}
	return false;
}

function tagQuickViewCartAdd(quickView) {
	var source = determineSource();
	var productId = "";
	var skuId = "";
	var quantity = "";
	var totalPrice = "";
	var unitPrice = "";
	var pin = "";

	var count = 0;
	if($('#firstPicker').length) {
		// a picker or personalized PDP
		console.log('detected a picker');
		quantity = $('#quantity').val();
		skuId = $("input[name='/atg/commerce/order/purchase/CartModifierFormHandler.catalogRefIds']").val();
		productId = $("input[name='/atg/commerce/order/purchase/CartModifierFormHandler.productId']").val();
		unitPrice = $('#quickView').find('span.price').html().replace('$', '');
		totalPrice = parseFloat(quantity)*parseFloat(unitPrice);
		pin = $('#spanSkuPinCode').html().replace('Item#:&nbsp;','');
		count = 1;
	} else {
		$('.prod-blockqv').each(function(){
			if($(this).find('.qtyFld').val() > 0) {
				productId += $(this).find("input[class^='xxxprodidsku']").val() + ',';
				skuId += $(this).find("input[name='PinNumber']").val() + ',';
				var tempQty = $(this).find('.qtyFld').val();
				quantity +=  tempQty + ',';
				var tempUnitPrice = $(this).find('.ensemble-price span').html().replace('$','');
				unitPrice += tempUnitPrice + ',';
				totalPrice += tempUnitPrice * tempQty + ',';
				pin += $(this).find("input[class='xxx" + $(this).find("input[name='PinNumber']").val() + "']").val() + ',';
				count++;
			}
		});
	}

	if(count > 0) {
		fireTealiumAjaxEvent({
			"pagename" : "cart-add",
			"pagetype" : "cart-add",
			"action" : "qv",
			"productId" : productId,
			"skuId" : skuId,
			"quantity" : quantity,
			"totalPrice" : totalPrice,
			"unitPrice" : unitPrice,
			"pin" : pin,
			"source" : source
		});
	}
}

function smallImageSelectedOnSinglePickerQuickInitialize(selectedLi, urlLargeImg, productId, skuId, showSoldOut, isPersonalized, isCatQuickOrder) {
	$("#quickView #firstPicker > li >a").each(function() {
		$(this).removeClass("blue");
	});
	$("#btn_" + skuId + "> a").addClass("blue");

}

function smallImageSelectedOnSinglePickerQuick(selectedLi, urlLargeImg, productId, skuId, showSoldOut, isPersonalized, isCatQuickOrder, defaultsku) {
	if (productId && skuId) {
		updateSKUInformationQuick(skuId, productId, '', showSoldOut, isCatQuickOrder, isPersonalized, defaultsku);
		$("#quickView #firstPicker > li >a").each(function() {
			$(this).removeClass("blue");
		});
		if (typeof defaultsku == 'undefined') {
		$("#btn_" + skuId + "> a").addClass("blue");
		}
	}
	var x= $("#numberofskusqv").attr("data-value");
	if(typeof(x) != "undefined"){
		if ( x == 1){
			$("#quickView #firstPicker > li > a").each(function() {
				$(this).addClass("blue");
				});
		}
	}
	updateLargeImageQuick(urlLargeImg);
	resetSmallImageLiQuick();
	$(selectedLi).addClass ("selected");
}

function updateSKUInformationQuick(skuId, productId, findMethod, showSoldOut, isCatQuickOrder, isPersonalized, defaultsku) {
	if (showSoldOut == null || showSoldOut == '') {
		showSoldOut = false;
	}

	if (isCatQuickOrder == null || isCatQuickOrder == '') {
		isCatQuickOrder = "N";
	}

	if (isPersonalized == "Y"){
		$("#personalizationQV").load(CONTEXT_ROOT + "catalog/includes/inc_personalized_form.jsp" , "productId=" + productId + "&skuId=" + skuId + "&qv=QV");
	}

	var detailHref = $("a#detailLink").attr('href'),
		newurl = '';

	var showSkuDetails=false;
	if (typeof defaultsku != 'undefined') {
		//do not show availability, pin code
		showSkuDetails=false;
	}else{
		//showavailability, pin code
		showSkuDetails=true;
	}

	if (findMethod != "") {
		newurl = CONTEXT_ROOT + "catalog/modals/includes/inc_sku_shopping_cart.jsp?skuId=" + skuId + "&productId=" + productId + "&showSoldOut=" + showSoldOut + "&quickorder=" + isCatQuickOrder + "&fm=" + findMethod + "&isPersonalized=" + isPersonalized+ '&showSkuDetails='
		+ showSkuDetails;
	}
	else {
		newurl = CONTEXT_ROOT + "catalog/modals/includes/inc_sku_shopping_cart.jsp?skuId=" + skuId + "&productId=" + productId + "&showSoldOut=" + showSoldOut + "&quickorder=" + isCatQuickOrder + "&isPersonalized=" + isPersonalized+ '&showSkuDetails='
		+ showSkuDetails;
	}

	$.ajax({
		url: newurl,
		success: function(data) {
			$('#quickView .itemInfo').html(data);
			$("a#moreDetailsLink").attr('href', detailHref);
			//update availability information
			$('#quickViewAvailabilityPlaceholder').text($('#quickViewAvailabilityMsg').val());
			//update pinCode
			$('#quickView span.itemNumber span').text($('#quickViewPinCode').val());
		}
	});

	if (typeof defaultsku != 'undefined') {
		$.ajax({
			url: CONTEXT_ROOT+ "catalog/modals/includes/inc_product_name_and_pricing.jsp?skuId="+skuId+"&productId="+productId+"&isPersonalized="+isPersonalized,
			success: function(data) {
				$('#quickView #product_name_sku_price').html(data);
				$("a#detailLink").attr('href', detailHref);
			}
		});
	}
	else{
		$.ajax({
			url: CONTEXT_ROOT+ "catalog/modals/includes/inc_product_name_and_pricing.jsp?skuId="+skuId+"&productId="+productId+"&isPersonalized="+isPersonalized+"&skuViewObj=Y",
			success: function(data) {
				$('#quickView #product_name_sku_price').html(data);
				$("a#detailLink").attr('href', detailHref);
			}
		});
	}
}

function singlePickerSelectedQuick(selectedLi, urlLargeImg, productId, skuId, findMethod, showSoldOut, isCatQuickOrder, isPersonalized) {
	if (showSoldOut == null || showSoldOut == '') {
		showSoldOut = false;
	}
	if (isCatQuickOrder == null || isCatQuickOrder == '') {
		isCatQuickOrder = "N";
	}
	if (productId && skuId) {
		updateSKUInformationQuick(skuId, productId, findMethod, showSoldOut, isCatQuickOrder, isPersonalized);
	}
	updateLargeImageQuick(urlLargeImg);
	$("#quickView #firstPicker > li > a").each(function(){
		$(this).removeClass("blue");
	});
	var x= $("#numberofskusqv").attr("data-value");
	if(typeof(x) != "undefined"){
		if ( x == 1){
			$("#quickView #firstPicker > li > a").each(function() {
				$(this).addClass("blue");
				});
		}
	}
	resetSmallImageLiQuick();
	$(selectedLi).children("a").addClass("blue");
	$("#quickView #img_"+skuId).addClass("selected");
}

function firstPickerSelectedQuick(selectedLi, findMethod, showSoldOut, isCatQuickOrder, isPersonalized) {
	if (showSoldOut == null || showSoldOut == '') {
		showSoldOut = false;
	}
	/* defect 445. if the first picker is sold out, it's styling (being grey and not selectable) is
	 * handled in inc_first_picker.jsp. setting showSoldOut to false will ensure the second picker
	 * styling is correct for available first picker skus.
	 */
	showSoldOut = false;

	if (isCatQuickOrder == null || isCatQuickOrder == '') {
		isCatQuickOrder = "N";
	}

	var productId = $("#quickView #productId").val();
	if ($(selectedLi).children("a").attr("class") == "blue") {
		return;
	}

	$("#quickView #firstPicker > li > a").each(function(){
		$(this).removeClass("blue");
	});

	$(selectedLi).children("a").addClass("blue");
	var firstPicker = $(selectedLi).children("a").text(),
		secondPicker;
	if ($('#quickView #secondPicker a.blue').length != 0) {
		$("#secondPicker > li > a").each(function() {
			if ($(this).attr("class") == "button radius blue") {
				secondPicker = $(this).text();
			}
		});
		var skuId;
		$.ajax({
			url:CONTEXT_ROOT + 'catalog/modals/includes/inc_second_picker.jsp?productId='+productId+'&paramFirstPickerValue='+firstPicker+'&paramSecondPickerValue='+secondPicker+'&showSoldOut='+showSoldOut+'&quickorder='+isCatQuickOrder+'&isPersonalized='+isPersonalized,
			success: function(data) {
				$("#quickView #secondPickerDiv").html(data);
				skuId = $("#quickView #SelectedSkuID").val();
				if(productId && skuId){
					//This is to handle sku which is out of stock
					if ($('#secondPicker a.blue').length == 0) {
						updateSKUInformationQuick(skuId,productId, findMethod, showSoldOut, isCatQuickOrder, isPersonalized, "defaultsku");
					}
					else {
						updateSKUInformationQuick(skuId,productId, findMethod, showSoldOut, isCatQuickOrder, isPersonalized);
					}
				}
				resetSmallImageLiQuick();
				$("#quickView #img_"+skuId).addClass("selected");
				//This is to handle sku which is out of stock
				if ($('#secondPicker a.blue').length == 0) {
					var firstPicker1= firstPicker.replace("'",'-')
					firstPicker1= firstPicker1.replace(/ /g,'-')
					updateLargeImageQuick($("#quickView #largeImage_"+firstPicker1).val());
				}
				else{
					updateLargeImageQuick($("#quickView #largeImage_"+skuId).val());
				}
			}
		});
	}
	else {
		var firstPicker1 = firstPicker.replace("'",'-');
		firstPicker1 = firstPicker1.replace(/ /g,'-');
		secondPicker = $("#quickView #"+firstPicker1).val();
		$.ajax({
			url:CONTEXT_ROOT + 'catalog/modals/includes/inc_second_picker.jsp?productId='+productId+'&paramFirstPickerValue='+firstPicker+'&paramSecondPickerValue='+secondPicker+'&showSoldOut='+showSoldOut+'&quickorder='+isCatQuickOrder+'&isPersonalized='+isPersonalized+'&selected=N',
			success: function(data) {
				$("#quickView #secondPickerDiv").html(data);
				skuId = $("#quickView #SelectedSkuID").val();
				if (productId && skuId) {
					updateSKUInformationQuick(skuId,productId, findMethod, showSoldOut, isCatQuickOrder, isPersonalized, "defaultsku");
				}
			}
		});
		updateLargeImageQuick($("#quickView #largeImage_"+firstPicker1).val());
	}
}

function smallImageSelectedOnListingQuickInitialize(selectedLi,urlLargeImage,skuId,productId,skuPinCode, caption) {
	$('#quickView span.itemNumber span').text(skuPinCode);
	$(selectedLi).addClass('selected');
	if(skuId) {
		$('#quickView a').each(function() {
			if ($(this).hasClass('selected') && !$(this).hasClass('sizeChart')){
				$(this).removeClass('selected');
				$(this).addClass('not_selected');
			}
		});
		$('#quickView #a_'+skuId).addClass('selected');
		$('#quickView #a_'+skuId).removeClass('not_selected');
	}
}

function smallImageSelectedOnListingQuick(selectedLi,urlLargeImage,skuId,productId,skuPinCode, caption, defaultsku) {
	$('#quickView span.itemNumber span').text(skuPinCode);
	var detailHref = $("a#detailLink").attr('href');
	if (typeof defaultsku == 'undefined') {
	$.ajax({
		url:CONTEXT_ROOT +  "catalog/modals/includes/inc_product_name_and_pricing.jsp?skuId="+skuId+"&productId="+productId,//+"&skuViewObj=Y",
		success: function(data) {
			$('#quickView #product_name_sku_price').html(data);
			$("a#detailLink").attr('href', detailHref);
		}
	});
	}
	updateLargeImageQuick(urlLargeImage, caption);
	resetSmallImageLiQuick();
	$(selectedLi).addClass('selected');
	if(skuId) {
		$('#quickView a').each(function() {
			//if($(this).hasClass('selected')){
			if (!$(this).hasClass('sizeChart')){
				$(this).removeClass('selected');
				$(this).addClass('not_selected');
			}
			//}
		});
		$('#quickView #a_'+skuId).addClass('selected');
		$('#quickView #a_'+skuId).removeClass('not_selected');
	}
}

function activeSkuSelectedOnListingQuick(urlLargeImg,skuId,productId, findMethod,skuPinCode) {
	$('#quickView span.itemNumber span').text(skuPinCode);
	var detailHref = $("a#detailLink").attr('href');
	$.ajax({
		url:CONTEXT_ROOT + "catalog/modals/includes/inc_product_name_and_pricing.jsp?skuId="+skuId+"&productId="+productId,// + "&skuViewObj=Y",
		success: function(data) {
			$('#quickView #product_name_sku_price').html(data);
			$("a#detailLink").attr('href', detailHref);
		}
	});
	updateLargeImageQuick(urlLargeImg);
	resetSmallImageLiQuick();

	$('#quickView a').each(function() {
		if ($(this).hasClass('selected') && !$(this).hasClass('sizeChart')) {
			$(this).removeClass('selected');
			$(this).addClass('not_selected');
		}
	});

	$('#quickView #a_'+skuId).addClass('selected');
	$('#quickView #a_'+skuId).removeClass('not_selected');
	//update the pinCode
	$('div.displayItem').text("Item#: " + skuPinCode);
}

function secondPickerSelectedQuick(selectedLi, findMethod, showSoldOut, isCatQuickOrder, isPersonalized, caption) {

	if (showSoldOut == null || showSoldOut == '') {
		showSoldOut = false;
	}
	if (isCatQuickOrder == null || isCatQuickOrder == '') {
		isCatQuickOrder ="N";
	}

	var productId=$("#productId").val();
	if($(selectedLi).children("a").attr("class") == "blue"){
		return;
	}
	$("#quickView #secondPicker > li > a").each(function() {
		$(this).removeClass("blue");
	});
	$(selectedLi).children("a").addClass("blue");

	//if ($('#quickView #firstPicker a.blue').length == 0) {
	//	$('#quickView #firstPicker li.blue a').trigger('click');
	//}
	if ($('#quickView #firstPicker a.blue').length != 0) {
	var secondPicker = $(selectedLi).children("a").text(),
		firstPicker;
	$("#firstPicker > li > a").each(function() {
		if ($(this).attr("class") == "button radius blue") {
			firstPicker = $(this).text();
		}
	});

	var skuId;
	$.ajax({
		url: CONTEXT_ROOT + 'catalog/modals/includes/inc_second_picker.jsp?productId='+productId+'&paramFirstPickerValue='+firstPicker+'&paramSecondPickerValue='+secondPicker+'&showSoldOut='+showSoldOut+'&quickorder='+isCatQuickOrder+'&isPersonalized='+isPersonalized,
		success: function(data) {
			$('#quickView #secondPickerDiv').html(data);
			skuId = $("#quickView #SelectedSkuID").val();

			if (productId && skuId) {
				updateSKUInformationQuick(skuId, productId, findMethod, showSoldOut, isCatQuickOrder, isPersonalized);
			}
			resetSmallImageLiQuick();
			$("#quickView #img_"+skuId).addClass("selected");
			updateLargeImageQuick($("#quickView #largeImage_"+skuId).val(), caption);
		}
	});
	$.ajax({
		url : CONTEXT_ROOT
				+ 'catalog/modals/includes/inc_first_picker.jsp?productId='
				+ productId + '&paramFirstPickerValue=' + firstPicker
				+ '&paramUserSelectedSecondPickerValue=' + secondPicker + '&showSoldOut='
				+ showSoldOut + '&quickorder=' + isCatQuickOrder
				+ '&isPersonalized=' + isPersonalized,
		success : function(data) {
			$('#quickView #firstPickerDiv').html(data);
		}

	});
	}else{
		var secondPicker = $(selectedLi).children("a").text();
		$.ajax({
			url : CONTEXT_ROOT
					+ 'catalog/modals/includes/inc_first_picker.jsp?productId='
					+ productId
					+ '&paramUserSelectedSecondPickerValue=' + secondPicker + '&showSoldOut='
					+ showSoldOut + '&quickorder=' + isCatQuickOrder
					+ '&isPersonalized=' + isPersonalized,
			success : function(data) {
				$('#quickView #firstPickerDiv').html(data);

			}

		});
	}

}

function clearPickersQuick(){
	$("#quickView #secondPicker > li > a").each(function() {
		$(this).removeClass("blue");
	});
	$("#quickView #firstPicker > li > a").each(function() {
		$(this).removeClass("blue");
	});
	var x= $("#numberofskusqv").attr("data-value");
	if(typeof(x) != "undefined"){
		if ( x == 1){
			$("#quickView #firstPicker > li > a").each(function() {
				$(this).addClass("blue");
				});
		}
	}

}

function clearDoublePickersQuick(productId, showSoldOut, isPersonalized, isCatQuickOrder){

	firstPicker=$("#clearfirstPickerQuick").val();
	secondPicker=$("#clearsecondPickerQuick").val();

	$("#quickView #firstPickerDiv").load(CONTEXT_ROOT + "catalog/modals/includes/inc_first_picker.jsp" , "productId="+productId+"&paramFirstPickerValue="+firstPicker+"&paramSecondPickerValue="+secondPicker+"&showSoldOut="+showSoldOut+"&isPersonalized="+isPersonalized+"&quickorder="+isCatQuickOrder+'&selected=N');

	var skuId;
		$.ajax({
			url:CONTEXT_ROOT + 'catalog/modals/includes/inc_second_picker.jsp?productId='+productId+'&paramFirstPickerValue='+firstPicker+'&paramSecondPickerValue='+secondPicker+'&showSoldOut='+showSoldOut+'&isPersonalized='+isPersonalized+'&selected=N&clear=Y',
			success: function(data) {
				$('#quickView #secondPickerDiv').html(data);
				skuId = $("#quickView #SelectedSkuID").val();
				if (productId && skuId) {
					//isCatQuickOrder
					updateSKUInformationQuick(skuId, productId, '', showSoldOut, isCatQuickOrder, isPersonalized, "defaultsku");
				}
			}
		});

		$("#secondPicker > li > a").each(function() {
			$(this).removeClass("blue");
		});
		$("#firstPicker > li > a").each(function() {
			$(this).removeClass("blue");
		});
	}

function smallImageSelectedOnDoublePickerQuickInitialize(selectedLi, urlLargeImage, firstPicker, secondPicker, showSoldOut, isPersonalized, isCatQuickOrder, defaultsku) {
	//If default sku is passed, means we need to load a sku to the hero image, product level image does not exist
	if (typeof defaultsku != 'undefined') {
		updateLargeImageQuick(urlLargeImage);
		resetSmallImageLiQuick();
	}


	$("#quickView #secondPicker > li > a").each(function() {
		$(this).removeClass("blue");
	});
	$("#quickView #firstPicker > li > a").each(function() {
		$(this).removeClass("blue");
	});


}

function smallImageSelectedOnDoublePickerQuick(selectedLi, urlLargeImage, firstPicker, secondPicker, showSoldOut, isPersonalized, isCatQuickOrder, defaultsku) {
	$("#firstSKUImagequick").each(function (){
		$(this).removeClass("selected");
	});
	if (showSoldOut == null || showSoldOut == '') {
		showSoldOut = false;
	}

	//Need test to update the same as double picker page!!!
	if($(selectedLi).attr("class")=="selected") {
		return;
	}
	//console.log("urlLargeImage::"+urlLargeImage);
	updateLargeImageQuick(urlLargeImage);
	resetSmallImageLiQuick();

	var isDuplicateImages = $("#isDuplicateImages").val();
	var selected;

	if (isDuplicateImages == 'true') {
		selected = "&selected=N";

	}else {
		selected = "&selected=Y";

	}
//'&selected=N'
	var productId=$("#productId").val();
	$("#quickView #firstPickerDiv").load(CONTEXT_ROOT + "catalog/modals/includes/inc_first_picker.jsp" , "productId="+productId+"&paramFirstPickerValue="+firstPicker+"&paramSecondPickerValue="+secondPicker+"&showSoldOut="+showSoldOut+"&isPersonalized="+isPersonalized+"&quickorder="+isCatQuickOrder);

	var skuId;
	$.ajax({
		url:CONTEXT_ROOT + 'catalog/modals/includes/inc_second_picker.jsp?productId='+productId+'&paramFirstPickerValue='+firstPicker+'&paramSecondPickerValue='+secondPicker+'&showSoldOut='+showSoldOut+'&isPersonalized='+isPersonalized+selected,
		success: function(data) {
			$('#quickView #secondPickerDiv').html(data);
			skuId = $("#quickView #SelectedSkuID").val();
			if (productId && skuId) {
				//isCatQuickOrder
				if (isDuplicateImages == 'true') {
					updateSKUInformationQuick(skuId, productId, '', showSoldOut, isCatQuickOrder, isPersonalized, "defaultsku");
				}else{
					updateSKUInformationQuick(skuId, productId, '', showSoldOut, isCatQuickOrder, isPersonalized);
				}
			}
		}
	});

}

function updateLargeImageQuick(url, caption, productId) {
	if (url &&  url.indexOf('_mn') >= 0) {
		updateProductImagesQuick(url)
	}
	else if (url &&  url.indexOf('_zm') >=0) {
		updateProductImagesQuick('', url);
	}
	if (typeof productId != 'undefined') {
		$.ajax({
			url : CONTEXT_ROOT + "catalog/modals/includes/inc_product_name_and_pricing.jsp?productId=" + productId,
			success : function(data) {
				$('#quickView #product_name_sku_price').html(data);
			}
		});
	}
}

function updateProductImagesQuick(mainImageUrl, zoomImageUrl) {
	if (mainImageUrl &&  !zoomImageUrl) {
		zoomImageUrl = mainImageUrl.replace('_mn', '_zm');
		mainImageUrl = zoomImageUrl;
	}
	else if (!mainImageUrl &&  zoomImageUrl) {
		mainImageUrl = zoomImageUrl;
	}
	updateMainImageQuick(mainImageUrl);
	updateZoomImageQuick(zoomImageUrl);
}

function resetSmallImageLiQuick() {
	$('#quickView .thumbnails > li').each(function() {
		$(this).removeClass('selected');
	});


}

function updateMainImageQuick(url) {
	$('#quickView .infoImg').attr('src', url);
}

function updateZoomImageQuick(url) {
	$('#quickView .zoomImg').attr('src', url);
}

function SiteCatalystQuickView(){
	var multiple = 'N',
		currentPin = '',
		currentPinShort = '',
		count = 0,
		siteId = $('#currentSite').val();
	$("input[name*='PinNumber']").each(function() {
		count = count + 1;
		var currentSku = $(this).val(),
			pinClassName = '.xxxpin' + currentSku;
		if (count == 1) {
			var pcn = $(pinClassName).val();
			if (typeof pcn === undefined) {
				currentPin = '';
			}
			else {
				currentPin = pcn;
			}
		}
		multiple = 'Y';
	});
	if (multiple == 'N') {
		currentPin = $('#quickViewPinCode').val();
	}
	if (siteId == 'LTD' || siteId == 'ABC') {
		if (currentPin !== undefined) {
			currentPinShort = currentPin.substring(0,11);
		}
		else {
			currentPinShort = '';
		}
	}
	else {
		if (currentPin !== undefined) {
			currentPinShort = currentPin.substring(0,6);
		}
		else {
			currentPinShort = '';
		}
	}
//	s.linkTrackVars = 'events,products';
//	s.linkTrackEvents = 'prodView,event3,event97';
//	s.pageName = $('#pagename').val();
//	s.events = 'prodView,event3,event97';
//	s.products = ';'+currentPinShort;
//	s.prop4 = $('#pagetype').val()
//	s.t();
}

function showMiniCartUpdate(data) {
	if (data.success != undefined) {
		var minicartTop = '48px',
			navWidthAdj = 0;
		navWidth = document.documentElement.clientWidth;
		if (navWidth >= 980) {
			minicartTop = (getBrand()==="LSC" ? "80px" : "69px");
			navWidthAdj = (navWidth-980)/2;
		}
		$('div#quickCartPopup').css("position", "absolute").css("right", navWidthAdj +"px").css("top", minicartTop);
		var numRand = Math.floor(Math.random()*999999); // additional arg added to defeat IE9 caching, defect 1798
		$("#quickCartPopup").load(CONTEXT_ROOT + "checkout/mini_cart.jsp" , "lastAddedItem="+data.lastAddedItem+"&lastAddedItemQty="+data.lastAddedItemQty+"&lastAddedItemProdId="+data.lastAddedItemProdId+"&AddedItem="+data.AddedItem+"&AddedItemQty="+data.AddedItemQty+"&AddedItemProdId="+data.AddedItemProdId+"&randArg="+numRand, function(){
			$(".cart-button span.round.label").load(CONTEXT_ROOT + "checkout/mini_cart.jsp span.itemsInCartBottom");
			window.location = "#";
			$("#showFlyOut").click();
		});
		resetPageQtys();
		if (!$("#errorMessage").hasClass("hidden")) {
			$("#errorMessage").addClass("hidden");
		}
		$('#personalizationErrors').remove();
	}
	else if (data.error != undefined) {
		var msg = data.error;
		$('#personalizationErrors').remove();
		var error = "<ul id='personalizationErrors'><li>"+msg+"</li></ul>";
		$('.product-error').prepend(error);
	}
}

function showMiniCartUpdateQuickView(data){
	if (data.success != undefined){
		if ($('body').hasClass('shoppingCart')) {
			window.location = "/checkout/shopping_cart.jsp";
		}
		else {
			var minicartTop = '48px';
				navWidthAdj = 0;
			navWidth = document.documentElement.clientWidth;
			if (navWidth >= 980) {
				minicartTop = (getBrand()==="LSC" ? "80px" : "69px");
				navWidthAdj = (navWidth-980)/2;
			}
			$('div#quickCartPopup').css("position", "absolute").css("right", navWidthAdj +"px").css("top", minicartTop);
			var numRand = Math.floor(Math.random()*999999); // additional arg added to defeat IE9 caching, defect 1798
			$("#quickCartPopup").load(CONTEXT_ROOT + "checkout/mini_cart.jsp" , "lastAddedItem="+data.lastAddedItem+"&lastAddedItemQty="+data.lastAddedItemQty+"&lastAddedItemProdId="+data.lastAddedItemProdId+"&AddedItem="+data.AddedItem+"&AddedItemQty="+data.AddedItemQty+"&AddedItemProdId="+data.AddedItemProdId+"&randArg="+numRand, function(){
				$(".cart-button span.round.label").load(CONTEXT_ROOT + "checkout/mini_cart.jsp span.itemsInCartBottom");
				window.location = "#";
				$("#showFlyOut").click();
				$('#quickViewModal').foundation('reveal', 'close');
			});
			resetPageQtys();
			if (!$("#quickView #errorMessage").hasClass("hidden")) {
				$("#quickView #errorMessage").addClass("hidden");
			}
			$('#quickView #personalizationErrors').remove();
		}
	}
	else if (data.error != undefined) {
		var msg = data.error;
		$('#quickView #personalizationErrors').remove();
		var error = "<ul id='personalizationErrors'><li>"+msg+"</li></ul>";
		$('#quickView .itemInfo').prepend(error);
	}
}

function resetPageQtys() {
	//var textBoxes = $(':text.qtyFld');
	var textBoxes = $('.qtyFld');
	if (textBoxes.length == 0) {
		textBoxes = $('input[type=tel][name*="quantity"]');
	}
	if (textBoxes.length > 0) {
		if (textBoxes.length == 1) {
			textBoxes.val(1);
		}
		else {
			textBoxes.val(0);
		}
	}
}

function addCookie(name,value,expirationMs) {
	if (expirationMs) {
		var date = new Date();
		date.setTime(date.getTime()+(expirationMs));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

/* Determines the source of a user add to cart.  Used for tealium tagging */
function determineSource() {
	// across the board, if the user adds to cart from a quick view page, source=quickview
	if($('#quickViewModal').hasClass('open')) {
		return "quickview";
	}

	return (window.location.href.indexOf('fm=search') > -1) ? "search" :
				(window.location.href.indexOf('pinSearch') > 1) ? "pinsearch" :
					(window.location.href.indexOf('fm=brhist') > -1) ? "browsing_history" :
						(window.location.href.indexOf('fm=upsell') > -1) ? "upsell" :
							(window.location.href.indexOf('catalog_quick') > -1) ? "catalog_quick_order" :
								(window.location.href.indexOf('fm=qvdetails') > -1) ? "qvdetails" :
									(window.location.href.indexOf('my_favorites') > -1) ? "my_favorites" :
										(window.location.href.indexOf('bookId=') > -1) ? "catalog" :
											(window.location.href.indexOf('cid=tell-a-friend') > -1) ? "tell-a-friend" : "browse";
}

function tagAddToCart() {
	//console.log("Add to cart");
try {
//throw new Error("Force Error");
		var source = determineSource();
		var productId = "";
		var skuId = "";
		var quantity = "";
		var totalPrice = "";
		var unitPrice = "";
		var pin = "";

		var count = 0;
		if($('#isPersonalizedpicker').length) {
			// a picker or personalized PDP
			console.log('detected a picker');
			quantity = $('#quantity').val();
			skuId = $("input[name='/atg/commerce/order/purchase/CartModifierFormHandler.catalogRefIds']").val();
			productId = $("input[name='/atg/commerce/order/purchase/CartModifierFormHandler.productId']").val();
			unitPrice = $('span.price').html().replace('$', '');
			totalPrice = parseFloat(quantity)*parseFloat(unitPrice);
			pin = $('#spanSkuPinCode').html().replace('Item#:&nbsp;','');
			count = 1;
		} else {
			$('.prod-block').each(function(index){
				// for all other PDPs
				if($(this).find("input[id^='quantity_']").val() > 0) {
					productId += $("input[name='/atg/commerce/order/purchase/CartModifierFormHandler.items["+index+"].productId']").val() + ',';
					skuId += $(this).find("input[name='PinNumber']").val() + ',';
					var tempQty = $(this).find("input[id^='quantity_']").val();
					quantity +=  tempQty + ',';
					var tempUnitPrice = $(this).find('.ensemble-price span').html().replace('$','');
					unitPrice += tempUnitPrice + ',';
					totalPrice += tempUnitPrice * tempQty + ',';
					pin += $(this).find("input[class^='xxx']").val() + ',';
					count++;
				}
			});
		}

		if(count > 0) {
			fireTealiumAjaxEvent({
				"pagename" : "cart-add",
				"pagetype" : "cart-add",
				"action" : "pdp",
				"productId" : productId,
				"skuId" : skuId,
				"quantity" : quantity,
				"totalPrice" : totalPrice,
				"unitPrice" : unitPrice,
				"pin" : pin,
				"source" : source
			});
		}

	} catch( e ){
		console.log( "Error in tagAddToCart" );
	}

}

function tagQuickOrder() {
	var source = determineSource();
	var quantity = "";
	var pin = "";
	var tagQuickOrder = true;
	var count = 0;
	//$('.quickOrder tr[id^=row]').each(function() {
	$('div[id^=showRow]').each(function() {
		var qtyIn = $(this).find("input[id^='qty']").val();
		var pinIn = $(this).find("input[id^='nbrprod']").val();

		// the current line is valid when:
		// ((pin is empty and quantity is empty) || (pin !empty and quantity !empty))
		var validInput = (qtyIn.length == 0 && pinIn.length == 0) || (qtyIn.length > 0 && pinIn.length > 0 && qtyIn > 0);

		if(!validInput) {
			tagQuickOrder=false;
			return false;
		}

		// only increment count when there's a line of actual data
		if(qtyIn.length > 0 && pinIn.length > 0 && qtyIn > 0) {
			quantity += qtyIn + ',';
			pin += pinIn + ',';
			count++;
		}
	});
	//we dont want to tag quick order items if any one item failed while add to cart.
	if(!tagQuickOrder || count == 0) {
		return false;
	}

	fireTealiumAjaxEvent({
		"pagename" : "cart-add",
		"pagetype" : "cart-add",
		"action" : "cqo",
		"quantity" : quantity,
		"pin" : pin,
		"source" : source
	});
}
function addAndroidMaxLength(){
	/* START:: fix for android devices filed max length not working as expected*/
	var ver = window.navigator.appVersion;
	ver = ver.toLowerCase();
	console.log(ver + "::version");
	if (ver.indexOf("android") >= 0) {
		var idMaxLengthMap = {};

		//loop through all input-text and textarea element
		$
				.each(
						$(':text, textarea, :password, :input'),
						function() {
							var id = $(this).attr('id'), maxlength = $(this)
									.attr('maxlength');

							//element should have id and maxlength attribute
							if ((typeof id !== 'undefined')
									&& (typeof maxlength !== 'undefined')) {
								idMaxLengthMap[id] = maxlength;

								//remove maxlength attribute from element
								$(this).removeAttr('maxlength');

								//replace maxlength attribute with onkeypress event
								$(this)
										.attr('onkeypress',
												'if(this.value.length >= '+maxlength+' ) return false;');
							}
						});

		//bind onchange & onkeyup events
		//This events prevents user from pasting text with length more then maxlength
		$(':text, textarea, :password, :input').bind(
				'change keyup',
				function() {
					var id = $(this).attr('id'), maxlength = '';
					if (typeof id !== 'undefined'
							&& idMaxLengthMap.hasOwnProperty(id)) {
						maxlength = idMaxLengthMap[id];
						if ($(this).val().length > maxlength) {

							//remove extra text which is more then maxlength
							$(this).val($(this).val().slice(0, maxlength));
						}
					}
				});
	}
	/* END:: fix for android devices filed max length not working as expected*/
}
function ExcludeUA(){
	//    Exclude Native Browser on Android 4
    ua = navigator.userAgent;
    if ( (ua.indexOf("Android 4.") != -1) && (ua.indexOf("AppleWebKit/534") != -1) ) {
		return true;
    } else {
		return false;
    }
}
function isBrowser(sBr){
	//    Generic client-side UA parse
    return ( navigator.userAgent.toLowerCase().indexOf( sBr.toLowerCase() ) != -1 ) ? true : false;
}
function IsSmall(){
	return jsMQ.isSmall();
}
jsMQcallback = $.Callbacks(), jsMQcurrent = "";
var jsMQ = {
	getVW : function(){
		vw=jQuery(window).width();
		if(vw  <= 480) return "s";
		if((vw >= 480) && (vw <= 748)) return "sl";
		if((vw >= 749) && (vw <= 965)) return "m";
		if(vw  >= 966) return "l";
	},
	pubVW : function(){
		vw = jsMQ.getVW();
		if(jsMQcurrent != vw){
			jsMQcurrent = vw;
			jsMQcallback.fire(vw);
		}
	},
	isSmall  : function(){ return ( jsMQ.getVW().charAt(0)=="s" ) ? true : false; },
	isMedium : function(){ return ( jsMQ.getVW()=="m" ) ? true : false; },
	isLarge  : function(){ return ( jsMQ.getVW()=="l" ) ? true : false; }
};
setInterval(jsMQ.pubVW, 1800);
//  Address Android Horz Scroll issue while Off Canvas is open
var nPosX=0, nPosY=0, bOff=false;
$(document).ready(function(){
	if( isBrowser("Andro") ){
		document.addEventListener('touchstart', function(e){
	        nPosX = e.changedTouches[0].pageX;
	        nPosY = e.changedTouches[0].pageY;
	        bOff = ( "none" == $(".exit-off-canvas").css("display") ) ? false : true;
	    }, false);

		document.addEventListener('touchmove', function(e){
	        if( bOff ){
		        if( Math.abs( e.changedTouches[0].pageX - nPosX ) >= Math.abs( e.changedTouches[0].pageY - nPosY )){
					e.preventDefault();
				}
			}
	    }, false);
	}
});
function genAlt(){
	//  Generate alt attribs for images without it, or have no value (equal sign)

	$("img").filter(
    function(){ return ( !$(this)[0].hasAttribute("alt") || ($(this)[0].hasAttribute("alt") && $(this).attr("alt").length <= 0));
    }).each(function(){ $(this).attr("alt", $(this).attr("src").split('/').pop().slice(0,-4)); });
};
function setAcs_skip(){
	//    A11y | Accessibility - Create Skip to main conent link target
	//    Only if large viewport AND two column layout
	if(jsMQ.isLarge() && ($(".large-8").length>=1) && ($("#js-acs-skip--a").length>=1) ){
		$(".large-8").first().attr("id", "acs-skip__target");
		$("#js-acs-skip--a").html("Skip to main content");
	}else{
		$("#js-acs-skip--a").remove();
	}
}
function getBrand(){
    if( document.location.hostname.toLowerCase().indexOf(".ltd") >= 0 ){
        return "LTD";
    }else{
        return "LSC";
    }
};

//Start session timeout logic.
// Set the date we're counting down to 30 minutes 10 seconds to be safe
var sesTimeOut = {
	countDown_start : 1810000,
	countDown : 0,
	logOutParm : true,
	sessionTimeOutTimeStamp : 0,
	"init" : function() {
		sesTimeOut.logOutParm = $("body").attr("data-session-timeout") || false;
		if (sesTimeOut.logOutParm) { // Page Supported
			sesTimeOut.countDown = sesTimeOut.countDown_start;
			// Update the count down every 1 second
			sesTimeOut.IntTimer = setInterval(sesTimeOut.sessionTimeOutInt,1000);
			var ajaxOpen = XMLHttpRequest.prototype.open;
			XMLHttpRequest.prototype.open = function() {
				this.addEventListener("load", function() {
					var sUrl = this.responseURL;
					if( this.responseURL ){
						if( (sUrl.toUpperCase().indexOf("MOUSEFLOW.COM") == -1) && (sUrl.toUpperCase().indexOf("TEALEAFTARGET.JSP") == -1) ){
							sesTimeOut.reset();
						}
					}
				});
				ajaxOpen.apply(this, arguments);
			};
		}
	},
	"sessionTimeOutInt" : function() {
		'use strict'
		//console.log("sesTimeOut | " + sesTimeOut.countDown + " | " + sesTimeOut.IntTimer + " | " + sesTimeOut.logOutParm);
		sesTimeOut.countDown = (sesTimeOut.countDown - 1000);
		var now = new Date().getTime();
		var minutes = Math.floor((sesTimeOut.countDown % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((sesTimeOut.countDown % (1000 * 60)) / 1000);
		if(sesTimeOut.countDown == 120000){
			sesTimeOut.sessionTimeOutTimeStamp = (new Date()).setMinutes(new Date().getMinutes()+2);
		}
		//console.log("sesTimeOutTimers | " + sesTimeOut.sessionTimeOutTimeStamp + " | " + now);
		if (sesTimeOut.countDown <= 0 || (sesTimeOut.sessionTimeOutTimeStamp != 0 && sesTimeOut.sessionTimeOutTimeStamp <= now)) { // When the count down is over, redirect to my-account.
			clearInterval(sesTimeOut.IntTimer);
			$.get("/common/expire_session.jsp", function(data, status) {
				window.location.href = "/my_account/index.jsp" + sesTimeOut.logOutParm;
			});
		}
		if (sesTimeOut.countDown < 120000) {
			if (!$("#session-dialog").hasClass("open")) {
				$("#session-dialog").foundation("reveal", "open");
			}
			if (minutes > 0) {
				document.getElementById("sessionMins").innerHTML = minutes + " min " + seconds + " sec ";
			} else {
				document.getElementById("sessionMins").innerHTML = seconds + " sec ";
			}
		}
	},
	"reset" : function() {
		sesTimeOut.countDown = sesTimeOut.countDown_start;
		sesTimeOut.sessionTimeOutTimeStamp = 0;
	}
};
sesTimeOut.init();

function keepMeAlive(){
	$.get("/common/keep_session_alive.jsp", function(data, status) {
		sesTimeOut.reset();
		$("#session-dialog").foundation("reveal", "close");
	});
};

//End