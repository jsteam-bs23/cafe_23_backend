const findUserById = require("./findUserById");
const sendNotification = require("./sendNotification");

/**
 * @param {string} userId
 * @param {object} request
 * @param {string} request.staff
 * @param {string[]} request.items
 */

module.exports = async (userId, request) => {
  try {
    const user = await findUserById(userId);
    if (!user) {
      console.error("User not found");
      return;
    }
    const tokens = [user.fcmToken];

    const title = "Request confirmation!";
    const body = `Your request has been confirmed by ${request.support_name}.`;

    await sendNotification({ body, title, tokens });
  } catch (err) {
    console.error(err);
  }
};
