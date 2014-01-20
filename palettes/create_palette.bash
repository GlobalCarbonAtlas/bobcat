#!/bin/bash


palettes=( alg alg2 blue_yellow_red ferret greyscale ncview occam occam_pastel-30 redblue sst_36 green_magenta )

for pal in "${palettes[@]}" ; do 

	echo $pal
	wget "http://research.globalcarbonatlas.org/thredds/wms/Atlas/Flux/Inversions/monthlymean/fco2_MACC-V2_Sep2013-ext3_1980-2011_monthlymean_XYT.nc?LAYER=Ocean_flux&NUMCOLORBANDS=90&COLORSCALERANGE=-50%2C50&REQUEST=GetLegendGraphic&COLORBARONLY=true&WIDTH=10&HEIGHT=40&PALETTE=$pal" -O tmp_$$.png
	convert -rotate 90 tmp_$$.png $pal.png
	rm -rf tmp_$$.png

done

