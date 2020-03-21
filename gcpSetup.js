var fs = require('fs');
fs.writeFileSync(process.env.GCP_KEY_FILE, process.env.GCP_CRED);
