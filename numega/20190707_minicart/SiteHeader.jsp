<%-- Taglibs --%>
<%@ page isELIgnored="false"%>
<%@	taglib prefix="dsp" uri="dsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<fmt:setBundle basename="com.ltd.atg.resourcebundle.ProductCatalog" />

<%-- Endeca Taglib --%>
<%@ taglib prefix="endeca" uri="/endeca-infront-assembler/utilityTags"%>

<dsp:importbean bean="/atg/userprofiling/Profile" />
<dsp:importbean bean="/atg/userprofiling/ProfileFormHandler" />
<dsp:importbean bean="/ltd/userprofiling/EmailSignUpFormHandler" />	
<dsp:importbean bean="/atg/commerce/endeca/QueryFormHandler" scope="request" var="formHandler"/>
<dsp:importbean bean="/ltd/userprofiling/LTDProfileIsTransientDroplet" />
<dsp:importbean bean="/atg/targeting/TargetingForEach"/>
<dsp:importbean	bean="/ltd/droplets/LTDComponentExists"/>
<dsp:importbean bean="/atg/multisite/Site"/>

<dsp:page>
	<dsp:getvalueof var="giftItems" bean="Profile.wishlist.giftlistItems"/>
	<dsp:getvalueof var="giftItemsSize" value="${giftItems.size()}"/>
	<dsp:getvalueof var="wishListEnabled" bean="/atg/multisite/Site.wishListInfo.wishListEnabled" scope="request" />
	<dsp:getvalueof var="wishListLimit" bean="/atg/multisite/Site.wishListInfo.wishListLimit" />
	 <c:if test="${giftItemsSize gt wishListLimit}"> 
	 	<dsp:getvalueof var="giftItemsSize" value="${wishListLimit}"/>
	 </c:if>
	<dsp:getvalueof var="currentSite" bean="Site.id" />
	<dsp:getvalueof param="webPage" var="webPageName"/>
	<c:if test="${empty siteNavPath}">
		<c:set var="siteNavPath" value="/browse"/>
	</c:if>
	<dsp:getvalueof param="legacy" var="legacySupport"/>
	
	<dsp:droplet name="TargetingForEach">
		<dsp:param name="targeter" bean="/atg/registry/RepositoryTargeters/global/GlobalMessage"/>			
		<dsp:param name="elementName" value="contentItem"/>
		<dsp:oparam name="output">	
			<dsp:getvalueof var="globalMsg" param="contentItem.blockContent"/>		
			<c:if test="${not empty globalMsg}">					
				<ltdc-topmessage class="l-topmessage">
		    		<p class="l-topmessage__text"><dsp:valueof param="contentItem.blockContent" valueishtml="true"/></p>
		    	</ltdc-topmessage>
		    </c:if>	
		</dsp:oparam> 
	</dsp:droplet>	
	
	<dsp:droplet name="LTDComponentExists">
 		<dsp:param name="path" value="/atg/registry/RepositoryTargeters/global/TopBannerContent"/>
 		<dsp:oparam name="true">
			<dsp:droplet name="TargetingForEach">
				<dsp:param name="targeter" bean="/atg/registry/RepositoryTargeters/global/TopBannerContent"/>
				<dsp:param name="elementName" value="contentItem"/>
				<dsp:oparam name="output">
					<dsp:valueof param="contentItem.blockContent" valueishtml="true"/>				
				</dsp:oparam>
			</dsp:droplet>
		</dsp:oparam>
		 <dsp:oparam name="false"> 
		 	<!-- Component /atg/registry/RepositoryTargeters/global/TopBannerContent does not exist --> 
		 </dsp:oparam>
	</dsp:droplet>	

