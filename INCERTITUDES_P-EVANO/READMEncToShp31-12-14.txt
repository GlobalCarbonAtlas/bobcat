Utilité, sens de ce script:
	- Ce script est utilisé pour vectoriser les fichiers de stdDev pour chaque pas de temps créés lors du script : "doUncertaintyNcFiles".
	- Ce sont en effet ces fichiers vectorisés qui seront appelés par l'interface du GCA lors de "Overlay st dev".
	- Lors de ce script, on a donc rajouté une variable (le "threshold") à chacun de ces fichiers.
	- Pouquoi a t'on eu besoin de vectoriser les fichiers ?
		--> C'est la solution trouvée pour pouvoir utiliser la possibilité d'ajouter au dessus de la couche des données une couche avec des symboles et transparente.
		En effet, la représentation des données via le protocole WMS (sous forme de tuiles) n'est pas adaptée pour associer
		des symboles à chaque valeur de pixel. Dans le contexte du projet GeoViQua, un effort a été fait pour le serveur utilisé (ncWMS) mais la configuration utilisée n'est pas compatible.
		Cette utilisation de symboles est par contre facile pour les fichiers vecteurs.
		A priori, les futurs serveurs WMS devraient dans un futur (proche ?) permettre d'amplifier la symbolisation liée aux fichiers raster. A suivre donc ...


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
	Si cela prend vraiment trop de temps, un dossier run_doUncertaintyNcFilesLandModels.job existe (doit être au même emplacement que ce readMe et le script).

	- Les fichiers créés lors de ce script sont dans un dossier dont la syntaxe est la suivante :  binary + avPeriodName + modelTypeName + thr- + num thresholds + _ + numTimeStep + uncertaintyVarName + respresentationMode (st ou mk) + _fco2.shp qui se trouve dans : chemin commun (ici /TEST2/OUTPUT_WEB/) + structure fichiers QUI DOIT TJS ETRE LA MEME : modeleTypeName/avPeriodName/.
	- A noter que les fichiers stdDevEach + num pas de temps + _Intermed.nc créés lors du script antérieur sont effacés lors de ce script.

	
Remarques :

