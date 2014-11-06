#!/usr/bin/env python
# -*- coding: latin-1 -*-

# ################################################################################################################################################################################################ #
                            # // THIS FILE CREATES UNCERTAINTY .NC FILES THAT WILL BE USED TO CONSTRUCT .SHP FILES IN THE NEXT SCRIPT // #
                            # // THIS FILE CREATES TOO FILES WITH UNCERTAINTY INFO THAT WILL BE DISPLAYED IN GCA LIKE A NORMAL LAYER. // #
                            # // Note: Only for MEAN files // ############################################################################################################################## #
# ################################################################################################################################################################################################ #

import os # CF chp 7.1 python Universite de Pau.
import sys # = To access to python fonctions and objects
from PyQt4.QtCore import * # CF hub.qgis.org/issues/8707

#Lecture et exploitation netCDF :
from cdo import *
cdo = Cdo()# --> Librairie cdo/python.
import glob
#import cdms # climate data management system. --> Il faut linstaller avant, voir message JY Peterschmidt (ortho ?).
#import cdms2 as cdms 

###################################################################################
        #---- How to use this script: ------ #
###################################################################################
'''
 1) This script works based on the structure of netCDF data file like this :
     This-script.py/modelType/averagingPeriod, with modelType = 'Inversion', 'LandModels', ... and with averagingPeriod = 'monthlymean', 'longterm-2001-2004', ...
     ... so place this-script to the same place in your machine!!!
'''

###################################################################################
        #---- Parameters definitions: ------ #
###################################################################################
#To retrieve data, .nc files:
scriptFolderUrl = os.getcwd()# --> url to folder where is this script.
modelName = 'MEAN'# SO ONLY FOR MEAN HERE!!!!

# Def basic parameters to construct all the files with uncertainty info.
modelsTypeList = ['Inversions', 'LandModels', 'OceanModels']
avPeriod4InvMList = ['longterm-2001-2004', 'yearlymean', 'monthlymean']# Can be actualized if needing (divided by models type because avPeriod change f(models type))
avPeriod4LandMList = ['longterm-2000-2009', 'yearlymean', 'monthlymean']
avPeriod4OceanMList = ['longterm-2000-2009', 'yearlymean', 'monthlymean']
# Important note: respect this orden for avPeriods lists : don't put first 'yearlymean' for ex !!!

# Def variables f(model type): could be diferent f(models so need to be adapt if necessary):
varName4InvMList = ['Terrestrial_flux', 'Ocean_flux']
varName4LandMList = ['Terrestrial_flux']
varName4OceanMList = ['Ocean_flux']
# Def uncertainty variables f(model type): could be diferent f(models so need to be adapt if necessary)
varUncertaintyName4InvMList = ['Terrestrial_fluxUncertainty', 'Ocean_fluxUncertainty']
varUncertaintyName4LandMList = ['Terrestrial_fluxUncertainty']
varUncertaintyName4OceanMList = ['Ocean_fluxUncertainty']

allMonthStr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']#Usefull to concatenate monthly files (Set all time steps:). We assum that number of month by years are the same for all the models. To adapt if in the futur it changes.

# Def numero time steps f(averaging period) (will be defined later in the script). Note : add/adapt if needing.
numTimeStepsLt = [1]# By def, for long term, only one time step. 
numTimeStepsYear = []# Created like a list because if we set a value, not actualized when value changed in the script if passed in numTimeSteps4AllAvPeriodList.
numTimeStepsMonth = []

# Def all time steps f(averaging period): --> same principles than Def numero time steps.
# But in this case take in account that for av period lont term, different f(model type):
allCommunTimeSteps4InvMLtListStr = ['2001-2004']
allCommunTimeSteps4LandMLtListStr = ['2000-2009']
allCommunTimeSteps4OceanMLtListStr = ['2000-2009']
allCommunTimeStepsYearListStr = []
allCommunTimeStepsMonthListStr = []

#Def chaine de charactères pour effectuer concatenation/ fichiers mean par pas de temps. --> same principles than Def numero time steps.
# Prend en compte ts les pas de temps sauf le long term ou la concatenation n'est pas necessaire.

ncrcatCommandYearly = []
ncrcatCommandMonthly = []
ncrcatCommand4StdDevYearly = []
ncrcatCommand4StdDevMonthly = []

# f(model type choose by user, adapt all these parameters (some of them are different f(model types))):
modelsTypeChoose = sys.argv[1]

