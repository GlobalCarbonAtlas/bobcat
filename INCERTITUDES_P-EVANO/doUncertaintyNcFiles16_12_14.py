#!/usr/bin/env python
# -*- coding: latin-1 -*-

#- Création - 16/12/2014 - Pascal Evano
#- Revision :

# ################################################################################################################################################################################################ #
                            # // THIS FILE CREATES UNCERTAINTY .NC FILES THAT WILL BE USED TO CONSTRUCT .SHP FILES IN THE NEXT SCRIPT // #
                            # // THIS FILE CREATES TOO FILES WITH UNCERTAINTY INFO THAT WILL BE DISPLAYED IN GCA LIKE A NORMAL LAYER. // #
                            # // Note: Only for MEAN files // ############################################################################################################################## #
# ################################################################################################################################################################################################ #
import os
import subprocess
import sys

#subprocess.call( 'module load python/2.7.5' ,shell = True)# Trouver sol, ne marche pas.
#subprocess.call( 'module load cdo/1.5.3' ,shell = True)

#Lecture et exploitation netCDF :
from cdo import *
cdo = Cdo()# --> Librairie cdo/python.

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

modelName = 'MEAN'# SO ONLY FOR MEAN HERE!!!!

# url des fichier où sont les données :
urlDataByModelType = '/home/scratch01/peylin/TEST2/OUTPUT_WEB' + '/' + sys.argv[1]# Philippe Peylin folder
#urlDataByModelType = '/home/pascal/workSpace/bobcat/Flux' + '/' + sys.argv[1] # Pascal Local folder

##################################################################################################################

# En fonction du type de modèle, certains paramètres peuvent changer. Ceux-ci sont listés ci_dessous :
# Bien sur, si on ajoute des types de modèles, il faut ajouter un if ...
# Tous les paramètres de chaque if devront donc être renseignés car on en a besoin pour utiliser ce script et certains devront éventuellement être adaptés.
# Il ne faut pas changer l'odre des éléments donc si on en ajoute, les ajouter à la suite.
# La syntaxe pour les variable d'incetitude (= stdDev) est : varNameList + Uncertainty
  
if (modelsTypeChoose == 'Inversions'):
    # Set general parameters: 
    varNameList =  ['Terrestrial_flux', 'Ocean_flux', 'fossil']
    varUncertaintyNameList = ['Terrestrial_fluxUncertainty', 'Ocean_fluxUncertainty', 'fossilUncertainty']
    avPeriods = ['longterm-2001-2004', 'yearlymean', 'monthlymean', 'yearlymean-anom', 'monthlymean-anom']
    #Set parameters which depens on avPeriod: adapt f(num avPeriod) --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] --> Avec AvP = avPeriod.
    maxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    minTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communMaxTimeStepByAvPeriod = [ [],[],[],[],[]]
    communMinTimeStepByAvPeriod = [ [],[],[],[],[]]
    oneIndexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    oneIndexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    indexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    indexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numCommunAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numModelsByAvPeriodList = [ [],[],[],[],[]]
    modelNameByAvPeriodListOK = [ [],[],[],[],[]]
    ncrcatCommandList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodListOK = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodStdDevList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodStdDevListOK = [ [],[],[],[],[]]
    # Set parameters which depens on num variables: --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] et pour chaque [ AvP ] : [ [var1], [var2], [var3], ... ] 
    ncrcatCommandByVarList = [ [ [], [], [] ], [ [], [], [] ], [ [], [], [] ], [ [], [], [] ], [ [], [], [] ]  ]
    ncrcatCommandByVarListOK = [ [ [], [], [] ], [ [], [], [] ], [ [], [], [] ], [ [], [], [] ], [ [], [], [] ]  ]
    
