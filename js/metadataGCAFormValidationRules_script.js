// Validation en direct des champs (la validation lors du click pour passer a autre menu se fait ds le .js). Doit etre en dehors doc.ready() !!!
$( "#metadataForm" ).formToWizard();

var validatorRules = [

    <!--**************************************************************************************** -->
    <!--*********************************** BASIC INFORMATION ********************************** -->
    <!--**************************************************************************************** -->

    <!--*********************************** CREATION DATE *********************************** -->
    {input: "#dataDateCreationInput", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
    {// Note : valuechaged est pour ce genre d'elemet, pour select, choisir change et keyup + blur pr input.
        var d = new Date();// CF http://stackoverflow.com/questions/8398897/how-to-get-current-date-in-jquery
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var complete_d = year + "-" + (10 > month ? "0" : "") + month + "-" + (day<10 ? "0" : "") + day;
        return (input.val() != complete_d);
	//return (input.val() != "2014-06-06");
    }},

    <!--*********************************** PRODUCT NAME *********************************** -->
    // Product type
    {input: "#dataProductTypeSelect", message: "This field is mandatory", action: "change",  rule: function()
    {
        return "nullValue" != $( "#dataProductTypeSelect" ).val();
    }},
    {input: "#dataProductTypeFreeTextInput", message: "This field is mandatory", action: "blur, keyup", rule: function()
    {
        return ("otherValue" != $( "#dataProductTypeSelect" ).val()) || ("otherValue" == $( "#dataProductTypeSelect" ).val() && "" != $( "#dataProductTypeFreeTextInput" ).val());
        /*if ($( "#dataProductTypeSelect" ).val() == "otherValue")
         {return "" != $( "#dataProductTypeFreeTextInput" ).val();}
         else return true;*/
    }},
    {input: "#dataProductTypeFreeTextInput", message: "Characters not authorized", action: "blur, keyup",  rule: function()
    {
        return ("" == $( "#dataProductTypeFreeTextInput" ).val() || /^[a-zA-Z0-9._-]+$/.test( $( "#dataProductTypeFreeTextInput" ).val() ));
    }},

    // Product category
    {input: "#dataProductCategorySelect", message: "This field is mandatory", action: "change",  rule: function()
    {
        return "nullValue" != $( "#dataProductCategorySelect" ).val();
    }},
    {input: "#dataProductCategoryFreeTextInput", message: "This field is mandatory", action: "blur, keyup", rule: function()
    {
        return ("otherValue" != $( "#dataProductCategorySelect" ).val()) || ("otherValue" == $( "#dataProductCategorySelect" ).val() && "" != $( "#dataProductCategoryFreeTextInput" ).val());
    }},
    {input: "#dataProductCategoryFreeTextInput", message: "Character not authorized", action: "blur, keyup",  rule: function()
    {
        return ("" == $( "#dataProductCategoryFreeTextInput" ).val() || /^[a-zA-Z0-9._-]+$/.test( $( "#dataProductCategoryFreeTextInput" ).val() ));
    }},

    // Product title
    {input: "#prodNameTitleInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
    {input: "#prodNameTitleInput", message: "Character not authorized", action: "keyup, blur",  rule: function()
    {
        return ("" == $( "#prodNameTitleInput" ).val() || /^[a-zA-Z0-9._-]+$/.test( $( "#prodNameTitleInput" ).val() ));
    }},

    // Product version
    {input: "#prodNameVersionInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
    {input: "#prodNameVersionInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        return ("" == $( "#prodNameVersionInput" ).val() || /^[a-zA-Z0-9._-]+$/.test( $( "#prodNameVersionInput" ).val() ));
    }},

    <!--*********************************** PRODUCT NAME *********************************** -->
    // Data abstract
    {input: "#dataAbstractTextarea", message: "This field is mandatory", action: "keyup, blur", rule: "required"},


    <!--*********************************** DATA CONTRIBUTOR *********************************** -->
    // DataProducer's fields control are now in the validateContributorsDiv function (medataGCAForm_script.js file).
    // There are added when we create a new contributor.

    <!--*********************************** METADATA DATE *********************************** -->
    // None

    <!--*********************************** METADATA CREATOR *********************************** -->
    // Creator name
    {input: "#metadatCreatorInfoNameInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#metadatCreatorInfoNameInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
    {
        return ("" == $( "#metadatCreatorInfoNameInput" ).val() || /^[a-zA-Z. _-]+$/.test( $( "#metadatCreatorInfoNameInput" ).val() ));
    }},

    // Creator mail
    {input: "#metadatCreatorInfoMailInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#metadatCreatorInfoMailInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },

    // Creator role
    {input: "#metadatCreatorInfoRoleSelect", message: "This field is mandatory", action: "change", rule: function( arguments )
    {// Pour select, cjange, pour vcalendrier : valuechanged, pour input : keyup et blur.
        return "nullValue" != arguments[0].value;
    }},


    <!--**************************************************************************************** -->
    <!--**************************** TEMPORAL AND GEO INFORMATION ****************************** -->
    <!--**************************************************************************************** -->
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
    {input: "#temporalResolFreeTextInput", message: "This field is mandatory", action: "blur, keyup", rule: function()
    {
        return ($( "#temporalResolutionSelect" ).val() != "otherValue") || ($( "#temporalResolutionSelect" ).val() == "otherValue" && "" != $( "#temporalResolutionSelect" ).val());
    }
    },
    {input: "#temporalCoverageBegin", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
    {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var complete_d = year + "-" + (10 > month ? "0" : "") + month + "-" + (day<10 ? "0" : "") + day;
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
        var complete_d = year + "-" + (10 > month ? "0" : "") + month + "-" + (day<10 ? "0" : "") + day;
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
    {input: "#temporalCoverageEnd", message: "End date must be after Begin date", action: "valuechanged, keyup", focus: true, rule: function()
    {
	 return ( $("#temporalCoverageBegin").val() < $("#temporalCoverageEnd").val() );
    }},
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
    {input: "#textAreaProductDetails",  message: "This field is mandatory", action: "blur, keyup", rule: "required" },
    {input: "#addDocProductDetailsStep0Input", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },

    <!--*********************************** KEYWORD AND REFERENCE *********************************** -->
    // Keywords and reference's fields control are now in the validateContributorsDiv function (medataGCAForm_script.js file).
    // There are added when we create a new reference.

    // Quality data information:
    {input: "#discoveredIssueArea",  message: "This field is mandatory", action: "blur, keyup", rule: "required" },
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