if (modelsTypeChoose == 'Inversions'):
    avPeriods = avPeriod4InvMList
    varNameList = varName4InvMList
    varUncertaintyNameList = varUncertaintyName4InvMList
    numTimeSteps4AllAvPeriodList = [ numTimeStepsLt, numTimeStepsYear, numTimeStepsMonth ]# Actually all model types have the same Averaging periods but could be not the case in the futur so better to set for each model type.
    allCommunTimeSteps4AllAvPeriodListStr = [ allCommunTimeSteps4InvMLtListStr,  allCommunTimeStepsYearListStr, allCommunTimeStepsMonthListStr ]
    ncrcatCommandList = [ncrcatCommandYearly, ncrcatCommandMonthly ]
    ncrcatCommand4StdDevList = [ncrcatCommand4StdDevYearly, ncrcatCommand4StdDevMonthly ]
    
if (modelsTypeChoose == 'LandModels'):
    avPeriods = avPeriod4LandMList
    varNameList =varName4LandMList
    varUncertaintyNameList = varUncertaintyName4LandMList
    numTimeSteps4AllAvPeriodList = [ numTimeStepsLt, numTimeStepsYear, numTimeStepsMonth ]
    allCommunTimeSteps4AllAvPeriodListStr = [ allCommunTimeSteps4LandMLtListStr,  allCommunTimeStepsYearListStr, allCommunTimeStepsMonthListStr ]
    ncrcatCommandList = [ncrcatCommandYearly, ncrcatCommandMonthly ]
    ncrcatCommand4StdDevList = [ncrcatCommand4StdDevYearly, ncrcatCommand4StdDevMonthly ]
    
if (modelsTypeChoose == 'OceanModels'):
    avPeriods = avPeriod4OceanMList
    varNameList = varName4OceanMList
    varUncertaintyNameList = varUncertaintyName4OceanMList
    numTimeSteps4AllAvPeriodList = [ numTimeStepsLt, numTimeStepsYear, numTimeStepsMonth ]# Note : len(numTimeSteps4AllAvPeriodList) et len(allCommunTimeSteps4AllAvPeriodListStr), len(avPeriods) must be the same!!!
    allCommunTimeSteps4AllAvPeriodListStr = [allCommunTimeSteps4OceanMLtListStr,  allCommunTimeStepsYearListStr, allCommunTimeStepsMonthListStr ]
    ncrcatCommandList = [ncrcatCommandYearly, ncrcatCommandMonthly ]
    ncrcatCommand4StdDevList = [ncrcatCommand4StdDevYearly, ncrcatCommand4StdDevMonthly ]
    

# TODO: 
# Preciser que ces listes peuvent s'amplifier manuellement si on ajoute des trucs ds le futur.
# Ensuite grace a sys.argv, on demandera de preciser le modeles type choisi en proposant choix de la liste et en fonction modele type, on définira automatiquement ts les autres paramètres.

###############################################################################################################################################################
# Retrieve commun period pour un model type (entrée utilisateur) pour chq Av period sauf long term, non nécessaire. --> Necessary to construct the mean
# And retrieve set time steps too.
###############################################################################################################################################################
# For yearlymean :
avPeriod = 'yearlymean'
modelsInFolderList = glob.glob(scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + '*.nc')# glob.glob: retourne liste avec chemin complet des files correspondant à la recherche
maxTimeStepYearListByAvPeriod = list()
minTimeStepYearListByAvPeriod = list()
for modelType in modelsInFolderList:# Boucle sur chq modele présent dans le répertoire pointé.
    timeStepYear = cdo.showyear(input = modelType, shell=True)# Return liste with only one value (string) so:
    timeStepYear = timeStepYear[0]
    timeStepYear = timeStepYear.split(" ")
    maxTimeStepYear = max(timeStepYear)#Le max de chq modele présent ds le répertoire pointé.
    maxTimeStepYearListByAvPeriod.append(maxTimeStepYear)
    minTimeStepYear = min(timeStepYear)#Le min de chq modele présent ds le répertoire pointé.
    minTimeStepYearListByAvPeriod.append(minTimeStepYear)
maxMinTimeStepYear4AllModelsStr = max(minTimeStepYearListByAvPeriod)# --> min commun period for one Av period.
minMaxTimeStepYear4AllModelsStr = min(maxTimeStepYearListByAvPeriod)# --> max commun period for one Av period.      
#  Set num time steps (useful to concatenate files):
numTimeStepsYear.append( len(timeStepYear) )
# Set all time steps:
allCommunTimeStepsYearListStr.append(timeStepYear)

