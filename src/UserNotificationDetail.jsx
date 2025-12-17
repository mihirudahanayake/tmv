import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FaCalendarAlt } from 'react-icons/fa';
import { db, auth } from '../firebase/config';
import Header from '../components/Header';

const UserNotificationDetail = () => {
  const { notifId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // get current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  // load this user's notification
  useEffect(() => {
    const load = async () => {
      if (!user || !notifId) return;
      setLoading(true);
      setError('');
      try {
        const ref = doc(db, 'users', user.uid, 'notifications', notifId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setError('Notification not found.');
          setLoading(false);
          return;
        }

        const data = { id: snap.id, ...snap.data() };
        setNotification(data);

        // mark read
        if (!data.read) {
          await updateDoc(ref, { read: true });
        }
      } catch (e) {
        console.error('UserNotificationDetail load error', e);
        setError('Failed to load notification.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, notifId]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="user" />
        <main className="container mx-auto px-4 py-6 max-w-3xl">
          <p>Please log in to view notifications.</p>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="user" />
        <main className="container mx-auto px-4 py-6 max-w-3xl">
          <p>Loading notification...</p>
        </main>
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="user" />
        <main className="container mx-auto px-4 py-6 max-w-3xl">
          <p className="text-red-600 mb-4">{error || 'Notification not found.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Back
          </button>
        </main>
      </div>
    );
  }

  const typeLabel = (() => {
    switch (notification.type) {
      case 'accept':
        return 'Work accepted';
      case 'reject':
        return 'Work rejected';
      case 'done':
        return 'Work done';
      case 'undo-done':
        return 'Work status changed';
      default:
        return 'Notification';
    }
  })();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="user" />
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Notification
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
          >
            Back
          </button>
        </div>

        <section className="mb-4 bg-white rounded-lg shadow p-4">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            {notification.title || typeLabel}
          </p>
          {notification.createdAt && (
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <FaCalendarAlt className="text-gray-500" />
              {notification.createdAt.toDate
                ? notification.createdAt.toDate().toLocaleString()
                : ''}
            </p>
          )}
        </section>

        {notification.message && (
          <section className="mb-4 bg-white rounded-lg shadow p-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Message
            </h2>
            <p className="text-sm text-gray-700">{notification.message}</p>
          </section>
        )}

        {notification.workId && (
          <section className="mb-4 bg-white rounded-lg shadow p-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Related work
            </h2>
            <p className="text-xs text-gray-600">
              Work ID: {notification.workId}
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default UserNotificationDetail;
