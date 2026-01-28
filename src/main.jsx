// src/main.jsx
import { StrictMode, useEffect } from 'react';
import { DarkModeProvider } from './context/DarkModeContext';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { messaging, db, auth } from './firebase/config';
import { getToken } from 'firebase/messaging';
import { doc, updateDoc } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AttendancePage from './pages/AttendancePage';
import AdminCreateEvent from './pages/AdminCreateEvent';
import MeetingsWorkshops from './pages/MeetingsWorkshops.jsx';
import EventAttendees from './pages/EventAttendees.jsx';
import DeptHeadRoute from './components/DeptHeadRoute.jsx';

// Replace this with your real Web Push VAPID key (Project Settings → Cloud Messaging → Web configuration)
const VAPID_KEY = 'BCDW2bDpR51kOUCYdebGFw4pHEU_h2159MHvkSEslEdrV0yI0AVUiQikAbClmXfS9EGHHQblUlKTC_To4SaQ7Hg';

function AppWithFCM() {
  useEffect(() => {
    const init = async () => {
      if (!('serviceWorker' in navigator) || !('Notification' in window)) return;
      const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: reg,
      });
      const user = auth.currentUser;
      if (user && token) {
        await updateDoc(doc(db, 'users', user.uid), {
          fcmToken: token,
        });
      }
    };
    init().catch(console.error);
  }, []);

  return (
    <Routes>
      <Route path="/attendance" element={<AttendancePage />} />
      <Route
        path="/admin-create-event"
        element={
          <DeptHeadRoute>
            <AdminCreateEvent />
          </DeptHeadRoute>
        }
      />
      <Route path="/my-meetings" element={<MeetingsWorkshops />} />
      <Route path="/event-attendees/:eventId" element={<EventAttendees />} />
      <Route path="/*" element={<App />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <AppWithFCM />
      </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>
);
