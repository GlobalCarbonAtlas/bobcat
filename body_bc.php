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

            <select id="periodSelect">
                <option value="monthlymean">Monthly mean</option>
                <option value="yearlymean">Yearly mean</option>
                <option value="longterm">Long term mean</option>
            </select>
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

<!--Pascal part : -->
        <!-- Add way to choose uncertainty : -->
        <div id= "uncertaintyLeft" class="leftMenu">
            <h2 title="Visualize uncertainty information displaying std dev layer or overlaying std dev information above the layer">
                 <img src="img/6step.png">
                  UNCERTAINTY
            </h2>
            <div id= "uncertaintySelectLeft">
                <input id= "displayStdDevLeft" class= "uncertaintySelectElementClass" type= "checkbox" name= "displayOrOverlayUncertainty">
                <label class= "uncertaintySelectLabelClass" for= "displayStdDevLeft">
                    <span class= "variable">Display st dev</span>
                </label>
                <br>
                <input id= "displayOverlayStdDevLeft"  class= "uncertaintySelectElementClass" type= "checkbox" name= "displayOrOverlayUncertainty">
                <label  class= "uncertaintySelectLabelClass" for= "displayOverlayStdDevLeft">
                    <span id= "uncertaintySelectElementTextLeft" class= "variable" title= "Explain what is done with this option">Overlay st dev</span>
                </label>
                <br>
            </div>

        <!-- LEFT MENU : pour appliquer individuellement a chq carte : --> 
            <div id= "overlayStdDevCaseLeft">
                 <div id= "uncertaintyWithMaskingLeft">
                  <input id= "uncertaintyWithMaskingInputLeft" type= "radio" name= "displayOverlayUncertaintyModeLeft" checked= "checked">
                  <label for= "uncertaintyWithMaskingLeft">
                    <span class="variable2">Mask areas > threshold</span>
                  </label>
                 </div>
                 <br>
                 <div id= "uncertaintyWithStipplingLeft">
                  <input id= "uncertaintyWithStipplingInputLeft" type= "radio" name= "displayOverlayUncertaintyModeLeft">
                  <label  for= "uncertaintyWithStipplingInputLeft">
                    <span class="variable2">Stipple areas <  threshold</span>
                  </label>
                 </div>
                 <br>
                <!-- Slider part: -->
                    <!-- Way to do it: put in an input element value's slider. To describe input, label associated.-->
               <div id= "uncertaintySliderLabelDivLeft">
                <label id= "uncertaintySliderLabelLeft" for= "uncertaintySliderValueInput" title= "Choose uncertainty threshold between 0.5 std dev mean (# mean), 1 std dev mean, 1.5 std dev mean and 2 std dev mean">St dev threshold: </label>
                <input id= "uncertaintySliderValueInputLeft" type= "text" readonly>
                <div id= "uncertaintyLevelSliderLeft">
                <!-- End slider part: -->
                </div>
               </div>
            </div>
        </div>

       <script text="text/javascript">
        // LEFT MENU :
                $("#overlayStdDevCaseLeft").hide();
                $("#displayOverlayStdDevLeft").change(
                    function(){
                        if ($(this).is(':checked')) {
                            $("#overlayStdDevCaseLeft").show();
                        }
                        else
                            $("#overlayStdDevCaseLeft").hide();
                 });

                // Slider uncertainty (st dev) threshold part:
                 $(function() {
                    //var tt = σ;
                    var valueArray= ["0.5 σ", "1 σ", "1.5 σ", "2 σ", "2.5 σ", "3 σ"];// --> To write σ symbols, use this method in js (be in utf8). For html, we could use  <?php echo('&#931'); ?> (cf http://www.webstandards.org/learn/reference/charts/entities/symbol_entities/)
                    $( "#uncertaintyLevelSliderLeft" ).slider({
                        value: 1,
                        min: 0,
                        max: 5,
                        step: 1,
                        slide: function(event, ui) {
                            $("#uncertaintySliderValueInputLeft").val(valueArray[ui.value]);// If we want to put in input different value (my case): relation with slider's values done by index array. 
                        }
                    });
                    $("#uncertaintySliderValueInputLeft").val(valueArray[1]);// --> Set default value f(array's values).
                 });

            </script>
