#!/usr/bin/python
# -*- coding: latin-1 -*-

#- Création - 31/12/2014 - Pascal Evano
#- Revision :


# ################################################################################################################################################################################################ #
# // THIS FILE CREATE VECTOR FILES (.SHP) BASED ON .NC FILES WHICH HAVE UNCERTAINTY VARIABLES ASSOCIATED. SEE OTHER .PY SCRIPT TO CREATE .NC FILES WHICH HAVE UNCERTAINTY VARIABLES ASSOCIATED. // #
# Methode : on part fichiers std dev auxquels on extrait valeur min et moyenne. A partir de min et mean on déduit les seuils f(modalité et nombre de seuil choisis)
# et l'on construit les fichiers raster binaires basés sur ces seuils.
 
# On vectorise les fichiers raster.
# On a donc pour chaque modele "MEAN" une indication pour savoir si on est en dessous ou au dessus d'une certaine deviation std. 
# ################################################################################################################################################################################################ #

# Import QGis library: 
  #Pour comprendre Import en python : sametmax.com/les-imports-en-python
#On peut rajouter :
import os # CF chp 7.1 python Universite de Pau.
import sys # = To access to python fonctions and objects
#from PyQt4.QtCore import * # CF hub.qgis.org/issues/8707

#Lecture et exploitation netCDF :
from cdo import *
cdo = Cdo()# --> Librairie cdo/python.
from osgeo import gdal, osr, ogr
#from gdalconst import *

#Autres:
import glob
import datetime

###################################################################################
        #---- Parameters definitions: ------ #
    # ------Parameters to adapt if necessary: ----------- # 
###################################################################################

modelsTypeChoose = sys.argv[1]# = celui rentré par l'utilisateur lors de l'éxécution du script.
# Pense bête, si on oubli le nom des types de modèles à rentrer lors de l'éxécution du script (à actualiser si on en ajoute) :
modelsTypeList = ['Inversions', 'LandModels', 'OceanModels', 'FOSSIL', 'CCDAS', 'CMIP5', 'DATA-DRIVEN']

# url des fichier où sont les données :
urlDataByModelType = '/home/scratch01/peylin/TEST2/OUTPUT_WEB' + '/' + sys.argv[1]# Philippe Peylin folder
#urlDataByModelType = '/home/pascal/workSpace/bobcat/Flux' + '/' + sys.argv[1] # Pascal Local folder

thresholdList = [0.5, 1, 1.5, 2, 2.5, 3]

##################################################################################################################

##################################################################################################################

# En fonction du type de modèle, certains paramètres peuvent changer. Ceux-ci sont listés ci_dessous :
# Bien sur, si on ajoute des types de modèles, il faut ajouter un if ...
# Tous les paramètres de chaque if devront donc être renseignés car on en a besoin pour utiliser ce script et certains devront éventuellement être adaptés.
# Il ne faut pas changer l'odre des éléments donc si on en ajoute, les ajouter à la suite.
# La syntaxe pour les variable d'incertitude (= stdDev) est : varNameList + Uncertainty
  
if (modelsTypeChoose == 'Inversions'):
    # Set general parameters: 
    #varUncertaintyNameList = ['Terrestrial_fluxUncertainty', 'Ocean_fluxUncertainty', 'fossilUncertainty']
    varUncertaintyNameList = ['Terrestrial_fluxUncertainty', 'Ocean_fluxUncertainty']
    avPeriods = ['longterm-2001-2004', 'yearlymean', 'monthlymean']
    # Dans GCA, les fichiers ne sont pas tjs appelé selon leurs équivalence/avPeriod. par ex, pour longterm, l'appel ne se fait pas avec longterm-2001-2004 mais avec longterm donc besoin créer :
    avPeriods4GCAWebSiteList = ['longterm', 'yearlymean', 'monthlymean'] # --> Attention, l'ordre doit être le même que avPeriods !!!
    #Set parameters which depen on avPeriod: adapt f(num avPeriod) --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] --> Avec AvP = avPeriod.
    maxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    minTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communMaxTimeStepByAvPeriod = [ [],[],[],[],[]]
    communMinTimeStepByAvPeriod = [ [],[],[],[],[]]
    oneIndexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    oneIndexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numCommunAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    modelNameByAvPeriodListOK = [ [],[],[],[],[]]
    # Set parameters which depens on num variables: --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] et pour chaque [ AvP ] : [ [var1], [var2], [var3], ... ] 
    meanNetCdfDataByVarList = [ [ [], [] ], [ [], [] ],  [ [], [] ] ]
    minNetCdfDataByVarList = [ [ [], [] ], [ [], [] ],  [ [], [] ] ]
    # Set parameters which depen on num thresholds:
    meanNetCdfDataByThresholdList = [  [  [ [],[],[],[],[],[] ], [ [],[],[],[],[],[] ]  ], [  [ [],[],[],[],[],[] ], [ [],[],[],[],[],[] ]  ],  [  [ [],[],[],[],[],[] ], [ [],[],[],[],[],[] ]  ]  ]
    valuesGdalByThresholdList = [  [  [ [],[],[],[],[],[] ], [ [],[],[],[],[],[] ]  ], [  [ [],[],[],[],[],[] ], [ [],[],[],[],[],[] ]  ],  [  [ [],[],[],[],[],[] ], [ [],[],[],[],[],[] ]  ]  ]
    
