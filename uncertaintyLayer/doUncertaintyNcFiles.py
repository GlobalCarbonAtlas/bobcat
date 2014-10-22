#!/usr/bin/python
# -*- coding: latin-1 -*-

# ################################################################################################################################################################################################ #
                            # // THIS FILE CREATE UNCERTAINTY .NC FILES THAT WILL BE USED TO CONSTRUCT .SHP FILES IN THE NEXT SCRIPT // #
                            # // Note: Only for MEAN files And for Long term !!!!! // ############################################################################################################################## #
# ################################################################################################################################################################################################ #

import os # CF chp 7.1 python Universite de Pau.
import sys # = To access to python fonctions and objects
from PyQt4.QtCore import * # CF hub.qgis.org/issues/8707

#Lecture et exploitation netCDF :
from cdo import *
cdo = Cdo()# --> Librairie cdo/python.

#To retrieve data, .nc files:
urlToFolderWithNetCdfFiles = "/home/pascal/workSpace/bobcat25_08_14/Flux"

modelName = 'MEAN'# SO ONLY FOR MEAN HERE!!!!

#For Inversion models:
avPeriodInvM = 'longterm-2001-2004'
avPeriodInvList = ['longterm-2001-2004', 'yearlymean', 'monthlymean']
timePeriodInvM = '2001-2004'
#For others and for Inv models:
avPeriodOceLandList = ['longterm-2000-2009', 'yearlymean', 'monthlymean']
uncertaintyVarLand = 'Terrestrial_flux_Uncertainty'
uncertaintyVarOcean = 'Ocean_flux_Uncertainty'
timePeriodLandAndOceM = '2000-2009'
terrestrialFluxType =  'Terrestrial_flux'
oceanFluxType =  'Ocean_flux'


inversionDico = {'modelType': 'Inversions', 'avPeriodLT': 'longterm-2001-2004', 'avPeriodYear': 'yearlymean', 'avPeriodMonth': 'monthlymean', 'modelName': modelName,  'timePeriod': timePeriodInvM, 'uncertaintyVarInvLand': uncertaintyVarLand, 'uncertaintyVarInvOcean': uncertaintyVarOcean}
landMDico = {'modelType': 'LandModels', 'avPeriodLT': 'longterm-2000-2009', 'avPeriodYear': 'yearlymean', 'avPeriodMonth': 'monthlymean', 'modelName': modelName,  'timePeriod': timePeriodLandAndOceM, 'uncertaintyVar': uncertaintyVarLand, 'fluxType':  terrestrialFluxType}
oceanMDico = {'modelType': 'OceanModels', 'avPeriodLT': 'longterm-2000-2009', 'avPeriodYear': 'yearlymean', 'avPeriodMonth': 'monthlymean', 'modelName': modelName,  'timePeriod': timePeriodLandAndOceM, 'uncertaintyVar': uncertaintyVarOcean, 'fluxType':  oceanFluxType}
          
modelsTypeList =  [inversionDico, landMDico, oceanMDico]

# Création et ajout du fichier des moyennes pour Inversion, land et ocean models :
# For Av period = LT only!!!
for modelDico in modelsTypeList: # Ici, il y a un ordre, contrairement aux dico. On commence donc par inversionMDico et aprèes l'avoir fini on passe à autre dico, donc tient en compte values différente même si keys a même nom.
    if (modelDico == inversionDico): # --> Contient à la fois land et ocean dc à traiter à part.
        try:
            # Construction fichier moyenne, 'MEAN' :
            subprocess.call("ncra -y mean" + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/*.nc' + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_'+ modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True)# CF subprocess/python
            # Construction des fichiers de std dev pour extraire uncertainty data/Mean files créés (on prend ts ceux terminant par *XYT.nc pour ne pas prendre le fichier MEAN créé) : avec nco plus compliqué, cdo plus adapté ici. J'ai vérifié avec QGis, OK, correspond à std dev.
            subprocess.call("cdo ensstd" + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/*XYT.nc' + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' +  modelDico['uncertaintyVarInvLand'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True)
            subprocess.call("cdo ensstd" + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/*XYT.nc' + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' +  modelDico['uncertaintyVarInvOcean'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True)
            # Ajout des variables d'incertitude liées aux fichiers MEAN ( = std dev variable) :
                # Step 1 : chger noms variables ds le fichier stdDev.nc
            subprocess.call('ncrename -v Terrestrial_flux,' + modelDico['uncertaintyVarInvLand'] + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' + modelDico['uncertaintyVarInvLand'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True )
            subprocess.call('ncrename -v Ocean_flux,' + modelDico['uncertaintyVarInvOcean'] + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' + modelDico['uncertaintyVarInvOcean'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True )
                # Step 2 : add this variables to the MEAN file:
            subprocess.call('ncks -A -v' + " " + modelDico['uncertaintyVarInvLand'] + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' + modelDico['uncertaintyVarInvLand'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc' + " " +  urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' + 'fco2_'+ modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True )
            subprocess.call('ncks -A -v' + " " + modelDico['uncertaintyVarInvOcean'] + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' + modelDico['uncertaintyVarInvOcean'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc' + " " +  urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' + 'fco2_'+ modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True )
            # Effacer fichiers std dev qui ne st plus utiles :
            subprocess.call("rm" + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/*stdDev*', shell=True)
        except OSError:
            pass
    else: # --> landMDico et oceanMDico :
        try:
            subprocess.call("ncra -y mean" + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/*.nc' + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_'+ modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True)
            subprocess.call("cdo ensstd" + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/*XYT.nc' + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' +  modelDico['uncertaintyVar'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True)
            subprocess.call('ncrename -v' + modelDico['fluxType'] + ',' + modelDico['uncertaintyVar'] + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' + modelDico['uncertaintyVar'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True )
            subprocess.call('ncks -A -v' + " " + modelDico['uncertaintyVar'] + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' +  'fco2_stdDev_' + modelDico['uncertaintyVar'] + '_' + modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc' + " " +  urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/' + 'fco2_'+ modelDico['modelName'] + '_' + modelDico['timePeriod'] + '_' + modelDico['modelType'] + '_' + modelDico['avPeriodLT'] + '.nc', shell=True )
            subprocess.call("rm" + " " + urlToFolderWithNetCdfFiles + '/' + modelDico['modelType'] + '/' + modelDico['avPeriodLT'] + '/*stdDev*', shell=True)
        except OSError:
            pass
          
          
            
            
            
       
        
print('C est fini !')











































