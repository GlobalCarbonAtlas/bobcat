#!/usr/bin/python
# -*- coding: latin-1 -*-


# Import QGis library: 
  #Pour comprendre Import en python : sametmax.com/les-imports-en-python
from qgis.core import *
#On peut rajouter :
from qgis.gui import *
import os # CF chp 7.1 python Universite de Pau.
import sys # = To access to python fonctions and objects
from PyQt4.QtCore import * # CF hub.qgis.org/issues/8707
#from osgeo import ogr# Ces 2 la ne vont pas.
#from osgeo import gdals
#import numpy as np# Pas la peine, script py importe numpy par defaut.
#Lecture et exploitation netCDF :
from cdo import *
cdo = Cdo()# --> Librairie cdo/python.
from osgeo import gdal, osr, ogr
from gdalconst import *  

# For layer integration in GS.
from geoserver.catalog import Catalog
import geoserver.util

# supply path to where is your qgis installed
#Generalement, pour savoir paths : CF p103 pdf "The PyQGis Programmer"
QgsApplication.setPrefixPath("/usr", True)#To know how to set the good Prefix Path : creating qgis layers in python console vs stand alone application
# QGis initialisation
QgsApplication.initQgis()
#NOW WE CAN DO STUFF!!!

#Set parameters to call a specific layer f(user choices):
folderWithNetCdfFiles = "/home/pascal/workSpace/bobcat25_08_14/uncertaintyLayer/layers/layersForPythonScript/"
modeleType = 'Land' #TODO : recuperer dynamiquement (CF ReadMe part 2).
modeleName = 'MEAN'
varName = "Terrestrial_flux" #TODO : mettre aussi Ocean_flux : comment extraire nom variable pour le choisir f(file) ?
averagingPeriod = 'LT'
timePeriod = 'lt'


# Creation dossier pour recevoir fichiers crees : CF http://www.developpez.net/forums/d560315/autres-langages/python-zope/general-python/creer-dossier/
try:
    subprocess.call("mkdir " + folderWithNetCdfFiles + "GCA_MapUncertaintyFiles" + '/', shell=True)# CF subprocess/python
    #TODO : remplacer dynamiquement modeleType.
except OSError:
    pass

commonPathName  = "/home/pascal/workSpace/bobcat25_08_14/uncertaintyLayer/layers/layersForPythonScript/GCA_MapUncertaintyFiles/" #TODO : Adapter les chemins dynamiquement : cf chap 7 Python Uni de Pau.
netCdfFileName = "stdDevTestLongTermLandModel.nc"

#Nom de fichiers de sortie pour le mask raster et sa version vectorisee :
binaryFileNameRaster = 'fco2_'+ modeleType +'_'+ modeleName +'_'+ varName +'_'+ averagingPeriod +'_'+ timePeriod +'_UncertRef_Binary' #TODO : remplacer par nom du bon fichier : a faire ds la cas du long term pour ocean, land et inversion model.
binaryFileNameVector = modeleType +'_'+ modeleName +'_'+ varName +'_'+ averagingPeriod + timePeriod #TODO : remplacer par nom du bon fichier : a faire ds la cas du long term pour ocean, land et inversion model.
        
#1) # Set mean, min and max for each file :
netCdfData= cdo.readArray(folderWithNetCdfFiles+netCdfFileName, varName)#readArray : Direcly return a numpy array for a given variable name. CF http://gis.stackexchange.com/questions/32995/how-to-fully-load-a-raster-into-a-numpy-array
meanNetCdfData= np.mean(netCdfData)#np = numpy
maximumNetCdfData = np.max(netCdfData)
minimumNetCdfData = np.min(netCdfData)
#print(meanNetCdfData)#--> OK

