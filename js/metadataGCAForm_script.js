<!--**************************************************************************************** -->
<!--*********************************** DATA CONTRIBUTOR *********************************** -->
<!--**************************************************************************************** -->
/**
 *  This method add a new contributor with the index "index" into the contributors container
 *  and reorganize the list of contributors
 * @param containerId
 * @param index
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

    // Remove button
    $( "#dataProducerInfoText" + index ).append( '<img id="removeCreatorInfoButton' + index + '" src="img/quitChamp.svg" class="img-responsive img-rounded addQuitAllContainer removeCreatorInfoButton">' );
    $( "#removeCreatorInfoButton" + index ).click( function()
    {
        removeContributorRow( "dataContributorContainer" + index );
    } );

    // TODO : add controls
//            $( "#dataProducerInfoMailInput" + ndatCreator + "" ).jqxInput( {placeHolder: "someone@mail.com"} );
    manageContributorsDiv();
}

/**
 * This method remove the contributor divs corresponding to the divId and reorganize the contributors list
 * @param divId
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
            createContributorRow( "contributorsContainer", contributorsLastId + 1 );
        else
            alert( "You can't add more than 5 contributors" );
    } );


    // Ajouts/quitter champs : Inspiré (pas mal modifié) de http://m2-info-upmc.blogspot.fr/2012/12/formulaire-dynamique-avec-jquery.html
    /* J'ai changé d'idée : je n'ai poas construit les champs dynamiquement mais juste hide et show champs deja construits en html et limité leur nombre à 5.
     Parce que l'intégration de la validation avec jqxValidator était compliquée à mettre en place étannt donné que jqxvalidator si s'applique 2 fois efface l'autre si il s'applique au même questionnaire (voir testMetadataGCAFormulaireProgressTrackerFormToWizardBootstrap.php).*/

