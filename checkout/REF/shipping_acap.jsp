<%@taglib uri="dsp" prefix="dsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<fmt:setBundle basename="com.ltd.atg.resourcebundle.ErrorMessages" />
<fmt:setBundle basename="com.ltd.atg.resourcebundle.MyAccount" />
<dsp:importbean bean="/atg/userprofiling/Profile" />
<dsp:importbean bean="/ltd/userprofiling/LTDSessionContext" />
<dsp:importbean bean="/atg/commerce/ShoppingCart"/>
<dsp:importbean bean="/atg/dynamo/droplet/Switch"/>
<dsp:importbean bean="/ltd/commerce/order/purchase/LTDShippingFormHandler" />
<dsp:importbean bean="/ltd/commerce/payment/paypal/LTDPayPalFormHandler"/>
<dsp:importbean bean="/acquitygroup/droplet/AkamaiUrlTranslator" />
<dsp:page>
	<c:set var="shippingOptions" scope="request"><dsp:valueof bean="/atg/multisite/Site.allowShippingMethods.enabled" /></c:set>
	<dsp:droplet name="/atg/dynamo/droplet/Switch">
	<dsp:param name="value" param="shippingStep" />
	<dsp:oparam name="shippingForm">
		<script>
			$(document).ready(function() {
				<dsp:droplet name="Switch">
		            <dsp:param name="value" bean="LTDShippingFormHandler.gift"/>
		            <dsp:oparam name="true">
						$("#resp_ccp_gm").removeClass("resp_ccp_blu_d").addClass("resp_ccp_blu_a");
						$("#resp_ccp_gm_v").removeClass("hide");
		            </dsp:oparam>
		            <dsp:oparam name="false">
			            <dsp:droplet name="Switch">
			            <dsp:param name="value" bean="ShoppingCart.current.gift"/>
				            <dsp:oparam name="true">
								$("#resp_ccp_gm").removeClass("resp_ccp_blu_d").addClass("resp_ccp_blu_a");
								$("#resp_ccp_gm_v").removeClass("hide");
			                </dsp:oparam>		            
			             </dsp:droplet>
		            </dsp:oparam>		            	            
		        </dsp:droplet>
	        
			    $(".resp_ccp_blu").on("click", function(e){
			        if( $(this).hasClass("resp_ccp_blu") ){
			            $(this).toggleClass("resp_ccp_blu_a").toggleClass("resp_ccp_blu_d");
			            $( "#" + $(this).attr("id") + "_b1" ).toggleClass("hide");
			            $( "#" + $(this).attr("id") + "_b2" ).toggleClass("hide");
			        } else {
			            $(this).toggleClass("resp_ccp_a").toggleClass("resp_ccp_d");
			        }
			        $( "#"+this.id+"_v" ).toggleClass("hide");
			    });
			    
			    $( ".toggle_content_area" ).on("click", function(e){
			        $( "#"+$(this).attr("data-content-area" ) ).toggleClass("hide");
			        e.preventDefault();
			    });			    
		});
		
		function addAddressInput() {

			var isHidden = $('.guest_on').is(":hidden");
			$('#address-firstName').val('');
	        $('#address-lastName').val('');
	        $('#address-companyName').val('');
	        $('#address-address1').val('');
	        $('#address-address2').val('');
	        $('#address-city').val('');
	        $('#address-state').val('');
	        $('#address-postalCode').val('');
			if( ExcludeUA() ){ $('#address-phoneNumber').val(''); }else{ $('#address-phoneNumber').val('').inputmask(); }
	        $('#address-editShipToAddressName').val('');
	        $('#saveToAddressBook').show();
			if (isHidden) {
				$(".guest_on").removeClass("hide");
			} else {
				$(".guest_on").addClass("hide");
			}
		}
		
		// Textarea Character Count
		function limitGMChars() {
		    var text = $('#giftMessageComment').val();
		    var limit = 110;
		    var textlength = text.length;
		    if (textlength > limit) {
		        $('#giftMessageComment').val(text.substr(0,limit));		        
		        return false;
		    } else {
	            $('#NuOChrs').html(text.length);
		        return true;
		    }
		}
		
		</script>
		<c:set var="authenticatedUser" value="false" />
		<c:set var="updateAddressFeildsExpanded" value="false" />
		<c:set var="currentSite"><dsp:valueof bean="Profile.currentSite" /></c:set>
		<!-- Start shipping_acap.jsp -->
		<dsp:getvalueof var="sessionShippingAddress" vartype="com.ltd.atg.commerce.order.LTDContactInfo" bean="LTDSessionContext.shippingAddress"/>
		<dsp:getvalueof var="shipToAddressNameInOrder" vartype="java.lang.String" bean="ShoppingCart.current.selectedShippingAddress"/>

		<c:if test="${not empty sessionShippingAddress && not empty sessionShippingAddress.firstName}">
			<c:set var="updateAddressFeildsExpanded" value="true" />
			<dsp:setvalue param="address" value="${sessionShippingAddress}"/>
		</c:if>
		<c:if test="${not empty shipToAddressNameInOrder && shipToAddressNameInOrder eq 'ShippingAddressForOrder'}">
			<dsp:getvalueof var="currentShippingGroupAddress" vartype="com.ltd.atg.commerce.order.LTDContactInfo" bean="ShoppingCart.current.shippingGroups[0].shippingAddress"/>
			<c:set var="updateAddressFeildsExpanded" value="true" />
			<dsp:setvalue param="address" value="${currentShippingGroupAddress}"/>
		</c:if>
	
		<dsp:getvalueof var="editShipToAddressName" vartype="java.lang.String" bean="LTDShippingFormHandler.editShipToAddressName"/>
		<c:if test="${not empty editShipToAddressName}">
			<script>
			var shipTo = '<c:out value="${editShipToAddressName}"/>';
			$(document).ready(function() {
				$('#addEditAddress').text('Edit Address');
				$('#saveToAddressBook').hide();
				if(shipTo == 'My Shipping Address'){
					$('#setAsDefaultAddress').hide();
				}
			});
			</script>	
			<dsp:getvalueof var="editAddress" vartype="com.ltd.atg.commerce.order.LTDContactInfo" bean="LTDShippingFormHandler.address"/>
			<c:set var="updateAddressFeildsExpanded" value="true" />
			<dsp:setvalue param="address" value="${editAddress}"/>
		</c:if>
	
		<dsp:getvalueof var="formError" vartype="java.lang.Boolean" bean="LTDShippingFormHandler.formError"/>
		<dsp:getvalueof var="payPalFormError" vartype="java.lang.Boolean" bean="LTDPayPalFormHandler.formError"/>
		
		<c:if test="${formError}">
			<dsp:getvalueof var="userEnteredAddress" vartype="com.ltd.atg.commerce.order.LTDContactInfo" bean="LTDShippingFormHandler.address"/>
			<c:set var="updateAddressFeildsExpanded" value="true" />
			<dsp:setvalue param="address" value="${userEnteredAddress}"/>
			<script type="text/javascript">
				try {
					tealformHasErrors = true;
				} catch(ex) {}
			</script>
		</c:if>
	   
		<header id="stp_bnr_1" class="row resp_pnl_stp_valn cmd_stp resp_pnl_stp_e panel radius" data-step="1"><!-- Step Panel 1 Begin-->
	    	<aside class="small-5  large-10 show-for-small text-left  columns">Shipping</aside>
	    	<aside class="medium-5 show-for-medium text-left  columns">Shipping Address</aside>
	    	<aside class="large-10 show-for-large-up text-center columns">Shipping Address</aside>
        </header>
	   
        <section id="stp_bnr_1_e" class="row stp_bnr_1_e">
            <section class="row">
				<c:set var="profileHasShippingAddress" value="false" />
				<dsp:droplet name="/ltd/userprofiling/LTDProfileIsTransientDroplet">
					<dsp:param name="profile" bean="Profile" />
					<dsp:oparam name="false">
						<c:set var="authenticatedUser" value="true" />
						<dsp:droplet name="/atg/dynamo/droplet/IsEmpty">
							<dsp:param name="value" bean="Profile.shippingAddress.address1" />
							<dsp:oparam name="false">
								<c:set var="profileHasShippingAddress" value="true" />
							</dsp:oparam>
						</dsp:droplet>
						<dsp:droplet name="/atg/dynamo/droplet/Range">
							<dsp:param name="array" bean="Profile.secondaryAddresses" />
							<dsp:param name="howMany" value="1" />
							<dsp:oparam name="output">
								<c:set var="profileHasShippingAddress" value="true" />
							</dsp:oparam>
						</dsp:droplet>
					</dsp:oparam>
				</dsp:droplet>	 
				<dsp:form action="purchase.jsp" id="shippingInfoForm" formid="shippingInfoForm" method="post" name="shippingInfoForm" iclass="passval" novalidate>
	            	<div class="columns small-10 medium-6 large-10 no-padding"><!-- Step 1 Edit Left Col Begin -->				
				
					    <dsp:droplet name="/atg/dynamo/droplet/Switch">
			    		<dsp:param name="value" bean="LTDShippingFormHandler.showAddressModal" />
			   			 <dsp:oparam name="true">
			   				<dsp:include page="includes/address_correction_modal_checkout_acap.jsp"/>
			    		</dsp:oparam>
			    		</dsp:droplet>
					    <dsp:droplet name="/atg/dynamo/droplet/Switch">
			    		<dsp:param name="value" bean="LTDShippingFormHandler.showPOBAddressCleanseModal" />
			   			 <dsp:oparam name="true">
			   				<dsp:include page="includes/address_correction_modal_checkout_acap.jsp"/>
			    		</dsp:oparam>
			    		</dsp:droplet>
