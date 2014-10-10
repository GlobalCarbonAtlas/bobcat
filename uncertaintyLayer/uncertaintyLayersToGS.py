#!/usr/bin/python
# -*- coding: latin-1 -*-

###############################################################################################################################################################################################################################
##################### THIS FILE USE THE .SHP FILES CREATED BY THE AUTOMATISATION SCRIPT TO PASS THESE .SHP FILES TO GEOSERVER AND TO ASSOCIATE TEH GOOD STYLE (MASKING OR STIPPLING) ##########################################
###############################################################################################################################################################################################################################

import os # CF chp 7.1 python Universite de Pau.
import sys # = To access to python fonctions and objects
#Lecture et exploitation netCDF + possibility to do subprocess command:
from cdo import *
# For layer integration in GS.
from geoserver.catalog import Catalog
import geoserver.util
      
# Global variables setting:
modeleType = 'Land' #TODO : recuperer dynamiquement (CF ReadMe part 2).
modeleName = 'MEAN'
varName = "Terrestrial_flux" #TODO : mettre aussi Ocean_flux : comment extraire nom variable pour le choisir f(file) ?
averagingPeriod = 'LT'
timePeriod = 'lt'      
commonPathName = "/home/pascal/workSpace/bobcat25_08_14/uncertaintyLayer/layers/layersForPythonScript/GCA_MapUncertaintyFiles/" #TODO : Adapter les chemins dynamiquement : cf chap 7 Python Uni de Pau.
binaryFileNameVector = modeleType +'_'+ modeleName +'_'+ varName +'_'+ averagingPeriod + '_' + timePeriod #TODO : remplacer par nom du bon fichier : a faire ds la cas du long term pour ocean, land et inversion model.  
      
# Workspace creation: necessary to import layer in GS: CF layerUncertaintyReadMe2.
try:
    subprocess.call('curl -u admin:geoserver -v -XPOST -H "Content-type: text/xml" -d "<workspace><name>GCAUncertainty</name></workspace>" http://localhost:8080/geoserver/rest/workspaces', shell= True)
except OSError: #Important parce que si non, a la deuxieme fois, qd existe, erreur.
    pass

#Workspace variable definition:
cat = Catalog("http://localhost:8080/geoserver/rest", "admin", "geoserver")# Connection to GS.
workspace = cat.get_workspace("GCAUncertainty")

# Bucle to pass all layers to GS:
thresholdComponentName = ["_05stdDev", "_1stdDev", "_15stdDev", "_2stdDev", "_25stdDev","_3stdDev"]# Noms fichiers .shp de sortie doivent tenir compte threshold. Note : ne pas mettre de points, problème pour appels / curl et API rest.

#iOutShapefileS = list(len(thresholdComponentName))
nThreshold = len(thresholdComponentName)
nThresholdS = list(range(nThreshold))

for nThreshold in  nThresholdS :
# Var def :
    outShapefileMasking = commonPathName + binaryFileNameVector + "_mk" + thresholdComponentName[nThreshold] + '_fco2'
    outShapefileStippling = commonPathName + binaryFileNameVector + "_st" + thresholdComponentName[nThreshold] + '_fco2'
    
# We need to create .prj file (epsg4326) because not present.
    prjFileMasking = open(outShapefileMasking +'.prj', 'w' )
    prjFileStippling = open(outShapefileStippling +'.prj', 'w' )
    prjFileMasking.write('GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.017453292519943295]]')
    prjFileStippling.write('GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.017453292519943295]]')
    prjFileMasking.close()
    prjFileStippling.close()
    
# Retrieve .shp layers from folder :
    shapefileMasking = geoserver.util.shapefile_and_friends(outShapefileMasking)# Ne doit pas intÃ©grer extensions des fichiers vect arcGis. la fonction shapefile_and_friends() permet justement de parcourir les chemins jusqu'Ã  arriver Ã  nom de ts les elements (.prj, .dbf, ...) composant la couche shape.
    shapefileStippling = geoserver.util.shapefile_and_friends(outShapefileStippling)
    
#Keep layers in GS:
    dataStoreAndLayersNamesMk = binaryFileNameVector + "_mk" + thresholdComponentName[nThreshold] + '_fco2'
    dataStoreAndLayersNamesSt = binaryFileNameVector + "_st" + thresholdComponentName[nThreshold] + '_fco2'
    
    ftMasking = cat.create_featurestore(dataStoreAndLayersNamesMk, shapefileMasking, workspace)# Data stores and layers names (must be unique for each layer), url to shp files , workspace.
    ftStippling = cat.create_featurestore(dataStoreAndLayersNamesSt, shapefileStippling, workspace)
    
# Create a style for each layer: CF geoserver.geo-solutions.it/edu/en/rest/using_rest.html et http://gis.stackexchange.com/questions/75207/layer-sets-not-enabled-after-change-style-via-rest
    try:   
        subprocess.call('curl -v -u admin:geoserver -XPUT -H "Content-type: text/xml" -d "<layer><defaultStyle><name>GCA_uncertainty_maskingOverlay</name></defaultStyle><enabled>true</enabled></layer>" http://localhost:8080/geoserver/rest/layers/GCAUncertainty:'+ dataStoreAndLayersNamesMk, shell=True)# Apply style for masking layers.
        subprocess.call('curl -v -u admin:geoserver -XPUT -H "Content-type: text/xml" -d "<layer><defaultStyle><name>GCA_uncertainty_stipplingOverlay</name></defaultStyle><enabled>true</enabled></layer>" http://localhost:8080/geoserver/rest/layers/GCAUncertainty:'+ dataStoreAndLayersNamesSt, shell=True)# Apply style for stippling layers.       
    except OSError:
        pass


print('C est fini !')
