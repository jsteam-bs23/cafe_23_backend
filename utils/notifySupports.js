const findSupports = require("./findSupports");
const sendNotification = require("./sendNotification");
const orderableItems = require("./orderableItems");

/**
 * @param {object} request
 * @param {string} request.employee
 * @param {string[]} request.items
 * @param {string} request.room
 */

module.exports = async (request) => {
  try {
    const supports = await findSupports();
    if (supports.length === 0) {
      console.error("No staff found");
      return;
    }
    const tokens = supports
      .filter(
        (support) =>
          support.branch === request.branch && support.floor === request.floor
      )
      .map((support) => support.fcmToken);

    const title = "New request!";
    const body = `${request.employee_name} requested ${request.items
      .map((item) => orderableItems.find((oi) => oi.id === item.id).name)
      .join(", ")}.`;

    await sendNotification({ body, title, tokens });
  } catch (err) {
    console.error(err);
  }
};
