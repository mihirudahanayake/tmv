import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  writeBatch
} from 'firebase/firestore';
import { FaBell, FaCheckCircle, FaCircle } from 'react-icons/fa';
import { db } from '../firebase/config';
import Header from '../components/Header';

const NotificationHistory = () => {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'notifications'),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setNotifs(list);
    } catch (e) {
      console.error('Failed to load notifications', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const formatTypeText = (n) => {
    const who = n.userName || 'A user';
    if (n.type === 'accept') return `${who} accepted a work`;
    if (n.type === 'reject') return `${who} rejected a work`;
    if (n.type === 'done') return `${who} marked their work as done`;
    if (n.type === 'undo-done') return `${who} undid a done task`;
    return `${who} did something`;
  };

  const formatDate = (ts) => {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  };

  const markOneRead = async (id) => {
    try {
      setUpdating(true);
      await updateDoc(doc(db, 'notifications', id), { read: true });
      setNotifs((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (e) {
      console.error('Failed to mark read', e);
    } finally {
      setUpdating(false);
    }
  };

  const markAllRead = async () => {
    const unread = notifs.filter((n) => !n.read);
    if (unread.length === 0) return;
    try {
      setUpdating(true);
      const batch = writeBatch(db);
      unread.forEach((n) => {
        batch.update(doc(db, 'notifications', n.id), { read: true });
      });
      await batch.commit();
      setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (e) {
      console.error('Failed to mark all read', e);
    } finally {
      setUpdating(false);
    }
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaBell className="text-2xl text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Notification History
            </h1>
          </div>
          <button
            onClick={markAllRead}
            disabled={updating || unreadCount === 0}
            className={`px-4 py-2 rounded text-sm font-semibold ${
              unreadCount === 0
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Mark all read ({unreadCount})
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading notifications...</p>
        ) : notifs.length === 0 ? (
          <p className="text-gray-600">No notifications yet.</p>
        ) : (
          <ul className="space-y-3">
            {notifs.map((n) => (
              <li
                key={n.id}
                className="bg-white rounded-lg shadow border border-gray-100 p-4 flex items-start gap-3 justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {n.read ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaCircle className="text-blue-500 text-xs" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {formatTypeText(n)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Work ID:{' '}
                      <span className="font-mono break-all">{n.workId}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      At: {formatDate(n.createdAt)}
                    </p>
                  </div>
                </div>

                {!n.read && (
                  <button
                    onClick={() => markOneRead(n.id)}
                    disabled={updating}
                    className="text-xs px-3 py-1 rounded border border-blue-500 text-blue-600 hover:bg-blue-50 h-fit"
                  >
                    Mark read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default NotificationHistory;