if (modelsTypeChoose == 'LandModels'):
    # Set general parameters: 
    #varUncertaintyNameList = ['Terrestrial_fluxUncertainty', 'Ocean_fluxUncertainty', 'fossilUncertainty']
    varUncertaintyNameList = ['Terrestrial_fluxUncertainty']
    avPeriods = ['longterm-2000-2009', 'yearlymean', 'monthlymean']
    # Dans GCA, les fichiers ne sont pas tjs appelé selon leurs équivalence/avPeriod. par ex, pour longterm, l'appel ne se fait pas avec longterm-2001-2004 mais avec longterm donc besoin créer :
    avPeriods4GCAWebSiteList = ['longterm', 'yearlymean', 'monthlymean'] # --> Attention, l'ordre doit être le même que avPeriods !!!
    #Set parameters which depen on avPeriod: adapt f(num avPeriod) --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] --> Avec AvP = avPeriod.
    maxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    minTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communMaxTimeStepByAvPeriod = [ [],[],[],[],[]]
    communMinTimeStepByAvPeriod = [ [],[],[],[],[]]
    oneIndexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    oneIndexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numCommunAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    modelNameByAvPeriodListOK = [ [],[],[],[],[]]
    # Set parameters which depens on num variables: --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] et pour chaque [ AvP ] : [ [var1], [var2], [var3], ... ] 
    meanNetCdfDataByVarList = [ [ [] ], [ [] ],  [ [] ] ]
    minNetCdfDataByVarList = [ [ [] ], [ [] ],  [ [] ] ]
    # Set parameters which depen on num thresholds:
    meanNetCdfDataByThresholdList = [  [  [ [],[],[],[],[],[] ]  ], [  [ [],[],[],[],[],[] ]  ],  [  [ [],[],[],[],[],[] ]  ]  ]
    valuesGdalByThresholdList = [  [  [ [],[],[],[],[],[] ]  ], [  [ [],[],[],[],[],[] ]  ],  [  [ [],[],[],[],[],[] ]  ]  ]
    
if (modelsTypeChoose == 'OceanModels'):
    # Set general parameters: 
    #varUncertaintyNameList = ['Terrestrial_fluxUncertainty', 'Ocean_fluxUncertainty', 'fossilUncertainty']
    varUncertaintyNameList = ['Ocean_fluxUncertainty']
    avPeriods = ['longterm-2000-2009', 'yearlymean', 'monthlymean']
    # Dans GCA, les fichiers ne sont pas tjs appelé selon leurs équivalence/avPeriod. par ex, pour longterm, l'appel ne se fait pas avec longterm-2001-2004 mais avec longterm donc besoin créer :
    avPeriods4GCAWebSiteList = ['longterm', 'yearlymean', 'monthlymean'] # --> Attention, l'ordre doit être le même que avPeriods !!!
    #Set parameters which depen on avPeriod: adapt f(num avPeriod) --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] --> Avec AvP = avPeriod.
    maxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    minTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communMaxTimeStepByAvPeriod = [ [],[],[],[],[]]
    communMinTimeStepByAvPeriod = [ [],[],[],[],[]]
    oneIndexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    oneIndexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numCommunAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    modelNameByAvPeriodListOK = [ [],[],[],[],[]]
    # Set parameters which depen on num variables: --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] et pour chaque [ AvP ] : [ [var1], [var2], [var3], ... ] 
    meanNetCdfDataByVarList = [ [ [] ], [ [] ],  [ [] ] ]
    minNetCdfDataByVarList = [ [ [] ], [ [] ],  [ [] ] ]
    # Set parameters which depen on num thresholds:
    meanNetCdfDataByThresholdList = [  [  [ [],[],[],[],[],[] ]  ], [  [ [],[],[],[],[],[] ]  ],  [  [ [],[],[],[],[],[] ]  ]  ]
    valuesGdalByThresholdList = [  [  [ [],[],[],[],[],[] ]  ], [  [ [],[],[],[],[],[] ]  ],  [  [ [],[],[],[],[],[] ]  ]  ]
           
