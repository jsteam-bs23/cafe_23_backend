const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();
const UserCollection = db.collection("users");

module.exports = async () => {
  try {
    const users = await UserCollection.where("userType", "==", "Support").get();
    if (users.empty) {
      console.error("No Support found");
      return [];
    }
    return users.docs.map((user) => user.data());
  } catch (err) {
    console.error("Unexpected error in findUserById", err);
    return [];
  }
};