if (modelsTypeChoose == 'CCDAS'):
    # Set general parameters: 
    varNameList =  ['Terrestrial_flux', 'Terrestrial_flux_nat', 'biomass_burning_carbon_flux', 'gpp']
    varUncertaintyNameList =  ['Terrestrial_fluxUncertainty', 'Terrestrial_flux_natUncertainty', 'biomass_burning_carbon_fluxUncertainty', 'gppUncertainty']
    avPeriods = ['longterm-2001-2004', 'yearlymean', 'monthlymean', 'yearlymean-anom', 'monthlymean-anom']
    #Set parameters which depens on avPeriod: adapt f(num avPeriod) --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] --> Avec AvP = avPeriod.
    maxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    minTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communMaxTimeStepByAvPeriod = [ [],[],[],[],[]]
    communMinTimeStepByAvPeriod = [ [],[],[],[],[]]
    oneIndexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    oneIndexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    indexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    indexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numCommunAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numModelsByAvPeriodList = [ [],[],[],[],[]]
    modelNameByAvPeriodListOK = [ [],[],[],[],[]]
    ncrcatCommandList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodListOK = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodStdDevList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodStdDevListOK = [ [],[],[],[],[]]
    # Set parameters which depens on num variables: --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] et pour chaque [ AvP ] : [ [var1], [var2], [var3], ... ] 
    ncrcatCommandByVarList = [ [ [], [], [], [] ], [ [], [], [], [] ], [ [], [], [], [] ], [ [], [], [], [] ], [ [], [], [], [] ]  ]
    ncrcatCommandByVarListOK = [ [ [], [], [], [] ], [ [], [], [], [] ], [ [], [], [], [] ], [ [], [], [], [] ], [ [], [], [], [] ]  ]

if (modelsTypeChoose == 'DATA-DRIVEN'):
    # Set general parameters: 
    varNameList =  ['gpp']
    varUncertaintyNameList =  ['gppUncertainty']
    avPeriods = ['longterm-2001-2004', 'yearlymean', 'monthlymean', 'yearlymean-anom', 'monthlymean-anom']
    #Set parameters which depens on avPeriod: adapt f(num avPeriod) --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] --> Avec AvP = avPeriod.
    maxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    minTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communMaxTimeStepByAvPeriod = [ [],[],[],[],[]]
    communMinTimeStepByAvPeriod = [ [],[],[],[],[]]
    oneIndexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    oneIndexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    indexMaxTimeStepByAvPeriodList = [ [],[],[],[],[]]
    indexMinTimeStepByAvPeriodList = [ [],[],[],[],[]]
    communAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numCommunAllTimeStepsByAvPeriodList = [ [],[],[],[],[]]
    numModelsByAvPeriodList = [ [],[],[],[],[]]
    modelNameByAvPeriodListOK = [ [],[],[],[],[]]
    ncrcatCommandList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodListOK = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodStdDevList = [ [],[],[],[],[]]
    ncrcatCommandByAvPeriodStdDevListOK = [ [],[],[],[],[]]
    # Set parameters which depens on num variables: --> [ [AvP1], [AvP2], [AvP3], [AvP4], ... ] et pour chaque [ AvP ] : [ [var1], [var2], [var3], ... ] 
    ncrcatCommandByVarList = [ [ [] ], [ [] ], [ [] ], [ [] ], [ [] ]  ]
    ncrcatCommandByVarListOK = [ [ [] ], [ [] ], [ [] ], [ [] ], [ [] ]  ]

    
#if (modelsTypeChoose == 'LandModels'):
    
#if (modelsTypeChoose == 'OceanModels'):


############################################################################################################
# ------------------------------------------------------------------------------------------------------- #    
 # A partir d'ici, plus aucun paramètre n'a besoin d'être rentré, le script peut fonctionner en fonction #
# ------------------------------------------------------------------------------------------------------- #    
############################################################################################################    


