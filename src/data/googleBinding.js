const {GoogleSpreadsheet} = require('google-spreadsheet');

module.exports = (datasetsToBind) => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    doc.useServiceAccountAuth(require(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)).then(() => {
        doc.loadInfo().then(async () => {
            const resourcesSheet = doc.sheetsByIndex[0];
            const regionsSheet = doc.sheetsByIndex[1];
            datasetsToBind.regions = await regionsSheet.getRows();

            const syncData = async () => {
                datasetsToBind.resources = (await resourcesSheet.getRows()).filter(resource => resource.live === '1');
            };
            await syncData();
            //setInterval(syncData, 2000);
        });
    });
};
