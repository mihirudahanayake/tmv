// pages/NotificationHistory.jsx
import { useEffect, useState } from 'react';
import {
  collection,
  collectionGroup,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  writeBatch,
  doc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCheckCircle, FaCircle, FaTrash } from 'react-icons/fa';
import { auth, db } from '../firebase/config';
import Header from '../components/Header';
import { useUserProfile } from '../hooks/useUserProfile';
import { formatWorkDepartmentLabel } from '../constants/workDepartments';

const NotificationHistory = () => {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [tab, setTab] = useState('sent'); // 'sent' | 'activity'
  const navigate = useNavigate();
  const { profile, loading: loadingProfile } = useUserProfile();

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

  const markAllRead = async () => {
    const unread = notifs.filter((n) => !n.read);
    if (!unread.length) return;
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

  const currentUid = auth.currentUser?.uid || null;
  const managedDepartments = Array.isArray(profile?.managedDepartments) ? profile.managedDepartments : [];
  const isDeptHead = profile?.userType === 'admin' || profile?.role === 'departmentHead';

  const inMyDept = (n) => {
    if (!isDeptHead) return true;
    if (!managedDepartments.length) return true;
    return managedDepartments.includes(n.department);
  };

  const sentNotifs = notifs
    .filter((n) => n.type === 'admin-message' && n.source === 'admin')
    .filter(inMyDept)
    .filter((n) => {
      // Prefer senderUid matching; fallback to senderId when older docs exist
      if (!currentUid) return true;
      return (n.senderUid && n.senderUid === currentUid) || (n.senderId && n.senderId === currentUid);
    });

  const activityNotifs = notifs
    .filter((n) => n.type !== 'admin-message')
    .filter(inMyDept);

  const deleteUserCopiesByBroadcastId = async (broadcastId) => {
    if (!broadcastId) return;
    // Deletes `/users/{uid}/notifications/*` that were fanned out from this broadcast.
    const snap = await getDocs(
      query(collectionGroup(db, 'notifications'), where('broadcastId', '==', broadcastId))
    );

    if (snap.empty) return;

    const docs = snap.docs;
    const chunkSize = 450;
    for (let i = 0; i < docs.length; i += chunkSize) {
      const batch = writeBatch(db);
      docs.slice(i, i + chunkSize).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
  };

  const handleDeleteSent = async (notif) => {
    if (!notif?.id) return;
    const ok = window.confirm('Delete this notification? Users may lose this message.');
    if (!ok) return;

    setDeletingId(notif.id);
    try {
      // Delete per-user copies first (best effort)
      await deleteUserCopiesByBroadcastId(notif.id);
      // Delete global record
      await deleteDoc(doc(db, 'notifications', notif.id));
      setNotifs((prev) => prev.filter((n) => n.id !== notif.id));
    } catch (e) {
      console.error('Failed to delete notification', e);
      alert('Failed to delete notification. Check Firestore rules and try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleNotifClick = (notif) => {
    // IMPORTANT: use Firestore doc id, not workId
    navigate(`/admin/notifications/${notif.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
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

        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setTab('sent')}
            className={`px-3 py-2 rounded text-sm font-semibold ${
              tab === 'sent' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'
            }`}
          >
            Sent notifications ({sentNotifs.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('activity')}
            className={`px-3 py-2 rounded text-sm font-semibold ${
              tab === 'activity' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'
            }`}
          >
            Activity ({activityNotifs.length})
          </button>
        </div>

        {loading || loadingProfile ? (
          <p>Loading notifications...</p>
        ) : tab === 'sent' ? (
          !sentNotifs.length ? (
            <p>No sent notifications yet.</p>
          ) : (
            <ul className="space-y-3">
              {sentNotifs.map((n) => (
                <li
                  key={n.id}
                  className="bg-white rounded-lg shadow border p-4 flex items-start gap-3 justify-between"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="mt-1">
                      {n.read ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaCircle className="text-blue-500 text-xs" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{n.title || 'Notification'}</p>
                      {n.message && <p className="text-sm text-gray-600 mt-1">{n.message}</p>}
                      <p className="text-xs text-gray-500 mt-1">
                        Dept: {formatWorkDepartmentLabel(n.department || 'videography')} | At: {formatDate(n.createdAt)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteSent(n)}
                    disabled={deletingId === n.id}
                    className="ml-3 inline-flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                    title="Delete notification"
                  >
                    <FaTrash />
                    {deletingId === n.id ? 'Deleting…' : 'Delete'}
                  </button>
                </li>
              ))}
            </ul>
          )
        ) : !activityNotifs.length ? (
          <p>No notifications yet.</p>
        ) : (
          <ul className="space-y-3">
            {activityNotifs.map((n) => (
              <li
                key={n.id}
                onClick={() => handleNotifClick(n)}
                className={`bg-white rounded-lg shadow border p-4 cursor-pointer flex items-start gap-3 justify-between ${
                  n.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50'
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
                    <p className="font-semibold text-gray-800 truncate">{formatTypeText(n)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Work ID: <span className="font-mono break-all">{n.workId}</span>
                    </p>
                    <p className="text-xs text-gray-500">At: {formatDate(n.createdAt)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default NotificationHistory;
