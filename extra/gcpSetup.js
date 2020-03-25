if (process.env.GOOGLE_SERVICE_ACCOUNT_FILENAME && process.env.GCP_CRED) {
    var fs = require('fs');
    var path = require('path');
    fs.writeFileSync(path.join(__dirname, '/../../' + process.env.GOOGLE_SERVICE_ACCOUNT_FILENAME), process.env.GCP_CRED);
}
