import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import Header from '../components/Header';
import { FaSpinner } from 'react-icons/fa';

const AdminNotifications = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [sendMode, setSendMode] = useState('all'); // 'all' | 'selected'
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(list);
      } catch (e) {
        console.error(e);
        setError('Failed to load users.');
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  const toggleUserSelection = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!title.trim() || !message.trim()) {
      setError('Title and message are required.');
      return;
    }

    if (sendMode === 'selected' && selectedUserIds.length === 0) {
      setError('Select at least one user.');
      return;
    }

    setSending(true);
    try {
      if (sendMode === 'all') {
        await addDoc(collection(db, 'notifications'), {
          title: title.trim(),
          body: message.trim(),
          target: 'all',
          createdAt: serverTimestamp(),
        });
      } else {
        const batch = writeBatch(db);
        selectedUserIds.forEach((uid) => {
          const ref = doc(
            collection(db, 'users', uid, 'notifications')
          );
          batch.set(ref, {
            title: title.trim(),
            body: message.trim(),
            target: 'user',
            userId: uid,
            createdAt: serverTimestamp(),
          });
        });
        await batch.commit();
      }

      setSuccessMsg('Notification(s) sent successfully.');
      setTitle('');
      setMessage('');
      setSelectedUserIds([]);
      setSendMode('all');
    } catch (e) {
      console.error(e);
      setError('Failed to send notification.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="admin" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Send notifications
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-4"
        >
          {error && (
            <div className="p-2 rounded bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-2 rounded bg-green-100 text-green-700 text-sm">
              {successMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notification title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notification message"
            />
          </div>

          <div>
            <p className="block text-sm font-semibold text-gray-700 mb-1">
              Send to
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="sendMode"
                  value="all"
                  checked={sendMode === 'all'}
                  onChange={() => setSendMode('all')}
                />
                <span>All users</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="sendMode"
                  value="selected"
                  checked={sendMode === 'selected'}
                  onChange={() => setSendMode('selected')}
                />
                <span>Selected users</span>
              </label>
            </div>
          </div>

          {sendMode === 'selected' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select users
              </label>

              {loadingUsers ? (
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaSpinner className="animate-spin" />
                  <span>Loading users...</span>
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto border rounded p-2 space-y-1 bg-gray-50">
                  {users.length === 0 && (
                    <p className="text-xs text-gray-600">
                      No users found.
                    </p>
                  )}
                  {users.map((u) => (
                    <label
                      key={u.id}
                      className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(u.id)}
                        onChange={() => toggleUserSelection(u.id)}
                      />
                      <span>
                        {u.name || 'Unnamed'} ({u.email || 'no email'})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send notification'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminNotifications;
