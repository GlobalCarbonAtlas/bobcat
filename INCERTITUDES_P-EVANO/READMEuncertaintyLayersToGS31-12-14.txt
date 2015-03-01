Utilité, sens de ce script:
 - Les fichiers binaires et vectoriaux sont uniques pour chaque pas de temps donc il y a beaucoup de fichiers possibles :
	 nombre = numTimeSteps*numVariables*AvPeriod*numModelType*numThresholds*numRepresentationModality
 - Il est donc impossible de passer tous ces fichiers àa la main à Geoserver ...
 - Ce script sert donc à automatiser toutes les étapes nécessaires au transfert des couches à GS (création d'un workspace, attribution du style, définition de la projection, ...).

Son fonctionnement est le même que celui des 2 autres fichiers précédents et toutes les étapes sont explicitées dans le script.

Remarques :
- Ce script est le plus long et de loin, donc utiliser job. Pour Inversions et 2 variables, à peu près 30' ...
- Il faut le faire avec une connection internet stable parce que sinon, le processus de transfert s'arrête. Eviter donc la wifi ou des micro coupures sont fréquentes !
- Les fichiers gardés le sont dans un même workspace, donc :
	- Avant de relancer le script il faut aller dans Geoserver et effacer le worspace en question (depuis l'interface graphique de GS) sinon, le script affiche une erreur.

