/**
 * Copyright Patrick Brockmann, Vanessa Maigne & Pascal Evano, 2013
 *
 * Patrick.Brockmann@lsce.ipsl.fr
 * Vanessa.Maigne@lsce.ipsl.fr
 * Pascal.Evano@lsce.ipsl.fr
 *
 * Licensed under the CeCILL-B license under French law and abiding
 * by the rules of distribution of free software. You can  use, modify
 * and/or redistribute the software under the terms of the CeCILL-B
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 */

var Bobcat = Class.create( {
    initialize: function( parameters )
    {
        this.container = parameters.container ? parameters.container : "body";
        this.id = parameters.id;
        this.mapTitle = parameters.mapTitle ? parameters.mapTitle : "";
        this.mapShortTitle = parameters.mapShortTitle ? parameters.mapShortTitle : false;
        this.displayContextuelMenu = parameters.displayContextuelMenu;
        this.displayIconesMenu = parameters.displayIconesMenu;
        this.callbackForParentClass = parameters.callback;
        this.projection = parameters.projection;
        this.resource = parameters.resource;
        this.variable = parameters.variable;
        this.time = parameters.time;
        this.elevation = parameters.elevation;
        this.range = parameters.range;
        this.numberColorsBands = parameters.numberColorsBands;
        this.palette = parameters.palette;
        this.minx = parameters.minx;
        this.maxx = parameters.maxx;
        this.miny = parameters.miny;
        this.maxy = parameters.maxy;
        this.timeArray = parameters.timeArray;
        this.centerMap = parameters.centerMap;
        this.zoomMap = parameters.zoomMap;

        this.resolutions = new Array();
        this.wrapDateLine = false;
        this.synchronization = true;
        this.imgPath = "Bobcat/img";

        this.createMainMap();

    },


// **************************************************************
// ************************** MAP *******************************
// **************************************************************
    createMainMap: function()
    {
        this.createMapAndTitleDiv();
        this.createMap();
        this.createInnerLegend();
        if( this.displayContextuelMenu )
            this.createOrUpdateContextMenu();
        if( this.displayIconesMenu )
            this.createOrUpdateIconesMenu();
    },

    /**
     * This method create the div for the map and her title
     * When resizing, it will block the size to the legend one's if there's a legend and the title is overflow
     */
    createMapAndTitleDiv: function()
    {
        var mapDiv = $( '<div id="' + this.id + '" class="BCmap"></div>' );
        this.container.append( mapDiv );
        var mapTitleDiv = $( '<div class="BCmapTitle">' +
                '<div id="BC' + this.id + 'TitleMap" class="BCmapSubTitle" title="' + this.mapTitle + '">' + this.mapTitle + '</div>' +
                '<div id="BC' + this.id + 'TitleMapShort" class="BCmapSubTitleShort"></div></div>' );
        mapDiv.append( mapTitleDiv );
        this.updateMapShortTitle();
        var mapCloseDiv = $( '<div id="BC' + this.id + 'CloseIcone" class="BCmapTitleIconeMenu"><img src="' + this.imgPath + '/delete.png" title="Delete this map"></div>' );
        mapCloseDiv.on( "click", jQuery.proxy( function()
        {
            this.onClickRemoveMap();
        }, this ) );
        mapTitleDiv.append( mapCloseDiv );
        if( this.displayIconesMenu )
        {
            var mapIconeMenuDiv = $( '<div id="BC' + this.id + 'MenuIcone" class="BCmapTitleIconeMenu"><img src="' + this.imgPath + '/menu.png" title="Display menu"></div>' );
            mapIconeMenuDiv.on( "click", jQuery.proxy( function()
            {
                this.onClickShowIconeMenu();
            }, this ) );
            mapTitleDiv.append( mapIconeMenuDiv );
        }
        var mapForwardDiv = $( '<div id="BC' + this.id + 'ForwardIcone" class="BCmapTitleIconeMenu"><img src="' + this.imgPath + '/forward.png" title="Display next time step"></div>' );
        mapForwardDiv.on( "click", jQuery.proxy( function()
        {
            this.onClickDisplayNextTimeStep();
        }, this ) );
        mapTitleDiv.append( mapForwardDiv );
        var mapRewindDiv = $( '<div id="BC' + this.id + 'RewindIcone" class="BCmapTitleIconeMenu"><img src="' + this.imgPath + '/rewind.png" title="Display previous time step"></div>' );
        mapRewindDiv.on( "click", jQuery.proxy( function()
        {
            this.onClickDisplayPrevTimeStep();
        }, this ) );
        mapTitleDiv.append( mapRewindDiv );
        var mapSynchro = $( '<div id="BC' + this.id + 'SynchroIcone" class="BCmapTitleIconeMenu"><img src="' + this.imgPath + '/sync_on.png" title="Desactivate pan/zoom synchronization"></div>' );
        mapSynchro.on( "click", jQuery.proxy( function()
        {
            this.onClickSynchronization();
        }, this ) );
        mapTitleDiv.append( mapSynchro );
        this.updateRewindAndForwardIcones( 0 );
    },

    createMap: function()
    {
        var projectionBounds;
        switch( this.projection )
        {
            case "EPSG:4087" :        // World Equidistant Cylindrical
                projectionBounds = [-20037508.3428, -10018754.1714, 20037508.3428, 10018754.1714];        // left, bottom, right, top
                var centerMap = new OpenLayers.LonLat( 0, 0 ).transform( 'EPSG:4326', this.projection );
                var deltaX = 20037508.3428 * 2;                                // Excursion on X axis
                this.wrapDateLine = true;
                break;
            case "EPSG:3857" :        // Pseudo-Mercator
                projectionBounds = [-20037508.3428, -20037508.3428, 20037508.3428, 20037508.3428];        // left, bottom, right, top
                var centerMap = new OpenLayers.LonLat( 0, 0 ).transform( 'EPSG:4326', this.projection );
                var deltaX = 20037508.3428 * 2;                                // Excursion on X axis
                this.wrapDateLine = true;
                break;
            case "EPSG:54009" :        // World Mollweide
                projectionBounds = [-2E7, -1E7, 2E7, 1E7];                            // left, bottom, right, top
                var centerMap = new OpenLayers.LonLat( 0, 0 ).transform( 'EPSG:4326', this.projection );
                var deltaX = 20037508.3428 * 2;                                // Excursion on X axis
                this.wrapDateLine = false;
                break;
            case "EPSG:54030" :        // World Robinson
                projectionBounds = [-2E7, -1E7, 2E7, 1E7];                            // left, bottom, right, top
                var centerMap = new OpenLayers.LonLat( 0, 0 ).transform( 'EPSG:4326', this.projection );
                var deltaX = 20037508.3428 * 2;                                // Excursion on X axis
                this.wrapDateLine = false;
                break;
            case "EPSG:3408" :        // EASE-Grid North
                projectionBounds = [-9E6, -9E6, 9E6, 9E6];                             // left, bottom, right, top
                var centerMap = new OpenLayers.LonLat( 0, 90 ).transform( 'EPSG:4326', this.projection );
                var deltaX = 9E6 * 2;                                        // Excursion on X axis
                this.wrapDateLine = false;
                break;
            case "EPSG:3409" :        // EASE-Grid South
                projectionBounds = [-9E6, -9E6, 9E6, 9E6];                             // left, bottom, right, top
                var centerMap = new OpenLayers.LonLat( 0, -90 ).transform( 'EPSG:4326', this.projection );
                var deltaX = 9E6 * 2;                                        // Excursion on X axis
                this.wrapDateLine = false;
                break;
        }
        // About definition of resolutions, read http://trac.osgeo.org/openlayers/wiki/SettingZoomLevels
        this.resolutions = [deltaX, deltaX / 2, deltaX / 4, deltaX / 8, deltaX / 16, deltaX / 32, deltaX / 64, deltaX / 128];

        // overlay if present
        if( this.centerMap ) var centerMap = this.centerMap;

        this.map = new OpenLayers.Map( this.id, {
            theme: null,
            controls:
                    [
                        //new OpenLayers.Control.PanZoomBar( {panIcons: false} ),		// Simple Control.Zoom is enough, Control.PanZoombar too hight
                        new OpenLayers.Control.Zoom( {title: "Zoom in/out"} ),
                        new OpenLayers.Control.Navigation(),
                        new OpenLayers.Control.LayerSwitcher( {title: "Show/Hide overlays"} )
                    ],
            projection: new OpenLayers.Projection( this.projection ),
            maxExtent: new OpenLayers.Bounds( projectionBounds ),
            center: centerMap,
            numZoomLevels: 8,                                // according to resolutions array
            allOverlays: false                                // If true see WMS as a layer
        } );


        this.addLayersToMap();
        this.createZoomToMaxExtent();
        this.resizeMap();

        if( this.zoomMap )
            this.map.zoomTo( this.zoomMap );
        else
            this.map.zoomTo( 0 );

        // Styles
        $( this.map.viewPortDiv ).addClass( "BCmapWMS" );

    },

    createZoomToMaxExtent: function()
    {
        var maxExtentDiv = $( '<div id= "BC' + this.id + 'maxExtentId" class="BCmaxExtentClass" title="Init map"></div>' );
        $( "#" + this.id ).append( maxExtentDiv );
        maxExtentDiv.on( "click", jQuery.proxy( function()
        {
            this.onClickInitZoom();
        }, this ) );
    },

    resizeMap: function()
    {
        $( this.map.viewPortDiv ).width( $( "#" + this.id ).width() + "px" );
        $( this.map.viewPortDiv ).height( ($( "#" + this.id ).height() - $( ".BCmapTitle" ).height() / 2 - 3) + "px" );
        var legendHeight = Math.min( $( "#" + this.id ).height() - $( ".BCmapTitle" ).height() / 2 - 3, this.legendHeightInit );
        $( "#BClegendImg" + this.id ).css( "height", legendHeight + "px" );
        $( "#BClegend" + this.id ).css( "top", -legendHeight + "px" );
        this.width_map = $( "#" + this.id ).width();

        var tileSizeNew = Math.floor( this.width_map / 4 );
        this.map.tileSize.w = tileSizeNew;
        this.map.tileSize.h = tileSizeNew;
        for( var i = 0; i < this.resolutions.length; i++ )
        {
            this.wms1.resolutions[i] = this.resolutions[i] / this.width_map;
        }

        this.map.updateSize();
    },

    onClickRemoveMap: function()
    {
        $( "#" + this.id ).remove();
        this.callbackForParentClass( ["removeMap", this.id] );
    },

    addLayersToMap: function()
    {
        // Layers
        this.get_WMS1();
        this.get_landMaskLayer();
        this.get_oceanMaskLayer();
        this.get_frontiersLayer();
        this.get_namesLayer();
        this.get_urbanAreasLayer();
        this.get_lakesAndRiversLayer();
        this.get_graticulesLayer();
        this.map.addLayers( [this.wms1, this.landMaskLayer, this.oceanMaskLayer, this.frontiersLayer, this.namesLayer, this.urbanAreasLayer, this.lakesAndRiversLayer, this.graticulesLayer] );
    },

// **************************************************************
// ************************ LEGEND ******************************
// **************************************************************
    createInnerLegend: function()
    {
        var legendDiv = $( '<div id="BClegend' + this.id + '" class="BClegend"></div>' );
        // Initial legend size is 110x264 ; here take 60% of the size
        var imgSrc = "<img id='BClegendImg" + this.id + "' width='66px;' height='158px;' src='" + this.resource + "?REQUEST=GetLegendGraphic" + "&LAYER=" + this.variable
                + "&PALETTE=" + this.palette + "&COLORSCALERANGE=" + this.range + "&NUMCOLORBANDS=" + this.numberColorsBands
                + "' alt=''/>";
        legendDiv.html( imgSrc );
        $( '#' + this.id ).append( legendDiv );
        $( '#BClegend' + this.id ).on( 'dblclick', jQuery.proxy( function ()
        {
            this.onClickHideLegend();
        }, this ) );
        $( "#BClegendImg" + this.id ).load( jQuery.proxy( function()
        {
            this.legendHeightInit = $( "#BClegendImg" + this.id )[0].height;
        }, this ) );
    },

    onClickShowOrHideLegend: function( isShow )
    {
        $( "#BCiconeMenu" + this.id ).hide();
        var legendHeight = Math.min( $( "#" + this.id ).height() - $( ".BCmapTitle" ).height() / 2 - 3, this.legendHeightInit );
        $( '#BClegendImg' + this.id ).height( legendHeight );
        $( '#BClegend' + this.id ).css( "top", -legendHeight + "px" );
        if( isShow )
            $( '#BClegend' + this.id ).fadeIn( jQuery.proxy( function()
            {
                this.callbackForParentClass( ["updateLegendButtons", ""] );
                this.createOrUpdateContextMenu();
                this.createOrUpdateIconesMenu();
            }, this ) );
        else
            $( '#BClegend' + this.id ).fadeOut( jQuery.proxy( function()
            {
                this.callbackForParentClass( ["updateLegendButtons", ""] );
                this.createOrUpdateContextMenu();
                this.createOrUpdateIconesMenu();
            }, this ) );
    },

    onClickShowLegend: function()
    {
        this.onClickShowOrHideLegend( true );
    },

    onClickHideLegend: function()
    {
        this.onClickShowOrHideLegend( false );
    },


// **************************************************************
// ************************ MENUS *******************************
// **************************************************************
    getOptionsForContextMenu: function( showLegend )
    {
        var items = new Array();
        if( showLegend )
            items.push( { text: "Show legend", icon: this.imgPath + "/legend_display.png", alias:"showLegend", action: jQuery.proxy( this.onClickShowLegend, this )} );
        // Pascal : part else is used to get the same info when right click on a map..
        else
            items.push( { text: "Hide legend", icon: this.imgPath + "/legend_hide.png", alias:"hideLegend", action: jQuery.proxy( this.onClickHideLegend, this )} );
        items.push( { text: "Export to kmz", icon: this.imgPath + "/GoogleEarth-icon.png", alias:"googleearth", action: jQuery.proxy( this.onClickExportToKMZ, this )} );
        items.push( {text: "Get the reference", icon: this.imgPath + "/information.png", alias: "linkmetadata", action: jQuery.proxy( this.onClickDisplayMetadataInfo, this )} );
        items.push( {text: "Get metadata information/add feedback", icon: this.imgPath + "/GeoLabelLogo22px.jpg", alias: "getAndCompleteMetadata", action: jQuery.proxy( this.onClickDisplayMetadataInfoGVQ, this )} );

        return { width: 200, items: items};
    },

    createOrUpdateContextMenu: function()
    {
        var isLegendHidden = $( "#BClegend" + this.id ).is( ":hidden" );
        var option = this.getOptionsForContextMenu( isLegendHidden );
        var menuTitleDiv = $( '<div class="BCcontainerTitle BCmenuTitleClose"><div class="BCcontainerTitleText">Menu </div><div class="BCcontainerTitleClose"><img src="' + this.imgPath + '/close.png"></div></div>' );
        $( "#" + this.id ).contextmenu( option, "BCrightMenu" + this.id, menuTitleDiv, true );
    },

    createOrUpdateIconesMenu: function()
    {
        $( "#BCiconeMenu" + this.id ).fadeOut( function()
        {
            $( this ).remove();
        } );
        var iconeMenuDiv = $( '<div id="BCiconeMenu' + this.id + '" class="BCiconeMenu"></div>' );
        $( "#" + this.id ).append( iconeMenuDiv );

        var isLegendHidden = $( "#BClegend" + this.id ).is( ":hidden" );
        if( isLegendHidden )
        {
            var iconeShowLegend = $( '<div class="BCiconeForMenu"><div class="BCiconeForMenuImage"><img src="' + this.imgPath + '/legend_display.png"></div><div class="BCIconeForMenuTitle">&nbsp;Show legend</div></div>' );
            iconeShowLegend.on( "click", jQuery.proxy( this.onClickShowLegend, this ) );
            iconeMenuDiv.append( iconeShowLegend );
        }
        else
        {
            var iconeHideLegend = $( '<div class="BCiconeForMenu"><div class="BCiconeForMenuImage"><img src="' + this.imgPath + '/legend_hide.png"></div><div class="BCIconeForMenuTitle">&nbsp;Hide legend</div></div>' );
            iconeHideLegend.on( "click", jQuery.proxy( this.onClickHideLegend, this ) );
            iconeMenuDiv.append( iconeHideLegend );
        }
        var iconeGoogle = $( '<div class="BCiconeForMenu"><div class="BCiconeForMenuImage"><img src="' + this.imgPath + '/GoogleEarth-icon.png"></div><div class="BCIconeForMenuTitle">&nbsp;Export to kmz</div></div>' );
        iconeGoogle.on( "click", jQuery.proxy( function()
        {
            this.onClickExportToKMZ();
            $( "#BCiconeMenu" + this.id ).fadeOut();
        }, this ) );
        iconeMenuDiv.append( iconeGoogle );
        var iconeMetadata = $( '<div class="BCiconeForMenu"><div class="BCiconeForMenuImage"><img src="' + this.imgPath + '/information.png"></div><div class="BCIconeForMenuTitle">&nbsp;Get the reference</div></div>' );
        iconeMetadata.on( "click", jQuery.proxy( function()
        {
            this.onClickDisplayMetadataInfo();
            $( "#BCiconeMenu" + this.id ).fadeOut();
        }, this ) );
        iconeMenuDiv.append( iconeMetadata );

        // Pascal part:
        var iconeMetadataPascal = $( '<div class="BCiconeForMenu"><div class="BCiconeForMenuImage"><img src="' + this.imgPath + '/GeoLabelLogo22px.jpg"></div><div class="BCIconeForMenuTitle">&nbsp;Get metadata information/add feedback</div></div>' );
        iconeMetadataPascal.on( "click", jQuery.proxy( function()
        {
            this.onClickDisplayMetadataInfoGVQ();
            $( "#BCiconeMenu" + this.id ).fadeOut();
        }, this ) );
        iconeMenuDiv.append( iconeMetadataPascal );
    },

    onClickShowIconeMenu: function()
    {
        $( '#BCiconeMenu' + this.id ).slideToggle( 200 );
        $( '#BCiconeMenu' + this.id ).css( "top", -$( "#" + this.id ).height() + $( ".BCmapTitle" ).height() / 2 + "px" );
        var isLegendHidden = $( "#BClegend" + this.id ).is( ":hidden" );
        if( !isLegendHidden )
            $( '#BCiconeMenu' + this.id ).css( "right", -$( '#BClegendImg' + this.id ).width() + "px" );
    },


// **************************************************************
// ************************ EVENTS ******************************
// **************************************************************
    onClickExportToKMZ: function()
    {
        // ncWMS expose center of boxes and not boundaries --> if not treated then there is a missing part at the wrapline
        // so treat this very special case
        if( this.minx == -179.5 && this.miny == -89.5 && 179.5 == this.maxx && 89.5 == this.maxy )
        {
            this.minx = -180;
            this.miny = -90;
            this.maxx = 180;
            this.maxy = 90;
        }

        var selectitem = "";
        var selectoption = "";
        for( var i = 0; i < this.timeArray.length; i++ )
        {
            if( this.timeArray[i] == this.time )
                selectoption = '<option value=' + this.timeArray[i] + ' selected>' + this.timeArray[i] + '</option>';
            else
                selectoption = '<option value=' + this.timeArray[i] + '>' + this.timeArray[i] + '</option>';
            selectitem = selectitem + selectoption;
        }

        var message = $( '<div></div>' )
                .html( '<select id="timeselector" multiple="multiple" style="width: 220px; height: 100px;">'
                + selectitem
                + '</select>' )
                .dialog(
            {
                modal: true,
                autoOpen: false,
                position: [20,50],
                buttons: {
                    "Export": jQuery.proxy( function()
                    {
                        var timeselectedvals = new Array();
                        $( "#timeselector option:selected" ).each( function()
                        {
                            timeselectedvals.push( $( this ).val() );
                        } );
                        var timeselectedvals_parameter = timeselectedvals.toString().split( ',' );
                        //alert("kmz creation with TIME="+timeselectedvals_parameter);
                        // get and combine but no tiles reload
                        var kmz = this.wms1.getFullRequestString( {
                            BBOX: this.minx + ',' + this.miny + ',' + this.maxx + ',' + this.maxy,
                            TIME: timeselectedvals_parameter,
                            FORMAT: 'application/vnd.google-earth.kmz',
                            TRANSPARENT: 'true',
                            SRS: 'EPSG:4326',
                            WIDTH: '1000', HEIGHT: '1000' } );		// should be proposed as user choices

                        //window.location.href=kmz;			// without adding any mask to kmz file

                        // TODO : There is no TimeStamp in the kml description created by ncWMS when only one time step
                        // see http://www.resc.reading.ac.uk/trac/ncWMS/ticket/181
                        // see /home/webportals/ncWMS_thredds_git2/ncWMS/src/java/uk/ac/rdg/resc/ncwms/graphics/KmzFormat.java
                        var kmz4php = escape( kmz );			// equivalent to encode in php but with js.
                        var fileTitle_brut = this.mapTitle;		// = Flux : Inversion / CCAM / Ocean flux
                        var fileTitle_ok = fileTitle_brut.replace( / /g, "" ).replace( /\//g, "_" );
                        if( timeselectedvals_parameter.length == 1 ) fileTitle_ok = fileTitle_ok + '_' + timeselectedvals_parameter[0];
                        else fileTitle_ok = fileTitle_ok + '_animation';
                        //console.log(fileTitle_ok);
                        var maskType = "none";
                        if( this.map.layers[1].getVisibility() ) var maskType = "land";	// modify_kmz.php does not handle two masks only one or zero
                        if( this.map.layers[2].getVisibility() ) var maskType = "ocean";
                        if( this.map.layers[1].getVisibility() && this.map.layers[2].getVisibility() ) var maskType = "none"; // if both visible then none
                        window.location.href = "Bobcat/modify_kmz.php?mask=" + maskType + "&resource=" + kmz4php + "&fileTitle=" + fileTitle_ok;

                    }, this ),
                    "Cancel": function()
                    {
                        $( '#timeselector' ).remove();			// it is important to remove this id created into the dialog message
                        $( this ).dialog( "close" );			// to get correct $("#timeselector option:selected")
                    }
                },
                title: "Export to kmz format",
                height: 300,
                width: 250
            } );
        message.dialog( 'open' );
    },

    onClickDisplayMetadataInfo: function()
    {

        // Replace thredds/wms by thredds/fileServer
        var infofile = this.resource.replace( "thredds/wms/", "thredds/fileServer/" );
        // Change extension
        infofile = infofile.substr( 0, infofile.lastIndexOf( "." ) ) + ".info";

        $.ajax( {
            type: "GET",
            url: infofile,
            dataType: "html",        // for now .info file are text file
            timeout: 2000,
            success: jQuery.proxy( function( data )
            {
                data = data.replace( new RegExp( '\n', 'g' ), '<br/>' );					// change newline to html code
                data = data.replace( new RegExp( 'Ref :' ), '<b>Ref :</b>' );				// pass 'Ref :' to bold
                data = data.replace( new RegExp( 'Contact :' ), '<b>Contact :</b>' );			// pass 'Contact :' to bold
                // Read http://www.w3schools.com/jsref/jsref_regexp_whitespace_non.asp
                data = data.replace( new RegExp( '< (\\S+@\\S+\.\\S+) >', 'g' ), '<i><a href=\"mailto:$1\">$1</a></i>' );	// emailize all < xxxx@xxxx.xxx.xx >
                //console.log(data);
                $( "<div title='Contact / Reference'>" + data + "</div>" ).dialog( { position: { my: "center", at: "center", of: "#" + this.id} } );
            }, this ),
            error: jQuery.proxy( function( data )
            {
                $( "<div title='Contact / Reference'>" + "Not available" + "</div>" ).dialog( { position: { my: "center", at: "center", of: "#" + this.id} } );
            }, this )
        } );

    },

    // Pascal part :
    onClickDisplayMetadataInfoGVQ: function()
    {
        $.ajax( {
            url: "formAndMetadataRepresentation/metadataAccess.php",
            success: jQuery.proxy( function( data )
            {
                $( "<div title='Metadata of the file: " + this.mapTitle + "'>" + data + "</div>" ).dialog( { position: { my: "center", at: "center", of: "#" + this.id}, width: 500, height: 300, maxHeight: 300, maxWidth: 500 } );
            }, this ),
            error: jQuery.proxy( function( data )
            {
                $( "<div title='Metadata visualisation'>" + "Not available" + "</div>" ).dialog( { position: { my: "center", at: "center", of: "#" + this.id} } );
            }, this )
        } );
    },


    onClickInitZoom: function()
    {
        this.map.zoomToMaxExtent();
    },

    onClickSynchronization: function()
    {
        this.synchronization = !this.synchronization;
        if( this.synchronization )
            $( "#BC" + this.id + "SynchroIcone" ).html( '<img src="' + this.imgPath + '/sync_on.png" title="Desactivate pan/zoom synchronization"></div>' );
        else
            $( "#BC" + this.id + "SynchroIcone" ).html( '<img src="' + this.imgPath + '/sync_off.png" title="Activate pan/zoom synchronization"></div>' );
    },


// **************************************************************
// *********************** ANIMATIONS ***************************
// **************************************************************
    onClickDisplayPreviousOrNextTime: function( isNext )
    {
        var index = this.timeArray.indexOf( this.time );
        var condition = isNext ? (index < this.timeArray.length && index != -1) : (0 < index && index != -1);
        if( condition )
        {
            if( isNext )
                index++;
            else
                index--;
            // combine but no tiles reload
            this.wms1.mergeNewParams( { TIME: this.timeArray[index]  } );
            this.time = this.timeArray[index];
            this.updateMapShortTitle();
        }
        this.updateRewindAndForwardIcones( index );
    },

    onClickDisplayNextTimeStep: function()
    {
        if( $( "#BC" + this.id + "ForwardIcone" ).attr( "disabled" ) )
            return;
        this.onClickDisplayPreviousOrNextTime( false );
    },

    onClickDisplayPrevTimeStep: function( argument )
    {
        if( $( "#BC" + this.id + "RewindIcone" ).attr( "disabled" ) )
            return;
        this.onClickDisplayPreviousOrNextTime( true );
    },

    updateRewindAndForwardIcones: function( index )
    {
        if( this.timeArray.length <= 1 )
        {
            $( "#BC" + this.id + "ForwardIcone" ).attr( "disabled", true );
            $( "#BC" + this.id + "RewindIcone" ).attr( "disabled", true );
        }
        else if( index + 1 >= this.timeArray.length )
        {
            $( "#BC" + this.id + "ForwardIcone" ).attr( "disabled", false );
            $( "#BC" + this.id + "RewindIcone" ).attr( "disabled", true );
        }
        else if( index == 0 )
        {
            $( "#BC" + this.id + "ForwardIcone" ).attr( "disabled", true );
            $( "#BC" + this.id + "RewindIcone" ).attr( "disabled", false );
        }
        else
        {
            $( "#BC" + this.id + "ForwardIcone" ).attr( "disabled", false );
            $( "#BC" + this.id + "RewindIcone" ).attr( "disabled", false );
        }
    },


// **************************************************************
// ************************ LAYERS ******************************
// **************************************************************

    get_WMS1: function()
    {
        this.wms1 = new OpenLayers.Layer.WMS(
                "Variable",
                this.resource, {
            VERSION: '1.1.1',
            LAYERS: this.variable,
            ELEVATION: this.elevation,
            TIME: this.time,
            NUMCOLORBANDS: this.numberColorsBands,
            STYLES: 'boxfill/' + this.palette,
            COLORSCALERANGE: this.range,
            ABOVEMAXCOLOR: 'extend',
            BELOWMINCOLOR: 'extend',
            FORMAT: 'image/png'
        }, {
            isBaseLayer: true,
            wrapDateLine: this.wrapDateLine,
            opacity: 1
        } );
    },

    get_landMaskLayer: function()
    {
        this.landMaskLayer = new OpenLayers.Layer.WMS(
                "Land mask",
                "http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
        {
            VERSION: '1.1.1',
            LAYERS: "GCA:GCA_landMask",
            transparent: true,
            FORMAT: 'image/png',
        }, {
            isBaseLayer: false,
            opacity: 1,
        } );
    },

    get_oceanMaskLayer: function()
    {
        this.oceanMaskLayer = new OpenLayers.Layer.WMS(
                "Ocean mask",
                "http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
        {
            VERSION: '1.1.1',
            LAYERS: "GCA:GCA_oceanMask",
            transparent: true,
            FORMAT: 'image/png',
        }, {
            isBaseLayer: false,
            opacity: 1,
        } );
    },

    get_frontiersLayer: function()
    {
        this.frontiersLayer = new OpenLayers.Layer.WMS(
                "Frontiers",
                "http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
        {
            VERSION: '1.1.1',
            LAYERS: "GCA:GCA_frontiersCountryAndRegions",
            transparent: true,
            FORMAT: 'image/png',
        }, {
            isBaseLayer: false,
            opacity: 1,
            visibility: false
        } );
    },

    get_namesLayer: function()
    {
        this.namesLayer = new OpenLayers.Layer.WMS(
                "Names",
                "http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
        {
            VERSION: '1.1.1',
            LAYERS: "GCA:GCA_labelsCountriesRegionsOceans",
            transparent: true,
            FORMAT: 'image/png',
        }, {
            isBaseLayer: false,
            opacity: 1,
            singleTile: true,
            visibility: false
        } );
    },

    get_graticulesLayer: function()
    {
        this.graticulesLayer = new OpenLayers.Layer.WMS(
                "Graticules",
                "http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
        {
            VERSION: '1.1.1',
            LAYERS: "GCA:GCA_graticules01_05_10",
            transparent: true,
            FORMAT: 'image/png',
        }, {
            isBaseLayer: false,
            opacity: 1,
            visibility: false
        } );
    },

    get_urbanAreasLayer: function()
    {
        this.urbanAreasLayer = new OpenLayers.Layer.WMS(
                "Urban areas",
                "http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
        {
            VERSION: '1.1.1',
            LAYERS: "GCA:GCA_citiesLabelsAndFrontiers",
            transparent: true,
            FORMAT: 'image/png',
        }, {
            isBaseLayer: false,
            opacity: 1,
            singleTile: true,
            visibility: false
        } );
    },

    get_lakesAndRiversLayer: function()
    {
        this.lakesAndRiversLayer = new OpenLayers.Layer.WMS(
                "Lakes and rivers",
                "http://www.globalcarbonatlas.org:8080/geoserver/GCA/wms",
        {
            VERSION: '1.1.1',
            LAYERS: "GCA:GCA_lakesAndRivers",
            transparent: true,
            FORMAT: 'image/png',
        }, {
            isBaseLayer: false,
            opacity: 1,
            singleTile: true,
            visibility: false
        } );
    },



// **************************************************************
// ************************* OTHER ******************************
// **************************************************************
    basename: function( path )
    {
        return path.replace( /.*\//, "" );
    },

    updateMapShortTitle: function()
    {
        var formatedDate = "No time";

        if( this.mapShortTitle )
            formatedDate = this.mapShortTitle;
        else
        {
            if( this.time )
            {
                var format = getFormatDate( this.timeArray );
                var calendarConverter = new AnyTime.Converter( { format: format } );
                var newTime = new Date( this.time );
                var formatedTime = new Date( newTime.getUTCFullYear(), newTime.getUTCMonth(), newTime.getUTCDate(), newTime.getUTCHours(), newTime.getUTCMinutes(), newTime.getUTCSeconds() );
                var formatedDate = calendarConverter.format( formatedTime );
            }

            if( this.elevation && null != this.elevation )
                formatedDate += ' / ' + parseFloat( this.elevation ).toFixed( 2 );
        }

        $( "#BC" + this.id + "TitleMapShort" ).html( formatedDate );
        $( "#BC" + this.id + "TitleMapShort" ).attr( "title", formatedDate );
    }

} );

function getFormatDate( timeArray )
{
    var yearArray = new Array();
    var monthArray = new Array();
    var dayArray = new Array();
    var hourArray = new Array();
    var minuteArray = new Array();
    var secondArray = new Array();

    // If only one time step then we display only %Y (to handle specific longterm products)
    if( timeArray.length == 1 )
        return "%Y";

    // TODO : revoir l'extraction des tableaux selon les dates, via un format, une matrice, ....
    jQuery.each( timeArray, function( i, element )
    {
        var time = new Date( element );
        if( jQuery.inArray( time.getUTCFullYear(), yearArray ) == -1 )
            yearArray.push( time.getUTCFullYear() );
        if( jQuery.inArray( time.getUTCMonth(), monthArray ) == -1 )
            monthArray.push( time.getUTCMonth() );
        if( jQuery.inArray( time.getUTCDate(), dayArray ) == -1 )
            dayArray.push( time.getUTCDate() );
        if( jQuery.inArray( time.getUTCHours(), hourArray ) == -1 )
            hourArray.push( time.getUTCHours() );
        if( jQuery.inArray( time.getUTCMinutes(), minuteArray ) == -1 )
            minuteArray.push( time.getUTCMinutes() );
        if( jQuery.inArray( time.getUTCSeconds(), secondArray ) == -1 )
            secondArray.push( time.getUTCSeconds() );
    } );

    if( 1 < secondArray.length )
        return "%Y-%m-%d %H:%i:%s";
    else if( 1 < minuteArray.length )
        return "%Y-%m-%d %H:%i";
    else if( 1 < hourArray.length )
        return "%Y-%m-%d %H:%i";                                      // Hours always with minutes
    else if( 1 < dayArray.length )
        return "%Y-%m-%d";
    else if( 1 < monthArray.length )
        return "%Y-%M";
    else if( 1 < yearArray.length )
        return "%Y";
}
