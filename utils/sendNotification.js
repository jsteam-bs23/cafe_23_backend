const app = require("../firebase_admin");

module.exports = async ({ title, body, tokens }) => {
  try {
    const result = await app.messaging().sendMulticast({
      tokens,
      notification: {
        title,
        body,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
