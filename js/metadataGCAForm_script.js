<!--**************************************************************************************** -->
<!--*********************************** DATA CONTRIBUTOR *********************************** -->
<!--**************************************************************************************** -->
/**
 *  This method add a new contributor with the index "index" into the contributors container
 *  and reorganize the list of contributors
 * @param containerId : container's id of the main contributors div
 * @param index : contributor's index
 */
function createContributorRow( containerId, index )
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
            '<option value="originator">Originator</option>' +
            '<option value="pointOfContact">Point of contact</option>' +
            '<option value="principalInvestigator">Principal investigator</option>' +
            '<option value="processor">Processor</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '</div>' );

    $( "#" + containerId ).append( containerDiv );

    // Mail input
    $( "#dataProducerInfoMailInput" + index ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );

    // Remove button
    $( "#dataProducerInfoText" + index ).append( '<img id="removeCreatorInfoButton' + index + '" src="img/quitChamp.svg" class="img-responsive img-rounded addQuitAllContainer removeCreatorInfoButton">' );
    $( "#removeCreatorInfoButton" + index ).click( function()
    {
        removeContributorRow( "dataContributorContainer" + index );
    } );

    manageContributorsDiv();

    // Fields validation
    validateContributorsDiv( index );
}

/**
 * This method remove the contributor divs corresponding to the divId and reorganize the contributors list
 * @param divId : contributor's div id
 */
