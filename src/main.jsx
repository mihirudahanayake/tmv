// src/main.jsx
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { messaging, db, auth } from './firebase/config';
import { getToken } from 'firebase/messaging';
import { doc, updateDoc } from 'firebase/firestore';

// Replace this with your real Web Push VAPID key (Project Settings → Cloud Messaging → Web configuration)
const VAPID_KEY = 'BCDW2bDpR51kOUCYdebGFw4pHEU_h2159MHvkSEslEdrV0yI0AVUiQikAbClmXfS9EGHHQblUlKTC_To4SaQ7Hg';

function AppWithFCM() {
  useEffect(() => {
    const init = async () => {
      // Check support
      if (!('serviceWorker' in navigator) || !('Notification' in window)) return;

      // Register the Firebase Messaging service worker
      const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

      // Ask for notification permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

      // Get FCM token
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: reg,
      });

      // Save token to Firestore for the logged-in user
      const user = auth.currentUser;
      if (user && token) {
        await updateDoc(doc(db, 'users', user.uid), {
          fcmToken: token,
        });
      }
    };

    init().catch(console.error);
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithFCM />
  </StrictMode>
);
