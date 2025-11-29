// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

/**
 * Trigger when a task is created or updated.
 * Sends FCM to all assigned users that have fcmToken.
 */
exports.onTaskWrite = functions.firestore
  .document('works/{taskId}')
  .onWrite(async (change, context) => {
    const after = change.after.exists ? change.after.data() : null;
    if (!after) return null;

    const assignedUsers = after.assignedUsers || [];
    if (!Array.isArray(assignedUsers) || assignedUsers.length === 0) {
      return null;
    }

    // Firestore 'in' query supports up to 10 IDs, so chunk if needed
    const chunks = [];
    for (let i = 0; i < assignedUsers.length; i += 10) {
      chunks.push(assignedUsers.slice(i, i + 10));
    }

    const tokens = [];
    for (const group of chunks) {
      const snap = await db
        .collection('users')
        .where(admin.firestore.FieldPath.documentId(), 'in', group)
        .get();

      snap.docs.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.fcmToken) {
          tokens.push(data.fcmToken);
        }
      });
    }

    if (!tokens.length) return null;

    const message = {
      notification: {
        title: 'New task assigned',
        body: after.title || 'You have a new task',
      },
      tokens,
    };

    await admin.messaging().sendMulticast(message);
    return null;
  });
