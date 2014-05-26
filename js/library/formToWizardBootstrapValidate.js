/* Created by jankoatwarpspeed.com */

(function( $ )
{
    $.fn.formToWizard = function( options )
    {
        //options = $.extend({ //Enlevé / code originel.
        //  submitButton: ""
        //}, options); 
        var element = this;
        var steps = $( element ).find( ".fieldset1" );
        var count = steps.size();

        $( element ).before( "<div class= 'row'><ul id='steps' class= 'col-md-24 col-sm-24'></ul></div></div>" );// On ajoute avant (ds le sens css) chq field un element ul avec id steps

        steps.each( function( i )
        {//we iterate through this wrapped set (that returned all fieldsets), wrap each fieldset into a div and append a paragraph that will hold “back” and “next” buttons.
            $( this ).wrap( "<div id='step" + i + "'></div>" );
            var name = $( this ).find( "legend" ).html();
            $( "#steps" ).append( "<li class= 'col-md-3 col-sm-3' id='stepDesc" + i + "'><span class= 'col-md-7 col-sm-7 stepsSpan'>" + name + "</span></li>" );// On ajoute li a ul. J'ai change/en haut version lib originale : on ne veut que s'affiche que var name.

            /* PE : Ajout perso, chgment du code (pour enlever les boutons et faire que chgment se fasse en cliquant sur le menu):
             1) Parametres par default a ouverture page.*/
            $( "#step1" ).hide();
            $( "#step2" ).hide();
            $( "#step3" ).hide();
            $( "#step4" ).hide();
            $( "#step5" ).hide();
            $( "#stepDesc0" ).addClass( "current" );
            $( "#submitFormButon" ).hide();
            // 2) Activation et desactivation class "menu actifs" ou non //
            $( "#stepDesc" + i ).bind( "click", function( e )
            {
                $( "#submitFormButon" ).hide();
                $( "#steps li" ).removeClass( "current" );// Associer a bonne validation, a chger.
                $( "#stepDesc" + i ).addClass( "current" );

            } );
        } );

        //Apparaitre bouton submit quand on arrive à la dernière étape:
        $( "#stepDesc5" ).click( function()
        {
            $( "#submitFormButon" ).show();
        } );

        // On impose passage progressif/etapes : si etape anterieure n'est pas bien remplie, on ne peut pas afficher nouvelle page. Note : je n'ai pas rajoute info si champs mandatory ou si mail mal syntaxe pour ne pas avoir repetition message erreur / php. Dc les messages d'erreur ici sont specifiques au click/menu.

        var ndatCreator = 1;// En var globale pour y avoir accès partout.
        var nReference = 1;
        $( "#addCreatorInfoButton" ).click( function()
        {
            ndatCreator = ndatCreator + 1;
        } );
        $( "#quitCreatorInfoButton" ).click( function()
        {
            ndatCreator = ndatCreator - 1;
        } );

        // Pour permettre de passer champ a l'autre.

        $( "#stepDesc0" ).click( function()
        {
            $( "#step0" ).show();
            $( "#step1" ).hide();
            $( "#step2" ).hide();
            $( "#step3" ).hide();
            $( "#step4" ).hide();
            $( "#step5" ).hide();
        } );
        $( "#stepDesc1" ).click( function()
        {
            $( "#step1" ).show();
            $( "#step0" ).hide();
            $( "#step2" ).hide();
            $( "#step3" ).hide();
            $( "#step4" ).hide();
            $( "#step5" ).hide();
        } );
        $( "#stepDesc2" ).click( function()
        {
            $( "#step2" ).show();
            $( "#step0" ).hide();
            $( "#step1" ).hide();
            $( "#step3" ).hide();
            $( "#step4" ).hide();
            $( "#step5" ).hide();
        } );
        $( "#stepDesc3" ).click( function()
        {
            $( "#step3" ).show();
            $( "#step0" ).hide();
            $( "#step1" ).hide();
            $( "#step2" ).hide();
            $( "#step4" ).hide();
            $( "#step5" ).hide();
        } );
        $( "#stepDesc4" ).click( function()
        {
            $( "#step4" ).show();
            $( "#step0" ).hide();
            $( "#step1" ).hide();
            $( "#step2" ).hide();
            $( "#step3" ).hide();
            $( "#step5" ).hide();
        } );
        $( "#stepDesc5" ).click( function()
        {
            $( "#step5" ).show();
            $( "#step0" ).hide();
            $( "#step1" ).hide();
            $( "#step2" ).hide();
            $( "#step3" ).hide();
            $( "#step4" ).hide();
        } );
    }

})( jQuery );
