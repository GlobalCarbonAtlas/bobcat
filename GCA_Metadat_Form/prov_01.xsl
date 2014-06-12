<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
	xmlns:mdc="http://www.geoviqua.org/mdcollection"
	xmlns:gmd="http://www.isotc211.org/2005/gmd"
	xmlns:gco="http://www.isotc211.org/2005/gco"
	xmlns:gmi="http://www.isotc211.org/2005/gmi"
	xmlns:gml="http://www.opengis.net/gml/3.2"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:updated19115="http://www.geoviqua.org/19115_updates" 
        xmlns:gmx="http://www.isotc211.org/2005/gmx" 
        xmlns:gvq="http://www.geoviqua.org/QualityInformationModel/3.1" 
        xmlns:gmd19157="http://www.geoviqua.org/gmd19157" 
        xmlns:un="http://www.uncertml.org/2.0" 
        xsi:schemaLocation="http://www.isotc211.org/2005/gmx
        http://schemas.opengis.net/iso/19139/20070417/gmx/gmx.xsd 
        http://www.geoviqua.org/QualityInformationModel/3.1 
        http://schemas.geoviqua.org/GVQ/3.1.0/GeoViQua_PQM_UQM.xsd 
        http://www.uncertml.org/2.0 http://www.uncertml.org/uncertml.xsd" id="dataset_MD">
<xsl:template match="/">

<html>
<head>
<TITLE style="font:verdana;">PROVENANCE</TITLE>
<style type="text/css">

h1
{
FONT-FAMILY: verdana,helvetica,arial,sans-serif;
position:relative;
left:50PX;
}
ul 
{
	list-style-type:none;
	border-left: 1px dotted black;
	margin-left: 18px;
	
}

#div01
{
margin-left:50px;
line-height:200%
height: auto;
width:1300px;
FONT-SIZE: 75%;
FONT-FAMILY: verdana,helvetica,arial,sans-serif;
border-top:1px solid black;
border-bottom:1px solid black;
border-right:1px solid black;
border-left:1px solid black;
<!--background:#BFBFBF;-->
}

tr:hover
{
	background: #9acd32;
}

#general
{
width:1200px;
margin-bottom:5px;

}
#lineage{
	width: 1200px;
	margin-top:1px;
	background: #d7d7d7;
	position:relative;
        top:floating;
	border-right:1px solid black;
	border-top:1px dotted black;
	border-bottom:1px solid black;
	margin-top:20px;
	margin-bottom:20px;
}

#process{
	width:1100px;
	margin-top:20px;
	margin-bottom:20px;
	background:#EEEEEE;
	position:relative;
	border-top:1px dotted black;
	border-bottom:1px solid black;
	border-right:1px solid black;
        
	
}

.process_title span
{
	font-weight:bold;
}
.process_title:target span
{
	color: red;
}

#source{
	width:1100px;
	margin-top:20px;
	margin-bottom:20px;
	background:#eee;
	position:relative;
	border-top:1px dotted black;
	border-bottom:1px solid black;
	border-right:1px solid black;
}
#process_id
{
	background:#CCCCCC;
	margin-top:2px;
	margin-bottom:20px;
	width:1000px;
	border-top:1px dotted black;
	border-bottom:1px solid black;
	border-right:1px solid black;
        left:100;
}
#source_id
{
	background:#CCCCCC;
	margin-top:2px;
	margin-bottom:20px;
	width:1000px;
	border-top:1px dotted black;
	border-bottom:1px solid black;
	border-right:1px solid black;
}

#subprocess_id
{
margin-top:2px;
	margin-bottom:20px;
	background:#eee;
	position:relative;
	width:900px;
	border-top:1px dotted black;
	border-bottom:1px solid black;
	border-right:1px solid black;
	}

#sub_source_id
{
margin-top:2px;
	margin-bottom:20px;
	background:#eee;
	position:relative;
	width:900px;
	border-top:1px dotted black;
	border-bottom:1px solid black;
	border-right:1px solid black;
	}
        
        #source_output
{
margin-top:2px;
	margin-bottom:20px;
	background:#eee;
	position:relative;
	width:900px;
	border-top:1px dotted black;
	border-bottom:1px solid black;
	border-right:1px solid black;
	}

