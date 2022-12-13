const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();
const UserCollection = db.collection('users');

module.exports = async (userId) => {
    try {
        const users = await UserCollection.where('bsId', '==', userId).get();
        if (users.empty) {
            console.error('User not found by ID', userId);
            return null;
        }
        return users.docs[0].data();
    }
    catch (err) {
        console.error('Unexpected error in findUserById', err);
    }
}