<ltdc-toplogo class="l-toplogo">
    <nav class="l-grid">
        <c:choose>
			<c:when test="${currentSite == 'LS' }">
				<c:set var="tel_link" scope="session" value="8474443104"/>
				<a id="js-toplogo__home-lsc--id" class="toplogo__gridleft--link brand--lsc__show" href="/homels" tabindex="1">
		            <img class="toplogo__home--image-lsc" src="/images/lsc-logo.png" alt="The Lakeside Collection" title="The Lakeside Collection">
		        </a>
			</c:when>
			<c:otherwise>
				<c:set var="tel_link" scope="session" value="8474443118"/>
				<a id="js-toplogo__home-ltd--id" class="toplogo__gridleft--link brand--ltd__show" href="/homeltd" tabindex="1">
	            	<img class="toplogo__home--image-ltd" src="/images/ltd-logo.png" alt="LTD Commodities" title="LTD Commodities">
	        	</a>
			</c:otherwise>
		</c:choose> 
		<c:choose>
			<c:when test="${not empty webPageName && webPageName eq 'checkout'}">
				<style>
					.l-toplogo .l-grid {max-width: 960px;}
					.l-toplogo {height: 64px;}
					.toplogo__home--image-ltd {margin: 8px 0;}
					@media only screen and (max-width: 48em){  /* small */
					    .l-toplogo .l-grid {display: flex;text-align: left; margin: 0 12px;}
					    .l-toplogo .toplogo__gridright {display: block;}
					    .toplogo__home--image-lsc {margin: 16px 0 8px 0;}
					}
				</style>
				<div class="toplogo__gridright no__print">
				</div>
	        </c:when>
			<c:otherwise>
		        <div class="toplogo__gridright no__print">
					<section id="js-toplogo-slide__email--id" class="toplogo__slide">
		            	<dsp:form formid="eSignUpForm" id="eSignUpForm" method="POST" action="<%=atg.servlet.ServletUtil.escapeURLString(request.getRequestURI())%>">
							<a id="js-toplogo__email--id" class="toplogo__gridright--link">
								<div class="svg-icon svg-baseline">
									<svg class="toplogo__gridright--vect" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
										<path d="M44.545 11.286v19.737A3.989 3.989 0 0 1 40.568 35H3.978A3.989 3.989 0 0 1 0 31.023V11.286c.746.82 1.59 1.54 2.51 2.162 4.127 2.81 8.303 5.618 12.355 8.576 2.088 1.541 4.673 3.43 7.383 3.43h.05c2.71 0 5.294-1.889 7.382-3.43 4.052-2.933 8.228-5.767 12.38-8.576a14.642 14.642 0 0 0 2.485-2.162zm0-7.309c0 2.784-2.063 5.295-4.25 6.811-3.878 2.685-7.78 5.37-11.634 8.08-1.616 1.118-4.35 3.405-6.363 3.405h-.05c-2.014 0-4.748-2.287-6.364-3.406-3.853-2.71-7.755-5.394-11.608-8.079C2.51 9.595 0 6.786 0 4.524 0 2.088 1.317 0 3.977 0h36.591c2.163 0 3.977 1.79 3.977 3.977z" fill-rule="evenodd"></path></svg>
								</div>&nbsp; <span class="toplogo__link--text slide-opened__hide">Email Offers</span>						
								<dsp:input class="toplogo-email__input hide" type="email" id="js-toplogo-slide__input--id" name="emailAddress" maxlength="128" aria-required="true" autocomplete="off" bean="EmailSignUpFormHandler.emailAddress" placeholder="Email Address" title="Email Address" aria-label="Enjoy Special Deals when You Sign Up for Emails" style="display: inline; margin: 6px 8px 0 36px !important;"/>
								<dsp:input type="hidden" bean="/ltd/userprofiling/EmailSignUpFormHandler.submit" value="Submit"/>				
							</a>
							<a id="js-toplogo-email__btn--id" class="toplogo-email__btn--submit slide-init__hide">Sign Up</a>
						</dsp:form>				
					</section>
					
					<a id="js-toplogo__cat--id" class="toplogo__gridright--link" href="/catalog_request/index.jsp" tabindex="3">
		                <div class="svg-icon svg-baseline">
							<svg class="toplogo__gridright--vect" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M46.216 3.177L50 35c-2.27 0-4.224-.475-6.274-1.426-3.052-1.426-6.226-2.277-9.595-2.277-3.467 0-6.665 1.176-9.131 3.703-2.466-2.527-5.664-3.703-9.13-3.703-3.37 0-6.544.851-9.596 2.277C4.297 34.474 2.294 35 .122 35H0L3.784 3.177C7.275 1.151 11.524 0 15.552 0c3.296 0 6.69.7 9.448 2.652C27.759.7 31.152 0 34.448 0c4.029 0 8.277 1.15 11.768 3.177zM34.13 27.87c4.639 0 7.812 1.276 12.012 3.052L43.115 5.38c-2.734-1.276-5.981-1.952-8.984-1.952-3.418 0-6.616 1.101-9.131 3.528-2.515-2.427-5.713-3.528-9.13-3.528-3.004 0-6.25.676-8.985 1.952L3.857 30.922c4.2-1.776 7.373-3.052 12.012-3.052 3.345 0 6.299.876 9.131 2.702 2.832-1.826 5.786-2.702 9.13-2.702zm-.366-23.542l1.342 22.691-.976-.025c-3.223-.075-6.372.8-9.131 2.552-2.759-1.751-5.908-2.552-9.13-2.552-4.054 0-7.3.976-10.987 2.527L7.666 5.98c2.54-1.075 5.469-1.65 8.203-1.65 3.662 0 6.568 1.2 9.131 3.877 2.466-2.577 5.249-3.803 8.765-3.878z" fill-rule="evenodd"/></svg>
		                </div>&nbsp; <span class="toplogo__link--text">FREE Catalog</span>
					</a>

					<a id="js-toplogo__cqo--id" class="toplogo__gridright--link" href="/catalog/catalog_quick_order.jsp"
					href="/content/faq">
		                <div class="svg-icon svg-baseline">
							<svg class="toplogo__gridright--vect" viewBox="2 2 22 22" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/></svg>
		                </div>&nbsp; <span class="toplogo__link--text">Quick Order</span>
					</a>

					<a id="js-toplogo__faq--id" class="toplogo__gridright--link" href="/content/faq"
					href="/content/faq" aria-label="FAQ">
		                <div class="svg-icon svg-baseline">
							<svg class="toplogo__gridright--vect" viewBox="2 2 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"/><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></g></svg>
		                </div>
					</a>
					
		        </div>
			</c:otherwise>
		</c:choose>
    </nav>