# For monthlymean :
avPeriod = 'monthlymean'
modelsInFolderList = glob.glob(scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + '*.nc')
maxTimeStepMonthListByAvPeriod = list()
minTimeStepMonthListByAvPeriod = list()
for modelType in modelsInFolderList:# Boucle sur chq modele présent dans le répertoire pointé.
    timeStepMonth = cdo.showdate(input = modelType, shell=True)
    timeStepMonth = timeStepMonth[0]
    timeStepMonth = timeStepMonth.replace('-16', '')# Enlever parce que apparaît comme format par defaut avec cdo.showdate (on ne veut pas les jours)
    timeStepMonth = timeStepMonth.split("  ")# Attention, 2 espaces ici (réponse cdo pas très bien faite !)
    maxTimeStepMonth = max(timeStepMonth)
    maxTimeStepMonthListByAvPeriod.append(maxTimeStepMonth)
    minTimeStepMonth = min(timeStepMonth)
    minTimeStepMonthListByAvPeriod.append(minTimeStepMonth)
maxMinTimeStepMonth4AllModelsStr = max(minTimeStepMonthListByAvPeriod)
minMaxTimeStepMonth4AllModelsStr = min(maxTimeStepMonthListByAvPeriod)
#  Set num time steps (useful to concatenate files):
numTimeStepsMonth.append( len(timeStepMonth) )
# Set all time steps:
allCommunTimeStepsMonthListStr.append(timeStepMonth)

print( allCommunTimeSteps4AllAvPeriodListStr[0][0] ) # --> ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010']


###########################################################
# ... Add and adapt other averaging period if needing ....
###########################################################

#View info:
print 'Time steps for yearly averaging for model type: ' + sys.argv[1] + ' = ' + str(numTimeStepsYear[0])
print 'Time steps for monthly averaging for model type: ' + sys.argv[1] + ' = ' + str(numTimeStepsMonth[0])
print 'Min and max value at yearly averaging period for model type: ' + sys.argv[1] + ' = ' + maxMinTimeStepYear4AllModelsStr, minMaxTimeStepYear4AllModelsStr # --> Ex: ('2001', '2004')
print 'Min and max value at monthly averaging period for model type: ' + sys.argv[1] + ' = ' + maxMinTimeStepMonth4AllModelsStr, minMaxTimeStepMonth4AllModelsStr# --> Ex : ('2001-01', '2004-12')

