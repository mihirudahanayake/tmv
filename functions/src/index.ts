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

    // Build small payload with task details and any item image URLs
    const dataPayload = {
      taskId: context.params.taskId,
      title: after.title || 'New task assigned',
      description: after.description || ''
    };

    try {
      const assignedItems = after.assignedItems || [];
      if (Array.isArray(assignedItems) && assignedItems.length > 0) {
        const items = [];
        // fetch inventory docs for each item id
        for (const itemId of assignedItems) {
          try {
            const docSnap = await db.collection('inventory').doc(itemId).get();
            if (docSnap.exists) {
              const d = docSnap.data();
              items.push({ id: itemId, itemName: d.itemName || '', imageUrl: d.imageUrl || d.photoURL || '' });
            }
          } catch (e) {
            // ignore individual item errors
            console.warn('failed to fetch inventory item', itemId, e);
          }
        }
        if (items.length) {
          dataPayload.items = JSON.stringify(items);
        }
      }
    } catch (err) {
      console.warn('failed to build items payload', err);
    }

    const message = {
      notification: {
        title: dataPayload.title,
        body: after.title ? (after.description || '') : 'You have a new task'
      },
      data: dataPayload,
      tokens,
    };

    await admin.messaging().sendMulticast(message);
    return null;
  });
