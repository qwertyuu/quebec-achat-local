const express = require('express'); // Express web server framework
const app = express();
const {GoogleSpreadsheet} = require('google-spreadsheet');
require('dotenv').config();

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
doc.useServiceAccountAuth(require(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)).then(() => {
  doc.loadInfo().then(async () => {

    const sheet = doc.sheetsByIndex[0];
    let rows = await sheet.getRows();
    setInterval(async () => {
        rows = await sheet.getRows();
    }, 2000);

    app.set('view engine', 'pug');

    app.get('/', function (req, res) {
        res.render('template', {name: rows})
    });

    app.listen(process.env.PORT || 3000);
  });
});