<%--  QC 741  --%>			    		
			    		<div id="addressDisplaySection" data-equalizer="adr-lines">
				    		<div class="guest_off"> <!-- Not a guest Begin -->
<%--  QC 616 / QC 741  --%>
		                    	<section class="row" data-equalizer="adr-caption">
						    		<c:choose>
										<c:when test="${profileHasShippingAddress}">		
											<dsp:include page="/checkout/includes/inc_display_addresses_acap.jsp">
												<dsp:param name="shipToAddressNameInOrder" bean="ShoppingCart.current.selectedShippingAddress" />
											</dsp:include>
										</c:when>
										<c:otherwise>
											<c:set var="updateAddressFeildsExpanded" value="true" />
											<script>
												$(document).ready(function() {
													$(".guest_off").addClass("hide");
													if( ExcludeUA() ){ $('#address-phoneNumber'); }else{ $('#address-phoneNumber').inputmask(); }
												});
											</script>
										</c:otherwise>
									</c:choose>
									<c:if test="${updateAddressFeildsExpanded}">
										<script>
											$(document).ready(function() {
												$(".guest_on").removeClass("hide");
												if( ExcludeUA() ){ $('#address-phoneNumber'); }else{ $('#address-phoneNumber').inputmask(); }
											});
										</script>
									</c:if>
		
									<dsp:include page="/my_account/includes/inc_display_errors_responsive.jsp">
						                <dsp:param name="FormHandler" bean="LTDShippingFormHandler"/>
						            </dsp:include>
									<dsp:include page="/my_account/includes/inc_display_errors_responsive.jsp">
						                <dsp:param name="FormHandler" bean="LTDPayPalFormHandler"/>
						            </dsp:include>
						            <dsp:getvalueof var="payPalAddressValidated" vartype="java.lang.Boolean" bean="LTDSessionContext.payPalAddressValidated"/>
						            <c:if test="${payPalFormError && !payPalAddressValidated}">
						            	<span class="error" id="payPalAddressErrorMessage"><fmt:message key="myAccount.paypal.address.error" /></span><br><br>		            	
									</c:if>
									<aside class="small-10 medium-10 large-10 columns" style="padding: 2px;">
			                            <div class="panel radius" style="padding: 4px; margin-bottom: 2px;">
			                                <label class="resp_msg_il_sm resp_msg_valn"><dsp:input
												name="addressChooseCheckBox" id="addressChooseCheckBox" bean="LTDShippingFormHandler.shipToAddressName" value="NEW" type="radio" checked="${updateAddressFeildsExpanded}" onclick="addAddressInput();"/>
												<span id="addEditAddress">Add A New Address</span>
			                                </label>
			                            </div>
			                        </aside>
		                    	</section>
		                	</div> <!-- Not a guest End -->
							<figure class="guest_on hide">
								<br>
							</figure>
		                	<div class="guest_on hide"> <!-- A guest Begin End -->
								<dsp:include page="/checkout/includes/inc_update_shipping_address_acap.jsp">
									<dsp:param name="userAuthenticated" value="${authenticatedUser}"/>
									<dsp:param name="addressInProfile" value="${profileHasShippingAddress}"/>
								</dsp:include>
	
	
				         		<dsp:droplet name="/ltd/userprofiling/LTDProfileIsTransientDroplet">				         		
									<dsp:param name="profile" bean="Profile" />
								  	<dsp:oparam name="true">
										<section class="row">
				                            <aside class="small-10 columns no-padding">
				                                <label class="resp_msg_il">
										            <dsp:droplet name="Switch">
										            	<dsp:param name="value" bean="Profile.sendPromoEmail"/>
										            	<dsp:oparam name="true">
										            		<dsp:input type="checkbox" bean="Profile.sendPromoEmail" id="promoEmail" checked="true"/>
									                	</dsp:oparam>
										            	<dsp:oparam name="false">
										            		<dsp:input type="checkbox" bean="Profile.sendPromoEmail" id="promoEmail" checked="false"/>			   		    	
										           		</dsp:oparam>
										            	<dsp:oparam name="default">
										            		<dsp:input type="checkbox" bean="Profile.sendPromoEmail" id="promoEmail" checked="true"/>
										            	</dsp:oparam>			            
										             </dsp:droplet>		          			
				      						   		<span class="resp_msg_prod_sm"><fmt:message key="myAccount.new.promotions" /></span>
				                                </label>
				                            </aside>
				                        </section> 	  	
				  					</dsp:oparam>
				  				</dsp:droplet>		
							</div>
						</div>
					</div><!-- Step 1 Edit Left Col End -->
					<div id="gmDisplaySection">
						<div class="columns resp_left_mrg_med small-10 medium-4 large-10 no-padding"><!-- Step 1 Edit Right Col Begin -->
		        			<dsp:getvalueof bean="ShoppingCart.current.giftMessage" var="giftMessage" />
							<div><!-- Collapsible Content Panel - Gift Message Begin -->
							    <header id="resp_ccp_gm" class="resp_gm_med resp_ccp_blu resp_ccp_blu_d resp_ccp_gm"> 
							        <aside class="small-8 text-left  columns">Gift Message</aside>
							        <nav class="small-2 text-right columns" colp="plus">+</nav>
							        <nav class="small-2 text-right columns" colp="minus">-</nav>
							    </header>
							    <section id="resp_ccp_gm_v" class="hide">		
								<!-- Gift message for order -->
									<dsp:textarea iclass="gift_msg resp_input_brand resp_input_offset" maxlength="110" bean="LTDShippingFormHandler.giftMessage" id="giftMessageComment" 
										onkeyup="limitGMChars();" placeholder="Enter your personalized gift message here - up to 110 characters" aria-label="Enter your personalized gift message here - up to 110 characters"rows="5">
										<c:out value="${giftMessage}"/>
									</dsp:textarea>
									<aside  class="small-7 columns"> </aside>
			                        <output class="small-3 text-right columns">
			                            <p class="resp_msg_prod_sm"><span id="NuOChrs">0</span> / 110</p>
			                        </output>						
					            </section>
					         </div>
						</div>
					</div>
					<div class="columns small-10 medium-6 large-10 no-padding" id="continuePaymentDiv">
						<%-- Code to set session expiration URL. --%>
						<dsp:droplet name="Switch">
				            <dsp:param name="value" bean="Profile.autoLogin"/>			            	
				            <dsp:oparam name="false">
				            	<dsp:input bean="LTDShippingFormHandler.sessionExpirationURL" type="hidden" value="/my_account/index.jsp?checkout=true&sw=1"/>
				            </dsp:oparam>	            
				        </dsp:droplet>					
						<dsp:input bean="LTDShippingFormHandler.moveToBillingSuccessURL" type="hidden" value="checkout_container_acap.jsp" />
						<dsp:input bean="LTDShippingFormHandler.moveToBillingErrorURL" type="hidden" value="checkout_container_acap.jsp"/>
						<dsp:input bean="LTDShippingFormHandler.moveToBilling" id="formSubmitButton" type="submit" value="Continue to Payment" iclass="button cmd_stp resp_btn_green expand radius" alt="Continue To Payment"/>
						<aside class="resp_8" style="height: 8px;"></aside>
					</div>					
				</dsp:form>		
			</section>
		</section>		
		<!-- End shipping_acap.jsp -->
	</dsp:oparam>
	<dsp:oparam name="shippingComplete">
		<c:set var="pagename" value="payment"/>
		<c:set var="scEvent" value="event12:${pageContext.session.id}"/>
		<script>
			var changeShippingAddress = {
		      url:  CONTEXT_ROOT + 'checkout/checkout_container_acap.jsp',
		      type: "post",
		      success: function(data){
					var return_values = data.split(',');
					if(typeof return_values !== 'undefined' && return_values.length == 2 && return_values[0] == 'session_expired') {
						// session expired
						var redirectUrl = return_values[1];
						window.location = redirectUrl;
					} else {
						$("div.resp_col_pad_l").html(data);
						scrollToDefinedPostion("#stp_bnr_1");
					}
					addAndroidMaxLength();
				}
	  		};
	  		
	  		function updateShippingAddress () {
				  		
	  			$('#changeShippingAddressForm').ajaxSubmit(changeShippingAddress);
				$.ajax({
					url: CONTEXT_ROOT + 'tagging/tealium_ajax.jsp?pagename=billing-shipping&pagetype=checkout-billing-shipping', 					
					success: function(data){
						fireTealiumPageView(data);
						updateOrderSummaryContainer();
					}
				});
			}
		</script>
		<section id="stp_bnr_1_v" class="row stp_bnr_1_v">
			<a class="editLink" onclick="updateShippingAddress();">
			    <header id="stp_bnr_1" class="row resp_pnl_stp_valn cmd_stp resp_pnl_stp_e panel radius" data-step="1"><!-- Step Panel 1 Begin-->
		            <aside class="small-5  large-10 show-for-small text-left  columns">Shipping</aside>
		            <nav   class="small-5  large-10 show-for-small text-right columns">
		             <span>Edit</span>
		            </nav>
		            <aside class="medium-5 show-for-medium text-left  columns">Shipping Address</aside>
		            <nav   class="medium-5 show-for-medium text-right columns">
		                <span>Edit</span>
		            </nav>
		
		            <aside class="large-8 show-for-large-up text-left columns">Shipping Address</aside>
		            <nav   class="large-1 show-for-large-up text-right columns">
		               <span >Edit</span>
		            </nav>
		        </header>
        	</a>
			 <dsp:include page="/checkout/includes/inc_shipping_complete_acap.jsp">
				<dsp:param name="address" bean="ShoppingCart.current.shippingGroups[0].shippingAddress" />
				<dsp:param name="order" bean="ShoppingCart.current" />
			</dsp:include>
		</section>
		<dsp:form id="changeShippingAddressForm" formid="changeShippingAddressForm" action="/checkout/shipping_acap.jsp">
			<dsp:input bean="LTDSessionContext.shippingComplete" type="hidden" value="false" id="shippingIncomplete"/>
			<dsp:input bean="LTDSessionContext.billingComplete" type="hidden" value="false" id="billingIncomplete"/>
			<c:if test="${shippingOptions}">
				<dsp:input bean="LTDSessionContext.shippingOptionsComplete" type="hidden" value="false" id="shippingOptionsInComplete"/>
			</c:if>
		</dsp:form>	
	</dsp:oparam>
	</dsp:droplet>
 
</dsp:page>