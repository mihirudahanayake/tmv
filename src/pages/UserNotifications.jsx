// src/pages/UserNotifications.jsx
import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaBell } from 'react-icons/fa';

const UserNotifications = () => {
  const [user, setUser] = useState(null);
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'notifications'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setNotifs(list);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

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
    navigate(`/notifications/${notif.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="user" />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaBell className="text-yellow-500" />
          Notifications
        </h1>

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
                <button
                  key={n.id}
                  onClick={() => handleOpenNotif(n)}
                  className={`w-full text-left px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 ${
                    isUnread ? 'bg-yellow-50' : ''
                  }`}
                >
                  <div>
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
                  </div>
                  {isUnread && (
                    <span className="mt-2 sm:mt-0 inline-flex items-center text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserNotifications;
