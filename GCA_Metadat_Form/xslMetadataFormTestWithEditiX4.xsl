<?xml version="1.0" encoding="UTF-8"?>
<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Jun 02 14:30:21 CEST 2014 -->
<!-- Comme on a de NS, il faut les declarer ds le style sheet, racine, pour pouvoir ensuite appliquer XPath--><xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:gmd19157="http://www.geoviqua.org/gmd19157" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:updated19115="http://www.geoviqua.org/19115_updates" xmlns:un="http://www.uncertml.org/2.0" xmlns:gts="http://www.isotc211.org/2005/gts" xmlns:gvq="http://www.geoviqua.org/QualityInformationModel/4.0" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gmi="http://www.isotc211.org/2005/gmi">
	<!--<xsl:strip-space elements="*"/>--><!-- CF http://www.w3schools.com/xsl/el_preserve-space.asp et http://w3.erss.univ-tlse2.fr:8080/index.jsp?perso=fsajous&subURL=xml/xslt/instr_strip-space.html -->
	<xsl:preserve-space elements=""/>
	<xsl:output method="html" indent='no'/>
<!-- Pourquoi indent a no: CF http://xmlfr.org/documentations/faq/010703-0001 -->
	
<xsl:template match="/">
	
	<html>
		<head>
			<title><xsl:text>Metadata form</xsl:text></title>
			<link type="text/css" rel="stylesheet" href="cssToXmlActualizedByGCAMetadatForm2.css"/>
			<script src="http://code.jquery.com/jquery-1.9.0.js"></script>
			<script type="text/javascript">
					<![CDATA[ //Permet de ne pas l'interpreter, si on ne le met pas, certains caracteres comme %, ... seront mal interpretes.
							$(".hideButtonSVG").click(function() {
								var partToHide= $(this).parent().parent().find(".subContainerInfo");// On remonte pour reacceder au fils apres pour avoir tjs disponible les boutons (ils doivent en effet etre extereieur au parent qui sera effacé !)
								partToHide.hide();
								$(this).parent().find(".showButtonSVG").show();
								$(this).parent().find(".hideButtonSVG").hide();
								$(this).parent(".containerButton").css("background-color", "rgba(0,230,0,0.40)");
							});
							$(".showButtonSVG").click(function() {
								var partToShow= $(this).parent().parent().find(".subContainerInfo");
								partToShow.show();
								$(this).parent().find(".hideButtonSVG").show();
								$(this).parent().find(".showButtonSVG").hide();
								$(this).parent(".containerButton").css("background-color", "rgba(240, 150, 50, 0.6)");
							});
					]]>
			</script>
