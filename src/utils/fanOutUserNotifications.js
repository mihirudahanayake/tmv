import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';

/**
 * Creates one notification document under `/users/{uid}/notifications/{notifId}` for each uid.
 * Uses batched writes (chunked) to stay under Firestore limits.
 */
export async function fanOutUserNotifications(db, userIds, baseNotification, options = {}) {
  if (!Array.isArray(userIds) || userIds.length === 0) return;
  const fixedDocId = options?.docId || null;

  const chunkSize = 450; // Firestore batch limit is 500
  for (let i = 0; i < userIds.length; i += chunkSize) {
    const batch = writeBatch(db);
    const chunk = userIds.slice(i, i + chunkSize);

    chunk.forEach((uid) => {
      const ref = fixedDocId
        ? doc(db, 'users', uid, 'notifications', fixedDocId)
        : doc(collection(db, 'users', uid, 'notifications'));
      batch.set(ref, {
        ...baseNotification,
        userId: uid,
        createdAt: baseNotification?.createdAt ?? serverTimestamp(),
        read: baseNotification?.read ?? false,
      });
    });

    await batch.commit();
  }
}