############################################################################################################
# ------------------------------------------------------------------------------------------------------- #    
 # A partir d'ici, plus aucun paramètre n'a besoin d'être rentré, le script peut fonctionner en fonction #
# ------------------------------------------------------------------------------------------------------- #    
############################################################################################################    

############################################################################################################################
# Create folders to receive created files: 
# Test if file exist before created: if exist, remove and turn to create. If not, create --> To avoid to have to replace files.
############################################################################################################################
for avPeriod in avPeriods:
    if os.path.exists(urlDataByModelType + '/' + avPeriod + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriod):
        try:
            subprocess.call('rm -rf' +  " " + urlDataByModelType + '/' + avPeriod + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriod, shell = True)
            subprocess.call('mkdir' +  " " + urlDataByModelType + '/' + avPeriod + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriod, shell = True)
        except OSError:
            pass
    else:
        try:
            subprocess.call('mkdir' +  " " + urlDataByModelType + '/' + avPeriod + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriod, shell = True)
        except OSError:
            pass
        
##########################################################################################################################
# ------------------------ Usefull parameters construction: --------------------------- #
##########################################################################################################################
for numAvPeriod in range( len(avPeriods) ):
# Set modelsNameList elements:
    modelNameByAvPeriodList = os.listdir( urlDataByModelType + '/' + avPeriods[numAvPeriod] )
    for modelNameByAvPeriod in modelNameByAvPeriodList:
        if (modelNameByAvPeriod[-6:] == 'XYT.nc'):# Je ne veux selectionner que les fichiers se terminant bar XYT.nc.
            modelNameByAvPeriodListOK[numAvPeriod].append(modelNameByAvPeriod) 

