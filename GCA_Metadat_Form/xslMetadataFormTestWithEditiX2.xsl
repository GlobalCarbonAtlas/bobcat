<?xml version="1.0" encoding="UTF-8"?>
<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Jun 02 14:30:21 CEST 2014 -->
<!-- Comme on a de NS, il faut les declarer ds le style sheet, racine, pour pouvoir ensuite appliquer XPath--><xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:gmd19157="http://www.geoviqua.org/gmd19157" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:updated19115="http://www.geoviqua.org/19115_updates" xmlns:un="http://www.uncertml.org/2.0" xmlns:gts="http://www.isotc211.org/2005/gts" xmlns:gvq="http://www.geoviqua.org/QualityInformationModel/3.1" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gmi="http://www.isotc211.org/2005/gmi">
	<xsl:strip-space elements="*"/><!-- CF http://www.w3schools.com/xsl/el_preserve-space.asp -->
	<xsl:output method="html"/>
	<xsl:template match="/">
	
<html>
<head>
	<title><xsl:text>Metadata form</xsl:text></title>
	<link type="text/css" rel="stylesheet" href="cssToXmlActualizedByGCAMetadatForm2.css"/>
</head>
<body>
				
<!-- BASIC INFORMATION :-->
<div id= "containerBasicInfo" class= "containerInfoClass">
 <div id= "basicInfoTitle" class= "title1">Basic information</div>
  <div id= "aboutDataTitle" class= "title2">About data:</div>
   <div id= "creationDateTitle" class= "title3">Creation date: <xsl:value-of select="//gmd:fileIdentifier/gco:CharacterString"/></div>
    <div id= "creationDate" class= "respFromXml">date truc</div>
   <div id= "productNameTitle" class= "title3">Product name (type-category-title-version): <xsl:value-of select="//gmd:fileIdentifier/gco:CharacterString"/></div>
    <div id= "productName" class= "respFromXml">productName truc</div>
   <div id= "dataContributorInfoTitle" class= "title3">Data contributor information:</div>
    <div id= "dataContributorInfoNameTitle" class= "title4">Name:</div>
     <div id= "dataContributorInfoName" class= "respFromXml">Name truc</div>
    <div id= "dataContributorInfoOrgananisationTitle" class= "title4">Organisation:</div>
    <div id= "dataContributorInfoOrganisation" class= "respFromXml">Organisation truc:</div>
    <div id= "dataContributorInfoMailTitle" class= "title4">Mail:</div>
    <div id= "dataContributorInfoMail" class= "respFromXml">Mail truc:</div>
    <div id= "dataContributorInfoRoleTitle" class= "title4">Role:</div>
    <div id= "dataContributorInfoRole" class= "respFromXml">Role truc:</div>
  <div id= "aboutMetadataTitle" class= "title2">About metadata file:</div>
   <div id= "metadataCreationDateTitle" class= "title3">Creation date:</div>
    <div id= "metadataCreationDate" class= "respFromXml">date truc</div>
   <div id= "metadataCreatorInfoTitle" class= "title3">Metadata creator information: </div>
    <div id= "metadataCreatorInfoNameTitle" class= "title4">Name:</div>
     <div id= "metadataCreatorInfoName" class= "respFromXml">Name truc</div>
    <div id= "metadataCreatorInfoMailTitle" class= "title4">Mail:</div>
    <div id= "metadataCreatorInfoMail" class= "respFromXml">Mail truc:</div>
    <div id= "metadataCreatorInfoRoleTitle" class= "title4">Role:</div>
    <div id= "metadataCreatorInfoRole" class= "respFromXml">Role truc:</div>
</div>

           
</body>
</html>
</xsl:template>


</xsl:stylesheet>