############################################################################################################################
# Create folders (for land, ocean, inversion and for longterm, yearly and monthly means) to receive created files: 
# Test if file exist before created: if exist, remove and turn to create. If not, create --> To avoid to have to replace files.
############################################################################################################################
for avPeriod in avPeriods:
    if os.path.exists(urlDataByModelType + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod):
        try:
            subprocess.call('rm -rf' +  " " + urlDataByModelType + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod, shell = True)
            subprocess.call('mkdir' +  " " + urlDataByModelType + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod, shell = True)
        except OSError:
            pass
    else:
        try:
            subprocess.call('mkdir' +  " " + urlDataByModelType + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod, shell = True)
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
    # 2) Set commun period:
    communPeriod = communMinTimeStepByAvPeriod[indexAvPeriod] + '-' + communMaxTimeStepByAvPeriod[indexAvPeriod]
    # 3) Identifier l'index de ces min et max pour un model (le dernier/boucle/modelsInFolderList concretement):
    oneIndexMaxTimeStepByAvPeriod = timeStepByAvPeriod.index(communMaxTimeStepByAvPeriod[indexAvPeriod])
    oneIndexMaxTimeStepByAvPeriodList[indexAvPeriod].append(oneIndexMaxTimeStepByAvPeriod)
    oneIndexMinTimeStepByAvPeriod = timeStepByAvPeriod.index(communMinTimeStepByAvPeriod[indexAvPeriod])
    oneIndexMinTimeStepByAvPeriodList[indexAvPeriod].append(oneIndexMinTimeStepByAvPeriod)
    # 4) En déduire communAllTimeStepsByAvPeriodList et numCommunAllTimeStepsByAvPeriodList:
    communAllTimeStepsByAvPeriod =  timeStepByAvPeriod[ oneIndexMinTimeStepByAvPeriodList[indexAvPeriod][0]:oneIndexMaxTimeStepByAvPeriodList[indexAvPeriod][0] + 1 ]
    communAllTimeStepsByAvPeriodList[indexAvPeriod].append(communAllTimeStepsByAvPeriod) 
    numCommunAllTimeStepsByAvPeriod = len( communAllTimeStepsByAvPeriodList[indexAvPeriod][0] )
    numCommunAllTimeStepsByAvPeriodList[indexAvPeriod].append(numCommunAllTimeStepsByAvPeriod)

# Set indexMaxTimeStepByAvPeriod (and By Model):
for numAvPeriod in range( len(avPeriods) ):
    modelsInFolderList = glob.glob(urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + '*_XYT.nc')
    for modelType in modelsInFolderList:
        timeStepByAvPeriod = cdo.showdate(input = modelType, shell=True)# format 2000-11-22
        timeStepByAvPeriod = timeStepByAvPeriod[0]
        timeStepByAvPeriod = timeStepByAvPeriod.split("  ")
        indexMaxTimeStepByAvPeriod = timeStepByAvPeriod.index( communMaxTimeStepByAvPeriod[numAvPeriod] )
        indexMinTimeStepByAvPeriod = timeStepByAvPeriod.index( communMinTimeStepByAvPeriod[numAvPeriod] )
        indexMaxTimeStepByAvPeriodList[numAvPeriod].append( indexMaxTimeStepByAvPeriod )
        indexMinTimeStepByAvPeriodList[numAvPeriod].append( indexMinTimeStepByAvPeriod )    
    
# Set commun period  for MEAN files used in GCA --> This one will be used to construct name of mean files, for all avPeriod. En effet, ce parametre doit etre le meme pour chq nom des layers, qq soit avPeriod (appel/GCA se base sur nomenclature monthlymean)        
communYearMaxTimeStepByAvPeriod = communMaxTimeStepByAvPeriod[1]
communYearMinTimeStepByAvPeriod = communMinTimeStepByAvPeriod[1]
communYearMaxTimeStepByAvPeriodOK = communYearMaxTimeStepByAvPeriod[:4]
communYearMinTimeStepByAvPeriodOK = communYearMinTimeStepByAvPeriod[:4]
communPeriodYearly =  communYearMinTimeStepByAvPeriodOK+ '-' +  communYearMaxTimeStepByAvPeriodOK# --> Ex : '1980-2010' for Land models

##########################################################################################################################################################################
# --------------- Previous steps (before doing files): create call to all files to not have to bucle to ncrcat command (we need to fixed the output/ncrcat) ------------#        
##########################################################################################################################################################################   
for numAvPeriod in range( len(avPeriods) ):
    if ( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] != 1 ):# On ne prend pas les avPeriod ou les données n'ont qu'un seul pas de temp (ex: longterm), pas la peine ici.
        for numVarName in range( len(varNameList) ):
            for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
                eachTimeStepStr = communAllTimeStepsByAvPeriodList[numAvPeriod][0][i]                    
                ncrcatCommandPart2 = urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + varNameList[numVarName] + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + 'Intermed.nc' + " " 
                ncrcatCommandByVarList[numAvPeriod][numVarName].append( ncrcatCommandPart2 )
            ncrcatCommandByVarListJoined = ''.join(map(str, ncrcatCommandByVarList[numAvPeriod][numVarName]))# CF stackoverflow.com/.../concatenate-item-in-list-to-stri...
            ncrcatCommandByVarListOK[numAvPeriod][numVarName].append(ncrcatCommandByVarListJoined)
