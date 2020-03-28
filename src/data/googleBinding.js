const {GoogleSpreadsheet} = require('google-spreadsheet');

module.exports = (datasetsToBind) => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    doc.useServiceAccountAuth(JSON.parse(process.env.GCP_CRED)).then(() => {
        doc.loadInfo().then(async () => {
            const resourcesSheet = doc.sheetsByIndex[0];
            const regionsSheet = doc.sheetsByIndex[1];
            datasetsToBind.regions = await regionsSheet.getRows();

            const syncData = async () => {
                datasetsToBind.resources = (await resourcesSheet.getRows()).filter(resource => resource.live === '1');
            };
            await syncData();
            // À toutes les 2 secondes, on sonde le spreadsheet et on met à jour les ressources
            // Le max de requêtes aux Google Api c'est 100 par 100 secondes
            setInterval(syncData, 2000);
        });
    });
};
