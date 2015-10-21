$( "#metadataForm" ).formToWizard();

var validatorRules = [

		<!--**************************************************************************************** -->
		<!--*********************************** BASIC INFORMATION ********************************** -->
		<!--**************************************************************************************** -->

		<!--*********************************** CREATION DATE *********************************** -->
		{input: "#dataDateCreationInput", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
		{
				var d = new Date();
				var day = d.getDate();
				var month = d.getMonth() + 1;
				var year = d.getFullYear();
				var complete_d = year + "-" + (10 > month ? "0" : "") + month + "-" + (10 > day ? "0" : "") + day;
				return (input.val() != complete_d);
		}},

		<!--*********************************** PRODUCT NAME *********************************** -->
		// Product type
		{input: "#dataProductTypeSelect", message: "This field is mandatory", action: "change",  rule: function()
		{
				return "nullValue" != $( "#dataProductTypeSelect" ).val();
		}},
		{input: "#dataProductTypeFreeTextInput", message: "This field is mandatory", action: "blur, keyup", rule: function()
		{
				return ("" != $( "#dataProductTypeSelect" ).val()) || ("" == $( "#dataProductTypeSelect" ).val() && "" != $( "#dataProductTypeFreeTextInput" ).val());
				/*if ($( "#dataProductTypeSelect" ).val() == "Other_value:_")
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
				return ("" != $( "#dataProductCategorySelect" ).val()) || ("" == $( "#dataProductCategorySelect" ).val() && "" != $( "#dataProductCategoryFreeTextInput" ).val());
		}},
		{input: "#dataProductCategoryFreeTextInput", message: "Character not authorized", action: "blur, keyup",  rule: function()
		{
				return ("" == $( "#dataProductCategoryFreeTextInput" ).val() || /^[a-zA-Z0-9.-]+$/.test( $( "#dataProductCategoryFreeTextInput" ).val() ));
		}},

		// Product title
		{input: "#prodNameTitleInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
		{input: "#prodNameTitleInput", message: "Character not authorized", action: "keyup, blur",  rule: function()
		{
				return ("" == $( "#prodNameTitleInput" ).val() || /^[a-zA-Z0-9.-]+$/.test( $( "#prodNameTitleInput" ).val() ));
		}},

		// Product version
		{input: "#prodNameVersionInput", message: "This field is mandatory", action: "keyup, blur", rule: "required"},
		{input: "#prodNameVersionInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
		{
				return ("" == $( "#prodNameVersionInput" ).val() || /^[a-zA-Z0-9.-]+$/.test( $( "#prodNameVersionInput" ).val() ));
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
		{
				return "nullValue" != arguments[0].value;
		}},


		<!--**************************************************************************************** -->
		<!--**************************** TEMPORAL AND GEO INFORMATION ****************************** -->
		<!--**************************************************************************************** -->
		//temporal and geograph info:
		{input: "#temporalResolutionSelect", message: "This field is mandatory", action: "change",  rule: function()
		{
				return "nullValue" != document.forms["metadataForm"].temporalResolutionSelect.value;
		}},

		{input: "#temporalResolFreeTextInput", message: "This field is mandatory", action: "blur, keyup", rule: function()
		{
				return ("" != $( "#temporalResolutionSelect" ).val()) || ("" == $( "#temporalResolutionSelect" ).val() && "" != $( "#temporalResolFreeTextInput" ).val());
		}},

		{input: "#temporalCoverageBegin", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
		{
				var d = new Date();
				var day = d.getDate();
				var month = d.getMonth() + 1;
				var year = d.getFullYear();
				var complete_d = year + "-" + (10 > month ? "0" : "") + month + "-" + (10 > day ? "0" : "") + day;
				return input.val() != complete_d;
		}},

		{input: "#temporalCoverageEnd", message: "You have to change this date", action: "valuechanged, keyup", focus: true, rule: function( input )
		{
				var d = new Date();
				var day = d.getDate();
				var month = d.getMonth() + 1;
				var year = d.getFullYear();
				var complete_d = year + "-" + (10 > month ? "0" : "") + month + "-" + (10 > day ? "0" : "") + day;
				return input.val() != complete_d;
		}},

		{input: "#temporalCoverageEnd", message: "End date must be after Begin date", action: "valuechanged, keyup", focus: true, rule: function()
		{
				return ( $( "#temporalCoverageBegin" ).val() < $( "#temporalCoverageEnd" ).val() );
		}},

		{input: "#spatialResolutionValueLongInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#spatialResolutionValueLongInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
		{
				return /^[0-9.]+$/.test( document.forms["metadataForm"].spatialResolutionValueLongInput.value );
		}},

		{input: "#spatialResolutionValueLatInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#spatialResolutionValueLatInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
		{
				return /^[0-9.]+$/.test( document.forms["metadataForm"].spatialResolutionValueLatInput.value );
		}},

		{input: "#spatialCoverageNorthInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#spatialCoverageNorthInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
		{
				return /^[0-9.-]+$/.test( document.forms["metadataForm"].spatialCoverageNorthInput.value );
		}},

		{input: "#spatialCoverageNorthInput", message: "North latitude > 90 degrees!", action: "keyup, blur",  rule: function()
		{
				return 90 >= document.forms["metadataForm"].spatialCoverageNorthInput.value;
		}},

		{input: "#spatialCoverageNorthInput", message: "North latitude < -90 degrees!", action: "keyup, blur",  rule: function()
		{
				return document.forms["metadataForm"].spatialCoverageNorthInput.value >= -90
		}},

		{input: "#spatialCoverageNorthInput", message: "North latitude < south latitude!", action: "keyup, blur",  rule: function()
		{
				var spatialCoverageNorthRentre = parseInt( document.forms["metadataForm"].spatialCoverageNorthInput.value );// Si pas parseInt dit que -45>-12.
				var spatialCoverageSouthRentre = parseInt( document.forms["metadataForm"].spatialCoverageSouthInput.value );
				return spatialCoverageNorthRentre >= spatialCoverageSouthRentre;
		}},

		{input: "#spatialCoverageSouthInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#spatialCoverageSouthInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
		{
				return /^[0-9.-]+$/.test( document.forms["metadataForm"].spatialCoverageSouthInput.value );
		}},

		{input: "#spatialCoverageSouthInput", message: "South latitude < -90 degrees!", action: "keyup, blur",  rule: function()
		{
				return document.forms["metadataForm"].spatialCoverageSouthInput.value >= -90;
		}},

		{input: "#spatialCoverageSouthInput", message: "South latitude > 90 degrees!", action: "keyup, blur",  rule: function()
		{
				return 90 >= document.forms["metadataForm"].spatialCoverageSouthInput.value;
		}},

		{input: "#spatialCoverageWestInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#spatialCoverageWestInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
		{
				return /^[0-9.-]+$/.test( document.forms["metadataForm"].spatialCoverageWestInput.value );
		}},

		{input: "#spatialCoverageWestInput", message: "West longitude < -180 degrees!", action: "keyup, blur",  rule: function()
		{
				return document.forms["metadataForm"].spatialCoverageWestInput.value >= -180;
		}},

		{input: "#spatialCoverageWestInput", message: "West longitude > 180 degrees!", action: "keyup, blur",  rule: function()
		{
				return 180 >= document.forms["metadataForm"].spatialCoverageWestInput.value;
		}},

		{input: "#spatialCoverageEastInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#spatialCoverageEastInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
		{
				return /^[0-9.-]+$/.test( document.forms["metadataForm"].spatialCoverageEastInput.value );
		}},

		{input: "#spatialCoverageEastInput", message: "East longitude < west longitude!", action: "keyup, blur",  rule: function()
		{
				var spatialCoverageEastRentre = parseInt( document.forms["metadataForm"].spatialCoverageEastInput.value );
				var spatialCoverageWestRentre = parseInt( document.forms["metadataForm"].spatialCoverageWestInput.value );
				return spatialCoverageEastRentre >= spatialCoverageWestRentre;
		}},

		{input: "#spatialCoverageEastInput", message: "East longitude > 180 degrees!", action: "keyup, blur",  rule: function()
		{
				return 180 >= document.forms["metadataForm"].spatialCoverageEastInput.value;
		}},

		{input: "#spatialCoverageEastInput", message: "East longitude < -180 degrees!", action: "keyup, blur",  rule: function()
		{
				return document.forms["metadataForm"].spatialCoverageEastInput.value > -180;
		}},

		<!--*********************************** PRODUCT DESCRIPTION *********************************** -->
		//{input: "#addDocProductDetailsStepInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
			// Only if url valid or nothing 8not mandatory) : CF http://www.lawebdelprogramador.com/codigo/JavaScript/2360-funcion-para-validar-si-una-url-es-correcta.html
			{input: "#addDocProductDetailsStepInput", message: "Invalid url", action: "blur, keyup",  rule: function()
		 {
			 return (/^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi.test( document.forms["metadataForm"].addDocProductDetailsStepInput.value ) || "" === $("#addDocProductDetailsStepInput").val());
		 }},


		<!--*********************************** KEYWORD AND REFERENCE *********************************** -->
		// Keywords and reference's fields control are now in the validateContributorsDiv function (medataGCAForm_script.js file).
		// There are added when we create a new reference.

		<!--*********************************** QUALITY DATA INFPORMATION *********************************** -->
		{input: "#discoveredIssueArea",  message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#standAloneInput", message: "Invalid url", action: "blur, keyup", rule: function()
		 {
			 return (/^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi.test( document.forms["metadataForm"].standAloneInput.value ) || "" === $("#standAloneInput").val());
		 }},



		<!--*********************************** DATA ACCESS AND DATA POLICY INFORMATION *********************************** -->
		{input: "#principalInvestigatorContactNameInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#principalInvestigatorContactNameInput", message: "Characters not authorized", action: "keyup, blur",  rule: function()
		{
				return /^[A-Za-z .]+$/.test( document.forms["metadataForm"].principalInvestigatorContactNameInput.value );
		}},

		{input: "#principalInvestigatorContactMailInput", message: "Invalid e-mail", action: "blur, keyup", rule: "email" },
		{input: "#principalInvestigatorContactMailInput", message: "This field is mandatory", action: "blur, keyup", rule: "required" },
		{input: "#originalDataUrlInput", message: "Invalid url", action: "blur, keyup", rule: function()
		 {
			 return (/^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi.test( document.forms["metadataForm"].originalDataUrlInput.value ) || "" === $("#originalDataUrlInput").val());
		 }},

		{input: "#dataPolicyChooseSelect", message: "This field is mandatory", action: "change",  rule: function()
		{
				return "nullValue" != $( "#dataPolicyChooseSelect" ).val();
		}},

		{input: "#dataPolicyFreeInput", message: "This field is mandatory", action: "blur, keyup", rule: function()
		{
				return ("" != $( "#dataPolicyChooseSelect" ).val()) || ("" == $( "#dataPolicyChooseSelect" ).val() && "" != $( "#dataPolicyFreeInput" ).val());
		}},
];
