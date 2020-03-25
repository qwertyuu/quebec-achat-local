const express = require('express');
const compression = require("compression");
const path = require('path');
const bindCsv = require('./data/csvBinding');
const bindGoogleSheet = require('./data/googleBinding');
require('dotenv').config();

// Mise en place du serveur express
const app = express();
app.use('/assets', express.static('assets'));
app.use(compression({filter: shouldCompress}));
app.enable('trust proxy');

const datasets = {
    regions: [],
    resources: [],
};
const argv = require('minimist')(process.argv.slice(2));

// TODO: Déplacer la logique de choix de source ailleurs et quelque part de plus brillant qu'un if lorsque nécessaire
let source = argv.source || "gsheet";

if (source === "csv") {
    bindCsv(
        argv.resources || path.join(__dirname, "/storage/example-resources.csv"),
        argv.regions || path.join(__dirname, "/storage/example-regions.csv"),
        datasets
    );
} else {
    bindGoogleSheet(datasets);
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function (req, res) {
    let regionResources = [];
    let currentRegion;
    let allRegion = {};
    let allResources = [];
    if (datasets.regions.length && datasets.resources.length) {
        let region = req.query.region;

        // La région "all", soit tout le Québec
        allRegion = datasets.regions.find((regionFilter) => {
            return regionFilter.code === 'all';
        });
        // Les ressources qui désservent tout le Québec
        allResources = datasets.resources.filter((resource) => {
            return resource.region === 'all';
        });

        // TODO: Éventuellement retourner toutes les ressources au frontend et il va s'occuper de les filtrer
        if (region) {
            currentRegion = datasets.regions.find((regionFilter) => {
                return region === regionFilter.code;
            });
        }

        if (currentRegion) {
            regionResources = datasets.resources.filter((resource) => {
                return resource.region === region;
            });
        } else {
            // Cas spécial si un finfinaud écrit de la merde dans le query param, on fait comme si on avait rien vu ;)
            currentRegion = allRegion;
        }
    }

    const hostname = req.protocol + '://' + req.get('host');
    res.render('homepage', {
        regionResources,
        regions: datasets.regions,
        currentRegion: currentRegion || {},
        hostname,
        allRegion,
        allResources,
        fullUrl: hostname + req.originalUrl,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Québec achat local roule ici: http://localhost:" + port + ", amusez vous!");
});

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
}
