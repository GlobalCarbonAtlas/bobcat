<?php
/* Call server must be dynamic : */
 $UrlPart1= $_SERVER["SERVER_NAME"];
 $UrlPart2= $_SERVER["PHP_SELF"];

$xmlStringPart1= '<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="../xsl/xslMetadataForm.xsl"?>
<gvq:GVQ_Metadata xmlns:updated19115="http://www.geoviqua.org/19115_updates" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gvq="http://www.geoviqua.org/QualityInformationModel/4.0" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:gmd19157="http://www.geoviqua.org/gmd19157" xmlns:un="http://www.uncertml.org/2.0" xsi:schemaLocation="http://www.isotc211.org/2005/gmx http://schemas.opengis.net/iso/19139/20070417/gmx/gmx.xsd
http://www.geoviqua.org/QualityInformationModel/4.0 http://schemas.geoviqua.org/GVQ/4.0/GeoViQua_PQM_UQM.xsd
http://www.uncertml.org/2.0 http://www.uncertml.org/uncertml.xsd" id="dataset_MD">
<gmd:fileIdentifier>
<gco:CharacterString>'.$_POST["dataProductTypeSelectPost"].$_POST["dataProductTypeInputPost"].'_'.$_POST["dataProductCategorySelectPost"].$_POST["dataProductCategoryInputPost"].'_'.$_POST["prodNameTitlePost"].'_'.$_POST["prodNameVersionPost"].'_'.$_POST["dateFillFormIsoPost"].'</gco:CharacterString>
</gmd:fileIdentifier>
<gmd:language>
<gco:CharacterString>Eng</gco:CharacterString>
</gmd:language>
<gmd:contact>
<gmd:CI_ResponsibleParty>
<gmd:individualName>
<gco:CharacterString>'.$_POST["metadatCreatorInfoNamePost"].'</gco:CharacterString>
</gmd:individualName>
<gmd:positionName>
  <gco:CharacterString>'.$_POST["metadatCreatorInfoPositionPost"].'</gco:CharacterString>
</gmd:positionName>
<gmd:contactInfo>
<gmd:CI_Contact>
<gmd:address>
<gmd:CI_Address>
<gmd:electronicMailAddress>
<gco:CharacterString>'.$_POST["metadatCreatorInfoMailPost"].'</gco:CharacterString>
</gmd:electronicMailAddress>
</gmd:CI_Address>
</gmd:address>
</gmd:CI_Contact>
</gmd:contactInfo>
<gmd:role>
<gmd:CI_RoleCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_RoleCode" codeListValue="author">'.$_POST["metadatCreatorInfoRolePost"].'</gmd:CI_RoleCode>
</gmd:role>
</gmd:CI_ResponsibleParty>
</gmd:contact>
<gmd:dateStamp>
<gco:Date>'.$_POST["metadataDateCreationPost"].'</gco:Date>
</gmd:dateStamp>
<gmd:metadataStandardName>
<gco:CharacterString>ISO 19115:2003/19139</gco:CharacterString>
</gmd:metadataStandardName>
<gmd:metadataStandardVersion>
<gco:CharacterString>1.0</gco:CharacterString>
</gmd:metadataStandardVersion>
<gmd:identificationInfo>
<gvq:GVQ_DataIdentification>
<gmd:citation>
<gmd:CI_Citation>
<gmd:title>
<gco:CharacterString>'.$_POST["dataProductTypeSelectPost"].$_POST["dataProductTypeInputPost"].'_'.$_POST["dataProductCategorySelectPost"].$_POST["dataProductCategoryInputPost"].'_'.$_POST["prodNameTitlePost"].'_'.$_POST["prodNameVersionPost"].'_'.$_POST["dateFillFormIsoPost"].'</gco:CharacterString>
</gmd:title>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>'.$_POST["dataDateCreationPost"].'</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="creation">creation</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:identifier>
              <updated19115:MD_Identifier>
                        <gmd:code>
                            <gco:CharacterString>'.$_POST["dataProductTypeSelectPost"].$_POST["dataProductTypeInputPost"].'_'.$_POST["dataProductCategorySelectPost"].$_POST["dataProductCategoryInputPost"].'_'.$_POST["prodNameTitlePost"].'_'.$_POST["prodNameVersionPost"].'_'.$_POST["dateFillFormIsoPost"].'.xml</gco:CharacterString>
                        </gmd:code>
                        <updated19115:codeSpace>
                            <gco:CharacterString>'.$UrlPart1.'/bobcat/xmlDoneByForm/</gco:CharacterString>
                        </updated19115:codeSpace>
              </updated19115:MD_Identifier>