##################################
# Set time parameters:
##################################
for avPeriod in avPeriods:
    indexAvPeriod = avPeriods.index(avPeriod)
    modelsInFolderList = glob.glob(urlDataByModelType + '/' + avPeriod + '/' + '*_XYT.nc')# glob.glob: retourne liste avec chemin complet des files correspondant à la recherche
    for modelType in modelsInFolderList:
    # 1) Find min and max commun to all models:            
        timeStepByAvPeriod = cdo.showdate(input = modelType, shell=True)# format 2000-11-22
        timeStepByAvPeriod = timeStepByAvPeriod[0]
        timeStepByAvPeriod = timeStepByAvPeriod.split("  ")# Attention, 2 espaces ici
        maxTimeStepByAvPeriod = max(timeStepByAvPeriod)#LE max de chq modele présent ds le répertoire pointé.
        minTimeStepByAvPeriod = min(timeStepByAvPeriod)#LE min de chq modele présent ds le répertoire pointé.
        yearMaxTimeStepByAvPeriod = maxTimeStepByAvPeriod[:4]
        yearMinTimeStepByAvPeriod = minTimeStepByAvPeriod[:4]
        yearMaxTimeStepByAvPeriod = int(yearMaxTimeStepByAvPeriod)
        yearMinTimeStepByAvPeriod = int(yearMinTimeStepByAvPeriod)
        monthMaxTimeStepByAvPeriod = maxTimeStepByAvPeriod[5:7]
        monthMinTimeStepByAvPeriod = minTimeStepByAvPeriod[5:7]
        monthMaxTimeStepByAvPeriod = int(monthMaxTimeStepByAvPeriod)
        monthMinTimeStepByAvPeriod = int(monthMinTimeStepByAvPeriod)
        dayMaxTimeStepByAvPeriod = maxTimeStepByAvPeriod[8:11]
        dayMinTimeStepByAvPeriod = minTimeStepByAvPeriod[8:11]
        dayMaxTimeStepByAvPeriod = int(dayMaxTimeStepByAvPeriod)
        dayMinTimeStepByAvPeriod = int(dayMinTimeStepByAvPeriod)
        maxTimeStepPyFormat = datetime.date(yearMaxTimeStepByAvPeriod, monthMaxTimeStepByAvPeriod, dayMaxTimeStepByAvPeriod)
        minTimeStepPyFormat = datetime.date(yearMinTimeStepByAvPeriod, monthMinTimeStepByAvPeriod, dayMinTimeStepByAvPeriod)
        maxTimeStepPyFormat = str(maxTimeStepPyFormat)
        minTimeStepPyFormat = str(minTimeStepPyFormat)
        maxTimeStepPyFormat.replace(',', '-')
        minTimeStepPyFormat.replace(',', '-')
        maxTimeStepByAvPeriodList[indexAvPeriod].append(maxTimeStepPyFormat)
        minTimeStepByAvPeriodList[indexAvPeriod].append(minTimeStepPyFormat)
    communMaxTimeStepByAvPeriod[indexAvPeriod] = min(maxTimeStepByAvPeriodList[indexAvPeriod])
    communMinTimeStepByAvPeriod[indexAvPeriod] = max(minTimeStepByAvPeriodList[indexAvPeriod])
    # 2) Identifier l'index de ces min et max pour un model (le dernier/boucle/modelsInFolderList concretement):
    oneIndexMaxTimeStepByAvPeriod = timeStepByAvPeriod.index(communMaxTimeStepByAvPeriod[indexAvPeriod])
    oneIndexMaxTimeStepByAvPeriodList[indexAvPeriod].append(oneIndexMaxTimeStepByAvPeriod)
    oneIndexMinTimeStepByAvPeriod = timeStepByAvPeriod.index(communMinTimeStepByAvPeriod[indexAvPeriod])
    oneIndexMinTimeStepByAvPeriodList[indexAvPeriod].append(oneIndexMinTimeStepByAvPeriod)
    # 3) En déduire communAllTimeStepsByAvPeriodList et numCommunAllTimeStepsByAvPeriodList:
    communAllTimeStepsByAvPeriod =  timeStepByAvPeriod[ oneIndexMinTimeStepByAvPeriodList[indexAvPeriod][0]:oneIndexMaxTimeStepByAvPeriodList[indexAvPeriod][0] + 1 ]
    communAllTimeStepsByAvPeriodList[indexAvPeriod].append(communAllTimeStepsByAvPeriod) 
    numCommunAllTimeStepsByAvPeriod = len( communAllTimeStepsByAvPeriodList[indexAvPeriod][0] )
    numCommunAllTimeStepsByAvPeriodList[indexAvPeriod].append(numCommunAllTimeStepsByAvPeriod)
 
#######################################################################################################
# --------------- Maintenant on peut passer à l'étape de construction des fichiers: ------------#        
#######################################################################################################
 # 1) Calculated mean et min for each sdt dev file for each timeStep:
