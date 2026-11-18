// src/pages/UserNotifications.jsx
import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaBell, FaCheck, FaTrash } from 'react-icons/fa';
import { useUserProfile } from '../hooks/useUserProfile';

const UserNotifications = () => {
  const { user, profile, loading: loadingProfile } = useUserProfile();
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingNotifId, setUpdatingNotifId] = useState('');
  const [updatingAll, setUpdatingAll] = useState(false);
  const [deletingNotifId, setDeletingNotifId] = useState('');
  const [deletingAll, setDeletingAll] = useState(false);
  const [actionError, setActionError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingProfile) return;
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'notifications'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((n) => (
          n.source === 'admin' ||
          n.type === 'admin-message' ||
          (n.source === 'system' && n.type === 'unauthorized-access')
        ));
      setNotifs(list);
      setLoading(false);
    });

    return () => unsub();
  }, [user, loadingProfile]);

  const handleOpenNotif = async (notif) => {
    if (!user) return;
    try {
      await updateDoc(
        doc(db, 'users', user.uid, 'notifications', notif.id),
        { read: true }
      );
    } catch (e) {
      console.error('Failed to mark notif read', e);
    }
    navigate(`/user/notifications/${notif.id}`);
  };

  const handleMarkRead = async (notif) => {
    if (!user || notif.read !== false || updatingAll || deletingAll) return;
    setActionError('');
    setUpdatingNotifId(notif.id);
    try {
      await updateDoc(
        doc(db, 'users', user.uid, 'notifications', notif.id),
        { read: true }
      );
    } catch (error) {
      console.error('Failed to mark notification read:', error);
      setActionError('Could not mark this notification as read. Please try again.');
    } finally {
      setUpdatingNotifId('');
    }
  };

  const handleMarkAllRead = async () => {
    if (!user || updatingAll || deletingAll) return;
    const unread = notifs.filter((notif) => notif.read === false);
    if (!unread.length) return;

    setActionError('');
    setUpdatingAll(true);
    try {
      for (let start = 0; start < unread.length; start += 450) {
        const batch = writeBatch(db);
        unread.slice(start, start + 450).forEach((notif) => {
          batch.update(
            doc(db, 'users', user.uid, 'notifications', notif.id),
            { read: true }
          );
        });
        await batch.commit();
      }
    } catch (error) {
      console.error('Failed to mark all notifications read:', error);
      setActionError('Could not mark all notifications as read. Please try again.');
    } finally {
      setUpdatingAll(false);
    }
  };

  const handleDeleteNotification = async (notif) => {
    if (!user || deletingAll || updatingAll) return;
    if (!window.confirm('Delete this notification? This cannot be undone.')) return;

    setActionError('');
    setDeletingNotifId(notif.id);
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'notifications', notif.id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
      setActionError('Could not delete this notification. Please try again.');
    } finally {
      setDeletingNotifId('');
    }
  };

  const handleDeleteAllNotifications = async () => {
    if (!user || deletingAll || updatingAll || notifs.length === 0) return;
    if (!window.confirm(`Delete all ${notifs.length} notifications? This cannot be undone.`)) return;

    setActionError('');
    setDeletingAll(true);
    try {
      for (let start = 0; start < notifs.length; start += 450) {
        const batch = writeBatch(db);
        notifs.slice(start, start + 450).forEach((notif) => {
          batch.delete(doc(db, 'users', user.uid, 'notifications', notif.id));
        });
        await batch.commit();
      }
    } catch (error) {
      console.error('Failed to delete all notifications:', error);
      setActionError('Could not delete all notifications. Please try again.');
    } finally {
      setDeletingAll(false);
    }
  };

  const unreadCount = notifs.filter((notif) => notif.read === false).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="user" isTO={!!profile?.isTO} />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaBell className="text-yellow-500" />
          Notifications
        </h1>

        {actionError && (
          <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionError}
          </p>
        )}

        {!loading && notifs.length > 0 && (
          <div className="mb-4 flex flex-wrap justify-end gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={updatingAll || deletingAll || Boolean(updatingNotifId) || Boolean(deletingNotifId)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingAll ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                {updatingAll ? 'Marking all as read...' : 'Mark all as read'}
              </button>
            )}
            <button
              type="button"
              onClick={handleDeleteAllNotifications}
              disabled={updatingAll || deletingAll || Boolean(updatingNotifId) || Boolean(deletingNotifId)}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deletingAll ? <FaSpinner className="animate-spin" /> : <FaTrash />}
              {deletingAll ? 'Deleting all...' : `Clear all (${notifs.length})`}
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <FaSpinner className="animate-spin" />
            <span>Loading notifications...</span>
          </div>
        ) : notifs.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base">
            No notifications yet.
          </p>
        ) : (
          <div className="bg-white rounded-lg shadow-md divide-y">
            {notifs.map((n) => {
              const date = n.createdAt?.toDate
                ? n.createdAt.toDate().toLocaleString()
                : '';
              const isUnread = n.read === false;

              return (
                <div
                  key={n.id}
                  className={`flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
                    isUnread ? 'bg-yellow-50' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleOpenNotif(n)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {n.title || 'Notification'}
                    </p>
                    {n.message && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        {n.message}
                      </p>
                    )}
                    {date && (
                      <p className="text-xs text-gray-400 mt-1">{date}</p>
                    )}
                  </button>
                  {isUnread && (
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="inline-flex items-center text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full">
                        New
                      </span>
                      <button
                        type="button"
                        onClick={() => handleMarkRead(n)}
                        disabled={updatingAll || deletingAll || Boolean(updatingNotifId) || Boolean(deletingNotifId)}
                        className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updatingNotifId === n.id ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaCheck />
                        )}
                        Mark as read
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteNotification(n)}
                    disabled={updatingAll || deletingAll || Boolean(updatingNotifId) || Boolean(deletingNotifId)}
                    aria-label={`Delete notification: ${n.title || 'Notification'}`}
                    className="inline-flex shrink-0 items-center gap-1 self-start rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-center"
                  >
                    {deletingNotifId === n.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                    Clear
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserNotifications;
