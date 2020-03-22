const express = require('express');
const compression = require("compression"); // Express web server framework
const app = express();
app.use('/semantic/dist', express.static('semantic/dist'));
app.use('/assets', express.static('assets'));
app.use(compression({filter: shouldCompress}));
const {GoogleSpreadsheet} = require('google-spreadsheet');
require('dotenv').config();

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
doc.useServiceAccountAuth(require(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)).then(() => {
    doc.loadInfo().then(async () => {
        const resourcesSheet = doc.sheetsByIndex[0];
        const regionsSheet = doc.sheetsByIndex[1];
        let resources;
        let regions = await regionsSheet.getRows();

        const syncData = async () => {
            resources = (await resourcesSheet.getRows()).filter(resource => resource.live === '1');
        };
        await syncData();
        setInterval(syncData, 2000);

        app.set('view engine', 'pug');

        app.get('/', function (req, res) {
            let region = req.query.region;
            let queryResources = resources;
            let currentRegion;
            if (region && region !== 'all') {
                currentRegion = regions.find((regionFilter) => {
                    return region === regionFilter.code;
                });
                queryResources = queryResources.filter((resource) => {
                    return resource.region === region;
                });
            } else {
                currentRegion = regions.find((regionFilter) => {
                    return 'all' === regionFilter.code;
                });
            }
            const hostname = req.protocol + '://' + req.get('host');
            res.render('homepage', {
                resources: queryResources,
                regions, currentRegion,
                hostname,
                fullUrl: hostname + req.originalUrl,
            });
        });

        app.listen(process.env.PORT || 3000);
    });
});

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
}
