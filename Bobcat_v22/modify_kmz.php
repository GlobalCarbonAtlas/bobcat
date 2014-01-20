<?php

//=======================================================
// Modify the kmz created by ncWMS by adding a folder with land and ocean masks.
// The kmz file is a zip file containing an index and embeded png files.
// Strategy: get the kml index, write in a tempory file, modify it by removing last </Folder><kml>
// and replacing by masks prepared as an aditionnal kml folder.

//=======================================================
// Temporary file
$tmpfname = tempnam(sys_get_temp_dir(), 'GCA_kmz_');

//=======================================================
// Write the kmz produced by ncWMS (from call ressource such as
// http://webportals.ipsl.jussieu.fr/thredds/wms?DATASET=http://webportals.ipsl.jussieu.fr/thredds/dodsC/ATLAS/Flux/Inversions/latest/fco2.ccam_c13_rachel.1992-2008.mask11.Fev2012.nc&VERSION=1.1.1&LAYERS=poste_oce&ELEVATION=false&TIME=1992-05-16T00%3A00%3A00.000Z&NUMCOLORBANDS=30&STYLES=boxfill%2Foccam_pastel-30&COLORSCALERANGE=-160%2C130&ABOVEMAXCOLOR=extend&BELOWMINCOLOR=extend&FORMAT=application%2Fvnd.google-earth.kmz&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=-180%2C-90%2C180%2C90&TRANSPARENT=true&WIDTH=500&HEIGHT=500

$tmp = fopen($tmpfname, "w");
fwrite($tmp, file_get_contents($_GET["resource"]));
fclose();

//=======================================================
// Add the corresponding mask following the visible layer
// mask_land.png and mask_ocean.png get from 
// wget -O mask_land.png 'http://webportals.ipsl.jussieu.fr:8080/geoserver/couches_overlays_info/wms?VERSION=1.1.1&LAYERS=couches_overlays_info%3AGCA_landMask&TRANSPARENT=TRUE&FORMAT=image%2Fpng&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=-180,-90,180,90&WIDTH=1000&HEIGHT=1000'
// wget -O mask_ocean.png 'http://webportals.ipsl.jussieu.fr:8080/geoserver/couches_overlays_info/wms?VERSION=1.1.1&LAYERS=couches_overlays_info%3AGCA_oceanMask&TRANSPARENT=TRUE&FORMAT=image%2Fpng&SERVICE=WMS&REQUEST=GetMap&SRS=EPSG%3A4326&BBOX=-180,-90,180,90&WIDTH=1000&HEIGHT=1000'

switch ($_GET["mask"]) {
	case "land":
		$mask_name = "Land mask";
		$mask_file = "img/mask_land.png";
		$mask_toAdd = True;
		break;
	case "ocean":
		$mask_name = "Ocean mask";
		$mask_file = "img/mask_ocean.png";
		$mask_toAdd = True;
		break;
	default:
		$mask_name = "none";
		$mask_file = "none";
		$mask_toAdd = False;
}

// The kml folder for mask
$kml_mask = '
     <GroundOverlay>
              <name>'.$mask_name.'</name>
              <drawOrder>1</drawOrder>
              <Icon>
                      <href>'.$mask_file.'</href>
              </Icon>
              <LatLonBox>
                      <north>90</north>
                      <south>-90</south>
                      <east>180</east>
                      <west>-180</west>
              </LatLonBox>
      </GroundOverlay>';

//=======================================================
// The logo to add
$kml_logo = '
      <ScreenOverlay>
              <name>Color scale background</name>
              <Icon><href>img/legend_bg.png</href></Icon>
              <overlayXY x="0" y="1" xunits="fraction" yunits="fraction"/>
              <screenXY x="0" y="1" xunits="fraction" yunits="fraction"/>
              <rotationXY x="0" y="0" xunits="fraction" yunits="fraction"/>
              <size x="0" y="0" xunits="fraction" yunits="fraction"/>
              <drawOrder>-1</drawOrder>
      </ScreenOverlay>
      <ScreenOverlay>
              <name>Global Carbon Atlas logo</name>
              <Icon><href>GCA_logo.png</href></Icon>
              <overlayXY x="0" y="0" xunits="fraction" yunits="fraction"/>
              <screenXY x="0.01" y="0.02" xunits="fraction" yunits="fraction"/>
              <rotationXY x="0" y="0" xunits="fraction" yunits="fraction"/>
              <size x="0" y="0" xunits="fraction" yunits="fraction"/>
      </ScreenOverlay>
   </Folder>;
</kml>';

//=======================================================
// Handle the kmz
$zip = new ZipArchive;
if ($zip->open($tmpfname)) {
 
    // get index and change its content and name, write it back
    $nameindex = $zip->getNameIndex(0); 
    $kml_init = $zip->getFromName($nameindex);

    if ($mask_toAdd) {
        // add kml folder with mask and logo 
    	$kml_new = str_replace('</Folder></kml>', $kml_mask.$kml_logo, $kml_init);
        // add mask file
        $zip->addFile($mask_file);
    } else {
        // add kml folder only with logo
    	$kml_new = str_replace('</Folder></kml>', $kml_logo, $kml_init);
    }

    $zip->deleteName($nameindex);
    $zip->addFromString("GlobalCarbonAtlas.kml", $kml_new);

    // add logo file
    $zip->addFile('img/legend_bg.png');
    $zip->addFile('GCA_logo.png');
    $zip->close();

    // http headers
    header("Content-type: application/vnd.google-earth.kmz+xml");
    //Content-Disposition header is used to supply a recommended filename and force the browser to display the save dialog box.
    header("Content-Disposition: attachment; filename=GlobalCarbonAtlas_".$_GET["fileTitle"].".kmz");
    echo file_get_contents($tmpfname);

    // remove temporary file
    unlink($tmpfname);

} 

//=======================================================

?>