meanNetCdfData1= meanNetCdfData*0.5
meanNetCdfData2= meanNetCdfData
meanNetCdfData3= meanNetCdfData*1.5
meanNetCdfData4= meanNetCdfData*2 
meanNetCdfData5= meanNetCdfData*2.5
meanNetCdfData6= meanNetCdfData*3
#J'ai essaye de rendre dynamique ces appels (voir version 8) : pas reussi.

meanSNetCdfDataTuple= (meanNetCdfData1, meanNetCdfData2, meanNetCdfData3, meanNetCdfData4, meanNetCdfData5, meanNetCdfData6)

#2) Construction fichiers rasters binaires f(stDevMean) :
 #Case, IPCC method: On met en blanc (=1/ test QGis) les zones uncertaines cad > meanNetCdfDataX (non dans intervalle de selection). Donc : + seuil Uncert augmente, - on a de blanc () : on veut en fait metter en valeur les zones la ou +/- uncert et evidemment, moins si seuil > !
 #Case stippling : On hachure les zones certaines, cad = 0. Donc : on veut mettre en valeur les zones avec - d'erreur f(seuil) dc plus seuil erreur augmente, + zones stippling augmentent.

i= "1" #To have file's names different
for meanNetCdfDataTuple in meanSNetCdfDataTuple:
    cdo.setrtoc2(minimumNetCdfData, meanNetCdfDataTuple, 0, 1, input= folderWithNetCdfFiles+netCdfFileName,  output= commonPathName+binaryFileNameRaster+ i +".nc") # 1er valeur : ds intervalle, suivante : en dehors.
    i=i+"1"#En string parce que sinon erreur.

#3) Vectorisations des rasters binaires :CF http://gis.stackexchange.com/questions/92176/gdal-polygonize-in-python-error-blank-polygon-created
 #On met les valeurs uniques extraites dans une array pour pouvoir les utiliser ensuite dans la boucle de vectorisation.
onlyValueS = []
iOnlyValue = "1"
while len(list(iOnlyValue)) <= len(meanSNetCdfDataTuple) :    
    onlyValueGdal = gdal.Open('netCDF:"'+commonPathName+binaryFileNameRaster + iOnlyValue +'.nc":'+varName+'')#CF http://www.gdal.org/frmt_netcdf.html et "testRastToPol2.py"
    onlyValueS.append(onlyValueGdal)
    iOnlyValue= iOnlyValue + "1"
    
###########################################################################################################
# //////////////////////// INTEGRATION DES COUCHES SHP DANS GEOSERVER ::::::::::::::::::::::::::::::::::::#
###########################################################################################################
    
# Workspace creation: necessary to import layer in GS: CF layerUncertaintyReadMe2.
try:
    subprocess.call('curl -u admin:geoserver -v -XPOST -H "Content-type: text/xml" -d "<workspace><name>GCAUncertaintyLandModel2</name></workspace>" http://localhost:8080/geoserver/rest/workspaces', shell= True)
except OSError: #Important parce que si non, a la deuxieme fois, qd existe, erreur.
    pass
#Workspace variable definition:
cat = Catalog("http://localhost:8080/geoserver/rest", "admin", "geoserver")# Connection to GS.
workspace = cat.get_workspace("GCAUncertaintyLandModel2")
# Clear workspace si il existe pour ne pas que donne erreur si meme nom de couches quand on relance script.
workspace.clear()
# TODO: Ne rgle pas le prb, trouver autre chose.
############################################################################################################

