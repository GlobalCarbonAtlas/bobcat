/* Created by jankoatwarpspeed.com */

(function($) {
    $.fn.formToWizard = function(options) {
        //options = $.extend({ //Enlevé / code originel.
          //  submitButton: "" 
        //}, options); 
        var element = this;
        var steps = $(element).find("fieldset");
        var count = steps.size();
        //var submmitButtonName = "#" + options.submitButton;

        
	$(element).before("<div class= 'container-fluid'><ul id='steps' class= 'row'></ul></div</div>");// On ajoute avant (ds le sens css) chq field un element ul avec id steps 
        
	steps.each(function(i) {//we iterate through this wrapped set (that returned all fieldsets), wrap each fieldset into a div and append a paragraph that will hold “back” and “next” buttons.
            $(this).wrap("<div id='step" + i + "'></div>");
            var name = $(this).find("legend").html();
            $("#steps").append("<li id='stepDesc" + i + "'><span>" + name + "</span></li>");// On ajoute li a ul. J'ai change/en haut version lib originale : on ne veut que s'affiche que var name.

	/*Ajout perso, chgment du code (pour enlever les boutons et faire que chgment se fasse en cliquant sur le menu): 
	   1) Parametres par default a ouverture page.*/
	    $("#step1").hide(); $("#step2").hide(); $("#step3").hide(); $("#step4").hide(); $("#step5").hide(); $("#stepDesc0").addClass("current"); $("#submitFormButon").hide();
	   // 2) Action qd click sur menus : //  
            $("#stepDesc" +i).bind("click", function(e) {
                	{$("#step"+(i+1)).hide(); $("#step"+(i+2)).hide(); $("#step"+(i+3)).hide(); $("#step"+(i+4)).hide(); $("#step"+(i+5)).hide(); $("#step"+(i-1)).hide(); $("#step"+(i-2)).hide(); $("#step"+(i-3)).hide(); $("#step"+(i-4)).hide(); $("#step"+(i-5)).hide(); $("#step"+i).show(); $("#submitFormButon").hide();}
		$("#steps li").removeClass("current");
		$("#stepDesc" + i).addClass("current");
		});
        });
	//Faire apparaitre bouton submit quand on arrive à la dernière étape: 
	$("#stepDesc5").click(function() {
		$("#submitFormButon").show();	
	});

    }

})(jQuery); 
