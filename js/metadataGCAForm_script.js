<!--**************************************************************************************** -->
<!--*********************************** DATA CONTRIBUTOR *********************************** -->
<!--**************************************************************************************** -->
/**
 * This method returns the array of rules for the contributor's fields
 * @param index : index of the contributor
 */
function getContributorRules( index )
{
    return [
        {input: "#dataProducerInfoNameInput" + index, message: "This field is mandatory", action: "keyup, blur", rule: "required"},
        {input: "#dataProducerInfoNameInput" + index, message: "Characters not authorized", action: "keyup, blur",  rule: function( arguments )
        {
            return ("" == arguments[0].value || /^[a-zA-Z._ -]+$/.test( arguments[0].value ));
        }},
        {input: "#dataProducerInfoOrganisationInput" + index, message: "This field is mandatory", action: "keyup, blur", rule: "required"},
        {input: "#dataProducerInfoMailInput" + index, message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
        {input: "#dataProducerInfoMailInput" + index, message: "This field is mandatory", action: "keyup, blur", rule: "required"},
        {input: "#dataProducerInfoRoleSelect" + index, message: "This field is mandatory", action: "change",  rule: function( arguments )
        {
            return "nullValue" != arguments[0].value;
        }},
    ];
}

/**
 *  This method add a new contributor with the index "index" into the contributors container
 *  reorganize the list of contributors and add the new contributor's rules to form
 * @param containerId : container's id of the main contributors div
 * @param index : contributor's index
 */
function createContributorDiv( containerId, index )
{
    var containerDiv = $( '<div id="dataContributorContainer' + index + '" class="row col-md-24 col-sm-24">' +
            '<div id="dataProducerInfoText' + index + '" class="col-md-24 col-sm-24 label1" title="Information about the person who created the data file">Data contributors information <div id="dataContributorNumber' + index + '" class="dataContributorNumber"></div> :' +
            '</div>' +

            '<div class="col-md-24 col-sm-24">' +
            '<div class="col-md-9 col-sm-9">' +
            '<div id="dataProducerInfoNameText' + index + '" class="label2 form-control-l">Name (*):</div>' +
            '<input id="dataProducerInfoNameInput' + index + '" class="form-control form-control-xl mandatoryField" name="dataProducerInfoName' + index + '" type="text">' +
            '</div>' +
            '<div class="col-md-14 col-sm-14">' +
            '<div id="dataProducerInfoOrganisationText' + index + '" class="label2 form-control-xxl">Name of the organisation (*):</div>' +
            '<input id="dataProducerInfoOrganisationInput' + index + '" class="form-control form-control-l mandatoryField" name="dataProducerInfoOrganisation' + index + '" type="text">' +
            '</div>' +
            '</div>' +

            '<div class="col-md-24 col-sm-24">' +
            '<div class="col-md-9 col-sm-9">' +
            '<div id="dataProducerInfoMailText' + index + '" class="label2 form-control-l">Mail (*):</div>' +
            '<input id="dataProducerInfoMailInput' + index + '" class="form-control form-control-xl" name="dataProducerInfoMail' + index + '" type="text">' +
            '</div>' +
            '<div class="col-md-14 col-sm-14">' +
            '<div id="dataProducerInfoRoleText' + index + '" class="label2 form-control-xxl">Role (*):</div>' +
            '<select id="dataProducerInfoRoleSelect' + index + '" class="form-control form-control-m" name="dataProducerInfoRole' + index + '">' +
            '<option value="nullValue">----</option>' +
            '<option value="Originator">Originator</option>' +
            '<option value="Point of Contact">Point of contact</option>' +
            '<option value="Principal investigator">Principal investigator</option>' +
            '<option value="Processor">Processor</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '</div>' );

    $( "#" + containerId ).append( containerDiv );

    // Mail input
    $( "#dataProducerInfoNameInput" + index ).jqxInput( {height: "20px", placeHolder: "First name last name"} );
    $( "#dataProducerInfoMailInput" + index ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );

    // Remove button
    $( "#dataProducerInfoText" + index ).append( '<img id="removeCreatorInfoButton' + index + '" src="img/quitChamp.png" class="img-responsive img-rounded addQuitAllContainer removeCreatorInfoButton cursorPointer" title= "Click to delete this data contributor information">' );
    $( "#removeCreatorInfoButton" + index ).click( function()
    {
        removeContributorDiv( "dataContributorContainer", index );
    } );

    manageContributorsDiv();

    // Contributor's rules
    var contributorsRulesArray = getContributorRules( index );
    addRulesToRulesForm( contributorsRulesArray );
}

/**
 * This method remove the contributor divs corresponding to the divId
 * reorganize the contributors list and remove the contributor rules for the form
 * @param divName : div's name without the index
 * @param index : index of the contributor's div to remove
 */
function removeContributorDiv( divName, index )
{
    $( "#" + divName + "" + index ).remove();
    manageContributorsDiv();
    $( '#metadataForm' ).jqxValidator( 'hide' );

    var contributorsRulesArray = getContributorRules( index );
    removeRulesToRulesForm( contributorsRulesArray );
}

/**
 * This method reorganize the list of contributors :
 *   - Show the "add contributor button" only if there's less than 5 contributors
 *   - Show the "remove contributor button" only if there's more than 2 contributors
 *   - Enumerate the contributors for user display
 */
function manageContributorsDiv()
{
    // Hide or show the "add contributor button"
    if( 5 <= $( 'input[id^="dataProducerInfoNameInput"]' ).length )
        $( "#contributorsContainerButton" ).hide();
    else
        $( "#contributorsContainerButton" ).show();

    // Hide or show the "remove contributor button"
    if( 1 < $( 'input[id^="dataProducerInfoNameInput"]' ).length )
        $( ".removeCreatorInfoButton" ).show();
    else
        $( ".removeCreatorInfoButton" ).hide();

    // Numerate the list of contributors
    jQuery.each( $( 'div[id^="dataContributorNumber"]' ), function( i, element )
    {
        $( element ).html( i + 1 );
    } );
}

<!--**************************************************************************************** -->
<!--*********************************** DESCRIPTION PRODUCT  *********************************** -->
<!--**************************************************************************************** -->
function getProductDetailsStepRules( index )
{
    return [
    	{input: '#textAreaProductDetails' + index + '',  message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    	{input: '#addDocProductDetailsStepInput' + index + '', message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    ];
}

function createProductDescrStepDiv( containerId, index )
{
    var containerDiv = $( '<div id="productDetailsDescriptionStepContainer' + index + '" class="row col-md-24 col-sm-24 stepsClass">' +
		'<div class="label2b form-control-l" id="infoProductDetailsText' + index + '">Step <div id="DescriptionStepNumber' + index + '" class="DescriptionStepNumberClass"></div>:' +
		'</div>' +
		'<div id= "stepDescription' + index + '" class= "label2 stepDescriptionClass">Description (*):</div>' +
                '<textarea id="textAreaProductDetails' + index + '" name="productDetailsStep' + index + '" rows="5" cols="60"></textarea>' +
              '<div id="productDetailsdescriptionRow' + index + '" class="row">' +
               '<div class="col-md-24 col-sm-24">' +
               '<div class="label2 form-control-l" id="addDocProductDetailsStepText' + index + '"> Document URL to describe the product:</div>' +
               '<input id="addDocProductDetailsStepInput' + index + '" class="form-control form-control-m" name="addDocProductDetailsStep' + index + '" type="text">' +
                '</div>' +
                '<div class="col-md-24 col-sm-24">' +
                '<div class="label2 form-control-xxl cursorPointer" id="addDocDescripProductDetailsStepText' + index + '">Information about the document related to the url:</div>' +
                '<textarea id="addDocDescripProductDetailsStepTextArea' + index + '" name="addDocDescripProductDetailsStep' + index + '" rows="1" cols="60"></textarea>' +
                '</div>' +
	        '</div>' +
                '</div>' +
    '</div>');

    $("#" + containerId).append(containerDiv);

    // Placeholder indications:
    $( "#textAreaProductDetails" + index ).jqxInput( {placeHolder: "If you can't full in this part please indicate why you don't have this information"} );
    $( "#addDocProductDetailsStepInput" + index ).jqxInput( {placeHolder: "something@mail.com"} );

    // Remove button
    $( "#infoProductDetailsText" + index ).append( '<img id="removeProductDetailsStepButton' + index + '" src="img/quitChamp.png" class="img-responsive img-rounded addQuitAllContainer removeProductDetailsStepButtonClass cursorPointer" title= "Click to delete this product description-step">' );
    $( "#removeProductDetailsStepButton" + index ).click( function()
    {
        removeProductDetailsStepDiv( "productDetailsDescriptionStepContainer", index );
    } );

    manageProductDetailsStepDiv();

	// ProductDetailsStep's rules
	     var productDetailsStepRulesArray = getProductDetailsStepRules( index );
	     addRulesToRulesForm(productDetailsStepRulesArray);
}

function removeProductDetailsStepDiv( divName, index )
{
    	$( "#" + divName + "" + index ).remove();
    	manageProductDetailsStepDiv();
    	$( '#metadataForm' ).jqxValidator( 'hide' );

    	var productDetailsStepRulesArray = getProductDetailsStepRules( index );
    	removeRulesToRulesForm(productDetailsStepRulesArray);
}

function manageProductDetailsStepDiv()
{
    // Hide or show the "remove step button"
    if( 1 < $( 'input[id^="addDocProductDetailsStepInput"]' ).length )
        $( ".removeProductDetailsStepButtonClass" ).show();
    else
        $( ".removeProductDetailsStepButtonClass" ).hide();

    // Numerate the list of step
    jQuery.each( $( 'div[id^="DescriptionStepNumber"]' ), function( i, element )
    {
        $( element ).html( i + 1 );
    } );
}
<!--**************************************************************************************** -->
<!--************************************** REFERENCES ************************************** -->
<!--**************************************************************************************** -->
/**
 * This method returns the array of rules for the reference's fields
 * @param index : index of the contributor
 */
function getReferenceRules( index )
{
    return [
        {input: "#citationTitleInput" + index, message: "This field is mandatory", action: "blur, keyup", rule: "required" },
        {input: "#citationDateBookInput" + index, message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function()
        {
            var d = new Date();
            var day = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            var complete_d = year + "-" + (10 > month ? "0" : "") + month + "-" +  (10 > day ? "0" : "") + day;
		
            return $("#citationDateBookInput" +index).val() != complete_d;
        }},
        {input: "#citationAuthorNameInput" + index, message: "Characters not authorized", action: "keyup, blur",  rule: function( arguments )
        {
            return ("" == arguments[0].value || /^[a-zA-Z._ -]+$/.test( arguments[0].value ));
        }},
        {input: "#citationAuthorMailInput" + index, message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
        {input: "#citationDOIInput" + index, message: "Characters not authorized", action: "keyup, blur",  rule: function( arguments )
        {
            return ("" == arguments[0].value || /^[0-9./]+$/.test( arguments[0].value ));
        }},
        {input: "#citationCategorySelect" + index, message: "This field is mandatory", action: "change",  rule: function( arguments )
        {
            return "nullValue" != arguments[0].value;
        }},
        {input: "#citationOnlineRessourceInput" + index, message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    ];
}

/**
 *  This method add a new reference with the index "index" into the references container
 *  reorganize the list of references and add the new reference's rules to form
 * @param containerId : container's id of the main references div
 * @param index : reference's index
 */
function createReferenceFieldset( containerIdRef, index )
{
    var containerDivRef = $( '<fieldset id="citationFieldset' + index + '" class="fieldset2">' +
            '<legend id= "legendReferenceId' + index + '" class="legend2">Reference <div id="referenceNumber' + index + '" class="referenceNumber"></div> (optional):</legend>' +
            '<div class="form-group">' +

            '<div class="col-md-24 col-sm-24">' +
            '<div class="label1ContactLegend form-control-m" id="citationTitleText' + index + '" title="Title of the book, of the article, ...">Title (*):</div>' +
            '<input id="citationTitleInput' + index + '" class="form-control form-control-m" name="citationTitle' + index + '" type="text">' +
            '</div>' +

            '<div class="col-md-24 col-sm-24">' +
            '<div class="label1 form-control-l" id="citationBookDateText' + index + '">Publication date (*):</div>' +
            '<div id="citationDateBookInput' + index + '" class="dateInput" name="citationBookDate' + index + '"></div>' +
            '</div>' +

            '<div class="col-md-24 col-sm-24">' +
            '<div class="label1 form-control-l" id="citationAuthorText' + index + '">First author information:</div>' +
            '<div class="col-md-6 col-sm-6">' +
            '<div class="label2 form-control-l" id="citationAuthorNameText' + index + '">Name:</div>' +
            '<input id="citationAuthorNameInput' + index + '" class="form-control form-control-xl" name="citationAuthorName' + index + '" type="text">' +
            '</div>' +
            '<div class="col-md-6 col-sm-6">' +
            '<div class="label2 form-control-xs" id="citationAuthorOrganisationText' + index + '">Organisation:</div>' +
            '<input id="citationAuthorOrganisationInput' + index + '" class="form-control form-control-xl" name="citationAuthorOrganisation' + index + '" type="text">' +
            '</div>' +
            '<div class="col-md-6 col-sm-6">' +
            '<div class="label2 form-control-xs" id="citationAuthorMailText' + index + '">Mail:</div>' +
            '<input id="citationAuthorMailInput' + index + '" class="form-control form-control-xl" name="citationAuthorMail' + index + '" type="text">' +
            '</div>' +
            '<div class="col-md-5 col-sm-5">' +
            '<div class="label2 form-control-xs" id="citationAuthorRoleText' + index + '">Role:</div>' +
            '<select id="citationAuthorRoleSelect' + index + '" name="citationAuthorRole' + index + '" class="form-control form-control-xl">' +
            '<option value="">----</option>' +
            '<option value="Resource provider">Resource provider</option>' +
            '<option value="Distributor">Distributor</option>' +
            '<option value="Originator">Originator</option>' +
            '<option value="Point of contact">Point of contact</option>' +
            '<option value="Principal investigator">Principal investigator</option>' +
            '<option value="Processor">Processor</option>' +
            '<option value="Author">Author</option>' +
            '</select>' +
            '</div>' +
            '</div>' +

            '<div class="col-md-24 col-sm-24">' +
            '<div class="col-md-9 col-sm-9">' +
            '<div class="label1 form-control-xxl" id="nameMagazineText' + index + '">Name of the journal:</div>' +
            '<input id="nameMagazineInput' + index + '" class="form-control form-control-xl" name="nameMagazine' + index + '" type="text" title="Reference of the journal (eg: Volume 89, number 3)">' +
            '</div>' +
            '<div class="col-md-11 col-sm-11">' +
            '<div class="label1 form-control-xs" id="citationDOIText' + index + '" title="Digital Object Identifier (unique for each publication)">DOI:</div>' +
            '<input id="citationDOIInput' + index + '" class="form-control form-control-m" name="citationDOI' + index + '" type="text">' +
            '</div>' +
            '</div>' +

            '<div class="col-md-8 col-sm-8">' +
            '<div class="label1 form-control-xxl" id="citationCategoryText' + index + '" title="medium in witch it is published">Category (*):</div>' +
            '<select id="citationCategorySelect' + index + '" name="citationBookCategory' + index + '" class="form-control form-control-xl">' +
            '<option value="nullValue">----</option>' +
            '<option value="Book chapter">Book chapter</option>' +
            '<option value="Book">Book</option>' +
            '<option value="Report manual">Report manual</option>' +
            '<option value="Journal article">Journal article</option>' +
            '<option value="Magazine newspaper">Magazine newspaper</option>' +
            '<option value="Atlas or paperMap">Atlas or paperMap</option>' +
            '<option value="Application, program">Application, program</option>' +
            '</select>' +
            '</div>' +

            '<div class="col-md-11 col-sm-11">' +
            '<div class="label1 form-control-xxl" id="citationOnlineRessourceText' + index + '">Online resource:</div>' +
            '<input id="citationOnlineRessourceInput' + index + '" class="form-control form-control-l" name="citationOnlineRessource' + index + '" type="text">' +
            '</div>' +

            '</div>' +
            '</fieldset>' );

    $( "#" + containerIdRef ).append( containerDivRef );
  
    // Date
    $( "#citationDateBookInput" + index ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );

    // Name input
    $( "#citationAuthorNameInput" + index ).jqxInput( {height: "20px", placeHolder: "First name last name"} );
	
    // Mail input
    $( "#citationAuthorMailInput" + index ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
    $( "#citationOnlineRessourceInput" + index ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );

    // DOI
    $( "#citationDOIInput" + index ).jqxInput( {height: "20px", placeHolder: "10.1000/182"} );
	
    // Remove button
    $( "#legendReferenceId" + index ).append( '<img id="removeReferenceInfoButton' + index + '" src="img/quitChamp.png" class="img-responsive img-rounded addQuitAllContainer removeReferenceInfoButton cursorPointer" title= "Click to delete this reference">' );
    $( "#removeReferenceInfoButton" + index ).click( function()
    {
        removeReferenceDiv( "citationFieldset", index );
    } );

    manageReferencesDiv();

    // Contributor's rules
    var referencesRulesArray = getReferenceRules( index );
    addRulesToRulesForm( referencesRulesArray );
}


/**
 * This method remove the reference divs corresponding to the divId
 * reorganize the references list and remove the reference rules for the form
 * @param divName : div's name without the index
 * @param index : index of the reference's div to remove
 */
function removeReferenceDiv( divName, index )
{
    $( "#" + divName + "" + index ).remove();
    manageReferencesDiv();
    $( '#metadataForm' ).jqxValidator( 'hide' );

    var referencesRulesArray = getReferenceRules( index );
    removeRulesToRulesForm( referencesRulesArray );
}

/**
 * This method reorganize the list of references :
 *   - Show the "add reference button" only if there's less than 5 references
 *   - Show the "remove reference button" only if there's more than 2 references
 *   - Enumerate the references for user display
 */
function manageReferencesDiv()
{
    // Hide or show the "add reference  button"
    if( 5 <= $( 'input[id^="citationTitleInput"]' ).length )
        $( "#referencesContainerButton" ).hide();
    else
        $( "#referencesContainerButton" ).show();
    // Numerate the list of references
    jQuery.each( $( 'div[id^="referenceNumber"]' ), function( i, element )
    {
        $( element ).html( i + 1 );
    } );
}


<!--**************************************************************************************** -->
<!--***************************************** MAIN ***************************************** -->
<!--**************************************************************************************** -->
function manageFormDiv()
{
    <!--********************** CONTRIBUTORS ********************** -->
    // Contributors : add button
    $( "#addCreatorInfoButton" ).click( function()
    {
        var contributorsLastId = $( 'input[id^="dataProducerInfoNameInput"]' ).last().attr( 'id' ).replace( "dataProducerInfoNameInput", "" );
        if( 5 > $( 'input[id^="dataProducerInfoNameInput"]' ).length )
        {
            createContributorDiv( "contributorsContainer", contributorsLastId + 1 );
        }
        else
            alert( "You can't add more than 5 contributors" );
    } );

    <!--********************** REFERENCES ********************** -->
    $( "#addReferenceInfoButton" ).click( function()
    {
        if($( 'input[id^="citationTitleInput"]' ).length >= 1)
	{
        var referencesLastId = $( 'input[id^="citationTitleInput"]' ).last().attr( 'id' ).replace( "citationTitleInput", "" );
            createReferenceFieldset( "referencesContainer", referencesLastId + 1 );
        }
	else return false;
    } );

    <!--********************** PRODUCT DESCRIPTION  ********************** -->
    $( "#addProductDetailsStepButton").click( function()
    	{
        var productDetailsStepLastId = $( 'input[id^="addDocProductDetailsStepInput"]' ).last().attr( 'id' ).replace( "addDocProductDetailsStepInput", "" );
        createProductDescrStepDiv( "productDetailsDescriptionContainer", productDetailsStepLastId + 1 );
    });

    <!--********************** OTHERS FIELDS ********************** -->
    // Pour tt ce qui est select + freeText
    //Note : comment faire test if select / element : CF http://stackoverflow.com/questions/10198398/how-is-jquery-used-to-check-for-the-disabled-attribute-on-an-a-tag
    // Conditions initiales/ apparaitre ou non option free text / select :
    $( "#dataProductTypeFreeTextText" ).hide();// hide : laisse les elements a leur places.
    $( "#dataProductTypeFreeTextInput" ).hide();
    $( "#dataProductCategoryFreeTextText" ).hide();
    $( "#dataProductCategoryFreeTextInput" ).hide();
    $( "#dataProductCategoryFreeTextInput" ).prop( "disabled", true );//Necessaire de le faire car freeTextInput et select ont meme name
    $( "#dataProductTypeFreeTextInput" ).prop( "disabled", true );
    //
    $( "#temporalResolFreeTextText" ).hide();
    $( "#temporalResolFreeTextInput" ).hide();
    $( "#temporalResolFreeTextInput" ).prop( "disabled", true );
    //
    $( "#verticalLevelOtherContainer" ).hide();
    $( "#verticalLevelFreeTextInput" ).prop( "disabled", true );
    //
    $( "#dataPolicyFreeContainer" ).hide();
    $( "#dataPolicyFreeInput" ).prop( "disabled", true );

    // Other fields in select
    HideOrShowOtherFieldForSelect( "dataProductTypeSelect", "dataProductTypeFreeTextInput", "dataProductTypeFreeTextText" );
    HideOrShowOtherFieldForSelect( "dataProductCategorySelect", "dataProductCategoryFreeTextInput", "dataProductCategoryFreeTextText" );
    HideOrShowOtherFieldForSelect( "temporalResolutionSelect", "temporalResolFreeTextInput", "temporalResolFreeTextText" );
    HideOrShowOtherFieldForSelect( "selectCategoryVerticalLevelSelect", "verticalLevelFreeTextInput", "verticalLevelOtherContainer" );
    HideOrShowOtherFieldForSelect( "dataPolicyChooseSelect", "dataPolicyFreeInput", "dataPolicyFreeContainer" );

    // Utilisation masques / inputs form avec jqxmaskedinputs : See http://www.jqwidgets.com/community/topic/masked-input-optional-characters/
    $( "#principalInvestigatorContactPhoneInput" ).jqxMaskedInput( {width: 150, height: 20, theme: "bootstrap", promptChar: "-",mask: "+(##)/###########"} );

    // Utilisation jqxDateTimeInput :
    $( "#metadataDateCreationInput" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );// Ds ce cas là on affiche par default date du jour dc laisser comme ça, sans avoir a valider
    $( "#dataDateCreationInput" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );// Ds ce cas là on doit afficher erreur si la date n'est pas changée..
    $( "#temporalCoverageBegin" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );
    $( "#temporalCoverageEnd" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );

    // Utilisation jqxinput pour afficher info qui s'efface quand on commence à rentrer texte ds  input (placeHolder)
    $( "#metadatCreatorInfoNameInput" ).jqxInput( {height: "20px", placeHolder: "First name last name"} );
    $( "#metadatCreatorInfoMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
    $( "#spatialResolutionValueInput" ).jqxInput( {height: "20px", placeHolder: "3.5"} );
    $( "#spatialCoverageNorthInput" ).jqxInput( {height: "20px", placeHolder: "90"} );
    $( "#spatialCoverageSouthInput" ).jqxInput( {height: "20px", placeHolder: "-90"} );
    $( "#spatialCoverageWestInput" ).jqxInput( {height: "20px", placeHolder: "-180"} );
    $( "#spatialCoverageEastInput" ).jqxInput( {height: "20px", placeHolder: "180"} );
    $( "#principalInvestigatorContactNameInput" ).jqxInput( {height: "20px", placeHolder: "First name last name"} );
    $( "#principalInvestigatorContactMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
    $( "#keywordsInfoInput" ).jqxInput( {height: "20px", placeHolder: "keyword 1, keyword 2, ..."} );
    $( "#discoveredIssueArea" ).jqxInput( {placeHolder: "If no information available, precise 'none'"} );
    $( "#standAloneInput" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
    $( "#originalDataUrlInput" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
}

/**
 * This method hide or show the input fields when an "Other" select is choosen
 * @param selectId
 * @param inputId
 * @param textId
 */
function HideOrShowOtherFieldForSelect( selectId, inputId, textId )
{
    $( "#" + selectId ).change( function()
    {
        //if( "" == $( "#" + selectId ).val() || "" == $( "#" + selectId ).val() )
        if( "" == $( "#" + selectId ).val() )
        {
            $( "#" + inputId ).fadeIn( "slow" ).show();
            $( "#" + textId ).fadeIn( "slow" ).show();
            $( "#" + inputId ).prop( "disabled", false );
            // On doit effacer message d'erreur si c'est other pour ne pas gener apparition input free text. Message d'erreur si other se montrera de tte fa?on a la phase de validation gnale.
            $( '#metadataForm' ).jqxValidator( 'hideHint', '#' + selectId );
        }
        else
        {
            //Il faut que l'on disabled freeTextInput parce que select et freeText ayant le meme name, si on ne le fait pas, envoi POST se fait mal :
            // si on est avec other et donc selectInput et FreeTextInput ensemble, le post prend bien le freeTextInput en compte et pas le select dc OK.
            $( "#" + inputId ).prop( "disabled", true );
            $( "#" + inputId ).fadeIn( "slow" ).hide();
            $( "#" + textId ).fadeIn( "slow" ).hide();
        }
    } );
}

/**
 * This method adds the new rules to the actual form rules
 * @param rulesArray
 */
function addRulesToRulesForm( rulesArray )
{
    if( !rulesArray )
        return;

    validatorRules = $.merge( validatorRules, rulesArray );
    $( "#metadataForm" ).jqxValidator( {rules: validatorRules} );
}

/**
 * This method remove the new rules to the actual form rules
 * @param rulesArray
 */
function removeRulesToRulesForm( rulesArray )
{
    if( !rulesArray )
        return;
    $.each( rulesArray, function( i, d )
    {
        var index = getIndex( validatorRules, d );
        validatorRules.splice( index, 1 );
    } );

    $( "#metadataForm" ).jqxValidator( {rules: validatorRules} );
}

/**
 * This method looks for the index of an rule in a rules array by testing with the action, input and message
 * (not the rule because it's changed by form '$( "#metadataForm" ).jqxValidator( {rules: validatorRules} )')
 * @param array
 * @param element
 */
function getIndex( array, element )
{
    var result = false;
    $.each( array, function( i, d )
    {
        if( element.action == d.action && element.input == d.input && element.message == d.message )
        {
            result = i;
            return false; // To break the each loop
        }
    } );
    return result;
}

/**
 * This method check the validation on all form fields
 */
function validateForm()
{
    $( "#steps li" ).removeClass( "current" );
    $( ".fieldset1" ).show();
    $( '#metadataForm' ).jqxValidator( 'validate' );
    $( ".jqx-validator-hint" ).show();
}

function hideHintByDiv( div )
{
    div.children().each( function( i, d )
    {
        $( '#metadataForm' ).jqxValidator( 'hideHint', '#' + d.id );
        if( 0 < d.childElementCount )
            hideHintByDiv( $( d ) );
    } );
}