//    // Initial values:
//    for( var ndatCreator = 1; ndatCreator < 6; ndatCreator++ )
//    {
//        $( "#dataContributorContainer" + ndatCreator + "" ).hide();
//    }
//    for( var nReference = 1; nReference < 6; nReference++ )
//    {
//        $( "#citationFieldset" + nReference + "" ).hide();
//    }
//
//    var ndatCreator = 1;// A mettre ici parce que si non = 6 / boucle et donc tjs alert("You can't add more than 5 contributors")
//    var nReference = 1;
//    // AllContainer/data creator, contributors information :
//    $( "#addCreatorInfoButton" ).click( function()
//    {
//        if( 5 > ndatCreator )
//        {
//            ndatCreator = ndatCreator + 1;
//            $( "#dataContributorContainer" + ndatCreator + "" ).fadeOut( 'slow' ).show();
//            // Il faut intégrer les fonctions liées a jqx:
//            $( "#dataProducerInfoMailInput" + ndatCreator + "" ).jqxInput( {placeHolder: "someone@mail.com"} );
//        }
//        else
//            alert( "You can't add more than 5 contributors" );
//    } );
//    $( "#quitCreatorInfoButton" ).click( function()
//    {
//        if( ndatCreator > 1 )
//        {
//            $( "#dataContributorContainer" + ndatCreator + "" ).fadeOut( 'slow' ).hide();
//            ndatCreator = ndatCreator - 1;// A bien mettre à la fin.
//        }
//    } );
//
//    // Authors/citations, Reference::
//    $( "#addReferenceInfoButton" ).click( function()
//    {
//        if( nReference < 5 )
//        {
//            nReference = nReference + 1;
//            $( "#citationFieldset" + nReference + "" ).fadeOut( 'slow' ).show();
//            // Il faut intégrer les fonctions liées a jqx:
//            $( "#citationDateBookInput" + nReference + "" ).jqxDateTimeInput( { width: '150px', height: '20px', formatString: "yyyy-MM-dd"} );
//            $( "#citationAuthorMailInput" + nReference + "" ).jqxInput( {placeHolder: "someone@mail.com"} );
//            $( "#citationOnlineRessourceInput" + nReference + "" ).jqxInput( {placeHolder: "someone@mail.com"} );
//            $( "#citationDOIInput" + nReference + "" ).jqxInput( {height: "20px", placeHolder: "10.1000/182"} );
//        }
//        else
//        {
//            alert( "You can't add more than 5 references" );
//        }
//    } );
//    $( "#quitReferenceInfoButton" ).click( function()
//    {
//        if( nReference > 1 )
//        {
//            $( "#citationFieldset" + nReference + "" ).fadeOut( 'slow' ).hide();
//            nReference = nReference - 1;// A bien mettre à la fin.
//        }
//    } );
//
//
//    // Pour tt ce qui est select + freeText
//    //Note : comment faire test if select / element : CF http://stackoverflow.com/questions/10198398/how-is-jquery-used-to-check-for-the-disabled-attribute-on-an-a-tag
//    // Conditions initiales/ apparaitre ou non option free text / select :
//    $( "#dataProductTypeFreeTextText" ).hide();// hide : laisse les elements a leur places.
//    $( "#dataProductTypeFreeTextInput" ).hide();
//    $( "#dataProductCategoryFreeTextText" ).hide();
//    $( "#dataProductCategoryFreeTextInput" ).hide();
//    $( "#dataProductCategoryFreeTextInput" ).prop( "disabled", true );//Necessaire de le faire car freeTextInput et select ont meme name
//    $( "#dataProductTypeFreeTextInput" ).prop( "disabled", true );
//    //
//    $( "#temporalResolFreeTextText" ).hide();
//    $( "#temporalResolFreeTextInput" ).hide();
//    $( "#temporalResolFreeTextInput" ).prop( "disabled", true );
//    //
//    $( "#verticalLevelOtherContainer" ).hide();
//    $( "#verticalLevelFreeTextInput" ).prop( "disabled", true );
//    //
//    $( "#dataPolicyFreeContainer" ).hide();
//    $( "#dataPolicyFreeInput" ).prop( "disabled", true );
//
//    // Qd click, qd on passe a Other ds select :
//    $( "#dataProductCategorySelect" ).change( function()
//    {
//        var dataProductCategorySelectRentre = document.forms["metadataForm"].dataProductCategorySelect.value;
//        if( dataProductCategorySelectRentre == "otherValue" )
//        {
//            $( "#dataProductCategoryFreeTextInput" ).fadeIn( "slow" ).show();
//            $( "#dataProductCategoryFreeTextText" ).fadeIn( "slow" ).show();
//            $( "#dataProductCategoryFreeTextInput" ).prop( "disabled", false );
//            $( '#metadataForm' ).jqxValidator( 'hideHint', '#dataProductCategorySelect' );// On doit effacer message d'erreur si c'est other pour ne pas gener apparition input free text. Message d'erreur si other se montrera de tte fa?on a la phase de validation gnale.
//        }
//        else if( dataProductCategorySelectRentre == "inversionModel" || dataProductCategorySelectRentre == "landModel" || dataProductCategorySelectRentre == "oceanModel" || dataProductCategorySelectRentre == "nullValue" )
//        { //Il faut que l'on disabled freeTextInput parce que select et freeText ayant le meme name, si on ne le fait pas, envoi POST se fait mal : si on est avec other et donc selectInput et FreeTextInput ensemble, le post prend bien le freeTextInput en compte et pas le select dc OK.
//            $( "#dataProductCategoryFreeTextInput" ).prop( "disabled", true );
//            $( "#dataProductCategoryFreeTextInput" ).fadeIn( "slow" ).hide();
//            $( "#dataProductCategoryFreeTextText" ).fadeIn( "slow" ).hide();
//        }
//    } );
//    $( "#dataProductTypeSelect" ).change( function()
//    {
//        var dataProductTypeSelectRentre = document.forms["metadataForm"].dataProductTypeSelect.value;
//        if( dataProductTypeSelectRentre == "otherValue" )
//        {
//            $( "#dataProductTypeFreeTextInput" ).fadeIn( "slow" ).show();
//            $( "#dataProductTypeFreeTextText" ).fadeIn( "slow" ).show();
//            $( "#dataProductTypeFreeTextInput" ).prop( "disabled", false );
//            $( '#metadataForm' ).jqxValidator( 'hideHint', '#dataProductTypeSelect' );
//        }
//        else if( dataProductTypeSelectRentre == "CO2Flux" || dataProductTypeSelectRentre == "carbonStock" || dataProductTypeSelectRentre == "CH4Flux" || dataProductTypeSelectRentre == "nullValue" )
//        {
//            $( "#dataProductTypeFreeTextInput" ).prop( "disabled", true );
//            $( "#dataProductTypeFreeTextInput" ).fadeIn( "slow" ).hide();
//            $( "#dataProductTypeFreeTextText" ).fadeIn( "slow" ).hide();
//        }
//    } );
//    //
//    $( "#temporalResolutionSelect" ).change( function()
//    {
//        var temporalResolutionTypeSelectRentre = document.forms["metadataForm"].temporalResolutionSelect.value;
//        if( temporalResolutionTypeSelectRentre == "otherValue" )
//        {
//            $( "#temporalResolFreeTextText" ).fadeIn( "slow" ).show();
//            $( "#temporalResolFreeTextInput" ).fadeIn( "slow" ).show();
//            $( "#temporalResolFreeTextInput" ).prop( "disabled", false );
//            $( '#metadataForm' ).jqxValidator( 'hideHint', '#temporalResolutionSelect' );
//        }
//        else if( temporalResolutionTypeSelectRentre == "tempResolAnnual" || temporalResolutionTypeSelectRentre == "tempResolMonthly" || temporalResolutionTypeSelectRentre == "tempResolDaily" || temporalResolutionTypeSelectRentre == "tempResolHourly" || temporalResolutionTypeSelectRentre == "nullValue" )
//        {
//            $( "#temporalResolFreeTextInput" ).prop( "disabled", true );
//            $( "#temporalResolFreeTextText" ).fadeIn( "slow" ).hide();
//            $( "#temporalResolFreeTextInput" ).fadeIn( "slow" ).hide();
//        }
//    } );
//    $( "#selectCategoryVerticalLevelSelect" ).change( function()
//    {
//        var verticalLevelSelectRentre = document.forms["metadataForm"].selectCategoryVerticalLevelSelect.value;
//        if( verticalLevelSelectRentre == "otherValue" )
//        {
//            $( "#verticalLevelOtherContainer" ).fadeIn( "slow" ).show();
//            $( "#verticalLevelFreeTextInput" ).prop( "disabled", false );
//        }
//        else if( verticalLevelSelectRentre == "" || verticalLevelSelectRentre == "AtmLevel" || verticalLevelSelectRentre == "SurfaceLevel" || verticalLevelSelectRentre == "BelowGroundLevel" )
//        {
//            $( "#verticalLevelFreeTextInput" ).prop( "disabled", true );
//            $( "#verticalLevelOtherContainer" ).fadeIn( "slow" ).hide();
//        }
//    } );
//    //
//    $( "#dataPolicyChooseSelect" ).change( function()
//    {
//        var dataPolicySelectRentre = document.forms["metadataForm"].dataPolicyChooseSelect.value;
//        if( dataPolicySelectRentre == "otherValue" )
//        {
//            $( "#dataPolicyFreeContainer" ).fadeIn( "slow" ).show();
//            $( "#dataPolicyFreeInput" ).prop( "disabled", false );
//        }
//        else if( dataPolicySelectRentre == "" || dataPolicySelectRentre == "freeToUse" || dataPolicySelectRentre == "restrictedToScientists" || dataPolicySelectRentre == "notFree" )
//        {
//            $( "#dataPolicyFreeInput" ).prop( "disabled", true );
//            $( "#dataPolicyFreeContainer" ).fadeIn( "slow" ).hide();
//        }
//    } );
//
//    // Utilisation masques / inputs form avec jqxmaskedinputs : See http://www.jqwidgets.com/community/topic/masked-input-optional-characters/
//    $( "#principalInvestigatorContactPhoneInput" ).jqxMaskedInput( {width: 150, height: 20, theme: "bootstrap", promptChar: "-",mask: "+(##)/###########"} );
//    // Utilisation jqxDateTimeInput :
//    $( "#metadataDateCreationInput" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );// Ds ce cas là on affiche par default date du jour dc laisser comme ça, sans avoir a valider
//    $( "#dataDateCreationInput" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );// Ds ce cas là on doit afficher erreur si la date n'est pas changée..
//    $( "#temporalCoverageBegin" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );
//    $( "#temporalCoverageEnd" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );
//    $( "#citationDateBookInput" ).jqxDateTimeInput( { width: '100px', height: '20px', formatString: "yyyy-MM-dd"} );
//
//    // Utilisation jqxinput pour afficher info qui s'efface quand on commence à rentrer texte ds  input (placeHolder)
//    $( "#metadatCreatorInfoMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
//    $( "#spatialResolutionValueInput" ).jqxInput( {height: "20px", placeHolder: "3.5"} );
//    $( "#spatialCoverageNorthInput" ).jqxInput( {height: "20px", placeHolder: "90"} );
//    $( "#spatialCoverageSouthInput" ).jqxInput( {height: "20px", placeHolder: "-90"} );
//    $( "#spatialCoverageWestInput" ).jqxInput( {height: "20px", placeHolder: "-180"} );
//    $( "#spatialCoverageEastInput" ).jqxInput( {height: "20px", placeHolder: "180"} );
//    $( "#citationOnlineRessourceInput" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
//    $( "#addDocProductDetailsStep0Input" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
//    $( "#dataProducerInfoMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
//    $( "#citationAuthorMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
//    $( "#principalInvestigatorContactMailInput" ).jqxInput( {height: "20px", placeHolder: "someone@mail.com"} );
//    $( "#keywordsInfoInput" ).jqxInput( {height: "20px", placeHolder: "keyword 1, keyword 2, ..."} );
//    $( "#discoveredIssueArea" ).jqxInput( {height: "20px", placeHolder: "If no information available, precise 'none'"} );
//    $( "#standAloneInput" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
//    $( "#originalDataUrlInput" ).jqxInput( {height: "20px", placeHolder: "something@mail.com"} );
//    $( "#citationDOIInput" ).jqxInput( {height: "20px", placeHolder: "10.1000/182"} );
}



