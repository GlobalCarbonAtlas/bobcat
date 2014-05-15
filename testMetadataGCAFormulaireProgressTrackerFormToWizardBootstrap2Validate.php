<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <!-- Ajouts/ Bootstrap : = ???-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Pour les telephones-->

    <title>Test metadat GCA</title>
    <!-- Bootstrap : -->
    <!-- Chgment css par default (avec http://getbootstrap.com/customize/?id=10472302) : 24 colonnes et 0px entre chq.-->
    <link rel="stylesheet" href="bootstrapCustom/css/bootstrap.css" media="screen"/>
    <!-- A mettre avant css avec modif pour que ces modifs soient prises en omptes sans passer par !important. -->
    <link rel="stylesheet" href="testMetadataGCAFormulaireBootstrap.css"/>
    <script type="text/javascript" src="js/library/jquery-1.9.1.js"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script type="text/javascript" src="js/library/formToWizardBootstrapValidate.js"></script>
    <!-- CF  http://www.jankoatwarpspeed.com/turn-any-webform-into-a-powerful-wizard-with-jquery-formtowizard-plugin/ Pas mal adapté, je m'y suis juste inspiré. -->
    <link rel="stylesheet" href="js/library/jqwidgets-ver3.2.1/jqwidgets/styles/jqx.base.css"/>
    <!-- A mettre avant css specifique a chq theme-->
    <link rel="stylesheet" href="js/library/jqwidgets-ver3.2.1/jqwidgets/styles/jqx.bootstrap.css"/>
    <!--Si on veut rajouter un nouveau theme / jqx-->
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxvalidator.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxmaskedinput.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxinput.js"></script>
    <!-- Pour jqxdatetimeinput : -->
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/jqxcalendar.js"></script>
    <script type="text/javascript" src="js/library/jqwidgets-ver3.2.1/jqwidgets/globalization/globalize.js"></script>
    <!--Pour appel et gestion xml metadat comme DOM object :-->
    <script type="text/javascript" src="accessXmlMetadat.js"></script>

    <script type="text/javascript" src="js/metadataGCAFormValidationRules_script.js"></script>
    <script type="text/javascript" src="js/metadataGCAForm_script.js"></script>

</head>

<body>
<div class="container-fluid"><!-- POur prendre tte la largeur ?cran-->

<form id="metadataForm" method="post" action="testForm.php">
<!--form id= "metadataForm" method= "post" action="testForm.php" onsubmit= "return verificationChamps();">--><!-- Tester que sur la derniere page donc !-->
<div class="row">
    <div id="mandatoryFieldIndication" class="col-md-24 col-sm-24">(*): mandatory fields</div>
</div>
<!-- mandatory field info row-->

<div id="basicInformation" class="row">
<div class="col-md-push-7 col-md-9 col-sm-push-7 col-sm-9"><!--Pour placer basic info-->
<fieldset class="fieldset1">
<legend class="legend1">Basic information</legend>
<fieldset id="basicInfoDataFile" class="fieldset2">
<legend class="legend2">About data:</legend>

<div class="form-group">
    <div class="row"><!--row Data date creation-->
        <div class="col-md-24 col-sm-24">
            <div class="label1ContactLegend" id="dataDateCreationText" title="Creation date of the product file">Creation date (*):</div>
            <div id="dataDateCreationInput" class="dateInput" name="dataDateCreation"></div>
            <!-- Pour accueillir calendar de jqx-->
        </div>
    </div>
    <!--row Data date creation-->
    <div class="label1" id="dataFileNameText"
         title="Construct a name to your data file thanks to Product type, category, title and version. Necessary to mention/exchange your data">Product name (*):
    </div>
    <div id="prodTypeRow" class="row">
        <div class="col-md-24 col-sm-24">
            <div class="col-md-7 col-sm-7">
                <div class="label2 form-control-xxl" id="dataProductTypeSelectText">Product type:</div>
                <select id="dataProductTypeSelect" class="form-control form-control-xl" name="dataProductType">
                    <option value="nullValue">----</option>
                    <option value="CO2Flux">CO2_flux</option>
                    <option value="carbonStock">Carbon_stock</option>
                    <option value="CH4Flux">CH4_flux</option>
                    <option value="otherValue">Other</option>
                </select>
            </div>
            <div class="col-md-16 col-sm-16">
                <div class="label2" id="dataProductTypeFreeTextText">Other type (free text):</div>
                <input id="dataProductTypeFreeTextInput" class="form-control form-control-m" name="dataProductType" type="text"><!-- name doit etre le meme que son select-->
            </div>
        </div>
    </div>
    <!--prodTypeRow-->
    <div id="prodCategoryRow" class="row">
        <div class="col-md-24 col-sm-24">
            <div class="col-md-7 col-sm-7">
                <div class="label2 form-control-xxl" id="dataProductCategorySelectText">Product category:</div>
                <select class="form-control form-control-xl dataProductCategoryClass" id="dataProductCategorySelect" name="dataProductCategory">
                    <option value="nullValue">----</option>
                    <option value="inversionModel">Inversion_model</option>
                    <option value="landModel">Land_model</option>
                    <option value="oceanModel">Ocean_model</option>
                    <option value="otherValue">Other</option>
                </select>
            </div>
            <div class="col-md-16 col-sm-16">
                <div class="label2" id="dataProductCategoryFreeTextText">Other category (free text):</div>
                <input id="dataProductCategoryFreeTextInput" class="form-control form-control-m" name="dataProductCategory" type="text">
            </div>
        </div>
    </div>
</div>
<!--prodCategoryRow-->

<div id="prodNameTitleAndVersion" class="row"><!--row Product title et Product version-->
    <div class="col-md-24 col-sm-24">
        <div class="col-md-9 col-sm-9">
            <div class="label2 form-control-xxl" id="prodNameTitleText">Product title (*):</div>
            <input id="prodNameTitleInput" class="form-control form-control-xl mandatoryField" name="prodNameTitle" type="text">
        </div>
        <div class="col-md-14 col-sm-14">
            <div class="label2 form-control-xxl" id="prodNameVersionText">Product version (*):</div>
            <input id="prodNameVersionInput" class="form-control form-control-m" name="prodNameVersion" type="text">
        </div>
    </div>
</div>
<!--row Product title et Product version-->


<!--**************************************************************************************** -->
<!--*********************************** DATA CONTRIBUTOR *********************************** -->
<!--**************************************************************************************** -->
<div class="row"><!-- row: rangee avec ts les elements sur data creator info-->
<div class="col-md-24 col-sm-24">
    <div id="dataProducerInfoText" class="label1" title="Information about the person who created the data file">Data contributors information (*):</div>


    <div class="row"><!-- Row name et organisation-->
        <div class="col-md-9 col-sm-9">
            <div id="dataProducerInfoNameText" class="label2 form-control-l">Name (*):</div>
            <input id="dataProducerInfoNameInput" class="form-control form-control-xl mandatoryField" name="dataProducerInfoName" type="text">
        </div>
        <div class="col-md-14 col-sm-14">
            <div id="dataProducerInfoOrganisationText" class="label2 form-control-xxl">Name of the organisation (*):</div>
            <input id="dataProducerInfoOrganisationInput" class="form-control form-control-l mandatoryField" name="dataProducerInfoOrganisation" type="text">
        </div>
    </div>
    <!-- Row Name et organisation-->
    <div class="row"><!-- Mail et Role-->
        <div class="col-md-24 col-sm-24">
            <div class="col-md-9 col-sm-9">
                <div id="dataProducerInfoMailText" class="label2 form-control-l">Mail (*):</div>
                <input id="dataProducerInfoMailInput" class="form-control form-control-xl" name="dataProducerInfoMail" type="text">
            </div>
            <div class="col-md-14 col-sm-14">
                <div id="dataProducerInfoRoleText" class="label2 form-control-xxl">Role (*):</div>
                <select id="dataProducerInfoRoleSelect" class="form-control form-control-m" name="dataProducerInfoRole">
                    <option value="nullValue">----</option>
                    <option value="originator">Originator</option>
                    <option value="pointOfContact">Point of contact</option>
                    <option value="principalInvestigator">Principal investigator</option>
                    <option value="processor">Processor</option>
                </select>
            </div>
        </div>
    </div>
    <!-- Mail et Role-->
</div>
<!-- row: rangee avec ts les elements/creator information-->

<div class="row"><!-- row 2: rangee avec ts les elements sur data creator info-->
    <div id="dataContributorContainer2" class="col-md-24 col-sm-24">
        <div id="dataProducerInfoText2" class="label1" title="Information about the person who created the data file">Data contributors information 2:</div>
        <div class="row"><!-- Row 2 name et organisation-->
            <div class="col-md-9 col-sm-9">
                <div id="dataProducerInfoNameText2" class="label2 form-control-l">Name (*):</div>
                <input id="dataProducerInfoNameInput2" class="form-control form-control-xl mandatoryField" name="dataProducerInfoName2" type="text">
            </div>
            <div class="col-md-14 col-sm-14">
                <div id="dataProducerInfoOrganisationText2" class="label2 form-control-xxl">Name of the organisation (*):</div>
                <input id="dataProducerInfoOrganisationInput2" class="form-control form-control-l mandatoryField" name="dataProducerInfoOrganisation2" type="text">
            </div>
        </div>
        <!-- Row 2 Name et organisation-->
        <div class="row"><!-- Mail et Role-->
            <div class="col-md-24 col-sm-24">
                <div class="col-md-9 col-sm-9">
                    <div id="dataProducerInfoMailText2" class="label2 form-control-l">Mail (*):</div>
                    <input id="dataProducerInfoMailInput2" class="form-control form-control-xl" name="dataProducerInfoMail2" type="text">
                </div>
                <div class="col-md-14 col-sm-14">
                    <div id="dataProducerInfoRoleText2" class="label2 form-control-xxl">Role (*):</div>
                    <select id="dataProducerInfoRoleSelect2" class="form-control form-control-m" name="dataProducerInfoRole2">
                        <option value="nullValue">----</option>
                        <option value="originator">Originator</option>
                        <option value="pointOfContact">Point of contact</option>
                        <option value="principalInvestigator">Principal investigator</option>
                        <option value="processor">Processor</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- Mail et Role-->
    </div>
    <!-- row 3: rangee avec ts les elements/creator information-->

    <div class="row"><!-- row 3: rangee avec ts les elements sur data creator info-->
        <div id="dataContributorContainer3" class="col-md-24 col-sm-24">
            <div id="dataProducerInfoText3" class="label1" title="Information about the person who created the data file">Data contributors information 3:</div>
            <div class="row"><!-- Row 3 name et organisation-->
                <div class="col-md-9 col-sm-9">
                    <div id="dataProducerInfoNameText3" class="label2 form-control-l">Name (*):</div>
                    <input id="dataProducerInfoNameInput3" class="form-control form-control-xl mandatoryField" name="dataProducerInfoName3" type="text">
                </div>
                <div class="col-md-14 col-sm-14">
                    <div id="dataProducerInfoOrganisationText3" class="label2 form-control-xxl">Name of the organisation (*):</div>
                    <input id="dataProducerInfoOrganisationInput3" class="form-control form-control-l mandatoryField" name="dataProducerInfoOrganisation3" type="text">
                </div>
            </div>
            <!-- Row 3 Name et organisation-->
            <div class="row"><!-- Mail et Role-->
                <div class="col-md-24 col-sm-24">
                    <div class="col-md-9 col-sm-9">
                        <div id="dataProducerInfoMailText3" class="label2 form-control-l">Mail (*):</div>
                        <input id="dataProducerInfoMailInput3" class="form-control form-control-xl" name="dataProducerInfoMail3" type="text">
                    </div>
                    <div class="col-md-14 col-sm-14">
                        <div id="dataProducerInfoRoleText3" class="label2 form-control-xxl">Role (*):</div>
                        <select id="dataProducerInfoRoleSelect3" class="form-control form-control-m" name="dataProducerInfoRole3">
                            <option value="nullValue">----</option>
                            <option value="originator">Originator</option>
                            <option value="pointOfContact">Point of contact</option>
                            <option value="principalInvestigator">Principal investigator</option>
                            <option value="processor">Processor</option>
                        </select>
                    </div>
                </div>
            </div>
            <!-- Mail et Role-->
        </div>
        <!-- row 3: rangee avec ts les elements/creator information-->

        <div class="row"><!-- row 4: rangee avec ts les elements sur data creator info-->
            <div id="dataContributorContainer4" class="col-md-24 col-sm-24">
                <div id="dataProducerInfoText4" class="label1" title="Information about the person who created the data file">Data contributors information 4:</div>
                <div class="row"><!-- Row 4 name et organisation-->
                    <div class="col-md-9 col-sm-9">
                        <div id="dataProducerInfoNameText4" class="label2 form-control-l">Name (*):</div>
                        <input id="dataProducerInfoNameInput4" class="form-control form-control-xl mandatoryField" name="dataProducerInfoName4" type="text">
                    </div>
                    <div class="col-md-14 col-sm-14">
                        <div id="dataProducerInfoOrganisationText4" class="label2 form-control-xxl">Name of the organisation (*):</div>
                        <input id="dataProducerInfoOrganisationInput4" class="form-control form-control-l mandatoryField" name="dataProducerInfoOrganisation4" type="text">
                    </div>
                </div>
                <!-- Row 4 Name et organisation-->
                <div class="row"><!-- Mail et Role-->
                    <div class="col-md-24 col-sm-24">
                        <div class="col-md-9 col-sm-9">
                            <div id="dataProducerInfoMailText4" class="label2 form-control-l">Mail (*):</div>
                            <input id="dataProducerInfoMailInput4" class="form-control form-control-xl" name="dataProducerInfoMail4" type="text">
                        </div>
                        <div class="col-md-14 col-sm-14">
                            <div id="dataProducerInfoRoleText4" class="label2 form-control-xxl">Role (*):</div>
                            <select id="dataProducerInfoRoleSelect4" class="form-control form-control-m" name="dataProducerInfoRole4">
                                <option value="nullValue">----</option>
                                <option value="originator">Originator</option>
                                <option value="pointOfContact">Point of contact</option>
                                <option value="principalInvestigator">Principal investigator</option>
                                <option value="processor">Processor</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- Mail et Role-->
            </div>
            <!-- row 4: rangee avec ts les elements/creator information-->

            <div class="row"><!-- row 5: rangee avec ts les elements sur data creator info-->
                <div id="dataContributorContainer5" class="col-md-24 col-sm-24">
                    <div id="dataProducerInfoText5" class="label1" title="Information about the person who created the data file">Data contributors information 5:</div>
                    <div class="row"><!-- Row 5 name et organisation-->
                        <div class="col-md-9 col-sm-9">
                            <div id="dataProducerInfoNameText5" class="label2 form-control-l">Name (*):</div>
                            <input id="dataProducerInfoNameInput5" class="form-control form-control-xl mandatoryField" name="dataProducerInfoName5" type="text">
                        </div>
                        <div class="col-md-14 col-sm-14">
                            <div id="dataProducerInfoOrganisationText5" class="label2 form-control-xxl">Name of the organisation (*):</div>
                            <input id="dataProducerInfoOrganisationInput5" class="form-control form-control-l mandatoryField" name="dataProducerInfoOrganisation5" type="text">
                        </div>
                    </div>
                    <!-- Row 5 Name et organisation-->
                    <div class="row"><!-- Mail et Role-->
                        <div class="col-md-24 col-sm-24">
                            <div class="col-md-9 col-sm-9">
                                <div id="dataProducerInfoMailText5" class="label2 form-control-l">Mail (*):</div>
                                <input id="dataProducerInfoMailInput5" class="form-control form-control-xl" name="dataProducerInfoMail5" type="text">
                            </div>
                            <div class="col-md-14 col-sm-14">
                                <div id="dataProducerInfoRoleText5" class="label2 form-control-xxl">Role (*):</div>
                                <select id="dataProducerInfoRoleSelect5" class="form-control form-control-m" name="dataProducerInfoRole5">
                                    <option value="nullValue">----</option>
                                    <option value="originator">Originator</option>
                                    <option value="pointOfContact">Point of contact</option>
                                    <option value="principalInvestigator">Principal investigator</option>
                                    <option value="processor">Processor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Mail et Role-->
                </div>
                <!-- row 5: rangee avec ts les elements/creator information-->

                <div class="row"><!-- rangee avec bouton add/quit-->
                    <div class="col-md-24 col-sm-24">
                        <div class="cursorPointer addQuitAllContainerText" title="Click to add/delete creator information (no more than 5)">Add/delete creator information:
                        </div>
                    </div>
                    <div class="col-md-24 col-sm-24">
                        <div class="col-md-push-2 col-md-1 col-sm-push-2 col-sm-1">
                            <img id="addCreatorInfoButton" src="img/addChamp.svg" class=" img-responsive img-rounded addQuitAllContainer">
                        </div>
                        <div class="col-md-push-3 col-md-1 col-sm-push-3 col-sm-1">
                            <img id="quitCreatorInfoButton" src="img/quitChamp.svg" class=" img-responsive img-rounded addQuitAllContainer">
                        </div>
                    </div>
                    <!-- rangee avec bouton add/quit-->

                </div>
                <!--form-group-->

                <!--**************************************************************************************** -->

</fieldset>
<fieldset id="basicInfoMetadat" class="fieldset2">
    <legend class="legend2">About metadata file:</legend>
    <div class="form-group"><!--Permet mettre espacement adapt?/form-->
        <div class="row">
            <div class="col-md-24 col-sm-24"><!--col metadata date creation-->
                <div id="metadataDateCreationLabel" class="label1ContactLegend" for="metadataDateCreationInput" title="Date of creation of this file (metadata file)">Metadata date
                    of creation (*):
                </div>
                <div id="metadataDateCreationInput" class="dateInput" name="metadataDateCreation"></div>
                <!-- Pour accueillir calendrier jqx-->
            </div>
            <!--col metadata date creation-->
        </div>
        <div id="metadatCreatorInfoRow" class="row"><!-- row: rangee avec ts les elements/creator information-->
            <div class="col-md-24 col-sm-24">
                <div id="metadatCreatorInfo" class="label1" title="Information about the person who created the metadata file">Metadata creator information (*):</div>
                <div class="col-md-9 col-sm-9"><!--col Name, role-->
                    <div id="metadatCreatorInfoNameLabel" class="label2">Name (*):</div>
                    <input id="metadatCreatorInfoNameInput" class="mandatoryField form-control form-control-xl" name="metadatCreatorInfoName" type="text">

                    <div id="metadatCreatorInfoRoleLabel" class="label2 form-control-xxl">Role (*):</div>
                    <select id="metadatCreatorInfoRoleSelect" class="form-control form-control-xl" name="metadatCreatorInfoRole">
                        <option value="nullValue">----</option>
                        <option value="resourceProvider">Resource provider</option>
                        <option value="custodian">Custodian</option>
                        <option value="owner">Owner</option>
                        <option value="user">user</option>
                        <option value="distibutor">Distributor</option>
                        <option value="originator">Originator</option>
                        <option value="pointOfContact">Point of contact</option>
                        <option value="principalInvestigator">Principal investigator</option>
                        <option value="processor">Processor</option>
                        <option value="publisher">Publisher</option>
                        <option value="author">Author</option>
                    </select>
                </div>
                <!--col name, role-->
                <div class="col-md-14 col-sm-14"><!--col Mail-->
                    <div id="metadatCreatorInfoMailLabel" class="label2">Mail (*):</div>
                    <input id="metadatCreatorInfoMailInput" class="mandatoryField form-control form-control-l toto" name="metadatCreatorInfoMail" type="text">
                </div>
                <!--col Mail-->
            </div>
        </div>
        <!-- row: rangee avec ts les elements/creator information (= allContainer)-->
    </div>
    <!--form-group-->
</fieldset>
</fieldset>
</div>
</div>
<!-- Basic Information-->

<div id="tempAndGeoInfo" class="row">
    <div class="col-md-24 col-sm-24">
        <div class="col-md-push-7 col-md-8 col-sm-push-7 col-sm-8"><!--Pour placer temp and geo info-->
            <fieldset class="fieldset1">
                <legend class="legend1">Temporal and geographical information</legend>
                <fieldset id="temporalInfo" class="fieldset2">
                    <legend class="legend2">Temporal information:</legend>
                    <div class="form-group"><!--Permet mettre espacement adapt?/form. A mettre après legend2 parce que si non applique style propre à legend 2 et non souhaité.-->
                        <div class="row"><!-- row temporal resol-->
                            <div class="col-md-24 col-sm-24"><!--Temporal resolution-->
                                <div class="label1ContactLegend" id="temporalResolutionText">Temporal resolution (*):</div>
                                <div class="col-md-8 col-sm-8"><!--Temporal resolution Select-->
                                    <div class="label2 form-control-xxl" id="temporalResolutionTextSelect">Select a temporal resolution:</div>
                                    <select name="temporalResolution" class="form-control form-control-xl" id="temporalResolutionSelect">
                                        <option value="nullValue">----</option>
                                        <option value="tempResolAnnual">Annual</option>
                                        <option value="tempResolMonthly">Monthly</option>
                                        <option value="tempResolDaily">Daily</option>
                                        <option value="tempResolHourly">hourly</option>
                                        <option value="otherValue">Other</option>
                                    </select>
                                </div>
                                <!--Temporal resolution Select-->
                                <div class="col-md-8 col-sm-8"><!--Other temporal resolution-->
                                    <div class="label2 form-control-xxl" id="temporalResolFreeTextText">Other resolution (free text):</div>
                                    <input id="temporalResolFreeTextInput" class="form-control form-control-xxl" name="temporalResolution" type="text">
                                </div>
                                <!--Other temporal resolution-->
                            </div>
                            <!--Temporal resolution-->
                        </div>
                        <!-- row temporal resol-->

                        <div id=temporalCoverageContainer>
                            <div class="label1" id="temporalCoverageText" title="Period during which data applied (eg: 1997-01-01 to 2005-12-31)">Temporal coverage (*):</div>
                            <div class="label2 form-control-xxl" id="temporalCoverageBeginText">Begin:</div>
                            <div id="temporalCoverageBegin" class="dateInput" name="temporalCoverageBeginName"></div>
                            <div class="label2 form-control-xxl" id="temporalCoverageEndText">End:</div>
                            <div id="temporalCoverageEnd" class="dateInput" name="temporalCoverageEndName"></div>
                        </div>

                    </div>
                    <!--form-group class-->
                </fieldset>
                <!-- Fieldset2-->
                <fieldset id="temporalInfo" class="fieldset2">
                    <legend class="legend2">Geographical information:</legend>
                    <div class="form-group">
                        <div class="row"><!--Spatial resolution-->
                            <div class="col-md-24 col-sm-24">
                                <div class="label1ContactLegend" id="spatialResolutionLongText" title="Level of detail expressed as a ground distance">Spatial resolution for
                                    original product (*):
                                </div>
                                <div class="col-md-8 col-sm-8">
                                    <div class="label2 form-control-xxl" id="spatialResolutionLongUnitText">Unit:</div>
                                    <select id="spatialResolutionUnitLongSelect" class="form-control form-control-xxl" name="spatialResolutionLongUnit">
                                        <option value="degrees">Degrees</option>
                                        <option value="meters">Meters</option>
                                    </select>
                                </div>
                                <div class="col-md-11 col-sm-11">
                                    <div class="label2 form-control-l" id="spatialResolutionValueText">Value:</div>
                                    <input id="spatialResolutionValueInput" class="form-control form-control-l" name="spatialResolutionValue" type="text">
                                </div>
                            </div>
                        </div>
                        <!--Spatial resolution-->
                        <div class="row"><!--Spatial coverage-->
                            <div class="col-md-24 col-sm-24">
                                <div class="label1" id="spatialCoverageText" title="Geographical area where data applied (only degrees)">Spatial coverage (*):</div>

                                <div class="row"><!--North bound latitude-->
                                    <div class="col-md-24 col-sm-24">
                                        <div class="col-md-push-10 col-md-5 col-sm-push-10 col-sm-5">
                                            <div class="label2 form-control-l cursorPointer" id="spatialCoverageNorthText" title="North bound latitude">North:</div>
                                            <input id="spatialCoverageNorthInput" class="form-control form-control-m" name="northBoundLatitude" type="text">
                                        </div>
                                    </div>
                                    <!--North bound latitude-->

                                    <div class="row"><!--West, image and east-->
                                        <div class="col-md-24 col-sm-24">
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
                                        </div>
                                        <!--West, image and east-->

                                        <div class="row"><!--South-->
                                            <div class="col-md-24 col-sm-24">
                                                <div class="col-md-push-10 col-md-5 col-sm-push-10 col-sm-5">
                                                    <div class="label2 form-control-l cursorPointer" id="spatialCoverageSouthText" title="South bound latitude">South:</div>
                                                    <input id="spatialCoverageSouthInput" class="form-control form-control-m" name="southBoundLatitude" type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <!--Spatial coverage-->
                                        <div class="row"><!-- row Vertical level-->
                                            <div class="col-md-24 col-sm-24"><!--Vertical level-->
                                                <div class="label1" id="verticalLevelText">Vertical level:</div>
                                                <div class="col-md-9 col-sm-9"><!--Select part-->
                                                    <div class="label2 form-control-xl" id="selectCategoryVerticalLevelText">Select a vertical level:</div>
                                                    <select name="verticalLevel" class="form-control form-control-xl" id="selectCategoryVerticalLevelSelect">
                                                        <option value="">None</option>
                                                        <option value="AtmLevel">Atmospheric levels</option>
                                                        <option value="SurfaceLevel">Surface level</option>
                                                        <option value="BelowGroundLevel">Below-ground levels</option>
                                                        <option value="otherValue">Other</option>
                                                    </select>
                                                </div>
                                                <!--Vertical level Select-->
                                                <div class="col-md-8 col-sm-8"><!--Other vertical level-->
                                                    <div id="verticalLevelOtherContainer"><!-- Other part container-->
                                                        <div class="label2 form-control-xl" id="verticalLevelFreeTextText">Other vertical level:</div>
                                                        <input id="verticalLevelFreeTextInput" class="form-control form-control-xxl" name="verticalLevel" type="text">
                                                    </div>
                                                    <!-- Other part container-->
                                                </div>
                                                <!--Other vertical level-->

                                            </div>
                                            <!--Vertical level-->
                                        </div>
                                        <!-- row temporal resol-->
                                    </div>
                                    <!--form-group class-->
                </fieldset>
                <!-- Fieldset2-->

            </fieldset>
            <!--fieldset1-->
        </div>
        <!--Pour placer temp and geo info-->
    </div>
</div>
<!--Temp and geo info row-->

<div id="productDetailsrow" class="row">
    <div class="col-md-24 col-sm-24">
        <div class="col-md-8 col-md-push-7 col-sm-8 col-sm-push-7"><!--Pour placer-->
            <fieldset class="fieldset1" id="productDetailsfieldset1">
                <legend class="legend1">Product description (methodology)</legend>
                <div class="form-group"><!--Permet mettre espacement adapt?/form-->
                    <div id="productDetailsdescriptionRow" class="row">
                        <div class="label1ContactLegend" id="productDetailsDescriptionText">Describe here how was built your product (*):</div>
                        <textarea id="textAreaProductDetails" name="productDetailsStep0" rows="5" cols="60"></textarea>
                    </div>
                    <div id="productDetailsdescriptionRow" class="row"><!--Relate doc with explanation-->
                        <div class="col-md-24 col-sm-24">
                            <div class="label2 form-control-l" id="addDocProductDetailsStep0Text"> URL to describe the product:</div>
                            <input id="addDocProductDetailsStep0Input" class="form-control form-control-m" name="addDocProductDetailsStep0" type="text">
                        </div>
                        <div class="col-md-24 col-sm-24">
                            <div class="label2 form-control-l" id="addDocDescripProductDetailsStep0Text" title="Information about the document related to the url">Information about
                                the url:
                            </div>
                            <textarea id="addDocDescripProductDetailsStep0TextArea" name="addDocDescripProductDetailsStep0" rows="2" cols="60"></textarea>
                        </div>
                    </div>
                    <!--Relate doc with explanation-->
            </fieldset>
        </div>
    </div>
</div>
<!-- productDetails-->

<div id="keywordsAbstractAndCitation" class="row">
<div class="col-md-24 col-sm-24">
<div class="col-md-11 col-md-push-5 col-sm-11 col-sm-push-5"><!--Pour placer-->
<fieldset class="fieldset1" id="keywordsAndAbstractAndCitationsFieldset">
<legend class="legend1">Keywords and reference</legend>
<fieldset id="keywordsAndAbstractFieldset" class="fieldset2">
    <legend class="legend2">Keywords:</legend>
    <div class="form-group"><!--Permet mettre espacement adapt?/form-->
        <div class="label1ContactLegend" id="keywordsInfoText">List of keywords describing the product:</div>
        <input id="keywordsInfoInput" class="form-control form-control-m" name="keywordsInfo" type="text">
    </div>
    <!--form-group-->
</fieldset>
<fieldset id="citationFieldset" class="fieldset2">
    <legend class="legend2">Reference (optional):</legend>
    <div class="form-group">
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-9 col-sm-9">
                    <div class="label1ContactLegend form-control-m" id="citationTitleText" title="Title of the book, of the article, ...">Title (*):</div>
                    <input id="citationTitleInput" class="form-control form-control-xl" name="citationTitle" type="text">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-11 col-sm-11">
                    <div class="label1 form-control-s" id="citationBookDateText">Date (*):</div>
                    <div id="citationDateBookInput" class="dateInput" name="citationBookDate"></div>
                    <!--jqx calendar-->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="label1 form-control-l" id="citationAuthorText">First author information:</div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-l" id="citationAuthorNameText">Name:</div>
                    <input id="citationAuthorNameInput" class="form-control form-control-xl" name="citationAuthorName" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorOrganisationText">Organisation:</div>
                    <input id="citationAuthorOrganisationInput" class="form-control form-control-xl" name="citationAuthorOrganisation" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorMailText">Mail:</div>
                    <input id="citationAuthorMailInput" class="form-control form-control-xl" name="citationAuthorMail" type="text">
                </div>
                <div class="col-md-5 col-sm-5">
                    <div class="label2 form-control-xs" id="citationAuthorRoleText">Role:</div>
                    <select id="citationAuthorRoleSelect" name="citationAuthorRole" class="form-control form-control-xl">
                        <option value="">----</option>
                        <option value="resourceProvider">Resource provider</option>
                        <option value="distibutor">Distributor</option>
                        <option value="originator">Originator</option>
                        <option value="pointOfContact">Point of contact</option>
                        <option value="principalInvestigator">Principal investigator</option>
                        <option value="processor">Processor</option>
                        <option value="author">Author</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-24 col-sm-24">
                    <div class="col-md-9 col-sm-9">
                        <div class="label1 form-control-xxl" id="nameMagazineText">Name of the journal:</div>
                        <input id="nameMagazineInput" class="form-control form-control-xl" name="nameMagazine" type="text"
                               title="Reference of the journal (eg: Volume 89, number 3)">
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xs" id="citationDOIText" title="Digital Object Identifier (unique for each publication)">DOI:</div>
                        <input id="citationDOIInput" class="form-control form-control-m" name="citationDOI" type="text">
                    </div>
                </div>
                <!-- row Name journal & DOI-->
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <div class="label1 form-control-xxl" id="citationCategoryText" title="medium in witch it is published">Category (*):</div>
                        <select id="citationCategorySelect" name="citationBookCategory" class="form-control form-control-xl">
                            <option value="nullValue">----</option>
                            <option value="bookChapter">Book chapter</option>
                            <option value="book">Book</option>
                            <option value="reportManual">Report manual</option>
                            <option value="journalArticle">Journal article</option>
                            <option value="magazineNewspaper">Magazine newspaper</option>
                            <option value="AtlasOrPaperMap">Atlas or paperMap</option>
                            <option value="applicationProgram">Application, program</option>
                        </select>
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xxl" id="citationOnlineRessourceText">Online ressource:</div>
                        <input id="citationOnlineRessourceInput" class="form-control form-control-l" name="citationOnlineRessource" type="text">
                    </div>
                </div>
                <!-- row purpose, category et online ressource-->
            </div>
            <!--form-group-->
</fieldset>
<!--fieldset 2-->

<fieldset id="citationFieldset2" class="fieldset2">
    <legend class="legend2">Reference 2:</legend>
    <div class="form-group">
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-9 col-sm-9">
                    <div class="label1ContactLegend form-control-m" id="citationTitleText2" title="Title of the book, of the article, ...">Title (*):</div>
                    <input id="citationTitleInput2" class="form-control form-control-xl" name="citationTitle2" type="text">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-11 col-sm-11">
                    <div class="label1 form-control-s" id="citationBookDateText2">Date (*):</div>
                    <div id="citationDateBookInput2" class="dateInput" name="citationBookDate2"></div>
                    <!--jqx calendar-->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="label1 form-control-l" id="citationAuthorText2">First author information:</div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-l" id="citationAuthorNameText2">Name:</div>
                    <input id="citationAuthorNameInput2" class="form-control form-control-xl" name="citationAuthorName2" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorOrganisationText2">Organisation:</div>
                    <input id="citationAuthorOrganisationInput2" class="form-control form-control-xl" name="citationAuthorOrganisation2" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorMailText2">Mail:</div>
                    <input id="citationAuthorMailInput2" class="form-control form-control-xl" name="citationAuthorMail2" type="text">
                </div>
                <div class="col-md-5 col-sm-5">
                    <div class="label2 form-control-xs" id="citationAuthorRoleText2">Role:</div>
                    <select id="citationAuthorRoleSelect2" name="citationAuthorRole2" class="form-control form-control-xl">
                        <option value="">----</option>
                        <option value="resourceProvider">Resource provider</option>
                        <option value="distibutor">Distributor</option>
                        <option value="originator">Originator</option>
                        <option value="pointOfContact">Point of contact</option>
                        <option value="principalInvestigator">Principal investigator</option>
                        <option value="processor">Processor</option>
                        <option value="author">Author</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-24 col-sm-24">
                    <div class="col-md-9 col-sm-9">
                        <div class="label1 form-control-xxl" id="nameMagazineText2">Name of the journal:</div>
                        <input id="nameMagazineInput2" class="form-control form-control-xl" name="nameMagazine2" type="text"
                               title="Reference of the journal (eg: Volume 89, number 3)">
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xs" id="citationDOIText2" title="Digital Object Identifier (unique for each publication)">DOI:</div>
                        <input id="citationDOIInput2" class="form-control form-control-m" name="citationDOI2" type="text">
                    </div>
                </div>
                <!-- row Name journal & DOI-->
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <div class="label1 form-control-xxl" id="citationCategoryText2" title="medium in witch it is published">Category (*):</div>
                        <select id="citationCategorySelect2" name="citationBookCategory2" class="form-control form-control-xl">
                            <option value="nullValue">----</option>
                            <option value="bookChapter">Book chapter</option>
                            <option value="book">Book</option>
                            <option value="reportManual">Report manual</option>
                            <option value="journalArticle">Journal article</option>
                            <option value="magazineNewspaper">Magazine newspaper</option>
                            <option value="AtlasOrPaperMap">Atlas or paperMap</option>
                            <option value="applicationProgram">Application, program</option>
                        </select>
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xxl" id="citationOnlineRessourceText2">Online ressource:</div>
                        <input id="citationOnlineRessourceInput2" class="form-control form-control-l" name="citationOnlineRessource2" type="text">
                    </div>
                </div>
                <!-- row purpose, category et online ressource-->
            </div>
            <!--form-group-->
</fieldset>
<!--fieldset 2-->

<fieldset id="citationFieldset3" class="fieldset2">
    <legend class="legend2">Reference 3:</legend>
    <div class="form-group">
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-9 col-sm-9">
                    <div class="label1ContactLegend form-control-m" id="citationTitleText3" title="Title of the book, of the article, ...">Title (*):</div>
                    <input id="citationTitleInput3" class="form-control form-control-xl" name="citationTitle3" type="text">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-11 col-sm-11">
                    <div class="label1 form-control-s" id="citationBookDateText3">Date (*):</div>
                    <div id="citationDateBookInput3" class="dateInput" name="citationBookDate3"></div>
                    <!--jqx calendar-->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="label1 form-control-l" id="citationAuthorText3">First author information:</div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-l" id="citationAuthorNameText3">Name:</div>
                    <input id="citationAuthorNameInput3" class="form-control form-control-xl" name="citationAuthorName3" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorOrganisationText3">Organisation:</div>
                    <input id="citationAuthorOrganisationInput3" class="form-control form-control-xl" name="citationAuthorOrganisation3" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorMailText3">Mail:</div>
                    <input id="citationAuthorMailInput3" class="form-control form-control-xl" name="citationAuthorMail3" type="text">
                </div>
                <div class="col-md-5 col-sm-5">
                    <div class="label2 form-control-xs" id="citationAuthorRoleText3">Role:</div>
                    <select id="citationAuthorRoleSelect3" name="citationAuthorRole3" class="form-control form-control-xl">
                        <option value="">----</option>
                        <option value="resourceProvider">Resource provider</option>
                        <option value="distibutor">Distributor</option>
                        <option value="originator">Originator</option>
                        <option value="pointOfContact">Point of contact</option>
                        <option value="principalInvestigator">Principal investigator</option>
                        <option value="processor">Processor</option>
                        <option value="author">Author</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-24 col-sm-24">
                    <div class="col-md-9 col-sm-9">
                        <div class="label1 form-control-xxl" id="nameMagazineText3">Name of the journal:</div>
                        <input id="nameMagazineInput3" class="form-control form-control-xl" name="nameMagazine3" type="text"
                               title="Reference of the journal (eg: Volume 89, number 3)">
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xs" id="citationDOIText3" title="Digital Object Identifier (unique for each publication)">DOI:</div>
                        <input id="citationDOIInput3" class="form-control form-control-m" name="citationDOI3" type="text">
                    </div>
                </div>
                <!-- row Name journal & DOI-->
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <div class="label1 form-control-xxl" id="citationCategoryText3" title="medium in witch it is published">Category (*):</div>
                        <select id="citationCategorySelect3" name="citationBookCategory3" class="form-control form-control-xl">
                            <option value="nullValue">----</option>
                            <option value="bookChapter">Book chapter</option>
                            <option value="book">Book</option>
                            <option value="reportManual">Report manual</option>
                            <option value="journalArticle">Journal article</option>
                            <option value="magazineNewspaper">Magazine newspaper</option>
                            <option value="AtlasOrPaperMap">Atlas or paperMap</option>
                            <option value="applicationProgram">Application, program</option>
                        </select>
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xxl" id="citationOnlineRessourceText3">Online ressource:</div>
                        <input id="citationOnlineRessourceInput3" class="form-control form-control-l" name="citationOnlineRessource3" type="text">
                    </div>
                </div>
                <!-- row purpose, category et online ressource-->
            </div>
            <!--form-group-->
</fieldset>
<!--fieldset 2-->

<fieldset id="citationFieldset4" class="fieldset2">
    <legend class="legend2">Reference 4:</legend>
    <div class="form-group">
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-9 col-sm-9">
                    <div class="label1ContactLegend form-control-m" id="citationTitleText4" title="Title of the book, of the article, ...">Title (*):</div>
                    <input id="citationTitleInput4" class="form-control form-control-xl" name="citationTitle4" type="text">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-11 col-sm-11">
                    <div class="label1 form-control-s" id="citationBookDateText4">Date (*):</div>
                    <div id="citationDateBookInput4" class="dateInput" name="citationBookDate4"></div>
                    <!--jqx calendar-->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="label1 form-control-l" id="citationAuthorText4">First author information:</div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-l" id="citationAuthorNameText4">Name:</div>
                    <input id="citationAuthorNameInput4" class="form-control form-control-xl" name="citationAuthorName4" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorOrganisationText4">Organisation:</div>
                    <input id="citationAuthorOrganisationInput4" class="form-control form-control-xl" name="citationAuthorOrganisation4" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorMailText4">Mail:</div>
                    <input id="citationAuthorMailInput4" class="form-control form-control-xl" name="citationAuthorMail4" type="text">
                </div>
                <div class="col-md-5 col-sm-5">
                    <div class="label2 form-control-xs" id="citationAuthorRoleText4">Role:</div>
                    <select id="citationAuthorRoleSelect4" name="citationAuthorRole4" class="form-control form-control-xl">
                        <option value="">----</option>
                        <option value="resourceProvider">Resource provider</option>
                        <option value="distibutor">Distributor</option>
                        <option value="originator">Originator</option>
                        <option value="pointOfContact">Point of contact</option>
                        <option value="principalInvestigator">Principal investigator</option>
                        <option value="processor">Processor</option>
                        <option value="author">Author</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-24 col-sm-24">
                    <div class="col-md-9 col-sm-9">
                        <div class="label1 form-control-xxl" id="nameMagazineText4">Name of the journal:</div>
                        <input id="nameMagazineInput4" class="form-control form-control-xl" name="nameMagazine4" type="text"
                               title="Reference of the journal (eg: Volume 89, number 3)">
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xs" id="citationDOIText4" title="Digital Object Identifier (unique for each publication)">DOI:</div>
                        <input id="citationDOIInput4" class="form-control form-control-m" name="citationDOI4" type="text">
                    </div>
                </div>
                <!-- row Name journal & DOI-->
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <div class="label1 form-control-xxl" id="citationCategoryText4" title="medium in witch it is published">Category (*):</div>
                        <select id="citationCategorySelect4" name="citationBookCategory4" class="form-control form-control-xl">
                            <option value="nullValue">----</option>
                            <option value="bookChapter">Book chapter</option>
                            <option value="book">Book</option>
                            <option value="reportManual">Report manual</option>
                            <option value="journalArticle">Journal article</option>
                            <option value="magazineNewspaper">Magazine newspaper</option>
                            <option value="AtlasOrPaperMap">Atlas or paperMap</option>
                            <option value="applicationProgram">Application, program</option>
                        </select>
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xxl" id="citationOnlineRessourceText4">Online ressource:</div>
                        <input id="citationOnlineRessourceInput4" class="form-control form-control-l" name="citationOnlineRessource4" type="text">
                    </div>
                </div>
                <!-- row purpose, category et online ressource-->
            </div>
            <!--form-group-->
</fieldset>
<!--fieldset 2-->

<fieldset id="citationFieldset5" class="fieldset2">
    <legend class="legend2">Reference 5:</legend>
    <div class="form-group">
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-9 col-sm-9">
                    <div class="label1ContactLegend form-control-m" id="citationTitleText5" title="Title of the book, of the article, ...">Title (*):</div>
                    <input id="citationTitleInput5" class="form-control form-control-xl" name="citationTitle5" type="text">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="col-md-11 col-sm-11">
                    <div class="label1 form-control-s" id="citationBookDateText5">Date (*):</div>
                    <div id="citationDateBookInput5" class="dateInput" name="citationBookDate5"></div>
                    <!--jqx calendar-->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-24 col-sm-24">
                <div class="label1 form-control-l" id="citationAuthorText5">First author information:</div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-l" id="citationAuthorNameText5">Name:</div>
                    <input id="citationAuthorNameInput5" class="form-control form-control-xl" name="citationAuthorName5" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorOrganisationText5">Organisation:</div>
                    <input id="citationAuthorOrganisationInput5" class="form-control form-control-xl" name="citationAuthorOrganisation5" type="text">
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="label2 form-control-xs" id="citationAuthorMailText5">Mail:</div>
                    <input id="citationAuthorMailInput5" class="form-control form-control-xl" name="citationAuthorMail5" type="text">
                </div>
                <div class="col-md-5 col-sm-5">
                    <div class="label2 form-control-xs" id="citationAuthorRoleText5">Role:</div>
                    <select id="citationAuthorRoleSelect5" name="citationAuthorRole5" class="form-control form-control-xl">
                        <option value="">----</option>
                        <option value="resourceProvider">Resource provider</option>
                        <option value="distibutor">Distributor</option>
                        <option value="originator">Originator</option>
                        <option value="pointOfContact">Point of contact</option>
                        <option value="principalInvestigator">Principal investigator</option>
                        <option value="processor">Processor</option>
                        <option value="author">Author</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-24 col-sm-24">
                    <div class="col-md-9 col-sm-9">
                        <div class="label1 form-control-xxl" id="nameMagazineText5">Name of the journal:</div>
                        <input id="nameMagazineInput5" class="form-control form-control-xl" name="nameMagazine5" type="text"
                               title="Reference of the journal (eg: Volume 89, number 3)">
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xs" id="citationDOIText5" title="Digital Object Identifier (unique for each publication)">DOI:</div>
                        <input id="citationDOIInput5" class="form-control form-control-m" name="citationDOI5" type="text">
                    </div>
                </div>
                <!-- row Name journal & DOI-->
                <div class="row">
                    <div class="col-md-8 col-sm-8">
                        <div class="label1 form-control-xxl" id="citationCategoryText5" title="medium in witch it is published">Category (*):</div>
                        <select id="citationCategorySelect5" name="citationBookCategory5" class="form-control form-control-xl">
                            <option value="nullValue">----</option>
                            <option value="bookChapter">Book chapter</option>
                            <option value="book">Book</option>
                            <option value="reportManual">Report manual</option>
                            <option value="journalArticle">Journal article</option>
                            <option value="magazineNewspaper">Magazine newspaper</option>
                            <option value="AtlasOrPaperMap">Atlas or paperMap</option>
                            <option value="applicationProgram">Application, program</option>
                        </select>
                    </div>
                    <div class="col-md-11 col-sm-11">
                        <div class="label1 form-control-xxl" id="citationOnlineRessourceText5">Online ressource:</div>
                        <input id="citationOnlineRessourceInput5" class="form-control form-control-l" name="citationOnlineRessource5" type="text">
                    </div>
                </div>
                <!-- row purpose, category et online ressource-->
            </div>
            <!--form-group-->
</fieldset>
<!--fieldset 2-->


<div class="row"><!-- rangee avec bouton add/quit-->
    <div class="col-md-24 col-sm-24">
        <div class="cursorPointer" title="Click to add/delete Reference information (no more than 5)">Add/delete Reference information:</div>
    </div>
    <div class="col-md-24 col-sm-24">
        <div class="col-md-push-1 col-md-1 col-sm-push-1 col-sm-1">
            <img id="addReferenceInfoButton" src="img/addChamp.svg" class=" img-responsive img-rounded addQuitAllContainer">
        </div>
        <div class="col-md-push-1 col-md-21 col-sm-push-1 col-sm-21">
            <img id="quitReferenceInfoButton" src="img/quitChamp.svg" class=" img-responsive img-rounded addQuitAllContainer">
        </div>
    </div>
    <!-- rangee avec bouton add/quit-->
</fieldset>
</div>
</div>
</div>


<div id="qualityDataInformation" class="row">
    <div class="col-md-24 col-sm-24">
        <div class="col-md-11 col-md-push-7 col-sm-11 col-sm-push-7"><!--Pour placer-->
            <fieldset class="fieldset1" id="qualityDataInformationFieldset">
                <legend class="legend1">Quality data information</legend>
                <div class="label1ContactLegend form-control-xxl" id="discoveredIssueText" title="Describe here some issues identified with the quality related to this data.">
                    Quality description (availability of product-errors, product evaluation, ...) (*):
                </div>
                <textarea id="discoveredIssueArea" name="discoveredIssueQualityData" rows="10" cols="80"></textarea>

                <div class="label2 form-control-xxl" id="standAloneText" title="Reference to a document to illustrate quality description">Document URL to describe quality:</div>
                <input id="standAloneInput" class="form-control form-control-s" name="standAloneName" type="text">
            </fieldset>
        </div>
    </div>
</div>


<div id="accessAndUseLimitations" class="row">
    <div class="col-md-24 col-sm-24">
        <div class="col-md-7 col-md-push-8 col-sm-7 col-sm-push-8"><!--Pour placer-->
            <fieldset class="fieldset1" id="accessAndUseLimitationsFieldset">
                <legend class="legend1">Data access and data use policy</legend>
                <div class="form-group">
                    <div class="row">
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
                    </div>
                    <!--row name, mail, phone PI-->
                    <div class="row">
                        <div class="col-md-24 col-sm-24">
                            <div class="col-md-9 col-sm-9">
                                <div class="label1 form-control-xxl" id="originalDataUrlText">Original data URL:</div>
                                <input id="originalDataUrlInput" class="form-control form-control-xxl" name="originalDataUrl" type="text">
                            </div>
                        </div>
                    </div>
                    <!-- row data url-->
                    <div class="row">
                        <div class="col-md-24 col-sm-24">
                            <div class="label1 form-control-l" id="dataPolicyText">Data policy:</div>
                        </div>
                        <div class="row">
                            <div class="col-md-24 col-sm-24">
                                <div class="label2 form-control-xxl" id="dataPolicyChooseText">Select a data policy:</div>
                                <select id="dataPolicyChooseSelect" class="form-control form-control-m" name="dataPolicy" type="text">
                                    <option value="">None</option>
                                    <option value="freeToUse">Free to use</option>
                                    <option value="restrictedToScientists">Restricted to scientists</option>
                                    <option value="notFree">Not free: contact PI</option>
                                    <option value="otherValue">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-24 col-sm-24">
                            <div id="dataPolicyFreeContainer">
                                <div class="label2 form-control-xxl" id="dataPolicyFreeText">Other data policy:</div>
                                <textarea id="dataPolicyFreeInput" name="dataPolicy" rows="3" cols="60"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- row Data policy-->
        </div>
        <!-- Form-group-->
        </fieldset>
    </div>
</div>
</div>


<input id="submitFormButon" type="submit" value="Submit"/>
<!--</div>--><!-- =  ???-->
</form>
</div><!-- Fin container -->

<script text="text/javascript">
    // See http://www.jankoatwarpspeed.com/turn-any-webform-into-a-powerful-wizard-with-jquery-formtowizard-plugin/
    $( document ).ready( function()
    {
        manageFormDiv();
    } );

    $( "#metadataForm" ).jqxValidator( {rules: validatorRules } );

    // Pour adapter chgment window:
    $( '#metadataForm' ).jqxValidator( 'updatePosition' );// Ne me fait rien !!!

    // Operation sur XML metadat via DOM :
    //var xmlDoc=loadXMLDoc();// On appelle la fonction (script ds .js externe):
    // On peut ensuite faire les operations que l'on veut sur le xml metadat:

    /*var txtValue= xmlDoc.getElementsByTagName("gco:CharacterString")[0].childNodes[0].nodeValue;// txt= valeur du 1er node  text
       console.log(txtValue); */

    // Test: je change cette "valeur" :
    /*var txtNew= xmlDoc.getElementsByTagName("gco:CharacterString")[0].childNodes[0];
         txtNew.nodeValue= "gygygy";
       var txtValue2= xmlDoc.getElementsByTagName("gco:CharacterString")[0].childNodes[0].nodeValue;
     console.log(txtValue2);// OK, ?a marche, m'affiche bien gygygy mais ne me l'a pas change sur xml: comment garder les chgments ????

     // Pour avoir acces plus "proprement" a texte productName:
     var fileIdentifier= xmlDoc.getElementsByTagName("gmd:fileIdentifier")[0].childNodes[0];// Etape 1: identifier clairement quel est l'element que l'on veut (avec tagName et position). On peut ensuite appeler les proprietes pour cet element (nodeName, ....).
     var fileIdentifierNodeName= fileIdentifier.nodeName;// = #text si childNodes[0] !!!
     console.log(fileIdentifierNodeName);*/


    $( "#metadataForm" ).formToWizard();

</script>

</body>
<html>