#['/home/scratch01/peylin/TEST2/OUTPUT_WEB/Inversions/yearlymean-anom/withUncertDat_Inversionsyearlymean-anom/fco2_MEAN_fossil_2001-07-01_Inversions_yearlymean-anomIntermed.nc /home/scratch01/peylin/TEST2/OUTPUT_WEB/Inversions/yearlymean-anom/withUncertDat_Inversionsyearlymean-anom/fco2_MEAN_fossil_2002-07-01_Inversions_yearlymean-anomIntermed.nc /home/scratch01/peylin/TEST2/OUTPUT_WEB/Inversions/yearlymean-anom/withUncertDat_Inversionsyearlymean-anom/fco2_MEAN_fossil_2003-07-01_Inversions_yearlymean-anomIntermed.nc /home/scratch01/peylin/TEST2/OUTPUT_WEB/Inversions/yearlymean-anom/withUncertDat_Inversionsyearlymean-anom/fco2_MEAN_fossil_2004-07-01_Inversions_yearlymean-anomIntermed.nc ']

# ------- The same for stdDev (séparé pour éviter éventuels cas ou par ex len(varUncertaintyNameList) est différente de len(varNameList): ----------- #
# Ds ce cas là pas la peine de séparer les fichiers f(variables si plus de 1) parce que le calcul de la StdDev avec nco tient compte du fait que diff var ds chq fichier.
for numAvPeriod in range( len(avPeriods) ):
    if ( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] != 1 ):
            for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
                eachTimeStepStr = communAllTimeStepsByAvPeriodList[numAvPeriod][0][i]
                ncrcatCommandPart2StdDev =  urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDevEach' + str(i) + '_' + 'Intermed.nc' + " "
                ncrcatCommandByAvPeriodStdDevList[numAvPeriod].append(ncrcatCommandPart2StdDev)
            ncrcatCommandByAvPeriodStdDevListJoined = ''.join(map(str, ncrcatCommandByAvPeriodStdDevList[numAvPeriod]))
            ncrcatCommandByAvPeriodStdDevListOK[numAvPeriod].append( ncrcatCommandByAvPeriodStdDevListJoined )
#['/home/scratch01/peylin/TEST2/OUTPUT_WEB/Inversions/yearlymean-anom/withUncertDat_Inversionsyearlymean-anom/stdDevEach0_Intermed.nc /home/scratch01/peylin/TEST2/OUTPUT_WEB/Inversions/yearlymean-anom/withUncertDat_Inversionsyearlymean-anom/stdDevEach1_Intermed.nc /home/scratch01/peylin/TEST2/OUTPUT_WEB/Inversions/yearlymean-anom/withUncertDat_Inversionsyearlymean-anom/stdDevEach2_Intermed.nc /home/scratch01/peylin/TEST2/OUTPUT_WEB/Inversions/yearlymean-anom/withUncertDat_Inversionsyearlymean-anom/stdDevEach3_Intermed.nc ']

            
#######################################################################################################
# --------------- Maintenant on peut passer à l'étape de construction des fichiers: ------------#        
#######################################################################################################            
               
# Structure noms fichiers de sortie à respecter (parce que structure nom/requete ds GCA basée sur noms fichiers dans monthlymean) :
# gazName_modelName_communPeriodYearly_modelType_avPeriod_XYT.nc --> Ex : fco2_MEAN_1980-2010_LandModels_longterm-2000-2009_XYT.nc

