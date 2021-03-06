/*
 ##########################################################################

 Patrick.Brockmann@lsce.ipsl.fr for Global Carbon Atlas
 Pascal.Evano@lsce.ipsl.fr      for Global Carbon Atlas
 Vanessa.Maigne@lsce.ipsl.fr    for Global Carbon Atlas

 PLEASE DO NOT COPY OR DISTRIBUTE WITHOUT PERMISSION

 ##########################################################################
 */

var BCInterfaceW = Class.create( {

    initialize: function( resourcesTreeData )
    {
//        Parameters
        this.variableDiv = $( "#variableSelect" );
        this.timeYearSelect = $( "#timeYearSelect" );
        this.timeMonthSelect = $( "#timeMonthSelect" );
        this.rangeDiv = $( "#getRange" );
        this.submitButton = $( "#submitCreateMap" );

        this.threddsPath = jQuery.i18n.prop( "threddsPath" );
        this.hostName = jQuery.i18n.prop( "hostname" ) ? jQuery.i18n.prop( "hostname" ) : location.hostname;
        this.geoserverUrl = jQuery.i18n.prop( "geoserverUrl" );
        this.imgPath = "img";
        try
        {
            this.useReduceVariablesByRegionByResource = JSON.parse( jQuery.i18n.prop( "useReduceVariablesByRegionByResource" ) );
        }
        catch( e )
        {
            this.useReduceVariablesByRegionByResource = true;
        }

        /**
         * This hash contains :
         *   - key : the file name
         *   - values : [the file name to display, the url] */
        this.selectedResourceKeys = new Array();
        this.hashResources = new Hashtable();
        this.fillHash( this.hashResources, resourcesTreeData );

        /** This hashVariables contains :
         *   - key : the variable name
         *   - values : [the name to display, [the files array contains this variable], [[the times array's array]] ] */
        this.hashVariables = new Hashtable();
        this.variablesToDisplay = JSON.parse( jQuery.i18n.prop( "variableList" ) );
        this.variableNamesToDisplay = JSON.parse( jQuery.i18n.prop( "variableNamesList" ) );
        this.variableTypesList = JSON.parse( jQuery.i18n.prop( "variableTypesList" ) );
        this.variable = false;

        this.elevation = false;
        this.time = false;

        this.initAndCreatePeriodSelect();

        // Projection
        $( "#projectionSelect" ).select2();
        $( "#projectionSelect" ).select2( "val", "EPSG:4087" );
        this.projection = $( "#projectionSelect" ).select2( "val" );

        // Palette
        $( "#paletteSelect" ).select2();
        $( "#paletteSelect" ).select2( {
            formatResult: format
        } );
        $( "#paletteSelect" ).select2( "val", "blue_yellow_red" );
        this.palette = $( "#paletteSelect" ).select2( "val" );

        // Maps number
        $( "#mapsNumberSelect" ).select2();
        $( "#mapsNumberSelect" ).select2( "val", "2" );
        this.mapsNumber = $( "#mapsNumberSelect" ).select2( "val" );

        this.hashBobcats = new Hashtable();
        this.selectedBobcat = false;
        // Pascal part:
        this.selectedUncertaintyBobcat = false;
        // End Pascal part.
        this.n = 0;
        // The leftMenuInitWidth && rightMenuInitWidth init is done after the updateLegend because the loading of the legend image can change the size of the menus (scrollbar or not)
        this.leftMenuInitWidth = false;
        this.rightMenuInitWidth = false;
        this.printableInitHeight = $( "#printable" ).height();
        this.zIndex = 0;
        this.zIndexUncertainty = 0;

        this.timeArray = new Array();

        // Keys
        this.isShiftKeyPressed = false;
        this.isCtrlKeyPressed = false;
        $( document ).keydown( jQuery.proxy( function( event )
        {
            this.isShiftKeyPressed = (16 == event.keyCode);
            this.isCtrlKeyPressed = (17 == event.keyCode);
            if( 112 == event.keyCode )
            {
                if( this.help )
                    this.removeHelp();
                else
                    this.createHelp();
            }
        }, this ) );
        $( document ).keyup( jQuery.proxy( function( event )
        {
            this.isShiftKeyPressed = false;
            this.isCtrlKeyPressed = false;
        }, this ) );


        this.createResourceSelect( resourcesTreeData );
        this.bindActions();
        this.bindProjection();
        this.bindNumberMaps();
        this.bindPeriod();
        this.bindPalettes();
        this.createSliders();
        this.bindRange();
        this.resizePrintable();
        this.updateLegendButtons();
        this.initUncertaintyDivs();
    },

    initInterface: function()
    {
        $( "#resourceSelect" ).fancytree().init();
//        $( "#mapsNumberSelect" ).select2( "val", "2" ).click();
//        // Range
//        $( "#slider-range" ).slider( {
//            min: -1000,
//            max: 1000,
//            step: 5,
//            values: [-500, 500] } );
//        $( "#slider-range-text" ).val( '[' + $( "#slider-range" ).slider( "values", 0 ) + "," + $( "#slider-range" ).slider( "values", 1 ) + ']' );
//        // Colors number
//        $( "#slider-nbcolorbands" ).slider( "value", 90 );
//        $( "#slider-nbcolorbands-text" ).html( $( "#slider-nbcolorbands" ).slider( "value" ) );
//
        this.onClickDeleteAllMaps();
    },

    initAndCreatePeriodSelect: function()
    {
        var periodList = JSON.parse( jQuery.i18n.prop( "periodList" ) );
        var periodNameList = JSON.parse( jQuery.i18n.prop( "periodNamesList" ) );
        $.each( periodList, function( i, d )
        {
            var name = periodNameList[i] ? periodNameList[i] : d;
            $( "#periodSelect" ).append( "<option value='" + d + "'>" + name + "</option>" );
        } );

        $( "#periodSelect" ).select2();
        $( "#periodSelect" ).select2( "val", jQuery.i18n.prop( "selectedPeriod" ) );
        this.selectedPeriod = $( "#periodSelect" ).select2( "val" );
    },

    initUncertaintyDivs: function()
    {
        $( '#overlayStdDevCase' ).hide();
        $( "#displayOverlayStdDevLeft" ).change( function()
        {
            // Bouton de gauche active ou desactive donc les 2 menus Uncertainty (gauche et droite).
            if( $( this ).is( ':checked' ) )
            {
                $( "#overlayStdDevCaseLeft" ).show();
                $( "#overlayStdDevCase" ).show();
                $("#uncertaintyWithMaskingInput").prop("checked", $("#uncertaintyWithMaskingInputLeft").is(":checked"));
                $("#uncertaintyWithStipplingInput").prop("checked", $("#uncertaintyWithStipplingInputLeft").is(":checked"));
            }
            else
            {
                $( "#overlayStdDevCaseLeft" ).hide();
                $( "#overlayStdDevCase" ).hide();
            }
        } );

        // Action to do when user switch to mask area or to stipple area (radio buttons) f(parameters to set).
        $( '.uncertaintyRepresentationRightMenuClass' ).change( jQuery.proxy( function()
        {
            //this.getUncertaintyParameters();// Pas la peine de l'appeler, les variables (this. ...) ont déjà été définies lors de création carte donc réutilisables.
            this.updateUncertMapRightPart( this.selectedPeriod, this.modelType, this.thresholdValueForPy, this.indexTimeArray, this.uncertaintyVariable, this.overlayMode, this.thresholdValueForTitleLayerRight);// this.overlayMode defini comme parametre de BCI et passe a adaptOverlayMaps: function(overlayMode)
        }, this ) );
    },


// **************************************************************
// ************************** MAP *******************************
// **************************************************************
    // This method allows construction of uncertainty maps too.
    createMaps: function()
    {
        jQuery.each( this.selectedResourceKeys, jQuery.proxy( function( i, element )
        {
            var id = 'id' + this.n;
            var modelName = this.hashResources.get( this.selectedResourceKeys[i] )[0];
            if( $( '#displayStdDevLeft' ).is( ':checked' ) && 'MEAN' == modelName ) // If not condition modelName == 'MEAN', display map which doesn't have uncertainty data related.
            {
                var id_uncertainty = 'id_uncertainty' + this.n; // Les cartes s'affichent dans l'ordre des clicks / choix cartes.
                this.createMapAndUncertaintyMap( id, element, id_uncertainty );
            }
            else
                this.createMap( id, element );
            this.n++;
        }, this ) );
    },


    // *********************************************************************************
    // ******************************** UNCERTAINTY MAP ********************************
    // *********************************************************************************
    // DISPLAY UNCERTAINTY MAPS ( = stdDev for all modelsType) WITH DATA MODELS MAPS
    // --> Integrate to the same function than normal maps to apply to uncertainty maps resizeAllMaps()

    createMapAndUncertaintyMap: function( id, resource, id_uncertainty )
    {
        if( this.hashBobcats.size() ) // Pascal : après avoir instancié   1er carte.
        {
            var firstOpenLayerMap = this.hashBobcats.get( this.hashBobcats.keys( 0 )[0] ).map;
            this.centerMap = firstOpenLayerMap.getCenter();
            this.zoomMap = firstOpenLayerMap.getZoom();
            this.centerUncertaintyMap = firstOpenLayerMap.getCenter();
            this.zoomUncertaintyMap = firstOpenLayerMap.getZoom();
        }

        var selectedPeriod = this.getSelectedPeriodValue( this.hashResources.get( resource )[1] );

        // ajax communication need exact same domain so without 8080 (need a connector for that : AJP JKMount)
        var urlResource = "http://" + this.hostName + "/thredds/wms/" + this.threddsPath + "/" + this.hashResources.get( resource )[1] + "/" + selectedPeriod + "/" + resource
            + "_" + selectedPeriod + "_XYT.nc";
        var mapTitle = this.hashResources.get( resource )[1].replace( /\//g, ' / ' ) + ' / ' +
            this.hashResources.get( resource )[0] + ' / ' + this.hashVariables.get( this.variable )[0];
        var mapShortTitle = selectedPeriod.indexOf( "longterm" ) != -1 ? selectedPeriod.replace( "longterm-", "" ) : false;
        var mapUncertaintyTitle = 'Uncertainty (stdev) : ' + this.hashResources.get( resource )[1].replace( /\//g, ' / ' ) + ' / ' +
            this.hashResources.get( resource )[0] + ' / ' + this.hashVariables.get( this.variable )[0];
        var mapUncertaintyShortTitle = selectedPeriod.indexOf( "longterm" ) != -1 ? selectedPeriod.replace( "longterm-", "" ) : false;

        var options = {container: $( '#printable' ),
            id: id,
            mapTitle: mapTitle,
            mapShortTitle: mapShortTitle,
            projection: this.projection,
            resource: urlResource,
            variable: this.variable,
            time: this.time,
            range: $( "#slider-range-text" ).val().replace( /[\]\[]/g, '' ),
            numberColorsBands: $( "#slider-nbcolorbands-text" ).html(),
            palette: this.palette,
            centerMap: this.centerMap,
            zoomMap: this.zoomMap,
            minx: this.minx,
            maxx: this.maxx,
            miny: this.miny,
            maxy: this.maxy,
            timeArray: this.timeArray,
            callback:jQuery.proxy( this.eventFilter, this ),
            displayContextuelMenu: true,
            displayIconesMenu: true
        };

        // We need to adapt uncertainty variable name to ocean or terrestrial flux for inversion models:
        // The same name for all uncertainty variable but can be different f( models ) (= std dev all models for mean models, difference between them, ...)
        switch( this.variable )
        {
            case "Terrestrial_flux":
                this.uncertaintyVariable = 'Terrestrial_fluxUncertainty';
                break;
            case "Ocean_flux":
                this.uncertaintyVariable = 'Ocean_fluxUncertainty';
                break;
        }

        var options4Uncertainty = {
            container: $( '#printable' ),
            id: id_uncertainty,
            mapTitle: mapUncertaintyTitle,
            mapShortTitle: mapUncertaintyShortTitle,
            projection: this.projection,
            resource: urlResource,
            variable: this.uncertaintyVariable, // TODO: Adapter f(temps si on est pas en long term)
            time: this.time,
            range: $( "#slider-range-text" ).val().replace( /[\]\[]/g, '' ),
            numberColorsBands: $( "#slider-nbcolorbands-text" ).html(),
            palette: this.palette,
            centerMap: this.centerUncertaintyMap,
            zoomMap: this.zoomUncertaintyMap,
            minx: this.minx,
            maxx: this.maxx,
            miny: this.miny,
            maxy: this.maxy,
            timeArray: this.timeArray,
            callback:jQuery.proxy( this.eventFilter, this ),
            displayContextuelMenu: true,
            displayIconesMenu: true
        };

        this.selectedBobcat = new Bobcat( options );
        this.hashBobcats.put( id, this.selectedBobcat );
        this.selectedUncertaintyBobcat = new Bobcat( options4Uncertainty );
        this.hashBobcats.put( id_uncertainty, this.selectedUncertaintyBobcat );

        this.selectBobcat( this.selectedBobcat.id );
        this.zIndex++;
        $( "#" + id ).css( "z-index", this.zIndex );
        this.selectUncertaintyBobcat( this.selectedUncertaintyBobcat.id );// Attention, paramètre = id, no id_uncertainty (dérive new Bobcat( options4Uncertainty ); ).
        this.zIndexUncertainty++;
        $( "#" + id_uncertainty ).css( "z-index", this.zIndexUncertainty );

        // Bind events
        this.selectedBobcat.map.events.register( "zoomend", this.selectedBobcat.map, jQuery.proxy( this.handleZoom, this.selectedBobcat.map ), true );
        this.selectedBobcat.map.events.register( "moveend", this.selectedBobcat.map, jQuery.proxy( this.synchronizeMapsAndUncertaintyMaps, [this, this.selectedBobcat.map] ), false );
        this.selectedBobcat.map.events.register( "touchend", this.selectedBobcat.map, jQuery.proxy( function( arguments )
        {
            this.selectBobcat( arguments.object.div.id );
        }, this ), true );
        this.selectedBobcat.map.events.register( "mouseover", this.selectedBobcat.map, jQuery.proxy( function( arguments )
        {
            this.selectBobcat( arguments.object.div.id );
        }, this ), true );

        // Bind events for uncertainty part:
        // Logique : element sur lequel event a register(event, element(s) sur lequel event, fonction a appliquer a ces elements)
        this.selectedUncertaintyBobcat.map.events.register( "zoomend", this.selectedUncertaintyBobcat.map, jQuery.proxy( this.handleZoom, this.selectedUncertaintyBobcat.map ), true );//OK.
        this.selectedUncertaintyBobcat.map.events.register( "moveend", this.selectedUncertaintyBobcat.map, jQuery.proxy( this.synchronizeMapsAndUncertaintyMaps, [this, this.selectedUncertaintyBobcat.map] ), false );// OK. TODO: see if it's the simplest way to do it.

        this.selectedUncertaintyBobcat.map.events.register( "touchend", this.selectedUncertaintyBobcat.map, jQuery.proxy( function( arguments )
        {
            this.selectUncertaintyBobcat( arguments.object.div.id );// Attention, paramètre = id, no id_uncertainty (dérive new Bobcat( options4Uncertainty ); ).
        }, this ), true );
        this.selectedUncertaintyBobcat.map.events.register( "mouseover", this.selectedUncertaintyBobcat.map, jQuery.proxy( function( arguments )
        {
            this.selectUncertaintyBobcat( arguments.object.div.id );
        }, this ), true );

        // Select layer accordingly to variable displayed
        switch( this.variable )
        {
            case "Terrestrial_flux":
                this.selectedBobcat.map.layers[1].setVisibility( false );
                this.selectedUncertaintyBobcat.map.layers[1].setVisibility( false );
                break;
            case "Ocean_flux":
                this.selectedBobcat.map.layers[2].setVisibility( false );
                this.selectedUncertaintyBobcat.map.layers[2].setVisibility( false );
                break;
        }
        this.getUncertaintyParameters(resource);
        this.overlayUncertaintyLayers();
        this.resizeAllMaps();
    },

    setLayerVisibility: function()
    {
        var index = this.variablesToDisplay.indexOf( this.variable );
        if( index == -1 )
            return;
        var variableType = this.variableTypesList[index];
        var layerIndex = this.getLayerNumberByVariableType( variableType );
        if( layerIndex )
            this.selectedBobcat.map.layers[layerIndex].setVisibility( false );

        if( "frontiers" == variableType )
        {
            $.each( this.selectedBobcat.map.layers, function( i, d )
            {
                if( 0 != i )
                    d.setVisibility( false );
            } );
            this.selectedBobcat.map.layers[layerIndex].setVisibility( true );
        }
    },

    getLayerNumberByVariableType: function( variableType )
    {
        var layerIndex = false;
        $.each( this.selectedBobcat.map.layers, function( i, d )
        {
            if( d.params.LAYERS.indexOf( variableType ) != -1 )
            {
                layerIndex = i;
                return false;
            }
        } );
        return layerIndex;
    },

    //************** Retrieve parameters to actualise uncertainty maps : ******************** //
    getUncertaintyParameters: function(resource) // TODO : actualise to possibility to add all uncertainty maps.
    {
        // ------------------------- Define parameters for left and right  menu (overlay uncertainty information + update all: --------------------------------------------- //
        // ******** Retrieve parameters to build overlay uncertainty maps (LEFT PART) : **************************
        this.urlResourceUncertainty = this.geoserverUrl + '/wms'; // = Where are the data, url to the data.
        this.modelType = this.hashResources.get( resource )[1];
        this.modelName = this.hashResources.get( resource )[0]; // Si :  this.hashResources.get( this.selectedResourceKeys[iSelectedResourceKeys] )[0]; , ne me donne que le dernier dc ne va pas, besoin qu'il boucle sur les noms de chq modele.

        if( $( '#uncertaintyWithMaskingInputLeft' ).is( ':checked' ) )
        {
            this.overlayModeLeft = 'mk'
        }
        else if( $( '#uncertaintyWithStipplingInputLeft' ).is( ':checked' ) )
        {
            this.overlayModeLeft = 'st'
        }
        // Retrieve threshold value f(slider nivel).
        this.thresholdValueLeft = $( "#uncertaintySliderValueInputLeft" ).val();// Note : on a besoin de declarer ds initialise this.(...).
        this.thresholdValueForTitleLayerLeft = this.thresholdValueLeft.replace( ' σ', 'stdDev' );
        //this.thresholdValueForPyLeft = this.thresholdValueForTitleLayer.replace( '.', '' );
        switch (this.thresholdValueLeft)
        {
            case '0.5 σ':
                this.thresholdValueForPyLeft = 0;
                break;
            case '1 σ':
                this.thresholdValueForPyLeft = 1;
                break;
            case '1.5 σ':
                this.thresholdValueForPyLeft = 2;
                break;
            case '2 σ':
                this.thresholdValueForPyLeft = 3;
                break;
            case '2.5 σ':
                this.thresholdValueForPyLeft = 4;
                break;
            case '3 σ':
                this.thresholdValueForPyLeft = 5;
                break;
        }
        // Set time step to call .shp files (uncertainty files) in GS: --> In these files, time steps information  = index of numTimeSTeps.
        this.indexTimeArray = this.timeArray.indexOf(this.time);
        // Set uncertainty variable:
        switch( this.variable )
        {
            case "Terrestrial_flux":
                this.uncertaintyVariable = 'Terrestrial_fluxUncertainty';
                break;
            case "Ocean_flux":
                this.uncertaintyVariable = 'Ocean_fluxUncertainty';
                break;
        }
        // Retrieve averaging period parameter: already done, in initialise class : = this.selectedPeriod. Right now, only longterm.
        // Retrieve resource parameter ( = nom de chaque modèle, ex : CCAM est un Inversion model). --> resourceght now, only mean for Inversion, Land and Ocean models.
    },

    // --> Pascal : Sens de cette fonction : Qd on psse sur une carte, elle est selected dc on pet appliquer fonction à cette carte (ajouter couches info, synchro/autres cartes, ... dc important !)
    selectUncertaintyBobcat: function( id_uncertainty )
    {
        this.selectedUncertaintyBobcat = this.hashBobcats.get( id_uncertainty );
        //this.selectedUncertaintyBobcat = this.hashBobcats.get( id );
        $( ".BCmap" ).removeClass( "selected" );
        if( this.selectedUncertaintyBobcat )
            $( "#" + this.selectedUncertaintyBobcat.id ).addClass( "selected" );// Attention, paramètre = id, no id_uncertainty (dérive new Bobcat( options4Uncertainty ); ).
    },

    // ******************************** Update all uncertainty maps (right part) : slide or uncertainty overlay modality actions:  ********************************* //
    // Destroy and turn to create map (to apply to stippling/masking event or to change slide  event.
    updateUncertMapRightPart: function( selectedPeriod, modelType, thresholdValueForPy, timeSteps, uncertaintyVariable, overlayMode, thresholdValueForTitleLayerRight)// TODO: actualiser les parametres, certains st a enlever.
    {
        this.hashBobcats.each( jQuery.proxy( function( key )
        {
            // 2 parameters especific to right part: overlayMode and threshold values --> Others values usefull to update, right part: set in getUncertaintyParameters (when map done).
            // OverlayMode
            if( $( '#uncertaintyWithMaskingInput' ).is( ':checked' ) )
            {
                this.overlayMode = 'mk'
            }
            else if( $( '#uncertaintyWithStipplingInput' ).is( ':checked' ) )
            {
                this.overlayMode = 'st'
            }


            var map = this.hashBobcats.get( key ).map;
            if ( map.layers[0].name.substr(0,17) ==  "Uncertainty layer") // On veut appliquer cette fonction uniquement aux cartes qui ont des overlay uncertainty.
            {

                map.layers[0].destroy();
                var uncertaintyLayerNewThreshold = new OpenLayers.Layer.WMS(
                    "Uncertainty layer (" + thresholdValueForTitleLayerRight + ")",
                    this.geoserverUrl + '/wms',
                    {
                        VERSION: '1.1.1',
                        LAYERS: 'binary' + this.selectedPeriod  + this.modelType + 'thr-' + this.thresholdValueForPy + '_' + this.indexTimeArray + this.uncertaintyVariable + '_' + this.overlayMode + '_fco2',
                        transparent: true,
                        FORMAT: 'image/png'
                    }, {
                        isBaseLayer: false,
                        opacity: 1,
                        singleTile: true,
                        visibility: true
                    } );
                map.addLayer( uncertaintyLayerNewThreshold );
                map.setLayerIndex( uncertaintyLayerNewThreshold, 0 );// We want that uncertainty overlay be at bottom compare with all others overlays layers. See http://gis.stackexchange.com/questions/15238/how-to-define-layer-order-in-openlayers

            }
            else console.log( 'No uncertainty layer' );
        }, this ) );
    },


    // *****************************************************************************************
    // ******************************* OVERLAYS UNCERTAINTY MAPS *******************************
    // *****************************************************************************************
    // LEFT MENU PART
    overlayUncertaintyLayers: function()
    {
        console.log(this.indexTimeArray);
        this.uncertaintyLayer = new OpenLayers.Layer.WMS(
            "Uncertainty layer (" + this.thresholdValueForTitleLayerLeft + ")",
            this.geoserverUrl + '/wms',
            {
                VERSION: '1.1.1',
                LAYERS: 'binary' + this.selectedPeriod + this.modelType + 'thr-' + this.thresholdValueForPyLeft + '_' + this.indexTimeArray + this.uncertaintyVariable + '_' + this.overlayModeLeft + '_fco2',
                transparent: true,
                FORMAT: 'image/png'
            }, {
                isBaseLayer: false,
                opacity: 1,
                singleTile: true,
                visibility: true
            } );
        // ***************** Apply visualisations modality to overlay maps f(user choices) about uncertainty information: **************************
        if( $( "#displayOverlayStdDevLeft" ).is( ":checked" ) && this.modelName == 'MEAN' )
        {
            this.selectedBobcat.map.addLayer( this.uncertaintyLayer );
            this.selectedBobcat.map.setLayerIndex( this.uncertaintyLayer, 0 );
        }
    },
    // End Pascal part.

    createMap: function( id, resource )
    {
        if( this.hashBobcats.size() )
        {
            var firstOpenLayerMap = this.hashBobcats.get( this.hashBobcats.keys( 0 )[0] ).map;
            this.centerMap = firstOpenLayerMap.getCenter();
            this.zoomMap = firstOpenLayerMap.getZoom();
        }
        var selectedPeriod = this.getSelectedPeriodValue( this.hashResources.get( resource )[1] );
        // ajax communication need exact same domain so without 8080 (need a connector for that : AJP JKMount)
        var urlResource = "http://" + this.hostName + "/thredds/wms/" + this.threddsPath + "/" + this.hashResources.get( resource )[1] + "/" + selectedPeriod + "/" + resource
            + "_" + selectedPeriod + "_XYT.nc";
        var mapTitle = this.hashResources.get( resource )[1].replace( /\//g, ' / ' ) + ' / ' +
            this.hashResources.get( resource )[0] + ' / ' + this.hashVariables.get( this.variable )[0];
        var mapShortTitle = selectedPeriod.indexOf( "longterm" ) != -1 ? selectedPeriod.replace( "longterm-", "" ) : false;
        var options = {container: $( '#printable' ),
            id: id,
            mapTitle: mapTitle,
            mapShortTitle: mapShortTitle,
            projection: this.projection,
            resource: urlResource,
            variable: this.variable,
            time: this.time,
            range: $( "#slider-range-text" ).val().replace( /[\]\[]/g, '' ),
            numberColorsBands: $( "#slider-nbcolorbands-text" ).html(),
            palette: this.palette,
            centerMap: this.centerMap,
            zoomMap: this.zoomMap,
            minx: this.minx,
            maxx: this.maxx,
            miny: this.miny,
            maxy: this.maxy,
            timeArray: this.timeArray,
            callback:jQuery.proxy( this.eventFilter, this ),
            displayContextuelMenu: true,
            displayIconesMenu: true
        };
        this.selectedBobcat = new Bobcat( options );
        this.hashBobcats.put( id, this.selectedBobcat );
        this.selectBobcat( this.selectedBobcat.id );
        this.zIndex++;
        $( "#" + id ).css( "z-index", this.zIndex );
        // Bind events
        this.selectedBobcat.map.events.register( "zoomend", this.selectedBobcat.map, jQuery.proxy( this.handleZoom, this.selectedBobcat.map ), true );
        this.selectedBobcat.map.events.register( "moveend", this.selectedBobcat.map, jQuery.proxy( this.synchronizeMapsAndUncertaintyMaps, [this, this.selectedBobcat.map] ), false );
        this.selectedBobcat.map.events.register( "touchend", this.selectedBobcat.map, jQuery.proxy( function( arguments )
        {
            this.selectBobcat( arguments.object.div.id );
        }, this ), true );
        this.selectedBobcat.map.events.register( "mouseover", this.selectedBobcat.map, jQuery.proxy( function( arguments )
        {
            this.selectBobcat( arguments.object.div.id );
        }, this ), true );
        // Select layer accordingly to variable displayed
        switch( this.variable )
        {
            case "Terrestrial_flux":
                this.selectedBobcat.map.layers[1].setVisibility( false );
                break;
            case "Ocean_flux":
                this.selectedBobcat.map.layers[2].setVisibility( false );
                break;
        }

        // Pascal part:
        this.getUncertaintyParameters(resource);
        this.overlayUncertaintyLayers();
        // End Pascal part.
        this.resizeAllMaps();
    },

    selectBobcat: function( id )
    {
        this.selectedBobcat = this.hashBobcats.get( id );
        $( ".BCmap" ).removeClass( "selected" );
        if( this.selectedBobcat )
            $( "#" + this.selectedBobcat.id ).addClass( "selected" );
    },

    /* Disable + or - when zoom levels are reached */
    handleZoom: function()
    {
        switch( this.getZoom() )
        {
            case 0:
                $( ".olControlZoomIn" ).css( "pointer-events", "auto" );
                $( ".olControlZoomIn" ).css( "background-color", "" );
                $( ".olControlZoomOut" ).css( "pointer-events", "none" );
                $( ".olControlZoomOut" ).css( "background-color", "#8F8F8F" );
                break;
            case 7:        // 8 levels
                $( ".olControlZoomIn" ).css( "pointer-events", "none" );
                $( ".olControlZoomIn" ).css( "background-color", "#8F8F8F" );
                $( ".olControlZoomOut" ).css( "pointer-events", "auto" );
                $( ".olControlZoomOut" ).css( "background-color", "" );
                break;
            default:
                $( ".olControlZoomIn" ).css( "pointer-events", "auto" );
                $( ".olControlZoomIn" ).css( "background-color", "" );
                $( ".olControlZoomOut" ).css( "pointer-events", "auto" );
                $( ".olControlZoomOut" ).css( "background-color", "" );
        }
    },

    /**
     *This method synchronize all maps. We have to keep in memory (context and argument) the moved map and the selected Bobcat to allow synchronize only when selectedBobcat and movedMap are similar.
     * Otherwise each synchronize start the "moveend" event (n*n synchronize instead of only n)
     */
    synchronizeMapsAndUncertaintyMaps: function()
    {
        var context = this[0];
        var movedMap = this[1];

        if( context.selectedBobcat.id == movedMap.div.id && context.selectedBobcat.synchronization )
        {
            context.hashBobcats.each( jQuery.proxy( function( key )
            {
                if( context.hashBobcats.get( key ).synchronization )
                    context.hashBobcats.get( key ).map.setCenter( context.selectedBobcat.map.getCenter(), context.selectedBobcat.map.getZoom() );
            }, this ) );
        }
        else if( context.selectedUncertaintyBobcat.id == movedMap.div.id && context.selectedUncertaintyBobcat.synchronization )
        {
            context.hashBobcats.each( jQuery.proxy( function( key )
            {
                if( context.hashBobcats.get( key ).synchronization )
                    context.hashBobcats.get( key ).map.setCenter( context.selectedUncertaintyBobcat.map.getCenter(), context.selectedUncertaintyBobcat.map.getZoom() );
            }, this ) );
        }
    },

    resizeAllMaps: function()
    {
        this.resizePrintable();
        this.resizeMaps( $( "#printable" ).width() );
        $( ".BCiconeMenu" ).hide();
    },

    resizeMaps: function( widthForMaps )
    {
        if( 1 > this.hashBobcats.keys().length )
            return;

        var newWidth = Math.round( Math.max( widthForMaps / this.hashBobcats.keys().length, widthForMaps / this.mapsNumber ) ) - 3 * this.mapsNumber - 1; // Add -2/ script without uncertainty maps because if not, next map below, not at the right.
        var newWidth = Math.round( newWidth / 4 ) * 4;                  // Prepare map width to host 4 tiles

        var linesNumber = Math.ceil( this.hashBobcats.keys().length / this.mapsNumber );
        var newHeight = (this.printableInitHeight / linesNumber) - 30;
        this.hashBobcats.each( jQuery.proxy( function( key )
        {
            $( "#" + key ).css( "width", newWidth + "px" );
            $( "#" + key ).css( "height", newHeight + "px" );
            this.hashBobcats.get( key ).resizeMap();
        }, this ) );
    },

    onClickDeleteMap:function( id )
    {
        this.hashBobcats.remove( id );
        this.resizeAllMaps();
        this.updateLegendButtons();
        if( 0 == this.hashBobcats.size() )
            this.centerMap = false;
        this.centerUncertaintyMap = false;
    },

    onClickDeleteAllMaps:function()
    {
        this.hashBobcats.each( jQuery.proxy( function( key )
        {
            this.hashBobcats.remove( key );
        }, this ) );

        $( ".BCmap" ).fadeOut( 500, jQuery.proxy( function( element )
        {
            $( ".BCmap" ).remove();
            this.updateLegendButtons();
        }, this ) );

        // Remove right menus
        $( ".b-m-mpanel" ).remove();

        this.n = 0;
        this.zIndex = 0;
        this.zIndexUncertainty = 0;
        this.centerMap = false;
        this.centerUncertaintyMap = false;
    },


// **************************************************************
// *********************** PROJECTIONS **************************
// **************************************************************
    bindProjection: function()
    {
        $( "#projectionSelect" ).on( 'click', jQuery.proxy( function( event )
        {
            this.projection = $( "#projectionSelect" ).select2( "val" );
        }, this ) );
    },


// **************************************************************
// *********************** AVERAGING PERIOD *********************
// **************************************************************
    bindPeriod: function()
    {
        $( "#periodSelect" ).on( 'click', jQuery.proxy( function( event )
        {
            this.selectedPeriod = $( "#periodSelect" ).select2( "val" );
            this.createVariables();
        }, this ) );
    },

    /**
     * This method manage the difference between the period for resource Inversions and the others
     * For Inversions : period = longterm-2001-2004, and 2001-2004 in the file name
     * For the others : period = longterm-2000-2009, and 2000-2009 in the file name
     * @param resourceKey
     */
    getSelectedPeriodValue: function( resourceKey )
    {
        if( "longterm" == this.selectedPeriod )
            if( "Inversions" == resourceKey )
                return "longterm-2001-2004";
            else
                return "longterm-2000-2009";
        else
            return this.selectedPeriod;
    },


// **************************************************************
// *********************** RESOURCES ****************************
// **************************************************************
    createResourceSelect: function( resourcesTreeData )
    {
        $( "#resourceSelect" ).fancytree( {
            extensions: ["filter"],
            checkbox: true,
            selectMode: 3,
            debugLevel: 0,
            autoCollapse: true,
            source: resourcesTreeData,
            init: jQuery.proxy( function( event, data )
            {
                var selectedNode = data.tree.getSelectedNodes()[0];
                if( !selectedNode )
                    return;
                this.selectedResourceKeys = [selectedNode.key];
                this.onSelectResource( true, false );
            }, this ),
            select: jQuery.proxy( function( event, data )
            {
                this.onSelectResource( false, data );
            }, this ),
            activate: function( event, data )
            {
                data.node.setSelected( !data.node.isSelected() );
                data.node.setActive( false );
            }
        } );

        // Sort tree
        var node = $( "#resourceSelect" ).fancytree( "getRootNode" );
        node.sortChildren( null, true );

        // Filter
        var tree = $( "#resourceSelect" ).fancytree( "getTree" );
        $( "input[name=searchResource]" ).keyup(
            function( e )
            {
                tree.options.filter.mode = "hide";
                var match = $( this ).val();
                if( e && e.which === $.ui.keyCode.ESCAPE || "" === $.trim( match ) )
                {
                    $( "button#btnResetSearchResource" ).click();
                    return;
                }
                // Pass text as filter string (will be matched as substring in the node title)
                var n = tree.applyFilter( match );
                $( "button#btnResetSearchResource" ).attr( "disabled", false );
            } );

        $( "button#btnResetSearchResource" ).click(
            function( e )
            {
                $( "input[name=searchResource]" ).val( "" );
                tree.clearFilter();
            } ).attr( "disabled", true );
    },

    onSelectResource: function( isInit, data )
    {
        if( !isInit )
            this.selectedResourceKeys = $.map( data.tree.getSelectedNodes(), function( node )
            {
                if( !node.folder )
                    return node.key;
            } );
        if( 0 < this.selectedResourceKeys.length )
            this.createVariables();
        else
        {
            this.disableVariableZone( "variableSelect", false, "variable" );

            // Complement to visualize or not uncertainty visualisation part.
            $( '#uncertaintyLeft' ).children().css( {'color':'rgb(170,170,170)', 'pointer-events':'none'} );// CF http://css-tricks.com/almanac/properties/p/pointer-events/
            $( '#displayStdDevLeft' ).prop( 'checked', false );
            $( '#displayOverlayStdDevLeft' ).prop( 'checked', false );
            $( "#overlayStdDevCaseLeft" ).hide();
            $( '#overlayStdDevCase' ).hide();
        }
    },


// **************************************************************
// *********************** VARIABLES ****************************
// **************************************************************
    createVariables: function()
    {
        this.submitButton.addClass( "disabled" );
        this.previousVariable = this.variable;
        this.variableDiv.html( 'Updating...' );
        this.hashVariables = new Hashtable();
        this.createAllVariables( 0 );
    },

    createAllVariables: function( i )
    {
        if( i < this.selectedResourceKeys.length )// Pascal : i =  this.selectedResourceKeys.length et dc nb cartes - 1 parce que compteur/array.
        {
            var selectedPeriod = this.getSelectedPeriodValue( this.hashResources.get( this.selectedResourceKeys[i] )[1] );
            // ajax communication need exact same domain so without 8080 (need a connector for that : AJP JKMount)
            var url = "http://" + this.hostName + "/thredds/wms/" + this.threddsPath + "/" + this.hashResources.get( this.selectedResourceKeys[i] )[1] + "/" + selectedPeriod + "/" +
                this.selectedResourceKeys[i] + "_" + selectedPeriod + "_XYT.nc" + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities";
            this.getVariables( url, i, this.selectedResourceKeys[i] );

            // Pascal part : if title model = mean, activate possibility to add uncertainty information.
            // Prb : si il ne reste que MEAN et que on l'enlève, ne se met pas en gris. Complément donc fait par in onSelectResource()
            var modelName = this.hashResources.get( this.selectedResourceKeys[i] )[0];
            if( 'MEAN' == modelName )
                $( '#uncertaintyLeft' ).children().css( {'color':'#3333', 'pointer-events':'auto'} );
            else
            {
                $( '#uncertaintyLeft' ).children().css( {'color':'rgb(170,170,170)', 'pointer-events':'none'} );// CF http://css-tricks.com/almanac/properties/p/pointer-events/
                $( '#displayStdDevLeft' ).prop( 'checked', false );
                $( '#displayOverlayStdDevLeft' ).prop( 'checked', false );
                $( "#overlayStdDevCaseLeft" ).hide();
//                $('#overlayStdDevCase').hide();
            }
            // End Pascal part :
        }
        else
        {
            this.variableDiv.empty();

            if( 1 <= this.selectedResourceKeys.length && this.useReduceVariablesByRegionByResource )
                this.reduceHashVariable();

            if( 0 == this.hashVariables.keys().length )
            {
                this.disableVariableZone( "variableSelect", false, "variable" );
                return;
            }

            // Display variable
            jQuery.each( this.hashVariables.keys(), jQuery.proxy( function( i, key )
            {
                if( "" != this.hashVariables.get( key )[0] )
                    var divVariable = $( '<input type="radio" name="variableRadio" id="' + key + '"><label for="' + key + '"><span class="variable">' + this.hashVariables.get( key )[0] + '</span></label><BR/>' );
                else
                    var divVariable = $( '<input type="radio" name="variableRadio" id="' + key + '"><label for="' + key + '"><span class="variable">' + key + '</span></label><BR/>' );
                this.variableDiv.append( divVariable );

                // Bind variable
                divVariable.on( "click", jQuery.proxy( function( element )
                {
                    if( "label" != element.currentTarget.localName )
                        this.onSelectVariable( element.currentTarget.id );
                }, this ) );
            }, this ) );

            // Select variable
            if( -1 != this.hashVariables.keys().indexOf( this.previousVariable ) )
                $( "#" + this.previousVariable ).click();
            else
                $( "#" + this.hashVariables.keys()[0] ).click();
        }
    },

    onSelectVariable: function( variableId )
    {
        this.variable = variableId;
        this.createTimes();
    },

    /**
     * This method remove from the hashVariable all variables who doesn't belong to all selected resource --> variable's set intersection
     */
    reduceHashVariable: function()
    {
        jQuery.each( this.hashVariables.keys(), jQuery.proxy( function( i, key )
        {
            var intersectArray = $.arrayIntersect( this.selectedResourceKeys, this.hashVariables.get( key )[1] );
            if( this.selectedResourceKeys.length != intersectArray.length )
                this.hashVariables.remove( key );
        }, this ) )
    },

    getVariables: function( url, i, fileKey )
    {
        $.ajax( {
            type: "GET",
            url: url,
            dataType: "xml",
            timeout: 8000,                  // to valid
            success: jQuery.proxy( function( response )
            {
                this.getVariablesSuccess( response, i, fileKey );
            }, this ),
            error: jQuery.proxy( function()
            {
                this.getVariablesError( i, fileKey );
            }, this )
        } );
    },

    /**
     * This hashVariables contains :
     *   - key : the variable name
     *   - values : [the name to display, [the files array contains this variable], [[the times array's array]] ]
     */
    getVariablesSuccess: function( data, i, fileKey )
    {
        $( data ).find( 'Layer' ).each( jQuery.proxy( function( i, element )
        {
            // Select <Layer queryable="1"> from XML
            if( '1' == $( element ).attr( 'queryable' ) )
            {
                var variableName = $( element ).children( "Name" ).text();
                var index = this.variablesToDisplay.indexOf( variableName );
                if( variableName && -1 && (index != -1) )
                {
                    var filesArray = null == this.hashVariables.get( variableName ) ? new Array() : this.hashVariables.get( variableName )[1];
                    filesArray.push( fileKey );
                    this.hashVariables.put( variableName, [this.variableNamesToDisplay[index], filesArray] );
                }
            }
        }, this ) );
        i++;
        this.createAllVariables( i );
    },

    getVariablesError: function( i )
    {
        i++;
        this.createAllVariables( i );
    },

    fillVariablesError: function()
    {
        var message = $( '<div></div>' )
            .html( "<BR/>Unable to read file" )
            .dialog(
            {
                modal: true,
                resizable: false,
                autoOpen: false,
                position: [8,50],
                title: "Message",
                width: 167,
                height:100
            } );
        message.dialog( 'open' );
        this.submitButton.addClass( "disabled" );

        this.disableVariableZone( "variableSelect", false, "variable" );
    },

    disableVariableZone: function( valueContainer, contentContainer, parameter )
    {
        switch( parameter )
        {
            case "variable" :
                this.submitButton.addClass( "disabled" );
                $( "#" + valueContainer ).html( "No " + parameter );

                if( contentContainer )
                    $( "#" + contentContainer ).hide();

                this.disableTimeZone();
                break;
            case "time":
                this.disableTimeZone();
                break;
        }
    },


// **************************************************************
// ************************** TIMES *****************************
// **************************************************************
    createTimes: function()
    {
        this.submitButton.addClass( "disabled" );
        this.previousTime = this.time;
        this.timeYearSelect.empty();
        this.timeYearSelect.append( "<option>Updating...</option>" );
        this.timeYearSelect.select2();
        this.timeMonthSelect.empty();
        $( "#s2id_timeMonthSelect" ).empty();
        this.timeArray = new Array();
        this.time = false;
        this.createAllTimes( 0 );
    },

    createAllTimes: function( i )
    {
        var fileArray = this.hashVariables.get( this.variable )[1];
        if( i < fileArray.length )
        {
            var selectedPeriod = this.getSelectedPeriodValue( this.hashResources.get( fileArray[i] )[1] );

            // ajax communication need exact same domain so without 8080 (need a connector for that : AJP JKMount)
            var url = "http://" + this.hostName + "/thredds/wms/" + this.threddsPath + "/" + this.hashResources.get( fileArray[i] )[1] + "/" + selectedPeriod + "/" +
                this.basename( fileArray[i] ) + "_" + selectedPeriod + "_XYT.nc" + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities";

            this.getTimes( url, i );
        }
        else
        {
            // timeArray is one simple array with all common times.
            this.timeArray = this.hashVariables.get( this.variable )[2] && this.hashVariables.get( this.variable )[2][0] ? this.hashVariables.get( this.variable )[2][0] : new Array();
            if( 1 < this.selectedResourceKeys.length )
                this.timeArray = this.reduceTimesArray();

            if( 0 == this.timeArray.length )
            {
                this.disableTimeZone();
                return;
            }

            // Time
            this.timeYearSelect.empty();
            this.timeMonthSelect.empty();

            var format = getFormatDate( this.timeArray );
            var yearArray = new Array();
            var monthArray = new Array();
            var calendarConverter = new AnyTime.Converter( { format: format } );
            this.timeArray = this.timeArray.reverse();					// reverse order of times to present oldest in last
            jQuery.each( this.timeArray, jQuery.proxy( function( i, val )
            {
                var newTime = new Date( val );
                var formatedTime = new Date( newTime.getUTCFullYear(), newTime.getUTCMonth(), newTime.getUTCDate(), newTime.getUTCHours(), newTime.getUTCMinutes(), newTime.getUTCSeconds() );
                var formatedDate = calendarConverter.format( formatedTime );
                var splitedDate = formatedDate.split( "-" );
                if( -1 == yearArray.indexOf( splitedDate[0] ) )
                {
                    var yearLabel = splitedDate[0];
                    yearArray.push( yearLabel );
                    if( "longterm" == this.selectedPeriod )
                        yearLabel = "Long term";
                    this.timeYearSelect.append( '<option value="' + splitedDate[0] + '">' + yearLabel + '</option>' );
                }

                if( -1 == monthArray.indexOf( splitedDate[1] ) )
                {
                    monthArray.push( splitedDate[1] );
                    // The month value contains all the date value without the year
                    this.timeMonthSelect.append( '<option value="' + val.replace( splitedDate[0], "" ) + '">' + splitedDate[1] + '</option>' );
                }
            }, this ) );

            // Create select2
            if( 0 == yearArray.length )
                this.disableTimeZone();
            else
            {
                this.timeYearSelect.select2();
                this.timeMonthSelect.select2();

                if( "%Y-%M" != format || 0 == monthArray.length )
                {
                    this.timeMonthSelect.hide();
                    $( "#s2id_timeMonthSelect" ).hide();
                }
            }
            this.bindTimes();

            // Select time : we keep time in format "1998-01-16T00:00:00.000Z"
            if( -1 != this.timeArray.indexOf( this.previousTime ) )
            {
                var splitedPreviousTime = this.previousTime.split( "-" );
                this.timeYearSelect.select2( "val", splitedPreviousTime[0] );
                this.timeMonthSelect.select2( "val", this.previousTime.replace( splitedPreviousTime[0], "" ) );
            }
            this.time = this.timeYearSelect.select2( "val" ) + this.timeMonthSelect.select2( "val" );

            this.updateLegend();
            this.submitButton.removeClass( "disabled" );
        }
    },

    /**
     * - times : i = 2 in this.hashVariables.get( this.variable )
     */
    reduceTimesArray: function()
    {
        var array = this.hashVariables.get( this.variable )[2];
        if( !array )
            return new Array();
        var result = array[0] ? array[0] : new Array();
        jQuery.each( array, jQuery.proxy( function( i, element )
        {
            result = $.arrayIntersect( result, element );
        }, this ) );
        return result;
    },

    getTimes: function( url, i )
    {
        $.ajax( {
            type: "GET",
            url: url,
            dataType: "xml",
            success: jQuery.proxy( function( response )
            {
                this.getTimesSuccess( response, i );
            }, this ),
            error: jQuery.proxy( function()
            {
                this.getTimesError();
            }, this )
        } );
    },

    getTimesSuccess: function( data, i )
    {
        $( data ).find( 'Layer' ).each( jQuery.proxy( function( j, layer )
        {
            // Select <Layer queryable="1"> and <Name>variable</Name> and <Dimension name="time">
            if( ('1' == $( layer ).attr( 'queryable' )) && ($( layer ).children( "Name" ).text() == this.variable) )
            {
                var hashVariablesValues = this.hashVariables.get( this.variable );
                var allTimesArray = !hashVariablesValues[2] ? new Array() : hashVariablesValues[2];
                var isTimeAdded = false;
                $( layer ).children( 'Dimension' ).each( jQuery.proxy( function( k, child )
                {
                    switch( $( child ).attr( "name" ) )
                    {
                        case "time" :
                            var timearraytext = $( child ).text();
                            allTimesArray.push( $.trim( timearraytext ).split( ',' ) );
                            isTimeAdded = true;
                            break;
                    }
                }, this ) );

                if( !isTimeAdded )
                    allTimesArray.push( new Array() );
                hashVariablesValues[2] = allTimesArray;
                this.hashVariables.put( this.variable, hashVariablesValues );

                if( $( layer ).children( 'BoundingBox' ) )
                {
                    this.minx = parseFloat( $( layer ).children( 'BoundingBox' ).attr( 'minx' ) );
                    this.maxx = parseFloat( $( layer ).children( 'BoundingBox' ).attr( 'maxx' ) );
                    this.miny = parseFloat( $( layer ).children( 'BoundingBox' ).attr( 'miny' ) );
                    this.maxy = parseFloat( $( layer ).children( 'BoundingBox' ).attr( 'maxy' ) );
                    // Pascal:
                    this.minx4UncertaintyMaps = parseFloat( $( layer ).children( 'BoundingBox' ).attr( 'minx' ) );
                    this.maxx4UncertaintyMaps = parseFloat( $( layer ).children( 'BoundingBox' ).attr( 'maxx' ) );
                    this.miny4UncertaintyMaps = parseFloat( $( layer ).children( 'BoundingBox' ).attr( 'miny' ) );
                    this.maxy4UncertaintyMaps = parseFloat( $( layer ).children( 'BoundingBox' ).attr( 'maxy' ) );
                }
            }
        }, this ) );
        i++;
        this.createAllTimes( i );
    },

    getTimesError: function()
    {
        var message = $( '<div></div>' )
            .html( "Unable to get Dimension Time" )
            .dialog(
            {
                modal: true,
                resizable: false,
                autoOpen: false,
                position: [8,50],
                title: "Message",
                width: 200,
                height:100
            } );
        message.dialog( 'open' );
        this.submitButton.addClass( "disabled" );

        this.disableTimeZone();
    },

    bindTimes: function()
    {
        this.timeYearSelect.on( 'click', jQuery.proxy( function( event )
        {
            this.time = this.timeYearSelect.select2( "val" ) + this.timeMonthSelect.select2( "val" );
        }, this ) );

        this.timeMonthSelect.on( 'click', jQuery.proxy( function( event )
        {
            this.time = this.timeYearSelect.select2( "val" ) + this.timeMonthSelect.select2( "val" );
        }, this ) );
    },

    disableTimeZone: function()
    {
        this.timeArray = new Array();
        this.timeYearSelect.empty();
        this.timeYearSelect.append( "<option>No time</option>" );
        this.timeYearSelect.select2();
        this.timeMonthSelect.empty();
        $( "#s2id_timeMonthSelect" ).empty();
        this.timeMonthSelect.hide();
    },


// **************************************************************
// ************************* RANGE ******************************
// **************************************************************
    bindRange: function()
    {
        this.rangeDiv.on( "click", jQuery.proxy( function ( event )
        {
            this.submitButton.addClass( "disabled" );
            var previousRange = $( "#slider-range-text" ).val();
            $( "#slider-range-text" ).val( "Updating..." );

            var selectedPeriod = this.getSelectedPeriodValue( this.hashResources.get( this.selectedResourceKeys[0] )[1] );

            // ajax communication need exact same domain so without 8080 (need a connector for that : AJP JKMount)
            var resourceUrl = "http://" + this.hostName + "/thredds/wms/" + this.threddsPath + "/" + this.hashResources.get( this.selectedResourceKeys[0] )[1] + "/" + selectedPeriod + "/" + this.selectedResourceKeys[0]
                + "_" + selectedPeriod + "_XYT.nc";

            var url = resourceUrl
                + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMetadata&item=minmax&SRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=200&HEIGHT=200"
                + "&TIME=" + this.time
                + "&ELEVATION=" + this.elevation
                + "&LAYERS=" + this.variable;

            this.getRange( url, previousRange );
        }, this ) );
    },

    getRange: function( url, previousRange )
    {
        $.ajax( {
            type: "GET",
            url: url,
            dataType: "json",
            success: jQuery.proxy( function( response )
            {
                this.fillRangeSuccess( response, previousRange );
            }, this ),
            error: jQuery.proxy( function()
            {
                this.fillRangeError( previousRange );
            }, this )
        } );
    },

    fillRangeSuccess: function( data, previousRange )
    {
        var max = data.max;
        if( 1 > Math.abs( max ) )
            max = Math.ceil( max * 10 ) / 10;  // 1 digit after .
        else if( 10 > Math.abs( max ) )
            max = Math.ceil( max );             // ceil
        else
            max = Math.ceil( max / 10 ) * 10;  // about ten
        var min = data.min;
        if( 1 > Math.abs( min ) )
            min = Math.floor( min * 10 ) / 10;
        else if( 10 > Math.abs( min ) )
            min = Math.floor( min );
        else
            min = Math.floor( min / 10 ) * 10;

        this.updateRangeSlider( min, max );
        this.submitButton.removeClass( "disabled" );
    },

    fillRangeError: function( previousRange )
    {
        $( "#slider-range-text" ).val( previousRange );
        this.rangeDiv.blur();
        var message = $( '<div></div>' )
            .html( "Unable to get range" )
            .dialog(
            {
                modal: true,
                autoOpen: false,
                position: [8,50],
                buttons: {
                    Ok: function()
                    {
                        $( this ).dialog( "close" );
                    }
                },
                title: "Message",
                width: 167
            } );
        message.dialog( 'open' );
    },

    bindRangeSlider: function()
    {
        $( "#slider-range-text" ).on( "change", jQuery.proxy( function()
        {
            var valuesArray = $( "#slider-range-text" ).val().replace( "[", "" ).replace( "]", "" ).split( "," );
            this.updateRangeSlider( valuesArray[0], valuesArray[1] );
        }, this ) );
    },

    updateRangeSlider: function( min, max )
    {
        var step = (max - min) / 20;                 // slider divided into 20 steps
        if( 1 > Math.abs( step ) )
            step = Math.floor( step * 10 ) / 10;
        else if( 10 > Math.abs( step ) )
            step = Math.floor( step );
        else
            step = Math.floor( step / 10 ) * 10;

        $( "#slider-range" ).slider( "option", "min", min * 2 );
        $( "#slider-range" ).slider( "option", "max", max * 2 );
        $( "#slider-range" ).slider( "option", "step", step );
        $( "#slider-range" ).slider( "option", "values", [min,max] );
//        $( "#slider-range-text" ).val( '[' + $( "#slider-range" ).slider( "values", 0 ) + "," + $( "#slider-range" ).slider( "values", 1 ) + ']' );
        $( "#slider-range-text" ).val( '[' + min + "," + max + ']' );
        this.rangeDiv.blur();
        this.updateLegend();
    },


// **************************************************************
// ************************* LEGEND *****************************
// **************************************************************
    updateLegend: function()
    {
        if( 0 == this.selectedResourceKeys.length || !this.variable || !this.palette )
            return;

        var selectedPeriod = this.getSelectedPeriodValue( this.hashResources.get( this.selectedResourceKeys[0] )[1] );

        var resourceUrl = "http://" + this.hostName + "/thredds/wms/" + this.threddsPath + "/" + this.hashResources.get( this.selectedResourceKeys[0] )[1] + "/" + selectedPeriod + "/" + this.selectedResourceKeys[0]
            + "_" + selectedPeriod + "_XYT.nc";
        var colorscalerange = $( "#slider-range-text" ).val().replace( /[\]\[]/g, '' );
        var numcolorbands = $( "#slider-nbcolorbands-text" ).html();
        // Initial legend size is 110x264 ; here take 80% of the size
        $( "#legend" ).html( "<img id='legendImg' width='88px;' height='211px;' src='"
            + resourceUrl
            + "?REQUEST=GetLegendGraphic"
            + "&LAYER=" + this.variable
            + "&PALETTE=" + this.palette
            + "&COLORSCALERANGE=" + colorscalerange
            + "&NUMCOLORBANDS=" + numcolorbands
            + "' alt=''/>" );

        $( "#legendImg" ).load( jQuery.proxy( function()
        {
            if( !this.leftMenuInitWidth )
                this.leftMenuInitWidth = $( "#leftMenu" ).width();
            if( !this.rightMenuInitWidth )
                this.rightMenuInitWidth = $( "#rightMenu" ).width();
        }, this ) );

        this.updateHeightMenus();

        // Update maps with new STYLES (palette), NUMCOLORBANDS and COLORSCALERANGE
        this.hashBobcats.each( jQuery.proxy( function( key )
        {
            var map = this.hashBobcats.get( key );
            var wms1 = map.wms1;
            wms1.mergeNewParams( { STYLES: "boxfill/" + this.palette,
                NUMCOLORBANDS: numcolorbands,
                COLORSCALERANGE: colorscalerange } );
            // replace also the inner legend image
            $( "#BClegendImg" + key ).replaceWith( "<img id='BClegendImg" + key + "' width='66px;' height='158px;' src='" +
                resourceUrl + "?REQUEST=GetLegendGraphic" + "&LAYER=" + map.variable +
                "&PALETTE=" + this.palette + "&COLORSCALERANGE=" + colorscalerange +
                "&NUMCOLORBANDS=" + numcolorbands
                + "' alt=''/>" );
        }, this ) );

    },


// **************************************************************
// ************************ SLIDERS *****************************
// **************************************************************
    createSliders: function()
    {
        // Color slider
        $( "#slider-range" ).slider( {
            range: true,
            min: -1000,
            max: 1000,
            step: 5,
            values: [-500, 500],
            slide: jQuery.proxy( function ( event, ui )
            {
                $( "#slider-range-text" ).val( '[' + ui.values[0] + ',' + ui.values[1] + ']' );
                this.updateLegend();
            }, this )
        } );
        $( "#slider-range-text" ).val( '[' + $( "#slider-range" ).slider( "values", 0 ) + "," + $( "#slider-range" ).slider( "values", 1 ) + ']' );
        this.bindRangeSlider();

        $( "#slider-nbcolorbands" ).slider( {
            value: 90,
            min: 5,
            max: 200,
            step: 5,
            slide: jQuery.proxy( function ( event, ui )
            {
                $( "#slider-nbcolorbands-text" ).html( ui.value );
                this.updateLegend();
            }, this )
        } );
        $( "#slider-nbcolorbands-text" ).html( $( "#slider-nbcolorbands" ).slider( "value" ) );
        //Pascal part:
        // Slider uncertainty (st dev) threshold part:
        var valueArray = ["0.5 σ", "1 σ", "1.5 σ", "2 σ", "2.5 σ", "3 σ"];// --> To write σ symbols, use this method in js (be in utf8). For html, we could use  <?php echo('&#931'); ?> (cf http://www.webstandards.org/learn/reference/charts/entities/symbol_entities/)
        $( "#uncertaintyLevelSliderLeft" ).slider( {
            value: 1,
            min: 0,
            max: 5,
            step: 1,
            slide: function( event, ui )
            {
                $( "#uncertaintySliderValueInputLeft" ).val( valueArray[ui.value] );// If we want to put in input different value (my case): relation with slider's values done by index array.
            }
        } );
        $( "#uncertaintySliderValueInputLeft" ).val( valueArray[1] );// --> Set default value f(array's values).

        // Slider uncertainty (st dev) threshold part: only for the right menu part (= to apply to all maps):
        $( "#uncertaintyLevelSlider" ).slider( {
            value: 1,
            min: 0,
            max: 5,
            step: 1,
            slide: jQuery.proxy( function( event, ui )
            {
                $( "#uncertaintySliderValueInput" ).val( valueArray[ui.value] );// If we want to put in input different value (my case): relation with slider's values done by index array.
                // Threshold: --> Set here and then use in updateUncertMapRightPart (pass like parameters).
                this.thresholdValueSliderRight = $( "#uncertaintySliderValueInput" ).val();// Note : on a besoin de declarer ds initialise this.(...).
                this.thresholdValueForTitleLayerRight = this.thresholdValueSliderRight.replace( ' σ', 'stdDev' );
                switch (this.thresholdValueSliderRight)
                {
                    case '0.5 σ':
                        this.thresholdValueForPy = 0;
                        break;
                    case '1 σ':
                        this.thresholdValueForPy = 1;
                        break;
                    case '1.5 σ':
                        this.thresholdValueForPy = 2;
                        break;
                    case '2 σ':
                        this.thresholdValueForPy = 3;
                        break;
                    case '2.5 σ':
                        this.thresholdValueForPy = 4;
                        break;
                    case '3 σ':
                        this.thresholdValueForPy = 5;
                        break;
                }
                this.updateUncertMapRightPart( this.selectedPeriod, this.modelType, this.thresholdValueForPy, this.indexTimeArray, this.uncertaintyVariable, this.overlayMode, this.thresholdValueForTitleLayerRight );
            }, this )
        } );
        $( "#uncertaintySliderValueInput" ).val( valueArray[1] );// --> Set default value f(array's values).
        // End Pascal part:
    },


// **************************************************************
// *********************** NUMBER MAPS **************************
// **************************************************************
    bindNumberMaps: function()
    {
        $( "#mapsNumberSelect" ).on( 'click', jQuery.proxy( function( event )
        {
            this.mapsNumber = $( "#mapsNumberSelect" ).select2( "val" );
            this.resizeAllMaps();
        }, this ) );
    },


// **************************************************************
// *********************** PALETTES ****************************
// **************************************************************
    bindPalettes: function()
    {
        $( "#paletteSelect" ).on( 'click', jQuery.proxy( function( event )
        {
            this.palette = $( "#paletteSelect" ).select2( "val" );
            this.palette4UncertaintyMaps = $( "#paletteSelect" ).select2( "val" );
            this.updateLegend();
        }, this ) );
    },


// **************************************************************
// ************************* BIND *******************************
// **************************************************************
    bindActions: function()
    {
        // Help
        $( "#helpMenu" ).on( 'click', jQuery.proxy( function()
        {
            this.createHelp();
        }, this ) );

        // Create map button
        this.submitButton.on( 'click', jQuery.proxy( function ( event )
        {
            if( this.submitButton.hasClass( "disabled" ) )
                return;
            this.onClickSubmit();
        }, this ) );

        $( "#submitDeleteMaps" ).on( 'click', jQuery.proxy( function ( event )
        {
            this.onClickDeleteAllMaps();
        }, this ) );

        $( "#submitShowAllLegends" ).on( 'click', jQuery.proxy( function ( event )
        {
            this.onClickShowAllLegends();
        }, this ) );

        $( "#submitHideAllLegends" ).on( 'click', jQuery.proxy( function ( event )
        {
            this.onClickHideAllLegends();
        }, this ) );

        // Slide left menu
        $( "#hideOrShowLeftMenu" ).on( "click", jQuery.proxy( function()
        {
            var newWidth = this.leftMenuInitWidth == $( "#leftMenu" ).width() ? "10" : this.leftMenuInitWidth;
            var displayLeftMenu = newWidth == this.leftMenuInitWidth;
            if( displayLeftMenu )
                this.onClickShowLeftMenu();
            else
                this.onClickHideLeftMenu();
        }, this ) );

        // Slide right menu
        $( "#hideOrShowRightMenu" ).on( "click", jQuery.proxy( function()
        {
            var newWidth = this.rightMenuInitWidth == $( "#rightMenu" ).width() ? "10" : this.rightMenuInitWidth;
            var displayRightMenu = newWidth == this.rightMenuInitWidth;
            if( displayRightMenu )
                this.onClickShowRightMenu();
            else
                this.onClickHideRightMenu();
        }, this ) );

        window.onresize = jQuery.proxy( function( event )
        {
            this.printableInitHeight = $( "#printable" ).height();
            this.resizeAllMaps();
        }, this );

        $( ".menu_title" ).on( "click", function( event )
        {
            if( $( this ).hasClass( "disabled" ) )
                return;

            if( $( this ).hasClass( 'active' ) )
                $( this ).removeClass( "active" );
            else
                $( this ).addClass( "active" );
            var contentToSlide = event.currentTarget.id.replace( "menu_", "" ) + "Content";
            $( "#" + contentToSlide ).slideToggle();
        } );

        $( "#clearAll" ).on( "click", jQuery.proxy( function()
        {
            this.initInterface();
        }, this ) );

    },


// **************************************************************
// ************************* EVENT ******************************
// **************************************************************
    eventFilter:function( arguments )
    {
        var eventChild = arguments[0];
        var id = arguments[1];
        switch( eventChild )
        {
            case "removeMap":
                this.onClickDeleteMap( id );
                break;
            case "updateLegendButtons":
                this.updateLegendButtons();
                break;
        }
    },

    onClickSubmit: function()
    {
        this.updateLegend();
        this.createMaps();
        this.updateLegendButtons();
    },

    onClickShowAllLegends: function()
    {
        this.hashBobcats.each( jQuery.proxy( function( key )
        {
            this.hashBobcats.get( key ).onClickShowLegend();
        }, this ) );
        this.updateLegendButtons();
    },

    onClickHideAllLegends: function()
    {
        this.hashBobcats.each( jQuery.proxy( function( key )
        {
            this.hashBobcats.get( key ).onClickHideLegend();
        }, this ) );
        this.updateLegendButtons();
    },

    onClickShowLeftMenu: function()
    {
        this.onClickShowMenu( "leftMenu", this.leftMenuInitWidth );
    },

    onClickShowRightMenu: function()
    {
        this.onClickShowMenu( "rightMenu", this.rightMenuInitWidth );
    },

    onClickShowMenu: function( menuId, initWidth )
    {
        var newWidth = $( "#pageWrapper" ).width() - this.leftMenuInitWidth - this.rightMenuInitWidth - 20;
        if( "leftMenu" == menuId )
            newWidth = $( "#pageWrapper" ).width() - this.leftMenuInitWidth - $( "#rightMenu" ).width() - 30;
        else
            newWidth = $( "#pageWrapper" ).width() - $( "#leftMenu" ).width() - this.rightMenuInitWidth - 30;

        this.resizeMaps( newWidth );
        $( "#printable" ).animate( {width: newWidth}, 200 );

        $( "#" + menuId ).animate( {
            width: initWidth + "px"
        }, 200, jQuery.proxy( function()
        {
            $( "#" + menuId ).fadeIn();
        }, this ) );
    },

    onClickHideLeftMenu: function()
    {
        this.onClickHideMenu( "leftMenu" );
    },

    onClickHideRightMenu: function()
    {
        this.onClickHideMenu( "rightMenu" );
    },

    onClickHideMenu: function( menuId )
    {
        $( "#" + menuId ).fadeOut( jQuery.proxy( function()
        {
            $( "#" + menuId ).animate( {
                width: "10px"
            }, 200, jQuery.proxy( function()
            {
                var newWidth = $( "#pageWrapper" ).width() - $( "#leftMenu" ).width() - $( "#rightMenu" ).width() - 1;
                $( "#printable" ).animate( {width: newWidth}, 200, jQuery.proxy( function()
                {
                    this.resizeMaps( newWidth );
                }, this ) );
            }, this ) );
        }, this ) );
    },


// **************************************************************
// ************************* HELP ******************************
// **************************************************************
    createHelp: function()
    {
        this.displayElementsForHelp();
        if( this.helpElements.isOneMapDisplay )
            this.displayHelp();
        else
            jQuery( ".BCmapTitleIconeMenu img" ).load( jQuery.proxy( function()
            {
                if( !this.help )
                    this.displayHelp();
            }, this ) );
    },

    displayHelp: function()
    {
        var firstId = $( ".BCmap" )[0].id;

        var parameters = new Object();

        parameters.helpArray = [
            // Left menu
            {linkType:"simple", divToHelpId:"clearAll", text:"Init all the selected fields", marginTop:5, marginLeft:31},
            {linkType:"simple", divToHelpId:"hideOrShowLeftMenu", text:"Slide this menu to get more space", textLengthByLine:40, marginTop:98, marginLeft:2},
            {linkType:"simple", divToHelpId:"submitCreateMap", text:"Create map(s) with all selected parameters. One by one selected resource", linkedHelp: ["resourceSelect"], textLengthByLine:45, marginTop:11, marginLeft:-20},
            {linkType:"right", divToHelpId:"s2id_projectionSelect", text:"Pick a projection", marginTop:20, marginLeft:$( "#s2id_projectionSelect" ).width() / 2, stage:1},
            {linkType:"right", divToHelpId:"s2id_periodSelect", text:"Choose a period", marginTop:20, marginLeft:$( "#s2id_periodSelect" ).width() / 2, stage:1},
            {linkType:"simple", divToHelpId:"resourceSelect", text:"Select as resources as you want. It will create a map for each one", textLengthByLine:34, marginTop:30, marginLeft:-70},
            {linkType:"simple", divToHelpId:"variableSelect", text:"Intersection of variables available for all the resources you selected", textLengthByLine:30, marginTop:10, marginLeft:-40},
            {linkType:"simple", divToHelpId:"timeSelect", text:"Intersection of time periods available for the selected variable", textLengthByLine:30, linkLength:39, marginTop:5, marginLeft:-30},

            // Right menu
            {linkType:"simpleLeft", divToHelpId:"hideOrShowRightMenu", text:"Slide this menu too", marginTop:5, marginLeft:31},
            {linkType:"simpleLeft", divToHelpId:"s2id_mapsNumberSelect", text:"Change maps number by line", textLengthByLine:15, linkLength:20, marginTop:8, marginLeft:80},
            {linkType:"left", divToHelpId:"submitHideAllLegends", text:"", linkedHelp:["submitShowAllLegends"], linkLength:84, marginTop:30, marginLeft:26, stage:2},
            {linkType:"left", divToHelpId:"submitShowAllLegends", text:"Show or hide all legends in the same time", linkedHelp:["submitHideAllLegends"], marginTop:30, marginLeft:26, stage:2},
            {linkType:"middle", divToHelpId:"submitDeleteMaps", text:"Remove all maps", marginTop:25, marginLeft:26, stage:1},

            // Map
            {linkType:"left", divToHelpId:"BC" + firstId + "CloseIcone", text:"Close this map", marginTop:20, marginLeft:12, stage:4},
            {linkType:"left", divToHelpId:"BC" + firstId + "MenuIcone", text:"Display menu to init, show or hide legend, plug with google earth and access to metadata", marginTop:20, marginLeft:12, stage:3},
            {linkType:"left", divToHelpId:"BC" + firstId + "ForwardIcone", text:"", linkedHelp: ["BC" + firstId + "RewindIcone"], linkLength:69, marginTop:20, marginLeft:12, stage:2},
            {linkType:"left", divToHelpId:"BC" + firstId + "RewindIcone", text:"Get previous and forward time steps", linkedHelp: ["BC" + firstId + "ForwardIcone"], marginTop:20, marginLeft:12, stage:2},
            {linkType:"left", divToHelpId:"BC" + firstId + "SynchroIcone", text:"Lock or unlock geographical synchronization with other maps", marginTop:20, marginLeft:12, stage:1},

            // Right menu : range
            {linkType:"left", divToHelpId:"slider-range-text", text:"Put down the range you want for your next map", linkedHelp: ["legend"], marginTop:5, marginLeft:26, stage:1},
            {linkType:"simpleLeft", divToHelpId:"getRange", text:"Get the range for the selected variable. It will update the legend", linkedHelp: ["legend"], marginTop:5, marginLeft:20},
            {linkType:"left", divToHelpId:"slider-range", text:"Use this slider to change the range", linkedHelp: ["legend"], marginTop:5, marginLeft:110, stage:2},

            // Right menu : palettes
            {linkType:"simpleLeft", divToHelpId:"selectPalette", text:"Select the palette for your next map, it will update the legend", linkedHelp: ["legend"], textLengthByLine:32, marginTop:8, marginLeft:60},

            // Right menu : legend
            {linkType:"simpleLeft", divToHelpId:"slider-nbcolorbands", text:"Use this slide to change the number of colors", linkedHelp: ["legend"], marginTop:1, marginLeft:40},
            {linkType:"simpleLeft", divToHelpId:"legend", text:"Here is your legend for your next map", marginTop:$( "#legend" ).height() / 2, marginLeft:70, stage:3},
        ];
        parameters.parentContainerId = "#pageWrapper";
        //parameters.globalMarginTop = -110;
        //parameters.globalMarginLeft = -110;		// TODO: do not handle width resizing

        this.help = new Help( parameters );

        this.help.wrapper.on( "click", jQuery.proxy( function()
        {
            this.hideElementsForHelp();
        }, this ) );

        this.addFooter();
    },

    removeHelp: function()
    {
        this.hideElementsForHelp();
        this.help.remove();			// ?? error does not exist
        this.help = false;
    },

    displayElementsForHelp : function()
    {
        this.helpElements = new Object();

        // Display one map if necessary
        this.helpElements.isOneMapDisplay = 0 < $( ".BCmap" ).size();
        if( !this.helpElements.isOneMapDisplay )
            this.submitButton.click();
    },

    hideElementsForHelp:function()
    {
        if( !this.helpElements.isOneMapDisplay )
            $( ".BCmap .BCmapTitleIconeMenu" ).click();
        this.help = false;
    },

    addFooter: function()
    {
        var divFooter = $( '<p class="helpFooter"></p>' );
        this.help.wrapper.append( divFooter );

        var divContentFooter = $( '' +
            '<div class="helpFooterContentRight">' +
            '<div class="helpFooterContentFloat">A project realised by</div>' +
            '<div class="helpFooterContentFloat" title="Climate and Environment Sciences Laboratory"><div><img src="' + this.imgPath + '/logo_lsce_small.png"/></div><div><img src="' + this.imgPath + '/logo_LSCE_text_2_small.png"/></div></div>' +
            '</div>' );

        divFooter.append( divContentFooter );
    },


// **************************************************************
// ************************* OTHER ******************************
// **************************************************************
    basename: function( path )
    {
        return path.replace( /.*\//, "" );
    },

    selectElement: function( array, previousValue )
    {
        if( !array || 0 == array.length )
            return;
        if( -1 != array.indexOf( previousValue ) )
            $( "#" + previousValue.replace( /\./g, "" ).replace( /\:/g, "" ) ).click();
        else
            $( "#" + array[0].replace( /\./g, "" ).replace( /\:/g, "" ) ).click();
    },

    updateLegendButtons: function()
    {
        var isMoreLegend = (1 <= $( ".BClegend" ).size());
        if( isMoreLegend )
        {
            if( 0 == $( ".BClegend:visible" ).length )
            {
                $( "#submitShowAllLegends" ).attr( "disabled", false );
                $( "#submitHideAllLegends" ).attr( "disabled", true );
            }
            else if( 0 == $( ".BClegend:hidden" ).length )
            {
                $( "#submitShowAllLegends" ).attr( "disabled", true );
                $( "#submitHideAllLegends" ).attr( "disabled", false );
            }
            else
            {
                $( "#submitShowAllLegends" ).attr( "disabled", false );
                $( "#submitHideAllLegends" ).attr( "disabled", false );
            }
        }
        else
        {
            $( "#submitShowAllLegends" ).attr( "disabled", true );
            $( "#submitHideAllLegends" ).attr( "disabled", true );
        }
    },

    resizePrintable: function()
    {
        $( "#printable" ).width( $( "#pageWrapper" ).width() - $( "#leftMenu" ).width() - $( "#rightMenu" ).width() - 37 );
        $( "#printable" ).height( $( "#leftMenu" ).height() );
        this.printableInitHeight = $( "#printable" ).height();
    },

    /**
     * This hash contains :
     *   - key : the value
     *   - values : the name to display, [url if exist, title]
     */
    fillHash: function( hash, treeData )
    {
        jQuery.each( treeData, jQuery.proxy( function( i, element )
        {
            if( element.children )
                this.fillHash( hash, element.children );
            else
            {
                var value = element.url ? [element.title, element.url] : element.title;
                hash.put( element.key, value );
            }
        }, this ) );

        return hash;
    },

    updateHeightMenus: function()
    {
        var maxSize = Math.max( $( "#leftMenu" ).height(), $( "#rightMenu" ).height() );
        $( "#leftMenu" ).height( maxSize );
        $( "#rightMenu" ).height( maxSize );
        $( "#hideOrShowLeftMenu" ).height( maxSize );

    }


} );

function format( pal )
{
    return "<img class='flag' src='palettes/" + pal.text + ".png'/></br>" + pal.text;
}


