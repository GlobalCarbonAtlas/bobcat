// Validation en direct des champs (la validation lors du click pour passer a autre menu se fait ds le .js). Doit etre en dehors doc.ready() !!!
 $( "#metadataForm" ).formToWizard();

var validatorRules = [

    <!--*********************************** CREATION DATE *********************************** -->
    {input: "#dataDateCreationInput", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
    {// Note : valuechaged est pour ce genre d'elemet, pour select, choisir change et keyup + blur pr input.
        var d = new Date();// CF http://stackoverflow.com/questions/8398897/how-to-get-current-date-in-jquery
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var complete_d = year + "-" + (10 > month ? "0" : "") + month + "-" + day;
        return (input.val() != complete_d);
    }
    },

    <!--*********************************** PRODUCT NAME *********************************** -->
    // Product type
    {input: "#dataProductTypeSelect", message: "This field is mandatory", action: "change",  rule: function()
    {
        return "nullValue" != $( "#dataProductTypeSelect" ).val();
    }
    },
    {input: "#dataProductTypeFreeTextInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#dataProductTypeFreeTextInput", message: "Characters not authorized", action: "blur, keyup",  rule: function()
    {
        var freeTextInputRentre = $( "#dataProductTypeFreeTextInput" ).val();
        return ("" == freeTextInputRentre || /^[a-zA-Z0-9._-]+$/.test( freeTextInputRentre ));
    }
    },
    // Product category
    {input: "#dataProductCategorySelect", message: "This field is mandatory", action: "change",  rule: function()
    {
        return "nullValue" != $( "#dataProductCategorySelect" ).val();
    }
    },
    {input: "#dataProductCategoryFreeTextInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#dataProductCategoryFreeTextInput", message: "Character not authorized", action: "blur, keyup",  rule: function()
    {
        var freeTextInputRentre = $( "#dataProductCategoryFreeTextInput" ).val();
        return ("" == freeTextInputRentre || /^[a-zA-Z0-9._-]+$/.test( freeTextInputRentre ));
    }
    },
    // Product title
    {input: "#prodNameTitleInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
    {input: "#prodNameTitleInput", message: "Character not authorized", action: "keyup, blur",  rule: function()
    {
        var freeTextInputRentre = $( "#prodNameTitleInput" ).val();
        return ("" == freeTextInputRentre || /^[a-zA-Z0-9._-]+$/.test( freeTextInputRentre ));
    }
    },
    // Product version
    {input: "#prodNameVersionInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
    {input: "#prodNameVersionInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var freeTextInputRentre = $( "#prodNameVersionInput" ).val();
        return ("" == freeTextInputRentre || /^[a-zA-Z0-9._-]+$/.test( freeTextInputRentre ));
    }
    },

    <!--*********************************** DATA CONTRIBUTOR *********************************** -->
    // DataProducer's fields control are now in the validateContributorsDiv function (medataGCAForm_script.js file).
    // There are added when we create a new contributor.

    <!--*********************************** METADATA DATE *********************************** -->
    // None

    <!--*********************************** METADATA CREATOR *********************************** -->
    {input: "#metadatCreatorInfoNameInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#metadatCreatorInfoNameInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var metadatCreatorInfoNameRentre = document.forms["metadataForm"].metadatCreatorInfoNameInput.value;
        if( /^[a-zA-Z ._-]+$/.test( metadatCreatorInfoNameRentre ) )
        {
            metadatCreatorInfoNameRentre = 1;
        }
        else
        {
            metadatCreatorInfoNameRentre = 0;
        }
        return metadatCreatorInfoNameRentre;
    }
    },
    {input: "#metadatCreatorInfoMailInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#metadatCreatorInfoMailInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#metadatCreatorInfoRoleSelect", message: "This field is mandatory", action: "change", rule: function()
    {// Pour select, cjange, pour vcalendrier : valuechanged, pour input : keyup et blur.
        var metadataCreatorInfoRoleRentre = document.forms["metadataForm"].metadatCreatorInfoRoleSelect.value;
        if( metadataCreatorInfoRoleRentre == "nullValue" )
        {
            metadataCreatorInfoRoleRentre = 0;
        }
        else
        {
            metadataCreatorInfoRoleRentre = 1
        }
        return metadataCreatorInfoRoleRentre;
    }
    },

    //temporal and geograph info:
    {input: "#temporalResolutionSelect", message: "This field is mandatory", action: "change",  rule: function()
    {
        var temporalResolutionSelectRentre = document.forms["metadataForm"].temporalResolutionSelect.value;
        if( temporalResolutionSelectRentre == "nullValue" )
        {
            temporalResolutionSelectRentre = 0;
        }
        else
        {
            temporalResolutionSelectRentre = 1
        }
        return temporalResolutionSelectRentre;
    }
    },
    {input: "#temporalResolFreeTextInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#temporalCoverageBegin", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
    {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var complete_d = year + "-" + (month < 10 ? "0" : "") + month + "-" + day;
        if( input.val() == complete_d )
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    },
    {input: "#temporalCoverageEnd", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
    {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var complete_d = year + "-" + (month < 10 ? "0" : "") + month + "-" + day;
        if( input.val() == complete_d )
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    },
    {input: "#spatialResolutionValueInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#spatialResolutionValueInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var spatialResolutionRentre = document.forms["metadataForm"].spatialResolutionValueInput.value;
        if( /^[0-9.]+$/.test( spatialResolutionRentre ) )
        {
            spatialResolutionRentre = 1;
        }
        else
        {
            spatialResolutionRentre = 0;
        }
        return spatialResolutionRentre;
    }
    },
    {input: "#spatialCoverageNorthInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#spatialCoverageNorthInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var spatialCoverageNorthRentre = document.forms["metadataForm"].spatialCoverageNorthInput.value;
        if( /^[0-9.]+$/.test( spatialCoverageNorthRentre ) )
        {
            spatialCoverageNorthRentre = 1;
        }
        else
        {
            spatialCoverageNorthRentre = 0;
        }
        return spatialCoverageNorthRentre;
    }
    },
    {input: "#spatialCoverageNorthInput", message: "North latitude must be between 0-90 degrees", action: "keyup, blur",  rule: function()
    {
        var spatialCoverageNorthRentre = document.forms["metadataForm"].spatialCoverageNorthInput.value;
        if( spatialCoverageNorthRentre > 90 )
        {
            spatialCoverageNorthRentre = 0;
        }
        else
        {
            spatialCoverageNorthRentre = 1;
        }
        return spatialCoverageNorthRentre;
    }
    },

    {input: "#spatialCoverageSouthInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#spatialCoverageSouthInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var spatialCoverageSouthRentre = document.forms["metadataForm"].spatialCoverageSouthInput.value;
        if( /^[0-9.-]+$/.test( spatialCoverageSouthRentre ) )
        {
            spatialCoverageSouthRentre = 1;
        }
        else
        {
            spatialCoverageSouthRentre = 0;
        }
        return spatialCoverageSouthRentre;
    }
    },
    {input: "#spatialCoverageSouthInput", message: "South latitude must be between 0 and -90 degrees", action: "keyup, blur",  rule: function()
    {
        var spatialCoverage = document.forms["metadataForm"].spatialCoverageSouthInput.value;
        if( spatialCoverage <= 0 )
        {
            spatialCoverage = 1;
        }
        else
        {
            spatialCoverage = 0;
        }
        return spatialCoverage;
    }
    },
    {input: "#spatialCoverageWestInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#spatialCoverageWestInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var spatialCoverageWestRentre = document.forms["metadataForm"].spatialCoverageWestInput.value;
        if( /^[0-9.-]+$/.test( spatialCoverageWestRentre ) )
        {
            spatialCoverageWestRentre = 1;
        }
        else
        {
            spatialCoverageWestRentre = 0;
        }
        return spatialCoverageWestRentre;
    }
    },
    {input: "#spatialCoverageWestInput", message: "West longitude must be between 0 and -180 degrees", action: "keyup, blur",  rule: function()
    {
        var spatialCoverage = document.forms["metadataForm"].spatialCoverageWestInput.value;
        if( spatialCoverage <= 0 )
        {
            spatialCoverage = 1;
        }
        else
        {
            spatialCoverage = 0;
        }
        return spatialCoverage;
    }
    },
    {input: "#spatialCoverageEastInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#spatialCoverageEastInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var spatialCoverageEastRentre = document.forms["metadataForm"].spatialCoverageEastInput.value;
        if( /^[0-9.]+$/.test( spatialCoverageEastRentre ) )
        {
            spatialCoverageEastRentre = 1;
        }
        else
        {
            spatialCoverageEastRentre = 0;
        }
        return spatialCoverageEastRentre;
    }
    },
    {input: "#spatialCoverageEastInput", message: "East longitude must be between 0-180 degrees", action: "keyup, blur",  rule: function()
    {
        var spatialCoverage = document.forms["metadataForm"].spatialCoverageEastInput.value;
        if( spatialCoverage <= 180 )
        {
            spatialCoverage = 1;
        }
        else
        {
            spatialCoverage = 0;
        }
        return spatialCoverage;
    }
    },
    // Product description:
    {input: "#addDocProductDetailsStep0Input", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    // Keywords and reference:
    {input: "#citationTitleInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#citationTitleInput2", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#citationTitleInput3", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#citationTitleInput4", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#citationTitleInput5", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#citationDateBookInput", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
    {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var complete_d = year + "-" + (month < 10 ? "0" : "") + month + "-" + day;
        if( input.val() == complete_d )
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    },
    {input: "#citationAuthorNameInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationAuthorNameRentre = document.forms["metadataForm"].citationAuthorNameInput.value;
        if( /^[a-zA-Z ._-]+$/.test( citationAuthorNameRentre ) )
        {
            citationAuthorNameRentre = 1;
        }
        else
        {
            citationAuthorNameRentre = 0;
        }
        return citationAuthorNameRentre;
    }
    },
    {input: "#citationAuthorNameInput2", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationAuthorNameRentre = document.forms["metadataForm"].citationAuthorNameInput2.value;
        if( /^[a-zA-Z ._-]+$/.test( citationAuthorNameRentre ) )
        {
            citationAuthorNameRentre = 1;
        }
        else
        {
            citationAuthorNameRentre = 0;
        }
        return citationAuthorNameRentre;
    }
    },
    {input: "#citationAuthorNameInput3", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationAuthorNameRentre = document.forms["metadataForm"].citationAuthorNameInput3.value;
        if( /^[a-zA-Z ._-]+$/.test( citationAuthorNameRentre ) )
        {
            citationAuthorNameRentre = 1;
        }
        else
        {
            citationAuthorNameRentre = 0;
        }
        return citationAuthorNameRentre;
    }
    },
    {input: "#citationAuthorNameInput4", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationAuthorNameRentre = document.forms["metadataForm"].citationAuthorNameInput4.value;
        if( /^[a-zA-Z ._-]+$/.test( citationAuthorNameRentre ) )
        {
            citationAuthorNameRentre = 1;
        }
        else
        {
            citationAuthorNameRentre = 0;
        }
        return citationAuthorNameRentre;
    }
    },
    {input: "#citationAuthorNameInput5", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationAuthorNameRentre = document.forms["metadataForm"].citationAuthorNameInput5.value;
        if( /^[a-zA-Z ._-]+$/.test( citationAuthorNameRentre ) )
        {
            citationAuthorNameRentre = 1;
        }
        else
        {
            citationAuthorNameRentre = 0;
        }
        return citationAuthorNameRentre;
    }
    },
    {input: "#citationAuthorMailInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationAuthorMailInput2", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationAuthorMailInput3", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationAuthorMailInput4", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationAuthorMailInput5", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationDOIInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationDOIRentre = document.forms["metadataForm"].citationDOIInput.value;
        if( /^[0-9/.]+$/.test( citationDOIRentre ) )
        {
            citationDOIRentre = 1;
        }
        else
        {
            citationDOIRentre = 0;
        }
        return citationDOIRentre;
    }
    },
    {input: "#citationDOIInput2", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationDOIRentre = document.forms["metadataForm"].citationDOIInput2.value;
        if( /^[0-9/.]+$/.test( citationDOIRentre ) )
        {
            citationDOIRentre = 1;
        }
        else
        {
            citationDOIRentre = 0;
        }
        return citationDOIRentre;
    }
    },
    {input: "#citationDOIInput3", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationDOIRentre = document.forms["metadataForm"].citationDOIInput3.value;
        if( /^[0-9/.]+$/.test( citationDOIRentre ) )
        {
            citationDOIRentre = 1;
        }
        else
        {
            citationDOIRentre = 0;
        }
        return citationDOIRentre;
    }
    },
    {input: "#citationDOIInput4", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationDOIRentre = document.forms["metadataForm"].citationDOIInput4.value;
        if( /^[0-9/.]+$/.test( citationDOIRentre ) )
        {
            citationDOIRentre = 1;
        }
        else
        {
            citationDOIRentre = 0;
        }
        return citationDOIRentre;
    }
    },
    {input: "#citationDOIInput5", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var citationDOIRentre = document.forms["metadataForm"].citationDOIInput5.value;
        if( /^[0-9/.]+$/.test( citationDOIRentre ) )
        {
            citationDOIRentre = 1;
        }
        else
        {
            citationDOIRentre = 0;
        }
        return citationDOIRentre;
    }
    },
    {input: "#citationOnlineRessourceInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationOnlineRessourceInput2", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationOnlineRessourceInput3", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationOnlineRessourceInput4", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#citationOnlineRessourceInput5", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    // Quality data information:
    {input: "#standAloneInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    // Data access:
    {input: "#principalInvestigatorContactNameInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#principalInvestigatorContactNameInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        var principalInvestigatorContactNameRentre = document.forms["metadataForm"].principalInvestigatorContactNameInput.value;
        if( /^[A-Za-z .]+$/.test( principalInvestigatorContactNameRentre ) )
        {
            principalInvestigatorContactNameRentre = 1;
        }
        else
        {
            principalInvestigatorContactNameRentre = 0;
        }
        return principalInvestigatorContactNameRentre;
    }
    },
    {input: "#principalInvestigatorContactMailInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
    {input: "#principalInvestigatorContactMailInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#originalDataUrlInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
];