for numAvPeriod in range( len(avPeriods) ):# avPeriods specific for each model.
    # ------------------------------------------------------------------------------------------------------------------------------------------------------- #
    # --------------------------- Apply first only to avPeriod which have only one time step (eg: longterm): ------------------------------------------------ #
    # ------------------------------------------------------------------------------------------------------------------------------------------------------- #
        if ( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] == 1 ):
            eachTimeStepStr = communAllTimeStepsByAvPeriodList[numAvPeriod][0][0]
            # Construction des fichiers de std dev : avec nco plus compliqué, cdo plus adapté ici. J'ai vérifié avec QGis, OK, correspond à std dev.
            subprocess.call('cdo ensstd' # cdo ensstd, contrairement à ncra de nco tient en compte automatiquement les variables du fichiers donc pas besoin de préciser la variable ici. 
            + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/*XYT.nc'
            + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' +  'stdDevEach' + '0' + '_' + 'Intermed.nc', shell=True)# Nom de fichier sortie comme ça pour compatibilité/script pour vectoriser les fichiers binaires. En effet on a besoin des fichiers de stdDev by timeStep pour construire fichiers binaires.

            # Construction des fichiers moyenne, 'MEAN': nb = num variables. Ici il faut donc préciser la variable.
            for varName in varNameList:
                #subprocess.call('ncra -v' + " " + varName + " " + '-y mean'# Fonctionne en local mais pas sous Obelix (dc mettre commande ci-dessous).
                subprocess.call('ncra -v' + " " + varName
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/*_XYT.nc'
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + varName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True)

            # Ajout des variables d'incertitude liées aux fichiers MEAN ( = std dev variable) :
                # Step 1 : chger noms variables ds le fichier stdDev.nc --> Message d'erreur/nco mais le fait bien !
                for varUncertaintyName in varUncertaintyNameList:
                    subprocess.call('ncrename -v ' + varName + ',' + varUncertaintyName# Script affiche Erreur mais le fait bien. 
                    + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' +  'stdDevEach' + '0' + '_Intermed.nc', shell=True)
                 # Step 2 : add this variables to a new MEAN file:
                    subprocess.call('ncks -A -v' + " " + varUncertaintyName
                    + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' +  'stdDevEach' + '0' + '_Intermed.nc'
                    + " " +  urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_'+ modelName + '_' + communPeriodYearly + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True )
                # Add Mean data to the new MEAN file:
                subprocess.call('ncks -A -v' + " " + varName
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + varName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc'
                + " " +  urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_'+ modelName + '_' + communPeriodYearly + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True )
                # Remove mean files for each variable created:
                subprocess.call('rm' + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + varName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True)
            # Remove stdDev file: and mean files for each variable created: --> Do in the files to construct binary shp files because we need std dev file to realise this operation.

   # -------------------------------------------------------------------------------------------------- #  
   # --------------------------- Others Av period (ie: we have to take in account time steps) ---------------------------------------------------- # 
   # -------------------------------------------------------------------------------------------------- #
        else:
        # Previous step: we need to put all the model to the same commun timePeriod: Test with QGis OK.
            modelsInFolderList = glob.glob(urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + '*_XYT.nc')
            for numModel in range( len(modelNameByAvPeriodListOK[numAvPeriod]) ):                
                subprocess.call('ncks' + " " + '-d time,' + str( indexMinTimeStepByAvPeriodList[numAvPeriod][numModel] ) + ',' + str( indexMaxTimeStepByAvPeriodList[numAvPeriod][numModel] )
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + modelNameByAvPeriodListOK[numAvPeriod][numModel]# ncks n'accepte qu'un seul input.
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'commPeriod_' + modelNameByAvPeriodListOK[numAvPeriod][numModel], shell=True)
        # Construction fichiers moyennes, 'MEAN' (nombre =  num pas de temps * nombre de variable(s)):             
            for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
                eachTimeStepStr = communAllTimeStepsByAvPeriodList[numAvPeriod][0][i]
                eachNumTimeStepStr = '%i'%(i)
                for varName in varNameList:
                    #subprocess.call('ncra -v' + " " + varName + " " + '-y mean -d time,' + eachNumTimeStepStr + ',,' + str( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] )
                    subprocess.call('ncra -v' + " " + varName + " " + '-d time,' + eachNumTimeStepStr + ',,' + str( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] )
                    + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'commPeriod' + '*_XYT.nc'
                    # Note : output files finish by Intermed.nc, pas _XYT.nc ce qui permet de les différencier/ fichiers mean finaux (pour les effacer, ...)
                    + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + varName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + 'Intermed.nc', shell=True)
                    
        # Concatenation de ts les fichiers mean créés (ci-dessus) pour avoir un seul fichier mean par Av period et par variable:
            for numVarName in range( len(varNameList) ):
                subprocess.call('ncrcat ' + ncrcatCommandByVarListOK[numAvPeriod][numVarName][0]
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_'+ modelName + '_' + varNameList[numVarName] + '_' + communPeriodYearly + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + 'Intermed.nc', shell=True )                   
                
        # Add these files (Indeed, we need to take in account that if a file has more than one variable ( = n ), numbers of files created by the previous step will be n files) to a new file:
                subprocess.call('ncks -A -v' + " " + varNameList[numVarName]
                + " " +  urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_'+ modelName + '_' + varNameList[numVarName] + '_' + communPeriodYearly + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + 'Intermed.nc'
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_'+ modelName + '_' + communPeriodYearly + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True )
                
    # Remove mean files used to concatenated:
            subprocess.call('rm' + " " + urlDataByModelType  + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + '*Intermed.nc', shell=True)
            #subprocess.call('rm' + " " + urlDataByModelType  + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'commPeriod*', shell=True) --> Effacer à ala fin, on en a besoin pour construire stdDev files.

# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- #    
# Std dev information creation for avPeriod which have more than one timeStep:
    # With nco easy way to apply statistic to one time step for n models (like did for mean information) but for stdDev info, nco is not so easy so I used cdo but in a different way.
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- #    

# 1) Split all models in n files (n = number of time steps f(av period)) à apartir des fichiers ayant période commune, calculés antérieurement: J'ai vérifié avec QGis, OK.
for numAvPeriod in range( len(avPeriods) ):
    if ( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] != 1 ):
        for numVarName in range( len(varNameList) ):
            for numModel in range( len(modelNameByAvPeriodListOK[numAvPeriod]) ):
                for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
                    subprocess.call('ncks -A -v' + " " + varNameList[numVarName] + " " + '-d time,' + str(i) + ',' + str(i)
                    + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'commPeriod_' + modelNameByAvPeriodListOK[numAvPeriod][numModel]
                    + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'commPeriod_' + modelNameByAvPeriodListOK[numAvPeriod][numModel] + '_' + str(i) + 'Intermed.nc', shell=True)

# 2) Calculate and create stdDev for commun time steps for each Av period: test with QGis, OK
for numAvPeriod in range( len(avPeriods) ):
    if ( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] != 1 ):
        for i in range( numCommunAllTimeStepsByAvPeriodList[numAvPeriod][0] ):
                subprocess.call("cdo ensstd"
                #+ " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'commPeriod_fco2' + '*' + '.nc_' + str(i) + 'Intermed.nc'# Nom de fichier sortie comme ça pour compatibilité/script pour vectoriser les fichiers binaires. En effet on a besoin des fichiers de stdDev by timeStep pour construire fichiers binaires.
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'commPeriod' + '*' + '.nc_' + str(i) + 'Intermed.nc'
                + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDevEach' + str(i) + '_' + 'Intermed.nc', shell=True)

# 3)Change variable name of stdDev Files for each time step:
                for varName in varNameList:
                    for varUncertaintyName in varUncertaintyNameList:
                        subprocess.call('ncrename -v ' + varName + ',' + varUncertaintyName
                        + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDevEach' + str(i) + '_' + 'Intermed.nc', shell=True) # This output file name to be used in ncToShp script files.
                        
# 4) Concatenated stdDev files created: test with QGis, OK                       
        subprocess.call('ncrcat ' + ncrcatCommandByAvPeriodStdDevListOK[numAvPeriod][0]
        + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev_' + str( communMinTimeStepByAvPeriod[numAvPeriod] ) + '_' + str( communMaxTimeStepByAvPeriod[numAvPeriod] ) + '_' + 'Intermed.nc', shell = True)

# 5) Add stdDev_ concatenated files to MEAN files:
        for varUncertaintyName in varUncertaintyNameList:
            subprocess.call('ncks -A -v' + " " + varUncertaintyName
            + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev_' + str( communMinTimeStepByAvPeriod[numAvPeriod] ) + '_' + str( communMaxTimeStepByAvPeriod[numAvPeriod] ) + '_' + 'Intermed.nc'
            + " " + urlDataByModelType + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_'+ modelName + '_' + communPeriodYearly + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True )

# 6) Remove files used to construct stdDev information:
    # Note : fichiers stdDevEach + num pas de tps sont gardés, on en a besoin pour effectuer la vectorisation.
        subprocess.call('rm' + " " + urlDataByModelType  + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'commPeriod*', shell=True)
        subprocess.call('rm' + " " + urlDataByModelType  + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev_*Intermed.nc', shell=True)

print('C est fini !')
































