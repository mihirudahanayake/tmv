import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { FaCalendarAlt } from 'react-icons/fa';
import { db } from '../firebase/config';
import Header from '../components/Header';

const NotificationDetails = () => {
  const { notifId } = useParams();
  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);
  const [task, setTask] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const notifRef = doc(db, 'notifications', notifId);
        const notifSnap = await getDoc(notifRef);
        if (!notifSnap.exists()) {
          setError('Notification not found.');
          setLoading(false);
          return;
        }
        const notifData = { id: notifSnap.id, ...notifSnap.data() };
        setNotification(notifData);

        if (notifData.workId) {
          const workSnap = await getDoc(doc(db, 'works', notifData.workId));
          if (workSnap.exists()) {
            setTask({ id: workSnap.id, ...workSnap.data() });
          }
        }

        if (notifData.userId) {
          const userSnap = await getDoc(doc(db, 'users', notifData.userId));
          if (userSnap.exists()) {
            setUser({ id: userSnap.id, ...userSnap.data() });
          }
        }
      } catch (e) {
        console.error('NotificationDetails load error', e);
        setError('Failed to load notification details.');
      } finally {
        setLoading(false);
      }
    };

    if (notifId) load();
  }, [notifId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <main className="container mx-auto px-4 py-6 max-w-3xl">
          <p>Loading notification...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <main className="container mx-auto px-4 py-6 max-w-3xl">
          <p className="text-red-600 mb-4">{error}</p>
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

  if (!notification) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <main className="container mx-auto px-4 py-6 max-w-3xl">
          <p>No data.</p>
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
        return 'Work marked done';
      case 'undo-done':
        return 'Work status changed';
      default:
        return 'Notification';
    }
  })();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Notification details
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
          >
            Back
          </button>
        </div>

        {/* Notification summary */}
        <section className="mb-4 bg-white rounded-lg shadow p-4">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            {typeLabel}
          </p>
          <p className="text-xs text-gray-600 mb-1">
            ID: {notification.id}
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

        {/* User info */}
        <section className="mb-4 bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            User
          </h2>
          {user ? (
            <>
              <p className="text-sm text-gray-800">
                {user.name || 'No name'}
              </p>
              {user.email && (
                <p className="text-xs text-gray-600">{user.email}</p>
              )}
              {user.cardNumber && (
                <p className="text-xs text-gray-600">
                  Card: {user.cardNumber}
                </p>
              )}
            </>
          ) : (
            <p className="text-xs text-gray-500">
              {notification.userName || 'Unknown user'}
            </p>
          )}
        </section>

        {/* Work / task info */}
        <section className="mb-4 bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Work
          </h2>
          {task ? (
            <>
              <p className="text-sm font-semibold text-gray-800">
                {task.title || 'No title'}
              </p>
              {task.date && (
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                  <FaCalendarAlt className="text-gray-500" />
                  {new Date(task.date).toLocaleDateString()}
                </p>
              )}
              {task.description && (
                <p className="text-xs text-gray-600 mt-1">
                  {task.description}
                </p>
              )}
            </>
          ) : (
            <p className="text-xs text-gray-500">
              Work not found (id: {notification.workId || '—'}).
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
      </main>
    </div>
  );
};

export default NotificationDetails;
