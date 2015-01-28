J'ai divisé la création des fichiers d'incertitude en 3 fichiers pour que chacune des étapes soit plus claire.
 - Le 1er fichier permet de créer les fichiers d'incertitude à partir des fichiers de données netCDF.
 - Le 2nd vectorise ces fichiers et els passe donc du format .nc à .shp (format propriétaire de Esri, c'est un des formats les plus utilisés en SIG. A noter qu'il se compose en fait de plusieurs fichiers,
	chacun ayant sa propre extension).
 - Le 3ème automatise le passage de chacun de ces fichiers .shp à un serveur WMS, Geoserver et leur attribue un style.

--> Il est important de noter que si l'on veut refaire l'opération du 2nd script il faut repasser par le 1er script avant (ces scripts sont donc interdépendant et pour arriver àa terminer le
	3ème script il faut recommencer le 1er puis le 2nd !

Chacun de ces scripts fait appel à des librairies qu'il faut donc charger avant de les lancer (précisions dans les README spécifiques à chaque script).

La structure de ces scripts est globalement la même et pour chaque scripts, des commentaires expliquent les diférents pas effectués.