</head>
<body>
			<div id="mainTitle" >
				<h1>GeoViQua / ISO 19115 Metadata Summary</h1>
				<p>This report displays some of the contents of ISO 19115 records. If quality information conformant with the GeoViQua information model is present, this will also be displayed.</p>
			</div>
			 
			 <!-- *********************************************************************************************************************************************** -->
	<!-- ************************************ STRUCTURATION DES DONNEES : ****************************************-->
	<!-- *********************************************************************************************************************************************** -->
		<!-- BASIC INFORMATION -->
	<div class="containerInfoClass">
			 <div class="title1" >Basic information: </div>
			 <div class="containerButton">
				<img class= "showButtonSVG" style="display:none" src= "showButton.svg" title= "Click to show entire information"/>
				<img class= "hideButtonSVG" src= "hideButton.svg" title= "Click to only visualize main title"/>
			</div>
			 <div class= "subContainerInfo">
			  <div class="title2" >About data:</div>
			<xsl:call-template name="dataCreationDateInfo">
				<xsl:with-param name="dataCreationDate" select="//gmd:citation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date/gco:Date"></xsl:with-param><!-- Si je ne mets pas les // ne me le prend pas, comprend pas -->
			</xsl:call-template>
			<xsl:call-template name="productNameInfo">
				<xsl:with-param name="productName" select="//gmd:fileIdentifier/gco:CharacterString"></xsl:with-param>
			</xsl:call-template>
			<xsl:call-template name="dataAbstractInfo">
				<xsl:with-param name="dataAbstract" select="//gmd:abstract/gco:CharacterString"></xsl:with-param>
			</xsl:call-template>
			<div id="dataContributorContainer">
			<div class="title3">Data Contributor information:</div>
				<table>
					<tr>
						<th>Name:</th>
						<th>Organisation:</th>
						<th>Mail:</th>
						<th>Role:</th>
					</tr>
				<xsl:for-each select="//gmd:pointOfContact"><!--element sur lequel il boucle. Si 2 elements identifiés, va me boucler 2 fois, si 3, ... Note : si je ne mets pas // ne me le prend pas, comprends pas ! C'est normal, on est en chemin relatif dc il faut preciser // avant !-->
					<tr>
						<td><xsl:value-of select="gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString"/></td>
						<td><xsl:value-of select="gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString"/></td>
						<td><xsl:value-of select="gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString"/></td>
						<td><xsl:value-of select="gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode"/></td>
					</tr>
				</xsl:for-each>
				</table>
			</div>
			<div class="title2" >About metadata:</div>
				<xsl:call-template name="metadataCreationDateInfo">
					<xsl:with-param name="metadataCreationDate" select="//gmd:dateStamp/gco:Date"></xsl:with-param>
				</xsl:call-template>
				<div id="metadataCreatorInfoContainer">
			<div class="title3">Metadata creator information:</div>
				<table>
					<tr>
						<th>Name:</th>
						<th>Mail:</th>
						<th>Role:</th>
					</tr>
					<tr>
						<td><xsl:call-template name="metadataCreatorNameInfo">
							<xsl:with-param name="metadataCreatorName" select="//gmd:contact/gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString"></xsl:with-param>
						</xsl:call-template></td>
						<td><xsl:call-template name="metadataCreatorMailInfo">
							<xsl:with-param name="metadataCreatorMail" select="//gmd:contact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString"></xsl:with-param>
						</xsl:call-template></td>
						<td><xsl:call-template name="metadataCreatorRoleInfo">
							<xsl:with-param name="metadataCreatorRole" select="//gmd:contact/gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode"></xsl:with-param>
						</xsl:call-template></td>
					</tr>
				</table>
			</div>
		</div>
		</div>
				<!-- TEMPORAL AND GEOGRAPHICAL INFORMATION -->
		<div class="containerInfoClass">
			 <div class="title1" >Temporal and geographical information: </div>
				<div class="containerButton">
				<img class= "showButtonSVG" style="display:none" src= "showButton.svg" title= "Click to show entire information"/>
				<img class= "hideButtonSVG" src= "hideButton.svg" title= "Click to only visualize main title"/>
			</div>
			 <div class= "subContainerInfo">
			  <div class="title2" >Temporal information:</div>
			<xsl:call-template name="temporalInfo">
				<xsl:with-param name="temporalResolution" select="//gmd:extent[position()=1]/gmd:EX_Extent/gmd:description/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="temporalCoverageBegin" select="//gmd:extent/gmd:EX_Extent/gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:beginPosition"></xsl:with-param>
				<xsl:with-param name="temporalCoverageEnd" select="//gmd:extent/gmd:EX_Extent/gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:endPosition"></xsl:with-param>
			</xsl:call-template>
			<div class="title2" >Geographical information:</div>
			<xsl:call-template name="geographicalInfo">
				
				<xsl:with-param name="spatialResolutionUnit" select="//gmd:spatialResolution/gmd:MD_Resolution/gmd:distance/gco:Distance/@uom"></xsl:with-param><!-- POur récupérer la valeur de l'attribut de gco:Distance -->
				<xsl:with-param name="spatialResolutionValue" select="//gmd:spatialResolution/gmd:MD_Resolution/gmd:distance/gco:Distance"></xsl:with-param>
				<xsl:with-param name="spatialCoverageNorth" select="//gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:northBoundLatitude/gco:Decimal"></xsl:with-param>
				<xsl:with-param name="spatialCoverageSouth" select="//gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:southBoundLatitude/gco:Decimal"></xsl:with-param>
				<xsl:with-param name="spatialCoverageWest" select="//gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:westBoundLongitude/gco:Decimal"></xsl:with-param>
				<xsl:with-param name="spatialCoverageEast" select="//gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:eastBoundLongitude/gco:Decimal"></xsl:with-param>
				<xsl:with-param name="verticalLevel" select="//gmd:extent[position()=4]/gmd:EX_Extent/gmd:description/gco:CharacterString"></xsl:with-param>
			</xsl:call-template>
		 </div>
		</div>
				<!-- PRODUCT DESCRIPTION-->
		<div class="containerInfoClass">
			 <div class="title1" >Product description: </div>
			<div class="containerButton">
				<img class= "showButtonSVG" style="display:none" src= "showButton.svg" title= "Click to show entire information"/>
				<img class= "hideButtonSVG" src= "hideButton.svg" title= "Click to only visualize main title"/>
			</div>
			 <div class= "subContainerInfo">
			<xsl:call-template name="productDescription">
				<xsl:with-param name="lineageInformation" select="//gmd19157:lineage/gmd19157:LI_Lineage/gmd19157:processStep/gmd19157:LI_ProcessStep/gmd19157:description/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="urlToDescribeLineage" select="//gmd19157:lineage/gmd19157:LI_Lineage/gmd19157:statement/gmx:FileName/@src"></xsl:with-param>
				<xsl:with-param name="infoAboutLineageUrl" select="//gmd19157:lineage/gmd19157:LI_Lineage/gmd19157:statement/gmx:FileName"></xsl:with-param>
			</xsl:call-template>
		</div>
		</div>
		<!-- KEYWORDS AND REFERENCE -->
		<div class="containerInfoClass">
		       <div class="title1" >Keywords and reference: </div>
		      <div class="containerButton">
				<img class= "showButtonSVG" style="display:none" src= "showButton.svg" title= "Click to show entire information"/>
				<img class= "hideButtonSVG" src= "hideButton.svg" title= "Click to only visualize main title"/>
			</div>
			 <div class= "subContainerInfo">
		          <div class="title2" >Keywords:</div>
			<xsl:call-template name="keywordsInfo">
				<xsl:with-param name="keywords" select="//gmd:descriptiveKeywords/gmd:MD_Keywords/gmd:keyword/gco:CharacterString"></xsl:with-param>
			</xsl:call-template>
		            <xsl:for-each select="//gvq:GVQ_Publication">
			<xsl:call-template name="referencesInfo">
				<xsl:with-param name="referencesTitle" select="gmd:title/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="referencesDate" select="gmd:date/gmd:CI_Date/gmd:date/gco:Date"></xsl:with-param>
				<xsl:with-param name="referencesAuthorsName" select="gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="referencesAuthorsOrganisation" select="gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="referencesAuthorsMail" select="gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="referencesAuthorsRole" select="gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode"></xsl:with-param>
				<xsl:with-param name="referencesNameJournal" select="gmd:series/gmd:CI_Series/gmd:name/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="referencesDOI" select="gvq:doi/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="referencesCategory" select="gvq:category/gvq:GVQ_PublicationCategoryCode"></xsl:with-param>
				<xsl:with-param name="referencesOnlineRessource" select="gvq:onlineResource/gmd:CI_OnlineResource/gmd:linkage/gmd:URL"></xsl:with-param>
			</xsl:call-template>
		             </xsl:for-each>
		 </div>
		</div>	
		<!--QUALITY DATA INFORMATION -->
		<div class="containerInfoClass">
			 <div class="title1" >Quality data information: </div>
			 <div class="containerButton">
				<img class= "showButtonSVG" style="display:none" src= "showButton.svg" title= "Click to show entire information"/>
				<img class= "hideButtonSVG" src= "hideButton.svg" title= "Click to only visualize main title"/>
			</div>
			 <div class= "subContainerInfo">
			<xsl:call-template name="QualityInfo">
				<xsl:with-param name="QualityInfoDescription" select="//gvq:knownProblem/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="QualityInfoURL" select="//gmd19157:standAloneReport/gmd19157:DQ_StandaloneReportInformation/gmd19157:reportReference/gmd19157:DQM_SourceReference/gmd19157:citation/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="QualityInfoURLDescription" select="//gmd19157:standAloneReport/gmd19157:DQ_StandaloneReportInformation/gmd19157:abstract/gco:CharacterString"></xsl:with-param>
			</xsl:call-template>
		 </div>
		</div>
		<!--DATA POLICY/ACCESS INFORMATION -->
		<div class="containerInfoClass">
		  <div class="title1" >Data access and data use policy: </div>
			 <div class="containerButton">
				<img class= "showButtonSVG" style="display:none" src= "showButton.svg" title= "Click to show entire information"/>
				<img class= "hideButtonSVG" src= "hideButton.svg" title= "Click to only visualize main title"/>
			</div>
			 <div class= "subContainerInfo">
			<xsl:call-template name="DataPolicyAccessInfo">
				<xsl:with-param name="DataPolicyPIName" select="//gmd:distributorContact/gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="DataPolicyPIPhone" select="//gmd:distributorContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:voice/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="DataPolicyPIMail" select="//gmd:distributorContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString"></xsl:with-param>
				<xsl:with-param name="URLAccessData" select="//gmd:distributorTransferOptions/gmd:MD_DigitalTransferOptions/gmd:onLine/gmd:CI_OnlineResource/gmd:linkage/gmd:URL"></xsl:with-param>
				<xsl:with-param name="dataPolicyClassification" select="//gmd:resourceConstraints/gmd:MD_Constraints/gmd:useLimitation/gco:CharacterString"></xsl:with-param>
			</xsl:call-template>
		 </div>
		</div>
		
		