for numAvPeriod in range( len(avPeriods) ):
    for varUncertaintyName in varUncertaintyNameList:
            for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
                netCdfData = cdo.readArray(urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/'+ 'stdDevEach' + str(i) + '_Intermed.nc', varUncertaintyName)
                meanNetCdfData = np.mean(netCdfData)
                minNetCdfData = np.min(netCdfData)
                meanNetCdfDataByVarList[numAvPeriod][ varUncertaintyNameList.index(varUncertaintyName) ].append(meanNetCdfData)
                minNetCdfDataByVarList[numAvPeriod][ varUncertaintyNameList.index(varUncertaintyName) ].append(minNetCdfData)

 # 2) Use the mean value to set thresholds: num = n time steps (cad i) * numVarUncertainty * numThreshold.
                for threshold in thresholdList:
                    meanNetCdfDataByThreshold  = meanNetCdfDataByVarList[numAvPeriod][ varUncertaintyNameList.index(varUncertaintyName) ][i] * threshold# [i], cad num time steps ici.
                    meanNetCdfDataByThresholdList[numAvPeriod][ varUncertaintyNameList.index(varUncertaintyName) ][ thresholdList.index(threshold) ].append( meanNetCdfDataByThreshold )
#print( meanNetCdfDataByThresholdList[0][0][1] )# J'ai essayé avec différentes combinaisons d'indices, semble OK.   
                    
 # 3) Construction fichiers rasters binaires f(seuils obtenu à partir de stDevMean) pour chq fichier stdDev Intermed --> num = numTimeSteps * numVarUncertainty * numThreshold.
numThreshold = 0 # Les outputs sont n fois plus nombreux que inputs (n = numThresholds) et la syntaxe impose un nombre d'input = output donc j'ai trouvé cette solution.
while numThreshold < len( thresholdList ):
    for numAvPeriod in range( len(avPeriods) ):
        for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
            for varUncertaintyName in varUncertaintyNameList:
                cdo.setrtoc2(minNetCdfDataByVarList[numAvPeriod][ varUncertaintyNameList.index(varUncertaintyName ) ][i], meanNetCdfDataByThresholdList[numAvPeriod][varUncertaintyNameList.index(varUncertaintyName )][numThreshold][i], 0, 1, input= urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/'+ 'stdDevEach' + str(i) + '_Intermed.nc', output= urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'binary' + avPeriods[numAvPeriod] + varUncertaintyName  + 'thr-' + str(numThreshold) + '_' + str(i) + '.nc')                
    numThreshold = numThreshold + 1
    
    
######## VECTORISATION DE CES FICHIERS : ##########################
for numAvPeriod in range( len(avPeriods) ):
    # Lecture avec gdal de ts les fichiers binaires (this previous step is necessary):
    for numThreshold in range( len(thresholdList) ):
        for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
            for varUncertaintyName in varUncertaintyNameList:
                eachValueGdal = gdal.Open('NetCDF:"' + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'binary' + avPeriods[numAvPeriod] + varUncertaintyName  + 'thr-' + str(numThreshold) + '_' + str(i) + '.nc":' + varUncertaintyName +'')#CF http://www.gdal.org/frmt_netcdf.html et "testRastToPol2.py"  
                valuesGdalByThresholdList[numAvPeriod][ varUncertaintyNameList.index(varUncertaintyName) ][numThreshold].append(eachValueGdal)
    # Exploitation de ces fichiers gdal pour passer a .shp:
                rasterBandByThresholdList = valuesGdalByThresholdList[numAvPeriod][ varUncertaintyNameList.index(varUncertaintyName) ][numThreshold][i].GetRasterBand(1)
                binaryFileNameVector =  urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'binary' + avPeriods4GCAWebSiteList[numAvPeriod] + sys.argv[1] + 'thr-' + str(numThreshold) + '_' + str(i) + varUncertaintyName # --> Sera la structure du nom du fichier shp (vectorisé). POur longterm, qq soit modele type, l'avPeriod est 'longterm' dans le GCA.
                outShapefileMasking =  binaryFileNameVector + '_mk' + '_fco2'# --> Correspond au nom fichier sortie shp.
                outShapefileStippling = binaryFileNameVector + '_st' + '_fco2'
                driver = ogr.GetDriverByName("ESRI Shapefile")
                    
                if os.path.exists(outShapefileMasking+".shp"):
                    driver.DeleteDataSource(outShapefileMasking+".shp")
                if os.path.exists(outShapefileStippling+".shp"):
                    driver.DeleteDataSource(outShapefileStippling+".shp")
                        
                outDatasourceMasking = driver.CreateDataSource(outShapefileMasking+ ".shp")
                outDatasourceStippling = driver.CreateDataSource(outShapefileStippling+ ".shp")
                    
                outLayerMasking = outDatasourceMasking.CreateLayer(binaryFileNameVector + "_mk" + '_fco2', srs=None)
                outLayerStippling = outDatasourceStippling.CreateLayer(binaryFileNameVector + "_st" +'_fco2', srs=None)
                    
                newField = ogr.FieldDefn('MYFLD', ogr.OFTInteger)# Pour recevoir shp cree
                outLayerMasking.CreateField(newField)
                outLayerStippling.CreateField(newField)
                    
                gdal.Polygonize(rasterBandByThresholdList, None, outLayerMasking, 0, [], callback=None )# 0 : = index. On lit donc la band !!!
                gdal.Polygonize(rasterBandByThresholdList, None, outLayerStippling, 0, [], callback=None )
                    
                outDatasourceMasking.Destroy()# Sinon, bloque qd on refait cette operation.
                outDatasourceStippling.Destroy()
                gdal.Dataset.__swig_destroy__(eachValueGdal)# If not, append() doesn't work when a lot of data (eg : monthlymean)
                
# On efface les fichiers stdDevEach + num pas de temps + _Intermed.nc créés lors du script antérieur :
for numAvPeriod in range( len(avPeriods) ):                
      subprocess.call('rm' + " " + urlDataByModelType  + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDevEach*Intermed.nc', shell=True)
                    
                    
print( 'C fini !' )
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
        