#map
{
border:1px solid black;
width:350px; 
height:300px;
position:relative;
top:0px;
left:790px;
display: block; 
	}
#general_div
{
width:600px; 
height:floating;
position:relative;
top:6px;
left:10px;
	}

        
.collapsed {background:url(collapsed.gif) no-repeat 56%; background-color: #FFFFFF; border: 0px ; color:#66FFFF; text-decoration:none; cursor: pointer; }
.expanded {background:url(expanded.gif) no-repeat 56%; background-color: #FFFFFF; border: 0px ; color:#66FFFF; text-decoration:none;  cursor: pointer; }
</style>
<script src="proj4js-compressed.js"/>
<script src="http://maps.google.com/maps?file=api&amp;hl=ca&amp;v=2&amp;sensor=false&amp;key=AIzaSyBvA29q7M1Du7fddfauz48uKwy8BmNq188" type="text/javascript"/>
<script type="text/javascript">

					<![CDATA[
function CarregaMapa(div_map, szminx, szmaxx, szminy, szmaxy)
{
var minx, maxx, miny, maxy;

    minx=parseFloat(szminx);
    maxx=parseFloat(szmaxx);
    miny=parseFloat(szminy);
    maxy=parseFloat(szmaxy);

    if(GBrowserIsCompatible()
		&& !isNaN(minx)
		&& !isNaN(maxx)
		&& !isNaN(miny)
		&& !isNaN(maxy))
    {
		var d;
          var map = new GMap2(document.getElementById(div_map),{draggableCursor:"crosshair"});
          map.addControl(new GSmallMapControl());

          d=maxx-minx;
          if(d<(maxy-miny))
			d= maxy-miny;
          if(d<0.0000001)
              d=360;
          nivell=parseInt(-Math.log(d)/Math.log(2)+8);

		  //Level could be also auto-calculated if the bounds are specified using:
		  //nivell= getBoundsZoomLevel(getBounds());

		  //Center the image on the polygon
          map.setCenter(new GLatLng((maxy-miny)/2+miny, (maxx-minx)/2+minx), nivell);
		  
		var poligon=new Array(new GLatLng(miny, minx, true),new GLatLng(miny, maxx, true), new GLatLng(maxy, maxx, true), new GLatLng(maxy, minx, true), new GLatLng(miny, minx, true));
		var poligon_google = new GPolyline(poligon, "#000000", 2, 1, 0);
		map.addOverlay(poligon_google);
    }
}
]]>

function toggle_visibility(myButton)
{
	var myElement= myButton.parentNode,
		e= myElement.getElementsByTagName("ul");

	//If 'ul' elements are found, we refer to the first one
	//to expand/collapse it.
	if(e.length)
		e= e[0];
	if(e.style.display !== 'none')
	{
		e.style.display = 'none';
		myButton.className= "collapsed";
	}
	else
	{
		e.style.display = 'block';
		myButton.className= "expanded";
	}
}
function getBoundingBoxCoordinates()
{
	var i,
		points= new Array(),
		myCRS= "<xsl:value-of select="//gmd:cornerPoints/gml:Point/@srsName"/>",
		x_coords= new Array(),
		y_coords= new Array();

	//We need object converters to convert the coordinate system from the XML defined
	//to the GMaps API coordinate system, using the OSGEO Prj4
	//We asume all the source points have same coordinate system (myCRS).
	var CRS_source= new Proj4js.Proj(myCRS),
		CRS_destination= new Proj4js.Proj("WGS84"); //GMaps API CRS

	//Retrieve the points we need from the XML
	//Obtain an array with ["x","y"] of every point
	//05-04-2013 GC...I just modified this
	points[0]= [<xsl:value-of select="//gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:eastBoundLongitude/gco:Decimal"/>,
			<xsl:value-of select="//gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:northBoundLatitude/gco:Decimal"/>];
	points[1]= [<xsl:value-of select="//gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:westBoundLongitude/gco:Decimal"/>,
			<xsl:value-of select="//gmd:extent/gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:southBoundLatitude/gco:Decimal"/>];

//The rest of the function is pure javascript code, so specify as it
<![CDATA[
	//Generate the points in Proj4 format
	for(i=0;i<points.length;i++)
		points[i]= new Proj4js.Point(parseFloat(points[i][0]),parseFloat(points[i][1]));

	//Perform the transformation
	for(i=0;i<points.length;i++)
	{
		points[i]= Proj4js.transform(CRS_source,CRS_destination,points[i]);
		//And save X in x_coords array for later deciding which is the minimum X
		x_coords[i]= points[i].x;
		//and Y in y_coords array
		y_coords[i]= points[i].y;
	}

	//Return an object with the bounding box defined by min/max X/Y
	return {
		minx: Math.min.apply(null,x_coords),
		maxx: Math.max.apply(null,x_coords),
		miny: Math.min.apply(null,y_coords),
		maxy: Math.max.apply(null,y_coords)
		};
]]>
}
function loadSituationMap()
{
	var coords= getBoundingBoxCoordinates();

	CarregaMapa('map',
		coords.minx,
		coords.maxx,
		coords.miny,
		coords.maxy);
}
</script>
</head>
<body onload="loadSituationMap();">
<h1> Provenance</h1>

<div id="div01">
<b style="color:#0B2161;">MD_Metadata</b>
	<ul id='general'>
		<input type="button" onclick="toggle_visibility(this)" class="expanded"/><b style="color:#0B2161;">General Metadata Information:</b>
		<ul>
		<div id="general_div">
		<xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title | //gmd:identificationInfo/gvq:GVQ_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title">		
		<li>
                    <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title" style="color:#0B2161;">Title:</b><tr><xsl:value-of select="gco:CharacterString"/></tr>
                </li>
                </xsl:for-each>
		
                <li>
                    <b title="/gmd:MD_Metadata/gmd:fileIdentifier/gco:CharacterString" style="color:#0B2161;">File Indentifier:</b>
		<xsl:for-each select="//gmd:fileIdentifier">
                    <tr><xsl:value-of select="gco:CharacterString"/></tr>
		</xsl:for-each></li>

		<li><b title="//gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract/gco:CharacterString" style="color:#0B2161;">Abstrtact:</b>
                    <xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract | //gmd:identificationInfo/gvq:GVQ_DataIdentification/gmd:abstract">
                        <tr><xsl:value-of select="gco:CharacterString"/></tr>
		   </xsl:for-each></li>
		</div>
<div id="map">
</div>
                </ul>
	<li id='lineage'>
		<li>
                    <input type="button" onclick="toggle_visibility(this)" class="expanded"/>
                    <b style="color:#0B2161;">Lineage:</b>
                 <ul>
		<b title="/gmd:MD_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:statement" style="color:#0B2161;">Statement:</b>
		<tr>
                    <xsl:value-of select="//gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:statement/gco:CharacterString | //gmd19157:lineage/gmd19157:LI_Lineage/gmd19157:statement/gco:CharacterString"/>
                </tr>
		<li>
                    <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:purpose" style="color:#0B2161;">Purpose:</b>
                </li>
		<xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:purpose | //gmd:identificationInfo/gvq:GVQ_DataIdentification/gmd:purpose">		
			<tr>
                            <xsl:value-of select="gco:CharacterString"/>
                        </tr>
		</xsl:for-each>
		<li>
                    <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:status" style="color:#0B2161;">Status:</b>
		<xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:status | //gmd:identificationInfo/gvq:GVQ_DataIdentification/gmd:status">		
			<tr>
                            <xsl:value-of select="gmd:MD_ProgressCode/@codeListValue"/>
                        </tr>
		</xsl:for-each>
                </li>
		<li>
                    <b title="/gmd:MD_Metadata/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceAndUpdateFrequency" style="color:#0B2161;">Maintenance:</b>
		<xsl:for-each select="//gmd:resourceMaintenance/gmd:MD_MaintenanceInformation | //gmd:identificationInfo/gvq:GVQ_DataIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation">		
			<tr>
                            <xsl:value-of select="gmd:maintenanceAndUpdateFrequency/gmd:MD_MaintenanceFrequencyCode/@codeListValue"/>
                        </tr>
		</xsl:for-each>
                </li>
		<li>
                    <input type="button" onclick="toggle_visibility(this)" class="collapsed"/>
                    <b style="color:#0B2161;">Citation:</b>
                <ul style="display:none;">
		<xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation | //gmd:identificationInfo/gvq:GVQ_DataIdentification/gmd:citation/gmd:CI_Citation">		
		<li>
                    <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString " style="color:#0B2161;">Title:</b>
			<tr>
                            <xsl:value-of select="gmd:title/gco:CharacterString"/>
                        </tr>
		<li>
                    <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:CI_Date/gmd:date/gco:Date" style="color:#0B2161;">Date:</b>		
			<tr>
                            <xsl:value-of select="gmd:date/gmd:CI_Date/gmd:date/gco:Date"/>
                            <b style="color:#0B2161;"> Date of: </b>
			<td><xsl:value-of select="gmd:CI_Citation/gmd:CI_Date/gmd:dateType/gmd:CI_DateTypeCode/@codeListValue"/></td>
                        </tr>
		<li>
                    <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:identifier/gmd:MD_Identifier/gmd:code/gco:CharacterString" style="color:#0B2161;">Identifier:</b>		
			<tr>
                            <xsl:value-of select="gmd:identifier/gmd:MD_Identifier/gmd:code/gco:CharacterString | gmd:identifier/gmd:RS_Identifier/gmd:code/gco:CharacterString | gmd:identifier/updated19115:MD_Identifier/gmd:code/gco:CharacterString"/>
                        </tr>
				
			<xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:citedResponsibleParty/gmd:CI_ResponsibleParty">	
			<li>
                            <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:organisationName/gco:CharacterString" style="color:#0B2161;">Organization Name:</b>		
			<tr>
                            <xsl:value-of select="gmd:organisationName/gco:CharacterString"/><b style="color:#0B2161;"> Has the Role: </b>
			<td><xsl:value-of select="gmd:role/gmd:CI_RoleCode/@codeListValue"/></td>
                        </tr>
                        </li>
                <ul>
		<li><input type="button" onclick="toggle_visibility(this)" class="collapsed"/><b style="color:#0B2161;">Web Site:</b>
		<ul style="display:none;">
			<li><b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource/gmd:CI_OnlineResource/gmd:linkage/gmd:URL" style="color:#0B2161;">Link: </b>
				<a>
					<xsl:attribute name="href">
				<tr>
                                    <xsl:value-of select="gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource/gmd:CI_OnlineResource/gmd:linkage/gmd:URL"/>
                                </tr>
					</xsl:attribute>
				<tr>
                                    <xsl:value-of select="gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource/gmd:CI_OnlineResource/gmd:linkage/gmd:URL"/>
                                </tr>
				</a>
			</li>
			<li>
                            <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact//gmd:onlineResource/gmd:CI_OnlineResource/gmd:name/gco:CharacterString" style="color:#0B2161;">Name: </b>
				<tr>
                                    <xsl:value-of select="gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource/gmd:CI_OnlineResource/gmd:name/gco:CharacterString"/>
                                </tr>
			</li>
			<li>
                            <b title="/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource/gmd:CI_OnlineResource/gmd:name/gco:CharacterString" style="color:#0B2161;">Description: </b>
                            <br/>
				<tr>
                                    <xsl:value-of select="gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource/gmd:CI_OnlineResource/gmd:description/gco:CharacterString"/>
                                </tr>
			</li>
		</ul>
		</li>
			</ul>
	</xsl:for-each>
                </li>
                </li>
                </li>
	<xsl:for-each select="//gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty  | //gmd:identificationInfo/gvq:GVQ_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty">	
        <li>
            <ul>
            <input type="button" onclick="toggle_visibility(this)" class="collapsed"/>
            <b style="color:#0B2161;">Point of Contact:</b>				
		<ul style="display:none;">
                    <li>
                        <b title="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/md:organisationName/gco:CharacterString" style="color:#0B2161;">Organization:</b>
			<tr>
                            <xsl:value-of select="gmd:organisationName/gco:CharacterString"/>
                        </tr>
                    </li>
			<li>
                            <b title="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString" style="color:#0B2161;">Person:</b>
			<tr>
                            <xsl:value-of select="gmd:individualName/gco:CharacterString"/>
                        </tr>
                        </li>
			<li>
                            <b title="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:positionName/gco:CharacterString" style="color:#0B2161;">Position:</b>
			<tr>
                            <xsl:value-of select="gmd:positionName/gco:CharacterString"/>
                        </tr>
                        </li>
			<li>
                            <b title="gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString" style="color:#0B2161;">E-mail:</b>
			<tr>
                            <xsl:value-of select="gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString"/>
                        </tr>
                        </li>
			</ul>
            </ul>
        </li>
        </xsl:for-each>
        </xsl:for-each>
  </ul>
		
		<li id='process'>
                    <input type="button" onclick="toggle_visibility(this)" class="expanded"/><b style="color:#0B2161;">Process:</b>
		<ul>
		<xsl:for-each select="//gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/* | //gmd19157:lineage/gmd19157:LI_Lineage/gmd19157:processStep/gmd19157:LI_ProcessStep"> 
		<li class="process_title">
		<xsl:attribute name="id">
			<xsl:value-of select="@id | @id"/>
		</xsl:attribute>
		<span>
			<xsl:value-of select="@id | @id"/>
		</span>
		<b style="color:#0B2161;"> (</b>
		<xsl:value-of select="gmd:dateTime/gco:DateTime"/>
		<b style="color:#0B2161;">) </b>
		<xsl:value-of select="gmd:description/gco:CharacterString | gmd19157:description/gco:CharacterString"/>
		
		<li id='process_id'>
                    <input type="button" onclick="toggle_visibility(this)" class="collapsed"/>
                    <b style="color:#0B2161;">Process Characteristics:</b>	
		<ul style="display:none;"><b style="color:#0B2161;">Processor:</b><ul>
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmd:processor/gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString" style="color:#0B2161;">Organization Name:</b>
			<tr>
                            <xsl:value-of select="gmd:processor/gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString"/>
                        </tr>	
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmd:processor/gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString" style="color:#0B2161;">Individual Name:</b>
			<tr>
                            <xsl:value-of select="gmd:processor/gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString"/>
                        </tr>
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmd:processor/gmd:CI_ResponsibleParty/gmd:positionName/gco:CharacterString" style="color:#0B2161;">Position Name:</b>
			<tr>
                            <xsl:value-of select="gmd:processor/gmd:CI_ResponsibleParty/gmd:positionName/gco:CharacterString"/>
                        </tr>
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmd:processor/gmd:CI_ResponsibleParty//gmd:processor/gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/@codeListValue" style="color:#0B2161;">Role:</b>
			<tr>
                            <xsl:value-of select="gmd:processor/gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/@codeListValue"/>
                        </tr>
	<li><b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep//gmd:processor/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString" style="color:#0B2161;">Contact Information:</b>
			<tr>
                            <xsl:value-of select="gmd:processor/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString"/>
                        </tr>
</li>
        </li>
        </li>
        </li>
        </li>
                </ul>
	
	<b style="color:#0B2161;">Processing Information:</b><ul>
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmi:processingInformation/gmi:LE_Processing/gmi:identifier/gmd:MD_Identifier/gmd:code/gco:CharacterString" style="color:#0B2161;">Processing Identifier:</b>
        </li>
			<tr>
                            <xsl:value-of select="gmi:processingInformation/gmi:LE_Processing/gmi:identifier/gmd:MD_Identifier/gmd:code/gco:CharacterString"/>
                        </tr>	
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmi:processingInformation/gmi:LE_Processing/gmi:identifier/gmd:MD_Identifier/gmd:code/gco:CharacterString" style="color:#0B2161;">Software Reference:</b>
        </li>
			<tr>
                            <xsl:value-of select="gmi:processingInformation/gmi:LE_Processing/gmi:softwareReference/gmd:CI_Citation/gmd:title/gco:CharacterString"/>
                        </tr>	
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmi:processingInformation/gmi:LE_Processing/gmi:softwareReference/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date/gco:Date" style="color:#0B2161;">Run Time Parameters:</b>
        </li>
			<tr>
                            <xsl:value-of select="gmi:processingInformation/gmi:LE_Processing/gmi:softwareReference/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date/gco:Date"/>
                            <b style="color:#0B2161;"> Date of: </b>
			<td>
                            <xsl:value-of select="gmi:processingInformation/gmi:LE_Processing/gmi:softwareReference/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:dateType/gmd:CI_DateTypeCode/@codeListValue"/>
                        </td>
                        </tr>	
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmi:processingInformation/gmi:LE_Processing/gmi:procedureDescription/gco:CharacterString"  style="color:#0B2161;">Procedure Description:</b>
        </li>
			<tr>
                            <xsl:value-of select="gmi:processingInformation/gmi:LE_Processing/gmi:procedureDescription/gco:CharacterString"/>
                        </tr>
	<li>
            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmi:processingInformation/gmi:LE_Processing/gmi:algorithm/gmi:LE_Algorithm/gmi:citation/gmd:CI_Citation/gmd:title/gco:CharacterString" style="color:#0B2161;">Algorithm:</b>
        </li>
			<tr>
                            <xsl:value-of select="gmi:processingInformation/gmi:LE_Processing/gmi:algorithm/gmi:LE_Algorithm/gmi:description/gco:CharacterString"/>
                        </tr>	
	</ul>
	<li id='sub_source_id'>
	<input type="button" onclick="toggle_visibility(this)" class="collapsed"/><b style="color:#0B2161;">Sources Step:</b>
        <ul style="display:none;">
			<xsl:for-each select="gmd:source | gmd19157:source/gmd19157:LI_Source">
                            <li>
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="@id"/>
                                    </xsl:attribute>
                               <xsl:value-of select="@* | @id"/>
                              </a>
                            </li>
                          </xsl:for-each>
                       </ul>
                       <tr>   
                          <input type="button" onclick="toggle_visibility(this)" class="collapsed"/><b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:processStep/gmi:output" style="color:#0B2161;">Sources Output:</b>
        <ul style="display:none;">
                    <xsl:for-each select="gmi:output">           
                                <li>
                                    <a>
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="@xlink:href"/>
                                        </xsl:attribute>
                                    <xsl:value-of select="@xlink:href"/>
                                </a></li>
			</xsl:for-each>
        </ul>
                       </tr>          
                    
        </li>
    </ul>
                </li>
                </li>
                </xsl:for-each>
               
        </ul>
        </li>
    
	
	<li id='source'><input type="button" onclick="toggle_visibility(this)" class="expanded"/><b style="color:#0B2161;">Source:</b>
        <ul>
			<xsl:for-each select="//gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source | //gmd19157:lineage/gmd19157:LI_Lineage/gmd19157:processStep/gmd19157:LI_ProcessStep/gmd19157:source/gmd19157:LI_Source">
	<b><xsl:value-of select="@id" /></b>
        <xsl:for-each select= "gmd:sourceCitation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date | gmd19157:sourceCitation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date">
             <b style="color:#0B2161;">(</b>                 
            <xsl:value-of select="gco:Date | gco:Date" />
             <b style="color:#0B2161;">)</b>                 
            <xsl:value-of select="gmd:dateType/gmd:CI_DateTypeCode/@codeListValue" />
        </xsl:for-each>
	<xsl:value-of select="gmd:description/gco:CharacterString | gmd19157:description/gco:CharacterString" />	
	
	<li id='source_id'>
	
	<li>
            <input type="button" onclick="toggle_visibility(this)" class="collapsed"/>
            <b style="color:#0B2161;">Source Characteristics:</b>
	
	<ul style="display:none;"><b style="color:#0B2161;">Source Citation:</b>
		<ul>
			<li>
                            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:title/gco:CharacterString" style="color:#0B2161;">Title:</b>
                        </li>
                                          <tr>
                                              <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                                          </tr>
			<li>
                            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:alternateTitle/gco:CharacterString" style="color:#0B2161;">Source Alternative Title:</b>
                        </li>
					<tr>
                                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:alternateTitle/gco:CharacterString" />
                                        </tr>
			<li>
                            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date/gco:Date" style="color:#0B2161;">Date:</b>
                        </li>
					<tr>
                                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date/gco:Date" />
                                            <b style="color:#0B2161;"> Date of: </b>
					<td>
                                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:dateType/gmd:CI_DateTypeCode/@codeListValue" />
                                        </td>
                                        </tr>
			<li>
                            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:edition/gco:CharacterString" style="color:#0B2161;">Edition:</b>
                        </li>
					<tr>
                                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:edition/gco:CharacterString" />
                                        </tr>
			<li>
                            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString" style="color:#0B2161;">Responsible Party:</b>
                        </li>
					<tr>
                                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString" />
                                            <b style="color:#0B2161;"> Has the Role: </b>
					<td>
                                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:citedResponsibleParty/gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/@codeListValue" />
                                        </td>
                                        </tr>
			<li>
                            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:presentationForm/gmd:CI_PresentationFormCode/@codeListValue" style="color:#0B2161;">Format:</b>
                        </li>
					<tr>
                                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:presentationForm/gmd:CI_PresentationFormCode/@codeListValue" />
                                        </tr>
			<li>
                            <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:series/gmd:CI_Series/gmd:name/gco:CharacterString" style="color:#0B2161;">Serie:</b>
					<xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:series/gmd:CI_Series/gmd:name/gco:CharacterString" /></li>
			<li><b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:series/gmd:CI_Series/gmd:issueIdentification/gco:CharacterString" style="color:#0B2161;"> Issue Id: </b>
					<xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:series/gmd:CI_Series/gmd:issueIdentification/gco:CharacterString" /></li>
			
		</ul>
		<!---fa falta afegir un xpath per el spatial resolution..--> 
		<li><b style="color:#0B2161;">Source Spatial Resolution:</b>
		<li><b style="color:#0B2161;">Source Reference System:</b>
		<li id='subprocess_id'><li><input type="button" onclick="toggle_visibility(this)" class="collapsed"/><b style="color:#0B2161;">Process:</b>
		<!---fa falta afegir un xpath per el subprocess...trobar exemple per exemplificar-ho..--> 
        <ul style="display:none;">
            
         <xsl:for-each select="gmd:sourceStep | //gmd19157:lineage/gmd19157:LI_Lineage/gmd19157:processStep/gmd19157:LI_ProcessStep"><!-- fer alguna igualtat per exemple podem fer -->
                                <li>
                                    <b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceStep" style="color:#0B2161;">  Step: </b>
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="@* | @id"/>
                                    </xsl:attribute>
                                <xsl:value-of select="@* | @id"/>
                                </a>
                            </li>
			</xsl:for-each>	
	</ul>
        
		</li>
                </li>
                </li>
                </li>
	</ul>
	</li>
	</li>
			</xsl:for-each>
	</ul>
	</li>
                </li>
                </ul>
                </li>
        </li>
	</ul>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>


<!--<li id='sub_source_id_citation'>
	
	<li><input type="button" onclick="toggle_visibility(this)" class="collapsed"/><b style="color:#0B2161;">Source Citation:</b>
		<ul>
			<li><b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:title/gco:CharacterString" style="color:#0B2161;">Title:</b></li>           
                        <tr>
                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:title/gco:CharacterString | gmd19157:sourceCitation/gmd:CI_Citation/gmd:title/gco:CharacterString" />
                        </tr>
			<li><b title="/gmi:MI_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:alternateTitle/gco:CharacterString" style="color:#0B2161;">Source Alternative Title:</b></li>
                        <tr>
                            <xsl:value-of select="gmd:sourceCitation/gmd:CI_Citation/gmd:title/gco:CharacterString | gmd19157:sourceCitation/gmd:CI_Citation/gmd:alternateTitle/gco:CharacterString" />
                        </tr>

<b style="color:#0B2161;">(</b>
                            <xsl:for-each select= "gmd19157:sourceCitation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date">
//gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:source/gmd:LI_Source/gmd:sourceCitation/gmd:CI_Citation/gmd:date/gmd:CI_Date/gmd:date
                             <xsl:value-of select="gco:Date | gco:Date" />
                            <b style="color:#0B2161;">)</b>
                            </xsl:for-each>
	<xsl:value-of select="gmd:description/gco:CharacterString | gmd19157:description/gco:CharacterString" /></li>-->