</body>
</html>
	</xsl:template>
	<!-- *********************************************************************************************************************************************** -->
	<!-- ************************************ AFFICHAGE DES DONNEES PRISES DANS LE XML : ****************************************-->
	<!-- *********************************************************************************************************************************************** -->
	
<!-- BASIC INFORMATION -->
	<xsl:template name="dataCreationDateInfo">
		<xsl:param name="dataCreationDate"></xsl:param>
		<div class= "title3">Data creation date: 
		<div  class= "respFromXml inlineDisplay">
			<xsl:value-of select="$dataCreationDate"/>
		</div>
		</div>
	</xsl:template>
	<xsl:template name="productNameInfo">
		<xsl:param name="productName"></xsl:param>
		<div class= "title3">Name of the data file (Type-Category-Title-Version): 
		<div  class= "respFromXml inlineDisplay">
		<xsl:value-of select="$productName"/>
		</div>
		</div>
	</xsl:template>
	<xsl:template name="dataAbstractInfo">
		<xsl:param name="dataAbstract"></xsl:param>
		<div class= "title3">Data abstract: 
		<div  class= "respFromXml">
		<xsl:value-of select="$dataAbstract"/>
		</div>
		</div>
	</xsl:template>
	<xsl:template name="metadataCreationDateInfo">
		<xsl:param name="metadataCreationDate"></xsl:param>
		<div class= "title3">Metadata creation date:
		<div  class= "respFromXml inlineDisplay">
		<xsl:value-of select="$metadataCreationDate"/>
		</div>
		</div>
	</xsl:template>
	<xsl:template name="metadataCreatorNameInfo">
		<xsl:param name="metadataCreatorName"></xsl:param>
		<xsl:value-of select="$metadataCreatorName"/>
	</xsl:template>
	<xsl:template name="metadataCreatorMailInfo">
		<xsl:param name="metadataCreatorMail"></xsl:param>
		<xsl:value-of select="$metadataCreatorMail"/>
	</xsl:template>
	<xsl:template name="metadataCreatorRoleInfo">
		<xsl:param name="metadataCreatorRole"></xsl:param>
		<xsl:value-of select="$metadataCreatorRole"/>
	</xsl:template>
