<%-- Taglibs --%>
<%@ taglib uri="dsp" prefix="dsp"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-- Endeca Taglib --%>
<%@ taglib prefix="endeca" uri="/endeca-infront-assembler/utilityTags"%>

<dsp:page>
	<dsp:getvalueof var="content" vartype="com.endeca.infront.assembler.ContentItem" value="${originatingRequest.contentItem}"/> 
	<dsp:getvalueof var="contentName" bean="/OriginatingRequest.contentItem.contentName"/>	
	<dsp:getvalueof var="currentSite" bean="/atg/multisite/Site.id" />
	<dsp:getvalueof var="siteNavPath" bean="/atg/multisite/Site.siteNavPath"/>
	<dsp:importbean bean="/atg/userprofiling/Profile" />
	<dsp:importbean bean="/atg/commerce/endeca/QueryFormHandler"/>
	
	<c:if test="${empty siteNavPath}">
		<c:set var="siteNavPath" value="/browse"/>
	</c:if>		
	<dsp:getvalueof bean="QueryFormHandler.question" var="question" />
	<dsp:getvalueof param="className" var="className" />	
	
	<section id="c_headnavtype__${className}--id" class="${className}__cont topmenu__mobl--hide c_headnavtype headnav__search no__print" v-on:keyup="searchKey">
           <nav>
            <aside class="">			
			<svg class="${className}__cont--vect" height="36" width="36" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg"><path d="M24.23 14.808c0-5.196-4.227-9.423-9.422-9.423-5.196 0-9.423 4.227-9.423 9.423 0 5.195 4.227 9.423 9.423 9.423 5.195 0 9.423-4.228 9.423-9.423zM35 32.308A2.711 2.711 0 0 1 32.308 35a2.64 2.64 0 0 1-1.893-.8L23.2 27.008a14.773 14.773 0 0 1-8.392 2.608C6.626 29.615 0 22.99 0 14.808S6.626 0 14.808 0c8.182 0 14.807 6.626 14.807 14.808 0 2.986-.904 5.931-2.608 8.392l7.215 7.215c.484.483.778 1.178.778 1.893z" fill-rule="evenodd"/></svg>
      			<dsp:form action="${siteNavPath}/" formid="basic${className}" id="basic${className}Form" method="get" requiresSessionConfirmation="false">			
						<dsp:input id="js-inp-${className}--id" class="${className}__cont--input legacy_input_override" type="text" bean="QueryFormHandler.question"
								placeholder="Search Item# or Keyword" aria-label="Search Item# or Keyword" autocomplete="off" 
								v-model="ta_data" tabindex="6" />
						<dsp:input type="hidden" bean="QueryFormHandler.search" value="Search"/>
						<a class="${className}__cont--righta js-${className}__btn" data-search-form-id="basic${className}Form" tabindex="21">Search</a>		
				</dsp:form>
     		 </aside>
           </nav>
           <aside id="js-headnavtype__${className}--id" class="headnavtype hidden" :class="{'hidden':is_hidden}">
               <ul>                   
                   <li class="headnavtype__type--li" v-for="(ta_pin, i) in ta_response">
                       <a class="headnavtype__type--grid" @click.stop.prevent="pinClick" :tabindex="i+7">
                           <p>{{ ta_pin[0] }}</p>
                           <p v-html="ta_pin[1]"></p>          
                       </a>
                   </li>
               </ul>
           </aside>
     </section>
</dsp:page>