iOutShapefile = 0
thresholdComponentName = ["_0.5stdDev", "_1stdDev", "_1.5stdDev", "_2stdDev", "_2.5stdDev","_3stdDev"]# Noms fichiers .shp de sortie doivent tenir compte threshold.
for onlyValue in  onlyValueS :    
    rasterBand=  onlyValue.GetRasterBand(1)#Necessaire dc de recuperer la band (ici unique)
    
    outShapefileMasking = commonPathName + binaryFileNameVector + "_mk" + thresholdComponentName[iOutShapefile] + '_fco2' # 2 noms differents pour tenir compte modalites representation uncertainty si overlay (masking ou stippling).
    outShapefileStippling = commonPathName + binaryFileNameVector + "_st" + thresholdComponentName[iOutShapefile] + '_fco2'
    driver = ogr.GetDriverByName("ESRI Shapefile")
    if os.path.exists(outShapefileMasking+".shp"):
        driver.DeleteDataSource(outShapefileMasking+".shp")
    if os.path.exists(outShapefileStippling+".shp"):
        driver.DeleteDataSource(outShapefileStippling+".shp")        
    outDatasourceMasking = driver.CreateDataSource(outShapefileMasking+ ".shp")# Pourquoi ???
    outDatasourceStippling = driver.CreateDataSource(outShapefileStippling+ ".shp")# Pourquoi ???   
    outLayerMasking = outDatasourceMasking.CreateLayer(binaryFileNameVector + "_mk" + thresholdComponentName[iOutShapefile] + '_fco2', srs=None)
    outLayerStippling = outDatasourceStippling.CreateLayer(binaryFileNameVector + "_st" + thresholdComponentName[iOutShapefile] + '_fco2', srs=None)
    newField = ogr.FieldDefn('MYFLD', ogr.OFTInteger)# Pour recevoir shp cree.
    outLayerMasking.CreateField(newField)
    outLayerStippling.CreateField(newField)

    gdal.Polygonize(rasterBand, None, outLayerMasking, 0, [], callback=None )# 0 : = index. On lit donc la band !!!
    gdal.Polygonize(rasterBand, None, outLayerStippling, 0, [], callback=None )# 0 : = index. On lit donc la band !!!    
    outDatasourceMasking.Destroy()# Sinon, bloque qd on refait cette operation.
    outDatasourceStippling.Destroy()
    
    ###########################################################################################################
    # //////////////////////// INTEGRATION DES COUCHES SHP DANS GEOSERVER (WITH gsconfig) : ::::::::::::::::::#
    ###########################################################################################################
    
    # We need to create .prj file (epsg4326) because not present.
    prjFileMasking = open(outShapefileMasking +'.prj', 'w' )
    prjFileStippling = open(outShapefileStippling +'.prj', 'w' )
    prjFileMasking.write('GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.017453292519943295]]')
    prjFileStippling.write('GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.017453292519943295]]')    
    prjFileMasking.close()
    prjFileStippling.close()

    # Retrieve .shp layers from folder :
    shapefileMasking = geoserver.util.shapefile_and_friends(outShapefileMasking)# Ne doit pas intégrer extensions des fichiers vect arcGis. la fonction shapefile_and_friends() permet justement de parcourir les chemins jusqu'à arriver à nom de ts les elements (.prj, .dbf, ...) composant la couche shape. 
    shapefileStippling = geoserver.util.shapefile_and_friends(outShapefileStippling)

    #Keep layers in GS:
    dataStoreAndLayersNamesMk = binaryFileNameVector + "_mk" + thresholdComponentName[iOutShapefile] + '_fco2'
    dataStoreAndLayersNamesSt = binaryFileNameVector + "_st" + thresholdComponentName[iOutShapefile] + '_fco2'
    ftMasking = cat.create_featurestore(dataStoreAndLayersNamesMk, shapefileMasking, workspace)# Data stores and layers names (must be unique for each layer), url to shp files , workspace.
    ftStippling = cat.create_featurestore(dataStoreAndLayersNamesSt, shapefileStippling, workspace)
     ###########################################################################################################

    iOutShapefile = iOutShapefile + 1
    
# Eliminate binaries .nc files (necessary to build binaries vectors).
try:
    subprocess.call("rm " + folderWithNetCdfFiles + "GCA_MapUncertaintyFiles/*.nc", shell=True)
except OSError:
    pass


print("huhuhuhu")

QgsApplication.exitQgis()


