var fs = require('fs');
fs.writeFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, process.env.GCP_CRED);