</ltdc-toplogo>
<c:if test="${empty webPageName || webPageName ne 'checkout'}">
	<section id="js-topmenu__placeholder--id" class="topmenu__placeholder" style="height: 0;"></section>
	<ltdc-topmenu id="js-topmenu--id" class="l-topmenu">
	    <nav id="js-topmenu-grid--id" class="l-grid">
	        <section class="topmenu__gridleft no__print">
	            <a id="js-topmenu__menu--id" class="topmenu__link" tabindex="4">
	                <div class="svg-icon svg-baseline">
	                	<svg class="topmenu__link--vect vect__toggle--primary" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
						<path d="M42 29.75c0-.957-.793-1.75-1.75-1.75H1.75C.793 28 0 28.793 0 29.75v3.5C0 34.207.793 35 1.75 35h38.5c.957 0 1.75-.793 1.75-1.75v-3.5zm0-14c0-.957-.793-1.75-1.75-1.75H1.75C.793 14 0 14.793 0 15.75v3.5C0 20.207.793 21 1.75 21h38.5c.957 0 1.75-.793 1.75-1.75v-3.5zm0-14C42 .793 41.207 0 40.25 0H1.75C.793 0 0 .793 0 1.75v3.5C0 6.207.793 7 1.75 7h38.5C41.207 7 42 6.207 42 5.25v-3.5z" fill="#fff" fill-rule="evenodd"/></svg>
	                
	                	<svg class="topmenu__link--vect vect__toggle--alternate" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
						<path d="M35 28.165c0-.737-.295-1.473-.825-2.003L25.513 17.5l8.662-8.662c.53-.53.825-1.266.825-2.003 0-.737-.295-1.473-.825-2.003L30.168.825A2.857 2.857 0 0 0 28.165 0c-.737 0-1.473.295-2.003.825L17.5 9.487 8.838.825A2.857 2.857 0 0 0 6.835 0c-.737 0-1.473.295-2.003.825L.825 4.832A2.857 2.857 0 0 0 0 6.835c0 .737.295 1.473.825 2.003L9.487 17.5.825 26.162A2.857 2.857 0 0 0 0 28.165c0 .737.295 1.473.825 2.003l4.007 4.007c.53.53 1.266.825 2.003.825.737 0 1.473-.295 2.003-.825l8.662-8.662 8.662 8.662c.53.53 1.266.825 2.003.825.737 0 1.473-.295 2.003-.825l4.007-4.007c.53-.53.825-1.266.825-2.003z" fill="#fff" fill-rule="evenodd"/></svg>
	                             
	                	</div><span class="topmenu__link--textmobl topmenu__tabl-up--show">Shop Departments</span>
	            </a>
	            <a id="js-topmenu__catalogs--id" class="topmenu__link topmenu__mobl--hide" href="/shopCatalogs" tabindex="5">
	                <div class="svg-icon svg-baseline">
						<svg class="topmenu__link--vect" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
						<path d="M46.216 3.177L50 35c-2.27 0-4.224-.475-6.274-1.426-3.052-1.426-6.226-2.277-9.595-2.277-3.467 0-6.665 1.176-9.131 3.703-2.466-2.527-5.664-3.703-9.13-3.703-3.37 0-6.544.851-9.596 2.277C4.297 34.474 2.294 35 .122 35H0L3.784 3.177C7.275 1.151 11.524 0 15.552 0c3.296 0 6.69.7 9.448 2.652C27.759.7 31.152 0 34.448 0c4.029 0 8.277 1.15 11.768 3.177zM34.13 27.87c4.639 0 7.812 1.276 12.012 3.052L43.115 5.38c-2.734-1.276-5.981-1.952-8.984-1.952-3.418 0-6.616 1.101-9.131 3.528-2.515-2.427-5.713-3.528-9.13-3.528-3.004 0-6.25.676-8.985 1.952L3.857 30.922c4.2-1.776 7.373-3.052 12.012-3.052 3.345 0 6.299.876 9.131 2.702 2.832-1.826 5.786-2.702 9.13-2.702zm-.366-23.542l1.342 22.691-.976-.025c-3.223-.075-6.372.8-9.131 2.552-2.759-1.751-5.908-2.552-9.13-2.552-4.054 0-7.3.976-10.987 2.527L7.666 5.98c2.54-1.075 5.469-1.65 8.203-1.65 3.662 0 6.568 1.2 9.131 3.877 2.466-2.577 5.249-3.803 8.765-3.878z" fill-rule="evenodd"/></svg>
	                </div><span class="topmenu__link--text">Shop Catalogs</span>
	            </a>
