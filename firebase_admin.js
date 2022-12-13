const { cert } = require("firebase-admin/app");
const app = require("firebase-admin");

app.initializeApp({ credential: cert(JSON.parse(process.env.serviceAccount)) });
module.exports = app;
