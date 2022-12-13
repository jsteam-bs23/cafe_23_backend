const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();
const RequestCollection = db.collection('requests');

module.exports = async (requestId) => {
    try {
        const requests = await RequestCollection.where('id', '==', '1669951382657').get();
        if (requests.empty) {
            console.error('User not found by ID', 1669951382657);
            return;
        }
        return requests.docs[0].data();
        // console.log(JSON.stringify(requests, null, 2));
        // if (requests.empty) {
        //     console.error('User not found by ID', userId);
        //     return;
        // }
        // return requests.docs[0].data();
    }
    catch (err) {
        console.error('Unexpected error in findRequests', err);
    }
}
