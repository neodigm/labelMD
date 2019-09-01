<%@taglib uri="dsp" prefix="dsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<dsp:importbean bean="/ltd/userprofiling/LTDSessionContext"/>
<dsp:page>

	<dsp:getvalueof var="shippingIsComplete" bean="LTDSessionContext.shippingComplete"/>
	<dsp:getvalueof var="billingIsComplete" bean="LTDSessionContext.billingComplete"/>
	<dsp:getvalueof var="shippingOptionsIsComplete" bean="LTDSessionContext.shippingOptionsComplete"/>
	<c:set var="shippingOptions" scope="request"><dsp:valueof bean="/atg/multisite/Site.allowShippingMethods.enabled" /></c:set>
	<c:choose>
		<c:when test="${shippingIsComplete && billingIsComplete}">
			<section class="ep_mnu" data-four-buttons="${shippingOptions}" >
			    <nav class="row show-for-small" style="padding: 0;margin-bottom: 8px;">
			        <div class="small-10 no-padding columns" >
			            <a class="editLink" onclick="updateShippingAddress();">
			            	<div class="top_stp_1 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="1">SHIPPING</div>
			            </a>
			            <a class="editLink" onclick="updatePaymentMetod();">
			            	<div class="top_stp_2 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="2">BILLING</div>
			            </a>
			            <c:choose>
							<c:when test="${shippingOptions}">
								<c:choose>
									<c:when test="${shippingOptionsIsComplete}">
							            <a class="editLink" onclick="updateShippingMethod();">
							            	<div class="top_stp_3 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="3">SHIPPING OPTIONS</div>							            	
							            </a>
							            <div class="top_stp_4 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="4">REVIEW ORDER</div>
										<c:set var="pagename" value="review-order" scope="request"/>
										<c:set var="page_type" value="checkout-review-order" scope="request"/>							            
									</c:when>
									<c:otherwise>
										<div class="top_stp_3 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="3">SHIPPING OPTIONS</div>
										<div class="top_stp_4 cmd_stp resp_top_stp resp_top_stp_d text-center" data-step="4">REVIEW ORDER</div>
										<c:set var="pagename" value="shipping-options" scope="request"/>
										<c:set var="page_type" value="checkout-shipping-options" scope="request"/>										
									</c:otherwise>
								</c:choose>      
			            	</c:when>
			            	<c:otherwise>
			            		<div class="top_stp_3 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="3">REVIEW ORDER</div>
								<c:set var="pagename" value="review-order" scope="request"/>
								<c:set var="page_type" value="checkout-review-order" scope="request"/>			            		
			            	</c:otherwise>
			            </c:choose>
			        </div>
			    </nav>
			</section>
		</c:when>
		<c:otherwise>
			<c:choose>
				<c:when test="${shippingIsComplete}">
					<section class="ep_mnu" data-four-buttons="${shippingOptions}">
					    <nav class="row show-for-small" style="padding: 0;margin-bottom: 8px;">
					        <div class="small-10 no-padding columns" >
					            <a class="editLink" onclick="updateShippingAddress();">
					            	<div class="top_stp_1 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="1">SHIPPING</div>
					            </a>
					            <div class="top_stp_2 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="2">BILLING</div>
								<c:choose>
									<c:when test="${shippingOptions}">					            
					            		<div class="top_stp_3 cmd_stp resp_top_stp resp_top_stp_d text-center" data-step="3">SHIPPING OPTIONS</div>
					            		<div class="top_stp_4 cmd_stp resp_top_stp resp_top_stp_d text-center" data-step="4">REVIEW ORDER</div>
					            	</c:when>
					            	<c:otherwise>
					            		<div class="top_stp_3 cmd_stp resp_top_stp resp_top_stp_d text-center" data-step="3">REVIEW ORDER</div>
					            	</c:otherwise>
					            </c:choose>
					        </div>
					    </nav>
					</section>										
					<c:set var="pagename" value="payment" scope="request"/>
					<c:set var="page_type" value="checkout-payment" scope="request"/>
				</c:when>
				<c:otherwise>
					<section class="ep_mnu" data-four-buttons="${shippingOptions}">
					    <nav class="row show-for-small" style="padding: 0;margin-bottom: 8px;">
					        <div class="small-10 no-padding columns" >
					            <div class="top_stp_1 cmd_stp resp_top_stp resp_top_stp_e text-center" data-step="1">SHIPPING</div>
					            <div class="top_stp_2 cmd_stp resp_top_stp resp_top_stp_d text-center" data-step="2">BILLING</div>
					            <c:choose>
									<c:when test="${shippingOptions}">
							            <div class="top_stp_3 cmd_stp resp_top_stp resp_top_stp_d text-center" data-step="3">SHIPPING OPTIONS</div>
							            <div class="top_stp_4 cmd_stp resp_top_stp resp_top_stp_d text-center" data-step="4">REVIEW ORDER</div>
									</c:when>
									<c:otherwise>
									    <div class="top_stp_3 cmd_stp resp_top_stp resp_top_stp_d text-center" data-step="3">REVIEW ORDER</div>
									</c:otherwise>
								</c:choose>
					        </div>
					    </nav>
					</section>										
					<c:set var="pagename" value="billing-shipping" scope="request"/>
					<c:set var="page_type" value="checkout-billing-shipping" scope="request"/>
				</c:otherwise>
			</c:choose>
		</c:otherwise>
	</c:choose>

	<!-- Start checkout_container_acap.jsp -->
	
	<c:set var="checkoutStepsDroplet" value="/ltd/droplets/CheckoutStepsDisplayDroplet"></c:set>
	<c:if test="${shippingOptions}">
		<c:set var="checkoutStepsDroplet" value="/ltd/droplets/PurchaseStepsDisplayDroplet"></c:set>
	</c:if>
	
	<dsp:droplet name="${checkoutStepsDroplet}">
		<dsp:param name="sessionContext" bean="LTDSessionContext" />
		<dsp:oparam name="output">
			<dsp:include page="/checkout/shipping_acap.jsp">
				<dsp:param name="shippingStep" param="displayShippingStep" />
			</dsp:include>
			<dsp:include page="/checkout/billing_acap.jsp">
				<dsp:param name="billingStep" param="displayBillingStep" />
			</dsp:include>
			<c:if test="${shippingOptions}">
				<dsp:include page="/checkout/shipping_options.jsp">
					<dsp:param name="shippingOptionsStep" param="displayShippingOptionsStep" />
				</dsp:include>
			</c:if>
			<dsp:include page="/checkout/order_review_acap.jsp">
				<dsp:param name="orderReviewStep" param="displayOrderReviewStep" />
			</dsp:include>
		</dsp:oparam>
	</dsp:droplet>
	
	<%-- Hidden span to store processing result of 'Place Order' button click --%>
	<span style="display:none" id="ProcessingResult"> <dsp:valueof param="resultType"/></span>

	<script>
	<% //  Small screen ever-present menu (sticky)%>
	
	$(document).ready(function() {    
	    $('.ep_mnu').addClass('ep_or').clone().insertAfter('.ep_mnu').addClass('ep_cl').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('ep_or').hide();
	
	    function ep_mnu_top() {
	        var iPs=$('.ep_or').offset(), iTp=iPs.top;               
	        if ($(window).scrollTop() >= (iTp)) {
	            oOrEl=$('.ep_or'), iCoOrEl=oOrEl.offset(), iL=iCoOrEl.left, iW=oOrEl.css('width');
	            $('.ep_cl').css('left',iL+'px').css('top',0).css('width',iW).show();
	            $('.ep_or').css('visibility','hidden');
	        } else {
	            $('.ep_cl').hide();
	            $('.ep_or').css('visibility','visible');
	        }
	    }
	    if( IsSmall() ){
	    	oScrID = setInterval(ep_mnu_top, 160);
	    }
		$(document).foundation({ equalizer : { equalize_on_stack: true } });
	});
	</script>
	
	<!-- End checkout_container_acap.jsp -->

</dsp:page>