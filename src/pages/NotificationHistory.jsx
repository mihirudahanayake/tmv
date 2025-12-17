import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { FaBell, FaCheckCircle, FaCircle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import Header from '../components/Header';

const NotificationHistory = () => {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();
  const { notifId } = useParams(); // from /notifications/:notifId

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

  const selectedNotif = notifId
    ? notifs.find((n) => n.id === notifId)
    : null;

  useEffect(() => {
    if (!loading && notifId && selectedNotif && !selectedNotif.read) {
      markOneRead(notifId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, notifId, selectedNotif]);

  const handleNotifClick = (id) => {
    navigate(`/notifications/${id}`);
  };

  const goBack = () => {
    navigate('/notifications');
  };

  // While fetching single-notification data
  if (notifId && loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="admin" />
        <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
          <p className="text-gray-600">Loading notification...</p>
        </main>
      </div>
    );
  }

  // LIST VIEW
  if (!notifId) {
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
                  onClick={() => handleNotifClick(n.id)}
                  className={`bg-white rounded-lg shadow border p-4 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] flex items-start gap-3 justify-between ${
                    n.read
                      ? 'border-gray-100 hover:border-gray-200'
                      : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {n.read ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaCircle className="text-blue-500 text-xs" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
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
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    );
  }

  // DETAILS VIEW
  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <div className="mb-4">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
          >
            <FaArrowLeft />
            <span>Back to notifications</span>
          </button>
        </div>

        {!selectedNotif ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">Notification not found.</p>
            <button
              onClick={goBack}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go back
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow border border-gray-100 p-6 space-y-6">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {selectedNotif.read ? (
                  <FaCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FaCircle className="text-blue-500 text-xs" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {formatTypeText(selectedNotif)}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(selectedNotif.createdAt)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">Work ID:</span>
                <p className="font-mono bg-gray-50 px-3 py-2 rounded break-all">
                  {selectedNotif.workId}
                </p>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">User:</span>
                <p className="font-medium">
                  {selectedNotif.userName || 'Anonymous'}
                </p>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Type:</span>
                <p className="capitalize font-mono text-xs bg-blue-50 px-3 py-1 rounded inline-block">
                  {selectedNotif.type}
                </p>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Status:</span>
                <p
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedNotif.read
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {selectedNotif.read ? 'Read' : 'Unread'}
                </p>
              </div>
            </div>

            {selectedNotif.details && (
              <div>
                <h2 className="font-semibold text-gray-800 mb-2">
                  Additional details
                </h2>
                <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto font-mono">
                  {JSON.stringify(selectedNotif.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationHistory;