############################################################################################################################
# Create folders (for land, ocean, inversion and for longterm, yearly and monthly means) to receive created files: 
# Test if file exist before created: if exist, remove and turn to create. If not, create --> To avoid to have to replace files.
############################################################################################################################
for avPeriod in avPeriods:
    if os.path.exists(scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod):
        try:
            subprocess.call('rm -rf' +  " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod, shell = True)
            subprocess.call('mkdir' +  " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod, shell = True)
        except OSError:
            pass
    else:
        try:
            subprocess.call('mkdir' +  " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod, shell = True)
        except OSError:
            pass             
        
#####################################################################################################################################
# Previous steps: create call to all files to not have to bucle to ncrcat command (we need to fixed the output/ncrcat)        
    # Need to define  ncrcatCommand for each Av period so to adapt if num Av period change.
numAvPeriodYearly = 1 # --> = yearlymean
ncrcatCommandYearlyStr = 'ncrcat '
for i in range( numTimeSteps4AllAvPeriodList[numAvPeriodYearly][0] ):
    avPeriod = avPeriods[numAvPeriodYearly]
    eachTimeStepStr = allCommunTimeSteps4AllAvPeriodListStr[numAvPeriodYearly][0][i]
    ncrcatCommandYearlyStr = ncrcatCommandYearlyStr + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod + '/' + 'fco2_' + modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriod + '_XYT.nc' + " " 
ncrcatCommandYearly.append(ncrcatCommandYearlyStr)

numAvPeriodMonthly = 2 # --> = monthlymean
ncrcatCommandMonthlyStr = 'ncrcat '
for i in range( numTimeSteps4AllAvPeriodList[numAvPeriodMonthly][0] ):
    avPeriod = avPeriods[numAvPeriodMonthly]
    eachTimeStepStr = allCommunTimeSteps4AllAvPeriodListStr[numAvPeriodMonthly][0][i]
    ncrcatCommandMonthlyStr = ncrcatCommandMonthlyStr + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod + '/' + 'fco2_' + modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriod + '_XYT.nc' + " "      
ncrcatCommandMonthly.append(ncrcatCommandMonthlyStr)    

    # The same for ncrcat to construct stdDev information:
ncrcatCommand4StdDevYearlyStr = 'ncrcat '
for i in range( numTimeSteps4AllAvPeriodList[numAvPeriodYearly][0] ):
     avPeriod = avPeriods[numAvPeriodYearly]
     eachTimeStepStr = allCommunTimeSteps4AllAvPeriodListStr[numAvPeriodYearly][0][i]
     ncrcatCommand4StdDevYearlyStr = ncrcatCommand4StdDevYearlyStr + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod + '/' + 'stdDev' + str(i) + '.nc' + " " 
ncrcatCommand4StdDevYearly.append( ncrcatCommand4StdDevYearlyStr )
     
ncrcatCommand4StdDevMonthlyStr = 'ncrcat '
for i in range( numTimeSteps4AllAvPeriodList[numAvPeriodMonthly][0] ):
     avPeriod = avPeriods[numAvPeriodMonthly]
     eachTimeStepStr = allCommunTimeSteps4AllAvPeriodListStr[numAvPeriodMonthly][0][i]
     ncrcatCommand4StdDevMonthlyStr = ncrcatCommand4StdDevMonthlyStr + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriod + '/' + 'withUncertDat_' + sys.argv[1] + avPeriod + '/' + 'stdDev' + str(i) + '.nc' + " "     
ncrcatCommand4StdDevMonthly.append( ncrcatCommand4StdDevMonthlyStr ) 
     
###########################################################################################     
for numAvPeriod in range( len(avPeriods) ):# avPeriods specific for each model.
    # Boucle sur numTimeSteps4AllAvPeriod f(av period donc) ( = i):
    for i in range( numTimeSteps4AllAvPeriodList[numAvPeriod][0] ):#[0] : On récupère la valeur de numTimeSteps f(Av period) définie préalablement.
    # -------------------------------------------------------------------------------------------------- #
    # --------------------------- Av period = longterm: ------------------------------------------------ #
    # -------------------------------------------------------------------------------------------------- #
        if (numAvPeriod == 0 ):
            eachTimeStepStr = allCommunTimeSteps4AllAvPeriodListStr[0][0]
            #print(eachTimeStepStr)# --> OK
            # Construction du fichier moyenne, 'MEAN':
            subprocess.call('ncra -y mean'
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/*_XYT.nc'
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True)
            # Construction des fichiers de std dev : avec nco plus compliqué, cdo plus adapté ici. J'ai vérifié avec QGis, OK, correspond à std dev.
            subprocess.call("cdo ensstd"            
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/*XYT.nc'
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' +  'fco2_stdDev_' + modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '.nc', shell=True)
            # Ajout des variables d'incertitude liées aux fichiers MEAN ( = std dev variable) :
                # Step 1 : chger noms variables ds le fichier stdDev.nc
            for varName in varNameList:
                for varUncertaintyName in varUncertaintyNameList:
                    subprocess.call('ncrename -v ' + varName + ',' + varUncertaintyName
                    + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' +  'fco2_stdDev_' + modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '.nc', shell=True )
                 # Step 2 : add this variables to the MEAN file:
                    subprocess.call('ncks -A -v' + " " + varUncertaintyName
                    + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' +  'fco2_stdDev_' + modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '.nc'
                    + " " +  scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_'+ modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True )
            # Remove stdDev file created:
            subprocess.call('rm' + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' +  'fco2_stdDev_' + modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '.nc', shell=True)
            
   # -------------------------------------------------------------------------------------------------- #  
   # --------------------------- Others Av period: ---------------------------------------------------- # 
   # -------------------------------------------------------------------------------------------------- #

        else:# --> Not long term so we have to take in account num time steps.
            eachTimeStepStr = allCommunTimeSteps4AllAvPeriodListStr[numAvPeriod][0][i]
            eachNumTimeStepStr = '%i'%(i)
            # Construction fichiers moyennes, 'MEAN' (nombre =  num pas de temps f(av period et model type)):
            subprocess.call('ncra -y mean -d time,' + eachNumTimeStepStr + ',,' + str( numTimeSteps4AllAvPeriodList[numAvPeriod][0] )
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/*_XYT.nc'
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell=True)
            
# Concatenation de ts les fichiers mean créés pour avoir un seul fichier mean par Av period :
numAvPeriod = 1 # Pour ne pas prendre le 1er av period (long term)
for ncrcatCommands in ncrcatCommandList:
    allTimeStepsByAvPeriodStr = allCommunTimeSteps4AllAvPeriodListStr[numAvPeriod][0]
    subprocess.call(ncrcatCommands[0]
    + " " +  scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + allTimeStepsByAvPeriodStr[0] + '-' + allTimeStepsByAvPeriodStr[-1] + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell = True)
    numAvPeriod = numAvPeriod + 1# Pour ne pas effectuer boucles/numAvPeriod, output doit etre unique.
    
# Remove mean files used to concatenated:
for numAvPeriod in range( len(avPeriods) ):
    if ( numAvPeriod != 0 ):
        for i in range( numTimeSteps4AllAvPeriodList[numAvPeriod][0] ):
            eachTimeStepStr = allCommunTimeSteps4AllAvPeriodListStr[numAvPeriod][0][i]
            subprocess.call('rm' + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' +  eachTimeStepStr + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod]+ '_XYT.nc', shell=True)
            
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- #    
# Std dev information creation for other av periods than long term:
    # With nco easy way to apply statistic to one time step for n models (like did for mean information) but for stdDev info, nco is not so easy so I used cdo but in a different way.
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- #    
# 1) Split all models in n files (n = number of time steps f(av period)):
for numAvPeriod in range( len(avPeriods) ):
    if ( numAvPeriod != 0 ):# Pour ne pas prendre la 1er (long term)
        onlyModelNameByAvPeriod = os.listdir( scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] )# --> Return list with name of each models (str)
        modelNameByAvPeriod = glob.glob(scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + '*.nc')
        for numModelNameByAvPeriod in range( len(modelNameByAvPeriod) ):
            subprocess.call("cdo splitsel,1"
            + " " + modelNameByAvPeriod[numModelNameByAvPeriod]
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + onlyModelNameByAvPeriod[numModelNameByAvPeriod], shell=True)
# 2) Calculate stdDev for commun time steps for each Av period:
        for i in range( numTimeSteps4AllAvPeriodList[numAvPeriod][0] ):
            #print(i)
            subprocess.call("cdo ensstd"
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + '*' + '_XYT' + '*' + str(i) + '.nc'# Les fichiers créés lors de l'étape précédente avec cdo splitsel se terminent par 0, 1, 2, ..., n, n étant le num de pas de temps.
            + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev' +  str(i) + '.nc', shell=True)
# 3) Change variable name of stdDev Files:
            for varName in varNameList:
                for varUncertaintyName in varUncertaintyNameList:
                    subprocess.call('ncrename -v ' + varName + ',' + varUncertaintyName
                    + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev' + str(i) + '.nc', shell=True )
# 4) Concatenated stdDev files for each av period:
numAvPeriod = 1 # Pour ne pas prendre le 1er av period (long term).
for ncrcatCommandStdDev in ncrcatCommand4StdDevList:
    subprocess.call(ncrcatCommandStdDev[0]
    + " " +  scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev' + '_' + sys.argv[1] + '_' +  avPeriods[numAvPeriod] + '_XYT.nc', shell = True)
    numAvPeriod = numAvPeriod + 1
# 5) Add stdDev concatenated files to MEAN files:
for numAvPeriod in range( len(avPeriods) ):
    if ( numAvPeriod != 0 ):
        allTimeStepsByAvPeriodStr = allCommunTimeSteps4AllAvPeriodListStr[numAvPeriod][0]
        for varUncertaintyName in varUncertaintyNameList:
            subprocess.call('ncks -A -v' + " " + varUncertaintyName
            + " " +  scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev' + '_' + sys.argv[1] + '_' +  avPeriods[numAvPeriod] + '_XYT.nc'
            + " " +  scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'fco2_' + modelName + '_' + allTimeStepsByAvPeriodStr[0] + '-' + allTimeStepsByAvPeriodStr[-1] + '_' + sys.argv[1] + '_' + avPeriods[numAvPeriod] + '_XYT.nc', shell = True)
    
# 6) Remove files (created by cdo splitsel, files to create stdDev info and files to create concatenated mean files:
for numAvPeriod in range( len(avPeriods) ):
    if ( numAvPeriod != 0 ):
        subprocess.call('rm' + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + '*nc00*', shell=True)# nc00 : vient du format donné par cdo splitsel.
        subprocess.call('rm' + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'withUncertDat_*', shell=True)# Parce que création de fichiers avec ce nom lors de splitse (avec listdir().
        subprocess.call('rm' + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev' + '_' + sys.argv[1] + '_' +  avPeriods[numAvPeriod] + '_XYT.nc', shell=True)
        for i in range( numTimeSteps4AllAvPeriodList[numAvPeriod][0] ):
            subprocess.call('rm' + " " + scriptFolderUrl + '/' + sys.argv[1] + '/' + avPeriods[numAvPeriod] + '/' + 'withUncertDat_' + sys.argv[1] + avPeriods[numAvPeriod] + '/' + 'stdDev' +  str(i) + '.nc', shell=True)
            
            


print('C est fini !')
































