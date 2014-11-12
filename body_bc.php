<div id="pageWrapper">
    <div id="leftMenu" class="non-printable">
        <div class="leftMenuUp">
            <div id="helpMenu"><img src="img/help_big_orange.png"></div>
            <div class="leftMenuUp">
                <div id="clearAll">Clear selections</div>
            </div>
        </div>
        <div class="leftMenu firstLeftMenu">
            <div id="submitCreateMap" class="orangeButton">Create map</div>
        </div>

        <div class="leftMenu">
            <h2 title="Pick a projection">
                <img src="img/1step.png">
                PROJECTION
            </h2>

            <select id="projectionSelect">
                <option value="EPSG:4087">World Equidistant Cylindrical</option>
                <option value="EPSG:3857">Pseudo-Mercator</option>
                <option value="EPSG:3408">EASE-Grid North</option>
                <option value="EPSG:3409">EASE-Grid South</option>
            </select>
        </div>

        <div class="leftMenu">
            <h2 title="Choose your period">
                <img src="img/2step.png">
                AVERAGING PERIOD
            </h2>

            <select id="periodSelect"></select>
        </div>

        <div class="leftMenu">
            <h2 title="Select as resources as you want. It will create a map for each one">
                <img src="img/3step.png">
                RESOURCES
            </h2>

            <div>
                <input name="searchResource" placeholder="Filter..." size="10">
                <button id="btnResetSearchResource">&times;</button>

                <div id="resourceSelect"></div>
            </div>
        </div>

        <div id="variables" class="leftMenu">
            <h2 title="Intersection of variables available for all the selected resources">
                <img src="img/4step.png">
                VARIABLE
            </h2>

            <div id="variableSelect"></div>

        </div>

        <div class="leftMenu">
            <h2 title="Intersection of times available for the selected variable and selected resources">
                <img src="img/5step.png">
                TIME PERIOD
            </h2>

            <div id="timeSelect">
                <select id="timeYearSelect"></select>&nbsp;&nbsp;&nbsp;
                <select id="timeMonthSelect"></select>
            </div>
        </div>

        <div class="noticeLSCE leftMenu">
            Realised by <span title="Climate and Environment Sciences Laboratory" style="font-weight:bold;">LSCE</span> &nbsp;&nbsp;&nbsp; v1.2
        </div>

    </div>

    <div id="hideOrShowLeftMenu">
        <div class="hideOrShowLeftMenu"><img src="img/grabber.png"/></div>
    </div>

    <div id="printable"></div>


    <div id="rightMenu" class="non-printable">
        <div class="rightMenuTitle">&nbsp;&nbsp;TOOLS</div>

        <div class="rightMenuTool">
            Number of maps column<br>
            <select id="mapsNumberSelect" style="width: 60px;">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>

        <div class="rightMenuTool">
            <div class="rightMenuButtons">
                <div id="submitDeleteMaps" class="rightMenuButton" title="Remove all maps">
                    <div class="lonelyToolIcone"><img src="img/fileclose.png"/></div>
                </div>
                <div id="submitShowAllLegends" class="rightMenuButton" title="Show all legends">
                    <div class="lonelyToolIcone"><img src="img/legend_display_all.png"/></div>
                </div>
                <div id="submitHideAllLegends" class="rightMenuButton" title="Hide all legends">
                    <div class="lonelyToolIcone"><img src="img/legend_hide_all.png"/></div>
                </div>
            </div>
        </div>

        <div class="rightMenuTool">
            <HR width="50%" class="rightMenuHR"/>
        </div>

        <div class="rightMenuTool">
            <h2>RANGE</h2>

            <div class="rightMenuSubTool">
                <input id="getRange" type="button" title="Get range from variable" value="Get range"/>
                <input type="text" id="slider-range-text" size="9" style="width: 80%; text-align: center;"/>
            </div>
            <div id="slider-range" style="width: 80%;"></div>
        </div>

        <div class="rightMenuTool">
            <HR width="50%" class="rightMenuHR"/>
        </div>

        <div class="rightMenuTool">
            <h2>PALETTES</h2>
            <select id="paletteSelect" style="width: 80%;">
                <option value="alg">alg</option>
                <option value="alg2">alg2</option>
                <option value="blue_yellow_red">blue_yellow_red</option>
                <option value="ferret">ferret</option>
                <option value="greyscale">greyscale</option>
                <option value="ncview">ncview</option>
                <option value="occam">occam</option>
                <option value="occam_pastel-30">occam_pastel-30</option>
                <option value="redblue">redblue</option>
                <option value="sst_36">sst_36</option>
                <option value="green_magenta">green_magenta</option>
            </select>
        </div>

        <div class="rightMenuTool">&nbsp;
            <HR width="50%" class="rightMenuHR"/>
        </div>

        <div class="rightMenuTool">
            <h2>LEGEND</h2>

            <div class="rightMenuSubTool">
                Colors number : <span id="slider-nbcolorbands-text"/>
            </div>
            <div id="slider-nbcolorbands"></div>
            <BR/><BR/>

            <div id="legend"></div>
        </div>
    </div>

    <div id="hideOrShowRightMenu">
        <div class="rightMenuBubble"><img src="img/bubbleBlack_left_X.png"/></div>
    </div>

