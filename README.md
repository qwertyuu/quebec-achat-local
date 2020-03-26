# quebec-achat-local
Site pour les québécois qui veulent investir dans la consommation locale au Québec


# Setup pour le développement

1. Effectuer la commande `npm ci`
1. Lancer `npm run dev`

Choses importantes à savoir pour développer ce projet:

- Pour le moment, [Pug](https://pugjs.org/api/getting-started.html) est utilisé comme "view engine" et c'est lui qui fait le rendu HTML des pages
- La base de donnée de "développement" est un ensemble de fichiers csv avec la même forme que les feuilles en production (voir le dossier "src/storage")
- La base de donnée de "production" est une Google Spreadsheet
- Vous êtes beau et vous sentez très bon


# Setup pour la production

1. Créer un compte de service chez google et lui donner accès à l'api de google sheets
1. Partagez-lui l'accès à la sheet que vous avez créé pour la base de données personnelle que vous avez créés (via courriel)
1. Créer un .env a partir du .env.example et y inscrire le chemin vers votre clé de service google
1. Indiquer la clé de la feuille google sheet qui contiens les données
1. Effectuer la commande `npm ci`
1. Lancer `npm start`

Vous pouvez maintenant soit utiliser le truc comme tel en lançant `npm start` ou bien en vous créant un lien avec un compte heroku et en faisant `npm run heroku` pour déployer
Pour heroku, vous devez définir les clés d'environnement suivantes:

- GCP_CRED: le contenu du fichier .json de la clé de service google
- GOOGLE_SHEET_ID: l'identifiant de la sheet créée pour la base de données