<a href="/" class="topmenu__link topmenu__mobl--hide sticky-home" aria-label="Home">
<div class="svg-icon svg-baseline" style="margin-top: 16px;">
<svg fill="#fff" viewBox="0 -1 21 21" xmlns="http://www.w3.org/2000/svg" class="svg-icon"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
</div></a>
	        </section>
	               	
		    <dsp:include page="/common/includes/inc_search_form.jsp">
	     		<dsp:param name="className" value="search"/>
	     	</dsp:include> 	
	      	
	        <section class="topmenu__gridright no__print">

	            <a id="js-topmenu__myaccount--id" class="topmenu__link" tabindex="22">
	                <div id="js-topmenu__myaccount-vect--id" class="svg-icon svg-baseline">
						<svg class="topmenu__link--vect topmenu__link--vectmargin" viewBox="0 0 39 39" xmlns="http://www.w3.org/2000/svg">
						<path d="M17.5 0C27.168 0 35 7.832 35 17.5 35 27.11 27.207 35 17.5 35 7.812 35 0 27.129 0 17.5 0 7.832 7.832 0 17.5 0zm12.09 26.387c1.816-2.5 2.91-5.567 2.91-8.887 0-8.262-6.738-15-15-15s-15 6.738-15 15c0 3.32 1.094 6.387 2.91 8.887C6.113 22.89 7.812 20 11.387 20a8.721 8.721 0 0 0 12.226 0c3.575 0 5.274 2.89 5.977 6.387zM25 13.75c0 4.14-3.36 7.5-7.5 7.5-4.14 0-7.5-3.36-7.5-7.5 0-4.14 3.36-7.5 7.5-7.5 4.14 0 7.5 3.36 7.5 7.5z" fill="#fff" fill-rule="evenodd"/></svg>
	                </div><span class="topmenu__link--text">My Account</span>
				</a>
				
				<c:if test="${wishListEnabled}"> 	
		            <a id="js-topmenu__wish--id" class="topmenu__link" href="/wishlist" tabindex="23">
		                <div class="svg-icon svg-baseline">
							<svg class="heart" viewBox="0 -5 32 29.6" fill="#d0021b">
							<path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
							c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
							</svg> 
		                </div> &nbsp; <div class="topmenu__link--wish"><c:out value="${giftItemsSize}" /></div>
		            </a>
	            </c:if>

	            <a id="js-topmenu__cart--id" class="topmenu__link" href="/checkout/shopping_cart.jsp" tabindex="24">
	                <div class="svg-icon svg-baseline">
						<svg class="topmenu__link--vect" viewBox="0 0 39 39" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.91 31.818c0-1.74-1.443-3.182-3.183-3.182-1.74 0-3.182 1.442-3.182 3.182S10.987 35 12.727 35s3.182-1.442 3.182-3.182zm22.272 0c0-1.74-1.442-3.182-3.182-3.182s-3.182 1.442-3.182 3.182S33.26 35 35 35s3.182-1.442 3.182-3.182zm3.182-27.045c0-.87-.721-1.591-1.591-1.591H9.918C9.67 1.989 9.62 0 7.955 0H1.59C.72 0 0 .72 0 1.59c0 .87.72 1.592 1.59 1.592h5.072l4.4 20.458c-.398.77-1.517 2.635-1.517 3.405 0 .87.721 1.591 1.591 1.591h25.455c.87 0 1.59-.72 1.59-1.59 0-.87-.72-1.591-1.59-1.591H13.72c.25-.498.597-1.02.597-1.591 0-.597-.199-1.169-.323-1.74l25.952-3.033c.795-.1 1.417-.796 1.417-1.591V4.773z" fill="#fff" fill-rule="evenodd"/></svg>
	                </div> &nbsp; <div class="topmenu__link--items"><dsp:valueof bean="/atg/commerce/ShoppingCart.current.TotalCommerceItemCount" /></div>
	            </a>
	        </section>             
	    </nav>
	</ltdc-topmenu>
	
	<ltdc-topsearch id="js-topsearch--id" class="l-topsearch hide">
	   <dsp:include page="/common/includes/inc_search_form.jsp">
	    	<dsp:param name="className" value="topsearch"/>
	    </dsp:include>
	</ltdc-topsearch>

	<ltdc-flyoutwish id="js-flyoutwish__id" class="c-flyoutwish hidden"><!--  Component Begin  -->
	   <section class="flyoutgift__prod--contain">	 
			<h4 class="">Item Added to Wish List</h4>
			<figure class="h-height__half"></figure>
			<a class="flyoutwish__cmd">View Wish List</a>
	   </section>
	</ltdc-flyoutwish><!--  Component End  -->
	
	<ltdc-flyoutcart id="js-flyoutcart__id" class="c-flyoutcart hidden"><!--  Component Begin  -->
	   <h4 class=""><fmt:message key="miniCart.itemsAdded"/></h4>
	   <section class="flyoutcart__prod--contain">	 
	   </section>     
	</ltdc-flyoutcart><!--  Component End  -->				     
	
	<dsp:droplet name="LTDProfileIsTransientDroplet">
		<dsp:param name="profile" bean="Profile" />
		<dsp:oparam name="false">
			<c:set var="authUser" value="true" />
		</dsp:oparam>
		<dsp:oparam name="true">
			<c:set var="authUser" value="false" />
		</dsp:oparam>
	</dsp:droplet>
	
	
	<ltdc-flymyaccount id="js-flymyaccount--id" class="l-flymyaccount hide" data-auth="${authUser}">
	    <div class="flymyaccount__cont">
			<nav class="flymyaccount__nav--auth">
	          <p class="flymyaccount__text">Hello, <dsp:valueof bean="Profile.firstName"/></p>
	          <a class="flymyaccount__btn--brand" href="/my_account/manage_account.jsp">Manage Account</a>
	        </nav>		        
	        <nav class="flymyaccount__nav--nauth">
	            <p class="flymyaccount__text">Hello,</p>
	            <a class="flymyaccount__btn--green" href="/my_account/index.jsp">Sign In</a>
	        </nav>
	        <nav class="flymyaccount__nav--nauth">
	            <a class="flymyaccount__btn--brand" href="/my_account/index.jsp">Create an Account</a>
	        </nav>		        
	        <nav class="flymyaccount__nav">
	            <a class="flymyaccount__link" href="/my_account/order_history/order_history_listing.jsp">My Orders</a>
			</nav>
			<c:if test="${wishListEnabled}"> 
				<nav class="flymyaccount__nav">
		            <a class="flymyaccount__link" href="/wishlist" id="js-myaccount__wish--id">My Wish List</a>
		        </nav>
	        </c:if>		       			
			<dsp:include page="/common/includes/inc_content_area.jsp">
				<dsp:param name="caName" value="mm_flyout_link"/>
			</dsp:include>         
	        <nav class="flymyaccount__nav--auth">
	        	<dsp:form action="/my_account/index.jsp" method="post" name="siteLogout" formid="headerSiteLogout">
					<dsp:getvalueof bean="Profile.currentSite" var="siteid" />
					<dsp:input type="hidden" bean="ProfileFormHandler.logoutSuccessURL" value="/my_account/index.jsp?siteId=${siteid}" />
					<dsp:input type="submit" id="logoutButton" value="submit" bean="ProfileFormHandler.logout" style="display: none;" aria-hidden/>
				</dsp:form>		        
	            <a class="flymyaccount__btn--ghost" href="javascript:document.getElementById('logoutButton').click()">Sign Out</a>
	        </nav>		       
	    </div>
	</ltdc-flymyaccount>
	
	<script>
		var ltdc_leftnav = { name: "level0", href: "/", children: []};
		var jsnCat = <dsp:include page="/catalog/includes/inc_category_list_json.jsp"/>;
	</script>
	<ltdc-megamenu id="js-megamenu--id" class="l-megamenu" v-cloak :class="{'hide' : !isOpen, 'stick' : stick}">
		<section class="mm-grid">
				<section class="mm-grid__lvl1">
						<a v-for="(Nav, I ) in aMegaNav.children" :data-cat="Nav.cat" :href="Nav.href"
							:class="{'lvl1--select': Nav.select}"
							@mouseover="hover_l1( Nav.cat )">
							{{ Nav.name }}
						</a>
