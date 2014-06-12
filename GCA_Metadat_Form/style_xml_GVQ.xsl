<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with Liquid XML Studio Developer Edition (Education) 9.1.11.3570 (http://www.liquid-technologies.com) -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:gvq="http://www.geoviqua.org/QualityInformationModel/3.1" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:gts="http://www.isotc211.org/2005/gts" xmlns:gmi="http://www.isotc211.org/2005/gmi" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gmd19157="http://www.geoviqua.org/gmd19157" xmlns:updated19115="http://www.geoviqua.org/19115_updates" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:un="http://www.uncertml.org/2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xsl:strip-space elements="*" />
    <xd:doc xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl" scope="stylesheet">
        <xd:desc>
            <xd:p>
                <xd:b>Created on:</xd:b>Aug 31, 2011
            </xd:p>
            <xd:p>
                <xd:b>Author:</xd:b>ted.habermann@noaa.gov (adapted by l.bastin@aston.ac.uk)
            </xd:p>
            <xd:p />
        </xd:desc>
    </xd:doc>
    <xsl:variable name="transformName" select="'GeoViQuaComponents-HTMLTable.xsl'" />
    <xsl:variable name="transformVersion" select="'1.0'" />
    <xsl:variable name="contact" select="gmi:MI_Metadata/gmd:contact | gvq:GVQ_Metadata/gmd:contact | gmd:MD_Metadata/gmd:contact" />
    <xsl:variable name="fileID" select="gmi:MI_Metadata/gmd:fileIdentifier/gco:CharacterString|gmd:MD_Metadata/gmd:fileIdentifier/gco:CharacterString|gvq:GVQ_Metadata/gmd:fileIdentifier/gco:CharacterString|//gmd:seriesMetadata/gmi:MI_Metadata/gmd:fileIdentifier/gco:CharacterString" />
    <xsl:key name="scopeCodes" match="//gmd:hierarchyLevel/gmd:MD_ScopeCode" use="." />
    <xsl:key name="uniqueIndividualsOrganisationsRole" match="gmd:CI_ResponsibleParty" use="concat(normalize-space(gmd:individualName/gco:CharacterString),normalize-space(gmd:organisationName/gco:CharacterString),gmd:role/gmd:CI_RoleCode)" />
    <xsl:key name="uniqueAbstracts" match="gmd:abstract" use="normalize-space(gco:CharacterString)" />
    <xsl:key name="uniqueReferencs" match="//*[@xlink:href]" use="concat(@xlink:href,@xlink:title)" />
    <xsl:key name="uniqueBoundingBoxes" match="gmd:EX_GeographicBoundingBox" use="concat(gmd:westBoundLongitude/gco:Decimal,gmd:eastBoundLongitude/gco:Decimal,gmd:southBoundLatitude/gco:Decimal,gmd:northBoundLatitude/gco:Decimal)" />
    <xsl:key name="uniqueExtents" match="gmd:EX_Extent" use="concat(gmd:geographicElement/@xlink:href,gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/@xlink:href)" />
    <xsl:key name="referencedScope" match="gmd19157:DQ_Scope" use="@id" />
    <xsl:key name="referencedMetaQuality" match="gmd19157:relatedElement" use="@xlink:href" />
    <!-- Display Results Fields -->
    <xsl:template match="/">
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
                <style type="text/css">
                    table {
                    empty-cells : show;
                    }></style>
                <title>ISO Table View</title>
                <link href="http://schemas.geoviqua.org/GVQ/3.0.0/stylesheets/css/GVQ.css" rel="stylesheet" type="text/css"></link>
            </head>
            <body>
                <h1>GeoViQua / ISO 19115 Metadata Summary</h1>
                <p>This report displays some of the contents of ISO 19115 records. If quality information conformant with the GeoViQua information model is present, this will also be displayed.</p>
                <p>This report is produced using an adapted version of this
                    <a href="http://www.ngdc.noaa.gov/metadata/published/xsl/ISO19115Components-HTMLTable.xsl">stylesheet</a>
                </p>
                <xsl:variable name="fileScopes">
                    <xsl:for-each select="//gmd:hierarchyLevel/gmd:MD_ScopeCode[generate-id() = generate-id(key('scopeCodes',.)[1])]">
                        <xsl:if test="position() &gt; 1">
                            <xsl:value-of select="', '" />
                        </xsl:if>
                        <xsl:value-of select="." /> (<xsl:value-of select="count(key('scopeCodes',.))" />)
                    </xsl:for-each>
                </xsl:variable>
                <h2>Metadata file identifier:
                    <xsl:value-of select="$fileID" />
                    <xsl:if test="$fileScopes"> - (Scopes:
                        <xsl:value-of select="$fileScopes" />)
                    </xsl:if>
                </h2>
                <xsl:call-template name="links" />
                <xsl:if test="count(//gmd:DS_Platform | //gmd:DS_Series | //gmd:DS_Sensor)">
                    <div>
                        <a name="datasets" />
                    </div>
                    <h2>Series</h2>
                    <xsl:for-each select="//gmd:DS_Platform | //gmd:DS_Series | //gmd:DS_Sensor">
                        <xsl:variable name="seriesName">
                            <xsl:value-of select="substring-after(name(),'_')" />
                            <xsl:text>: </xsl:text>
                            <xsl:choose>
                                <xsl:when test="gmd:seriesMetadata/gmi:MI_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString">
                                    <xsl:value-of select="gmd:seriesMetadata/gmi:MI_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="'Untitled'" />
                                </xsl:otherwise>
                            </xsl:choose>
                            <xsl:if test="gmd:seriesMetadata/gmi:MI_Metadata/gmd:fileIdentifier/gco:CharacterString">
                                <xsl:text> (Identifier: </xsl:text>
                                <xsl:value-of select="gmd:seriesMetadata/gmi:MI_Metadata/gmd:fileIdentifier/gco:CharacterString" />
                                <xsl:text>)</xsl:text>
                            </xsl:if>
                        </xsl:variable>
                        <xsl:variable name="memberCount" select="count(gmd:composedOf/gmd:DS_DataSet/gmd:has)" />
                        <h3>
                            <xsl:value-of select="$seriesName" /> :
                            <xsl:value-of select="$memberCount" /> Members
                        </h3>
                        <xsl:if test="$memberCount">
                            <table width="95%" border="1" cellpadding="2" cellspacing="2">
                                <tr>
                                    <th valign="top">Title</th>
                                    <th valign="top">Identifier</th>
                                    <th valign="top">Type</th>
                                </tr>
                                <xsl:for-each select="gmd:composedOf/gmd:DS_DataSet/gmd:has/*">
                                    <tr>
                                        <td valign="top">
                                            <xsl:value-of select="gmd:identificationInfo//gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                        </td>
                                        <td valign="top">
                                            <xsl:value-of select="gmd:fileIdentifier/gco:CharacterString" />
                                        </td>
                                        <td valign="top">
                                            <xsl:value-of select="gmd:hierarchyLevel/gmd:MD_ScopeCode" /> (<xsl:value-of select="name()" />)
                                        </td>
                                    </tr>
                                </xsl:for-each>
                                <tr>
                                    <td>
                                        <xsl:value-of select="gmd:seriesMetadata/gmi:MI_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="gmd:seriesMetadata/gmi:MI_Metadata/gmd:fileIdentifier/gco:CharacterString" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="gmd:seriesMetadata/gmi:MI_Metadata/gmd:hierarchyLevel/gmd:MD_ScopeCode" /> (<xsl:value-of select="name(gmd:seriesMetadata/*)" />)
                                    </td>
                                </tr>
                            </table>
                        </xsl:if>
                    </xsl:for-each>
                    <xsl:call-template name="links" />
                </xsl:if>
                <xsl:if test="count(//gmd:identificationInfo//gmd:citation)">
                    <div>
                        <a name="Citations and abstract" />
                    </div>
                    <h2>Citations</h2>
                    <table width="95%" border="1" cellpadding="2" cellspacing="2">
                        <tr>
                            <th valign="top">ID</th>
                            <th valign="top">UUID</th>
                            <th valign="top">Identifier Code</th>
                            <th valign="top">Title</th>
                            <th valign="top">Date</th>
                        </tr>
                        <xsl:for-each select="//gmd:identificationInfo//gmd:citation">
                            <xsl:variable name="resourceType">
                                <xsl:choose>
                                    <xsl:when test="name(..)='gmd:MD_DataIdentification'">
                                        <xsl:value-of select="'dataset'" />
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="'service'" />
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:variable>
                            <xsl:variable name="ID" select="gmd:CI_Citation/@id" />
                            <xsl:variable name="UUID" select="gmd:CI_Citation/@uuid" />
                            <xsl:variable name="Link" select="./@xlink:href" />
                            <xsl:variable name="LinkTitle" select="./@xlink:title" />
                            <xsl:variable name="identifierCode" select="gmd:CI_Citation/gmd:identifier/gmd:MD_Identifier/gmd:code/gco:CharacterString" />
                            <xsl:variable name="title" select="gmd:CI_Citation/gmd:title/gco:CharacterString" />
                            <xsl:variable name="date" select="gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date/gco:Date" />
                            <tr>
                                <td valign="top">
                                    <xsl:value-of select="$ID" />
                                </td>
                                <td valign="top">
                                    <a>
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="concat('http://www.ngdc.noaa.gov/docucomp/iso/',$UUID)" />
                                        </xsl:attribute>
                                        <xsl:value-of select="$UUID" />
                                    </a>
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$identifierCode" />
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$title" /> (<xsl:value-of select="$resourceType" />)
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$date" />
                                </td>
                            </tr>
                        </xsl:for-each>
                        <xsl:if test="count(//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract/gco:CharacterString)">
                            <xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract[generate-id() =
                generate-id(key('uniqueAbstracts',normalize-space(gco:CharacterString))[1])]">
                                <tr>
                                    <td colspan="5">
                                        <xsl:value-of select="normalize-space(gco:CharacterString)" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:if>
                    </table>
                    <xsl:call-template name="links" />
                </xsl:if>
                <xsl:if test="count(//gmd:CI_ResponsibleParty)">
                    <a name="responsibleParties" />
                    <h2>Responsible Individuals and Organizations</h2>
                    <table width="95%" border="1" cellpadding="2" cellspacing="2">
                        <tr>
                            <th valign="top">ID</th>
                            <th valign="top">Link/UUID</th>
                            <th valign="top">Individual</th>
                            <th valign="top">Organization</th>
                            <th valign="top">Position</th>
                            <th valign="top">Email</th>
                            <th valign="top">Role</th>
                            <th valign="top">Linkage</th>
                        </tr>
                        <xsl:for-each select="//gmd:CI_ResponsibleParty[generate-id() =
            generate-id(key('uniqueIndividualsOrganisationsRole',concat(normalize-space(gmd:individualName/gco:CharacterString),normalize-space(gmd:organisationName/gco:CharacterString),gmd:role/gmd:CI_RoleCode))[1])]">
                            <xsl:sort select="concat(gmd:individualName/gco:CharacterString,gmd:organisationName/gco:CharacterString,gmd:role/gmd:CI_RoleCode)" />
                            <xsl:variable name="ID" select="@id" />
                            <xsl:variable name="UUID" select="@uuid" />
                            <xsl:variable name="Link" select="@xlink:href" />
                            <xsl:variable name="reference_Count" select="count(//*[contains(@xlink:href,$ID)])" />
                            <xsl:variable name="LinkTitle" select="../@xlink:title" />
                            <xsl:variable name="individualName" select="gmd:individualName/gco:CharacterString" />
                            <xsl:variable name="organisationName" select="gmd:organisationName/gco:CharacterString" />
                            <xsl:variable name="positionName" select="gmd:positionName/gco:CharacterString" />
                            <xsl:variable name="email" select="gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString" />
                            <xsl:variable name="role" select="gmd:role/gmd:CI_RoleCode" />
                            <xsl:variable name="linkage" select="gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource/gmd:CI_OnlineResource/gmd:linkage/gmd:URL" />
                            <tr>
                                <td valign="top">
                                    <tt>
                                        <xsl:value-of select="$ID" />
                                    </tt>
                                </td>
                                <xsl:choose>
                                    <xsl:when test="$UUID">
                                        <td valign="top">
                                            <tt>
                                                <a>
                                                    <xsl:attribute name="href">
                                                        <xsl:value-of select="concat('http://www.ngdc.noaa.gov/docucomp/',$UUID)" />
                                                    </xsl:attribute>
                                                    <xsl:choose>
                                                        <xsl:when test="$LinkTitle">
                                                            <xsl:value-of select="$LinkTitle" />
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <xsl:value-of select="'No Title'" />
                                                        </xsl:otherwise>
                                                    </xsl:choose>
                                                </a>
                                            </tt>
                                        </td>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <td valign="top">
                                            <tt>
                                                <a>
                                                    <xsl:attribute name="href">
                                                        <xsl:value-of select="$Link" />
                                                    </xsl:attribute>
                                                    <xsl:value-of select="$LinkTitle" />
                                                </a>
                                            </tt>
                                        </td>
                                    </xsl:otherwise>
                                </xsl:choose>
                                <td valign="top">
                                    <tt>
                                        <xsl:value-of select="$individualName" />
                                    </tt>
                                </td>
                                <td valign="top">
                                    <tt>
                                        <xsl:value-of select="$organisationName" />
                                    </tt>
                                </td>
                                <td valign="top">
                                    <tt>
                                        <xsl:value-of select="$positionName" />
                                    </tt>
                                </td>
                                <td valign="top">
                                    <tt>
                                        <xsl:value-of select="$email" />
                                    </tt>
                                </td>
                                <td valign="top">
                                    <tt>
                                        <xsl:value-of select="$role" />
                                    </tt>
                                </td>
                                <td valign="top">
                                    <tt>
                                        <a>
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="$linkage" />
                                            </xsl:attribute>
                                            <xsl:value-of select="$linkage" />
                                        </a>
                                    </tt>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </table>
                    <xsl:call-template name="links" />
                </xsl:if>
                <!--
        <xsl:if test="count(//*[@xlink:href])">
          <a name="references"/>
          <h2>References</h2>
          <table width="95%" border="1" cellpadding="2" cellspacing="2">
            <tr>
              <th valign="top">Type</th>
              <th valign="top">Link/UUID</th>
            </tr>
            <xsl:for-each select="//*[@xlink:href and generate-id() =
      generate-id(key('uniqueReferencs',concat(@xlink:href,@xlink:title))[1])]">
              <xsl:sort select="name()"/>
              <tr>
                <td valign="top">
                  <tt>
                    <xsl:value-of select="name()"/>
                  </tt>
                </td>
                <td valign="top">
                  <tt>
                    <xsl:choose>
                      <xsl:when test="not(contains(@xlink:href,'http:'))">
                        <xsl:value-of select="concat('Internal Reference to ',@xlink:href)"/>
                      </xsl:when>
                      <xsl:otherwise>
                        <a>
                          <xsl:attribute name="href">
                            <xsl:value-of select="@xlink:href"/>
                          </xsl:attribute>
                          <xsl:choose>
                            <xsl:when test="@xlink:title">
                              <xsl:value-of select="@xlink:title"/>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:value-of select="@xlink:href"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </a>
                      </xsl:otherwise>
                    </xsl:choose>
                  </tt>
                </td>
              </tr>
            </xsl:for-each>
          </table>
        <xsl:call-template name="links"/>
        </xsl:if>
        -->
                <xsl:if test="count(//gmi:MI_Metadata)">
                    <h2>Metadata Records</h2>
                    <xsl:for-each select="//gmi:MI_Metadata">
                        <xsl:variable name="recordName">
                            <xsl:choose>
                                <xsl:when test="gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString">
                                    <xsl:value-of select="gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="'Untitled'" />
                                </xsl:otherwise>
                            </xsl:choose>
                            <xsl:text> (Type: </xsl:text>
                            <xsl:choose>
                                <xsl:when test="name(/*)='gmi:MI_Metadata'">
                                    <xsl:value-of select="'Root'" />
                                </xsl:when>
                                <xsl:when test="name(..)='gmd:seriesMetadata'">
                                    <xsl:value-of select="name(../..)" />
                                </xsl:when>
                                <xsl:when test="name(..)='gmd:has'">
                                    <xsl:value-of select="name(../../../..)" />
                                </xsl:when>
                            </xsl:choose>
                            <xsl:if test="gmd:fileIdentifier/gco:CharacterString">
                                <xsl:text> Identifier: </xsl:text>
                                <xsl:value-of select="gmd:fileIdentifier/gco:CharacterString" />
                            </xsl:if>
                            <xsl:text> Scope: </xsl:text>
                            <xsl:value-of select="gmd:hierarchyLevel/gmd:MD_ScopeCode" />
                            <xsl:text>)</xsl:text>
                        </xsl:variable>
                        <h3>
                            <xsl:value-of select="$recordName" />
                        </h3>
                        <xsl:if test="gmd:spatialRepresentationInfo | gmd:contentInfo">
                            <table border="1" cellpadding="4" cellspacing="2">
                                <tr>
                                    <xsl:if test="count(./gmd:spatialRepresentationInfo)">
                                        <div>
                                            <a name="spatialRepresentation" />
                                        </div>
                                        <td valign="top">
                                            <h2>Spatial Representation</h2>
                                            <b>
                                                <xsl:value-of select="./gmd:spatialRepresentationInfo//gmd:numberOfDimensions/gco:Integer" /> Dimensions
                                            </b>
                                            <table border="1" cellpadding="2" cellspacing="2">
                                                <tr>
                                                    <th valign="top">Name</th>
                                                    <th valign="top">Size</th>
                                                </tr>
                                                <xsl:for-each select="./gmd:spatialRepresentationInfo//gmd:axisDimensionProperties">
                                                    <tr>
                                                        <xsl:choose>
                                                            <xsl:when test="@xlink:href">
                                                                <!-- Reference to a dimension defined elsewhere in the file -->
                                                                <xsl:variable name="dimensionID" select="substring-after(@xlink:href,'#')" />
                                                                <td>
                                                                    <xsl:value-of select="$dimensionID" />(<xsl:value-of select="//gmd:MD_Dimension[@id=$dimensionID]/gmd:dimensionName/gmd:MD_DimensionNameTypeCode" />)
                                                                </td>
                                                                <td>
                                                                    <xsl:value-of select="//gmd:MD_Dimension[@id=$dimensionID]/gmd:dimensionSize/gco:Integer" />
                                                                </td>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <!-- Definition of a dimension -->
                                                                <xsl:choose>
                                                                    <xsl:when test="./gmd:MD_Dimension/@id">
                                                                        <!-- with an id -->
                                                                        <td>
                                                                            <xsl:value-of select="./gmd:MD_Dimension/gmd:dimensionName/gmd:MD_DimensionNameTypeCode" /> (<xsl:value-of select="substring-after(./gmd:MD_Dimension/@id,'#')" />)
                                                                        </td>
                                                                    </xsl:when>
                                                                    <xsl:otherwise>
                                                                        <!-- without an id -->
                                                                        <td>
                                                                            <xsl:value-of select="./gmd:MD_Dimension/gmd:dimensionName/gmd:MD_DimensionNameTypeCode" /> (<xsl:value-of select="'no ID'" />)
                                                                        </td>
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                                <td>
                                                                    <xsl:value-of select="./gmd:MD_Dimension/gmd:dimensionSize/gco:Integer" />
                                                                </td>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </tr>
                                                </xsl:for-each>
                                            </table>
                                            <xsl:if test="./gmd:spatialRepresentationInfo/gmd:MD_Georectified/gmd:transformationDimensionDescription/gco:CharacterString">
                                                <b>Transform Description: </b>
                                                <xsl:value-of select="./gmd:spatialRepresentationInfo/gmd:MD_Georectified/gmd:transformationDimensionDescription/gco:CharacterString" />
                                            </xsl:if>
                                        </td>
                                    </xsl:if>
                                    <xsl:if test="count(./gmd:contentInfo)">
                                        <div>
                                            <a name="contentInformation" />
                                        </div>
                                        <xsl:for-each select="./gmd:contentInfo[gmi:MI_CoverageDescription/gmd:dimension]">
                                            <td valign="top">
                                                <h2>Content Information</h2>
                                                <b>
                                                    <xsl:choose>
                                                        <xsl:when test="*/gmd:contentType/gmd:MD_CoverageContentTypeCode">
                                                            <xsl:value-of select="*/gmd:contentType/gmd:MD_CoverageContentTypeCode" />
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <xsl:value-of select="'Type Unknown'" />
                                                        </xsl:otherwise>
                                                    </xsl:choose>
                                                </b>
                                                <table border="1" cellpadding="2" cellspacing="2">
                                                    <tr>
                                                        <th valign="top">Name</th>
                                                        <th valign="top">Description</th>
                                                        <th valign="top">Type</th>
                                                    </tr>
                                                    <xsl:for-each select=".//gmd:dimension">
                                                        <xsl:sort select=".//gmd:sequenceIdentifier/gco:MemberName/gco:aName/gco:CharacterString" />
                                                        <xsl:variable name="bandID" select="substring-after(@xlink:href,'#')" />
                                                        <tr>
                                                            <td>
                                                                <xsl:choose>
                                                                    <xsl:when test="$bandID">
                                                                        <xsl:value-of select="//gmd:MD_Band[@id=$bandID]/gmd:sequenceIdentifier/gco:MemberName/gco:aName/gco:CharacterString" />
                                                                    </xsl:when>
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select=".//gmd:sequenceIdentifier/gco:MemberName/gco:aName/gco:CharacterString" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </td>
                                                            <td>
                                                                <xsl:choose>
                                                                    <xsl:when test="$bandID">
                                                                        <xsl:value-of select="//gmd:MD_Band[@id=$bandID]/gmd:descriptor/gco:CharacterString" />
                                                                    </xsl:when>
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select=".//gmd:descriptor/gco:CharacterString|.//gmd:description/gco:CharacterString" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </td>
                                                            <td>
                                                                <xsl:choose>
                                                                    <xsl:when test="$bandID">
                                                                        <xsl:value-of select="//gmd:MD_Band[@id=$bandID]/gmd:sequenceIdentifier/gco:MemberName/gco:attributeType/gco:TypeName/gco:aName/gco:CharacterString" />
                                                                    </xsl:when>
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select=".//gmd:sequenceIdentifier/gco:MemberName/gco:attributeType/gco:TypeName/gco:aName/gco:CharacterString" />
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </td>
                                                        </tr>
                                                    </xsl:for-each>
                                                </table>
                                            </td>
                                        </xsl:for-each>
                                    </xsl:if>
                                </tr>
                            </table>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:if>
                <xsl:if test="count(//gmi:MI_Metadata/gmd:spatialRepresentationInfo//gmd:axisDimensionProperties/gmd:MD_Dimension)">
                    <xsl:variable name="numberOfDimensions" select="count(//gmi:MI_Metadata/gmd:spatialRepresentationInfo//gmd:axisDimensionProperties/gmd:MD_Dimension)" />
                    <div>
                        <a name="dimensions" />
                    </div>
                    <h2>
                        <xsl:value-of select="$numberOfDimensions" /> Dimensions
                    </h2>
                    <table border="1" cellpadding="2" cellspacing="2">
                        <tr>
                            <th valign="top">Name</th>
                            <th valign="top">Size</th>
                            <th valign="top">Resolution</th>
                        </tr>
                        <xsl:for-each select="//gmi:MI_Metadata/gmd:spatialRepresentationInfo//gmd:axisDimensionProperties/gmd:MD_Dimension">
                            <tr>
                                <xsl:choose>
                                    <xsl:when test="@id">
                                        <td>
                                            <xsl:value-of select="@id" /> (<xsl:value-of select="./gmd:dimensionName/gmd:MD_DimensionNameTypeCode" />)
                                        </td>
                                    </xsl:when>
                                    <xsl:when test="gmd:dimensionName/gmd:MD_DimensionNameTypeCode">
                                        <td>
                                            <xsl:value-of select="./gmd:dimensionName/gmd:MD_DimensionNameTypeCode/@codeListValue" />
                                        </td>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <td>
                                            <xsl:value-of select="@xlink:href" />
                                        </td>
                                    </xsl:otherwise>
                                </xsl:choose>
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="./gmd:dimensionSize/gco:Integer">
                                            <xsl:value-of select="./gmd:dimensionSize/gco:Integer" />
                                        </xsl:when>
                                        <xsl:when test="./gmd:dimensionSize/@gco:nilReason">
                                            <xsl:value-of select="./gmd:dimensionSize/@gco:nilReason" />
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:value-of select="'Unknown'" />
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="gmd:resolution/*">
                                            <xsl:value-of select="gmd:resolution/*" />
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:value-of select="'Unknown'" />
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </table>
                    <xsl:call-template name="links" />
                </xsl:if>
                <!-- find bounding extents -->
                <xsl:if test="count(//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent)">
                    <div>
                        <a name="boundingExtent" />
                    </div>
                    <h2>Extents</h2>
                    <table width="95%" border="1" cellpadding="2" cellspacing="2">
                        <tr>
                            <th valign="top">ID</th>
                            <th valign="top">Link/UUID</th>
                            <th valign="top">West</th>
                            <th valign="top">East</th>
                            <th valign="top">South</th>
                            <th valign="top">North</th>
                            <th valign="top">Start</th>
                            <th valign="top">End</th>
                        </tr>
                        <xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent/gmd:EX_Extent">
                            <xsl:variable name="ID" select="./@id" />
                            <xsl:variable name="UUID" select="./@uuid" />
                            <xsl:variable name="Link" select="./@xlink:href" />
                            <xsl:variable name="LinkTitle" select="./@xlink:title" />
                            <xsl:variable name="Description" select="./gmd:description" />
                            <xsl:variable name="West" select="./gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:westBoundLongitude/gco:Decimal" />
                            <xsl:variable name="East" select="./gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:eastBoundLongitude/gco:Decimal" />
                            <xsl:variable name="South" select="./gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:southBoundLatitude/gco:Decimal" />
                            <xsl:variable name="North" select="./gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:northBoundLatitude/gco:Decimal" />
                            <xsl:variable name="Start" select="./gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:beginPosition" />
                            <xsl:variable name="End" select="./gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:endPosition" />
                            <tr>
                                <td valign="top">
                                    <xsl:value-of select="$Description" />
                                    <xsl:if test="$ID">(<xsl:value-of select="$ID" />)
                                    </xsl:if>
                                </td>
                                <xsl:choose>
                                    <xsl:when test="$UUID">
                                        <td valign="top">
                                            <a>
                                                <xsl:attribute name="href">
                                                    <xsl:value-of select="concat('http://www.ngdc.noaa.gov/docucomp/iso/',$UUID)" />
                                                </xsl:attribute>
                                                <xsl:value-of select="$LinkTitle" />
                                            </a>
                                        </td>
                                    </xsl:when>
                                    <xsl:when test="$Link">
                                        <td valign="top">
                                            <a>
                                                <xsl:attribute name="href">
                                                    <xsl:value-of select="$Link" />
                                                </xsl:attribute>
                                                <xsl:value-of select="$LinkTitle" />
                                            </a>
                                        </td>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <td />
                                    </xsl:otherwise>
                                </xsl:choose>
                                <td valign="top">
                                    <xsl:value-of select="$West" />
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$East" />
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$South" />
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$North" />
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$Start" />
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$End" />
                                </td>
                            </tr>
                        </xsl:for-each>
                    </table>
                    <xsl:call-template name="links" />
                </xsl:if>
                <xsl:if test="count(//gmd:sourceCitation) or count(//gmd19157:sourceCitation)">
                    <div>
                        <a name="Sources" />
                    </div>
                    <h2>Sources</h2>
                    <table width="95%" border="1" cellpadding="2" cellspacing="2">
                        <tr>
                            <th valign="top">ID</th>
                            <th valign="top">UUID</th>
                            <th valign="top">Identifier Code</th>
                            <th valign="top">Title</th>
                            <th valign="top">Date</th>
                        </tr>
                        <xsl:for-each select="//gmd:sourceCitation | //gmd19157:sourceCitation">
                            <xsl:variable name="ID" select="gmd:CI_Citation/@id" />
                            <xsl:variable name="UUID" select="gmd:CI_Citation/@uuid" />
                            <xsl:variable name="Link" select="./@xlink:href" />
                            <xsl:variable name="LinkTitle" select="./@xlink:title" />
                            <xsl:variable name="identifierCode" select="gmd:CI_Citation/gmd:identifier/gmd:MD_Identifier/gmd:code/gco:CharacterString" />
                            <xsl:variable name="title">
                                <xsl:choose>
                                    <xsl:when test="gmd:CI_Citation/gmd:title/gmx:FileName">
                                        <xsl:value-of select="gmd:CI_Citation/gmd:title/gmx:FileName" /> (<xsl:value-of select="gmd:CI_Citation/gmd:title/gmx:FileName/@src" />)
                                    </xsl:when>
                                    <xsl:when test="gmd:CI_Citation/gmd:title/gco:CharacterString">
                                        <xsl:value-of select="gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="'Unknown'" />
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:variable>
                            <xsl:variable name="date" select="gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date/gco:Date" />
                            <tr>
                                <td valign="top">
                                    <xsl:value-of select="$ID" />
                                </td>
                                <td valign="top">
                                    <a>
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="concat('http://www.ngdc.noaa.gov/docucomp/iso/',$UUID)" />
                                        </xsl:attribute>
                                        <xsl:value-of select="$UUID" />
                                    </a>
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$identifierCode" />
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$title" />
                                </td>
                                <td valign="top">
                                    <xsl:value-of select="$date" />
                                </td>
                            </tr>
                        </xsl:for-each>
                    </table>
                    <xsl:call-template name="links" />
                </xsl:if>
                <xsl:if test="count(//gmd:distributionInfo/gmd:MD_Distribution/gmd:distributor)">
                    <div>
                        <a name="Distributors" />
                    </div>
                    <h2>Distributors</h2>
                    <table width="95%" border="1" cellpadding="2" cellspacing="2">
                        <tr>
                            <th valign="top">ID</th>
                            <th valign="top">UUID</th>
                            <th valign="top">Name</th>
                            <th valign="top">Description</th>
                            <th valign="top">Protocol</th>
                            <th valign="top">Linkage</th>
                            <th valign="top">Function</th>
                            <th valign="top">Application Profile</th>
                        </tr>
                        <xsl:for-each select="//gmd:distributionInfo/gmd:MD_Distribution/gmd:distributor">
                            <xsl:variable name="ID" select="gmd:MD_Distributor/@id" />
                            <xsl:variable name="UUID" select="gmd:MD_Distributor/@uuid" />
                            <xsl:variable name="Link" select="./@xlink:href" />
                            <xsl:variable name="LinkTitle" select="./@xlink:title" />
                            <xsl:for-each select=".//gmd:MD_DigitalTransferOptions">
                                <tr>
                                    <xsl:variable name="name" select=".//gmd:CI_OnlineResource/gmd:name/gco:CharacterString" />
                                    <xsl:variable name="desc" select=".//gmd:CI_OnlineResource/gmd:description/gco:CharacterString" />
                                    <xsl:variable name="protocol" select=".//gmd:CI_OnlineResource/gmd:protocol/gco:CharacterString" />
                                    <xsl:variable name="linkage" select=".//gmd:CI_OnlineResource/gmd:linkage/gmd:URL" />
                                    <xsl:variable name="function" select=".//gmd:CI_OnlineResource/gmd:function/gmd:CI_OnLineFunctionCode" />
                                    <xsl:variable name="applicationProfile" select=".//gmd:CI_OnlineResource/gmd:applicationProfile/gco:CharacterString" />
                                    <td valign="top">
                                        <xsl:value-of select="$ID" />
                                    </td>
                                    <xsl:choose>
                                        <xsl:when test="$UUID">
                                            <td valign="top">
                                                <a>
                                                    <xsl:attribute name="href">
                                                        <xsl:value-of select="concat('http://www.ngdc.noaa.gov/docucomp/iso/',$UUID)" />
                                                    </xsl:attribute>
                                                    <xsl:value-of select="$UUID" />
                                                </a>
                                            </td>
                                        </xsl:when>
                                        <xsl:when test="$Link">
                                            <td valign="top">
                                                <a>
                                                    <xsl:attribute name="href">
                                                        <xsl:value-of select="$Link" />
                                                    </xsl:attribute>
                                                    <xsl:value-of select="$LinkTitle" />
                                                </a>
                                            </td>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <td />
                                        </xsl:otherwise>
                                    </xsl:choose>
                                    <td colspan="1" valign="top">
                                        <xsl:value-of select="$name" />
                                    </td>
                                    <td colspan="1" valign="top">
                                        <xsl:value-of select="$desc" />
                                    </td>
                                    <td colspan="1" valign="top">
                                        <xsl:value-of select="$protocol" />
                                    </td>
                                    <td colspan="1" valign="top">
                                        <a>
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="$linkage" />
                                            </xsl:attribute>
                                            <xsl:value-of select="$linkage" />
                                        </a>
                                    </td>
                                    <td colspan="1" valign="top">
                                        <xsl:value-of select="$function" />
                                    </td>
                                    <td colspan="1" valign="top">
                                        <xsl:value-of select="$applicationProfile" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </table>
                    <xsl:call-template name="links" />
                </xsl:if>
                <xsl:if test="count(//gvq:dataQualityInfo/gvq:GVQ_DataQuality/gmd19157:report)">
                    <div>
                        <a name="Quality Reports" />
                    </div>
                    <h2>Quality Reports</h2>
                    <xsl:for-each select="//gvq:dataQualityInfo/gvq:GVQ_DataQuality">
                        <p>
                            <h3>Scope:
                                <xsl:value-of select="./gmd19157:scope/gmd19157:DQ_Scope/gmd19157:level/gmd:MD_ScopeCode/@codeListValue" />
                                <xsl:variable name="scopeDesc" select="./gmd19157:scope/gmd19157:DQ_Scope/gmd19157:level/gmd:MD_ScopeDescription/gmd:attributes" />
                                <xsl:if test="$scopeDesc">
                                    - <xsl:value-of select="$scopeDesc" />
                                </xsl:if>
                            </h3>
                        </p>
                        <xsl:for-each select="./gmd19157:report/*">
                            <xsl:variable name="thisName" select="name(.)" />
                            <!-- TODO - test whether this is a metaquality report or a quality report -->
                            <xsl:choose>
                                <xsl:when test="$thisName = 'gmd19157:DQ_Confidence' or $thisName = 'gmd19157:DQ_Representativity' or $thisName = 'gmd19157:DQ_Homogeneity' or $thisName = 'gvq:GVQ_Traceability' or $thisName = 'gmd19157:DQ_MetaQuality'">
                                    <!-- for now, do nothing -->
                                </xsl:when>
                                <xsl:otherwise>
                                    <!-- Each will have up to one evaluation, up to one measure, and potentially several results -->
                                    <table width="95%" border="1" cellpadding="2" cellspacing="2">
                                        <tr>
                                            <th colspan="4">
                                                <h3>  Report Type:
                                                    <!-- TODO - put these in a lookup list somewhere -->
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_ThematicClassificationCorrectness'">
                                                        Thematic Classification Correctness
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_Completeness'">
                                                        Completeness
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_CompletenessCommission'">
                                                        Completeness - Commission
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_CompletenessOmmission'">
                                                        Completeness - Ommission
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_LogicalConsistency'">
                                                        Logical Consistency
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_ConceptualConsistency'">
                                                        Conceptual Consistency
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_DomainConsistency'">
                                                        Domain Consistency
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_FormatConsistency'">
                                                        Format Consistency
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_TopologicalConsistency'">
                                                        Topological Consistency
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_PositionalAccuracy'">
                                                        Positional Accuracy
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_AbsoluteExternalPositionalAccuracy'">
                                                        Absolute External Positional Accuracy
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_GriddedDataPositionalAccuracy'">
                                                        Gridded Data Positional Accuracy
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_TemporalAccuracy'">
                                                        Temporal Accuracy
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_AccuracyOfATimeMeasurement'">
                                                        Accuracy of a Time Measurement
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_TemporalConsistency'">
                                                        Temporal Consistency
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_TemporalValidity'">
                                                        Temporal Validity
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_TemporalAccuracy'">
                                                        Temporal Accuracy
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_NonQuantitativeAttributeAccuracy'">
                                                        Non-quantitative Attribute Accuracy
                                                    </xsl:if>
                                                    <xsl:if test="$thisName = 'gmd19157:DQ_QuantitativeAttributeAccuracy'">
                                                        Quantitative Attribute Accuracy
                                                    </xsl:if>
                                                </h3>
                                            </th>
                                        </tr>
                                        <xsl:variable name="thisReportID" select="concat('#', ./@id)" />
                                        <!-- Later we'll search for xlinks to this report which will give us related metaquality records -->
                                        <xsl:for-each select="gmd19157:evaluation/*">
                                            <tr>
                                                <td valign="top" colspan="1">
                                                    <b>Evaluation Method</b>
                                                </td>
                                                <td valign="top" colspan="3">
                                                    <xsl:variable name="Method" select="gmd19157:evaluationMethodType/gmd19157:DQ_EvaluationMethodTypeCode/@codeListValue" />
                                                    <xsl:variable name="thisName2" select="name(.)" />
                                                    <xsl:if test = "$thisName2 = 'gvq:GVQ_FullInspection' or $thisName2 = 'gmd:MD_FullInspection'">
                                                        <xsl:value-of select="'Full Inspection'" /> :
                                                    </xsl:if>
                                                    <xsl:if test="$thisName2 = 'gvq:GVQ_IndirectEvaluation' or $thisName2 = 'gmd:MD_IndirectEvaluation'">
                                                        <xsl:value-of select="'Indirect Evaluation'" />
                                                    </xsl:if>
                                                    <xsl:if test="$thisName2 = 'gvq:GVQ_SampleBasedInspection' or $thisName2 = 'gmd:MD_SampleBasedInspection'">
                                                        <xsl:value-of select="'Sample-based Inspection'" />
                                                    </xsl:if>
                                                    :
                                                    <xsl:value-of select="$Method" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" colspan="1">
                                                    <b>Evaluation Description</b>
                                                </td>
                                                <td valign="top" colspan="3">
                                                    <xsl:variable name="Description" select="gmd19157:evaluationMethodDescription/gco:CharacterString" />
                                                    <xsl:value-of select="$Description" />
                                                </td>
                                            </tr>
                                            <!-- test for any publications -->
                                            <xsl:for-each select="gmd19157:referenceDoc/gvq:GVQ_Publication">
                                                <tr>
                                                    <td valign="top" colspan="1">
                                                        <b>Reference document</b>
                                                    </td>
                                                    <td valign="top" colspan="3">
                                                        <xsl:apply-templates select="." />
                                                    </td>
                                                </tr>
                                            </xsl:for-each>
                                            <!-- Selecting publications -->
                                            <!-- Reference datasets -->
                                            <xsl:for-each select="gvq:referenceDataset/updated19115:MD_AssociatedResource">
                                                <tr>
                                                    <td colspan="1">
                                                        <b>Reference Dataset </b>
                                                    </td>
                                                    <td colspan="3">
                                                        <b>Name: </b>
                                                        <xsl:value-of select="updated19115:name/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                                        : <b>Identifier: </b>
                                                        <xsl:value-of select="updated19115:name/gmd:CI_Citation/gmd:identifier/updated19115:MD_Identifier/updated19115:codeSpace/gco:CharacterString" />:
                                                        <xsl:value-of select="updated19115:name/gmd:CI_Citation/gmd:identifier/updated19115:MD_Identifier/gmd:code/gco:CharacterString" />
                                                        <br />
                                                        <b>Application: </b>
                                                        <xsl:value-of select="updated19115:associationType/gmd:DS_AssociationTypeCode/@codeListValue" />:
                                                        <xsl:value-of select="updated19115:initiativeType/gmd:DS_InitiativeTypeCode/@codeListValue" />
                                                        <br />
                                                    </td>
                                                </tr>
                                            </xsl:for-each>
                                            <!-- Selecting reference datasets -->
                                        </xsl:for-each>
                                        <!-- Selecting evaluations (0 or 1)-->
                                        <xsl:for-each select="gmd19157:measure">
                                            <xsl:variable name="measure" select="gmd:nameOfMeasure/gco:CharacterString" />
                                            <xsl:variable name="measuredesc" select="/gmd:measureDescription/gco:CharacterString" />
                                            <xsl:if test="$measure or $measuredesc">
                                                <tr>
                                                    <td valign="top" colspan="1" class=".th">
                                                        <b>Measure</b>
                                                    </td>
                                                    <td colspan="3">
                                                        <xsl:value-of select="../../gmd19157:measure/gmd:nameOfMeasure/gco:CharacterString" /> :
                                                        <xsl:value-of select="../../gmd19157:measure/gmd:measureDescription/gco:CharacterString" />
                                                    </td>
                                                </tr>
                                            </xsl:if>
                                        </xsl:for-each>
                                        <!-- Selecting measures (0 or 1) -->
                                        <xsl:for-each select="gmd19157:result/*">
                                            <tr>
                                                <th colspan="4">Result number
                                                    <xsl:value-of select="position()" />
                                                </th>
                                            </tr>
                                            <tr>
                                                <td valign="top" colspan="1">
                                                    <b>Result Scope</b>
                                                </td>
                                                <td colspan="3">
                                                    <xsl:choose>
                                                        <xsl:when test="count(gmd19157:resultScope/gmd19157:DQ_Scope)">
                                                            <xsl:apply-templates select="gmd19157:resultScope/gmd19157:DQ_Scope" />
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <xsl:variable name="scopeID" select="gmd19157:resultScope/@xlink:href" />
                                                            <xsl:if test="$scopeID != ''">
                                                                <xsl:apply-templates select="key('referencedScope',substring($scopeID,2))" />
                                                            </xsl:if>
                                                        </xsl:otherwise>
                                                    </xsl:choose>
                                                </td>
                                            </tr>
                                            <xsl:variable name="thisName5" select="name(.)" />
                                            <xsl:if test="$thisName5 = 'gmd19157:DQ_QuantitativeResult'">
                                                <!-- the result will have one or more values, a valueUnit and an optional value type -->
                                                <xsl:variable name="units" select="gmd:valueUnit" />
                                                <xsl:variable name="unitsURL" select="gmd:valueUnit/@xlink:href" />
                                                <xsl:for-each select="gmd19157:value/gco:Record">
                                                    <tr>
                                                        <td valign="top" colspan="1">
                                                            <b>Result</b>
                                                        </td>
                                                        <td colspan="3">
                                                            <xsl:choose>
                                                                <xsl:when test="count(child::*)=0">
                                                                    <xsl:value-of select="." />
                                                                </xsl:when>
                                                                <xsl:otherwise>
                                                                    <xsl:variable name="thisName7" select="name(*[1])" />
                                                                    <xsl:choose>
                                                                        <!--<xsl:when test="$thisName7 = 'un:ConfusionMatrix'">-->
                                                                        <xsl:when test="$thisName7 = 'nothing'">
                                                                            <!-- tabular matrix display requires 'tokenize' from XSLT 2.0 -->
                                                                            <xsl:apply-templates select ="." />
                                                                            <!-- when there are templates for all possible result types, don't need to test name -->
                                                                        </xsl:when>
                                                                        <xsl:otherwise>
                                                                            <xsl:for-each select="./*">
                                                                                <xsl:for-each select="child::*">
                                                                                    <p>
                                                                                        <b>
                                                                                            <xsl:value-of select="name(.)" />
                                                                                        </b>:
                                                                                        <xsl:value-of select="." />
                                                                                    </p>
                                                                                </xsl:for-each>
                                                                            </xsl:for-each>
                                                                        </xsl:otherwise>
                                                                    </xsl:choose>
                                                                    <!-- Selecting sub-elements of result - messy but temporary -->
                                                                </xsl:otherwise>
                                                            </xsl:choose>
                                                            <xsl:if test="$units or $unitsURL">
                                                                (
                                                                <xsl:if test="$units">
                                                                    <xsl:value-of select="$units" />
                                                                </xsl:if>
                                                                <xsl:if test="$units and $unitsURL"> : </xsl:if>
                                                                <xsl:if test="unitsURL">
                                                                    <xsl:value-of select="$unitsURL" />
                                                                </xsl:if>
                                                                )
                                                            </xsl:if>
                                                        </td>
                                                    </tr>
                                                </xsl:for-each>
                                                <!-- Selecting results -->
                                                <xsl:for-each select="gmd19157:valueType/gco:RecordType">
                                                    <!-- should be just one -->
                                                    <tr>
                                                        <td valign="top" colspan="1">
                                                            <b>Result Type</b>
                                                        </td>
                                                        <td colspan="3">
                                                            <xsl:value-of select="." /> (
                                                            <a>
                                                                <xsl:attribute name="href">
                                                                    <xsl:value-of select="./@xlink:href" />
                                                                </xsl:attribute>
                                                                <xsl:value-of select="./@xlink:href" />
                                                            </a>)
                                                        </td>
                                                    </tr>
                                                </xsl:for-each>
                                                <!-- Selecting result types -->
                                            </xsl:if>
                                            <!-- what to do if it's a quantitative result -->
                                            <xsl:if test="$thisName5 = 'gmd19157:DQ_ConformanceResult'">
                                            </xsl:if>
                                            <xsl:if test="$thisName5 = 'gmd19157:DQ_DescriptiveResult'">
                                            </xsl:if>
                                        </xsl:for-each>
                                        <!-- Selecting results -->
                                        <!-- see if there is any metaquality relating to this record -->
                                        <xsl:for-each select="key('referencedMetaQuality',$thisReportID)">
                                            <xsl:for-each select="../..">
                                                <!-- only one grandparent!! -->
                                                <xsl:for-each select="./gmd19157:DQ_Confidence">
                                                    <!--TODO -->
                                                </xsl:for-each>
                                                <xsl:for-each select="./gmd19157:DQ_Representativity">
                                                    <!--TODO -->
                                                </xsl:for-each>
                                                <xsl:for-each select="./gmd19157:DQ_Homogeneity">
                                                    <!--TODO -->
                                                </xsl:for-each>
                                                <xsl:for-each select="./gvq:GVQ_Traceability">
                                                    <tr>
                                                        <th colspan="4">
                                                            <b>Traceability of this quality report</b>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="4">
                                                            <xsl:call-template name="styleTraceability" />
                                                        </td>
                                                    </tr>
                                                </xsl:for-each>
                                            </xsl:for-each>
                                            <!-- Selecting types of MQ_element -->
                                        </xsl:for-each>
                                        <!-- Selecting metaquality elements that reference this report -->
                                    </table>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:for-each>
                        <!-- Selecting reports -->
                    </xsl:for-each>
                    <!-- Selecting dataQualityInfo elements - usually just one report for each... -->
                    <xsl:call-template name="links" />
                </xsl:if>
                <!-- Look for process steps which actually relate to the data -->
                <xsl:if test="count(//gmd19157:lineage//gmd19157:processStep//gmd19157:description)">
                    <xsl:for-each select="//gmd19157:lineage//gmd19157:processStep/gmd:LI_ProcessStep | //gmd19157:lineage//gmd19157:processStep/gmd:LE_ProcessStep">
                        <xsl:call-template name="TabularProcessSteps" />
                    </xsl:for-each>
                </xsl:if>
                <xsl:if test="count(//gmd:identificationInfo/srv:SV_ServiceIdentification)">
                    <div>
                        <a name="Services" />
                    </div>
                    <h2>Services</h2>
                    <table width="95%" border="1" cellpadding="2" cellspacing="2">
                        <tr>
                            <th valign="top">ID</th>
                            <th valign="top">UUID</th>
                            <th valign="top">Title</th>
                            <th valign="top">Description</th>
                            <th valign="top">Connection Point</th>
                        </tr>
                        <xsl:for-each select="//gmd:identificationInfo/srv:SV_ServiceIdentification/srv:containsOperations">
                            <xsl:variable name="ID" select="gmd:MD_Distributor/@id" />
                            <xsl:variable name="UUID" select="gmd:MD_Distributor/@uuid" />
                            <xsl:variable name="Link" select="./@xlink:href" />
                            <xsl:variable name="LinkTitle" select="./@xlink:title" />
                            <xsl:variable name="title" select="../gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                            <xsl:variable name="name" select="../srv:serviceType/gco:LocalName" />
                            <xsl:variable name="desc" select="./srv:SV_OperationMetadata/srv:operationName/gco:CharacterString" />
                            <xsl:variable name="linkage" select="./srv:SV_OperationMetadata/srv:connectPoint/gmd:CI_OnlineResource/gmd:linkage/gmd:URL" />
                            <tr>
                                <td valign="top">
                                    <xsl:value-of select="$ID" />
                                </td>
                                <xsl:choose>
                                    <xsl:when test="$UUID">
                                        <td valign="top">
                                            <a>
                                                <xsl:attribute name="href">
                                                    <xsl:value-of select="concat('http://www.ngdc.noaa.gov/docucomp/iso/',$UUID)" />
                                                </xsl:attribute>
                                                <xsl:value-of select="$UUID" />
                                            </a>
                                        </td>
                                    </xsl:when>
                                    <xsl:when test="$Link">
                                        <td valign="top">
                                            <a>
                                                <xsl:attribute name="href">
                                                    <xsl:value-of select="$Link" />
                                                </xsl:attribute>
                                                <xsl:value-of select="$LinkTitle" />
                                            </a>
                                        </td>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <td />
                                    </xsl:otherwise>
                                </xsl:choose>
                                <td colspan="1" valign="top">
                                    <xsl:value-of select="$title" />
                                </td>
                                <td colspan="1" valign="top">
                                    <div>
                                        <xsl:value-of select="$name" />:<xsl:value-of select="$desc" />
                                    </div>
                                </td>
                                <td colspan="1" valign="top">
                                    <a>
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="$linkage" />
                                        </xsl:attribute>
                                        <xsl:value-of select="$linkage" />
                                    </a>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </table>
                    <xsl:call-template name="links" />
                </xsl:if>
                <!-- Discovered Issues -->
                <xsl:if test="count(//gvq:discoveredIssue)">
                    <div>
                        <a name="Discovered Issues" />
                    </div>
                    <h2>Discovered Issues</h2>
                    <xsl:for-each select="//gvq:discoveredIssue">
                        <table width="95%" border="1" cellpadding="2" cellspacing="2">
                            <xsl:variable name="diProblem" select="./gvq:GVQ_DiscoveredIssue/gvq:knownProblem/gco:CharacterString" />
                            <tr>
                                <th valign="top" colspan="4">
                                    <h3>Problem:
                                        <xsl:value-of select="$diProblem" />
                                    </h3>
                                </th>
                            </tr>
                            <xsl:if test="count(./gvq:GVQ_DiscoveredIssue/gvq:workAround)">
                                <xsl:for-each select="./gvq:GVQ_DiscoveredIssue/gvq:workAround">
                                    <tr>
                                        <td colspan="1">
                                            <b>Workaround</b>
                                        </td>
                                        <td colspan="3">
                                            <xsl:value-of select="gco:CharacterString" />
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </xsl:if>
                            <xsl:if test="count(./gvq:GVQ_DiscoveredIssue/gvq:alternativeDataset)">
                                <xsl:for-each select="./gvq:GVQ_DiscoveredIssue/gvq:alternativeDataset/gmd:MD_DataIdentification">
                                    <xsl:variable name="adTitle">
                                        <xsl:value-of select="gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                    </xsl:variable>
                                    <!-- <tr><td><xsl:value-of select="name(.)"/> : <xsl:value-of select="name(gmd:citation)"/> </td></tr> -->
                                    <xsl:variable name="adCodeSpace">
                                        <xsl:value-of select="gmd:citation/gmd:CI_Citation/gmd:identifier/updated19115:MD_Identifier/updated19115:codeSpace/gco:CharacterString" />
                                    </xsl:variable>
                                    <xsl:variable name="adCode">
                                        <xsl:value-of select="gmd:citation/gmd:CI_Citation/gmd:identifier/updated19115:MD_Identifier/gmd:code/gco:CharacterString" />
                                    </xsl:variable>
                                    <xsl:variable name="adAbstract">
                                        <xsl:value-of select="gmd:abstract" />
                                    </xsl:variable>
                                    <tr>
                                        <td colspan="1">
                                            <b>Alternative Dataset</b>
                                        </td>
                                        <td colspan="3">
                                            <p>
                                                <b>Title: </b>
                                                <xsl:value-of select="$adTitle" />
                                            </p>
                                            <p>
                                                <b>Identifier: </b>
                                                <xsl:value-of select="$adCodeSpace" />:
                                                <xsl:value-of select="$adCode" />
                                            </p>
                                        </td>
                                    </tr>
                                    <xsl:if test="$adAbstract">
                                        <tr>
                                            <td colspan="1">
                                                <b>Alternative Dataset Abstract</b>
                                            </td>
                                            <td colspan="3">
                                                <xsl:value-of select="normalize-space($adAbstract)" />
                                            </td>
                                        </tr>
                                    </xsl:if>
                                </xsl:for-each>
                            </xsl:if>
                            <xsl:if test="count(./gvq:GVQ_DiscoveredIssue/gvq:referenceDoc)">
                                <xsl:for-each select="./gvq:GVQ_DiscoveredIssue/gvq:referenceDoc/gvq:GVQ_Publication">
                                    <tr>
                                        <td colspan="1">
                                            <b>Reference Publication</b>
                                        </td>
                                        <td colspan="3">
                                            <xsl:apply-templates select="." />
                                        </td>
                                    </tr>
                                </xsl:for-each>
                                <!-- Selecting publications -->
                            </xsl:if>
                            <xsl:if test="count(./gvq:GVQ_DiscoveredIssue/gvq:fixedResource)">
                                <xsl:for-each select="./gvq:GVQ_DiscoveredIssue/gvq:fixedResource">
                                    <tr>
                                        <td>
                                            <p>
                                                <b>Fixed Resource</b>
                                            </p>
                                            <p>
                                                <b>Title: </b>
                                                <xsl:value-of select="gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                            </p>
                                            <p>
                                                <b>Identifier:</b>
                                                <xsl:value-of select="gmd:MD_DataIdentification/gmd:identifier/updated19115:MD_Identifier/updated19115:codeSpace/gco:CharacterString" />:
                                                <xsl:value-of select="gmd:MD_DataIdentification/gmd:identifier/updated19115:MD_Identifier/gmd:code/gco:CharacterString" />
                                            </p>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                                <!-- Selecting fixed Resources -->
                            </xsl:if>
                            <xsl:if test="count(./gvq:GVQ_DiscoveredIssue/gvq:expectedFix)">
                                <xsl:for-each select="./gvq:GVQ_DiscoveredIssue/gvq:ExpectedFix">
                                    <tr>
                                        <td>
                                            <p>
                                                <b>Expected Fix Date:
                                                    <xsl:value-of select="gmd:CI_Date/gmd:date/gco:Date" />
                                                </b>
                                            </p>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                                <!-- Selecting expected Fixes -->
                            </xsl:if>
                        </table>
                    </xsl:for-each>
                    <!-- Selecting discovered issues -->
                    <xsl:call-template name="links" />
                </xsl:if>
                <!-- Reference Documents for this dataset -->
                <xsl:if test="count(//gvq:GVQ_DataIdentification/gvq:referenceDoc) or count(//gvq:GVQ_Usage/gvq:referenceDoc) or count(//gvq:GVQ_Lineage/gvq:referenceDoc)">
                    <div>
                        <a name="RefDocs" />
                    </div>
                    <h2>Reference documents</h2>
                    <xsl:for-each select="//gvq:GVQ_DataIdentification/gvq:referenceDoc | //gvq:GVQ_Usage/gvq:referenceDoc | //gvq:GVQ_Lineage/gvq:referenceDoc">
                        <table width="95%" border="1" cellpadding="2" cellspacing="2">
                            <xsl:variable name="thisName3" select="name(..)" />
                            <xsl:if test="$thisName3 = 'gvq:GVQ_DataIdentification'">
                                <tr>
                                    <th colspan="4">Documents describing this dataset</th>
                                </tr>
                            </xsl:if>
                            <xsl:if test="$thisName3 = 'gvq:GVQ_Usage'">
                                <tr>
                                    <th colspan="4">Documents which give examples of uses of this dataset</th>
                                </tr>
                            </xsl:if>
                            <xsl:if test="$thisName3 = 'gvq:GVQ_Lineage'">
                                <tr>
                                    <th colspan="4">Documents recording the lineage of this dataset</th>
                                </tr>
                            </xsl:if>
                            <tr>
                                <td colspan="4">
                                    <xsl:apply-templates select="gvq:GVQ_Publication" />
                                </td>
                            </tr>
                        </table>
                    </xsl:for-each>
                    <!-- Selecting discovered issues -->
                    <xsl:call-template name="links" />
                </xsl:if>
                <xsl:if test="count(//gmd:distributionInfo//gmd:onLine)">
                    <div>
                        <a name="onlineResources" />
                    </div>
                    <h2>Distribution Online Resources</h2>
                    <table width="95%" border="1" cellpadding="2" cellspacing="2">
                        <tr>
                            <th valign="top">ID</th>
                            <th valign="top">UUID</th>
                            <th valign="top">Name</th>
                            <th valign="top">Description</th>
                            <th valign="top">Protocol</th>
                            <th valign="top">Linkage</th>
                            <th valign="top">Function</th>
                            <th valign="top">Application Profile</th>
                        </tr>
                        <xsl:for-each select="//gmd:distributionInfo//gmd:onLine">
                            <xsl:variable name="distributionOrganization" select="name(../..)" />
                            <xsl:variable name="ID" select="gmd:CI_OnlineResource/@id" />
                            <xsl:variable name="UUID" select="gmd:CI_OnlineResource/@uuid" />
                            <xsl:variable name="name" select="gmd:CI_OnlineResource/gmd:name/gco:CharacterString" />
                            <xsl:variable name="desc" select="gmd:CI_OnlineResource/gmd:description/gco:CharacterString" />
                            <xsl:variable name="protocol" select="gmd:CI_OnlineResource/gmd:protocol/gco:CharacterString" />
                            <xsl:variable name="linkage" select="gmd:CI_OnlineResource/gmd:linkage/gmd:URL" />
                            <xsl:variable name="function" select="gmd:CI_OnlineResource/gmd:function/gmd:CI_OnLineFunctionCode" />
                            <xsl:variable name="applicationProfile" select="gmd:CI_OnlineResource/gmd:applicationProfile/gco:CharacterString" />
                            <tr>
                                <td valign="top">
                                    <xsl:value-of select="$ID" />
                                </td>
                                <td valign="top">
                                    <a>
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="concat('http://www.ngdc.noaa.gov/docucomp/iso/',$UUID)" />
                                        </xsl:attribute>
                                        <xsl:value-of select="$UUID" />
                                    </a>
                                </td>
                                <td colspan="1" valign="top">
                                    <xsl:value-of select="$name" />
                                </td>
                                <td colspan="1" valign="top">
                                    <xsl:value-of select="$desc" />
                                </td>
                                <td colspan="1" valign="top">
                                    <xsl:value-of select="$protocol" />
                                </td>
                                <td colspan="1" valign="top">
                                    <a>
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="$linkage" />
                                        </xsl:attribute>
                                        <xsl:value-of select="$linkage" />
                                    </a>
                                </td>
                                <td colspan="1" valign="top">
                                    <xsl:value-of select="$function" />
                                </td>
                                <td colspan="1" valign="top">
                                    <xsl:value-of select="$applicationProfile" />
                                </td>
                            </tr>
                        </xsl:for-each>
                    </table>
                    <xsl:call-template name="links" />
                </xsl:if>
                <hr />
                <i>
                    <xsl:value-of select="$transformName" />:Version
                    <xsl:value-of select="$transformVersion" />
                </i>
            </body>
        </html>
    </xsl:template>
    <!-- Separate template for content info -->
    <xsl:template name="displayContentInformation">
        <h3>
            <xsl:value-of select=".//gmd:contentType/gmd:MD_CoverageContentTypeCode" />
        </h3>
        <table border="1" cellpadding="2" cellspacing="2">
            <tr>
                <th valign="top">Name</th>
                <th valign="top">Description</th>
                <th valign="top">Type</th>
            </tr>
            <xsl:for-each select=".//gmd:dimension">
                <xsl:sort select=".//gmd:sequenceIdentifier/gco:MemberName/gco:aName/gco:CharacterString" />
                <tr>
                    <td>
                        <xsl:value-of select=".//gmd:sequenceIdentifier/gco:MemberName/gco:aName/gco:CharacterString" />
                    </td>
                    <td>
                        <xsl:value-of select=".//gmd:descriptor/gco:CharacterString|./gmi:MI_Band/gmd:description/gco:CharacterString" />
                    </td>
                    <td>
                        <xsl:value-of select=".//gmd:sequenceIdentifier/gco:MemberName/gco:attributeType/gco:TypeName/gco:aName/gco:CharacterString" />
                    </td>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>
    <!-- Template for cutting down a scope object and putting it into a table cell -->
    <xsl:template match="gmd19157:DQ_Scope">
        <xsl:variable name="scopeCode" select="gmd19157:level/gmd:MD_ScopeCode/@codeListValue" />
        <xsl:variable name="scopeDesc" select="gmd19157:level/gmd:MD_ScopeDescription/gmd:attributes" />
        <b>Level : </b>
        <xsl:value-of select="$scopeCode" />  -
        <xsl:value-of select="$scopeDesc" />
        <xsl:apply-templates select="gmd19157:extent/gmd:EX_Extent" />
    </xsl:template>
    <!-- Template for compressing extent into a few paras suitable for entry into a table field -->
    <xsl:template match="gmd:EX_Extent">
        <xsl:variable name="Link" select="./@xlink:href" />
        <xsl:variable name="LinkTitle" select="./@xlink:title" />
        <xsl:variable name="Description" select="./gmd:description" />
        <xsl:variable name="West" select="./gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:westBoundLongitude/gco:Decimal" />
        <xsl:variable name="East" select="./gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:eastBoundLongitude/gco:Decimal" />
        <xsl:variable name="South" select="./gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:southBoundLatitude/gco:Decimal" />
        <xsl:variable name="North" select="./gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:northBoundLatitude/gco:Decimal" />
        <xsl:variable name="Start" select="./gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:beginPosition" />
        <xsl:variable name="End" select="./gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:endPosition" />
        <xsl:if test="$Description">
            <br />
            <b>Description: </b>
            <xsl:value-of select="$Description" />
        </xsl:if>
        <br />
        <b>Spatial extent --- West: </b>
        <xsl:value-of select="$West" /> -
        <b>East: </b>
        <xsl:value-of select="$East" /> -
        <b>South: </b>
        <xsl:value-of select="$South" /> -
        <b>North: </b>
        <xsl:value-of select="$North" />
        <xsl:if test="$Start">
            <br />
            <h5> --- Temporal extent</h5>
            <b>Start: </b>
            <xsl:value-of select="$Start" /> -
            <b>End: </b>
            <xsl:value-of select="$End" />
        </xsl:if>
        <xsl:if test="$Link">
            <br />
            <a>
                <xsl:attribute name="href">
                    <xsl:value-of select="$Link" />
                </xsl:attribute>
                <xsl:value-of select="$LinkTitle" />
            </a>
        </xsl:if>
    </xsl:template>
    <!-- Template for rendering an UncertML confusion matrix - requires XSLT 2.0 -->
    <xsl:template match="un:ConfusionMatrix">
        <xsl:variable name="tokenizedCounts" select="tokenize(normalize-space(un:counts),' ')" />
        <xsl:variable name="tokenizedTargets" select="tokenize(normalize-space(un:targetCategories),' ')" />
        <xsl:variable name="tokenizedSources" select="tokenize(normalize-space(un:sourceCategories),' ')" />
        <div style="font-size:9px">
            <table bgcolor="white">
                <tr>
                    <th></th>
                    <xsl:for-each select="$tokenizedSources">
                        <th>
                            <xsl:value-of select="." />
                        </th>
                    </xsl:for-each>
                </tr>
                <xsl:variable name="currentValueIndex" select="0" />
                <!-- find out how many rows are required -->
                <xsl:variable name="rowNum" select="count($tokenizedTargets)" />
                <xsl:variable name="colNum" select="count($tokenizedSources)" />
                <xsl:for-each select="$tokenizedCounts">
                    <xsl:variable name="currentTokenIndex" select="position()" />
                    <xsl:choose>
                        <xsl:when test="$currentTokenIndex = 1">
                            <xsl:element name="tr" />
                            <td class="leftcolumn">
                                <b>
                                    <xsl:value-of select="$tokenizedTargets[1]" />
                                </b>
                            </td>
                            <td class="matrix">
                                <xsl:value-of select="." />
                            </td>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:variable name="currentTokenIndex_zeroed" select="position() -1" />
                            <xsl:choose>
                                <xsl:when test="$currentTokenIndex_zeroed mod $colNum = 0">
                                    <xsl:variable name="currentRowIndex" select="($currentTokenIndex_zeroed div $colNum) + 1" />
                                    <xsl:element name="tr" />
                                    <td class="leftcolumn">
                                        <b>
                                            <xsl:value-of select="$tokenizedTargets[$currentRowIndex]" />
                                        </b>
                                    </td>
                                    <td class="matrix">
                                        <xsl:value-of select="." />
                                    </td>
                                </xsl:when>
                                <xsl:otherwise>
                                    <td class="matrix">
                                        <xsl:value-of select="." />
                                    </td>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:for-each>
            </table>
        </div>
    </xsl:template>
    <!-- Template for collating publication info into a few paras -->
    <xsl:template match="gvq:GVQ_Publication">
        <xsl:variable name="diReferenceTitle" select="gmd:title/gco:CharacterString" />
        <xsl:variable name="diReferenceDOI" select="gvq:doi/gco:CharacterString" />
        <b>Title: </b>
        <xsl:value-of select="$diReferenceTitle" /> ,<b>DOI: </b>
        <xsl:value-of select="$diReferenceDOI" />
        <br />
        <xsl:for-each select="gvq:onlineResource">
            <xsl:variable name="diUUID" select="gmd:CI_OnlineResource/@uuid" />
            <xsl:variable name="diname" select="gmd:CI_OnlineResource/gmd:name/gco:CharacterString" />
            <xsl:variable name="didesc" select="gmd:CI_OnlineResource/gmd:description/gco:CharacterString" />
            <xsl:variable name="diprotocol" select="gmd:CI_OnlineResource/gmd:protocol/gco:CharacterString" />
            <xsl:variable name="dilinkage" select="gmd:CI_OnlineResource/gmd:linkage/gmd:URL" />
            <xsl:if test="$diUUID">
                <a>
                    <xsl:attribute name="href">
                        <xsl:value-of select="concat('http://www.ngdc.noaa.gov/docucomp/iso/',$diUUID)" />
                    </xsl:attribute>
                    <xsl:value-of select="$diUUID" />
                    <br />
                </a>
            </xsl:if>
            <xsl:if test="$diname or $didesc">
                <xsl:value-of select="$diname" />:<xsl:value-of select="$didesc" />
                <br />
            </xsl:if>
            <xsl:if test="$dilinkage">
                <a>
                    <xsl:attribute name="href">
                        <xsl:value-of select="$dilinkage" />
                    </xsl:attribute>
                    <xsl:value-of select="$dilinkage" />
                </a>
                <br />
            </xsl:if>
        </xsl:for-each>
        <!-- Selecting online resources -->
        <xsl:variable name="pType" select="gvq:category/gvq:GVQ_PublicationCategoryCode/@codeListValue" />
        <xsl:variable name="pISSN" select="gvq:ISSN/gco:CharacterString" />
        <xsl:variable name="pISBN" select="gvq:ISBN/gco:CharacterString" />
        <xsl:if test="$pType">
            <b>Category: </b>
            <xsl:value-of select="$pType" />
        </xsl:if>
        <xsl:if test="$pISSN">
            <b>ISSN: </b>
            <xsl:value-of select="$pISSN" />
        </xsl:if>
        <xsl:if test="$pISBN">
            <b>ISBN: </b>
            <xsl:value-of select="$pISBN" />
        </xsl:if>
        <br />
    </xsl:template>
    <!-- Template for bookmark navigation -->
    <xsl:template name="links">
        <div style="font-size:12px">
            <a href="#Citations">Citations</a> |
            <a href="#citationResponsibleParties">Citation Responsible Parties</a> |
            <a href="#boundingExtent">Bounding Extent</a> |
            <a href="# Quality Reports">Quality Reports</a> |
            <a href="#Discovered Issues">Discovered Issues</a> |
            <a href="#RefDocs">Reference Documents</a> |
            <a href="#onlineResources">OnlineResources</a> |
            <a href="#Sources">Sources</a> |
            <a href="#Process Steps">Process Steps</a>
            <br />
        </div>
    </xsl:template>
    <!-- Template for styling lineage items TODO fix - not ready yet-->
    <xsl:template name="TabularProcessSteps">
        <div>
            <a name="Process Steps" />
        </div>
        <h2>Process Steps</h2>
        <table width="95%" border="1" cellpadding="2" cellspacing="2">
            <tr>
                <th valign="top">ID</th>
                <th valign="top">Description</th>
                <th valign="top">Process Command</th>
                <th valign="top">Input</th>
                <th valign="top">Output</th>
            </tr>
            <tr>
                <td valign="top">
                    <xsl:variable name="psID" select="@id" />
                    <xsl:value-of select="$psID" /> (<xsl:value-of select="count(.[contains(@xlink:href,$psID)])" />)
                </td>
                <td valign="top">
                    <xsl:value-of select="gmd19157:description/gco:CharacterString" />
                </td>
                <td valign="top">
                    <xsl:value-of select="gmi:processingInformation/gmi:LE_Processing/gmi:runTimeParameters/gco:CharacterString" />
                </td>
                <td valign="top">
                    <xsl:for-each select="gmd19157:source">
                        <xsl:variable name="title">
                            <xsl:choose>
                                <xsl:when test="gmd19157:LI_Source/gmd19157:sourceCitation/gmd:CI_Citation/gmd:title/gmx:FileName">
                                    <xsl:value-of select="gmd19157:LI_Source/gmd19157:sourceCitation/gmd:CI_Citation/gmd:title/gmx:FileName" /> (<xsl:value-of select="gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:title/gmx:FileName/@src" />)
                                </xsl:when>
                                <xsl:when test="gmd19157:LI_Source/gmd19157:sourceCitation/gmd:CI_Citation/gmd:title/gco:CharacterString">
                                    <xsl:value-of select="gmd19157:LI_Source/gmd19157:sourceCitation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="'Unknown'" />
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:variable>
                        <xsl:value-of select="$title" />
                        <br />
                    </xsl:for-each>
                </td>
                <td valign="top">
                    <xsl:for-each select="gmi:output">
                        <xsl:value-of select="@xlink:title" />
                        <br />
                    </xsl:for-each>
                </td>
            </tr>
        </table>
        <xsl:call-template name="links" />
    </xsl:template>
    <!-- Template for styling process steps from a lineage item -->
    <xsl:template name="styleTraceability">
        <p>
            <b>Evaluation method: </b>
            <xsl:value-of select="gmd19157:evaluation//gmd19157:evaluationMethodDescription/gco:CharacterString" />
        </p>
        <p>
            <p>
                <b>Statement: </b>
                <xsl:value-of select="gmd19157:result//gmd19157:statement/gco:CharacterString" />
            </p>
            <xsl:for-each select="gvq:trace//gmd19157:processStep/gmd19157:LI_ProcessStep">
                <p>
                    <b>Process step
                        <xsl:value-of select="position()" />
                    </b>
                    <br />
                    <b>Description: </b>
                    <xsl:value-of select="gmd19157:description/gco:CharacterString" />
                    <br />
                    <b>Rationale: </b>
                    <xsl:value-of select="gmd19157:rationale/gco:CharacterString" />
                </p>
            </xsl:for-each>
        </p>
    </xsl:template>
</xsl:stylesheet>
