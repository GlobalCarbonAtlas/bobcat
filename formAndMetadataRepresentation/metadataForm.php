<!DOCTYPE html>
<html>

<head>
		<meta charset="utf-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Metadata Form GCA</title>
		<link rel="stylesheet" href="css/bootstrapCustom/css/bootstrap.css" media="screen"/>
		<link rel="stylesheet" href="css/metadataForm.css"/>
		<!-- CF http://www.jankoatwarpspeed.com/turn-any-webform-into-a-powerful-wizard-with-jquery-formtowizard-plugin/-->
		<link rel="stylesheet" href="js/library/jqwidgets-ver3.2.1/jqwidgets/styles/jqx.base.css"/>
		<link rel="stylesheet" href="js/library/jqwidgets-ver3.2.1/jqwidgets/styles/jqx.bootstrap.css"/>

		<script type="text/javascript" src="../js/library/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="js/library/formToWizardBootstrapValidate.js"></script>

		<script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxcore.js"></script>
		<script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxvalidator.js"></script>
		<script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxmaskedinput.js"></script>
		<script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxinput.js"></script>
		<script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxdatetimeinput.js"></script>
		<script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxcalendar.js"></script>
		<script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/globalization/globalize.js"></script>

		<script type="text/javascript" src="js/metadataGCAFormValidationRules_script.js"></script>
		<script type="text/javascript" src="js/metadataGCAForm_script.js"></script>
		<script type='text/javascript' src='../js/OpenLayers-2.12/OpenLayers.js'></script>
		<script type="text/javascript" src="../js/library/jquery.i18n.properties-1.0.9.js"></script>

</head>
<body>

<div class="container-fluid">

<form id="metadataForm" method="post">
<div id="mandatoryFieldIndication" class="col-md-24 col-sm-24">(*): mandatory fields</div>

<div id="errorsValidation" class="col-md-24 col-sm-24"></div>


<div class="row col-md-push-7 col-md-9 col-sm-push-7 col-sm-9">
<!--**************************************************************************************** -->
<!--********************************** GENERAL INFORMATION ********************************* -->
<!--**************************************************************************************** -->
<div id="basicInformation">
		<fieldset class="fieldset1">
				<legend class="legend1">General information</legend>

				<fieldset id="basicInfoDataFile" class="fieldset2">
						<legend class="legend2">About data file:</legend>

						<div class="form-group">
								<!--*********************************** CREATION DATE *********************************** -->
								<div class="row col-md-24 col-sm-24">
										<div class="label1ContactLegend" id="dataDateCreationText" title="Creation date of the product file">Creation date (*):</div>
										<div id="dataDateCreationInput" class="dateInput" name="dataDateCreation"></div>
								</div>

								<!--*********************************** PRODUCT NAME *********************************** -->
								<div class="label1" id="dataFileNameText"
										 title="Construct a name for your data file thanks to Product type, category, title and version. Necessary to mention/exchange your data">Product name (*):
								</div>
								<div id="prodTypeRow" class="row col-md-24 col-sm-24">
										<div class="col-md-10 col-sm-10">
												<div class="label2" id="dataProductTypeSelectText">Product type (*):</div>
												<select id="dataProductTypeSelect" class="form-control form-control-xl" name="dataProductType">
														<option value="nullValue">----</option>
														<option value="CO2-flux">CO2 flux</option>
														<option value="Carbon-stock">Carbon stock</option>
														<option value="CH4-flux">CH4 flux</option>
														<option value="">Other</option>
												</select>
										</div>
										<div class="col-md-13 col-sm-13">
												<div class="label2" id="dataProductTypeFreeTextText">Other type:</div>
												<input id="dataProductTypeFreeTextInput" class="form-control form-control-l" name="dataProductType" type="text">
										</div>
								</div>

								<div id="prodCategoryRow" class="row col-md-24 col-sm-24">
										<div class="col-md-10 col-sm-10">
												<div class="label2" id="dataProductCategorySelectText">Product category (*):</div>
												<select class="form-control form-control-xl dataProductCategoryClass" id="dataProductCategorySelect" name="dataProductCategory">
														<option value="nullValue">----</option>
														<option value="Inversion-model">Inversion model</option>
														<option value="Land-model">Land model</option>
														<option value="Ocean-model">Ocean model</option>
														<option value="">Other</option>
												</select>
										</div>
										<div class="col-md-13 col-sm-13">
												<div class="label2" id="dataProductCategoryFreeTextText">Other category:</div>
												<input id="dataProductCategoryFreeTextInput" class="form-control form-control-l" name="dataProductCategory" type="text">
										</div>
								</div>
						</div>

						<div id="prodNameTitleAndVersion" class="row col-md-24 col-sm-24">
								<div class="col-md-10 col-sm-10">
										<div class="label2" id="prodNameTitleText">Product title (*):</div>
										<input id="prodNameTitleInput" class="form-control form-control-xl mandatoryField" name="prodNameTitle" type="text">
								</div>
								<div class="col-md-13 col-sm-13">
										<div class="label2" id="prodNameVersionText">Product version (*):</div>
										<input id="prodNameVersionInput" class="form-control form-control-l" name="prodNameVersion" type="text">
								</div>
						</div>

						<!--*********************************** DATA ABSTRACT *********************************** -->
						<div class="row col-md-24 col-sm-24">
								<div class="label1 row " id="dataAbstractText"
										 title="Describe your data in few words">Product summary (*):
								</div>
								<div id="dataAbstractId" class="row col-md-24 col-sm-24">
										<textarea id="dataAbstractTextarea" class="form-control" name="dataAbstract" rows="2" cols="60"></textarea>
								</div>
						</div>

						<!--*********************************** DATA CONTRIBUTOR *********************************** -->
						<div id="contributorsContainer"></div>
						<div id="contributorsContainerButton" class="row col-md-24 col-sm-24">
								<div class="cursorPointer addQuitAllContainerText" title="Click to add creator information (no more than 5)">
										Add creator information (5 maximum) : <img id="addCreatorInfoButton" src="img/addChamp.png"
																															 class="img-responsive img-rounded addQuitAllContainer cursorPointer">
								</div>
						</div>
				</fieldset>

				<fieldset id="basicInfoMetadat" class="fieldset2">
						<legend class="legend2">About metadata file (this questionnaire):</legend>

						<div class="form-group">
								<!--*********************************** METADATA DATE *********************************** -->
								<div class="row col-md-24 col-sm-24">
										<div id="metadataDateCreationLabel" class="label1ContactLegend" for="metadataDateCreationInput" title="Date of creation of this file (metadata file)">
												Metadata date of creation (*):
										</div>
										<div id="metadataDateCreationInput" class="dateInput" name="metadataDateCreation"></div>
										<!-- Pour accueillir calendrier jqx-->
								</div>

								<!--*********************************** METADATA CREATOR *********************************** -->
								<div id="metadatCreatorInfoRow" class="row col-md-24 col-sm-24">
										<div id="metadatCreatorInfo" class="label1" title="Information about the person who created the metadata file">Metadata creator information (*):</div>
										<div class="col-md-10 col-sm-10">
												<div id="metadatCreatorInfoNameLabel" class="label2">Name (*):</div>
												<input id="metadatCreatorInfoNameInput" class="mandatoryField form-control form-control-xl" name="metadatCreatorInfoName" type="text">

												<div id="metadatCreatorInfoRoleLabel" class="label2">Role (*):</div>
												<select id="metadatCreatorInfoRoleSelect" class="form-control form-control-xl" name="metadatCreatorInfoRole">
														<option value="nullValue">----</option>
														<option value="Resource provider">Resource provider</option>
														<option value="Custodian">Custodian</option>
														<option value="Owner">Owner</option>
														<option value="User">user</option>
														<option value="Distibutor">Distributor</option>
														<option value="Originator">Originator</option>
														<option value="Point of contact">Point of contact</option>
														<option value="Principal investigator">Principal investigator</option>
														<option value="Processor">Processor</option>
														<option value="Publisher">Publisher</option>
														<option value="Author">Author</option>
												</select>
										</div>
										<div class="col-md-13 col-sm-13">
												<div id="metadatCreatorInfoMailLabel" class="label2">email (*):</div>
												<input id="metadatCreatorInfoMailInput" class="mandatoryField form-control form-control-l" name="metadatCreatorInfoMail" type="text">

												<div id="metadatCreatorInfoPositionLabel" class="label2 cursorPointer" title="Eg: PhD student, Professor, ...">Position:</div>
												<input id="metadatCreatorInfoPositionInput" class="mandatoryField form-control form-control-l" name="metadatCreatorInfoPosition" type="text">
										</div>
								</div>
						</div>
				</fieldset>
		</fieldset>
