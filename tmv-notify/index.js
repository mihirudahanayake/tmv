// tmv-notify/index.js

// v2 import style for firebase-functions
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

async function sendToUser(userId, title, body) {
  const snap = await db.collection('users').doc(userId).get();
  if (!snap.exists) return;

  const data = snap.data();
  const tokens = Array.isArray(data.fcmTokens) ? data.fcmTokens : [];
  if (!tokens.length) return;

  const message = {
    notification: { title, body },
    tokens,
  };

  await admin.messaging().sendEachForMulticast(message);
}

// Trigger when a doc is created in `notifications` collection
exports.onNotificationCreated = onDocumentCreated(
  'notifications/{notificationId}',
  async (event) => {
    const data = event.data.data();
    const { userId, type } = data;

    let title = 'Task update';
    let body = 'You have a new task notification.';

    if (type === 'accept') {
      title = 'Work accepted';
      body = 'You accepted a new work assignment.';
    } else if (type === 'reject') {
      title = 'Work rejected';
      body = 'You submitted a rejection for a task.';
    } else if (type === 'done') {
      title = 'Task completed';
      body = 'You completed all roles for a task.';
    } else if (type === 'undo-done') {
      title = 'Task updated';
      body = 'You changed the completion status of a task.';
    }

    await sendToUser(userId, title, body);
    logger.info('Notification sent', { userId, type });
  }
);