</div>


<script type="text/javascript">
    $( document ).ready( function ()
    {
        // Load properties file
        jQuery.i18n.properties( {
            name:'bobcat',
            path:'',
            language:null,
            mode:'both'
        } );

        var resourcesTreeData = [];
        var resourceList = JSON.parse( jQuery.i18n.prop( "resourceList" ) );
        var resourceValuesList = JSON.parse( jQuery.i18n.prop( "resourceValuesList" ) );
        var selectedResourceList = JSON.parse( jQuery.i18n.prop( "selectedResourceList" ) );
        var resourcePathList = JSON.parse( jQuery.i18n.prop( "resourcePathList" ) );

        addResource( 0 );


        function addElementToTree( element, elementChildren )
        {
            element.children = elementChildren;
            resourcesTreeData.push( element );
            i++;
            if( i >= resourceList.length )
            // The variable regionsTreeData comes from the file regions_categories.js
                new BCInterfaceW( resourcesTreeData );
            else
                addResource( i );
        }

        function getParameterValue( key, content )
        {
            var values = content.split( key + ":" );
            if( !values || !values[1] )
                return "";
            return  "complexToolTip" == key ? values[1] : values[1].split( ',' )[0];
        }

        function addResource( i )
        {
            var element = new Object();
            element.title = resourceList[i];
            element.folder = true;
            element.expanded = selectedResourceList[i] ? "false" != selectedResourceList[i] : false;

            var resourcePath = jQuery.i18n.prop( resourcePathList[i] );

            if( resourcePathList[i] && resourceList[i] && resourceValuesList[i] && (selectedResourceList[i] || "boolean" === jQuery.type( selectedResourceList[i] )) && jQuery.i18n.prop( resourcePathList[i] ) )
                $.ajax( {
                    url: "fancyTreeBuildChildren.php",
                    method: "post",
                    dataType: "json",
                    data: {dirtoread: jQuery.i18n.prop( resourcePathList[i] ) , category : resourceValuesList[i] , elementToSelect : selectedResourceList[i]},
                    error: function( arguments )
                    {
                        // WARNING : JSON.parse is not possible because of some space text in .info --> element.children = JSON.parse( data ); is not working !
                        var childrenData = arguments.responseText.replace( "[", "" ).replace( "],", "" ).replace( /{/g, "" ).replace( /"/g, '' ).replace( /""/g, '' ).split( "}," );
                        var children = [];
                        $.each( childrenData, function( i, d )
                        {
                            var elementChildren = new Object();
                            elementChildren.title = getParameterValue( "title", d );
                            elementChildren.key = getParameterValue( "key", d );
                            elementChildren.selected = getParameterValue( "selected", d );
                            elementChildren.icon = getParameterValue( "icon", d );
                            elementChildren.url = getParameterValue( "url", d );
                            elementChildren.complexToolTip = getParameterValue( "complexToolTip", d );
                            children.push( elementChildren );
                        } );

                        addElementToTree( element, children );
                    },
                    success: function( data )
                    {
                        addElementToTree( element, data );
                    }
                } );
            else
            {
                i++;
                if( i >= resourceList.length )
                // The variable regionsTreeData comes from the file regions_categories.js
                    new BCInterfaceW( resourcesTreeData );
                else
                    addResource( i );
            }
        }

    } );
</script>

