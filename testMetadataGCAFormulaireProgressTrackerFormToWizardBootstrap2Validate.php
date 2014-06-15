<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Pour les telephones-->

    <title>Test metadat GCA</title>
    <!-- Chgment css par default (avec http://getbootstrap.com/customize/?id=10472302) : 24 colonnes et 0px entre chq.-->
    <link rel="stylesheet" href="bootstrapCustom/css/bootstrap.css" media="screen"/>
    <link rel="stylesheet" href="css/testMetadataGCAFormulaireBootstrap.css"/>
    <script type="text/javascript" src="js/library/jquery-1.9.1.js"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script type="text/javascript" src="js/library/formToWizardBootstrapValidate.js"></script>
    <!-- CF  http://www.jankoatwarpspeed.com/turn-any-webform-into-a-powerful-wizard-with-jquery-formtowizard-plugin/ Pas mal adapté, je m'y suis juste inspiré. -->
    <link rel="stylesheet" href="js/library/jqwidgets-ver3.2.1/jqwidgets/styles/jqx.base.css"/>
    <link rel="stylesheet" href="js/library/jqwidgets-ver3.2.1/jqwidgets/styles/jqx.bootstrap.css"/>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxvalidator.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxmaskedinput.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxinput.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxcalendar.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/globalization/globalize.js"></script>
    <!--Pour appel et gestion xml metadat comme DOM object :-->
    <script type="text/javascript" src="accessXmlMetadat.js"></script>

    <script type="text/javascript" src="js/metadataGCAFormValidationRules_script.js"></script>
    <script type="text/javascript" src="js/metadataGCAForm_script.js"></script>

</head>

<body>
<div class="container-fluid">

<!--<form id="metadataForm" method="post" action="testForm2.php">-->
<form id="metadataForm" method="post">
<!--form id= "metadataForm" method= "post" action="testForm.php" onsubmit= "return verificationChamps();">--><!-- Tester que sur la derniere page donc !-->
<div id="mandatoryFieldIndication" class="col-md-24 col-sm-24">(*): mandatory fields</div>

<div id="errorsValidation" class="col-md-24 col-sm-24"></div>


<div class="row col-md-push-7 col-md-9 col-sm-push-7 col-sm-9">
<!--**************************************************************************************** -->
<!--*********************************** BASIC INFORMATION ********************************** -->
<!--**************************************************************************************** -->
<div id="basicInformation">
    <fieldset class="fieldset1">
        <legend class="legend1">Basic information</legend>

        <fieldset id="basicInfoDataFile" class="fieldset2">
            <legend class="legend2">About data:</legend>

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
                    <div class="col-md-9 col-sm-9">
                        <div class="label2 form-control-xxl" id="dataProductTypeSelectText">Product type (*):</div>
                        <select id="dataProductTypeSelect" class="form-control form-control-xl" name="dataProductType">
                            <option value="nullValue">----</option>
                            <option value="CO2_flux">CO2 flux</option>
                            <option value="Carbon_stock">Carbon stock</option>
                            <option value="CH4_flux">CH4 flux</option>
                            <option value="">Other</option>
                        </select>
                    </div>
                    <div class="col-md-14 col-sm-14">
                        <div class="label2" id="dataProductTypeFreeTextText">Other type (free text):</div>
                        <input id="dataProductTypeFreeTextInput" class="form-control form-control-m" name="dataProductType" type="text">
                    </div>
                </div>

                <div id="prodCategoryRow" class="row col-md-24 col-sm-24">
                    <div class="col-md-9 col-sm-9">
                        <div class="label2 form-control-xxl" id="dataProductCategorySelectText">Product category (*):</div>
                        <select class="form-control form-control-xl dataProductCategoryClass" id="dataProductCategorySelect" name="dataProductCategory">
                            <option value="nullValue">----</option>
                            <option value="Inversion_model">Inversion model</option>
                            <option value="Land_model">Land model</option>
                            <option value="Ocean_model">Ocean model</option>
                            <option value="">Other</option>
                        </select>
                    </div>
                    <div class="col-md-14 col-sm-14">
                        <div class="label2" id="dataProductCategoryFreeTextText">Other category (free text):</div>
                        <input id="dataProductCategoryFreeTextInput" class="form-control form-control-m" name="dataProductCategory" type="text">
                    </div>
                </div>
            </div>

            <div id="prodNameTitleAndVersion" class="row col-md-24 col-sm-24">
                <div class="col-md-9 col-sm-9">
                    <div class="label2 form-control-xxl" id="prodNameTitleText">Product title (*):</div>
                    <input id="prodNameTitleInput" class="form-control form-control-xl mandatoryField" name="prodNameTitle" type="text">
                </div>
                <div class="col-md-14 col-sm-14">
                    <div class="label2 form-control-xxl" id="prodNameVersionText">Product version (*):</div>
                    <input id="prodNameVersionInput" class="form-control form-control-m" name="prodNameVersion" type="text">
                </div>
            </div>

                <!--*********************************** DATA ABSTRACT *********************************** -->
	       <div class= "row col-md-24 col-sm-24">
                <div class="label1 row " id="dataAbstractText"
                     title="Describe your data in few words">Data abstract (*):
                </div>
            	<div id="dataAbstractId" class="row col-md-24 col-sm-24">
                    <textarea id="dataAbstractTextarea" class="form-control form-control-xl" name="dataAbstract" rows="2" cols="60"></textarea>
                </div>
	       </div>

            <!--*********************************** DATA CONTRIBUTOR *********************************** -->
            <div id="contributorsContainer"></div>
            <div id="contributorsContainerButton" class="row col-md-24 col-sm-24">
                <div class="cursorPointer addQuitAllContainerText" title="Click to add/delete creator information (no more than 5)">
                    Add creator information (5 maximum) : <img id="addCreatorInfoButton" src="img/addChamp.svg" class="img-responsive img-rounded addQuitAllContainer">
                </div>
            </div>
        </fieldset>

        <fieldset id="basicInfoMetadat" class="fieldset2">
            <legend class="legend2">About metadata file:</legend>

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
                    <div class="col-md-9 col-sm-9">
                        <div id="metadatCreatorInfoNameLabel" class="label2">Name (*):</div>
                        <input id="metadatCreatorInfoNameInput" class="mandatoryField form-control form-control-xl" name="metadatCreatorInfoName" type="text">

                        <div id="metadatCreatorInfoRoleLabel" class="label2 form-control-xxl">Role (*):</div>
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
                    <div class="col-md-14 col-sm-14">
                        <div id="metadatCreatorInfoMailLabel" class="label2">Mail (*):</div>
                        <input id="metadatCreatorInfoMailInput" class="mandatoryField form-control form-control-l toto" name="metadatCreatorInfoMail" type="text">
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
                <div class="col-md-10 col-sm-10">
                    <div class="label2 form-control-xxl" id="temporalResolutionTextSelect">Temporal resolution:</div>
                    <select name="temporalResolution" class="form-control form-control-xl" id="temporalResolutionSelect">
                        <option value="nullValue">----</option>
                        <option value="Annual">Annual</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Daily">Daily</option>
                        <option value="Hourly">hourly</option>
                        <option value="">Other</option>
                    </select>
                </div>
                <div class="col-md-13 col-sm-13">
                    <div class="label2 form-control-xxl" id="temporalResolFreeTextText">Other resolution (free text):</div>
                    <input id="temporalResolFreeTextInput" class="form-control form-control-xxl" name="temporalResolution" type="text">
                </div>

                <!--*********************************** TEMPORAL COVERAGE *********************************** -->
                <div id=temporalCoverageContainer>
                    <div class="label1" id="temporalCoverageText" title="Period during which data applied (eg: 1997-01-01 to 2005-12-31)">Temporal coverage (*):</div>
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

        <fieldset id="temporalInfo" class="fieldset2">
            <legend class="legend2">Geographical information:</legend>

            <div class="form-group">
                <!--*********************************** SPATIAL RESOLUTION *********************************** -->
                <div class="row col-md-24 col-sm-24">
                    <div class="label1ContactLegend" id="spatialResolutionLongText" title="Level of detail expressed as a ground distance">Spatial resolution for
                        original product (*):
                    </div>
                    <div class="col-md-8 col-sm-8">
                        <div class="label2 form-control-xxl" id="spatialResolutionLongUnitText">Unit:</div>
                        <select id="spatialResolutionUnitLongSelect" class="form-control form-control-xxl" name="spatialResolutionLongUnit">
                            <option value="Degrees">Degrees</option>
                            <option value="Meters">Meters</option>
                        </select>
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label2 form-control-l" id="spatialResolutionValueText">Value:</div>
                        <input id="spatialResolutionValueInput" class="form-control form-control-l" name="spatialResolutionValue" type="text">
                    </div>
                </div>

                <!--*********************************** SPATIAL COVERAGE *********************************** -->
                <div class="row col-md-24 col-sm-24">
                    <div class="label1" id="spatialCoverageText" title="Geographical area where data applied (only degrees)">Spatial coverage (*):</div>

                    <div class="col-md-push-10 col-md-5 col-sm-push-10 col-sm-5">
                        <div class="label2 form-control-l cursorPointer" id="spatialCoverageNorthText" title="North bound latitude">North:</div>
                        <input id="spatialCoverageNorthInput" class="form-control form-control-m" name="northBoundLatitude" type="text">
                    </div>

                    <div class="row col-md-24 col-sm-24">
                        <div id="spatialCoverageWestContainer" class="col-md-push-5 col-md-5 col-sm-push-5 col-sm-5">
                            <div class="label2 form-control-xxl cursorPointer" id="spatialCoverageWestText" title="West bound longitude">West:</div>
                            <input id="spatialCoverageWestInput" class="form-control form-control-m" name="westBoundLongitude" type="text">
                        </div>
                        <div class="col-md-push-3 col-md-8 col-sm-push-3 col-sm-8">
                            <div id="spatialCoverageImage">
                                <img src="img/world.jpeg" class=" img-responsive img-rounded imageCentreSpatialCov form-control-xl">
                            </div>
                        </div>
                        <div id="spatialCoverageEastContainer" class="col-md-push-3 col-md-5 col-sm-push-3 col-sm-5">
                            <div class="label2 form-control-xxl cursorPointer" id="spatialCoverageEastText" title="East bound longitude">East:</div>
                            <input id="spatialCoverageEastInput" class="form-control form-control-m" name="eastBoundLongitude" type="text">
                        </div>

                        <div class="row col-md-24 col-sm-24">
                            <div class="col-md-push-10 col-md-5 col-sm-push-10 col-sm-5">
                                <div class="label2 form-control-l cursorPointer" id="spatialCoverageSouthText" title="South bound latitude">South:</div>
                                <input id="spatialCoverageSouthInput" class="form-control form-control-m" name="southBoundLatitude" type="text">
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
            <div id="productDetailsdescriptionRow" class="row">
                <div class="label1ContactLegend" id="productDetailsDescriptionText">Describe here how was built your product (*):</div>
                <textarea id="textAreaProductDetails" name="productDetailsStep0" rows="60" cols="60"></textarea>
            </div>
            <div id="productDetailsdescriptionRow" class="row">
                <div class="col-md-24 col-sm-24">
                    <div class="label2 form-control-l" id="addDocProductDetailsStep0Text"> Document URL to describe the product:</div>
                    <input id="addDocProductDetailsStep0Input" class="form-control form-control-m" name="addDocProductDetailsStep0" type="text">
                </div>
                <div class="col-md-24 col-sm-24">
                    <div class="label2 form-control-l" id="addDocDescripProductDetailsStep0Text" title="Information about the document related to the url">Information about
                        the url:
                    </div>
                    <textarea id="addDocDescripProductDetailsStep0TextArea" name="addDocDescripProductDetailsStep0" rows="1" cols="60"></textarea>
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

        <!-- Divs dynamically built with the 'createReferenceFieldset' function (metadataGCAForm_script.js) -->
        <div id="referencesContainer"></div>

        <div id="referencesContainerButton" class="row col-md-24 col-sm-24">
            <div class="cursorPointer addQuitAllContainerText" title="Click to add reference information (no more than 5)">Add reference information (5 maximum) :
                <img id="addReferenceInfoButton" src="img/addChamp.svg" class="img-responsive img-rounded addQuitAllContainer">
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

        <div class="label1ContactLegend form-control-xxl" id="discoveredIssueText" title="Describe here some issues identified with the quality related to this data.">
            Quality description (availability of product-errors, product evaluation, ...) (*):
        </div>
        <textarea id="discoveredIssueArea" name="discoveredIssueQualityData" rows="10" cols="50"></textarea>

        <div class="label2 form-control-xxl" id="standAloneText" title="Reference to a document to illustrate quality description">Document URL to describe quality:</div>
        <input id="standAloneInput" class="form-control form-control-m" name="standAloneName" type="text">
                <div class="col-md-24 col-sm-24">
                    <div class="label2 form-control-xxl" id="addDocDescripQualityInfoText">Information about the document related to the url:
                    </div>
                    <textarea id="addDocDescripQualityInfoTextTextArea" name="addDocDescripQualityInfo" rows="2" cols="60"></textarea>
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
                <div class="col-md-8 col-sm-8">
                    <div class="label2 form-control-xxl" id="principalInvestigatorContactNameText">Name (*):</div>
                    <input id="principalInvestigatorContactNameInput" class="form-control form-control-xl" name="principalInvestigatorContactName" type="text">
                </div>
                <div class="col-md-8 col-sm-8">
                    <div class="label2 form-control-xxl" id="principalInvestigatorContactMailText">Mail (*):</div>
                    <input id="principalInvestigatorContactMailInput" class="form-control form-control-xl" name="principalInvestigatorContactMail" type="text">
                </div>
                <div class="col-md-7 col-sm-7">
                    <div class="label2 form-control-xxl" id="principalInvestigatorContactPhoneText">Phone:</div>
                    <input id="principalInvestigatorContactPhoneInput" class="form-control form-control-xl" name="principalInvestigatorContactPhone" type="text">
                </div>
            </div>

            <!--*********************************** ORIGINAL DATA URL *********************************** -->
            <div class="col-md-9 col-sm-9">
                <div class="label1 form-control-xxl" id="originalDataUrlText">Original data URL:</div>
                <input id="originalDataUrlInput" class="form-control form-control-xxl" name="originalDataUrl" type="text">
            </div>

            <!--*********************************** DATA POLICY *********************************** -->
            <div class="col-md-24 col-sm-24">
                <div class="label1 form-control-l" id="dataPolicyText">Data policy:</div>
            </div>
            <div class="col-md-24 col-sm-24">
                <div class="label2 form-control-xxl" id="dataPolicyChooseText">Select a data policy:</div>
                <select id="dataPolicyChooseSelect" class="form-control form-control-m" name="dataPolicy" type="text">
                    <option value="None">None</option>
                    <option value="Free to use">Free to use</option>
                    <option value="Restricted to scientists">Restricted to scientists</option>
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
	<div id="showResultButton" class= "cursorPointer" title= "Click to visualise the result of the metadata file" style="display:none" >Show the result</div>
</div>

<script text="text/javascript">
    // See http://www.jankoatwarpspeed.com/turn-any-webform-into-a-powerful-wizard-with-jquery-formtowizard-plugin/
    $( document ).ready( function()
    {
        // Create menu band
        $( "#metadataForm" ).formToWizard();

        // Manage divs
        manageFormDiv();

        // Init data contributor with one row
        createContributorDiv( "contributorsContainer", 1 );

        // Add reference only if necessary (no mandatory but if we choose to fill in some fields are mandatory).
    $( "#addReferenceInfoButton" ).click( function()
	{
        if($( 'input[id^="citationTitleInput"]' ).length<1)
	{
        createReferenceFieldset( "referencesContainer", 1 );
	}
	else {return false;}
	});

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
            var errorNumber = event.args.invalidInputs.length;
            alert( "Some fields are empty or incorrect. Please check your form : " + errorNumber + " errors." );
        } );

        // Keeping file (call php which create and keep xml file) if all ok:
        $( '#metadataForm' ).on( 'validationSuccess', function ( event )
        {
            alert( "Your form is complete and validate.");
	    $("#showResultButton").show();

		
	$("#showResultButton").click(function() {
		
		// For Inputs:
		if ($("#dataProductTypeSelect").val() == "") {
			var prodTypeInput= $("#dataProductTypeFreeTextInput").val();
		}	
		//alert($("#dataProductTypeSelect").val() + $("#dataProductTypeInput").val());//OK
		else var prodTypeInput= "";
		if ($("#dataProductCategorySelect").val() == "") {
			var prodCatInput= $("#dataProductCategoryFreeTextInput").val();
		}	
		else var prodCatInput= "";
			
		// For Selects: 	
		if ($("#dataProductTypeFreeTextInput").is(':visible'))
		{
			var prodTypeSelect= "";
		}
		else var prodTypeSelect= $("#dataProductTypeSelect").val();	
		if ($("#dataProductCategoryFreeTextInput").is(':visible'))
		{
			var prodCatSelect= "";
		}
		else var prodCatSelect= $("#dataProductCategorySelect").val();	

	
		var prodTitle= $("#prodNameTitleInput").val();
		var prodVersion= $("#prodNameVersionInput").val();
		var linkToXml = prodTypeSelect + prodTypeInput + "-" + prodCatSelect + prodCatInput + "-" + prodTitle + "-" + prodVersion;
			
		window.open("http://webportals.ipsl.jussieu.fr/ScientificApps/gitPascal/bobcat/xmlDoneByForm/"+linkToXml+".xml");
		//CO2_fluxundefined-Inversion_modelundefined-f-f
		
		//window.open("visualiseResult.php");
//"".$_POST["dataProductTypeSelectPost"].$_POST["dataProductTypeInputPost"].'-'.$_POST["dataProductCategorySelectPost"].$_POST["dataProductCategoryInputPost"].'-'.$_POST["prodNameTitlePost"].'-'.$_POST["prodNameVersionPost"].".xml"	
	});

            var nDataContributors = $( 'input[id^="dataProducerInfoNameInput"]' ).length;
	    var nReferences= $( 'input[id^="citationTitleInput"]' ).length;

            var dataDateCreation = $( this ).find( "input[name=dataDateCreation]" ).val();
            var dataProductTypeSelect = $( this ).find( "select[name=dataProductType]" ).val();
            var dataProductTypeInput = $( this ).find( "input[name=dataProductType]" ).val();
            var dataProductCategorySelect = $( this ).find( "select[name=dataProductCategory]" ).val();
            var dataProductCategoryInput = $( this ).find( "input[name=dataProductCategory]" ).val();
            var prodNameTitle = $( this ).find( "input[name=prodNameTitle]" ).val();
            var prodNameVersion = $( this ).find( "input[name=prodNameVersion]" ).val();
	    var dataAbstract = $( this ).find( "textarea[name=dataAbstract]").val();
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
            var metadataDateCreation = $( this ).find( "input[name=metadataDateCreation]" ).val();
            var metadatCreatorInfoName = $( this ).find( "input[name=metadatCreatorInfoName]" ).val();
            var metadatCreatorInfoMail = $( this ).find( "input[name=metadatCreatorInfoMail]" ).val();
            var metadatCreatorInfoRole = $( this ).find( "select[name=metadatCreatorInfoRole]" ).val();
            // Temp and geo info :
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
            var spatialResolutionValue = $( this ).find( "input[name=spatialResolutionValue]" ).val();
            // Product description:
            var productDetails = $( this ).find( "textarea[name=productDetailsStep0]" ).val();
            var addDocProductDetails = $( this ).find( "input[name=addDocProductDetailsStep0]" ).val();
	    var addDocDescriptionProductDetails = $( this ).find( "textarea[name=addDocDescripProductDetailsStep0]" ).val();
	    // Keywords and ref:
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
            var citationAuthorMail1 = $( this ).find( "input[name=citationAuthorMail1]" ).val();
            var citationAuthorMail11 = $( this ).find( "input[name=citationAuthorMail11]" ).val();
            var citationAuthorMail111 = $( this ).find( "input[name=citationAuthorMail111]" ).val();
            var citationAuthorMail1111 = $( this ).find( "input[name=citationAuthorMail1111]" ).val();
            var citationAuthorMail11111 = $( this ).find( "input[name=citationAuthorMail11111]" ).val();
            var citationAuthorRole1 = $( this ).find( "select[name=citationAuthorRole1]" ).val();
            var citationAuthorRole11 = $( this ).find( "select[name=citationAuthorRole11]" ).val();
            var citationAuthorRole111 = $( this ).find( "select[name=citationAuthorRole111]" ).val();
            var citationAuthorRole1111 = $( this ).find( "select[name=citationAuthorRole1111]" ).val();
            var citationAuthorRole11111 = $( this ).find( "select[name=citationAuthorRole11111]" ).val();
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
            // Quality information:
	    var qualityDescription = $( this ).find( "textarea[name=discoveredIssueQualityData]" ).val();
	    var docRelatedToQualityDescUrl = $( this ).find( "input[name=standAloneName]" ).val();
	    var docRelatedToQualityDescDesc = $( this ).find( "textarea[name=addDocDescripQualityInfo]").val();

            // data access and policy:
            var principalInvestigatorContactName = $( this ).find( "input[name=principalInvestigatorContactName]" ).val();
            var principalInvestigatorContactMail = $( this ).find( "input[name=principalInvestigatorContactMail]" ).val();
            var principalInvestigatorContactPhone = $( this ).find( "input[name=principalInvestigatorContactPhone]" ).val();
            var originalDataUrl = $( this ).find( "input[name=originalDataUrl]" ).val();
            var dataPolicy = $( this ).find( "select[name=dataPolicy]" ).val();

            $.post( "http://webportals.ipsl.jussieu.fr/ScientificApps/gitPascal/bobcat/testForm2.php",
            {nDataContributorsPost: nDataContributors, nReferencesPost: nReferences, dataDateCreationPost: dataDateCreation, dataProductTypeSelectPost: dataProductTypeSelect, dataProductTypeInputPost: dataProductTypeInput, dataProductCategorySelectPost: dataProductCategorySelect, dataProductCategoryInputPost: dataProductCategoryInput, prodNameTitlePost: prodNameTitle, prodNameVersionPost: prodNameVersion, dataAbstractPost: dataAbstract, dataProducerInfoName1Post: dataProducerInfoName1, dataProducerInfoName11Post: dataProducerInfoName11, dataProducerInfoName111Post: dataProducerInfoName111, dataProducerInfoName1111Post: dataProducerInfoName1111, dataProducerInfoName11111Post: dataProducerInfoName11111, dataProducerInfoOrganisation1Post: dataProducerInfoOrganisation1, dataProducerInfoOrganisation11Post: dataProducerInfoOrganisation11, dataProducerInfoOrganisation111Post: dataProducerInfoOrganisation111, dataProducerInfoOrganisation1111Post: dataProducerInfoOrganisation1111, dataProducerInfoOrganisation11111Post: dataProducerInfoOrganisation11111, dataProducerInfoMail1Post: dataProducerInfoMail1, dataProducerInfoMail11Post: dataProducerInfoMail11, dataProducerInfoMail111Post: dataProducerInfoMail111, dataProducerInfoMail1111Post: dataProducerInfoMail1111, dataProducerInfoMail11111Post: dataProducerInfoMail11111, dataProducerInfoRole1Post: dataProducerInfoRole1, dataProducerInfoRole11Post: dataProducerInfoRole11, dataProducerInfoRole111Post: dataProducerInfoRole111, dataProducerInfoRole1111Post: dataProducerInfoRole1111, dataProducerInfoRole11111Post: dataProducerInfoRole11111, metadataDateCreationPost: metadataDateCreation, metadatCreatorInfoNamePost: metadatCreatorInfoName, metadatCreatorInfoMailPost: metadatCreatorInfoMail, metadatCreatorInfoRolePost: metadatCreatorInfoRole, temporalResolutionSelectPost: temporalResolutionSelect, temporalResolutionInputPost: temporalResolutionInput, temporalCoverageBeginNamePost: temporalCoverageBeginName, temporalCoverageEndNamePost: temporalCoverageEndName, westBoundLongitudePost: westBoundLongitude, eastBoundLongitudePost: eastBoundLongitude, southBoundLatitudePost: southBoundLatitude, northBoundLatitudePost: northBoundLatitude, verticalLevelSelectPost: verticalLevelSelect, verticalLevelInputPost: verticalLevelInput, spatialResolutionLongUnitPost: spatialResolutionLongUnit, spatialResolutionValuePost: spatialResolutionValue, productDetailsPost: productDetails,  addDocProductDetailsPost: addDocProductDetails, addDocDescriptionProductDetailsPost: addDocDescriptionProductDetails,  keywordsInfoPost: keywordsInfo, citationTitle1Post: citationTitle1, citationTitle11Post: citationTitle11, citationTitle111Post: citationTitle111, citationTitle1111Post: citationTitle1111, citationTitle11111Post: citationTitle11111, citationBookDate1Post: citationBookDate1, citationBookDate11Post: citationBookDate11, citationBookDate111Post: citationBookDate111, citationBookDate1111Post: citationBookDate1111, citationBookDate11111Post: citationBookDate11111, citationAuthorName1Post: citationAuthorName1, citationAuthorName11Post: citationAuthorName11, citationAuthorName111Post: citationAuthorName111, citationAuthorName1111Post: citationAuthorName1111, citationAuthorName11111Post: citationAuthorName11111, citationAuthorOrganisation1Post: citationAuthorOrganisation1, citationAuthorOrganisation11Post: citationAuthorOrganisation11, citationAuthorOrganisation111Post: citationAuthorOrganisation111, citationAuthorOrganisation1111Post: citationAuthorOrganisation1111, citationAuthorOrganisation11111Post: citationAuthorOrganisation11111, citationAuthorMail1Post: citationAuthorMail1, citationAuthorMail11Post: citationAuthorMail11, citationAuthorMail111Post: citationAuthorMail111, citationAuthorMail1111Post: citationAuthorMail1111, citationAuthorMail11111Post: citationAuthorMail11111, citationAuthorRole1Post: citationAuthorRole1,  citationAuthorRole11Post: citationAuthorRole11, citationAuthorRole111Post: citationAuthorRole111, citationAuthorRole1111Post: citationAuthorRole1111, citationAuthorRole11111Post: citationAuthorRole11111, nameMagazine1Post: nameMagazine1, nameMagazine11Post: nameMagazine11, nameMagazine111Post: nameMagazine111, nameMagazine1111Post: nameMagazine1111, nameMagazine11111Post: nameMagazine11111, citationDOI1Post: citationDOI1, citationDOI11Post: citationDOI11, citationDOI111Post: citationDOI111, citationDOI1111Post: citationDOI1111, citationDOI11111Post: citationDOI11111, citationBookCategory1Post: citationBookCategory1, citationBookCategory11Post: citationBookCategory11,  citationBookCategory111Post: citationBookCategory111, citationBookCategory1111Post: citationBookCategory1111, citationBookCategory11111Post: citationBookCategory11111, citationOnlineRessource1Post: citationOnlineRessource1, citationOnlineRessource11Post: citationOnlineRessource11, citationOnlineRessource111Post: citationOnlineRessource111, citationOnlineRessource1111Post: citationOnlineRessource1111, citationOnlineRessource11111Post: citationOnlineRessource11111, qualityDescriptionPost: qualityDescription, docRelatedToQualityDescUrlPost: docRelatedToQualityDescUrl, docRelatedToQualityDescDescPost: docRelatedToQualityDescDesc, principalInvestigatorContactNamePost: principalInvestigatorContactName, principalInvestigatorContactMailPost: principalInvestigatorContactMail, principalInvestigatorContactPhonePost: principalInvestigatorContactPhone, originalDataUrlPost: originalDataUrl, dataPolicyPost: dataPolicy,
            } );
        } );
    } );


</script>

</body>
<html>