</div>


<!--**************************************************************************************** -->
<!--**************************** TEMPORAL AND GEO INFORMATION ****************************** -->
<!--**************************************************************************************** -->
<div id="tempAndGeoInfo">
		<fieldset class="fieldset1">
				<legend class="legend1">Temporal and geographical information</legend>

				<fieldset id="temporalInfo" class="fieldset2">
						<legend class="legend2">Temporal information:</legend>

						<div class="form-group">
								<!--*********************************** TEMPORAL RESOLUTION *********************************** -->
								<div class="label1ContactLegend" id="temporalResolutionText">Temporal resolution (*):</div>
								<div class="col-md-5 col-sm-5">
										<div class="label2 form-control-xxl" id="temporalResolutionTextSelect">Select value:</div>
										<select name="temporalResolution" class="form-control" id="temporalResolutionSelect">
												<option value="nullValue">----</option>
												<option value="Annual">Annual</option>
												<option value="Monthly">Monthly</option>
												<option value="Daily">Daily</option>
												<option value="Hourly">hourly</option>
												<option value="">Other</option>
										</select>
								</div>
								<div class="col-md-13 col-sm-13">
										<div class="label2 form-control-xxl" id="temporalResolFreeTextText">Other resolution:</div>
										<input id="temporalResolFreeTextInput" class="form-control" name="temporalResolution" type="text">
								</div>

								<!--*********************************** TEMPORAL COVERAGE *********************************** -->
								<div id=temporalCoverageContainer>
										<div class="label1" id="temporalCoverageText" title="Period covered (eg: 1997-01-01 to 2005-12-31)">Temporal coverage (*):</div>
										<div class="divFloatLeft">
												<div class="label2 form-control-xxl" id="temporalCoverageBeginText">Begin:</div>
												<div id="temporalCoverageBegin" class="dateInput" name="temporalCoverageBeginName"></div>
										</div>
										<div class="divFloatLeft">
												<div class="label2 form-control-xxl" id="temporalCoverageEndText">End:</div>
												<div id="temporalCoverageEnd" class="dateInput" name="temporalCoverageEndName"></div>
										</div>
								</div>
						</div>
				</fieldset>

				<fieldset id="geographicalInfo" class="fieldset2">
						<legend class="legend2">Geographical information:</legend>

						<div class="form-group">
								<!--*********************************** SPATIAL RESOLUTION *********************************** -->
								<div class="row col-md-24 col-sm-24">
										<div class="label1ContactLegend" id="spatialResolutionLongText" title="Level of detail expressed as a ground distance">Spatial resolution for
												original product (*):
										</div>
										<div class="col-md-5 col-sm-5">
												<div class="label2" id="spatialResolutionLongUnitText">Unit:</div>
												<select id="spatialResolutionUnitLongSelect" class="form-control" name="spatialResolutionLongUnit">
														<option value="Degrees">Degrees</option>
														<option value="Meters">Meters</option>
												</select>
										</div>
										<div id="spatialResolutionValueLongInputRow" class="col-md-6 col-sm-6">
												<div class="label2 cursorPointer" id="spatialResolutionValueLongText" title="Spatial resolution for longitude component">Longitude value:</div>
												<input id="spatialResolutionValueLongInput" class="form-control inLine" name="spatialResolutionValueLong" type="text">
										</div>
										<div id="spatialResolutionValueLatInputRow" class="col-md-6 col-sm-6">
												<div class="label2 cursorPointer" id="spatialResolutionValueLatText" title="Spatial resolution for longitude component">Latitude value:</div>
												<input id="spatialResolutionValueLatInput" class="form-control inLine" name="spatialResolutionValueLat" type="text">
										</div>
										<!--<div class="col-md-7 col-sm-7">
										 <div class="label2 cursorPointer" id="spatialResolutionValueLatText" title="Spatial resolution for latitude component">Latitude value:</div>
										</div>-->

								</div>

								<!--*********************************** SPATIAL COVERAGE *********************************** -->
								<div class="row col-md-24 col-sm-24">
										<div class="label1" id="spatialCoverageText"
												 title="Geographical area where data applied (only degrees).Tip: longitude at the east of Greenwich and latitude at the south of the Ecuador are negative">
												Spatial coverage (*):
										</div>
										<div id="applyGlobalScaleText" class="label2b">Choose global coverage (ie: data covered the entire world):
												<div id="applyGlobalScaleButton" class="cursorPointer inLine">Apply</div>
										</div>
										<div id="applyOtherSpatialCoverageText" class="label2b">Choose other spatial coverage:</div>
										<div id="spatialCoverageDefLim" class="col-md-24 col-sm-24">
												<div class="label2 cursorPointer inLine" id="spatialCoverageNorthText" title="North bound latitude">North:</div>
												<input id="spatialCoverageNorthInput" class="form-control form-control-xxs" name="northBoundLatitude" type="text">

												<div class="label2 cursorPointer inLine" id="spatialCoverageWestText" title="West bound longitude">West:</div>
												<input id="spatialCoverageWestInput" class="form-control form-control-xxs" name="westBoundLongitude" type="text">

												<div class="label2 cursorPointer inLine" id="spatialCoverageEastText" title="East bound longitude">East:</div>
												<input id="spatialCoverageEastInput" class="form-control form-control-xxs" name="eastBoundLongitude" type="text">

												<div class="label2 cursorPointer inLine" id="spatialCoverageSouthText" title="South bound latitude">South:</div>
												<input id="spatialCoverageSouthInput" class="form-control form-control-xxs" name="southBoundLatitude" type="text">
										</div>
										<div class="col-md-24 col-sm-24">
												<div id="applySpatialCovButton" class="cursorPointer inLine">Visualise spatial coverage</div>
												<div id="removeSpatialCovButton" class="cursorPointer inLine">Clear</div>
										</div>
										<div id="containerMapInfoSpatCov" class="col-md-24 col-sm-24">
												<div id='map_element'>
														<div id="mapPanel" class="cursorPointer" title="Click to turn to initial view (entire world)"/>
												</div>
										</div>
								</div>

								<!--*********************************** VERTICAL LEVEL *********************************** -->
								<div class="row col-md-24 col-sm-24">
										<div class="label1" id="verticalLevelText">Vertical level:</div>
										<div class="col-md-11 col-sm-11">
												<div class="label2 form-control-xl" id="selectCategoryVerticalLevelText">Select a vertical level:</div>
												<select name="verticalLevel" class="form-control form-control-xl" id="selectCategoryVerticalLevelSelect">
														<option value="None">None</option>
														<option value="Atmospheric levels">Atmospheric levels</option>
														<option value="Surface level">Surface level</option>
														<option value="Below-ground levels">Below-ground levels</option>
														<option value="">Other</option>
												</select>
										</div>

										<div id="verticalLevelOtherContainer" class="col-md-11 col-sm-11">
												<div class="label2 form-control-xl" id="verticalLevelFreeTextText">Other vertical level:</div>
												<input id="verticalLevelFreeTextInput" class="form-control form-control-xxl" name="verticalLevel" type="text">
										</div>
								</div>
						</div>
				</fieldset>
		</fieldset>