<!-- TEMPORAL AND GEOGRAPHICAL INFORMATION -->
	<xsl:template name="temporalInfo">
		<xsl:param name="temporalResolution"></xsl:param>
		<xsl:param name="temporalCoverageBegin"></xsl:param>
		<xsl:param name="temporalCoverageEnd"></xsl:param>
		<div class= "title3">Temporal resolution:
			<div  class= "respFromXml inlineDisplay">
			<xsl:value-of select="$temporalResolution"/>
			</div>
		</div>
		<div class= "title3">temporal coverage:
			<table>
				<tr>
					<th>Begin</th>
					<th>End</th>
				</tr>
				<tr>
					<td><xsl:value-of select="$temporalCoverageBegin"/></td>
					<td><xsl:value-of select="$temporalCoverageEnd"/></td>
				</tr>
			</table>
		</div>
	</xsl:template>
	<xsl:template name="geographicalInfo">
		<xsl:param name="spatialResolutionUnit"></xsl:param>
		<xsl:param name="spatialResolutionValue"></xsl:param>
		<xsl:param name="spatialCoverageNorth"></xsl:param>
		<xsl:param name="spatialCoverageSouth"></xsl:param>
		<xsl:param name="spatialCoverageWest"></xsl:param>
		<xsl:param name="spatialCoverageEast"></xsl:param>
		<xsl:param name="verticalLevel"></xsl:param>
		<div class= "title3">Spatial resolution:
			<table>
				<tr>
					<th>Unit</th>
					<th>Value</th>
				</tr>
				<tr>
					<td><xsl:value-of select="$spatialResolutionUnit"/></td>
					<td><xsl:value-of select="$spatialResolutionValue"/></td>
				</tr>
			</table>
		</div>
		<div class= "title3">Spatial coverage (degrees):
			<table>
				<tr>
					<th>North</th>
					<th>South</th>
					<th>West</th>
					<th>East</th>
				</tr>
				<tr>
					<td><xsl:value-of select="$spatialCoverageNorth"/></td>
					<td><xsl:value-of select="$spatialCoverageSouth"/></td>
					<td><xsl:value-of select="$spatialCoverageWest"/></td>
					<td><xsl:value-of select="$spatialCoverageEast"/></td>
				</tr>
			</table>
		</div>
		<div class= "title3">Vertical level (other = personal clasification from data provider):
			<div  class= "respFromXml inlineDisplay">
			<xsl:value-of select="$verticalLevel"/>
			</div>
		</div>
	</xsl:template>