//    {input: "#dataProducerInfoNameInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoNameInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
//    {
//        var dataProducerInfoNameRentre = document.forms["metadataForm"].dataProducerInfoNameInput.value;
//        if( /^[a-zA-Z ._-]+$/.test( dataProducerInfoNameRentre ) )
//        {
//            dataProducerInfoNameRentre = 1;
//        }
//        else
//        {
//            dataProducerInfoNameRentre = 0;
//        }
//        return dataProducerInfoNameRentre;
//    }
//    },
//    {input: "#dataProducerInfoOrganisationInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoMailInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
//    {input: "#dataProducerInfoMailInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoRoleSelect", message: "This field is mandatory", action: "change",  rule: function()
//    {
//        var dataProducerInfoRoleRentre = document.forms["metadataForm"].dataProducerInfoRoleSelect.value;
//        if( dataProducerInfoRoleRentre == "nullValue" )
//        {
//            dataProducerInfoRoleRentre = 0;
//        }
//        else
//        {
//            dataProducerInfoRoleRentre = 1
//        }
//        return dataProducerInfoRoleRentre;
//    }
//    },
//    {input: "#dataProducerInfoNameInput2", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoNameInput2", message: "Characters not authorized", action: "keyup, blur",  rule: function()
//    {
//        var dataProducerInfoNameRentre = document.forms["metadataForm"].dataProducerInfoNameInput2.value;
//        if( /^[a-zA-Z ._-]+$/.test( dataProducerInfoNameRentre ) )
//        {
//            dataProducerInfoNameRentre = 1;
//        }
//        else
//        {
//            dataProducerInfoNameRentre = 0;
//        }
//        return dataProducerInfoNameRentre;
//    }
//    },
//    {input: "#dataProducerInfoOrganisationInput2", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoMailInput2", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
//    {input: "#dataProducerInfoMailInput2", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoRoleSelect2", message: "This field is mandatory", action: "change",  rule: function()
//    {
//        var dataProducerInfoRoleRentre = document.forms["metadataForm"].dataProducerInfoRoleSelect2.value;
//        if( dataProducerInfoRoleRentre == "nullValue" )
//        {
//            dataProducerInfoRoleRentre = 0;
//        }
//        else
//        {
//            dataProducerInfoRoleRentre = 1
//        }
//        return dataProducerInfoRoleRentre;
//    }
//    },
//    {input: "#dataProducerInfoNameInput3", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoNameInput3", message: "Characters not authorized", action: "keyup, blur",  rule: function()
//    {
//        var dataProducerInfoNameRentre = document.forms["metadataForm"].dataProducerInfoNameInput3.value;
//        if( /^[a-zA-Z ._-]+$/.test( dataProducerInfoNameRentre ) )
//        {
//            dataProducerInfoNameRentre = 1;
//        }
//        else
//        {
//            dataProducerInfoNameRentre = 0;
//        }
//        return dataProducerInfoNameRentre;
//    }
//    },
//    {input: "#dataProducerInfoOrganisationInput3", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoMailInput3", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
//    {input: "#dataProducerInfoMailInput3", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoRoleSelect3", message: "This field is mandatory", action: "change",  rule: function()
//    {
//        var dataProducerInfoRoleRentre = document.forms["metadataForm"].dataProducerInfoRoleSelect3.value;
//        if( dataProducerInfoRoleRentre == "nullValue" )
//        {
//            dataProducerInfoRoleRentre = 0;
//        }
//        else
//        {
//            dataProducerInfoRoleRentre = 1
//        }
//        return dataProducerInfoRoleRentre;
//    }
//    },
//    {input: "#dataProducerInfoNameInput4", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoNameInput4", message: "Characters not authorized", action: "keyup, blur",  rule: function()
//    {
//        var dataProducerInfoNameRentre = document.forms["metadataForm"].dataProducerInfoNameInput4.value;
//        if( /^[a-zA-Z ._-]+$/.test( dataProducerInfoNameRentre ) )
//        {
//            dataProducerInfoNameRentre = 1;
//        }
//        else
//        {
//            dataProducerInfoNameRentre = 0;
//        }
//        return dataProducerInfoNameRentre;
//    }
//    },
//    {input: "#dataProducerInfoOrganisationInput4", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoMailInput4", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
//    {input: "#dataProducerInfoMailInput4", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoRoleSelect4", message: "This field is mandatory", action: "change",  rule: function()
//    {
//        var dataProducerInfoRoleRentre = document.forms["metadataForm"].dataProducerInfoRoleSelect4.value;
//        if( dataProducerInfoRoleRentre == "nullValue" )
//        {
//            dataProducerInfoRoleRentre = 0;
//        }
//        else
//        {
//            dataProducerInfoRoleRentre = 1
//        }
//        return dataProducerInfoRoleRentre;
//    }
//    },
//    {input: "#dataProducerInfoNameInput5", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoNameInput5", message: "Characters not authorized", action: "keyup, blur",  rule: function()
//    {
//        var dataProducerInfoNameRentre = document.forms["metadataForm"].dataProducerInfoNameInput5.value;
//        if( /^[a-zA-Z ._-]+$/.test( dataProducerInfoNameRentre ) )
//        {
//            dataProducerInfoNameRentre = 1;
//        }
//        else
//        {
//            dataProducerInfoNameRentre = 0;
//        }
//        return dataProducerInfoNameRentre;
//    }
//    },
//    {input: "#dataProducerInfoOrganisationInput5", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoMailInput5", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
//    {input: "#dataProducerInfoMailInput5", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
//    {input: "#dataProducerInfoRoleSelect5", message: "This field is mandatory", action: "change",  rule: function()
//    {
//        var dataProducerInfoRoleRentre = document.forms["metadataForm"].dataProducerInfoRoleSelect5.value;
//        if( dataProducerInfoRoleRentre == "nullValue" )
//        {
//            dataProducerInfoRoleRentre = 0;
//        }
//        else
//        {
//            dataProducerInfoRoleRentre = 1
//        }
//        return dataProducerInfoRoleRentre;
//    }
//    },