</gmd:identifier>
<gmd:presentationForm>
<gmd:CI_PresentationFormCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_PresentationFormCode" codeListValue="mapDigital">mapDigital</gmd:CI_PresentationFormCode>
</gmd:presentationForm>
</gmd:CI_Citation>
</gmd:citation>
<gmd:abstract>
<gco:CharacterString>'.$_POST["dataAbstractPost"].'</gco:CharacterString>
</gmd:abstract>';
$xmlStringPart3= '<gmd:descriptiveKeywords>
<gmd:MD_Keywords>
<gmd:keyword>
<gco:CharacterString>'.$_POST["keywordsInfoPost"].'</gco:CharacterString>
</gmd:keyword>
</gmd:MD_Keywords>
</gmd:descriptiveKeywords>
<gmd:resourceConstraints>
<gmd:MD_Constraints>
<gmd:useLimitation>
<gco:CharacterString>'.$_POST["dataPolicyPost"].'</gco:CharacterString>
</gmd:useLimitation>
</gmd:MD_Constraints>
</gmd:resourceConstraints>
<gmd:spatialRepresentationType>
<gmd:MD_SpatialRepresentationTypeCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#MD_SpatialRepresentationTypeCode" codeListValue="grid"/>
</gmd:spatialRepresentationType>
<gmd:spatialResolution>
<gmd:MD_Resolution>
<gmd:distance>
<gco:Distance uom="'.$_POST["spatialResolutionLongUnitPost"].'">'.$_POST["spatialResolutionLongValuePost"].'</gco:Distance>
</gmd:distance>
</gmd:MD_Resolution>
</gmd:spatialResolution>
<gmd:spatialResolution>
<gmd:MD_Resolution>
<gmd:distance>
<gco:Distance uom="'.$_POST["spatialResolutionLongUnitPost"].'">'.$_POST["spatialResolutionLatValuePost"].'</gco:Distance>
</gmd:distance>
</gmd:MD_Resolution>
</gmd:spatialResolution>
<gmd:language>
<gco:CharacterString>Eng</gco:CharacterString>
</gmd:language>
<gmd:topicCategory>
<gmd:MD_TopicCategoryCode>climatologyMeteorologyAtmosphere</gmd:MD_TopicCategoryCode>
</gmd:topicCategory>
<gmd:topicCategory>
<gmd:MD_TopicCategoryCode>environment</gmd:MD_TopicCategoryCode>
</gmd:topicCategory>
<gmd:extent>
<gmd:EX_Extent>
<gmd:description>
<gco:CharacterString>'.$_POST["temporalResolutionSelectPost"].$_POST["temporalResolutionInputPost"].'</gco:CharacterString>
</gmd:description>
</gmd:EX_Extent>
</gmd:extent>
<gmd:extent>
<gmd:EX_Extent>
<gmd:temporalElement>
<gmd:EX_TemporalExtent>
<gmd:extent>
<gml:TimePeriod gml:id="temporalExtent">
<gml:beginPosition>'.$_POST["temporalCoverageBeginNamePost"].'</gml:beginPosition>
<gml:endPosition>'.$_POST["temporalCoverageEndNamePost"].'</gml:endPosition>
</gml:TimePeriod>
</gmd:extent>
</gmd:EX_TemporalExtent>
</gmd:temporalElement>
</gmd:EX_Extent>
</gmd:extent>
<gmd:extent>
<gmd:EX_Extent>
<gmd:geographicElement>
<gmd:EX_GeographicBoundingBox>
<gmd:westBoundLongitude>
<gco:Decimal>'.$_POST["westBoundLongitudePost"].'</gco:Decimal>
</gmd:westBoundLongitude>
<gmd:eastBoundLongitude>
<gco:Decimal>'.$_POST["eastBoundLongitudePost"].'</gco:Decimal>
</gmd:eastBoundLongitude>
<gmd:southBoundLatitude>
<gco:Decimal>'.$_POST["southBoundLatitudePost"].'</gco:Decimal>
</gmd:southBoundLatitude>
<gmd:northBoundLatitude>
<gco:Decimal>'.$_POST["northBoundLatitudePost"].'</gco:Decimal>
</gmd:northBoundLatitude>
</gmd:EX_GeographicBoundingBox>
</gmd:geographicElement>
</gmd:EX_Extent>
</gmd:extent>
<gmd:extent>
<gmd:EX_Extent>
<gmd:description>
<gco:CharacterString>'.$_POST["verticalLevelSelectPost"].$_POST["verticalLevelInputPost"].'</gco:CharacterString>
</gmd:description>
</gmd:EX_Extent>
</gmd:extent>';
$xmlStringPart4= '</gvq:GVQ_DataIdentification>
</gmd:identificationInfo>
<gmd:distributionInfo>
<gmd:MD_Distribution>
<gmd:distributor>
<gmd:MD_Distributor>
<gmd:distributorContact>
<gmd:CI_ResponsibleParty id="dataset_Distributor_contact">
<gmd:individualName>
<gco:CharacterString>'.$_POST["principalInvestigatorContactNamePost"].'</gco:CharacterString>
</gmd:individualName>
<gmd:contactInfo>
<gmd:CI_Contact>
<gmd:phone>
<gmd:CI_Telephone>
<gmd:voice>
<gco:CharacterString>'.$_POST["principalInvestigatorContactPhonePost"].'</gco:CharacterString>
</gmd:voice>
</gmd:CI_Telephone>
</gmd:phone>
<gmd:address>
<gmd:CI_Address>
<gmd:electronicMailAddress>
<gco:CharacterString>'.$_POST["principalInvestigatorContactMailPost"].'</gco:CharacterString>
</gmd:electronicMailAddress>
</gmd:CI_Address>
</gmd:address>
</gmd:CI_Contact>
</gmd:contactInfo>
<gmd:role>
<gmd:CI_RoleCode codeList="http://www.isotc211.org/2005/resources/codeList.xml#CI_RoleCode" codeListValue="Principal investigator (point of contact)"/>
</gmd:role>
</gmd:CI_ResponsibleParty>
</gmd:distributorContact>
<gmd:distributorTransferOptions>
<gmd:MD_DigitalTransferOptions>
<gmd:onLine>
<gmd:CI_OnlineResource>
<gmd:linkage>
<gmd:URL>'.$_POST["originalDataUrlPost"].'</gmd:URL>
</gmd:linkage>
</gmd:CI_OnlineResource>
</gmd:onLine>
</gmd:MD_DigitalTransferOptions>
</gmd:distributorTransferOptions>
</gmd:MD_Distributor>
</gmd:distributor>
</gmd:MD_Distribution>
</gmd:distributionInfo>
<gvq:dataQualityInfo>
<gvq:GVQ_DataQuality>
<gmd19157:scope>
<gmd19157:DQ_Scope>
<gmd19157:level>
<gmd:MD_ScopeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#MD_ScopeCode" codeListValue="feature">Feature</gmd:MD_ScopeCode>
</gmd19157:level>
</gmd19157:DQ_Scope>
</gmd19157:scope>
<gmd19157:lineage>
<gmd19157:LI_Lineage>
<gmd19157:statement>
<gmx:FileName src="'.$_POST["addDocProductDetailsPost"].'">'.$_POST["addDocDescriptionProductDetailsPost"].'</gmx:FileName>
</gmd19157:statement>';
$xmlStringPart5= 
'</gmd19157:LI_Lineage>
</gmd19157:lineage>
<gmd19157:standAloneReport>
<gmd19157:DQ_StandaloneReportInformation>
<gmd19157:reportReference>
<gmd19157:DQM_SourceReference>
<gmd19157:citation>
<gco:CharacterString>'.$_POST["docRelatedToQualityDescUrlPost"].'</gco:CharacterString>
</gmd19157:citation>
</gmd19157:DQM_SourceReference>
</gmd19157:reportReference>
<gmd19157:abstract>
<gco:CharacterString>'.$_POST["docRelatedToQualityDescDescPost"].'</gco:CharacterString>
</gmd19157:abstract>
</gmd19157:DQ_StandaloneReportInformation>
</gmd19157:standAloneReport>
<gvq:discoveredIssue>
<gvq:GVQ_DiscoveredIssue>
<gvq:target>
<updated19115:MD_Identifier>
<gmd:code>
<gco:CharacterString>UniqueCodeForQualityDiscoveredIssue</gco:CharacterString>
</gmd:code>
</updated19115:MD_Identifier>
</gvq:target>
<gvq:knownProblem>
<gco:CharacterString>'.$_POST["qualityDescriptionPost"].'</gco:CharacterString>
</gvq:knownProblem>
</gvq:GVQ_DiscoveredIssue>
</gvq:discoveredIssue>
</gvq:GVQ_DataQuality>
</gvq:dataQualityInfo>
</gvq:GVQ_Metadata>';
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------- CONSTRUCTION OF THE DYNAMIC PARTS:: ----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// Var pour ajouter Contributors, descriptionSteps et References :
$index= '';
$indexRef= '';
$indexSteps= '';
$compteurBoucle= 1;// For data contributors.
$compteurBoucleSteps= 1;
$compteurBoucleRef= 1;