<!-- PRODUCT DESCRIPTION-->
	<xsl:template name="productDescription">
		<xsl:param name="lineageInformation" select="translate(.,'&amp;#13;','')"></xsl:param>
			
		
		
		<xsl:param name="urlToDescribeLineage"></xsl:param>
		<xsl:param name="infoAboutLineageUrl"></xsl:param>
		
		

		<div class= "title3">How was build the data (lineage information):
			<div  class= "respFromXml">
			<xsl:value-of select="$lineageInformation"/>
			<!--<xsl:choose>-->
				<!--<xsl:when test="contains($lineageInformation,'&amp;#10;')">-->
				<!--<xsl:value-of select="substring-before($lineageInformation,'&amp;#10;')"/>-->
				<!--<br/>-->
				<!--<xsl:call-template name="productDescription">
					<xsl:with-param name="lineageInformation" select="substring-after($lineageInformation,'&amp;#10;')"/>
				</xsl:call-template>-->
				<!--<xsl:value-of select="$lineageInformation"/>
				</xsl:when>
				<xsl:otherwise>-->
					<!--<xsl:value-of select="$lineageInformation"/>-->
					<!--<xsl:value-of select="substring-before($lineageInformation,'&amp;#10;')"/>
					<br/>-->
					<!--<xsl:call-template name="productDescription">
						<xsl:with-param name="lineageInformation" select="substring-after($lineageInformation,'&amp;#10;')"/>
					</xsl:call-template>-->
				<!--</xsl:otherwise>
			</xsl:choose>-->
				<!--<xsl:copy-of select="$lineageInformation"></xsl:copy-of>
-->
				<!--<xsl:value-of select="$lineageInformation" disable-output-escaping="yes" />-->
				<!--<xsl:for-each select="$lineageInformation">
					<xsl:value-of select="."/>&#13;
				</xsl:for-each>-->
				
				
			</div>
		</div>
		<div class= "title3">Document to describe this data creation:
			<div  class= "respFromXml inlineDisplay">
			<xsl:value-of select="$urlToDescribeLineage"/>
			</div>
		</div>
		<div class= "title3">Information about this document:
			<div  class= "respFromXml">
			<xsl:value-of select="$infoAboutLineageUrl"/>
			</div>
		</div>	
	</xsl:template>
