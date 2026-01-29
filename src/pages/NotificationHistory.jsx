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
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaCheckCircle, FaCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { auth, db } from '../firebase/config';
import Header from '../components/Header';
import { useUserProfile } from '../hooks/useUserProfile';
import { formatWorkDepartmentLabel } from '../constants/workDepartments';

const NotificationHistory = () => {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingNotif, setEditingNotif] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);
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
    // Admin doesn't need to mark their *sent* notifications as read.
    // Only mark activity notifications as read.
    const unread = notifs.filter((n) => n.type !== 'admin-message' && !n.read);
    if (!unread.length) return;
    try {
      setUpdating(true);
      const batch = writeBatch(db);
      unread.forEach((n) => {
        batch.update(doc(db, 'notifications', n.id), { read: true });
      });
      await batch.commit();
      setNotifs((prev) =>
        prev.map((n) => (n.type !== 'admin-message' ? { ...n, read: true } : n))
      );
    } catch (e) {
      console.error('Failed to mark all read', e);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAllActivity = async () => {
    if (!activityNotifs.length) return;
    const ok = window.confirm(
      `Delete all received activity notifications (${activityNotifs.length})? This cannot be undone.`
    );
    if (!ok) return;

    try {
      setUpdating(true);
      const chunkSize = 450;
      for (let i = 0; i < activityNotifs.length; i += chunkSize) {
        const batch = writeBatch(db);
        activityNotifs.slice(i, i + chunkSize).forEach((n) => {
          batch.delete(doc(db, 'notifications', n.id));
        });
        await batch.commit();
      }
      const activityIds = new Set(activityNotifs.map((n) => n.id));
      setNotifs((prev) => prev.filter((n) => !activityIds.has(n.id)));
    } catch (e) {
      console.error('Failed to delete all activity notifications', e);
      alert('Failed to delete all activity notifications. Check Firestore rules and try again.');
    } finally {
      setUpdating(false);
    }
  };

  const unreadCount = notifs.filter((n) => n.type !== 'admin-message' && !n.read).length;

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

  const deleteUserCopies = async (notif) => {
    const broadcastId = notif?.id;
    if (!broadcastId) return;

    // Preferred: delete by deterministic doc id using stored recipient list.
    const recipients = Array.isArray(notif?.recipientUserIds) ? notif.recipientUserIds : null;
    if (recipients && recipients.length > 0) {
      const chunkSize = 450;
      for (let i = 0; i < recipients.length; i += chunkSize) {
        const batch = writeBatch(db);
        recipients.slice(i, i + chunkSize).forEach((uid) => {
          batch.delete(doc(db, 'users', uid, 'notifications', broadcastId));
        });
        await batch.commit();
      }
      return;
    }

    // Fallback for older notifications: try collectionGroup search (may require an index).
    try {
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
    } catch (e) {
      console.warn('Skipping deletion of user copies (index required):', e);
    }
  };

  const updateUserCopies = async (notif, patch) => {
    const broadcastId = notif?.id;
    if (!broadcastId) return;

    const recipients = Array.isArray(notif?.recipientUserIds) ? notif.recipientUserIds : null;
    if (!recipients || recipients.length === 0) return;

    const chunkSize = 450;
    for (let i = 0; i < recipients.length; i += chunkSize) {
      const batch = writeBatch(db);
      recipients.slice(i, i + chunkSize).forEach((uid) => {
        // Use set(merge) so we don't require the doc to exist.
        batch.set(
          doc(db, 'users', uid, 'notifications', broadcastId),
          { ...patch, broadcastId, updatedAt: serverTimestamp() },
          { merge: true }
        );
      });
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
      await deleteUserCopies(notif);
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

  const handleDeleteActivity = async (notif) => {
    if (!notif?.id) return;
    const ok = window.confirm('Delete this activity notification?');
    if (!ok) return;

    setDeletingId(notif.id);
    try {
      await deleteDoc(doc(db, 'notifications', notif.id));
      setNotifs((prev) => prev.filter((n) => n.id !== notif.id));
    } catch (e) {
      console.error('Failed to delete activity notification', e);
      alert('Failed to delete notification. Check Firestore rules and try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (notif) => {
    setEditingNotif(notif);
    setEditTitle(notif?.title || '');
    setEditMessage(notif?.message || '');
  };

  const closeEdit = () => {
    if (savingEdit) return;
    setEditingNotif(null);
    setEditTitle('');
    setEditMessage('');
  };

  const handleSaveEdit = async () => {
    if (!editingNotif?.id) return;
    const title = (editTitle || '').trim();
    const message = (editMessage || '').trim();
    if (!title && !message) {
      alert('Please enter a title or a message.');
      return;
    }

    setSavingEdit(true);
    try {
      const patch = { title, message };
      await updateDoc(doc(db, 'notifications', editingNotif.id), {
        ...patch,
        updatedAt: serverTimestamp(),
      });

      // Best-effort: update per-user copies if we know recipients.
      await updateUserCopies(editingNotif, patch);

      setNotifs((prev) =>
        prev.map((n) => (n.id === editingNotif.id ? { ...n, ...patch } : n))
      );
      closeEdit();
    } catch (e) {
      console.error('Failed to edit notification', e);
      alert('Failed to edit notification. Check Firestore rules and try again.');
    } finally {
      setSavingEdit(false);
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
          <div className="flex items-center gap-2">
            {tab === 'activity' && (
              <button
                type="button"
                onClick={handleDeleteAllActivity}
                disabled={updating || activityNotifs.length === 0}
                className={`px-3 py-2 rounded text-sm font-semibold ${
                  activityNotifs.length === 0
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Delete all ({activityNotifs.length})
              </button>
            )}

            <button
              onClick={markAllRead}
              disabled={updating || unreadCount === 0}
              className={`px-3 py-2 rounded text-sm font-semibold ${
                unreadCount === 0
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Mark activity read ({unreadCount})
            </button>
          </div>
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
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{n.title || 'Notification'}</p>
                      {n.message && <p className="text-sm text-gray-600 mt-1">{n.message}</p>}
                      <p className="text-xs text-gray-500 mt-1">
                        Dept: {formatWorkDepartmentLabel(n.department || 'videography')} | At: {formatDate(n.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="ml-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(n)}
                      disabled={deletingId === n.id}
                      className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
                      title="Edit notification"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSent(n)}
                      disabled={deletingId === n.id}
                      className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                      title="Delete notification"
                    >
                      <FaTrash />
                      {deletingId === n.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
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

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteActivity(n);
                  }}
                  disabled={deletingId === n.id}
                  className="ml-3 inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  title="Delete activity notification"
                >
                  <FaTrash />
                  {deletingId === n.id ? 'Deleting…' : 'Delete'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {editingNotif && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-xl border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">Edit notification</h2>
              <button
                type="button"
                onClick={closeEdit}
                disabled={savingEdit}
                className="text-sm px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Notification title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full border rounded px-3 py-2 min-h-[120px]"
                  placeholder="Notification message"
                />
              </div>

              {!Array.isArray(editingNotif?.recipientUserIds) && (
                <p className="text-xs text-gray-500">
                  Note: This is an older notification; user copies may not update (no recipient list stored).
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  disabled={savingEdit}
                  className="px-4 py-2 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={savingEdit}
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {savingEdit ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationHistory;