// 1) $xmlStringPart2DataContributor:
$nDataContributors= $_POST["nDataContributorsPost"];
$xmlStringPart2DataContributor= '';
while ($compteurBoucle <= $nDataContributors)
{
$index= $index."1";// Ds boucle si non n est pas incremente.
$xmlStringPart2DataContributorS=
'<gmd:pointOfContact>
<gmd:CI_ResponsibleParty>
<gmd:individualName>
<gco:CharacterString>'.$_POST["dataProducerInfoName".$index."Post"].'</gco:CharacterString>
</gmd:individualName>
<gmd:organisationName>
<gco:CharacterString>'.$_POST["dataProducerInfoOrganisation".$index."Post"].'</gco:CharacterString>
</gmd:organisationName>
<gmd:positionName>
<gco:CharacterString>'.$_POST["dataProducerInfoPosition".$index."Post"].'</gco:CharacterString>
</gmd:positionName>
<gmd:contactInfo>
<gmd:CI_Contact>
<gmd:address>
<gmd:CI_Address>
<gmd:electronicMailAddress>
<gco:CharacterString>'.$_POST["dataProducerInfoMail".$index."Post"].'</gco:CharacterString>
</gmd:electronicMailAddress>
</gmd:CI_Address>
</gmd:address>
</gmd:CI_Contact>
</gmd:contactInfo>
<gmd:role>
<gmd:CI_RoleCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_RoleCode" codeListValue="author">'.$_POST["dataProducerInfoRole".$index."Post"].'</gmd:CI_RoleCode>
</gmd:role>
</gmd:CI_ResponsibleParty>
</gmd:pointOfContact>';
$xmlStringPart2DataContributor= $xmlStringPart2DataContributor.$xmlStringPart2DataContributorS;
$compteurBoucle++;
}