</div>

<!--**************************************************************************************** -->
<!--******************************** PRODUCT DESCRIPTION *********************************** -->
<!--**************************************************************************************** -->
<div id="productDetailsrow">
		<fieldset class="fieldset1" id="productDetailsfieldset1">
				<legend class="legend1">Product description (methodology)</legend>
				<div class="form-group">
						<div id="productDetailsdescription" class="row col-md-24 col-sm-24">
								<div class="label1ContactLegend cursorPointer" id="productDetailsDescriptionText"
										 title="Eg: 'Step 1: Compilation of satelite data from ...' 'Step 2: We applied to these data a model based on ...' ">Describe step by step how your product was
										built:
								</div>
								<div id="productDetailsDescriptionContainer"></div>
								<!-- Is full dynamically by js (with div id= productDetailsDescriptionContainer + -->
								<div id="productDetailsContainerButton" class="row col-md-24 col-sm-24">
										<div title="Click to add steps">Add steps (5 maximum): <img id="addProductDetailsStepButton" src="img/addChamp.png"
																																								class="img-responsive img-rounded addQuitAllContainer cursorPointer"></div>
								</div>
						</div>
						<div id="addProductDetailsdescription" class="row col-md-24 col-sm-24">
								<div class="label1ContactLegend" id="addDetailsDescriptionText">Document to illustrate the description above:</div>
								<div class="label2 form-control-l" id="addDocProductDetailsStepText">URL for additional description:</div>
								<input id="addDocProductDetailsStepInput" class="form-control form-control-l" name="addDocProductDetailsStep" type="text">

								<div class="label2 form-control-xxl cursorPointer" id="addDocDescripProductDetailsStepText">Comments about the url document:</div>
								<textarea id="addDocDescripProductDetailsStepTextArea" class="form-control-l" name="addDocDescripProductDetailsStep" rows="1" cols="60"></textarea>
						</div>
				</div>
		</fieldset>
</div>


<!--**************************************************************************************** -->
<!--******************************* KEYWORDS AND REFERENCE ********************************* -->
<!--**************************************************************************************** -->
<div id="keywordsAbstractAndCitation">
		<fieldset class="fieldset1" id="keywordsAndAbstractAndCitationsFieldset">
				<legend class="legend1">Keywords and reference</legend>

				<fieldset id="keywordsAndAbstractFieldset" class="fieldset2">
						<legend class="legend2">Keywords:</legend>

						<div class="form-group">
								<!--*********************************** LIST OF KEYWORDS *********************************** -->
								<div class="label1ContactLegend" id="keywordsInfoText">List of keywords describing the product:</div>
								<input id="keywordsInfoInput" class="form-control form-control-m" name="keywordsInfo" type="text">
						</div>
				</fieldset>
				<div id="referenceTitleBeforeAdd" class="row col-md-24 col-sm-24">
						<!--<legend class="legend2">Reference(s):</legend>-->
				</div>

				<!-- Divs dynamically built with the 'createReferenceFieldset' function (metadataGCAForm_script.js) -->
				<div id="referencesContainer"></div>

				<div id="referencesContainerButton" class="row col-md-24 col-sm-24">
						<div class="cursorPointer addQuitAllContainerText" title="Click to add reference information (no more than 5)">Add reference information (5 maximum) :
								<img id="addReferenceInfoButton" src="img/addChamp.png" class="img-responsive img-rounded addQuitAllContainer cursorPointer">
						</div>
				</div>
		</fieldset>
</div>


<!--**************************************************************************************** -->
<!--******************************* QUALITY DATA INFORMATION ******************************* -->
<!--**************************************************************************************** -->
<div id="qualityDataInformation">
		<fieldset class="fieldset1" id="qualityDataInformationFieldset">
				<legend class="legend1">Quality data information</legend>

				<div class="label1ContactLegend form-control-xxl" id="discoveredIssueText" title="Describe here relevant issues identified with the quality related to this data.">
						Quality description (availability of product-errors, product evaluation, ...) (*):
				</div>
				<textarea id="discoveredIssueArea" name="discoveredIssueQualityData" rows="5" class="form-control-l"></textarea>

				<div class="label2 form-control-xxl" id="standAloneText" title="Reference to a document to illustrate quality description">URL for additional quality description:</div>
				<input id="standAloneInput" class="form-control form-control-l" name="standAloneName" type="text">

				<div class="col-md-24 col-sm-24">
						<div class="label2 form-control-xxl" id="addDocDescripQualityInfoText">Comments about the url document:
						</div>
						<textarea id="addDocDescripQualityInfoTextTextArea" name="addDocDescripQualityInfo" class="form-control-l" rows="2" cols="60"></textarea>
				</div>
		</fieldset>
</div>


<!--**************************************************************************************** -->
<!--************************** DATA ACCESS AND DATA USE POLICY ***************************** -->
<!--**************************************************************************************** -->
<div id="accessAndUseLimitations">
		<fieldset class="fieldset1" id="accessAndUseLimitationsFieldset">
				<legend class="legend1">Data access and data use policy</legend>

				<div class="form-group">
						<!--*********************************** PI *********************************** -->
						<div class="col-md-24 col-sm-24">
								<div class="label1ContactLegend form-control-l" id="principalInvestigatorContactText">Principal Investigator (PI) contact (*):</div>
								<div class="col-md-13 col-sm-13">
										<div class="label2 form-control-xxl" id="principalInvestigatorContactNameText">Name (*):</div>
										<input id="principalInvestigatorContactNameInput" class="form-control sameWidthReferenceClass" name="principalInvestigatorContactName" type="text">
								</div>
								<div class="col-md-10 col-sm-10">
										<div class="label2" id="principalInvestigatorContactPhoneText">Phone:</div>
										<input id="principalInvestigatorContactPhoneInput" class="form-control" name="principalInvestigatorContactPhone" type="text">
								</div>
						</div>
						<div class="col-md-24 col-sm-24">
								<div class="col-md-13 col-sm-13">
										<div class="label2 form-control-xxl" id="principalInvestigatorContactMailText">email (*):</div>
										<input id="principalInvestigatorContactMailInput" class="form-control sameWidthReferenceClass" name="principalInvestigatorContactMail" type="text">
								</div>
						</div>

						<!--*********************************** ORIGINAL DATA URL *********************************** -->
						<div class="col-md-13 col-sm-13">
								<div class="label1 form-control-xxl" id="originalDataUrlText">Original data URL:</div>
								<input id="originalDataUrlInput" class="form-control sameWidthReferenceClass" name="originalDataUrl" type="text">
						</div>

						<!--*********************************** DATA POLICY *********************************** -->
						<div class="col-md-24 col-sm-24">
								<div class="label1 form-control-l" id="dataPolicyText">Data policy (*):</div>
						</div>
						<div class="col-md-24 col-sm-24">
								<div class="label2 form-control-xxl" id="dataPolicyChooseText">Select a data policy:</div>
								<select id="dataPolicyChooseSelect" class="form-control form-control-m" name="dataPolicy" type="text">
										<option value="nullValue">----</option>
										<option value="Free to use">Free to use</option>
										<option value="Restricted to scientists">Restricted to scientists-Free to use</option>
										<option value="Not free: contact PI">Not free: contact PI</option>
										<option value="">Other</option>
								</select>
						</div>
						<div id="dataPolicyFreeContainer" class="col-md-24 col-sm-24">
								<div class="label2 form-control-xxl" id="dataPolicyFreeText">Other data policy:</div>
								<textarea id="dataPolicyFreeInput" name="dataPolicy" rows="3" cols="60"></textarea>
						</div>
				</div>
		</fieldset>
</div>

<input id="submitFormButon" type="submit" value="Submit"/>

</form>
<div id="showResultButton" class="cursorPointer"
		 title="Visualise the result of the metadata file. You can change your answers if you are not satisfied (You have to turn to submit the form before!)" style="display:none">
		Show the result
</div>
</div>


<script text="text/javascript">
// See http://www.jankoatwarpspeed.com/turn-any-webform-into-a-powerful-wizard-with-jquery-formtowizard-plugin/
$( document ).ready( function()
{
		// Load properties file
		jQuery.i18n.properties( {
				name:'bobcat',
				path:'../',
				language:null,
				mode:'both'
		} );

// *************************************************************************************************************************** //
// *********************************** Construct a map to visualise spatial coverage ***************************************** //
// *************************************************************************************************************************** //
		// Build map
		var map = new OpenLayers.Map( 'map_element', {
				resolutions: [0.703125,0.3515625,0.17578125,0.087890625,0.0439453125]
		} );

		var landMaskLayer = new OpenLayers.Layer.WMS(
						"Land mask",
						"http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
		{   VERSION: '1.1.1',
				LAYERS: "GCA:GCA_landMask",
				transparent: true,
				FORMAT: 'image/png'
		}, {
				isBaseLayer: true,
				opacity: 1
		} );

		var frontiersLayer = new OpenLayers.Layer.WMS(
						"Frontiers",
						"http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
		{   VERSION: '1.1.1',
				LAYERS: "GCA:GCA_frontiersCountryAndRegions",
				transparent: true,
				FORMAT: 'image/png'
		}, {
				isBaseLayer: false,
				opacity: 1
		} );

		var graticulesLayer = new OpenLayers.Layer.WMS(
						"Graticules",
						"http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
		{   VERSION: '1.1.1',
				LAYERS: "GCA:GCA_graticules01_05_10",
				transparent: true,
				FORMAT: 'image/png'
		}, {
				isBaseLayer: false,
				opacity: 1
		} );

		// Add zoomToMAxExtent control
		var navigation_control = new OpenLayers.Control.Navigation();
		var control_panel = new OpenLayers.Control.Panel( {
				div: document.getElementById( "mapPanel" )
		} );
		control_panel.addControls( [new OpenLayers.Control.ZoomToMaxExtent()] );
		map.addControl( control_panel );

		map.addLayers( [landMaskLayer, frontiersLayer, graticulesLayer] );

		// Set initial map view
		map.setCenter( new OpenLayers.LonLat( 0, 0 ) );
		map.zoomTo( 0 );// f(resolutions array from map constructor).

		// Choose global scale
		$( "#applyGlobalScaleButton" ).click( function()
		{
				$( "#spatialCoverageNorthInput" ).val( 90 );
				$( "#spatialCoverageWestInput" ).val( -180 );
				$( "#spatialCoverageEastInput" ).val( 180 );
				$( "#spatialCoverageSouthInput" ).val( -90 );
		} );

		// Build spatial coverage
		$( "#applySpatialCovButton" ).click( function()
		{
				var vector_layer = new OpenLayers.Layer.Vector( 'Basic Vector Layer' );
				map.addLayer( vector_layer );
				var limNorth = $( '#spatialCoverageNorthInput' ).val();
				var limSouth = $( '#spatialCoverageSouthInput' ).val();
				var limWest = $( '#spatialCoverageWestInput' ).val();
				var limEast = $( '#spatialCoverageEastInput' ).val();
				var geom_point_1 = new OpenLayers.Geometry.Point( limWest, limNorth );
				var geom_point_2 = new OpenLayers.Geometry.Point( limEast, limNorth );
				var geom_point_3 = new OpenLayers.Geometry.Point( limEast, limSouth );
				var geom_point_4 = new OpenLayers.Geometry.Point( limWest, limSouth );
				var geom_linear_ring = new OpenLayers.Geometry.LinearRing( [ geom_point_1, geom_point_2, geom_point_3, geom_point_4] );
				var feature_linear_ring = new OpenLayers.Feature.Vector( geom_linear_ring );
				map.layers[3].addFeatures( feature_linear_ring );
		} );

		// Remove spatial cov on map
		$( "#removeSpatialCovButton" ).click( function()
		{
				map.layers[3].destroy();
		} );
		// ******************************************************************** //

		// Create menu band
		$( "#metadataForm" ).formToWizard();

		// Manage divs
		manageFormDiv();

		// Init data contributor with one row
		createContributorDiv( "contributorsContainer", 1 );

		// Init product description with one row
		createProductDescrStepDiv( "productDetailsDescriptionContainer", 1 );

		createReferenceFieldset( "referencesContainer", 1 );

		// Add validators to form
		$( "#metadataForm" ).jqxValidator( {rules: validatorRules} );

		// Show error(s) if some:
		$( "#metadataForm" ).submit( function( event )
		{
				validateForm();
				event.preventDefault();
		} );

		$( '#metadataForm' ).on( 'validationError', function ( event )
		{
				var errorNumber = (event.args.invalidInputs.length) / 2;
				alert( "Some fields are empty or incorrect. Please check your form : " + errorNumber + " errors." );
		} );

		// Keeping file (call php which create and keep xml file) if all ok:
		$( '#metadataForm' ).on( 'validationSuccess', function ( event )
		{
				alert( "Thanks. Your form is completed and has been submited to the system." );
				$( "#showResultButton" ).show();

				var dateFillForm = new Date();
				var dateFillFormIso = dateFillForm.toISOString();// name of the xml file created based on this parameter, to be sure to have unique name.

				// For Inputs
				var prodTypeInput = "";
				var prodCatInput = "";
				if( "" == $( "#dataProductTypeSelect" ).val() )
						prodTypeInput = $( "#dataProductTypeFreeTextInput" ).val();
				if( "" == $( "#dataProductCategorySelect" ).val() )
						prodCatInput = $( "#dataProductCategoryFreeTextInput" ).val();

				// For Selects
				var prodTypeSelect = "";
				var prodCatSelect = "";
				if( !$( "#dataProductTypeFreeTextInput" ).is( ':visible' ) )
						prodTypeSelect = $( "#dataProductTypeSelect" ).val();
				if( !$( "#dataProductCategoryFreeTextInput" ).is( ':visible' ) )
						prodCatSelect = $( "#dataProductCategorySelect" ).val();

				var prodTitle = $( "#prodNameTitleInput" ).val();
				var prodVersion = $( "#prodNameVersionInput" ).val();

				var linkToXml2 = prodTypeSelect + prodTypeInput + "_" + prodCatSelect + prodCatInput + "_" + prodTitle + "_" + prodVersion + "_" + dateFillFormIso;

				$( "#showResultButton" ).click( function()
				{
						window.open( "xmlDoneByForm/" + linkToXml2 + ".xml", "Metatada of the file:", "status=1, scrollbars=1, resizable=1" ); // Must give access right to folder.
				} );


				var nDataContributors = $( 'input[id^="dataProducerInfoNameInput"]' ).length;
				var nReferences = $( 'input[id^="citationTitleInput"]' ).length;
				var nDescriptionSteps = $( 'textarea[id^="textAreaProductDetails"]' ).length;

				var dataDateCreation = $( this ).find( "input[name=dataDateCreation]" ).val();
				var dataProductTypeSelect = $( this ).find( "select[name=dataProductType]" ).val();
				var dataProductTypeInput = $( this ).find( "input[name=dataProductType]" ).val();
				var dataProductCategorySelect = $( this ).find( "select[name=dataProductCategory]" ).val();
				var dataProductCategoryInput = $( this ).find( "input[name=dataProductCategory]" ).val();
				var prodNameTitle = $( this ).find( "input[name=prodNameTitle]" ).val();
				var prodNameVersion = $( this ).find( "input[name=prodNameVersion]" ).val();
				var dataAbstract = $( this ).find( "textarea[name=dataAbstract]" ).val();
				var dataProducerInfoName1 = $( this ).find( "input[name=dataProducerInfoName1]" ).val();
				var dataProducerInfoName11 = $( this ).find( "input[name=dataProducerInfoName11]" ).val();
				var dataProducerInfoName111 = $( this ).find( "input[name=dataProducerInfoName111]" ).val();
				var dataProducerInfoName1111 = $( this ).find( "input[name=dataProducerInfoName1111]" ).val();
				var dataProducerInfoName11111 = $( this ).find( "input[name=dataProducerInfoName11111]" ).val();
				var dataProducerInfoOrganisation1 = $( this ).find( "input[name=dataProducerInfoOrganisation1]" ).val();
				var dataProducerInfoOrganisation11 = $( this ).find( "input[name=dataProducerInfoOrganisation11]" ).val();
				var dataProducerInfoOrganisation111 = $( this ).find( "input[name=dataProducerInfoOrganisation111]" ).val();
				var dataProducerInfoOrganisation1111 = $( this ).find( "input[name=dataProducerInfoOrganisation1111]" ).val();
				var dataProducerInfoOrganisation11111 = $( this ).find( "input[name=dataProducerInfoOrganisation11111]" ).val();
				var dataProducerInfoMail1 = $( this ).find( "input[name=dataProducerInfoMail1]" ).val();
				var dataProducerInfoMail11 = $( this ).find( "input[name=dataProducerInfoMail11]" ).val();
				var dataProducerInfoMail111 = $( this ).find( "input[name=dataProducerInfoMail111]" ).val();
				var dataProducerInfoMail1111 = $( this ).find( "input[name=dataProducerInfoMail1111]" ).val();
				var dataProducerInfoMail11111 = $( this ).find( "input[name=dataProducerInfoMail11111]" ).val();
				var dataProducerInfoRole1 = $( this ).find( "select[name=dataProducerInfoRole1]" ).val();
				var dataProducerInfoRole11 = $( this ).find( "select[name=dataProducerInfoRole11]" ).val();
				var dataProducerInfoRole111 = $( this ).find( "select[name=dataProducerInfoRole111]" ).val();
				var dataProducerInfoRole1111 = $( this ).find( "select[name=dataProducerInfoRole1111]" ).val();
				var dataProducerInfoRole11111 = $( this ).find( "select[name=dataProducerInfoRole11111]" ).val();
				var dataProducerInfoPosition1 = $( this ).find( "input[name=dataProducerInfoPosition1]" ).val();
				var dataProducerInfoPosition11 = $( this ).find( "input[name=dataProducerInfoPosition11]" ).val();
				var dataProducerInfoPosition111 = $( this ).find( "input[name=dataProducerInfoPosition111]" ).val();
				var dataProducerInfoPosition1111 = $( this ).find( "input[name=dataProducerInfoPosition1111]" ).val();
				var dataProducerInfoPosition11111 = $( this ).find( "input[name=dataProducerInfoPosition11111]" ).val();
				var metadataDateCreation = $( this ).find( "input[name=metadataDateCreation]" ).val();
				var metadatCreatorInfoName = $( this ).find( "input[name=metadatCreatorInfoName]" ).val();
				var metadatCreatorInfoMail = $( this ).find( "input[name=metadatCreatorInfoMail]" ).val();
				var metadatCreatorInfoRole = $( this ).find( "select[name=metadatCreatorInfoRole]" ).val();
				var metadatCreatorInfoPosition = $( this ).find( "input[name=metadatCreatorInfoPosition]" ).val();
				// Temp and geo info
				var temporalResolutionSelect = $( this ).find( "select[name=temporalResolution]" ).val();
				var temporalResolutionInput = $( this ).find( "input[name=temporalResolution]" ).val();
				var temporalCoverageBeginName = $( this ).find( "input[name=temporalCoverageBeginName]" ).val();
				var temporalCoverageEndName = $( this ).find( "input[name=temporalCoverageEndName]" ).val();
				var westBoundLongitude = $( this ).find( "input[name=westBoundLongitude]" ).val();
				var eastBoundLongitude = $( this ).find( "input[name=eastBoundLongitude]" ).val();
				var southBoundLatitude = $( this ).find( "input[name=southBoundLatitude]" ).val();
				var northBoundLatitude = $( this ).find( "input[name=northBoundLatitude]" ).val();
				var verticalLevelSelect = $( this ).find( "select[name=verticalLevel]" ).val();
				var verticalLevelInput = $( this ).find( "input[name=verticalLevel]" ).val();
				var spatialResolutionLongUnit = $( this ).find( "select[name=spatialResolutionLongUnit]" ).val();
				var spatialResolutionLongValue = $( this ).find( "input[name=spatialResolutionValueLong]" ).val();
				var spatialResolutionLatValue = $( this ).find( "input[name=spatialResolutionValueLat]" ).val();
				// Product description
				var productDetails1 = $( this ).find( "textarea[name=productDetailsStep1]" ).val();
				var productDetails11 = $( this ).find( "textarea[name=productDetailsStep11]" ).val();
				var productDetails111 = $( this ).find( "textarea[name=productDetailsStep111]" ).val();
				var productDetails1111 = $( this ).find( "textarea[name=productDetailsStep1111]" ).val();
				var productDetails11111 = $( this ).find( "textarea[name=productDetailsStep11111]" ).val();
				var addDocProductDetails = $( this ).find( "input[name=addDocProductDetailsStep]" ).val();
				var addDocDescriptionProductDetails = $( this ).find( "textarea[name=addDocDescripProductDetailsStep]" ).val();
				// Keywords and ref
				var keywordsInfo = $( this ).find( "input[name=keywordsInfo]" ).val();
				var citationTitle1 = $( this ).find( "input[name=citationTitle1]" ).val();
				var citationTitle11 = $( this ).find( "input[name=citationTitle11]" ).val();
				var citationTitle111 = $( this ).find( "input[name=citationTitle111]" ).val();
				var citationTitle1111 = $( this ).find( "input[name=citationTitle1111]" ).val();
				var citationTitle11111 = $( this ).find( "input[name=citationTitle11111]" ).val();
				var citationBookDate1 = $( this ).find( "input[name=citationBookDate1]" ).val();
				var citationBookDate11 = $( this ).find( "input[name=citationBookDate11]" ).val();
				var citationBookDate111 = $( this ).find( "input[name=citationBookDate111]" ).val();
				var citationBookDate1111 = $( this ).find( "input[name=citationBookDate1111]" ).val();
				var citationBookDate11111 = $( this ).find( "input[name=citationBookDate11111]" ).val();
				var citationAuthorName1 = $( this ).find( "input[name=citationAuthorName1]" ).val();
				var citationAuthorName11 = $( this ).find( "input[name=citationAuthorName11]" ).val();
				var citationAuthorName111 = $( this ).find( "input[name=citationAuthorName111]" ).val();
				var citationAuthorName1111 = $( this ).find( "input[name=citationAuthorName1111]" ).val();
				var citationAuthorName11111 = $( this ).find( "input[name=citationAuthorName11111]" ).val();
				var citationAuthorOrganisation1 = $( this ).find( "input[name=citationAuthorOrganisation1]" ).val();
				var citationAuthorOrganisation11 = $( this ).find( "input[name=citationAuthorOrganisation11]" ).val();
				var citationAuthorOrganisation111 = $( this ).find( "input[name=citationAuthorOrganisation111]" ).val();
				var citationAuthorOrganisation1111 = $( this ).find( "input[name=citationAuthorOrganisation1111]" ).val();
				var citationAuthorOrganisation11111 = $( this ).find( "input[name=citationAuthorOrganisation11111]" ).val();
				var nameMagazine1 = $( this ).find( "input[name=nameMagazine1]" ).val();
				var nameMagazine11 = $( this ).find( "input[name=nameMagazine11]" ).val();
				var nameMagazine111 = $( this ).find( "input[name=nameMagazine111]" ).val();
				var nameMagazine1111 = $( this ).find( "input[name=nameMagazine1111]" ).val();
				var nameMagazine11111 = $( this ).find( "input[name=nameMagazine11111]" ).val();
				var citationDOI1 = $( this ).find( "input[name=citationDOI1]" ).val();
				var citationDOI11 = $( this ).find( "input[name=citationDOI11]" ).val();
				var citationDOI111 = $( this ).find( "input[name=citationDOI111]" ).val();
				var citationDOI1111 = $( this ).find( "input[name=citationDOI1111]" ).val();
				var citationDOI11111 = $( this ).find( "input[name=citationDOI11111]" ).val();
				var citationBookCategory1 = $( this ).find( "select[name=citationBookCategory1]" ).val();
				var citationBookCategory11 = $( this ).find( "select[name=citationBookCategory11]" ).val();
				var citationBookCategory111 = $( this ).find( "select[name=citationBookCategory111]" ).val();
				var citationBookCategory1111 = $( this ).find( "select[name=citationBookCategory1111]" ).val();
				var citationBookCategory11111 = $( this ).find( "select[name=citationBookCategory11111]" ).val();
				var citationOnlineRessource1 = $( this ).find( "input[name=citationOnlineRessource1]" ).val();
				var citationOnlineRessource11 = $( this ).find( "input[name=citationOnlineRessource11]" ).val();
				var citationOnlineRessource111 = $( this ).find( "input[name=citationOnlineRessource111]" ).val();
				var citationOnlineRessource1111 = $( this ).find( "input[name=citationOnlineRessource1111]" ).val();
				var citationOnlineRessource11111 = $( this ).find( "input[name=citationOnlineRessource11111]" ).val();
				// Quality information
				var qualityDescription = $( this ).find( "textarea[name=discoveredIssueQualityData]" ).val();
				var docRelatedToQualityDescUrl = $( this ).find( "input[name=standAloneName]" ).val();
				var docRelatedToQualityDescDesc = $( this ).find( "textarea[name=addDocDescripQualityInfo]" ).val();

				// data access and policy
				var principalInvestigatorContactName = $( this ).find( "input[name=principalInvestigatorContactName]" ).val();
				var principalInvestigatorContactMail = $( this ).find( "input[name=principalInvestigatorContactMail]" ).val();
				var principalInvestigatorContactPhone = $( this ).find( "input[name=principalInvestigatorContactPhone]" ).val();
				var originalDataUrl = $( this ).find( "input[name=originalDataUrl]" ).val();
				var dataPolicy = $( this ).find( "select[name=dataPolicy]" ).val();

				// WARNING : really ugly all these variables !! Use instead $( "#metadataForm" ).serialize() to send dynamically all form variables !
				// $.post( "receiveAndKeepInfoFromForm.php", $( "#metadataForm" ).serialize() );
				var post = {dateFillFormIsoPost: dateFillFormIso, nDataContributorsPost: nDataContributors, nReferencesPost: nReferences, nDescriptionStepsPost: nDescriptionSteps, dataDateCreationPost: dataDateCreation, dataProductTypeSelectPost: dataProductTypeSelect, dataProductTypeInputPost: dataProductTypeInput, dataProductCategorySelectPost: dataProductCategorySelect, dataProductCategoryInputPost: dataProductCategoryInput, prodNameTitlePost: prodNameTitle, prodNameVersionPost: prodNameVersion, dataAbstractPost: dataAbstract, dataProducerInfoName1Post: dataProducerInfoName1, dataProducerInfoName11Post: dataProducerInfoName11, dataProducerInfoName111Post: dataProducerInfoName111, dataProducerInfoName1111Post: dataProducerInfoName1111, dataProducerInfoName11111Post: dataProducerInfoName11111, dataProducerInfoOrganisation1Post: dataProducerInfoOrganisation1, dataProducerInfoOrganisation11Post: dataProducerInfoOrganisation11, dataProducerInfoOrganisation111Post: dataProducerInfoOrganisation111, dataProducerInfoOrganisation1111Post: dataProducerInfoOrganisation1111, dataProducerInfoOrganisation11111Post: dataProducerInfoOrganisation11111, dataProducerInfoMail1Post: dataProducerInfoMail1, dataProducerInfoMail11Post: dataProducerInfoMail11, dataProducerInfoMail111Post: dataProducerInfoMail111, dataProducerInfoMail1111Post: dataProducerInfoMail1111, dataProducerInfoMail11111Post: dataProducerInfoMail11111, dataProducerInfoRole1Post: dataProducerInfoRole1, dataProducerInfoRole11Post: dataProducerInfoRole11, dataProducerInfoRole111Post: dataProducerInfoRole111, dataProducerInfoRole1111Post: dataProducerInfoRole1111, dataProducerInfoRole11111Post: dataProducerInfoRole11111, dataProducerInfoPosition1Post: dataProducerInfoPosition1,dataProducerInfoPosition11Post: dataProducerInfoPosition11,dataProducerInfoPosition111Post: dataProducerInfoPosition111, dataProducerInfoPosition1111Post: dataProducerInfoPosition1111, dataProducerInfoPosition11111Post: dataProducerInfoPosition11111, metadataDateCreationPost: metadataDateCreation, metadatCreatorInfoNamePost: metadatCreatorInfoName, metadatCreatorInfoMailPost: metadatCreatorInfoMail, metadatCreatorInfoRolePost: metadatCreatorInfoRole, metadatCreatorInfoPositionPost: metadatCreatorInfoPosition, temporalResolutionSelectPost: temporalResolutionSelect, temporalResolutionInputPost: temporalResolutionInput, temporalCoverageBeginNamePost: temporalCoverageBeginName, temporalCoverageEndNamePost: temporalCoverageEndName, westBoundLongitudePost: westBoundLongitude, eastBoundLongitudePost: eastBoundLongitude, southBoundLatitudePost: southBoundLatitude, northBoundLatitudePost: northBoundLatitude, verticalLevelSelectPost: verticalLevelSelect, verticalLevelInputPost: verticalLevelInput, spatialResolutionLongUnitPost: spatialResolutionLongUnit, spatialResolutionLongValuePost: spatialResolutionLongValue, spatialResolutionLatValuePost: spatialResolutionLatValue, productDetails1Post: productDetails1, productDetails11Post: productDetails11, productDetails111Post: productDetails111, productDetails1111Post: productDetails1111, productDetails11111Post: productDetails11111, addDocProductDetailsPost: addDocProductDetails, addDocDescriptionProductDetailsPost: addDocDescriptionProductDetails, keywordsInfoPost: keywordsInfo, citationTitle1Post: citationTitle1, citationTitle11Post: citationTitle11, citationTitle111Post: citationTitle111, citationTitle1111Post: citationTitle1111, citationTitle11111Post: citationTitle11111, citationBookDate1Post: citationBookDate1, citationBookDate11Post: citationBookDate11, citationBookDate111Post: citationBookDate111, citationBookDate1111Post: citationBookDate1111, citationBookDate11111Post: citationBookDate11111, citationAuthorName1Post: citationAuthorName1, citationAuthorName11Post: citationAuthorName11, citationAuthorName111Post: citationAuthorName111, citationAuthorName1111Post: citationAuthorName1111, citationAuthorName11111Post: citationAuthorName11111, citationAuthorOrganisation1Post: citationAuthorOrganisation1, citationAuthorOrganisation11Post: citationAuthorOrganisation11, citationAuthorOrganisation111Post: citationAuthorOrganisation111, citationAuthorOrganisation1111Post: citationAuthorOrganisation1111, citationAuthorOrganisation11111Post: citationAuthorOrganisation11111, nameMagazine1Post: nameMagazine1, nameMagazine11Post: nameMagazine11, nameMagazine111Post: nameMagazine111, nameMagazine1111Post: nameMagazine1111, nameMagazine11111Post: nameMagazine11111, citationDOI1Post: citationDOI1, citationDOI11Post: citationDOI11, citationDOI111Post: citationDOI111, citationDOI1111Post: citationDOI1111, citationDOI11111Post: citationDOI11111, citationBookCategory1Post: citationBookCategory1, citationBookCategory11Post: citationBookCategory11, citationBookCategory111Post: citationBookCategory111, citationBookCategory1111Post: citationBookCategory1111, citationBookCategory11111Post: citationBookCategory11111, citationOnlineRessource1Post: citationOnlineRessource1, citationOnlineRessource11Post: citationOnlineRessource11, citationOnlineRessource111Post: citationOnlineRessource111, citationOnlineRessource1111Post: citationOnlineRessource1111, citationOnlineRessource11111Post: citationOnlineRessource11111, qualityDescriptionPost: qualityDescription, docRelatedToQualityDescUrlPost: docRelatedToQualityDescUrl, docRelatedToQualityDescDescPost: docRelatedToQualityDescDesc, principalInvestigatorContactNamePost: principalInvestigatorContactName, principalInvestigatorContactMailPost: principalInvestigatorContactMail, principalInvestigatorContactPhonePost: principalInvestigatorContactPhone, originalDataUrlPost: originalDataUrl, dataPolicyPost: dataPolicy};
				$.post( "receiveAndKeepInfoFromForm.php", post )
								.done( function( data )
				{
						// Send mail to administrator to manage metadata & to creator
						var userFileUrl = location.href.split( '/' ).slice( 0, -1 ).join( "/" );
						sendMails( JSON.parse( jQuery.i18n.prop( "metadataFormMailListTo" ) ), jQuery.i18n.prop( "metadataFormMailListFrom" ), ["xmlDoneByForm/" + linkToXml2 + ".xml", userFileUrl + "/xmlDoneByForm/" + linkToXml2 + ".xml"], true );
						sendMails( metadatCreatorInfoMail, jQuery.i18n.prop( "metadataFormMailListFrom" ), [userFileUrl + "/xmlDoneByForm/" + linkToXml2 + ".xml"], false );
				} );
		} );

} );

</script>

</body>
<html>
