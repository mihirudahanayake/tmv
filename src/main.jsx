// src/main.jsx
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { messaging, db, auth } from './firebase/config';
import { getToken } from 'firebase/messaging';
import { doc, updateDoc } from 'firebase/firestore';

const VAPID_KEY = 'YOUR_PUBLIC_VAPID_KEY_FROM_FIREBASE';

function AppWithFCM() {
  useEffect(() => {
    const init = async () => {
      if (!('serviceWorker' in navigator)) return;

      const reg = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js'
      );

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: reg
      });

      const user = auth.currentUser;
      if (user && token) {
        await updateDoc(doc(db, 'users', user.uid), {
          fcmToken: token
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
