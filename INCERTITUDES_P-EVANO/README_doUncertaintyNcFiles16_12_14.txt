Utilité, sens de ce script:
	- Ce script est utilisé pour créer, à partir de différents types de modèles (ex : InversionsModels, LandModels, ...) des fichiers 
   de moyenne pour tous les "averaging period" et toutes les variables.
	- Une fois ces fichiers de moyennes créés, on y ajoute la standard déviation (également pour tous les "averaging period" et toutes les variables).
	- Les fichiers créés par ce script peuvent être utilisés directement dans le GCA en tant que fichiers raster/pixelisés. En effet, ils constituent un 	'modèle' "MEAN" qui peut être ajouté à la liste des autres modèles. De plus, on utilisera l'information de la déviation standard dans avec le mode "Display 	  std dev".
	- On utilisera ensuite l'information de la déviation standard dans un autre script qui nous permettra de vectoriser cette information pixelisée afin 	de la surimposer par transparence. 
 

Comment utiliser ce script ?
	
	- Il devrait se situer sous Obelix à : /home/users/peylin/PROGRAM/CATLAS/INCERTITUDES_P-EVANO/
	- Il faut ensuite charger les modules suivant avant de la lancer en ligne de commande (possibilité d'inscrire ça dans le script ?) :
		"load module python/2.7.5" et load module cdo/1.5.3 (il semble que cela ne fonctionne pas avec les versions plus récentesde cdo ...).


	- Il suffit juste de bien renseigner la partie initiale de ce sript, à partir de :
	###################################################################################
        	#---- Parameters definitions: ------ #
    	# ------Parameters to adapt if necessary: ----------- # 
	###################################################################################
		...
      ... Jusqu'à : 
	############################################################################################################
	# ------------------------------------------------------------------------------------------------------- #    
	# A partir d'ici, plus aucun paramètre n'a besoin d'être rentré, le script peut fonctionner en fonction #
	# ------------------------------------------------------------------------------------------------------- #    
	############################################################################################################   

	- Le reste du script n'a ensuite pas besoin d'être touché mais il y a de tte façon beaucoup de notes qui expliquent les différents pas.

	- Il faut rentrer en ligne de commande python script_name modelType (ex : Inversions).
      L'éxécution peut tarder un peu (quelques minutes) mais on doit pouvoir la lancer directement sous Obelix.  
	Si cela prend vraiment trop de temps, un dossier run_doUncertaintyNcFilesLandModels.job existe (doit être au même emplacement que ce redMe et le script).	

	- Les fichiers créés lors de ce script sont dans un dossier dont la syntaxe est la suivante : withUncertDat_+ modelyTypeName + avPeriodName qui se trouve dans : chemin commun (ici /TEST2/OUTPUT_WEB/) + structure dossiers QUI DOIT TJS ETRE LA MEME : modeleTypeName/avPeriodName/.
	- Seul un fichier nous intéresse dans ce dossier, celui ayant la structure suivante : fco2_MEAN_communPeriodYearly_modelTymeName_avPeriodName_XYT.nc (ex : fco2_MEAN_1982-2011_DATA-DRIVEN_yearlymean_XYT.nc). Ce fichier contient donc comme information la moyenne et la stdDev. 
	- Les autres fichiers (stdDevEach + num pas de temps + _Intermed.nc) ne sont pas effacés lors de ce script (les autres l'ont été) : on en a besoin pour effectuer la vectorisation et le seront donc dans le script suivant.
	
Remarques :

- Les fichiers de données doivent se terminer tous par 'XYT.nc' (utilisation de cette extension pour définir la variable modelNameByAvPeriodListOK).
- Le script donne une erreur ou plutôt un warning lors de la reconnaissance des équivalences entres variables et uncertainty variables. Ceci est normal et n'affecte pas le code.