<dsp:include page="/common/includes/inc_content_area.jsp">
<dsp:param name="caName" value="mm_static_links"/>
</dsp:include>
				</section>
				<nav class="mm-grid ">
					<section class="mm-grid__lvl2" v-if="bL2" :class="{'hide':!bL2,'mm-grid__lvl2--round': !bL3 && !hasImage}">
							<a v-for="(Nav, I ) in cat_l2l3" :data-cat="Nav.cat" :href="Nav.href" v-if="I <= nl2l3"
								:class="{'link__l2': (Nav.l === 2), 'link__l3': (Nav.l === 3), 'lvl2--select': Nav.select}">
								{{ Nav.name }}
							</a>
					</section>
					<section class="mm-grid__lvl2" v-if="bL2" :class="{'hide':!bL2,'mm-grid__lvl2--round': !bL3 && !hasImage}">
							<a v-for="(Nav, I ) in cat_l2l3" :data-cat="Nav.cat" :href="Nav.href" v-if="I > nl2l3"
								:class="{'link__l2': (Nav.l === 2), 'link__l3': (Nav.l === 3), 'lvl2--select': Nav.select}">
								{{ Nav.name }}
							</a>
					</section>
				</nav>
				<section class="mm-grid__ugc1 mm-grid__ugc1--hide" v-if="!bL2">
<dsp:include page="/common/includes/inc_content_area.jsp">
<dsp:param name="caName" value="popular_categories"/>
</dsp:include>          
				</section>
				<section id="js-ugc2--id" class="mm-grid__ugc2 mm-grid__ugc2--hide">
<dsp:include page="/common/includes/inc_content_area.jsp">
<dsp:param name="caName" value="cat_promo_banner"/>
</dsp:include>
				</section>
		</section>
	</ltdc-megamenu>
	
	<c:set var="esActionURI" scope="request">
		<%=atg.servlet.ServletUtil.escapeURLString(request.getRequestURI())%>
	</c:set>
		
		<script>
			var fireTealium = function(){		   
		    var deviceType ="<c:out value="${requestScope.deviceType}"/>";	   
		    	if(deviceType == 'MOBILE'){
		    		fireTealiumEvent({
						"e_header_email_p" : "t",
						"lead_type" : "email header phone signup"
					});
		    	}else{
		    		fireTealiumEvent({
						"e_header_email" : "t",
						"lead_type" : "email header signup"
					});
		    	}		    
			}		
		</script>
</c:if>
</dsp:page>