<html xmlns=http://www.w3.org/1999/xhtml">

<head>
		<meta content="text/html; charset=UTF-8">
		<link rel="stylesheet" href="formAndMetadataRepresentation/css/metadataAccess.css"/>
</head>


<body>


<!-- To make dynamic calls : -->
<?php
		$filePath = $_POST["filePath"];
		$fileName = $_POST["fileName"];
		$fileURL = $filePath.$fileName;
?>

<script type="text/javascript">
		function clickButonFeedback() {
				window.open("https://geoviqua.stcorp.nl/submit_feedback.html?target_code=<?php echo $fileName; ?>&target_codespace=<?php echo $filePath."/"; ?>");
		}

		function clickButonSeeCompleteMetadat() {
				window.open("<?php echo $fileURL; ?>");
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

		<img id="loaderGeoLabelObject" class="loader" src="formAndMetadataRepresentation/img/loading_transparent_4.gif"
				 width="50px" height="50px"/>

		<object id="geoLabelObject" class="geoLabelClass"
						data="http://www.geolabel.net/api/v1/geolabel?metadata=<?php echo $fileURL; ?>&feedback=http://geoviqua.stcorp.nl/api/v1/feedback/collections%3Ftarget_code%3D<?php echo $fileName; ?>%26target_codespace%3D<?php echo $filePath."/"; ?>%26format%3Dxml&size=50"
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

