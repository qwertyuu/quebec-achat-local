# quebec-achat-local
Preuve de concept pour les québecois qui veulent acheter local pendant la crise du COVID-19


# Setup

1. Créer un compte de service chez google et lui donner accès à l'api de google sheets
1. Partagez-lui l'accès à la sheet que vous avez créé pour la base de données personnelle que vous avez créés (via courriel)
1. Créer un .env a partir du .env.example et y inscrire le chemin vers votre clé de service google
1. Indiquer la clé de la feuille google sheet qui contiens les données
1. Effectuer la commande `npm ci`

Vous pouvez maintenant soit utiliser le truc comme tel en lançant `npm start` ou bien en vous créant un lien avec un compte heroku et en faisant `npm run heroku` pour déployer
