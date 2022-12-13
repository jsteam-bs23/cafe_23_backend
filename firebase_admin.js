const { cert } = require('firebase-admin/app');
const app = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

app.initializeApp({ credential: cert(serviceAccount) });
module.exports = app;
