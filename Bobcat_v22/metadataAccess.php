<html xmlns= http://www.w3.org/1999/xhtml">

<head>
        <meta charset="utf-8"></meta>
	 <link rel="stylesheet" href="css/metadataAccess.css"/>
</head>

<body>

<script type="text/javascript">
             var ip = location.host;// To have dynamic call/server.
             var completeUrlToMetadataXmlFolder= "http://"+ip+"/bobcat/formAndMetadataRepresentation/xmlDoneByForm"
             var completeUrlToMetadataXml= "http://"+ip+"/bobcat/formAndMetadataRepresentation/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml"

                function clickButonFeedback() {
			        window.open("https://geoviqua.stcorp.nl/submit_feedback.html?target_code=customType-Inversion_model-SuperTitle-3.2.xml&target_codespace=http://"+ip+"/bobcat/formAndMetadatRepresentation/xmlDoneByForm/");
                }
                function clickButonSeeCompleteMetadat() {
                	window.open(completeUrlToMetadataXml);
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
            </script>

  <?php
    $ip = $_SERVER["SERVER_NAME"];
    $completeUrlToMetadataXmlFolder = "http://".$ip."/bobcat/formAndMetadataRepresentation/xmlDoneByForm";
    $completeUrlToMetadataXml = "http://".$ip."/bobcat/formAndMetadataRepresentation/xmlDoneByForm/CO2-flux_Inversion-model_lsce-inversion-analytic_v1_2014-07-02T23_09_03.741Z.xml";
  ?>

<div id= "metadataGVQContainer">
            <div id= "syntheticInfoText" class= "cursorPointer" title= "Tip: no color= none or incomplete information"><h4>View metadata per category and feedback information:</h4></div>
		<object id= "geoLabelObject" class= "geoLabelClass" data="http://www.geolabel.net/api/v1/geolabel?metadata=<?php echo $completeUrlToMetadataXml; ?>&feedback=http://geoviqua.stcorp.nl/api/v1/feedback/collections%3Ftarget_code%3DcustomType-Inversion_model-SuperTitle-3.2.xml%26target_codespace%3D"+ completeUrlToMetadataXmlFolder +"/%26format%3Dxml&size=50" type="image/svg+xml" width="200" height="200"></object>
	   <div id= "geoLabelLink">The "GeoLabel" has been created by the <a href= "http://www.geoviqua.org/" TARGET= "_new" title= "">GeoViQua project</a> for GEOSS</div>

                <div class= "feedbackButtonClass" title= "Press here to enter your feedback about this file"></div>
                <div class= "seeCompleteMetadatButtonClass" title= "Press here to access to complete metadata information about this file"></div>

</div>


</body>
</html>

