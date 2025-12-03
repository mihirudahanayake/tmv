// src/hooks/usePushNotifications.js
import { useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { messaging, db } from '../firebase/config';

// Get this from Firebase console → Project settings → Cloud Messaging → Web push certificates
const VAPID_KEY = 'BCDW2bDpR51kOUCYdebGFw4pHEU_h2159MHvkSEslEdrV0yI0AVUiQikAbClmXfS9EGHHQblUlKTC_To4SaQ7Hg';

export function usePushNotifications(userId) {
  const [token, setToken] = useState(null);
  const [permission, setPermission] = useState(Notification.permission);

  const init = async () => {
    if (!userId) return;

    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return;
    }

    const perm = await Notification.requestPermission();
    setPermission(perm);
    if (perm !== 'granted') {
      console.log('Notification permission not granted');
      return;
    }

    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }

    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (!currentToken) {
      console.log('No FCM token');
      return;
    }

    setToken(currentToken);

    await setDoc(
      doc(db, 'users', userId),
      { fcmTokens: arrayUnion(currentToken) },
      { merge: true }
    );
  };

  onMessage(messaging, (payload) => {
    console.log('Foreground message:', payload);
    const title = payload.notification?.title;
    const body = payload.notification?.body;
    if (title) {
      new Notification(title, {
        body,
        icon: '/icon-192.png'
      });
    }
  });

  return { init, token, permission };
}
