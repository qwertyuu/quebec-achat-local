if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.GCP_CRED) {
    var fs = require('fs');
    try {
        fs.writeFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, process.env.GCP_CRED);
        console.log(fs.existsSync(process.env.GOOGLE_SERVICE_ACCOUNT_JSON));
    } catch (e) {
        console.log(e);
    }
} else {
    console.log("No files to copy, skipping setup");
}
