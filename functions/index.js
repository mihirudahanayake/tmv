// functions/index.js
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

async function sendWorkAssignedNotification(userId, title, body) {
  const userSnap = await db.collection('users').doc(userId).get();
  if (!userSnap.exists) return;

  const { fcmTokens = [] } = userSnap.data();
  if (!Array.isArray(fcmTokens) || fcmTokens.length === 0) return;

  const message = {
    notification: { title, body },
    tokens: fcmTokens,
  };

  const res = await admin.messaging().sendEachForMulticast(message);
  console.log('Push result', res.successCount, 'successes');
}

exports.onWorkCreated = require('firebase-functions').firestore
  .document('works/{workId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const userIds = data.assignedUsers || [];

    const promises = userIds.map((uid) =>
      sendWorkAssignedNotification(
        uid,
        `New work assigned: ${data.title}`,
        data.description || ''
      )
    );
    await Promise.all(promises);
  });
