/* Created by jankoatwarpspeed.com
 * Lot of modifications by PELSCE & VMIPSL */

(function( $ )
{
    $.fn.formToWizard = function( options )
    {
        $( this ).before( "<div class= 'row'><ul id='steps' class= 'col-md-24 col-sm-24'></ul></div></div>" );// On ajoute avant (ds le sens css) chq field un element ul avec id steps

        $( this ).find( ".fieldset1" ).each( function( i )
        {
            // Iterate through this wrapped set (that returned all fieldsets), wrap each fieldset into a div and append a paragraph that will hold “back” and “next” buttons.
            $( this ).wrap( "<div id='step" + i + "'></div>" );

            var name = $( this ).find( "legend" ).html();
            $( "#steps" ).append( "<li class= 'col-md-3 col-sm-3 stepMenu' id='stepDesc" + i + "'><span class= 'col-md-7 col-sm-7 stepsSpan'>" + name + "</span></li>" );
        } );

        // Menu click
        $( ".stepMenu" ).click( function( d )
        {
            $( "#submitFormButon" ).hide();
            $( "#steps li" ).removeClass( "current" );
            $( this ).addClass( "current" );

            var divToShowId = d.currentTarget.id.replace( "Desc", "" );
            $( ".fieldset1" ).before().hide();
            $( "#" + divToShowId + " .fieldset1" ).show();

            if( "stepDesc5" == d.currentTarget.id )
                $( "#submitFormButon" ).show();

            hideValidators();
        } );

        // Init page with click on first menu
        $( "#stepDesc0" ).click();
    }

})( jQuery );

function hideValidators()
{
    $( ".jqx-validator-hint" ).hide();
}