<!-- KEYWORDS AND REFERENCE -->
	<xsl:template name="keywordsInfo">
		<xsl:param name="keywords"></xsl:param>
		<div class= "title3">List of keywords describing the product:
			<div  class= "respFromXml">
			<xsl:value-of select="$keywords"/>
			</div>
		</div>
	</xsl:template>
	<xsl:template name="referencesInfo">
	<xsl:param name="referencesTitle"></xsl:param>
	<xsl:param name="referencesDate"></xsl:param>
	<xsl:param name="referencesAuthorsName"></xsl:param>
	<xsl:param name="referencesAuthorsOrganisation"></xsl:param>
	<xsl:param name="referencesAuthorsMail"></xsl:param>
	<xsl:param name="referencesAuthorsRole"></xsl:param>
	<xsl:param name="referencesNameJournal"></xsl:param>
	<xsl:param name="referencesDOI"></xsl:param>
	<xsl:param name="referencesCategory"></xsl:param>
	<xsl:param name="referencesOnlineRessource"></xsl:param>
	
	<div class="title2" >Reference <xsl:number level= "any" count="gvq:referenceDoc" from="gmd:identificationInfo" format="1"></xsl:number>:</div>
	         <div class= "title3">Title:
		<div  class= "respFromXml inlineDisplay">
		<xsl:value-of select="$referencesTitle"/>
		</div>
		</div>
	         <div class= "title3">Publication date:
		<div  class= "respFromXml inlineDisplay">
		<xsl:value-of select="$referencesDate"/>
		</div>
		</div>
		<div class="title3">First author information:</div>
				<table>
					<tr>
						<th>Name:</th>
						<th>Organisation:</th>
						<th>Mail:</th>
						<th>Role:</th>
					</tr>
					<tr>
						<td><xsl:value-of select="$referencesAuthorsName"/></td>
						<td><xsl:value-of select="$referencesAuthorsOrganisation"/></td>
						<td><xsl:value-of select="$referencesAuthorsMail"/></td>
						<td><xsl:value-of select="$referencesAuthorsRole"/></td>
					</tr>
		
				</table>
		<div class= "title3">name of the journal:
		<div  class= "respFromXml inlineDisplay">
		 <xsl:value-of select="$referencesNameJournal"/>
		</div>
		</div>
		<div class= "title3">DOI:
		<div  class= "respFromXml inlineDisplay">
		 <xsl:value-of select="$referencesDOI"/>
		</div>
		</div>
		<div class= "title3">Category:
		<div  class= "respFromXml inlineDisplay">
		<xsl:value-of select="$referencesCategory"/>
		</div>
		</div>
		<div class= "title3">Online ressource:
		<div  class= "respFromXml inlineDisplay">
		 <xsl:value-of select="$referencesOnlineRessource"/>
		</div>
		</div>
	</xsl:template>
<!-- QUALITY DATA INFO -->
        <xsl:template name="QualityInfo">
	<xsl:param name="QualityInfoDescription"></xsl:param>
	<xsl:param name="QualityInfoURL"></xsl:param>
	<xsl:param name="QualityInfoURLDescription"></xsl:param>
	<div class= "title3">Quality description (availability of product-errors, product evaluation, ...):
		<div  class= "respFromXml">
		 <xsl:value-of select="$QualityInfoDescription"/>
		</div>
		</div>
	<div class= "title3">Document URL to describe quality:
		<div  class= "respFromXml inlineDisplay">
		 <xsl:value-of select="$QualityInfoURL"/>
		</div>
		</div>
	<div class= "title3">Information about the document related to the url:
		<div  class= "respFromXml">
		 <xsl:value-of select="$QualityInfoURLDescription"/>
		</div>
		</div>
           </xsl:template>
<!--DATA POLICY/ACCESS INFORMATION -->
	<xsl:template name="DataPolicyAccessInfo">
	  <xsl:param name="DataPolicyPIName"></xsl:param>
	  <xsl:param name="DataPolicyPIMail"></xsl:param>
	  <xsl:param name="DataPolicyPIPhone"></xsl:param>
	  <xsl:param name="URLAccessData"></xsl:param>
	  <xsl:param name="dataPolicyClassification"></xsl:param>
		<div class="title3">First author information:</div>
				<table>
					<tr>
						<th>Name:</th>
						<th>Mail:</th>
						<th>Phone:</th>
					</tr>
					<tr>
						<td><xsl:value-of select="$DataPolicyPIName"/></td>
						<td><xsl:value-of select="$DataPolicyPIMail"/></td>
						<td><xsl:value-of select="$DataPolicyPIPhone"/></td>
					</tr>
				</table>
		<div class= "title3">Original data url:
		  <div  class= "respFromXml inlineDisplay">
		   <xsl:value-of select="$URLAccessData"/>
		  </div>
		</div>
		<div class= "title3">Data policy classification (other = personal clasification from data provider):
		  <div  class= "respFromXml inlineDisplay">
		   <xsl:value-of select="$dataPolicyClassification"/>
		  </div>
		</div>
		
		
		
		

		
		
              </xsl:template>
	
	 
				

	
	
</xsl:stylesheet>


