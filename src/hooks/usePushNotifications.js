// src/hooks/usePushNotifications.js
import { getToken, onMessage } from 'firebase/messaging';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { messaging, db } from '../firebase/config';

// From Firebase Console → Project settings → Cloud Messaging → Web push certificates
const VAPID_KEY = 'BCDW2bDpR51kOUCYdebGFw4pHEU_h2159MHvkSEslEdrV0yI0AVUiQikAbClmXfS9EGHHQblUlKTC_To4SaQ7Hg';

export async function initPushForUser(userId) {
  if (!userId) return;

  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.log('Notification permission not granted');
    return;
  }

  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/firebase-messaging-sw.js');
  }

  const token = await getToken(messaging, { vapidKey: VAPID_KEY });
  if (!token) {
    console.log('No FCM token');
    return;
  }

  // Save token to user doc
  await setDoc(
    doc(db, 'users', userId),
    { fcmTokens: arrayUnion(token) },
    { merge: true }
  );

  // Foreground messages
  onMessage(messaging, (payload) => {
    const title = payload.notification?.title;
    const body = payload.notification?.body;
    if (!title) return;
    new Notification(title, {
      body,
      icon: '/icon-192.png'
    });
  });
}
