const { cert } = require("firebase-admin/app");
const app = require("firebase-admin");
// const serviceAccount = require("./config/serviceAccountKey.json");

console.log(process.env.serviceAccount);

app.initializeApp({ credential: cert(JSON.parse(process.env.serviceAccount)) });
module.exports = app;
