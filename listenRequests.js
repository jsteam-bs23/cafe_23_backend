const { getFirestore } = require("firebase-admin/firestore");
const findUserById = require("./utils/findUserById");
const notifyEmployee = require("./utils/notifyEmployee");
const notifySupports = require("./utils/notifySupports");

const db = getFirestore();

const observer = db
  .collection("requests")
  .where("requestTime", ">=", new Date())
  .onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        // console.log('New request: ', change.doc.data());
        const request = change.doc.data();
        const employee = await findUserById(request.employee);
        request.employee_name = employee?.name;
        await notifySupports(request);
      }
      if (change.type === "modified") {
        console.log("Modified request: ", change.doc.data());
        const request = change.doc.data();
        const support = await findUserById(request.support);
        request.support_name = support?.name;
        await notifyEmployee(request.employee, request);
      }
      if (change.type === "removed") {
        // console.log('Removed request: ', change.doc.data());
      }
    });
  });
module.exports = {};
