#!/usr/bin/python
# -*- coding: latin-1 -*-

#- Création - 03/01/2015 - Pascal Evano
#- Revision :

# ################################################################################################################################################################################################ #
# ----------- This script use the .shp files created by the "ncToShp" script to pass these .shp files to Geoserver and to asociate the good style (masking or stippling). --------------- #
# ################################################################################################################################################################################################ #

import os # CF chp 7.1 python Universite de Pau.
import sys # = To access to python fonctions and objects 
#Lecture et exploitation netCDF + possibility to do subprocess command:
from cdo import *
cdo = Cdo()# --> Librairie cdo/python.
# For layer integration in GS.
from geoserver.catalog import Catalog
import geoserver.util
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
#urlDataByModelType = '/home/scratch01/peylin/TEST2/OUTPUT_WEB' + '/' + sys.argv[1]# Philippe Peylin folder
urlDataByModelType = '/home/pascal/workSpace/bobcat/Flux' + '/' + sys.argv[1] # Pascal Local folder

thresholdList = [0.5, 1, 1.5, 2, 2.5, 3]

# --- Paramètres spécifiques à Geoserver :
#urlGS = 'http//trucMuch'
urlGS = 'http://webportals.ipsl.jussieu.fr:8080/geoserver/rest/workspaces' # webportals GS.
urlGSRest = 'http://webportals.ipsl.jussieu.fr:8080/geoserver/rest' # La même que urlGS mais on enlève /workspaces
loginGS = 'admin'
passGS = 'geoserver'
workspaceName = 'GCAUncertaintyTest' # --> Nom du dossier qui va contenir les couches.

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

############################################################################################################
# ------------------------------------------------------------------------------------------------------- #    
 # A partir d'ici, plus aucun paramètre n'a besoin d'être rentré, le script peut fonctionner en fonction #
# ------------------------------------------------------------------------------------------------------- #    
############################################################################################################  

    
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
  
# 1) Workspace creation: necessary to import layer in GS.
try:
    #subprocess.call('curl -u admin:geoserver -v -XPOST -H "Content-type: text/xml" -d "<workspace><name>GCAUncertaintyTest</name></workspace>" '+ urlGS +' ', shell= True)
    subprocess.call('curl -u' + ' ' + loginGS + ':' + passGS + ' ' + '-v -XPOST -H "Content-type: text/xml" -d "<workspace><name>'+ workspaceName +'</name></workspace>" '+ urlGS +' ', shell= True)
except OSError: #Important parce que si non, a la deuxieme fois, qd existe, erreur.
    pass

# 2) cat (catalogue) and Workspace variable definition:
cat = Catalog(urlGSRest, loginGS, passGS)
workspace = cat.get_workspace( workspaceName )# créé dc juste avant.

# 3) On peut maintenant commencer opération transfert à GS :
for numAvPeriod in range( len(avPeriods) ):
    for numThreshold in range( len(thresholdList) ):
        for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
            for varUncertaintyName in varUncertaintyNameList:
                binaryFileNameVector =  'binary' + avPeriods4GCAWebSiteList[numAvPeriod] + sys.argv[1] + 'thr-' + str(numThreshold) + '_' + str(i) + varUncertaintyName # --> Sera la structure du nom du fichier shp (vectorisé). POur longterm, qq soit modele type, l'avPeriod est 'longterm' dans le GCA.
                outShapefileMasking =  urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + binaryFileNameVector + '_mk' + '_fco2'
                outShapefileStippling = urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'vectorizedFiles_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + binaryFileNameVector + '_st' + '_fco2'
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
                #Data store avec même nom que outShapefile :
                dataStoreAndLayersNamesMk = binaryFileNameVector + '_mk' + '_fco2'
                dataStoreAndLayersNamesSt = binaryFileNameVector + '_st' + '_fco2'
                ftMasking = cat.create_featurestore(dataStoreAndLayersNamesMk, shapefileMasking, workspace)# --> Data stores and layers names (must be unique for each layer), url to shp files , workspace.
                ftStippling = cat.create_featurestore(dataStoreAndLayersNamesSt, shapefileStippling, workspace)
            # Create a style for each layer: CF geoserver.geo-solutions.it/edu/en/rest/using_rest.html et http://gis.stackexchange.com/questions/75207/layer-sets-not-enabled-after-change-style-via-rest
                # Note : le style est défini dans Geoserver donc le nom est celui défini dans Geoserver ( après <defaultStyle><name> )
                try:
                    subprocess.call('curl -v -u' + ' ' + loginGS + ':' + passGS + ' ' + '-XPUT -H "Content-type: text/xml" -d "<layer><defaultStyle><name>GCA_uncertainty_maskingOverlay</name></defaultStyle><enabled>true</enabled></layer>" '+ urlGSRest + '/layers/GCAUncertaintyTest:' + dataStoreAndLayersNamesMk, shell=True)# Apply style for masking layers.
                    subprocess.call('curl -v -u' + ' ' + loginGS + ':' + passGS + ' ' + '-XPUT -H "Content-type: text/xml" -d "<layer><defaultStyle><name>GCA_uncertainty_stipplingOverlay</name></defaultStyle><enabled>true</enabled></layer>" '+ urlGSRest + '/layers/GCAUncertaintyTest:' + dataStoreAndLayersNamesSt, shell=True)# Apply style for masking layers.
                except OSError:
                    pass

print('C est fini !')