<!-- End Pascal part -->        

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

 <!-- Pascal part : -->
  <!-- RIGHT MENU : la partie .js est ds ce cas la dans BCInterface.js --> 
        <div id= "overlayStdDevCase" class= "rightMenuTool">
            <div class="rightMenuTool">&nbsp;
                <HR width="50%" class="rightMenuHR"/>
            </div>
            <h2>UNCERTAINTY</h2>

                 <div id= "uncertaintyWithMasking">
                  <input id= "uncertaintyWithMaskingInput" class= "uncertaintyRepresentationRightMenuClass" type= "radio" name= "displayOverlayUncertaintyMode">
                  <label for= "uncertaintyWithMasking">
                    <span class="variable2">Mask areas > threshold</span>
                  </label>
                 </div>
                 <br>
                 <div id= "uncertaintyWithStippling">
                  <input id= "uncertaintyWithStipplingInput" class= "uncertaintyRepresentationRightMenuClass" type= "radio" name= "displayOverlayUncertaintyMode">
                  <label  for= "uncertaintyWithStipplingInput">
                    <span class="variable2">Stipple areas <  threshold</span>
                  </label>
                 </div>
                 <br>
                <!-- Slider part: -->
                    <!-- Way to do it: put in an input element value's slider. To describe input, label associated.-->
                <label id= "uncertaintySliderLabel" for= "uncertaintySliderValueInput" title= "Choose uncertainty threshold between 0.5 std dev mean (# mean), 1 std dev mean, 1.5 std dev mean and 2 std dev mean">St dev threshold: </label>
                <input id= "uncertaintySliderValueInput" type= "text" readonly>
                <div id= "uncertaintyLevelSlider">
                <!-- End slider part: -->
                </div>
        </div>

 <script type="text/javascript">
 // RIGHT MENU :
 $("#overlayStdDevCase").hide();
                $("#displayOverlayStdDevLeft").change(// Bouton de gauche active ou desactive donc les 2 menus Uncertainty (gauche et droite).
                    function(){
                        if ($(this).is(':checked')) {
                            $("#overlayStdDevCase").show();
                        }
                        //else
                            $("#overlayStdDevCase").hide();
                 });
</script>
 <!--End Pascal part : -->
       
          </div>

    <div id="hideOrShowRightMenu">
        <div class="rightMenuBubble"><img src="img/bubbleBlack_left_X.png"/></div>
    </div>

</div>

<?php

$properties = parse_ini_file( "bobcat.properties" );

function fancytree_build_children( $dirtoread, $category, $elementToSelect )
{
    $files = glob( $dirtoread . "*.nc" );
    $len = count( $files );
    $counter = 0;
    echo "\n";
    foreach( $files as $file )
    {
        if( is_file( $file ) )
        {
            $counter++;
            $bfile = basename( $file );
            $pfile = explode( "_", $bfile );
            // $pfile[1] represent the title, character "-" replaced by " "
            $sfile = implode( "_", array_slice( $pfile, 0, 4 ) );
            $fileInfo = explode( '.nc', $file );
            $fileInfo = $fileInfo[0] . '.info';
            if( file_exists( $fileInfo ) )
            {
                $fileInfoContent = file_get_contents( $fileInfo );
                $fileInfoContent = str_replace( "\n", "<br>", $fileInfoContent );
                $fileInfoContent = str_replace( "Ref :", "<b>Ref :</b>", $fileInfoContent );
                $fileInfoContent = str_replace( "Contact :", "<b>Contact :</b>", $fileInfoContent );
            }
            else
                $fileInfoContent = "Not available";
            // If first element to be selected use next line and set true for elementToSelect argument
            //$selectedElement = $elementToSelect && ($counter == 1) ? true : false;
            // To select a specific element
            $selectedElement = $elementToSelect && strpos( $sfile, $elementToSelect ) ? true : false;
            echo '                    {title:"' . str_replace( "-", " ", $pfile[1] ) . '", key:"' . $sfile . '", selected: "' . $selectedElement . '", icon:false, url:"' . $category . '", complexToolTip:"' . $fileInfoContent . '",}';
            if( $counter != $len )
            {
                echo ',' . "\n";
            }
            else
            {
                // last line without ,
                echo "\n";
            }
        }
    }
    echo "\n";

}

?>

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

        var resourcesTreeData = [
            {title:"Inversions", folder:true, expanded: false,
                children: [
<?php
                    fancytree_build_children( $properties["inversionsResourcesPath"], "Inversions", $properties["selectedInversions"] );
                ?>
                ]
            },
            {title:"Land Models", folder:true, expanded: true,
                children: [
<?php
                    fancytree_build_children( $properties["landModelsResourcesPath"], "LandModels", $properties["selectedLandModels"] );
                ?>
                ]
            },
            {title:"Ocean Models", folder:true, expanded: false,
                children: [
<?php
                    fancytree_build_children( $properties["oceanModelsResourcesPath"], "OceanModels", $properties["selectedOceanModels"] );
                ?>
                ]
            }
        ];

        $( "#projectionSelect" ).select2();
        $( "#projectionSelect" ).select2( "val", "EPSG:4087" );

        $( "#periodSelect" ).select2();
        $( "#periodSelect" ).select2( "val", "monthlymean" );

        $( "#mapsNumberSelect" ).select2();
        $( "#mapsNumberSelect" ).select2( "val", "2" );

        $( "#paletteSelect" ).select2();

        function format( pal )
        {
            return "<img class='flag' src='palettes/" + pal.text + ".png'/></br>" + pal.text;
        }

        $( "#paletteSelect" ).select2( {
            formatResult: format
        } );
        $( "#paletteSelect" ).select2( "val", "blue_yellow_red" );

        var variablesToKeepArray = JSON.parse( jQuery.i18n.prop( "variablesToKeepArray" ) );
        var variableNamesToKeepArray = JSON.parse( jQuery.i18n.prop( "variableNamesToKeepArray" ) );
        new BCInterfaceW( resourcesTreeData, variablesToKeepArray, variableNamesToKeepArray );

    } );
</script>

