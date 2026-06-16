// src/pages/UserNotificationDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { FaSpinner } from 'react-icons/fa';
import { useUserProfile } from '../hooks/useUserProfile';

const UserNotificationDetail = () => {
  const { notifId } = useParams();
  const { user, profile, loading: loadingProfile } = useUserProfile();
  const [notif, setNotif] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingProfile) return;
    if (!user || !notifId) return;

    const load = async () => {
      try {
        const ref = doc(db, 'users', user.uid, 'notifications', notifId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setNotif({ id: snap.id, ...data });

          if (data.read === false) {
            await updateDoc(ref, { read: true });
          }
        }
      } catch (e) {
        console.error('Failed to load notification', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, notifId, loadingProfile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="user" isTO={!!profile?.isTO} />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-xl">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin" />
            <span>Loading notification...</span>
          </div>
        ) : !notif ? (
          <p className="text-gray-600 text-sm sm:text-base">
            Notification not found.
          </p>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {notif.title || 'Notification'}
            </h1>
            {notif.createdAt?.toDate && (
              <p className="text-xs text-gray-500 mb-4">
                {notif.createdAt.toDate().toLocaleString()}
              </p>
            )}
            {notif.message && (
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                {notif.message}
              </p>
            )}
            {notif.type && (
              <p className="text-xs text-gray-500">
                Type: <span className="font-mono">{notif.type}</span>
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserNotificationDetail;