// ***************************************************************************************************************************************************************//
// 2) $xmlStringPart2bDescriptionStep:
$nDescriptionSteps= $_POST["nDescriptionStepsPost"];
$xmlStringPart2bDescriptionStep= '';
while ($compteurBoucleSteps <= $nDescriptionSteps)
{
$indexSteps= $indexSteps."1";
$xmlStringPart2bDescriptionStepS=
'<gmd19157:processStep>
<gmd19157:LI_ProcessStep>
<gmd19157:description>
<gco:CharacterString>'.$_POST["productDetails".$indexSteps."Post"].'</gco:CharacterString>
</gmd19157:description>
</gmd19157:LI_ProcessStep>
</gmd19157:processStep>';
$xmlStringPart2bDescriptionStep= $xmlStringPart2bDescriptionStep.$xmlStringPart2bDescriptionStepS;
$compteurBoucleSteps++;
}

// ***************************************************************************************************************************************************************//
// 3) $xmlStringPart3ReferencesInfo:
$nReferences= $_POST["nReferencesPost"];
$xmlStringPart3ReferencesInfo= '';
while ($compteurBoucleRef <= $nReferences)
{
$indexRef= $indexRef."1";
$xmlStringPart3ReferencesInfoS= '<gvq:referenceDoc>
<gvq:GVQ_Publication id="idCitation'.$indexRef.'">
<gmd:title>
<gco:CharacterString>'.$_POST["citationTitle".$indexRef."Post"].'</gco:CharacterString>
</gmd:title>
<gmd:date>
<gmd:CI_Date>
<gmd:date>
<gco:Date>'.$_POST["citationBookDate".$indexRef."Post"].'</gco:Date>
</gmd:date>
<gmd:dateType>
<gmd:CI_DateTypeCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication">publication</gmd:CI_DateTypeCode>
</gmd:dateType>
</gmd:CI_Date>
</gmd:date>
<gmd:citedResponsibleParty>
<gmd:CI_ResponsibleParty>
<gmd:individualName>
<gco:CharacterString>'.$_POST["citationAuthorName".$indexRef."Post"].'</gco:CharacterString>
</gmd:individualName>
<gmd:organisationName>
<gco:CharacterString>'.$_POST["citationAuthorOrganisation".$indexRef."Post"].'</gco:CharacterString>
</gmd:organisationName>
<gmd:positionName>
  <gco:CharacterString>'.$_POST["citationAuthorPosition".$indexRef."Post"].'</gco:CharacterString>
</gmd:positionName>
<gmd:contactInfo>
<gmd:CI_Contact>
<gmd:address>
<gmd:CI_Address>
<gmd:electronicMailAddress>
<gco:CharacterString>'.$_POST["citationAuthorMail".$indexRef."Post"].'</gco:CharacterString>
</gmd:electronicMailAddress>
</gmd:CI_Address>
</gmd:address>
</gmd:CI_Contact>
</gmd:contactInfo>
<gmd:role>
<gmd:CI_RoleCode codeList="http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#CI_RoleCode" codeListValue="author"/>
</gmd:role>
</gmd:CI_ResponsibleParty>
</gmd:citedResponsibleParty>
<gmd:series>
<gmd:CI_Series>
<gmd:name>
<gco:CharacterString>'.$_POST["nameMagazine".$indexRef."Post"].'</gco:CharacterString>
</gmd:name>
</gmd:CI_Series>
</gmd:series>
<gvq:target xlink:href="urlToLinkUnique"/>
<gvq:doi>
<gco:CharacterString>'.$_POST["citationDOI".$indexRef."Post"].'</gco:CharacterString>
</gvq:doi>
<gvq:scope xlink:href="#datasetScope"/>
<gvq:category>
<gvq:GVQ_PublicationCategoryCode codeList="http://schemas.geoviqua.org/GVQ/4.0/resources/Codelist/gvqCodelists.xml#GVQ_PublicationCategoryCode" codeListValue="journalArticle">'.$_POST["citationBookCategory".$indexRef."Post"].'</gvq:GVQ_PublicationCategoryCode>
</gvq:category>
<gvq:onlineResource>
<gmd:CI_OnlineResource>
<gmd:linkage>
<gmd:URL>'.$_POST["citationOnlineRessource".$indexRef."Post"].'</gmd:URL>
</gmd:linkage>
</gmd:CI_OnlineResource>
</gvq:onlineResource>
</gvq:GVQ_Publication>
</gvq:referenceDoc>';

$xmlStringPart3ReferencesInfo= $xmlStringPart3ReferencesInfo.$xmlStringPart3ReferencesInfoS;
$compteurBoucleRef++;
}

$xmlString= $xmlStringPart1.$xmlStringPart2DataContributor.$xmlStringPart3.$xmlStringPart3ReferencesInfo.$xmlStringPart4.$xmlStringPart2bDescriptionStep.$xmlStringPart5;

$docDom= new DOMDocument();
$docDom-> formatOutput = true; // CF php-xml how to output nice format.
$docDom-> preserveWhiteSpace = false;
$docDom->loadXML($xmlString);
// Keep file with new name : Give possibility to read after creation.
$docDom->save("xmlDoneByForm/".$_POST["dataProductTypeSelectPost"].$_POST["dataProductTypeInputPost"].'_'.$_POST["dataProductCategorySelectPost"].$_POST["dataProductCategoryInputPost"].'_'.$_POST["prodNameTitlePost"].'_'.$_POST["prodNameVersionPost"].'_'.$_POST["dateFillFormIsoPost"].".xml");


?>


