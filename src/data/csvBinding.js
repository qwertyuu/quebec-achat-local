const csvParse = require("csv-parse/lib/sync");
const fs = require("fs");

module.exports = (resourcesFile, regionsFile, datasetsToBind) => {
    datasetsToBind.regions = csvParse(fs.readFileSync(regionsFile), {
        columns: true,
        skip_empty_lines: true
    });
    const syncData = () => {
        datasetsToBind.resources = csvParse(fs.readFileSync(resourcesFile), {
            columns: true,
            skip_empty_lines: true
        });
    };
    syncData();
    setInterval(syncData, 2000);
};