function removeContributorRow( divId )
{
    $( "#" + divId ).remove();
    manageContributorsDiv();
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

/**
 * This method adds the controls to the contributor fields
 * @param index : contributor's index
 */
function validateContributorsDiv( index )
{
    $( "#metadataForm" ).jqxValidator( {rules: [

        {input: "#dataProducerInfoNameInput" + index, message: "This field is mandatory", action: "keyup, blur", rule: "required"},
        {input: "#dataProducerInfoNameInput" + index, message: "Characters not authorized", action: "keyup, blur",  rule: function( arguments )
        {
            return /^[a-zA-Z ._-]+$/.test( arguments[0].value );
        }
        },
        {input: "#dataProducerInfoOrganisationInput" + index, message: "This field is mandatory", action: "keyup, blur", rule: "required"},
        {input: "#dataProducerInfoMailInput" + index, message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
        {input: "#dataProducerInfoMailInput" + index, message: "This field is mandatory", action: "keyup, blur", rule: "required"},
        {input: "#dataProducerInfoRoleSelect" + index, message: "This field is mandatory", action: "change",  rule: function( arguments )
        {
            return "nullValue" != arguments[0].value;
        }
        }
    ]} );
}
<!--**************************************************************************************** -->



<!--**************************************************************************************** -->
<!--***************************************** MAIN ***************************************** -->
<!--**************************************************************************************** -->
function manageFormDiv()
{
    // Contributors : add button
    $( "#addCreatorInfoButton" ).click( function()
    {
        var contributorsLastId = $( 'input[id^="dataProducerInfoNameInput"]' ).last().attr( 'id' ).replace( "dataProducerInfoNameInput", "" );
        if( 5 > $( 'input[id^="dataProducerInfoNameInput"]' ).length )
	{
            createContributorRow( "contributorsContainer", contributorsLastId + 1 );
		// Used to pass to php file (target, not form : to construct xml) parameters to actualise metadata xml.
	}
        else
            alert( "You can't add more than 5 contributors" );
    } );


    // Ajouts/quitter champs : Inspiré (pas mal modifié) de http://m2-info-upmc.blogspot.fr/2012/12/formulaire-dynamique-avec-jquery.html
    /* J'ai changé d'idée : je n'ai poas construit les champs dynamiquement mais juste hide et show champs deja construits en html et limité leur nombre à 5.
     Parce que l'intégration de la validation avec jqxValidator était compliquée à mettre en place étannt donné que jqxvalidator si s'applique 2 fois efface l'autre si il s'applique au même questionnaire (voir testMetadataGCAFormulaireProgressTrackerFormToWizardBootstrap.php).*/

    for( var nReference = 1; nReference < 6; nReference++ )
    {
        $( "#citationFieldset" + nReference + "" ).hide();
    }

    var nReference = 1;

    // Authors/citations, Reference::
    $( "#addReferenceInfoButton" ).click( function()
    {
        if( nReference < 5 )
        {
            nReference = nReference + 1;
            $( "#citationFieldset" + nReference + "" ).fadeOut( 'slow' ).show();
            // Il faut intégrer les fonctions liées a jqx:
            $( "#citationDateBookInput" + nReference + "" ).jqxDateTimeInput( { width: '150px', height: '20px', formatString: "yyyy-MM-dd"} );
            $( "#citationAuthorMailInput" + nReference + "" ).jqxInput( {placeHolder: "someone@mail.com"} );
            $( "#citationOnlineRessourceInput" + nReference + "" ).jqxInput( {placeHolder: "someone@mail.com"} );
            $( "#citationDOIInput" + nReference + "" ).jqxInput( {height: "20px", placeHolder: "10.1000/182"} );
        }
        else
        {
            alert( "You can't add more than 5 references" );
        }
    } );
    $( "#quitReferenceInfoButton" ).click( function()
    {
        if( nReference > 1 )
        {
            $( "#citationFieldset" + nReference + "" ).fadeOut( 'slow' ).hide();
            nReference = nReference - 1;// A bien mettre à la fin.
        }
    } );


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

    // Qd click, qd on passe a Other ds select :
    $( "#dataProductCategorySelect" ).change( function()
    {
        var dataProductCategorySelectRentre = document.forms["metadataForm"].dataProductCategorySelect.value;
        if( dataProductCategorySelectRentre == "Other_value:_" )
        {
            $( "#dataProductCategoryFreeTextInput" ).fadeIn( "slow" ).show();
            $( "#dataProductCategoryFreeTextText" ).fadeIn( "slow" ).show();
            $( "#dataProductCategoryFreeTextInput" ).prop( "disabled", false );
            $( '#metadataForm' ).jqxValidator( 'hideHint', '#dataProductCategorySelect' );// On doit effacer message d'erreur si c'est other pour ne pas gener apparition input free text. Message d'erreur si other se montrera de tte fa?on a la phase de validation gnale.
        }
        else if( dataProductCategorySelectRentre == "Inversion_model" || dataProductCategorySelectRentre == "Land_model" || dataProductCategorySelectRentre == "Ocean_model" || dataProductCategorySelectRentre == "nullValue" )
        { //Il faut que l'on disabled freeTextInput parce que select et freeText ayant le meme name, si on ne le fait pas, envoi POST se fait mal : si on est avec other et donc selectInput et FreeTextInput ensemble, le post prend bien le freeTextInput en compte et pas le select dc OK.
            $( "#dataProductCategoryFreeTextInput" ).prop( "disabled", true );
            $( "#dataProductCategoryFreeTextInput" ).fadeIn( "slow" ).hide();
            $( "#dataProductCategoryFreeTextText" ).fadeIn( "slow" ).hide();
        }
    } );
    $( "#dataProductTypeSelect" ).change( function()
    {
        var dataProductTypeSelectRentre = document.forms["metadataForm"].dataProductTypeSelect.value;
        if( dataProductTypeSelectRentre == "Other_value:_" )
        {
            $( "#dataProductTypeFreeTextInput" ).fadeIn( "slow" ).show();
            $( "#dataProductTypeFreeTextText" ).fadeIn( "slow" ).show();
            $( "#dataProductTypeFreeTextInput" ).prop( "disabled", false );
            $( '#metadataForm' ).jqxValidator( 'hideHint', '#dataProductTypeSelect' );
        }
        else if( dataProductTypeSelectRentre == "CO2_flux" || dataProductTypeSelectRentre == "Carbon_stock" || dataProductTypeSelectRentre == "CH4_flux" || dataProductTypeSelectRentre == "nullValue" )
        {
            $( "#dataProductTypeFreeTextInput" ).prop( "disabled", true );
            $( "#dataProductTypeFreeTextInput" ).fadeIn( "slow" ).hide();
            $( "#dataProductTypeFreeTextText" ).fadeIn( "slow" ).hide();
        }
    } );
    //
    $( "#temporalResolutionSelect" ).change( function()
    {
        var temporalResolutionTypeSelectRentre = document.forms["metadataForm"].temporalResolutionSelect.value;
        if( temporalResolutionTypeSelectRentre == "Other_value:_" )
        {
            $( "#temporalResolFreeTextText" ).fadeIn( "slow" ).show();
            $( "#temporalResolFreeTextInput" ).fadeIn( "slow" ).show();
            $( "#temporalResolFreeTextInput" ).prop( "disabled", false );
            $( '#metadataForm' ).jqxValidator( 'hideHint', '#temporalResolutionSelect' );
        }
        else if( temporalResolutionTypeSelectRentre == "Annual" || temporalResolutionTypeSelectRentre == "Monthly" || temporalResolutionTypeSelectRentre == "Daily" || temporalResolutionTypeSelectRentre == "Hourly" || temporalResolutionTypeSelectRentre == "nullValue" )
        {
            $( "#temporalResolFreeTextInput" ).prop( "disabled", true );
            $( "#temporalResolFreeTextText" ).fadeIn( "slow" ).hide();
            $( "#temporalResolFreeTextInput" ).fadeIn( "slow" ).hide();
        }
    } );
    $( "#selectCategoryVerticalLevelSelect" ).change( function()
    {
        var verticalLevelSelectRentre = document.forms["metadataForm"].selectCategoryVerticalLevelSelect.value;
        if( verticalLevelSelectRentre == "Other_value:_" )
        {
            $( "#verticalLevelOtherContainer" ).fadeIn( "slow" ).show();
            $( "#verticalLevelFreeTextInput" ).prop( "disabled", false );
        }
        else if( verticalLevelSelectRentre == "" || verticalLevelSelectRentre == "Atmospheric levels" || verticalLevelSelectRentre == "Surface level" || verticalLevelSelectRentre == "Below-ground levels" )
        {
            $( "#verticalLevelFreeTextInput" ).prop( "disabled", true );
            $( "#verticalLevelOtherContainer" ).fadeIn( "slow" ).hide();
        }
    } );
    //
    $( "#dataPolicyChooseSelect" ).change( function()
    {
        var dataPolicySelectRentre = document.forms["metadataForm"].dataPolicyChooseSelect.value;
        if( dataPolicySelectRentre == "Other_value:_" )
        {
            $( "#dataPolicyFreeContainer" ).fadeIn( "slow" ).show();
            $( "#dataPolicyFreeInput" ).prop( "disabled", false );
        }
        else if( dataPolicySelectRentre == "" || dataPolicySelectRentre == "Free to use" || dataPolicySelectRentre == "Restricted to scientists" || dataPolicySelectRentre == "Not free: contact PI" )
        {
            $( "#dataPolicyFreeInput" ).prop( "disabled", true );
            $( "#dataPolicyFreeContainer" ).fadeIn( "slow" ).hide();
        }
    } );

    // Utilisation masques / inputs form avec jqxmaskedinputs : See http://www.jqwidgets.com/community/topic/masked-input-optional-characters/
    $( "#principalInvestigatorContactPhoneInput" ).jqxMaskedInput( {width: 150, height: 20, theme: "bootstrap", promptChar: "-",mask: "+(##)/###########"} );
    // Utilisation jqxDateTimeInput :
    $( "#metadataDateCreationInput" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );// Ds ce cas là on affiche par default date du jour dc laisser comme ça, sans avoir a valider
    $( "#dataDateCreationInput" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );// Ds ce cas là on doit afficher erreur si la date n'est pas changée..
    $( "#temporalCoverageBegin" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );
    $( "#temporalCoverageEnd" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );
    $( "#citationDateBookInput" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );

    // Utilisation jqxinput pour afficher info qui s'efface quand on commence à rentrer texte ds  input (placeHolder)
    $( "#metadatCreatorInfoMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
    $( "#spatialResolutionValueInput" ).jqxInput( {height: "20px", placeHolder: "3.5"} );
    $( "#spatialCoverageNorthInput" ).jqxInput( {height: "20px", placeHolder: "90"} );
    $( "#spatialCoverageSouthInput" ).jqxInput( {height: "20px", placeHolder: "-90"} );
    $( "#spatialCoverageWestInput" ).jqxInput( {height: "20px", placeHolder: "-180"} );
    $( "#spatialCoverageEastInput" ).jqxInput( {height: "20px", placeHolder: "180"} );
    $( "#citationOnlineRessourceInput" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
    $( "#addDocProductDetailsStep0Input" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
    $( "#citationAuthorMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
    $( "#principalInvestigatorContactMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
    $( "#keywordsInfoInput" ).jqxInput( {height: "20px", placeHolder: "keyword 1, keyword 2, ..."} );
    $( "#discoveredIssueArea" ).jqxInput( {height: "20px", placeHolder: "If no information available, precise 'none'"} );
    $( "#standAloneInput" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
    $( "#originalDataUrlInput" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
    $( "#citationDOIInput" ).jqxInput( {height: "20px", placeHolder: "10.1000/182"} );
}

        
