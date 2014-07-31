/* Created by jankoatwarpspeed.com */

(function($) {
    $.fn.formToWizard = function(options) {
        //options = $.extend({ //Enlevé / code originel.
          //  submitButton: "" 
        //}, options); 
        var element = this;
        var steps = $(element).find(".fieldset1");
        var count = steps.size();
        //var submmitButtonName = "#" + options.submitButton;

        
	$(element).before("<div class= 'row'><ul id='steps' class= 'col-md-24 col-sm-24'></ul></div</div>");// On ajoute avant (ds le sens css) chq field un element ul avec id steps 
        
	steps.each(function(i) {//we iterate through this wrapped set (that returned all fieldsets), wrap each fieldset into a div and append a paragraph that will hold “back” and “next” buttons.
            $(this).wrap("<div id='step" + i + "'></div>");
            var name = $(this).find("legend").html();
            $("#steps").append("<li class= 'col-md-3 col-sm-3' id='stepDesc" + i + "'><span class= 'col-md-7 col-sm-7 stepsSpan'>" + name + "</span></li>");// On ajoute li a ul. J'ai change/en haut version lib originale : on ne veut que s'affiche que var name.

	/*Ajout perso, chgment du code (pour enlever les boutons et faire que chgment se fasse en cliquant sur le menu): 
	   1) Parametres par default a ouverture page.*/
	    $("#step1").hide(); $("#step2").hide(); $("#step3").hide(); $("#step4").hide(); $("#step5").hide(); $("#stepDesc0").addClass("current"); $("#submitFormButon").hide();
	   // 2) Activation et desactivation class "menu actifs" ou non //  
            $("#stepDesc" +i).bind("click", function(e) {
                $("#submitFormButon").hide();
		$("#steps li").removeClass("current");// Associer a bonne validation, a chger.
		$("#stepDesc" + i).addClass("current");
		
		});
        });

	//Apparaitre bouton submit quand on arrive à la dernière étape: 
	$("#stepDesc5").click(function() {
		$("#submitFormButon").show();	
	 });

	// On impose passage progressif/etapes : si etape anterieure n'est pas bien remplie, on ne peut pas afficher nouvelle page. Note : je n'ai pas rajoute info si champs mandatory ou si mail mal syntaxe pour ne pas avoir repetition message erreur / php. Dc les messages d'erreur ici sont specifiques au click/menu.
	/*	
	$("#stepDesc1").click(function() {// On ne doit avoir aucun champ a valider ici si non, se superposent. Tt est dans php.
			//var validationInfoName = $('#metadataForm').jqxValidator('validate', '#metadatCreatorInfoOrganisationInput');
				// Il faut tester chq element a apart parce que si non, comme on teste tt le form, methode validate retourne tjs false et on ne peut pas passer de page.
			var valMetCreatorName = $('#metadataForm').jqxValidator('validateInput', '#metadatCreatorInfoNameInput');
			var valMetCreatorOrg = $('#metadataForm').jqxValidator('validateInput', '#metadatCreatorInfoOrganisationInput');
			var valMetCreatorMail = $('#metadataForm').jqxValidator('validateInput', '#metadatCreatorInfoMailInput');
			var valMetCreatorRole = $('#metadataForm').jqxValidator('validateInput', '#metadatCreatorInfoRoleSelect');
			var valDatNameResp = $('#metadataForm').jqxValidator('validateInput', '#dataFileNameText2Input');
			var valDatTypeFreeText = $('#metadataForm').jqxValidator('validateInput', '#dataProductTypeFreeTextInput');
			var valDatTypeSelect = $('#metadataForm').jqxValidator('validateInput', '#dataProductTypeSelect');
			var valDatCatFreeText = $('#metadataForm').jqxValidator('validateInput', '#dataProductCategoryFreeTextInput');
			var valDatCatSelect = $('#metadataForm').jqxValidator('validateInput', '#dataProductCategorySelect');
			var valDatNameTitle = $('#metadataForm').jqxValidator('validateInput', '#prodNameTitleInput');
			var valDatNameVers = $('#metadataForm').jqxValidator('validateInput', '#prodNameVersionInput');
			var valDatDate = $('#metadataForm').jqxValidator('validateInput', '#dataDateCreationInput');

			if (valMetCreatorName== true && valMetCreatorOrg== true && valMetCreatorMail== true && valMetCreatorRole==true && valDatTypeFreeText== true && valDatNameResp== true && valDatNameVers== true && valDatNameTitle== true && valDatDate== true && valDatCatFreeText== true)
				{
			// 3) Imposer pas a pas :
				$("#step0").hide(); $("#step1").show(); $("#stepDesc1").addClass("current");
				}
			else {
				//$('#metadataForm').jqxValidator('validate');
				$("#stepDesc0").addClass("current");
				$("#stepDesc1").removeClass("current");
				alert("Fields of \"Basic descripton part\" are incorrect: check mandatory fields and error messages");
				if ($("#dataProductCategoryFreeTextInput").is(":disabled")) {$('#metadataForm').jqxValidator('hideHint', '#dataProductCategoryFreeTextInput');}	
				if ($("#dataProductCategorySelect").is(":disabled")) {$('#metadataForm').jqxValidator('hideHint', '#dataProductCategorySelect');}	
			return false;
			}

	});

	$("#stepDesc2").click(function() {
			var reponseValidationForm = $('#metadataForm').jqxValidator('validate');
			if (reponseValidationForm== true) 
				{
				// 3) Imposer pas a pas :
				$("#step1").hide(); $("#step2").show(); $("#stepDesc1").addClass("current");	
				}
			else {
				alert("Fields of \"Temporal and geographical part\" are incorrect: check mandatory fields and error messages");
				$("#stepDesc1").addClass("current");
				$("#stepDesc1").removeClass("current"); $("#stepDesc2").removeClass("current");
				return false;
			}	
		});
		*/
  // Pour permettre de passer champ a l'autre.
	$("#stepDesc0").click(function() {
		$("#step0").show(); $("#step1").hide(); $("#step2").hide(); $("#step3").hide();
$("#step4").hide(); $("#step5").hide();
	});
	$("#stepDesc1").click(function() {
		$("#step1").show(); $("#step0").hide(); $("#step2").hide(); $("#step3").hide();
$("#step4").hide(); $("#step5").hide();
	});
	$("#stepDesc2").click(function() {
		$("#step2").show(); $("#step0").hide(); $("#step1").hide(); $("#step3").hide();
$("#step4").hide(); $("#step5").hide();
	});
	$("#stepDesc3").click(function() {
		$("#step3").show(); $("#step0").hide(); $("#step1").hide(); $("#step2").hide();
$("#step4").hide(); $("#step5").hide();
	});
	$("#stepDesc4").click(function() {
		$("#step4").show(); $("#step0").hide(); $("#step1").hide(); $("#step2").hide();
$("#step3").hide(); $("#step5").hide();
	});
	$("#stepDesc5").click(function() {
		$("#step5").show(); $("#step0").hide(); $("#step1").hide(); $("#step2").hide();
$("#step3").hide(); $("#step4").hide();
	});
		

    }

})(jQuery); 
