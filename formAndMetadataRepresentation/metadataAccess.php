<html xmlns=http://www.w3.org/1999/xhtml">

<head>
    <meta content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="formAndMetadataRepresentation/css/metadataAccess.css"/>
</head>


<body>


<!--http://www.geolabel.net/api/v1/geolabel?metadata=http://localhost/bobcat/formAndMetadataRepresentation/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml&feedback=http://geoviqua.stcorp.nl/api/v1/feedback/collections%3Ftarget_code%3DCO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml%26target_codespace%3Dhttp://localhost/bobcat/formAndMetadataRepresentation/xmlDoneByForm/%26format%3Dxml&size=50-->

<!--http://www.geolabel.net/api/v1/geolabel?metadata=http://webportals.ipsl.jussieu.fr/ScientificApps/rc/bobcat/v06_forkPascal/bobcat/formAndMetadataRepresentation/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml&feedback=http://geoviqua.stcorp.nl/api/v1/feedback/collections%3Ftarget_code%3DCO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml%26target_codespace%3Dhttp://localhost/bobcat/formAndMetadataRepresentation/xmlDoneByForm/%26format%3Dxml&size=50-->
<!--http://www.geolabel.net/api/v1/geolabel?metadata=http://webportals.ipsl.jussieu.fr/ScientificApps/rc/bobcat/v06_forkPascal/bobcat/formAndMetadataRepresentation/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml&feedback=http://geoviqua.stcorp.nl/api/v1/feedback/collections%3Ftarget_code%3DCO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml%26target_codespace%3Dhttp://webportals.ipsl.jussieu.fr/ScientificApps/rc/bobcat/v06_forkPascal/bobcat/formAndMetadataRepresentation/xmlDoneByForm/%26format%3Dxml&size=50-->


<!-- To make dynamic calls : -->
<?php
    $url = $_SERVER["SERVER_NAME"] . $_SERVER["SCRIPT_NAME"];
    $pathInfoUrl = pathinfo($url);// Array
    $dirName = $pathInfoUrl["dirname"];//Path without file name.
    $completeUrl = "http://" . $dirName;
?>

<script type="text/javascript">
    function clickButonFeedback() {
        window.open("https://geoviqua.stcorp.nl/submit_feedback.html?target_code=CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml&target_codespace=<?php echo $completeUrl . "/xmlDoneByForm/"; ?>");
    }

    function clickButonSeeCompleteMetadat() {
        window.open("<?php echo $completeUrl . "/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml"; ?>");
    }

    $(function() {
        $(".feedbackButtonClass").button({label: "Add feedback"});
        $(".seeCompleteMetadatButtonClass").button({label: "View all metada"});
        $(".feedbackButtonClass").click(function() {
            clickButonFeedback();
        });
        $(".seeCompleteMetadatButtonClass").click(function() {
            clickButonSeeCompleteMetadat();
        });
        $(".feedbackButtonClass").mouseover(function() {
            $(".feedbackButtonClass").removeClass("ui-state-hover");
        });
        $(".seeCompleteMetadatButtonClass").mouseover(function() {
            $(".seeCompleteMetadatButtonClass").removeClass("ui-state-hover");
        });
    });

    $.waitUntil = function (delegate, action, timeOutObj) {
        function _waitUntil(params) {
            $.waitUntil(params.condition, params.action, params.timeOutObj);
        }

        if (delegate.apply())
            action.apply();
        else {
            if (null != timeOutObj)
                clearTimeout(timeOutObj);
            var param = { condition: delegate, action: action };
            param.timeOutObj = setTimeout(_waitUntil, 100, param);
        }
    };

    $.waitUntil(
            function() {
                return 200 == $("#geoLabelObject").width();
            },
            function() {
                $("#loaderGeoLabelObject").hide();
            },
            null);

</script>

<div id="metadataGVQContainer">
    <div id="syntheticInfoText" class="cursorPointer" title="Tip: no color= none or incomplete information"><h4>View
        metadata per category and feedback information:</h4></div>

    <!--    http://www.geolabel.net/api/v1/geolabel?metadata=-->
    <?php //echo $completeUrl . "/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml"; ?><!--&feedback=http://geoviqua.stcorp.nl/api/v1/feedback/collections%3Ftarget_code%3DCO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml%26target_codespace%3D-->
    <?php //echo $completeUrl . "/xmlDoneByForm"; ?><!--/%26format%3Dxml&size=50-->
    <!--            data="http://www.geolabel.net/api/v1/geolabel?metadata=-->
    <?php //echo $completeUrl . "/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml"; ?><!--&feedback=http://geoviqua.stcorp.nl/api/v1/feedback/collections%3Ftarget_code%3DCO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml%26target_codespace%3D-->
    <?php //echo $completeUrl . "/xmlDoneByForm"; ?><!--/%26format%3Dxml&size=50"-->

    <img id="loaderGeoLabelObject" class="loader" src="formAndMetadataRepresentation/img/loading_transparent_4.gif"
         width="50px" height="50px"/>

    <object id="geoLabelObject" class="geoLabelClass"
            data="http://www.geolabel.net/api/v1/geolabel?metadata=http://webportals.ipsl.jussieu.fr/ScientificApps/rc/bobcat/v06_forkPascal/bobcat/formAndMetadataRepresentation/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml&feedback=http://geoviqua.stcorp.nl/api/v1/feedback/collections%3Ftarget_code%3DCO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml%26target_codespace%3Dhttp://webportals.ipsl.jussieu.fr/ScientificApps/rc/bobcat/v06_forkPascal/bobcat/formAndMetadataRepresentation/xmlDoneByForm/%26format%3Dxml&size=50"
            type="image/svg+xml" height="180"></object>

    <div id="geoLabelLink">The "GeoLabel" has been created by the <a href="http://www.geoviqua.org/" TARGET="_new"
                                                                     title="">GeoViQua
        project</a> for GEOSS
    </div>

    <div class="feedbackButtonClass" title="Press here to enter your feedback about this file"></div>
    <div class="seeCompleteMetadatButtonClass"
         title="Press here to access to complete metadata information about this file"></div>

</div>


</body>
</html>

